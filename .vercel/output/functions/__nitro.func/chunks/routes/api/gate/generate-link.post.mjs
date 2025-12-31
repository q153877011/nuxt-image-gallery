import { e as eventHandler, a as getCookie, c as createError, b as createToken, d as getHeader } from '../../../nitro/nitro.mjs';
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

const generateLink_post = eventHandler(async (event) => {
  const verified = getCookie(event, "gate_verified");
  if (verified !== "true") {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized. Please verify password first."
    });
  }
  const token = createToken(24);
  const host = getHeader(event, "host") || "localhost:3000";
  const protocol = "https" ;
  const accessLink = `${protocol}://${host}/?token=${token}`;
  return {
    success: true,
    token,
    accessLink,
    expiresIn: "24 hours"
  };
});

export { generateLink_post as default };
//# sourceMappingURL=generate-link.post.mjs.map
