import { e as eventHandler, r as readBody, v as validateToken } from '../../../nitro/nitro.mjs';
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

const validateToken_post = eventHandler(async (event) => {
  const body = await readBody(event) || {};
  const { token } = body;
  if (!token || typeof token !== "string") {
    return { valid: false };
  }
  const valid = validateToken(token);
  return { valid };
});

export { validateToken_post as default };
//# sourceMappingURL=validate-token.post.mjs.map
