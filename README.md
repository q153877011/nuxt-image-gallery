# Nuxt Image Gallery (COS + Signed URLs)

English | [中文说明](./README.zh-CN.md)

A Nuxt 4 image gallery that loads images from **Tencent Cloud COS** using **short-lived signed URLs**, and uses a **token gate** to restrict access.

## Features

- **COS signed URLs**: client fetches signed URLs via `GET /api/cos-sign` (cached in-memory on the client).
- **Browser-side image caching**: gallery uses the Cache API to cache images for 1 day.
- **Gallery + detail viewer**: masonry grid, thumbnails strip, keyboard navigation, swipe navigation.
- **Filters & magnifier**: filter sliders and magnifier in the detail view.
- **Token gate**:
  - Access the site via an external token link like `/?token=...`.
  - The token is validated by `POST /api/gate/validate-token`.
  - **Token generation is handled outside this project.**

## Tech stack

- **Nuxt**: Nuxt 4
- **UI**: `@nuxt/ui`
- **Composables**: `@vueuse/nuxt`
- **Auth/session**: `nuxt-auth-utils`
- **Storage**: Tencent Cloud COS (`cos-nodejs-sdk-v5`)
- **Database**: Supabase (query images by `user_id`, validate gate tokens)

## Quick start

- **Install**: `pnpm install`
- **Configure env**: `cp .env.example .env` and fill required values
- **Dev**: `pnpm dev`

Other scripts:

- **build**: `pnpm build`
- **preview**: `pnpm preview`
- **lint**: `pnpm lint`
- **typecheck**: `pnpm typecheck`

## Environment variables

> Do not commit secrets. Only put them in `.env` / your deployment platform’s env settings.

- **`NUXT_SESSION_PASSWORD`**: used by `nuxt-auth-utils` to encrypt session cookies.
- **`NUXT_ADMIN_PASSWORD`**: admin login password for `POST /api/auth` (defaults to `admin` if not set).

Tencent COS (required for signing + uploading):

- **`TENCENT_SECRET_ID`**
- **`TENCENT_SECRET_KEY`**
- **`COS_BUCKET`**: bucket name
- **`COS_REGION`**: e.g. `ap-guangzhou`

Supabase (server-side):

- **`SUPABASE_URL`**
- **`SUPABASE_SERVICE_ROLE_KEY`** (recommended on server)
- **`SUPABASE_ANON_KEY`** (optional fallback)

## Routes

- **`/`**: gallery
- **`/detail/[...slug]`**: image detail viewer
- **`/gate`**: hint page when no valid token is provided

## APIs

- **`GET /api/cos-sign?key=...`**
  - Returns `{ url, expires }` where `expires` is seconds.
- **`POST /api/upload`**
  - Multipart upload; converts to `webp` via `sharp`, then uploads to COS.
  - Optional `folder` field is validated to prevent path injection.
- **`POST /api/gate/validate-token`**
  - Body: `{ token }`
  - Validates token via Supabase `tokens` table; returns `{ valid, user_id? }`.
- **`GET /api/images?user_id=...`**
  - Returns `{ keys }` (COS object keys) for the given `user_id`.
- **`POST /api/auth`**
  - Body: `{ password }`
  - Sets a user session with `{ role: 'admin' }`.

## Image source

The home page reads `user_id` from query (e.g. `/?user_id=123`). The server then queries Supabase `images` table and converts image URLs to COS keys, which are later signed and rendered on the client.

## Notes

- Signed URLs are cached client-side (in-memory) until expiry.
- The gallery additionally caches fetched images in the browser Cache API for 24h.
