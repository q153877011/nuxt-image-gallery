import { _ as __nuxt_component_6, a as _sfc_main$2 } from './Skeleton-Be90Gzm9.mjs';
import { u as useHead, d as useFile, e as useState, _ as __nuxt_component_0$3, f as _sfc_main$e } from './server.mjs';
import { defineComponent, ref, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../nitro/nitro.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'reka-ui';
import 'node:http';
import 'node:https';
import 'vue-router';
import '@unhead/addons';
import 'unhead/plugins';
import '@unhead/schema-org/vue';
import 'devalue';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'unhead/utils';
import 'lru-cache';
import '@unocss/core';
import '@unocss/preset-wind3';
import 'consola';
import 'node:crypto';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import '@iconify/utils';
import 'unhead/server';
import 'vue-bundle-renderer/runtime';

const _imports_0 = publicAssetsURL("/logo.svg");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ImageGallery",
  __ssrInlineRender: true,
  setup(__props) {
    ref([]);
    const { images } = useFile();
    const active = useState("$wbAUwY-Lyd");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BottomMenu = __nuxt_component_6;
      const _component_NuxtLink = __nuxt_component_0$3;
      const _component_UIcon = _sfc_main$e;
      const _component_USkeleton = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-30434c76>`);
      if (unref(images)) {
        _push(`<section class="relative h-screen gap-[22px] p-4" data-v-30434c76>`);
        _push(ssrRenderComponent(_component_BottomMenu, { class: "bottom-menu" }, {
          logo: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttr("src", _imports_0)} width="29" height="20" data-v-30434c76${_scopeId}>`);
            } else {
              return [
                createVNode("img", {
                  src: _imports_0,
                  width: "29",
                  height: "20"
                })
              ];
            }
          }),
          description: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex gap-x-4 items-center" data-v-30434c76${_scopeId}><p class="bottom-menu-description text-sm sm:text-base leading-tight sm:leading-normal" data-v-30434c76${_scopeId}> Media Gallery template </p>`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: "https://github.com/Flosciante/nuxt-image-gallery",
                target: "blank",
                class: "flex items-center"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-simple-icons-github",
                      class: "w-5 h-5"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UIcon, {
                        name: "i-simple-icons-github",
                        class: "w-5 h-5"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex gap-x-4 items-center" }, [
                  createVNode("p", { class: "bottom-menu-description text-sm sm:text-base leading-tight sm:leading-normal" }, " Media Gallery template "),
                  createVNode(_component_NuxtLink, {
                    to: "https://github.com/Flosciante/nuxt-image-gallery",
                    target: "blank",
                    class: "flex items-center"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UIcon, {
                        name: "i-simple-icons-github",
                        class: "w-5 h-5"
                      })
                    ]),
                    _: 1
                  })
                ])
              ];
            }
          }),
          buttons: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex gap-x-2" data-v-30434c76${_scopeId}></div>`);
            } else {
              return [
                createVNode("div", { class: "flex gap-x-2" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="${ssrRenderClass([{ "masonry-container": unref(images) && unref(images).length }, "w-full"])}" data-v-30434c76>`);
        if (unref(images) && unref(images).length) {
          _push(`<ul class="grid grid-cols-1 gap-4 lg:block" data-v-30434c76><!--[-->`);
          ssrRenderList(unref(images), (image) => {
            _push(`<li class="relative w-full group masonry-item" data-v-30434c76>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/detail/${image.id}`,
              onClick: ($event) => active.value = image.id
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  if (image) {
                    _push2(`<img width="527" height="430"${ssrRenderAttr("src", image.url)} class="${ssrRenderClass([{ imageEl: image.id === unref(active) }, "h-auto w-full max-h-[430px] rounded-md transition-all duration-200 border-image brightness-[.8] hover:brightness-100 will-change-[filter] object-cover"])}" data-v-30434c76${_scopeId}>`);
                  } else {
                    _push2(`<!---->`);
                  }
                } else {
                  return [
                    image ? (openBlock(), createBlock("img", {
                      key: 0,
                      width: "527",
                      height: "430",
                      src: image.url,
                      class: [{ imageEl: image.id === unref(active) }, "h-auto w-full max-h-[430px] rounded-md transition-all duration-200 border-image brightness-[.8] hover:brightness-100 will-change-[filter] object-cover"]
                    }, null, 10, ["src"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<div class="text-2xl text-white flex flex-col gap-y-4 items-center justify-center h-full w-full pb-8" data-v-30434c76><h1 class="font-medium text-5xl" data-v-30434c76> Welcome to image gallery </h1><p class="text-gray-400" data-v-30434c76> No images available </p></div>`);
        }
        _push(`</div></section>`);
      } else {
        _push(`<div class="flex items-center space-x-4 z-10" data-v-30434c76>`);
        _push(ssrRenderComponent(_component_USkeleton, {
          class: "h-12 w-12 bg-white-500",
          ui: { rounded: "rounded-full" }
        }, null, _parent));
        _push(`<div class="space-y-2" data-v-30434c76>`);
        _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-[250px] bg-white-500" }, null, _parent));
        _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-[200px] bg-white-500" }, null, _parent));
        _push(`</div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ImageGallery.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-30434c76"]]), { __name: "ImageGallery" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Nuxt Image Gallery - Beautiful Image Collection",
      meta: [
        { name: "description", content: "Explore our curated collection of high-quality images. Upload, view, and share beautiful photos in our modern image gallery." },
        { name: "keywords", content: "image gallery, photo collection, Nuxt, image viewer, photo sharing" },
        { property: "og:title", content: "Nuxt Image Gallery - Beautiful Image Collection" },
        { property: "og:description", content: "Explore our curated collection of high-quality images. Upload, view, and share beautiful photos in our modern image gallery." },
        { name: "twitter:title", content: "Nuxt Image Gallery - Beautiful Image Collection" },
        { name: "twitter:description", content: "Explore our curated collection of high-quality images. Upload, view, and share beautiful photos in our modern image gallery." }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ImageGallery = __nuxt_component_0;
      _push(`<main${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_ImageGallery, null, null, _parent));
      _push(`</main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-fIdSCJPQ.mjs.map
