# Nuxt Image Gallery (COS + Signed URLs)

English | [中文说明](./README.zh-CN.md)

A Nuxt 4 image gallery that loads images from **Tencent Cloud COS** using **short-lived signed URLs**, with a simple **gate (password / token link)** to restrict access.

## Features

- **COS signed URLs**: client fetches signed URLs via `GET /api/cos-sign` (cached in-memory on the client).
- **Browser-side image caching**: gallery uses the Cache API to cache images for 1 day.
- **Gallery + detail viewer**: masonry grid, thumbnails strip, keyboard navigation, swipe navigation.
- **Filters & magnifier**: filter sliders and magnifier in the detail view.
- **Gate protection**:
  - `/gate` password to enter the site.
  - One-time access links (24h) backed by Upstash Redis.

## Tech stack

- **Nuxt**: Nuxt 4
- **UI**: `@nuxt/ui`
- **Composables**: `@vueuse/nuxt`
- **Auth/session**: `nuxt-auth-utils`
- **Storage**: Tencent Cloud COS (`cos-nodejs-sdk-v5`)
- **Token store**: Upstash Redis (`@upstash/redis`)

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
- **`NUXT_GATE_PASSWORD`**: password for the `/gate` page (defaults to `gate123` if not set; set it in production).

Tencent COS (required for signing + uploading):

- **`TENCENT_SECRET_ID`**
- **`TENCENT_SECRET_KEY`**
- **`COS_BUCKET`**: bucket name
- **`COS_REGION`**: e.g. `ap-guangzhou`

Upstash Redis (required for one-time token links):

- **`UPSTASH_REDIS_REST_URL`**
- **`UPSTASH_REDIS_REST_TOKEN`**

## Routes

- **`/`**: gallery
- **`/detail/[...slug]`**: image detail viewer
- **`/gate`**: gate password page
- **`/admin`**: generate one-time access links (requires gate password cookie)

## APIs

- **`GET /api/cos-sign?key=...`**
  - Returns `{ url, expires }` where `expires` is seconds.
- **`POST /api/upload`**
  - Multipart upload; converts to `webp` via `sharp`, then uploads to COS.
  - Optional `folder` field is validated to prevent path injection.
- **`POST /api/gate/verify`**
  - Body: `{ password }`
  - On success sets cookie `gate_verified=true`.
- **`POST /api/gate/generate-link`**
  - Requires cookie `gate_verified=true`.
  - Returns `{ accessLink, token }` with 24h expiry.
- **`POST /api/gate/validate-token`**
  - Body: `{ token }`
  - Validates token via Upstash Redis.
- **`POST /api/auth`**
  - Body: `{ password }`
  - Sets a user session with `{ role: 'admin' }`.

## Image list configuration

This project currently uses a static list of COS object keys:

- Edit `app/config/images.ts` and update `imageKeys`.
- The UI will request signed URLs for those keys on the client.

## Notes

- Signed URLs are cached client-side (in-memory) until expiry.
- The gallery additionally caches fetched images in the browser Cache API for 24h.
