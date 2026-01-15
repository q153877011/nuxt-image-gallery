# Nuxt 图片库（COS + 临时签名链接）

[English](./README.md) | 中文说明

这是一个基于 **Nuxt 4** 的图片展示站点：图片存储在 **腾讯云 COS**，前端通过后端接口获取**短期签名 URL** 来加载图片，并提供一个简单的**门禁（密码 / 一次性访问链接）**来限制访问。

## 功能

- **COS 临时签名链接**：客户端通过 `GET /api/cos-sign` 获取带过期时间的签名链接（本地内存缓存）。
- **浏览器侧图片缓存**：图库页使用 Cache API 将图片缓存 1 天，加速二次访问。
- **图库 + 大图查看**：瀑布流/网格展示、顶部缩略图条、键盘/手势切换。
- **滤镜与放大镜**：大图页支持滤镜参数调整与放大镜。
- **全站门禁**：
  - `/gate` 入口密码。
  - `/admin` 生成 24 小时有效的一次性访问链接（Token 存在 Upstash Redis）。

## 技术栈

- **Nuxt**：Nuxt 4
- **UI**：`@nuxt/ui`
- **组合式工具**：`@vueuse/nuxt`
- **会话/鉴权**：`nuxt-auth-utils`
- **对象存储**：腾讯云 COS（`cos-nodejs-sdk-v5`）
- **Token 存储**：Upstash Redis（`@upstash/redis`）

## 快速开始

- **安装依赖**：`pnpm install`
- **配置环境变量**：`cp .env.example .env` 并填入必要配置
- **本地开发**：`pnpm dev`

其他脚本：

- **构建**：`pnpm build`
- **预览**：`pnpm preview`
- **Lint**：`pnpm lint`
- **类型检查**：`pnpm typecheck`

## 环境变量

> 不要把密钥提交到仓库；在本地 `.env` 或部署平台的环境变量里配置即可。

- **`NUXT_SESSION_PASSWORD`**：`nuxt-auth-utils` 用于加密 session cookie。
- **`NUXT_ADMIN_PASSWORD`**：`POST /api/auth` 的管理员密码（未设置时默认 `admin`）。
- **`NUXT_GATE_PASSWORD`**：`/gate` 页面密码（未设置时默认 `gate123`；生产环境务必设置）。

腾讯云 COS（签名与上传必需）：

- **`TENCENT_SECRET_ID`**
- **`TENCENT_SECRET_KEY`**
- **`COS_BUCKET`**：桶名称
- **`COS_REGION`**：例如 `ap-guangzhou`

Upstash Redis（一次性访问链接必需）：

- **`UPSTASH_REDIS_REST_URL`**
- **`UPSTASH_REDIS_REST_TOKEN`**

## 路由说明

- **`/`**：图片库
- **`/detail/[...slug]`**：大图页
- **`/gate`**：门禁验证页
- **`/admin`**：生成一次性访问链接（需要先通过门禁密码）

## 后端接口

- **`GET /api/cos-sign?key=...`**
  - 返回 `{ url, expires }`，其中 `expires` 为秒。
- **`POST /api/upload`**
  - Multipart 上传；服务端用 `sharp` 转为 `webp` 后上传到 COS。
  - 可选 `folder` 字段会做白名单校验，防止路径注入。
- **`POST /api/gate/verify`**
  - Body：`{ password }`
  - 通过后写入 cookie：`gate_verified=true`。
- **`POST /api/gate/generate-link`**
  - 需要 cookie：`gate_verified=true`。
  - 返回 `{ accessLink, token }`，默认 24 小时有效。
- **`POST /api/gate/validate-token`**
  - Body：`{ token }`
  - 通过 Upstash Redis 验证 token。
- **`POST /api/auth`**
  - Body：`{ password }`
  - 设置用户 session：`{ role: 'admin' }`。

## 图片列表如何维护

当前图片来源是一个静态的 COS Key 列表：

- 编辑 `app/config/images.ts` 中的 `imageKeys`。
- 客户端会为这些 key 批量请求签名链接并展示。

## 备注

- 签名链接在客户端会做内存级缓存，直到过期。
- 图库页还会把图片内容缓存到浏览器 Cache API（24h）。
