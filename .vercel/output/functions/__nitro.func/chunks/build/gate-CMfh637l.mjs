import { _ as _sfc_main$1 } from './Input-C3K6D_9e.mjs';
import { a as useToast, b as _sfc_main$9 } from './server.mjs';
import { defineComponent, ref, mergeProps, unref, isRef, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import 'reka-ui';
import 'node:http';
import 'node:https';
import '../nitro/nitro.mjs';
import 'lru-cache';
import '@unocss/core';
import '@unocss/preset-wind3';
import 'devalue';
import 'consola';
import 'node:crypto';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import '@iconify/utils';
import 'unhead/server';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-bundle-renderer/runtime';
import 'vue-router';
import '@unhead/addons';
import '@unhead/schema-org/vue';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "gate",
  __ssrInlineRender: true,
  setup(__props) {
    const password = ref("");
    const loading = ref(false);
    const error = ref("");
    useToast();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UInput = _sfc_main$1;
      const _component_UButton = _sfc_main$9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-black" }, _attrs))}><div class="w-full max-w-md p-8"><div class="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20"><div class="text-center mb-8"><h1 class="text-3xl font-bold text-white mb-2"> 访问验证 </h1><p class="text-gray-300 text-sm"> 请输入密码以继续访问 </p></div><form class="space-y-6"><div>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(password),
        "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
        type: "password",
        placeholder: "请输入密码",
        size: "xl",
        class: ["text-center", { "border-red-500": unref(error) }],
        autocomplete: "off",
        onInput: ($event) => error.value = ""
      }, null, _parent));
      if (unref(error)) {
        _push(`<p class="mt-2 text-sm text-red-400">${ssrInterpolate(unref(error))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UButton, {
        type: "submit",
        loading: unref(loading),
        disabled: !unref(password),
        size: "xl",
        color: "primary",
        block: "",
        class: "w-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 验证 `);
          } else {
            return [
              createTextVNode(" 验证 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</form></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/gate.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=gate-CMfh637l.mjs.map
