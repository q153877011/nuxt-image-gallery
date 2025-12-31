import { e as eventHandler, r as readBody, c as createError, g as getUserSession, f as setCookie, s as setUserSession } from '../../../nitro/nitro.mjs';
import 'lru-cache';
import '@unocss/core';
import '@unocss/preset-wind3';
import 'devalue';
import 'consola';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'vue';
import '@iconify/utils';
import 'unhead/server';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';

const verify_post = eventHandler(async (event) => {
  const body = await readBody(event) || {};
  const { password } = body;
  if (!password || typeof password !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: "Password is required"
    });
  }
  const gatePassword = process.env.NUXT_GATE_PASSWORD || "gate123";
  const session = await getUserSession(event);
  if (session.lastAttemptAt && typeof session.lastAttemptAt === "number" && Date.now() - session.lastAttemptAt < 5e3) {
    throw createError({
      statusCode: 429,
      statusMessage: "Too Many Requests"
    });
  }
  if (password === gatePassword) {
    setCookie(event, "gate_verified", "true", {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24
      // 24 小时
    });
    await setUserSession(event, {});
    return { verified: true };
  }
  await setUserSession(event, { lastAttemptAt: Date.now() });
  throw createError({
    statusCode: 401,
    statusMessage: "Invalid password"
  });
});

export { verify_post as default };
//# sourceMappingURL=verify.post.mjs.map
