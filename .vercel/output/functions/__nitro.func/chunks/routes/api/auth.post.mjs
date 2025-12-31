import { e as eventHandler, r as readBody, g as getUserSession, c as createError, s as setUserSession } from '../../nitro/nitro.mjs';
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

const auth_post = eventHandler(async (event) => {
  const body = await readBody(event) || {};
  const session = await getUserSession(event);
  const adminPassword = process.env.NUXT_ADMIN_PASSWORD || "admin";
  if (session.lastAttemptAt && Date.now() - session.lastAttemptAt < 5e3)
    throw createError({ statusCode: 429, statusMessage: "Too Many Requests" });
  if (body.password === adminPassword) {
    await setUserSession(event, {
      user: { role: "admin" }
    });
    return { loggedIn: true };
  }
  await setUserSession(event, { lastAttemptAt: Date.now() });
  throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
});

export { auth_post as default };
//# sourceMappingURL=auth.post.mjs.map
