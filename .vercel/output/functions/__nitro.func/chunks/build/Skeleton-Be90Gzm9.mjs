import { defineComponent, computed, unref, mergeProps, withCtx, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrRenderClass } from 'vue/server-renderer';
import { g as useAppConfig, t as tv, A as useRoute } from './server.mjs';
import { Primitive } from 'reka-ui';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BottomMenu",
  __ssrInlineRender: true,
  props: {
    filter: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const route = useRoute();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [[unref(route).path === "/" ? "bottom-8" : "bottom-16", __props.filter ? "h-auto rounded-md p-8" : "h-[60px]"], "justify-center flex flex-col inset-x-0 mx-auto fixed w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] 2xl:w-[30%] z-[9999] bg-gray-900 rounded-full after:rounded-full border border-1 border-white/30"]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "filter", {}, null, _push, _parent);
      _push(`<div class="${ssrRenderClass([__props.filter ? "pt-6" : "pl-6 pr-3", "flex justify-between items-center h-full z-50"])}">`);
      ssrRenderSlot(_ctx.$slots, "logo", {}, null, _push, _parent);
      _push(`<div class="${ssrRenderClass([{ "px-2": !__props.filter }, "text-white text-sm text-center"])}">`);
      ssrRenderSlot(_ctx.$slots, "description", {}, null, _push, _parent);
      _push(`</div>`);
      ssrRenderSlot(_ctx.$slots, "buttons", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BottomMenu.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_6 = Object.assign(_sfc_main$1, { __name: "BottomMenu" });
const theme = {
  "base": "animate-pulse rounded-md bg-elevated"
};
const _sfc_main = {
  __name: "USkeleton",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    class: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const appConfig = useAppConfig();
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.skeleton || {} }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        "aria-busy": "true",
        "aria-label": "loading",
        "aria-live": "polite",
        role: "alert",
        class: ui.value({ class: props.class })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@3.2.0_@babel+parser@7.28.0_@netlify+blobs@9.1.2_db0@0.3.2_embla-carousel@8.6.0_33eafb1be63c943c0b8b111c7f47391f/node_modules/@nuxt/ui/dist/runtime/components/Skeleton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { __nuxt_component_6 as _, _sfc_main as a };
//# sourceMappingURL=Skeleton-Be90Gzm9.mjs.map
