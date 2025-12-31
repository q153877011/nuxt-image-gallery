import { a as useToast, b as _sfc_main$9 } from './server.mjs';
import { _ as _sfc_main$1 } from './Input-C3K6D_9e.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
import 'reka-ui';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "generate-link",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const error = ref("");
    const generatedLink = ref("");
    const token = ref("");
    const toast = useToast();
    async function generateLink() {
      if (loading.value) return;
      loading.value = true;
      error.value = "";
      generatedLink.value = "";
      token.value = "";
      try {
        const result = await $fetch("/api/gate/generate-link", {
          method: "POST"
        });
        if (result.success) {
          generatedLink.value = result.accessLink;
          token.value = result.token;
          toast.add({
            title: "链接生成成功",
            description: "链接已生成，24小时内有效",
            color: "primary"
          });
        }
      } catch (err) {
        error.value = err.data?.message || err.message || "生成链接失败";
        toast.add({
          title: "生成失败",
          description: error.value,
          color: "red"
        });
      } finally {
        loading.value = false;
      }
    }
    function copyToClipboard(text) {
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$9;
      const _component_UInput = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-black p-4" }, _attrs))}><div class="w-full max-w-2xl"><div class="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20"><div class="text-center mb-8"><h1 class="text-3xl font-bold text-white mb-2"> 生成访问链接 </h1><p class="text-gray-300 text-sm"> 生成一次性访问链接，24小时内有效 </p></div><div class="space-y-6">`);
      _push(ssrRenderComponent(_component_UButton, {
        type: "button",
        loading: unref(loading),
        size: "xl",
        color: "primary",
        block: "",
        class: "w-full",
        onClick: generateLink
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(generatedLink) ? "重新生成链接" : "生成访问链接")}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(generatedLink) ? "重新生成链接" : "生成访问链接"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(error)) {
        _push(`<div class="p-4 bg-red-500/20 border border-red-500/50 rounded-lg"><p class="text-red-400 text-sm">${ssrInterpolate(unref(error))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(generatedLink)) {
        _push(`<div class="space-y-4"><div class="p-4 bg-green-500/20 border border-green-500/50 rounded-lg"><p class="text-green-400 text-sm mb-2"> ✅ 链接已生成，24小时内有效 </p></div><div><label class="block text-gray-300 text-sm mb-2"> 访问链接： </label><div class="flex gap-2">`);
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": unref(generatedLink),
          readonly: "",
          size: "lg",
          class: "flex-1"
        }, null, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          variant: "outline",
          icon: "i-heroicons-clipboard-document",
          onClick: ($event) => copyToClipboard(unref(generatedLink))
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 复制 `);
            } else {
              return [
                createTextVNode(" 复制 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div><label class="block text-gray-300 text-sm mb-2"> Token： </label><div class="flex gap-2">`);
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": unref(token),
          readonly: "",
          size: "lg",
          class: "flex-1 font-mono text-xs"
        }, null, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          variant: "outline",
          icon: "i-heroicons-clipboard-document",
          onClick: ($event) => copyToClipboard(unref(token))
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 复制 `);
            } else {
              return [
                createTextVNode(" 复制 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div class="p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg"><p class="text-blue-300 text-sm"><strong>使用说明：</strong></p><ul class="text-blue-300/80 text-sm mt-2 space-y-1 list-disc list-inside"><li>通过此链接访问的用户无需输入密码</li><li>链接在24小时后自动失效</li><li>通过链接访问的用户无法访问此管理页面</li><li>可以生成多个链接，每个链接独立有效</li></ul></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/generate-link.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=generate-link-CxNzXuX4.mjs.map
