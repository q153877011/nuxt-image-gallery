import { getSupabaseServerClient } from '../../utils/supabase'

type Body = {
  user_id?: unknown
  key?: unknown
}

type Count = string | number | null

type ImageRow = {
  id: string | number
  good: Count
  view_cnt: Count
}

function normalizeUserId(raw: unknown): string {
  if (typeof raw !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'missing user_id' })
  }
  if (!/^\d+$/.test(raw)) {
    throw createError({ statusCode: 400, statusMessage: 'invalid user_id' })
  }
  return raw
}

function normalizeKey(raw: unknown): string {
  if (typeof raw !== 'string' || raw.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'missing key' })
  }
  return raw
}

async function findImageRow(userId: string, key: string): Promise<ImageRow> {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase
    .from('images')
    .select('id, good, view_cnt')
    .eq('user_id', userId)
    .eq('publish', true)
    // locked 不能为 true（允许 false / null）
    .not('locked', 'is', true)
    // url 可能存的是 key 或完整 URL，兼容两种形态
    .or(`url.eq.${key},url.ilike.%/${key}`)
    .order('id', { ascending: true })
    .limit(1)
    .maybeSingle()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  if (!data) {
    throw createError({ statusCode: 404, statusMessage: 'image not found' })
  }

  return data as ImageRow
}

function toBigInt(value: Count): bigint {
  if (value === null) return 0n
  if (typeof value === 'number') return BigInt(value)
  if (typeof value === 'string' && value.length > 0) return BigInt(value)
  throw createError({ statusCode: 400, statusMessage: 'invalid counter value' })
}

async function incrementColumn(rowId: string | number, column: 'good' | 'view_cnt', current: Count) {
  const supabase = getSupabaseServerClient()
  const nextVal = (toBigInt(current) + 1n).toString()

  // 用乐观并发控制减少“并发点赞丢失”
  let query = supabase
    .from('images')
    .update({ [column]: nextVal })
    .eq('id', rowId)

  query = current === null
    ? query.is(column, null)
    : query.eq(column, current)

  const { data, error } = await query.select(column).maybeSingle()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  // 如果 data 为空，说明并发导致条件不匹配，交给上层重试
  return { ok: Boolean(data), value: nextVal }
}

export default eventHandler(async (event) => {
  const body = (await readBody(event)) as Body || {}

  const userId = normalizeUserId(body.user_id)
  const key = normalizeKey(body.key)

  // 重试几次，尽量保证高并发下也能正确 +1
  for (let attempt = 0; attempt < 4; attempt++) {
    const row = await findImageRow(userId, key)
    const res = await incrementColumn(row.id, 'good', row.good)

    if (res.ok) {
      return { ok: true, good: res.value }
    }
  }

  throw createError({ statusCode: 409, statusMessage: 'conflict, please retry' })
})
