import { defineComponent, computed, watchEffect, ref, watch, unref, mergeProps, withCtx, isRef, createVNode, createBlock, createCommentVNode, openBlock, createTextVNode, renderSlot, mergeModels, useSlots, useModel, toRef, toDisplayString, withModifiers, Fragment, renderList, useId, resolveDynamicComponent, toRaw, reactive, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrRenderStyle, ssrRenderSlot, ssrInterpolate, ssrRenderList, ssrRenderVNode } from 'vue/server-renderer';
import { Primitive, useFilter, useForwardPropsEmits, ComboboxGroup, ComboboxItem, ComboboxRoot, ComboboxAnchor, ComboboxTrigger, ComboboxPortal, ComboboxContent, FocusScope, ComboboxInput, ComboboxEmpty, ComboboxLabel, ComboboxSeparator, ComboboxItemIndicator, ComboboxArrow, useForwardProps, Label, CheckboxRoot, CheckboxIndicator, TooltipRoot, TooltipTrigger, TooltipPortal, TooltipContent, TooltipArrow, SliderRoot, SliderTrack, SliderRange, SliderThumb } from 'reka-ui';
import { A as useRoute, d as useFile, u as useHead, E as useMediaQuery, e as useState, z as useRouter, F as onKeyStroke, f as _sfc_main$e, b as _sfc_main$9$1, y as useNuxtApp, B as isImageMatch, g as useAppConfig, t as tv, h as useLocale, r as reactivePick, j as usePortal, k as useFormField, l as useButtonGroup, m as useComponentIcons, n as createReusableTemplate, o as isArrayOfArray, p as get, q as compare, s as _sfc_main$c, v as _sfc_main$d, C as useSwipe, x as useVModel, w as createSharedComposable, D as encodeImageSlug } from './server.mjs';
import { a6 as defu } from '../nitro/nitro.mjs';
import { _ as _sfc_main$b } from './Input-C3K6D_9e.mjs';
import { _ as __nuxt_component_6, a as _sfc_main$a } from './Skeleton-Be90Gzm9.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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

const theme$5 = {
  "base": "w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8"
};
const _sfc_main$9 = {
  __name: "UContainer",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    class: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const appConfig = useAppConfig();
    const ui = computed(() => tv({ extend: tv(theme$5), ...appConfig.ui?.container || {} }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
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
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@3.2.0_@babel+parser@7.28.0_@netlify+blobs@9.1.2_db0@0.3.2_embla-carousel@8.6.0_33eafb1be63c943c0b8b111c7f47391f/node_modules/@nuxt/ui/dist/runtime/components/Container.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "ImageFilters",
  __ssrInlineRender: true,
  emits: ["resetFilter", "closeFilter"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$9$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-5 flex flex-col justify-between w-[350px] bg-gray-900 z-50 rounded-lg border border-zinc-700" }, _attrs))}><div><span class="text-white">Filters</span><div class="mt-[28px]">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        label: "Reset",
        color: "black",
        variant: "outline",
        class: "text-gray-400 hover:text-gray-300 transition-colors duration-200 w-fit",
        onClick: ($event) => _ctx.$emit("resetFilter")
      }, null, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-x-mark",
        variant: "ghost",
        color: "gray",
        size: "xs",
        class: "flex absolute top-4 right-4",
        onClick: ($event) => _ctx.$emit("closeFilter")
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ImageFilters.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$8, { __name: "ImageFilters" });
const theme$4 = {
  "slots": {
    "base": [
      "relative group rounded-md inline-flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center",
    "trailingIcon": "shrink-0 text-dimmed",
    "value": "truncate pointer-events-none",
    "placeholder": "truncate text-dimmed",
    "arrow": "fill-default",
    "content": [
      "max-h-60 w-(--reka-select-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-select-content-transform-origin) pointer-events-auto flex flex-col",
      "origin-(--reka-combobox-content-transform-origin) w-(--reka-combobox-trigger-width)"
    ],
    "viewport": "relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1",
    "group": "p-1 isolate",
    "empty": "text-center text-muted",
    "label": "font-semibold text-highlighted",
    "separator": "-mx-1 my-1 h-px bg-border",
    "item": [
      "group relative w-full flex items-center select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50",
      "transition-colors before:transition-colors"
    ],
    "itemLeadingIcon": [
      "shrink-0 text-dimmed group-data-highlighted:not-group-data-disabled:text-default",
      "transition-colors"
    ],
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemLeadingChip": "shrink-0",
    "itemLeadingChipSize": "",
    "itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "itemTrailingIcon": "shrink-0",
    "itemLabel": "truncate",
    "input": "border-b border-default",
    "focusScope": "flex flex-col min-h-0"
  },
  "variants": {
    "buttonGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leading": "ps-2",
        "trailing": "pe-2",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1 text-[10px]/3 gap-1",
        "item": "p-1 text-xs gap-1",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4",
        "empty": "p-1 text-xs"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1.5 text-[10px]/3 gap-1.5",
        "item": "p-1.5 text-xs gap-1.5",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4",
        "empty": "p-1.5 text-xs"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-1.5 text-xs gap-1.5",
        "item": "p-1.5 text-sm gap-1.5",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5",
        "empty": "p-1.5 text-sm"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-2 text-xs gap-2",
        "item": "p-2 text-sm gap-2",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5",
        "empty": "p-2 text-sm"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6",
        "label": "p-2 text-sm gap-2",
        "item": "p-2 text-base gap-2",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemLeadingChip": "size-6",
        "itemLeadingChipSize": "lg",
        "itemTrailingIcon": "size-6",
        "empty": "p-2 text-base"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
    },
    "color": {
      "primary": "",
      "gray": "",
      "red": "",
      "neutral": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "gray",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray"
    },
    {
      "color": "red",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "gray",
      "highlight": true,
      "class": "ring ring-inset ring-gray"
    },
    {
      "color": "red",
      "highlight": true,
      "class": "ring ring-inset ring-red"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};
const _sfc_main$7 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "USelectMenu",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    id: { type: String, required: false },
    placeholder: { type: String, required: false },
    searchInput: { type: [Boolean, Object], required: false, default: true },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    required: { type: Boolean, required: false },
    trailingIcon: { type: String, required: false },
    selectedIcon: { type: String, required: false },
    content: { type: Object, required: false },
    arrow: { type: [Boolean, Object], required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    valueKey: { type: null, required: false },
    labelKey: { type: null, required: false, default: "label" },
    items: { type: null, required: false },
    defaultValue: { type: null, required: false },
    modelValue: { type: null, required: false },
    multiple: { type: Boolean, required: false },
    highlight: { type: Boolean, required: false },
    createItem: { type: [Boolean, String, Object], required: false },
    filterFields: { type: Array, required: false },
    ignoreFilter: { type: Boolean, required: false },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false, default: 0 },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false },
    name: { type: String, required: false },
    resetSearchTermOnBlur: { type: Boolean, required: false, default: true },
    resetSearchTermOnSelect: { type: Boolean, required: false, default: true },
    highlightOnHover: { type: Boolean, required: false },
    icon: { type: String, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: String, required: false },
    trailing: { type: Boolean, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: String, required: false }
  }, {
    "searchTerm": { type: String, ...{ default: "" } },
    "searchTermModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["update:open", "change", "blur", "focus", "create", "highlight", "update:modelValue"], ["update:searchTerm"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const searchTerm = useModel(__props, "searchTerm", { type: String, ...{ default: "" } });
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const { contains } = useFilter({ sensitivity: "base" });
    const rootProps = useForwardPropsEmits(reactivePick(props, "modelValue", "defaultValue", "open", "defaultOpen", "required", "multiple", "resetSearchTermOnBlur", "resetSearchTermOnSelect", "highlightOnHover"), emits);
    const portalProps = usePortal(toRef(() => props.portal));
    const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8, position: "popper" }));
    const arrowProps = toRef(() => props.arrow);
    const searchInputProps = toRef(() => defu(props.searchInput, { placeholder: t("selectMenu.search"), variant: "none" }));
    const { emitFormBlur, emitFormFocus, emitFormInput, emitFormChange, size: formGroupSize, color, id, name, highlight, disabled, ariaAttrs } = useFormField(props);
    const { orientation, size: buttonGroupSize } = useButtonGroup(props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(toRef(() => defu(props, { trailingIcon: appConfig.ui.icons.chevronDown })));
    const selectSize = computed(() => buttonGroupSize.value || formGroupSize.value);
    const [DefineCreateItemTemplate, ReuseCreateItemTemplate] = createReusableTemplate();
    const ui = computed(() => tv({ extend: tv(theme$4), ...appConfig.ui?.selectMenu || {} })({
      color: color.value,
      variant: props.variant,
      size: selectSize?.value,
      loading: props.loading,
      highlight: highlight.value,
      leading: isLeading.value || !!props.avatar || !!slots.leading,
      trailing: isTrailing.value || !!slots.trailing,
      buttonGroup: orientation.value
    }));
    function displayValue(value) {
      if (props.multiple && Array.isArray(value)) {
        const values = value.map((v) => displayValue(v)).filter(Boolean);
        return values?.length ? values.join(", ") : void 0;
      }
      if (!props.valueKey) {
        return value && (typeof value === "object" ? get(value, props.labelKey) : value);
      }
      const item = items.value.find((item2) => compare(typeof item2 === "object" ? get(item2, props.valueKey) : item2, value));
      return item && (typeof item === "object" ? get(item, props.labelKey) : item);
    }
    const groups = computed(
      () => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []
    );
    const items = computed(() => groups.value.flatMap((group) => group));
    const filteredGroups = computed(() => {
      if (props.ignoreFilter || !searchTerm.value) {
        return groups.value;
      }
      const fields = Array.isArray(props.filterFields) ? props.filterFields : [props.labelKey];
      return groups.value.map((items2) => items2.filter((item) => {
        if (typeof item !== "object" || item === null) {
          return contains(String(item), searchTerm.value);
        }
        if (item.type && ["label", "separator"].includes(item.type)) {
          return true;
        }
        return fields.some((field) => contains(get(item, field), searchTerm.value));
      })).filter((group) => group.filter(
        (item) => !isSelectItem(item) || (!item.type || !["label", "separator"].includes(item.type))
      ).length > 0);
    });
    const filteredItems = computed(() => filteredGroups.value.flatMap((group) => group));
    const createItem = computed(() => {
      if (!props.createItem || !searchTerm.value) {
        return false;
      }
      const newItem = props.valueKey ? { [props.valueKey]: searchTerm.value } : searchTerm.value;
      if (typeof props.createItem === "object" && props.createItem.when === "always" || props.createItem === "always") {
        return !filteredItems.value.find((item) => compare(item, newItem, props.valueKey));
      }
      return !filteredItems.value.length;
    });
    const createItemPosition = computed(() => typeof props.createItem === "object" ? props.createItem.position : "bottom");
    const triggerRef = ref(null);
    function onUpdate(value) {
      if (toRaw(props.modelValue) === value) {
        return;
      }
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
      if (props.resetSearchTermOnSelect) {
        searchTerm.value = "";
      }
    }
    function onUpdateOpen(value) {
      let timeoutId;
      if (!value) {
        const event = new FocusEvent("blur");
        emits("blur", event);
        emitFormBlur();
        if (props.resetSearchTermOnBlur) {
          const STATE_ANIMATION_DELAY_MS = 100;
          timeoutId = setTimeout(() => {
            searchTerm.value = "";
          }, STATE_ANIMATION_DELAY_MS);
        }
      } else {
        const event = new FocusEvent("focus");
        emits("focus", event);
        emitFormFocus();
        clearTimeout(timeoutId);
      }
    }
    function onSelect(e, item) {
      if (!isSelectItem(item)) {
        return;
      }
      if (item.disabled) {
        e.preventDefault();
        return;
      }
      item.onSelect?.(e);
    }
    function isSelectItem(item) {
      return typeof item === "object" && item !== null;
    }
    __expose({
      triggerRef
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(DefineCreateItemTemplate), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ComboboxGroup), {
              class: ui.value.group({ class: props.ui?.group })
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ComboboxItem), {
                    class: ui.value.item({ class: props.ui?.item }),
                    value: searchTerm.value,
                    onSelect: ($event) => emits("create", searchTerm.value)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="${ssrRenderClass(ui.value.itemLabel({ class: props.ui?.itemLabel }))}"${_scopeId3}>`);
                        ssrRenderSlot(_ctx.$slots, "create-item-label", { item: searchTerm.value }, () => {
                          _push4(`${ssrInterpolate(unref(t)("selectMenu.create", { label: searchTerm.value }))}`);
                        }, _push4, _parent4, _scopeId3);
                        _push4(`</span>`);
                      } else {
                        return [
                          createVNode("span", {
                            class: ui.value.itemLabel({ class: props.ui?.itemLabel })
                          }, [
                            renderSlot(_ctx.$slots, "create-item-label", { item: searchTerm.value }, () => [
                              createTextVNode(toDisplayString(unref(t)("selectMenu.create", { label: searchTerm.value })), 1)
                            ])
                          ], 2)
                        ];
                      }
                    }),
                    _: 3
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ComboboxItem), {
                      class: ui.value.item({ class: props.ui?.item }),
                      value: searchTerm.value,
                      onSelect: withModifiers(($event) => emits("create", searchTerm.value), ["prevent"])
                    }, {
                      default: withCtx(() => [
                        createVNode("span", {
                          class: ui.value.itemLabel({ class: props.ui?.itemLabel })
                        }, [
                          renderSlot(_ctx.$slots, "create-item-label", { item: searchTerm.value }, () => [
                            createTextVNode(toDisplayString(unref(t)("selectMenu.create", { label: searchTerm.value })), 1)
                          ])
                        ], 2)
                      ]),
                      _: 3
                    }, 8, ["class", "value", "onSelect"])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ComboboxGroup), {
                class: ui.value.group({ class: props.ui?.group })
              }, {
                default: withCtx(() => [
                  createVNode(unref(ComboboxItem), {
                    class: ui.value.item({ class: props.ui?.item }),
                    value: searchTerm.value,
                    onSelect: withModifiers(($event) => emits("create", searchTerm.value), ["prevent"])
                  }, {
                    default: withCtx(() => [
                      createVNode("span", {
                        class: ui.value.itemLabel({ class: props.ui?.itemLabel })
                      }, [
                        renderSlot(_ctx.$slots, "create-item-label", { item: searchTerm.value }, () => [
                          createTextVNode(toDisplayString(unref(t)("selectMenu.create", { label: searchTerm.value })), 1)
                        ])
                      ], 2)
                    ]),
                    _: 3
                  }, 8, ["class", "value", "onSelect"])
                ]),
                _: 3
              }, 8, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent(unref(ComboboxRoot), mergeProps({ id: unref(id) }, { ...unref(rootProps), ..._ctx.$attrs, ...unref(ariaAttrs) }, {
        "ignore-filter": "",
        "as-child": "",
        name: unref(name),
        disabled: unref(disabled),
        "onUpdate:modelValue": onUpdate,
        "onUpdate:open": onUpdateOpen
      }), {
        default: withCtx(({ modelValue, open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ComboboxAnchor), { "as-child": "" }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ComboboxTrigger), {
                    ref_key: "triggerRef",
                    ref: triggerRef,
                    class: ui.value.base({ class: [props.ui?.base, props.class] }),
                    tabindex: "0"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(isLeading) || !!__props.avatar || !!slots.leading) {
                          _push4(`<span class="${ssrRenderClass(ui.value.leading({ class: props.ui?.leading }))}"${_scopeId3}>`);
                          ssrRenderSlot(_ctx.$slots, "leading", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => {
                            if (unref(isLeading) && unref(leadingIconName)) {
                              _push4(ssrRenderComponent(_sfc_main$e, {
                                name: unref(leadingIconName),
                                class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                              }, null, _parent4, _scopeId3));
                            } else if (!!__props.avatar) {
                              _push4(ssrRenderComponent(_sfc_main$c, mergeProps({
                                size: props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                              }, __props.avatar, {
                                class: ui.value.itemLeadingAvatar({ class: props.ui?.itemLeadingAvatar })
                              }), null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          }, _push4, _parent4, _scopeId3);
                          _push4(`</span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        ssrRenderSlot(_ctx.$slots, "default", {
                          modelValue,
                          open
                        }, () => {
                          _push4(`<!--[-->`);
                          ssrRenderList([displayValue(modelValue)], (displayedModelValue) => {
                            _push4(`<!--[-->`);
                            if (displayedModelValue !== void 0 && displayedModelValue !== null) {
                              _push4(`<span class="${ssrRenderClass(ui.value.value({ class: props.ui?.value }))}"${_scopeId3}>${ssrInterpolate(displayedModelValue)}</span>`);
                            } else {
                              _push4(`<span class="${ssrRenderClass(ui.value.placeholder({ class: props.ui?.placeholder }))}"${_scopeId3}>${ssrInterpolate(__props.placeholder ?? " ")}</span>`);
                            }
                            _push4(`<!--]-->`);
                          });
                          _push4(`<!--]-->`);
                        }, _push4, _parent4, _scopeId3);
                        if (unref(isTrailing) || !!slots.trailing) {
                          _push4(`<span class="${ssrRenderClass(ui.value.trailing({ class: props.ui?.trailing }))}"${_scopeId3}>`);
                          ssrRenderSlot(_ctx.$slots, "trailing", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => {
                            if (unref(trailingIconName)) {
                              _push4(ssrRenderComponent(_sfc_main$e, {
                                name: unref(trailingIconName),
                                class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                              }, null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          }, _push4, _parent4, _scopeId3);
                          _push4(`</span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          unref(isLeading) || !!__props.avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: ui.value.leading({ class: props.ui?.leading })
                          }, [
                            renderSlot(_ctx.$slots, "leading", {
                              modelValue,
                              open,
                              ui: ui.value
                            }, () => [
                              unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$e, {
                                key: 0,
                                name: unref(leadingIconName),
                                class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                              }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                key: 1,
                                size: props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                              }, __props.avatar, {
                                class: ui.value.itemLeadingAvatar({ class: props.ui?.itemLeadingAvatar })
                              }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                            ])
                          ], 2)) : createCommentVNode("", true),
                          renderSlot(_ctx.$slots, "default", {
                            modelValue,
                            open
                          }, () => [
                            (openBlock(true), createBlock(Fragment, null, renderList([displayValue(modelValue)], (displayedModelValue) => {
                              return openBlock(), createBlock(Fragment, { key: displayedModelValue }, [
                                displayedModelValue !== void 0 && displayedModelValue !== null ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: ui.value.value({ class: props.ui?.value })
                                }, toDisplayString(displayedModelValue), 3)) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: ui.value.placeholder({ class: props.ui?.placeholder })
                                }, toDisplayString(__props.placeholder ?? " "), 3))
                              ], 64);
                            }), 128))
                          ]),
                          unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                            key: 1,
                            class: ui.value.trailing({ class: props.ui?.trailing })
                          }, [
                            renderSlot(_ctx.$slots, "trailing", {
                              modelValue,
                              open,
                              ui: ui.value
                            }, () => [
                              unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$e, {
                                key: 0,
                                name: unref(trailingIconName),
                                class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                              }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                            ])
                          ], 2)) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ComboboxTrigger), {
                      ref_key: "triggerRef",
                      ref: triggerRef,
                      class: ui.value.base({ class: [props.ui?.base, props.class] }),
                      tabindex: "0"
                    }, {
                      default: withCtx(() => [
                        unref(isLeading) || !!__props.avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: ui.value.leading({ class: props.ui?.leading })
                        }, [
                          renderSlot(_ctx.$slots, "leading", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => [
                            unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$e, {
                              key: 0,
                              name: unref(leadingIconName),
                              class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                            }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                              key: 1,
                              size: props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                            }, __props.avatar, {
                              class: ui.value.itemLeadingAvatar({ class: props.ui?.itemLeadingAvatar })
                            }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                          ])
                        ], 2)) : createCommentVNode("", true),
                        renderSlot(_ctx.$slots, "default", {
                          modelValue,
                          open
                        }, () => [
                          (openBlock(true), createBlock(Fragment, null, renderList([displayValue(modelValue)], (displayedModelValue) => {
                            return openBlock(), createBlock(Fragment, { key: displayedModelValue }, [
                              displayedModelValue !== void 0 && displayedModelValue !== null ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: ui.value.value({ class: props.ui?.value })
                              }, toDisplayString(displayedModelValue), 3)) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: ui.value.placeholder({ class: props.ui?.placeholder })
                              }, toDisplayString(__props.placeholder ?? " "), 3))
                            ], 64);
                          }), 128))
                        ]),
                        unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                          key: 1,
                          class: ui.value.trailing({ class: props.ui?.trailing })
                        }, [
                          renderSlot(_ctx.$slots, "trailing", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => [
                            unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$e, {
                              key: 0,
                              name: unref(trailingIconName),
                              class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                            }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                          ])
                        ], 2)) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1032, ["class"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ComboboxPortal), unref(portalProps), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ComboboxContent), mergeProps({
                    class: ui.value.content({ class: props.ui?.content })
                  }, contentProps.value), {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(FocusScope), {
                          trapped: "",
                          class: ui.value.focusScope({ class: props.ui?.focusScope })
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              ssrRenderSlot(_ctx.$slots, "content-top", {}, null, _push5, _parent5, _scopeId4);
                              if (!!__props.searchInput) {
                                _push5(ssrRenderComponent(unref(ComboboxInput), {
                                  modelValue: searchTerm.value,
                                  "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                                  "display-value": () => searchTerm.value,
                                  "as-child": ""
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_sfc_main$b, mergeProps({
                                        autofocus: "",
                                        autocomplete: "off",
                                        size: __props.size
                                      }, searchInputProps.value, {
                                        class: ui.value.input({ class: props.ui?.input })
                                      }), null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_sfc_main$b, mergeProps({
                                          autofocus: "",
                                          autocomplete: "off",
                                          size: __props.size
                                        }, searchInputProps.value, {
                                          class: ui.value.input({ class: props.ui?.input })
                                        }), null, 16, ["size", "class"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(ssrRenderComponent(unref(ComboboxEmpty), {
                                class: ui.value.empty({ class: props.ui?.empty })
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    ssrRenderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => {
                                      _push6(`${ssrInterpolate(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData"))}`);
                                    }, _push6, _parent6, _scopeId5);
                                  } else {
                                    return [
                                      renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                        createTextVNode(toDisplayString(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)
                                      ])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`<div role="presentation" class="${ssrRenderClass(ui.value.viewport({ class: props.ui?.viewport }))}"${_scopeId4}>`);
                              if (createItem.value && createItemPosition.value === "top") {
                                _push5(ssrRenderComponent(unref(ReuseCreateItemTemplate), null, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`<!--[-->`);
                              ssrRenderList(filteredGroups.value, (group, groupIndex) => {
                                _push5(ssrRenderComponent(unref(ComboboxGroup), {
                                  key: `group-${groupIndex}`,
                                  class: ui.value.group({ class: props.ui?.group })
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(group, (item, index) => {
                                        _push6(`<!--[-->`);
                                        if (isSelectItem(item) && item.type === "label") {
                                          _push6(ssrRenderComponent(unref(ComboboxLabel), {
                                            class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
                                          }, {
                                            default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(`${ssrInterpolate(unref(get)(item, props.labelKey))}`);
                                              } else {
                                                return [
                                                  createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                        } else if (isSelectItem(item) && item.type === "separator") {
                                          _push6(ssrRenderComponent(unref(ComboboxSeparator), {
                                            class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })
                                          }, null, _parent6, _scopeId5));
                                        } else {
                                          _push6(ssrRenderComponent(unref(ComboboxItem), {
                                            class: ui.value.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                            disabled: isSelectItem(item) && item.disabled,
                                            value: props.valueKey && isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                            onSelect: ($event) => onSelect($event, item)
                                          }, {
                                            default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                ssrRenderSlot(_ctx.$slots, "item", {
                                                  item,
                                                  index
                                                }, () => {
                                                  ssrRenderSlot(_ctx.$slots, "item-leading", {
                                                    item,
                                                    index
                                                  }, () => {
                                                    if (isSelectItem(item) && item.icon) {
                                                      _push7(ssrRenderComponent(_sfc_main$e, {
                                                        name: item.icon,
                                                        class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                                      }, null, _parent7, _scopeId6));
                                                    } else if (isSelectItem(item) && item.avatar) {
                                                      _push7(ssrRenderComponent(_sfc_main$c, mergeProps({
                                                        size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                                      }, { ref_for: true }, item.avatar, {
                                                        class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                                      }), null, _parent7, _scopeId6));
                                                    } else if (isSelectItem(item) && item.chip) {
                                                      _push7(ssrRenderComponent(_sfc_main$d, mergeProps({
                                                        size: props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                        inset: "",
                                                        standalone: ""
                                                      }, { ref_for: true }, item.chip, {
                                                        class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                                      }), null, _parent7, _scopeId6));
                                                    } else {
                                                      _push7(`<!---->`);
                                                    }
                                                  }, _push7, _parent7, _scopeId6);
                                                  _push7(`<span class="${ssrRenderClass(ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] }))}"${_scopeId6}>`);
                                                  ssrRenderSlot(_ctx.$slots, "item-label", {
                                                    item,
                                                    index
                                                  }, () => {
                                                    _push7(`${ssrInterpolate(isSelectItem(item) ? unref(get)(item, props.labelKey) : item)}`);
                                                  }, _push7, _parent7, _scopeId6);
                                                  _push7(`</span><span class="${ssrRenderClass(ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] }))}"${_scopeId6}>`);
                                                  ssrRenderSlot(_ctx.$slots, "item-trailing", {
                                                    item,
                                                    index
                                                  }, null, _push7, _parent7, _scopeId6);
                                                  _push7(ssrRenderComponent(unref(ComboboxItemIndicator), { "as-child": "" }, {
                                                    default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                                      if (_push8) {
                                                        _push8(ssrRenderComponent(_sfc_main$e, {
                                                          name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                          class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                        }, null, _parent8, _scopeId7));
                                                      } else {
                                                        return [
                                                          createVNode(_sfc_main$e, {
                                                            name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                            class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                          }, null, 8, ["name", "class"])
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent7, _scopeId6));
                                                  _push7(`</span>`);
                                                }, _push7, _parent7, _scopeId6);
                                              } else {
                                                return [
                                                  renderSlot(_ctx.$slots, "item", {
                                                    item,
                                                    index
                                                  }, () => [
                                                    renderSlot(_ctx.$slots, "item-leading", {
                                                      item,
                                                      index
                                                    }, () => [
                                                      isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                                        key: 0,
                                                        name: item.icon,
                                                        class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                                      }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                                        key: 1,
                                                        size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                                      }, { ref_for: true }, item.avatar, {
                                                        class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                                      }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$d, mergeProps({
                                                        key: 2,
                                                        size: props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                        inset: "",
                                                        standalone: ""
                                                      }, { ref_for: true }, item.chip, {
                                                        class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                                      }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                    ]),
                                                    createVNode("span", {
                                                      class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                                    }, [
                                                      renderSlot(_ctx.$slots, "item-label", {
                                                        item,
                                                        index
                                                      }, () => [
                                                        createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                      ])
                                                    ], 2),
                                                    createVNode("span", {
                                                      class: ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                                    }, [
                                                      renderSlot(_ctx.$slots, "item-trailing", {
                                                        item,
                                                        index
                                                      }),
                                                      createVNode(unref(ComboboxItemIndicator), { "as-child": "" }, {
                                                        default: withCtx(() => [
                                                          createVNode(_sfc_main$e, {
                                                            name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                            class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                          }, null, 8, ["name", "class"])
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ], 2)
                                                  ])
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                        }
                                        _push6(`<!--]-->`);
                                      });
                                      _push6(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                          return openBlock(), createBlock(Fragment, {
                                            key: `group-${groupIndex}-${index}`
                                          }, [
                                            isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(ComboboxLabel), {
                                              key: 0,
                                              class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(ComboboxSeparator), {
                                              key: 1,
                                              class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })
                                            }, null, 8, ["class"])) : (openBlock(), createBlock(unref(ComboboxItem), {
                                              key: 2,
                                              class: ui.value.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                              disabled: isSelectItem(item) && item.disabled,
                                              value: props.valueKey && isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                              onSelect: ($event) => onSelect($event, item)
                                            }, {
                                              default: withCtx(() => [
                                                renderSlot(_ctx.$slots, "item", {
                                                  item,
                                                  index
                                                }, () => [
                                                  renderSlot(_ctx.$slots, "item-leading", {
                                                    item,
                                                    index
                                                  }, () => [
                                                    isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                                      key: 0,
                                                      name: item.icon,
                                                      class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                                    }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                                      key: 1,
                                                      size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                                    }, { ref_for: true }, item.avatar, {
                                                      class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                                    }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$d, mergeProps({
                                                      key: 2,
                                                      size: props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                      inset: "",
                                                      standalone: ""
                                                    }, { ref_for: true }, item.chip, {
                                                      class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                                    }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                  ]),
                                                  createVNode("span", {
                                                    class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                                  }, [
                                                    renderSlot(_ctx.$slots, "item-label", {
                                                      item,
                                                      index
                                                    }, () => [
                                                      createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                    ])
                                                  ], 2),
                                                  createVNode("span", {
                                                    class: ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                                  }, [
                                                    renderSlot(_ctx.$slots, "item-trailing", {
                                                      item,
                                                      index
                                                    }),
                                                    createVNode(unref(ComboboxItemIndicator), { "as-child": "" }, {
                                                      default: withCtx(() => [
                                                        createVNode(_sfc_main$e, {
                                                          name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                          class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                        }, null, 8, ["name", "class"])
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ], 2)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1032, ["class", "disabled", "value", "onSelect"]))
                                          ], 64);
                                        }), 128))
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                              if (createItem.value && createItemPosition.value === "bottom") {
                                _push5(ssrRenderComponent(unref(ReuseCreateItemTemplate), null, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div>`);
                              ssrRenderSlot(_ctx.$slots, "content-bottom", {}, null, _push5, _parent5, _scopeId4);
                            } else {
                              return [
                                renderSlot(_ctx.$slots, "content-top"),
                                !!__props.searchInput ? (openBlock(), createBlock(unref(ComboboxInput), {
                                  key: 0,
                                  modelValue: searchTerm.value,
                                  "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                                  "display-value": () => searchTerm.value,
                                  "as-child": ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$b, mergeProps({
                                      autofocus: "",
                                      autocomplete: "off",
                                      size: __props.size
                                    }, searchInputProps.value, {
                                      class: ui.value.input({ class: props.ui?.input })
                                    }), null, 16, ["size", "class"])
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue", "display-value"])) : createCommentVNode("", true),
                                createVNode(unref(ComboboxEmpty), {
                                  class: ui.value.empty({ class: props.ui?.empty })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                      createTextVNode(toDisplayString(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"]),
                                createVNode("div", {
                                  role: "presentation",
                                  class: ui.value.viewport({ class: props.ui?.viewport })
                                }, [
                                  createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 0 })) : createCommentVNode("", true),
                                  (openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
                                    return openBlock(), createBlock(unref(ComboboxGroup), {
                                      key: `group-${groupIndex}`,
                                      class: ui.value.group({ class: props.ui?.group })
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                          return openBlock(), createBlock(Fragment, {
                                            key: `group-${groupIndex}-${index}`
                                          }, [
                                            isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(ComboboxLabel), {
                                              key: 0,
                                              class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(ComboboxSeparator), {
                                              key: 1,
                                              class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })
                                            }, null, 8, ["class"])) : (openBlock(), createBlock(unref(ComboboxItem), {
                                              key: 2,
                                              class: ui.value.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                              disabled: isSelectItem(item) && item.disabled,
                                              value: props.valueKey && isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                              onSelect: ($event) => onSelect($event, item)
                                            }, {
                                              default: withCtx(() => [
                                                renderSlot(_ctx.$slots, "item", {
                                                  item,
                                                  index
                                                }, () => [
                                                  renderSlot(_ctx.$slots, "item-leading", {
                                                    item,
                                                    index
                                                  }, () => [
                                                    isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                                      key: 0,
                                                      name: item.icon,
                                                      class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                                    }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                                      key: 1,
                                                      size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                                    }, { ref_for: true }, item.avatar, {
                                                      class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                                    }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$d, mergeProps({
                                                      key: 2,
                                                      size: props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                      inset: "",
                                                      standalone: ""
                                                    }, { ref_for: true }, item.chip, {
                                                      class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                                    }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                  ]),
                                                  createVNode("span", {
                                                    class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                                  }, [
                                                    renderSlot(_ctx.$slots, "item-label", {
                                                      item,
                                                      index
                                                    }, () => [
                                                      createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                    ])
                                                  ], 2),
                                                  createVNode("span", {
                                                    class: ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                                  }, [
                                                    renderSlot(_ctx.$slots, "item-trailing", {
                                                      item,
                                                      index
                                                    }),
                                                    createVNode(unref(ComboboxItemIndicator), { "as-child": "" }, {
                                                      default: withCtx(() => [
                                                        createVNode(_sfc_main$e, {
                                                          name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                          class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                        }, null, 8, ["name", "class"])
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ], 2)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1032, ["class", "disabled", "value", "onSelect"]))
                                          ], 64);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1032, ["class"]);
                                  }), 128)),
                                  createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 1 })) : createCommentVNode("", true)
                                ], 2),
                                renderSlot(_ctx.$slots, "content-bottom")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        if (!!__props.arrow) {
                          _push4(ssrRenderComponent(unref(ComboboxArrow), mergeProps(arrowProps.value, {
                            class: ui.value.arrow({ class: props.ui?.arrow })
                          }), null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(unref(FocusScope), {
                            trapped: "",
                            class: ui.value.focusScope({ class: props.ui?.focusScope })
                          }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "content-top"),
                              !!__props.searchInput ? (openBlock(), createBlock(unref(ComboboxInput), {
                                key: 0,
                                modelValue: searchTerm.value,
                                "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                                "display-value": () => searchTerm.value,
                                "as-child": ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$b, mergeProps({
                                    autofocus: "",
                                    autocomplete: "off",
                                    size: __props.size
                                  }, searchInputProps.value, {
                                    class: ui.value.input({ class: props.ui?.input })
                                  }), null, 16, ["size", "class"])
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue", "display-value"])) : createCommentVNode("", true),
                              createVNode(unref(ComboboxEmpty), {
                                class: ui.value.empty({ class: props.ui?.empty })
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                    createTextVNode(toDisplayString(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)
                                  ])
                                ]),
                                _: 3
                              }, 8, ["class"]),
                              createVNode("div", {
                                role: "presentation",
                                class: ui.value.viewport({ class: props.ui?.viewport })
                              }, [
                                createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 0 })) : createCommentVNode("", true),
                                (openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
                                  return openBlock(), createBlock(unref(ComboboxGroup), {
                                    key: `group-${groupIndex}`,
                                    class: ui.value.group({ class: props.ui?.group })
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                        return openBlock(), createBlock(Fragment, {
                                          key: `group-${groupIndex}-${index}`
                                        }, [
                                          isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(ComboboxLabel), {
                                            key: 0,
                                            class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(ComboboxSeparator), {
                                            key: 1,
                                            class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })
                                          }, null, 8, ["class"])) : (openBlock(), createBlock(unref(ComboboxItem), {
                                            key: 2,
                                            class: ui.value.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                            disabled: isSelectItem(item) && item.disabled,
                                            value: props.valueKey && isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                            onSelect: ($event) => onSelect($event, item)
                                          }, {
                                            default: withCtx(() => [
                                              renderSlot(_ctx.$slots, "item", {
                                                item,
                                                index
                                              }, () => [
                                                renderSlot(_ctx.$slots, "item-leading", {
                                                  item,
                                                  index
                                                }, () => [
                                                  isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                                    key: 0,
                                                    name: item.icon,
                                                    class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                                  }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                                    key: 1,
                                                    size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                                  }, { ref_for: true }, item.avatar, {
                                                    class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                                  }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$d, mergeProps({
                                                    key: 2,
                                                    size: props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                    inset: "",
                                                    standalone: ""
                                                  }, { ref_for: true }, item.chip, {
                                                    class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                                  }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                ]),
                                                createVNode("span", {
                                                  class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                                }, [
                                                  renderSlot(_ctx.$slots, "item-label", {
                                                    item,
                                                    index
                                                  }, () => [
                                                    createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                  ])
                                                ], 2),
                                                createVNode("span", {
                                                  class: ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                                }, [
                                                  renderSlot(_ctx.$slots, "item-trailing", {
                                                    item,
                                                    index
                                                  }),
                                                  createVNode(unref(ComboboxItemIndicator), { "as-child": "" }, {
                                                    default: withCtx(() => [
                                                      createVNode(_sfc_main$e, {
                                                        name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                        class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                      }, null, 8, ["name", "class"])
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ], 2)
                                              ])
                                            ]),
                                            _: 2
                                          }, 1032, ["class", "disabled", "value", "onSelect"]))
                                        ], 64);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1032, ["class"]);
                                }), 128)),
                                createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 1 })) : createCommentVNode("", true)
                              ], 2),
                              renderSlot(_ctx.$slots, "content-bottom")
                            ]),
                            _: 3
                          }, 8, ["class"]),
                          !!__props.arrow ? (openBlock(), createBlock(unref(ComboboxArrow), mergeProps({ key: 0 }, arrowProps.value, {
                            class: ui.value.arrow({ class: props.ui?.arrow })
                          }), null, 16, ["class"])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ComboboxContent), mergeProps({
                      class: ui.value.content({ class: props.ui?.content })
                    }, contentProps.value), {
                      default: withCtx(() => [
                        createVNode(unref(FocusScope), {
                          trapped: "",
                          class: ui.value.focusScope({ class: props.ui?.focusScope })
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "content-top"),
                            !!__props.searchInput ? (openBlock(), createBlock(unref(ComboboxInput), {
                              key: 0,
                              modelValue: searchTerm.value,
                              "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                              "display-value": () => searchTerm.value,
                              "as-child": ""
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$b, mergeProps({
                                  autofocus: "",
                                  autocomplete: "off",
                                  size: __props.size
                                }, searchInputProps.value, {
                                  class: ui.value.input({ class: props.ui?.input })
                                }), null, 16, ["size", "class"])
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue", "display-value"])) : createCommentVNode("", true),
                            createVNode(unref(ComboboxEmpty), {
                              class: ui.value.empty({ class: props.ui?.empty })
                            }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                  createTextVNode(toDisplayString(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)
                                ])
                              ]),
                              _: 3
                            }, 8, ["class"]),
                            createVNode("div", {
                              role: "presentation",
                              class: ui.value.viewport({ class: props.ui?.viewport })
                            }, [
                              createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 0 })) : createCommentVNode("", true),
                              (openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
                                return openBlock(), createBlock(unref(ComboboxGroup), {
                                  key: `group-${groupIndex}`,
                                  class: ui.value.group({ class: props.ui?.group })
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                      return openBlock(), createBlock(Fragment, {
                                        key: `group-${groupIndex}-${index}`
                                      }, [
                                        isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(ComboboxLabel), {
                                          key: 0,
                                          class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(ComboboxSeparator), {
                                          key: 1,
                                          class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })
                                        }, null, 8, ["class"])) : (openBlock(), createBlock(unref(ComboboxItem), {
                                          key: 2,
                                          class: ui.value.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                          disabled: isSelectItem(item) && item.disabled,
                                          value: props.valueKey && isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                          onSelect: ($event) => onSelect($event, item)
                                        }, {
                                          default: withCtx(() => [
                                            renderSlot(_ctx.$slots, "item", {
                                              item,
                                              index
                                            }, () => [
                                              renderSlot(_ctx.$slots, "item-leading", {
                                                item,
                                                index
                                              }, () => [
                                                isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                                  key: 0,
                                                  name: item.icon,
                                                  class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                                }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                                  key: 1,
                                                  size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                                }, { ref_for: true }, item.avatar, {
                                                  class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                                }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$d, mergeProps({
                                                  key: 2,
                                                  size: props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                  inset: "",
                                                  standalone: ""
                                                }, { ref_for: true }, item.chip, {
                                                  class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                                }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                              ]),
                                              createVNode("span", {
                                                class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                              }, [
                                                renderSlot(_ctx.$slots, "item-label", {
                                                  item,
                                                  index
                                                }, () => [
                                                  createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                ])
                                              ], 2),
                                              createVNode("span", {
                                                class: ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                              }, [
                                                renderSlot(_ctx.$slots, "item-trailing", {
                                                  item,
                                                  index
                                                }),
                                                createVNode(unref(ComboboxItemIndicator), { "as-child": "" }, {
                                                  default: withCtx(() => [
                                                    createVNode(_sfc_main$e, {
                                                      name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                      class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                    }, null, 8, ["name", "class"])
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ], 2)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1032, ["class", "disabled", "value", "onSelect"]))
                                      ], 64);
                                    }), 128))
                                  ]),
                                  _: 2
                                }, 1032, ["class"]);
                              }), 128)),
                              createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 1 })) : createCommentVNode("", true)
                            ], 2),
                            renderSlot(_ctx.$slots, "content-bottom")
                          ]),
                          _: 3
                        }, 8, ["class"]),
                        !!__props.arrow ? (openBlock(), createBlock(unref(ComboboxArrow), mergeProps({ key: 0 }, arrowProps.value, {
                          class: ui.value.arrow({ class: props.ui?.arrow })
                        }), null, 16, ["class"])) : createCommentVNode("", true)
                      ]),
                      _: 3
                    }, 16, ["class"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ComboboxAnchor), { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(unref(ComboboxTrigger), {
                    ref_key: "triggerRef",
                    ref: triggerRef,
                    class: ui.value.base({ class: [props.ui?.base, props.class] }),
                    tabindex: "0"
                  }, {
                    default: withCtx(() => [
                      unref(isLeading) || !!__props.avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: ui.value.leading({ class: props.ui?.leading })
                      }, [
                        renderSlot(_ctx.$slots, "leading", {
                          modelValue,
                          open,
                          ui: ui.value
                        }, () => [
                          unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$e, {
                            key: 0,
                            name: unref(leadingIconName),
                            class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                          }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                            key: 1,
                            size: props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                          }, __props.avatar, {
                            class: ui.value.itemLeadingAvatar({ class: props.ui?.itemLeadingAvatar })
                          }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                        ])
                      ], 2)) : createCommentVNode("", true),
                      renderSlot(_ctx.$slots, "default", {
                        modelValue,
                        open
                      }, () => [
                        (openBlock(true), createBlock(Fragment, null, renderList([displayValue(modelValue)], (displayedModelValue) => {
                          return openBlock(), createBlock(Fragment, { key: displayedModelValue }, [
                            displayedModelValue !== void 0 && displayedModelValue !== null ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: ui.value.value({ class: props.ui?.value })
                            }, toDisplayString(displayedModelValue), 3)) : (openBlock(), createBlock("span", {
                              key: 1,
                              class: ui.value.placeholder({ class: props.ui?.placeholder })
                            }, toDisplayString(__props.placeholder ?? " "), 3))
                          ], 64);
                        }), 128))
                      ]),
                      unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                        key: 1,
                        class: ui.value.trailing({ class: props.ui?.trailing })
                      }, [
                        renderSlot(_ctx.$slots, "trailing", {
                          modelValue,
                          open,
                          ui: ui.value
                        }, () => [
                          unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$e, {
                            key: 0,
                            name: unref(trailingIconName),
                            class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                          }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                        ])
                      ], 2)) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1032, ["class"])
                ]),
                _: 2
              }, 1024),
              createVNode(unref(ComboboxPortal), unref(portalProps), {
                default: withCtx(() => [
                  createVNode(unref(ComboboxContent), mergeProps({
                    class: ui.value.content({ class: props.ui?.content })
                  }, contentProps.value), {
                    default: withCtx(() => [
                      createVNode(unref(FocusScope), {
                        trapped: "",
                        class: ui.value.focusScope({ class: props.ui?.focusScope })
                      }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "content-top"),
                          !!__props.searchInput ? (openBlock(), createBlock(unref(ComboboxInput), {
                            key: 0,
                            modelValue: searchTerm.value,
                            "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                            "display-value": () => searchTerm.value,
                            "as-child": ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$b, mergeProps({
                                autofocus: "",
                                autocomplete: "off",
                                size: __props.size
                              }, searchInputProps.value, {
                                class: ui.value.input({ class: props.ui?.input })
                              }), null, 16, ["size", "class"])
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue", "display-value"])) : createCommentVNode("", true),
                          createVNode(unref(ComboboxEmpty), {
                            class: ui.value.empty({ class: props.ui?.empty })
                          }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                createTextVNode(toDisplayString(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)
                              ])
                            ]),
                            _: 3
                          }, 8, ["class"]),
                          createVNode("div", {
                            role: "presentation",
                            class: ui.value.viewport({ class: props.ui?.viewport })
                          }, [
                            createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 0 })) : createCommentVNode("", true),
                            (openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
                              return openBlock(), createBlock(unref(ComboboxGroup), {
                                key: `group-${groupIndex}`,
                                class: ui.value.group({ class: props.ui?.group })
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                    return openBlock(), createBlock(Fragment, {
                                      key: `group-${groupIndex}-${index}`
                                    }, [
                                      isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(ComboboxLabel), {
                                        key: 0,
                                        class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(ComboboxSeparator), {
                                        key: 1,
                                        class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })
                                      }, null, 8, ["class"])) : (openBlock(), createBlock(unref(ComboboxItem), {
                                        key: 2,
                                        class: ui.value.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                        disabled: isSelectItem(item) && item.disabled,
                                        value: props.valueKey && isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                        onSelect: ($event) => onSelect($event, item)
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "item", {
                                            item,
                                            index
                                          }, () => [
                                            renderSlot(_ctx.$slots, "item-leading", {
                                              item,
                                              index
                                            }, () => [
                                              isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                                key: 0,
                                                name: item.icon,
                                                class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                              }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                                key: 1,
                                                size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                              }, { ref_for: true }, item.avatar, {
                                                class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                              }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$d, mergeProps({
                                                key: 2,
                                                size: props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                inset: "",
                                                standalone: ""
                                              }, { ref_for: true }, item.chip, {
                                                class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                              }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                            ]),
                                            createVNode("span", {
                                              class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                            }, [
                                              renderSlot(_ctx.$slots, "item-label", {
                                                item,
                                                index
                                              }, () => [
                                                createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                              ])
                                            ], 2),
                                            createVNode("span", {
                                              class: ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                            }, [
                                              renderSlot(_ctx.$slots, "item-trailing", {
                                                item,
                                                index
                                              }),
                                              createVNode(unref(ComboboxItemIndicator), { "as-child": "" }, {
                                                default: withCtx(() => [
                                                  createVNode(_sfc_main$e, {
                                                    name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                    class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                  }, null, 8, ["name", "class"])
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ], 2)
                                          ])
                                        ]),
                                        _: 2
                                      }, 1032, ["class", "disabled", "value", "onSelect"]))
                                    ], 64);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1032, ["class"]);
                            }), 128)),
                            createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 1 })) : createCommentVNode("", true)
                          ], 2),
                          renderSlot(_ctx.$slots, "content-bottom")
                        ]),
                        _: 3
                      }, 8, ["class"]),
                      !!__props.arrow ? (openBlock(), createBlock(unref(ComboboxArrow), mergeProps({ key: 0 }, arrowProps.value, {
                        class: ui.value.arrow({ class: props.ui?.arrow })
                      }), null, 16, ["class"])) : createCommentVNode("", true)
                    ]),
                    _: 3
                  }, 16, ["class"])
                ]),
                _: 3
              }, 16)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@3.2.0_@babel+parser@7.28.0_@netlify+blobs@9.1.2_db0@0.3.2_embla-carousel@8.6.0_33eafb1be63c943c0b8b111c7f47391f/node_modules/@nuxt/ui/dist/runtime/components/SelectMenu.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const theme$3 = {
  "slots": {
    "root": "relative flex items-start",
    "container": "flex items-center",
    "base": "rounded-sm ring ring-inset ring-accented overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2",
    "indicator": "flex items-center justify-center size-full text-inverted",
    "icon": "shrink-0 size-full",
    "wrapper": "w-full",
    "label": "block font-medium text-default",
    "description": "text-muted"
  },
  "variants": {
    "color": {
      "primary": {
        "base": "focus-visible:outline-primary",
        "indicator": "bg-primary"
      },
      "gray": {
        "base": "focus-visible:outline-gray",
        "indicator": "bg-gray"
      },
      "red": {
        "base": "focus-visible:outline-red",
        "indicator": "bg-red"
      },
      "neutral": {
        "base": "focus-visible:outline-inverted",
        "indicator": "bg-inverted"
      }
    },
    "variant": {
      "list": {
        "root": ""
      },
      "card": {
        "root": "border border-muted rounded-lg"
      }
    },
    "indicator": {
      "start": {
        "root": "flex-row",
        "wrapper": "ms-2"
      },
      "end": {
        "root": "flex-row-reverse",
        "wrapper": "me-2"
      },
      "hidden": {
        "base": "sr-only",
        "wrapper": "text-center"
      }
    },
    "size": {
      "xs": {
        "base": "size-3",
        "container": "h-4",
        "wrapper": "text-xs"
      },
      "sm": {
        "base": "size-3.5",
        "container": "h-4",
        "wrapper": "text-xs"
      },
      "md": {
        "base": "size-4",
        "container": "h-5",
        "wrapper": "text-sm"
      },
      "lg": {
        "base": "size-4.5",
        "container": "h-5",
        "wrapper": "text-sm"
      },
      "xl": {
        "base": "size-5",
        "container": "h-6",
        "wrapper": "text-base"
      }
    },
    "required": {
      "true": {
        "label": "after:content-['*'] after:ms-0.5 after:text-error"
      }
    },
    "disabled": {
      "true": {
        "base": "cursor-not-allowed opacity-75",
        "label": "cursor-not-allowed opacity-75",
        "description": "cursor-not-allowed opacity-75"
      }
    },
    "checked": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "size": "xs",
      "variant": "card",
      "class": {
        "root": "p-2.5"
      }
    },
    {
      "size": "sm",
      "variant": "card",
      "class": {
        "root": "p-3"
      }
    },
    {
      "size": "md",
      "variant": "card",
      "class": {
        "root": "p-3.5"
      }
    },
    {
      "size": "lg",
      "variant": "card",
      "class": {
        "root": "p-4"
      }
    },
    {
      "size": "xl",
      "variant": "card",
      "class": {
        "root": "p-4.5"
      }
    },
    {
      "color": "primary",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-primary"
      }
    },
    {
      "color": "gray",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-gray"
      }
    },
    {
      "color": "red",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-red"
      }
    },
    {
      "color": "neutral",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-inverted"
      }
    },
    {
      "variant": "card",
      "disabled": true,
      "class": {
        "root": "cursor-not-allowed opacity-75"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "list",
    "indicator": "start"
  }
};
const _sfc_main$6 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UCheckbox",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    as: { type: null, required: false },
    label: { type: String, required: false },
    description: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    indicator: { type: null, required: false },
    icon: { type: String, required: false },
    indeterminateIcon: { type: String, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    disabled: { type: Boolean, required: false },
    required: { type: Boolean, required: false },
    name: { type: String, required: false },
    value: { type: null, required: false },
    id: { type: String, required: false },
    defaultValue: { type: [Boolean, String], required: false }
  }, {
    "modelValue": { type: [Boolean, String], ...{ default: void 0 } },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["change"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const slots = useSlots();
    const emits = __emit;
    const modelValue = useModel(__props, "modelValue", { type: [Boolean, String], ...{ default: void 0 } });
    const appConfig = useAppConfig();
    const rootProps = useForwardProps(reactivePick(props, "required", "value", "defaultValue"));
    const { id: _id, emitFormChange, emitFormInput, size, color, name, disabled, ariaAttrs } = useFormField(props);
    const id = _id.value ?? useId();
    const ui = computed(() => tv({ extend: tv(theme$3), ...appConfig.ui?.checkbox || {} })({
      size: size.value,
      color: color.value,
      variant: props.variant,
      indicator: props.indicator,
      required: props.required,
      disabled: disabled.value
    }));
    function onUpdate(value) {
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: !__props.variant || __props.variant === "list" ? __props.as : unref(Label),
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass(ui.value.container({ class: props.ui?.container }))}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CheckboxRoot), mergeProps({ id: unref(id) }, { ...unref(rootProps), ..._ctx.$attrs, ...unref(ariaAttrs) }, {
              modelValue: modelValue.value,
              "onUpdate:modelValue": [($event) => modelValue.value = $event, onUpdate],
              name: unref(name),
              disabled: unref(disabled),
              class: ui.value.base({ class: props.ui?.base })
            }), {
              default: withCtx(({ modelValue: modelValue2 }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(CheckboxIndicator), {
                    class: ui.value.indicator({ class: props.ui?.indicator })
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (modelValue2 === "indeterminate") {
                          _push4(ssrRenderComponent(_sfc_main$e, {
                            name: __props.indeterminateIcon || unref(appConfig).ui.icons.minus,
                            class: ui.value.icon({ class: props.ui?.icon })
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(_sfc_main$e, {
                            name: __props.icon || unref(appConfig).ui.icons.check,
                            class: ui.value.icon({ class: props.ui?.icon })
                          }, null, _parent4, _scopeId3));
                        }
                      } else {
                        return [
                          modelValue2 === "indeterminate" ? (openBlock(), createBlock(_sfc_main$e, {
                            key: 0,
                            name: __props.indeterminateIcon || unref(appConfig).ui.icons.minus,
                            class: ui.value.icon({ class: props.ui?.icon })
                          }, null, 8, ["name", "class"])) : (openBlock(), createBlock(_sfc_main$e, {
                            key: 1,
                            name: __props.icon || unref(appConfig).ui.icons.check,
                            class: ui.value.icon({ class: props.ui?.icon })
                          }, null, 8, ["name", "class"]))
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(CheckboxIndicator), {
                      class: ui.value.indicator({ class: props.ui?.indicator })
                    }, {
                      default: withCtx(() => [
                        modelValue2 === "indeterminate" ? (openBlock(), createBlock(_sfc_main$e, {
                          key: 0,
                          name: __props.indeterminateIcon || unref(appConfig).ui.icons.minus,
                          class: ui.value.icon({ class: props.ui?.icon })
                        }, null, 8, ["name", "class"])) : (openBlock(), createBlock(_sfc_main$e, {
                          key: 1,
                          name: __props.icon || unref(appConfig).ui.icons.check,
                          class: ui.value.icon({ class: props.ui?.icon })
                        }, null, 8, ["name", "class"]))
                      ]),
                      _: 2
                    }, 1032, ["class"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.label || !!slots.label || (__props.description || !!slots.description)) {
              _push2(`<div class="${ssrRenderClass(ui.value.wrapper({ class: props.ui?.wrapper }))}"${_scopeId}>`);
              if (__props.label || !!slots.label) {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(!__props.variant || __props.variant === "list" ? unref(Label) : "p"), {
                  for: unref(id),
                  class: ui.value.label({ class: props.ui?.label })
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderSlot(_ctx.$slots, "label", { label: __props.label }, () => {
                        _push3(`${ssrInterpolate(__props.label)}`);
                      }, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, "label", { label: __props.label }, () => [
                          createTextVNode(toDisplayString(__props.label), 1)
                        ])
                      ];
                    }
                  }),
                  _: 3
                }), _parent2, _scopeId);
              } else {
                _push2(`<!---->`);
              }
              if (__props.description || !!slots.description) {
                _push2(`<p class="${ssrRenderClass(ui.value.description({ class: props.ui?.description }))}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, "description", { description: __props.description }, () => {
                  _push2(`${ssrInterpolate(__props.description)}`);
                }, _push2, _parent2, _scopeId);
                _push2(`</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", {
                class: ui.value.container({ class: props.ui?.container })
              }, [
                createVNode(unref(CheckboxRoot), mergeProps({ id: unref(id) }, { ...unref(rootProps), ..._ctx.$attrs, ...unref(ariaAttrs) }, {
                  modelValue: modelValue.value,
                  "onUpdate:modelValue": [($event) => modelValue.value = $event, onUpdate],
                  name: unref(name),
                  disabled: unref(disabled),
                  class: ui.value.base({ class: props.ui?.base })
                }), {
                  default: withCtx(({ modelValue: modelValue2 }) => [
                    createVNode(unref(CheckboxIndicator), {
                      class: ui.value.indicator({ class: props.ui?.indicator })
                    }, {
                      default: withCtx(() => [
                        modelValue2 === "indeterminate" ? (openBlock(), createBlock(_sfc_main$e, {
                          key: 0,
                          name: __props.indeterminateIcon || unref(appConfig).ui.icons.minus,
                          class: ui.value.icon({ class: props.ui?.icon })
                        }, null, 8, ["name", "class"])) : (openBlock(), createBlock(_sfc_main$e, {
                          key: 1,
                          name: __props.icon || unref(appConfig).ui.icons.check,
                          class: ui.value.icon({ class: props.ui?.icon })
                        }, null, 8, ["name", "class"]))
                      ]),
                      _: 2
                    }, 1032, ["class"])
                  ]),
                  _: 1
                }, 16, ["id", "modelValue", "onUpdate:modelValue", "name", "disabled", "class"])
              ], 2),
              __props.label || !!slots.label || (__props.description || !!slots.description) ? (openBlock(), createBlock("div", {
                key: 0,
                class: ui.value.wrapper({ class: props.ui?.wrapper })
              }, [
                __props.label || !!slots.label ? (openBlock(), createBlock(resolveDynamicComponent(!__props.variant || __props.variant === "list" ? unref(Label) : "p"), {
                  key: 0,
                  for: unref(id),
                  class: ui.value.label({ class: props.ui?.label })
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "label", { label: __props.label }, () => [
                      createTextVNode(toDisplayString(__props.label), 1)
                    ])
                  ]),
                  _: 3
                }, 8, ["for", "class"])) : createCommentVNode("", true),
                __props.description || !!slots.description ? (openBlock(), createBlock("p", {
                  key: 1,
                  class: ui.value.description({ class: props.ui?.description })
                }, [
                  renderSlot(_ctx.$slots, "description", { description: __props.description }, () => [
                    createTextVNode(toDisplayString(__props.description), 1)
                  ])
                ], 2)) : createCommentVNode("", true)
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@3.2.0_@babel+parser@7.28.0_@netlify+blobs@9.1.2_db0@0.3.2_embla-carousel@8.6.0_33eafb1be63c943c0b8b111c7f47391f/node_modules/@nuxt/ui/dist/runtime/components/Checkbox.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const kbdKeysMap = {
  meta: "",
  ctrl: "",
  alt: "",
  win: "⊞",
  command: "⌘",
  shift: "⇧",
  control: "⌃",
  option: "⌥",
  enter: "↵",
  delete: "⌦",
  backspace: "⌫",
  escape: "⎋",
  tab: "⇥",
  capslock: "⇪",
  arrowup: "↑",
  arrowright: "→",
  arrowdown: "↓",
  arrowleft: "←",
  pageup: "⇞",
  pagedown: "⇟",
  home: "↖",
  end: "↘"
};
const _useKbd = () => {
  const macOS = computed(() => false);
  const kbdKeysSpecificMap = reactive({
    meta: " ",
    alt: " ",
    ctrl: " "
  });
  function getKbdKey(value) {
    if (!value) {
      return;
    }
    if (["meta", "alt", "ctrl"].includes(value)) {
      return kbdKeysSpecificMap[value];
    }
    return kbdKeysMap[value] || value.toUpperCase();
  }
  return {
    macOS,
    getKbdKey
  };
};
const useKbd = /* @__PURE__ */ createSharedComposable(_useKbd);
const theme$2 = {
  "base": "inline-flex items-center justify-center px-1 rounded-sm font-medium font-sans",
  "variants": {
    "variant": {
      "solid": "bg-inverted text-inverted",
      "outline": "bg-default text-highlighted ring ring-inset ring-accented",
      "subtle": "bg-elevated text-default ring ring-inset ring-accented"
    },
    "size": {
      "sm": "h-4 min-w-[16px] text-[10px]",
      "md": "h-5 min-w-[20px] text-[11px]",
      "lg": "h-6 min-w-[24px] text-[12px]"
    }
  },
  "defaultVariants": {
    "variant": "outline",
    "size": "md"
  }
};
const _sfc_main$5 = {
  __name: "UKbd",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false, default: "kbd" },
    value: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    class: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const { getKbdKey } = useKbd();
    const appConfig = useAppConfig();
    const ui = computed(() => tv({ extend: tv(theme$2), ...appConfig.ui?.kbd || {} }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        class: ui.value({ variant: __props.variant, size: __props.size, class: props.class })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(`${ssrInterpolate(unref(getKbdKey)(__props.value))}`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createTextVNode(toDisplayString(unref(getKbdKey)(__props.value)), 1)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@3.2.0_@babel+parser@7.28.0_@netlify+blobs@9.1.2_db0@0.3.2_embla-carousel@8.6.0_33eafb1be63c943c0b8b111c7f47391f/node_modules/@nuxt/ui/dist/runtime/components/Kbd.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const theme$1 = {
  "slots": {
    "content": "flex items-center gap-1 bg-default text-highlighted shadow-sm rounded-sm ring ring-default h-6 px-2.5 py-1 text-xs select-none data-[state=delayed-open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-tooltip-content-transform-origin) pointer-events-auto",
    "arrow": "fill-default",
    "text": "truncate",
    "kbds": "hidden lg:inline-flex items-center shrink-0 gap-0.5 before:content-['·'] before:me-0.5",
    "kbdsSize": "sm"
  }
};
const _sfc_main$4 = {
  __name: "UTooltip",
  __ssrInlineRender: true,
  props: {
    text: { type: String, required: false },
    kbds: { type: Array, required: false },
    content: { type: Object, required: false },
    arrow: { type: [Boolean, Object], required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    defaultOpen: { type: Boolean, required: false },
    open: { type: Boolean, required: false },
    delayDuration: { type: Number, required: false },
    disableHoverableContent: { type: Boolean, required: false },
    disableClosingTrigger: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false },
    ignoreNonKeyboardFocus: { type: Boolean, required: false }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "defaultOpen", "open", "delayDuration", "disableHoverableContent", "disableClosingTrigger", "disabled", "ignoreNonKeyboardFocus"), emits);
    const portalProps = usePortal(toRef(() => props.portal));
    const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8 }));
    const arrowProps = toRef(() => props.arrow);
    const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.tooltip || {} })({
      side: contentProps.value.side
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TooltipRoot), mergeProps(unref(rootProps), _attrs), {
        default: withCtx(({ open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.default) {
              _push2(ssrRenderComponent(unref(TooltipTrigger), mergeProps(_ctx.$attrs, {
                "as-child": "",
                class: props.class
              }), {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default", { open })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(TooltipPortal), unref(portalProps), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TooltipContent), mergeProps(contentProps.value, {
                    class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
                  }), {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        ssrRenderSlot(_ctx.$slots, "content", {}, () => {
                          if (__props.text) {
                            _push4(`<span class="${ssrRenderClass(ui.value.text({ class: props.ui?.text }))}"${_scopeId3}>${ssrInterpolate(__props.text)}</span>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (__props.kbds?.length) {
                            _push4(`<span class="${ssrRenderClass(ui.value.kbds({ class: props.ui?.kbds }))}"${_scopeId3}><!--[-->`);
                            ssrRenderList(__props.kbds, (kbd, index) => {
                              _push4(ssrRenderComponent(_sfc_main$5, mergeProps({
                                key: index,
                                size: props.ui?.kbdsSize || ui.value.kbdsSize()
                              }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, _parent4, _scopeId3));
                            });
                            _push4(`<!--]--></span>`);
                          } else {
                            _push4(`<!---->`);
                          }
                        }, _push4, _parent4, _scopeId3);
                        if (!!__props.arrow) {
                          _push4(ssrRenderComponent(unref(TooltipArrow), mergeProps(arrowProps.value, {
                            class: ui.value.arrow({ class: props.ui?.arrow })
                          }), null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          renderSlot(_ctx.$slots, "content", {}, () => [
                            __props.text ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: ui.value.text({ class: props.ui?.text })
                            }, toDisplayString(__props.text), 3)) : createCommentVNode("", true),
                            __props.kbds?.length ? (openBlock(), createBlock("span", {
                              key: 1,
                              class: ui.value.kbds({ class: props.ui?.kbds })
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.kbds, (kbd, index) => {
                                return openBlock(), createBlock(_sfc_main$5, mergeProps({
                                  key: index,
                                  size: props.ui?.kbdsSize || ui.value.kbdsSize()
                                }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
                              }), 128))
                            ], 2)) : createCommentVNode("", true)
                          ]),
                          !!__props.arrow ? (openBlock(), createBlock(unref(TooltipArrow), mergeProps({ key: 0 }, arrowProps.value, {
                            class: ui.value.arrow({ class: props.ui?.arrow })
                          }), null, 16, ["class"])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(TooltipContent), mergeProps(contentProps.value, {
                      class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
                    }), {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "content", {}, () => [
                          __props.text ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: ui.value.text({ class: props.ui?.text })
                          }, toDisplayString(__props.text), 3)) : createCommentVNode("", true),
                          __props.kbds?.length ? (openBlock(), createBlock("span", {
                            key: 1,
                            class: ui.value.kbds({ class: props.ui?.kbds })
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.kbds, (kbd, index) => {
                              return openBlock(), createBlock(_sfc_main$5, mergeProps({
                                key: index,
                                size: props.ui?.kbdsSize || ui.value.kbdsSize()
                              }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
                            }), 128))
                          ], 2)) : createCommentVNode("", true)
                        ]),
                        !!__props.arrow ? (openBlock(), createBlock(unref(TooltipArrow), mergeProps({ key: 0 }, arrowProps.value, {
                          class: ui.value.arrow({ class: props.ui?.arrow })
                        }), null, 16, ["class"])) : createCommentVNode("", true)
                      ]),
                      _: 3
                    }, 16, ["class"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              !!slots.default ? (openBlock(), createBlock(unref(TooltipTrigger), mergeProps({ key: 0 }, _ctx.$attrs, {
                "as-child": "",
                class: props.class
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", { open })
                ]),
                _: 2
              }, 1040, ["class"])) : createCommentVNode("", true),
              createVNode(unref(TooltipPortal), unref(portalProps), {
                default: withCtx(() => [
                  createVNode(unref(TooltipContent), mergeProps(contentProps.value, {
                    class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
                  }), {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "content", {}, () => [
                        __props.text ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: ui.value.text({ class: props.ui?.text })
                        }, toDisplayString(__props.text), 3)) : createCommentVNode("", true),
                        __props.kbds?.length ? (openBlock(), createBlock("span", {
                          key: 1,
                          class: ui.value.kbds({ class: props.ui?.kbds })
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.kbds, (kbd, index) => {
                            return openBlock(), createBlock(_sfc_main$5, mergeProps({
                              key: index,
                              size: props.ui?.kbdsSize || ui.value.kbdsSize()
                            }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
                          }), 128))
                        ], 2)) : createCommentVNode("", true)
                      ]),
                      !!__props.arrow ? (openBlock(), createBlock(unref(TooltipArrow), mergeProps({ key: 0 }, arrowProps.value, {
                        class: ui.value.arrow({ class: props.ui?.arrow })
                      }), null, 16, ["class"])) : createCommentVNode("", true)
                    ]),
                    _: 3
                  }, 16, ["class"])
                ]),
                _: 3
              }, 16)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@3.2.0_@babel+parser@7.28.0_@netlify+blobs@9.1.2_db0@0.3.2_embla-carousel@8.6.0_33eafb1be63c943c0b8b111c7f47391f/node_modules/@nuxt/ui/dist/runtime/components/Tooltip.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const theme = {
  "slots": {
    "root": "relative flex items-center select-none touch-none",
    "track": "relative bg-accented overflow-hidden rounded-full grow",
    "range": "absolute rounded-full",
    "thumb": "rounded-full bg-default ring-2 focus-visible:outline-2 focus-visible:outline-offset-2"
  },
  "variants": {
    "color": {
      "primary": {
        "range": "bg-primary",
        "thumb": "ring-primary focus-visible:outline-primary/50"
      },
      "gray": {
        "range": "bg-gray",
        "thumb": "ring-gray focus-visible:outline-gray/50"
      },
      "red": {
        "range": "bg-red",
        "thumb": "ring-red focus-visible:outline-red/50"
      },
      "neutral": {
        "range": "bg-inverted",
        "thumb": "ring-inverted focus-visible:outline-inverted/50"
      }
    },
    "size": {
      "xs": {
        "thumb": "size-3"
      },
      "sm": {
        "thumb": "size-3.5"
      },
      "md": {
        "thumb": "size-4"
      },
      "lg": {
        "thumb": "size-4.5"
      },
      "xl": {
        "thumb": "size-5"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "w-full",
        "range": "h-full"
      },
      "vertical": {
        "root": "flex-col h-full",
        "range": "w-full"
      }
    },
    "disabled": {
      "true": {
        "root": "opacity-75 cursor-not-allowed"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "size": "xs",
      "class": {
        "track": "h-[6px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "sm",
      "class": {
        "track": "h-[7px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "md",
      "class": {
        "track": "h-[8px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "lg",
      "class": {
        "track": "h-[9px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "xl",
      "class": {
        "track": "h-[10px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "xs",
      "class": {
        "track": "w-[6px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "sm",
      "class": {
        "track": "w-[7px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "md",
      "class": {
        "track": "w-[8px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "lg",
      "class": {
        "track": "w-[9px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "xl",
      "class": {
        "track": "w-[10px]"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary"
  }
};
const _sfc_main$3 = {
  __name: "USlider",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    as: { type: null, required: false },
    size: { type: null, required: false },
    color: { type: null, required: false },
    orientation: { type: null, required: false, default: "horizontal" },
    tooltip: { type: [Boolean, Object], required: false },
    defaultValue: { type: [Number, Array], required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    name: { type: String, required: false },
    disabled: { type: Boolean, required: false },
    inverted: { type: Boolean, required: false },
    min: { type: Number, required: false, default: 0 },
    max: { type: Number, required: false, default: 100 },
    step: { type: Number, required: false, default: 1 },
    minStepsBetweenThumbs: { type: Number, required: false }
  }, {
    "modelValue": { type: null },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["update:modelValue", "change"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const modelValue = useModel(__props, "modelValue");
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "as", "orientation", "min", "max", "step", "minStepsBetweenThumbs", "inverted"), emits);
    const { id, emitFormChange, emitFormInput, size, color, name, disabled, ariaAttrs } = useFormField(props);
    const defaultSliderValue = computed(() => {
      if (typeof props.defaultValue === "number") {
        return [props.defaultValue];
      }
      return props.defaultValue;
    });
    const sliderValue = computed({
      get() {
        if (typeof modelValue.value === "number") {
          return [modelValue.value];
        }
        return modelValue.value ?? defaultSliderValue.value;
      },
      set(value) {
        modelValue.value = value?.length !== 1 ? value : value[0];
      }
    });
    const thumbs = computed(() => sliderValue.value?.length ?? 1);
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.slider || {} })({
      disabled: disabled.value,
      size: size.value,
      color: color.value,
      orientation: props.orientation
    }));
    function onChange(value) {
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SliderRoot), mergeProps({ ...unref(rootProps), ...unref(ariaAttrs) }, {
        id: unref(id),
        modelValue: sliderValue.value,
        "onUpdate:modelValue": [($event) => sliderValue.value = $event, ($event) => unref(emitFormInput)()],
        name: unref(name),
        disabled: unref(disabled),
        class: ui.value.root({ class: [props.ui?.root, props.class] }),
        "default-value": defaultSliderValue.value,
        onValueCommit: onChange
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(SliderTrack), {
              class: ui.value.track({ class: props.ui?.track })
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(SliderRange), {
                    class: ui.value.range({ class: props.ui?.range })
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(SliderRange), {
                      class: ui.value.range({ class: props.ui?.range })
                    }, null, 8, ["class"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList(thumbs.value, (thumb) => {
              _push2(`<!--[-->`);
              if (!!__props.tooltip) {
                _push2(ssrRenderComponent(_sfc_main$4, mergeProps({
                  text: thumbs.value > 1 ? String(sliderValue.value?.[thumb - 1]) : String(sliderValue.value),
                  "disable-closing-trigger": ""
                }, { ref_for: true }, typeof __props.tooltip === "object" ? __props.tooltip : {}), {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(SliderThumb), {
                        class: ui.value.thumb({ class: props.ui?.thumb })
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(SliderThumb), {
                          class: ui.value.thumb({ class: props.ui?.thumb })
                        }, null, 8, ["class"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(SliderThumb), {
                  class: ui.value.thumb({ class: props.ui?.thumb })
                }, null, _parent2, _scopeId));
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              createVNode(unref(SliderTrack), {
                class: ui.value.track({ class: props.ui?.track })
              }, {
                default: withCtx(() => [
                  createVNode(unref(SliderRange), {
                    class: ui.value.range({ class: props.ui?.range })
                  }, null, 8, ["class"])
                ]),
                _: 1
              }, 8, ["class"]),
              (openBlock(true), createBlock(Fragment, null, renderList(thumbs.value, (thumb) => {
                return openBlock(), createBlock(Fragment, { key: thumb }, [
                  !!__props.tooltip ? (openBlock(), createBlock(_sfc_main$4, mergeProps({
                    key: 0,
                    text: thumbs.value > 1 ? String(sliderValue.value?.[thumb - 1]) : String(sliderValue.value),
                    "disable-closing-trigger": ""
                  }, { ref_for: true }, typeof __props.tooltip === "object" ? __props.tooltip : {}), {
                    default: withCtx(() => [
                      createVNode(unref(SliderThumb), {
                        class: ui.value.thumb({ class: props.ui?.thumb })
                      }, null, 8, ["class"])
                    ]),
                    _: 2
                  }, 1040, ["text"])) : (openBlock(), createBlock(unref(SliderThumb), {
                    key: 1,
                    class: ui.value.thumb({ class: props.ui?.thumb })
                  }, null, 8, ["class"]))
                ], 64);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@3.2.0_@babel+parser@7.28.0_@netlify+blobs@9.1.2_db0@0.3.2_embla-carousel@8.6.0_33eafb1be63c943c0b8b111c7f47391f/node_modules/@nuxt/ui/dist/runtime/components/Slider.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "UGauge",
  __ssrInlineRender: true,
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    modelValue: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const value = useVModel(props, "modelValue", emit);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USlider = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-between items-center relative" }, _attrs))}><span class="text-gray-400 w-40">${ssrInterpolate(__props.title)}</span>`);
      _push(ssrRenderComponent(_component_USlider, {
        modelValue: unref(value),
        "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null,
        min: __props.min,
        max: __props.max,
        color: "gray",
        size: "sm"
      }, null, _parent));
      _push(`<span class="text-center text-medium text-white w-16 px-2">${ssrInterpolate(Math.round(__props.modelValue))}</span></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UGauge.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$2, { __name: "UGauge" });
function useImageGallery() {
  const nuxtApp = useNuxtApp();
  const router = useRouter();
  const route = useRoute();
  const file = nuxtApp.$file;
  const currentIndex = computed(() => {
    if (!route.params.slug || !route.params.slug[0] || !file.images.value) {
      return -1;
    }
    const imageId = String(route.params.slug[0]);
    return file.images.value.findIndex((image) => String(image.id) === imageId);
  });
  const isFirstImg = computed(() => {
    if (!route.params.slug || !route.params.slug[0] || !file.images.value || file.images.value.length === 0) {
      return false;
    }
    const imageId = String(route.params.slug[0]);
    return file.images.value[0] !== void 0 ? isImageMatch(String(file.images.value[0].id), imageId) : false;
  });
  const isLastImg = computed(() => {
    if (!route.params.slug || !route.params.slug[0] || !file.images.value || file.images.value.length === 0) {
      return false;
    }
    const imageId = String(route.params.slug[0]);
    const lastImage = file.images.value[file.images.value.length - 1];
    return lastImage ? isImageMatch(String(lastImage.id), imageId) : false;
  });
  const navigateToImage = (index) => {
    if (!file.images.value || index < 0 || index >= file.images.value.length || !file.images.value[index]) {
      return;
    }
    const encodedSlug = encodeImageSlug(file.images.value[index].id);
    router.push(`/detail/${encodedSlug}`);
  };
  const initSwipe = (el) => {
    useSwipe(el, {
      passive: false,
      onSwipeEnd(e, direction) {
        const current = currentIndex.value;
        if (direction === "left") {
          if (isLastImg.value) {
            router.push("/");
          } else {
            navigateToImage(current + 1);
          }
        } else {
          if (isFirstImg.value) {
            router.push("/");
          } else {
            navigateToImage(current - 1);
          }
        }
      }
    });
  };
  const applyFilters = async (poster, contrast, blur, invert, saturate, hueRotate, sepia) => {
    const canvas = (void 0).createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = poster?.naturalWidth;
    canvas.height = poster?.naturalHeight;
    context.filter = `contrast(${contrast}%) blur(${blur}px) invert(${invert}%)
      saturate(${saturate}%) hue-rotate(${hueRotate}deg) sepia(${sepia}%)`;
    context.drawImage(poster, 0, 0, canvas.width, canvas.height);
    const modifiedImage = new Image();
    modifiedImage.src = canvas.toDataURL("image/png");
    return ref(modifiedImage);
  };
  const downloadImage = async (imageUrl, poster, contrast, blur, invert, saturate, hueRotate, sepia) => {
    const modifiedImage = await applyFilters(poster, contrast, blur, invert, saturate, hueRotate, sepia);
    if (!modifiedImage.value) {
      return;
    }
    const link = (void 0).createElement("a");
    link.setAttribute("href", modifiedImage.value.src);
    link.setAttribute("download", `image-${Date.now()}.png`);
    link.click();
  };
  const magnifierImage = (e, containerEl, imageEl, magnifierEl, zoomFactor = 2) => {
    return;
  };
  return {
    downloadImage,
    applyFilters,
    magnifierImage,
    initSwipe,
    currentIndex,
    isFirstImg,
    isLastImg
  };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ImageDetail",
  __ssrInlineRender: true,
  setup(__props) {
    const bottomMenu = ref();
    const imageEl = ref();
    const magnifierEl = ref();
    const imageContainer = ref();
    const filter = ref(false);
    const contrast = ref(100);
    const blur = ref(0);
    const hueRotate = ref(0);
    const invert = ref(0);
    const saturate = ref(100);
    const sepia = ref(0);
    const magnifier = ref(false);
    const zoomFactor = ref(1);
    const objectsFit = ref(["Contain", "Cover", "Scale-down", "Fill", "None"]);
    const objectFitSelected = ref(objectsFit.value[0]);
    const filterUpdated = ref(false);
    const { images } = useFile();
    const isSmallScreen = useMediaQuery("(max-width: 1024px)");
    const { currentIndex, isFirstImg, isLastImg, downloadImage, magnifierImage } = useImageGallery();
    const active = useState("$oGiLIdIsHP");
    const route = useRoute();
    const router = useRouter();
    const image = computed(() => {
      if (!route.params.slug || !route.params.slug[0]) {
        return null;
      }
      if (!images.value || images.value.length === 0) {
        return null;
      }
      const imageId = String(route.params.slug[0]);
      const foundImage = images.value.find((img) => String(img.id) === imageId);
      if (!foundImage) {
        console.warn(`Image not found for id: ${imageId}`);
        return null;
      }
      return foundImage;
    });
    const imageStyle = computed(() => {
      if (!image.value) return {};
      const fit = (objectFitSelected.value ?? "Contain").toLowerCase();
      return {
        filter: `contrast(${contrast.value}%) blur(${blur.value}px) invert(${invert.value}%) saturate(${saturate.value}%) hue-rotate(${hueRotate.value}deg) sepia(${sepia.value}%)`,
        objectFit: fit
      };
    });
    const magnifierStyle = computed(() => {
      if (!image.value) return {};
      return {
        backgroundImage: `url('${image.value.url}')`
      };
    });
    const isCurrentImage = computed(() => {
      if (!route.params.slug?.[0] || !image.value) return false;
      return String(route.params.slug[0]) === String(image.value.id);
    });
    onKeyStroke("Escape", () => {
      router.push("/");
    });
    onKeyStroke("ArrowLeft", () => {
      if (isFirstImg.value)
        router.push("/");
      else {
        const prevImage = images.value[currentIndex.value - 1];
        if (prevImage) {
          router.push(`/detail/${prevImage.id}`);
        }
      }
    });
    onKeyStroke("ArrowRight", () => {
      if (isLastImg.value)
        router.push("/");
      else {
        const nextImage = images.value[currentIndex.value + 1];
        if (nextImage) {
          router.push(`/detail/${nextImage.id}`);
        }
      }
    });
    function resetFilter() {
      contrast.value = 100;
      blur.value = 0;
      invert.value = 0;
      saturate.value = 100;
      hueRotate.value = 0;
      sepia.value = 0;
      filterUpdated.value = false;
      magnifier.value = false;
      zoomFactor.value = 1;
    }
    function cancelFilter() {
      filter.value = false;
      resetFilter();
    }
    watch([contrast, blur, invert, saturate, hueRotate, sepia], () => {
      filterUpdated.value = true;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$9;
      const _component_ImageFilters = __nuxt_component_1;
      const _component_USelectMenu = _sfc_main$7;
      const _component_UCheckbox = _sfc_main$6;
      const _component_UIcon = _sfc_main$e;
      const _component_UGauge = __nuxt_component_5;
      const _component_BottomMenu = __nuxt_component_6;
      const _component_UTooltip = _sfc_main$4;
      const _component_UButton = _sfc_main$9$1;
      const _component_USkeleton = _sfc_main$a;
      if (unref(image)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative min-h-screen" }, _attrs))} data-v-bde26a89>`);
        _push(ssrRenderComponent(_component_UContainer, { class: "overflow-x-hidden relative flex items-center justify-center" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_ImageFilters, {
                class: ["absolute md:mt-36 transition-transform duration-200", unref(filter) ? "translate-x-0 right-8 " : "translate-x-full right-0"],
                onResetFilter: resetFilter,
                onCloseFilter: ($event) => filter.value = false
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="${ssrRenderClass([unref(filter) ? "block opacity-100" : "hidden opacity-0", "flex flex-col gap-y-12 pb-6 h-[60dvh]"])}" data-v-bde26a89${_scopeId2}><div class="flex flex-col gap-y-4" data-v-bde26a89${_scopeId2}><div class="flex gap-x-4 justify-between items-center pb-4" data-v-bde26a89${_scopeId2}><span class="text-white w-40" data-v-bde26a89${_scopeId2}>Fit</span>`);
                    _push3(ssrRenderComponent(_component_USelectMenu, {
                      modelValue: unref(objectFitSelected),
                      "onUpdate:modelValue": ($event) => isRef(objectFitSelected) ? objectFitSelected.value = $event : null,
                      items: unref(objectsFit),
                      class: "!w-52 mr-4"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="flex gap-x-4 w-full justify-end pr-4 pb-4" data-v-bde26a89${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UCheckbox, {
                      modelValue: unref(magnifier),
                      "onUpdate:modelValue": ($event) => isRef(magnifier) ? magnifier.value = $event : null,
                      name: "magnifier",
                      label: "Magnifier",
                      color: "gray",
                      ui: { label: "text-gray-300 dark:text-gray-300" }
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-magnifying-glass-solid",
                      class: "w-5 h-5 text-gray-300"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                    if (unref(magnifier)) {
                      _push3(ssrRenderComponent(_component_UGauge, {
                        modelValue: unref(zoomFactor),
                        "onUpdate:modelValue": ($event) => isRef(zoomFactor) ? zoomFactor.value = $event : null,
                        max: 4,
                        title: "Zoom level"
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(_component_UGauge, {
                      modelValue: unref(sepia),
                      "onUpdate:modelValue": ($event) => isRef(sepia) ? sepia.value = $event : null,
                      max: 100,
                      title: "Sepia"
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UGauge, {
                      modelValue: unref(hueRotate),
                      "onUpdate:modelValue": ($event) => isRef(hueRotate) ? hueRotate.value = $event : null,
                      max: 180,
                      title: "Hue-rotate"
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UGauge, {
                      modelValue: unref(saturate),
                      "onUpdate:modelValue": ($event) => isRef(saturate) ? saturate.value = $event : null,
                      max: 100,
                      title: "Saturate"
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UGauge, {
                      modelValue: unref(invert),
                      "onUpdate:modelValue": ($event) => isRef(invert) ? invert.value = $event : null,
                      max: 100,
                      title: "Invert"
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UGauge, {
                      modelValue: unref(contrast),
                      "onUpdate:modelValue": ($event) => isRef(contrast) ? contrast.value = $event : null,
                      max: 200,
                      title: "Contrast"
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UGauge, {
                      modelValue: unref(blur),
                      "onUpdate:modelValue": ($event) => isRef(blur) ? blur.value = $event : null,
                      max: 5,
                      title: "Blur"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: ["flex flex-col gap-y-12 pb-6 h-[60dvh]", unref(filter) ? "block opacity-100" : "hidden opacity-0"]
                      }, [
                        createVNode("div", { class: "flex flex-col gap-y-4" }, [
                          createVNode("div", { class: "flex gap-x-4 justify-between items-center pb-4" }, [
                            createVNode("span", { class: "text-white w-40" }, "Fit"),
                            createVNode(_component_USelectMenu, {
                              modelValue: unref(objectFitSelected),
                              "onUpdate:modelValue": ($event) => isRef(objectFitSelected) ? objectFitSelected.value = $event : null,
                              items: unref(objectsFit),
                              class: "!w-52 mr-4"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ]),
                          createVNode("div", { class: "flex gap-x-4 w-full justify-end pr-4 pb-4" }, [
                            createVNode(_component_UCheckbox, {
                              modelValue: unref(magnifier),
                              "onUpdate:modelValue": ($event) => isRef(magnifier) ? magnifier.value = $event : null,
                              name: "magnifier",
                              label: "Magnifier",
                              color: "gray",
                              ui: { label: "text-gray-300 dark:text-gray-300" }
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-magnifying-glass-solid",
                              class: "w-5 h-5 text-gray-300"
                            })
                          ]),
                          unref(magnifier) ? (openBlock(), createBlock(_component_UGauge, {
                            key: 0,
                            modelValue: unref(zoomFactor),
                            "onUpdate:modelValue": ($event) => isRef(zoomFactor) ? zoomFactor.value = $event : null,
                            max: 4,
                            title: "Zoom level"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                          createVNode(_component_UGauge, {
                            modelValue: unref(sepia),
                            "onUpdate:modelValue": ($event) => isRef(sepia) ? sepia.value = $event : null,
                            max: 100,
                            title: "Sepia"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_UGauge, {
                            modelValue: unref(hueRotate),
                            "onUpdate:modelValue": ($event) => isRef(hueRotate) ? hueRotate.value = $event : null,
                            max: 180,
                            title: "Hue-rotate"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_UGauge, {
                            modelValue: unref(saturate),
                            "onUpdate:modelValue": ($event) => isRef(saturate) ? saturate.value = $event : null,
                            max: 100,
                            title: "Saturate"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_UGauge, {
                            modelValue: unref(invert),
                            "onUpdate:modelValue": ($event) => isRef(invert) ? invert.value = $event : null,
                            max: 100,
                            title: "Invert"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_UGauge, {
                            modelValue: unref(contrast),
                            "onUpdate:modelValue": ($event) => isRef(contrast) ? contrast.value = $event : null,
                            max: 200,
                            title: "Contrast"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_UGauge, {
                            modelValue: unref(blur),
                            "onUpdate:modelValue": ($event) => isRef(blur) ? blur.value = $event : null,
                            max: 5,
                            title: "Blur"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ], 2)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="h-full w-full max-w-7xl flex items-center justify-center relative mx-auto" data-v-bde26a89${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BottomMenu, {
                ref_key: "bottomMenu",
                ref: bottomMenu,
                class: ["bottom-menu", { "right-[350px]": unref(filter) }]
              }, {
                description: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="bottom-menu-description" data-v-bde26a89${_scopeId2}> Nuxt Image Gallery </p>`);
                  } else {
                    return [
                      createVNode("p", { class: "bottom-menu-description" }, " Nuxt Image Gallery ")
                    ];
                  }
                }),
                buttons: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="bottom-menu-button" data-v-bde26a89${_scopeId2}>`);
                    if (!unref(filter)) {
                      _push3(`<div class="flex gap-x-2 items-center" data-v-bde26a89${_scopeId2}>`);
                      if (!(unref(isFirstImg) || unref(isLastImg)) || unref(isSmallScreen)) {
                        _push3(ssrRenderComponent(_component_UTooltip, {
                          text: "Back to gallery",
                          shortcuts: ["Esc"]
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(_component_UButton, {
                                variant: "ghost",
                                color: "gray",
                                to: "/",
                                size: "md",
                                icon: "i-heroicons-rectangle-group-20-solid",
                                "aria-label": "Back to gallery",
                                class: "back flex transition-colors duration-200"
                              }, null, _parent4, _scopeId3));
                            } else {
                              return [
                                createVNode(_component_UButton, {
                                  variant: "ghost",
                                  color: "gray",
                                  to: "/",
                                  size: "md",
                                  icon: "i-heroicons-rectangle-group-20-solid",
                                  "aria-label": "Back to gallery",
                                  class: "back flex transition-colors duration-200"
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(ssrRenderComponent(_component_UTooltip, { text: "Add filters" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_UButton, {
                              variant: "ghost",
                              color: "gray",
                              size: "md",
                              icon: "i-heroicons-paint-brush-20-solid",
                              "aria-label": "Add filters on image",
                              class: "hidden lg:flex",
                              onClick: ($event) => filter.value = true
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_UButton, {
                                variant: "ghost",
                                color: "gray",
                                size: "md",
                                icon: "i-heroicons-paint-brush-20-solid",
                                "aria-label": "Add filters on image",
                                class: "hidden lg:flex",
                                onClick: ($event) => filter.value = true
                              }, null, 8, ["onClick"])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UTooltip, { text: "Open in a new tab" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_UButton, {
                              variant: "ghost",
                              color: "gray",
                              icon: "i-heroicons-arrow-up-right-20-solid",
                              size: "md",
                              href: unref(image).url,
                              target: "_blank",
                              "aria-label": "Open original image"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_UButton, {
                                variant: "ghost",
                                color: "gray",
                                icon: "i-heroicons-arrow-up-right-20-solid",
                                size: "md",
                                href: unref(image).url,
                                target: "_blank",
                                "aria-label": "Open original image"
                              }, null, 8, ["href"])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UTooltip, { text: "Download" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_UButton, {
                              variant: "ghost",
                              color: "gray",
                              icon: "i-heroicons-arrow-down-tray-20-solid",
                              size: "md",
                              class: "hidden md:flex",
                              "aria-label": "Download original or modified image",
                              onClick: ($event) => unref(imageEl) && unref(downloadImage)(unref(image).url, unref(imageEl), unref(contrast), unref(blur), unref(invert), unref(saturate), unref(hueRotate), unref(sepia))
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_UButton, {
                                variant: "ghost",
                                color: "gray",
                                icon: "i-heroicons-arrow-down-tray-20-solid",
                                size: "md",
                                class: "hidden md:flex",
                                "aria-label": "Download original or modified image",
                                onClick: ($event) => unref(imageEl) && unref(downloadImage)(unref(image).url, unref(imageEl), unref(contrast), unref(blur), unref(invert), unref(saturate), unref(hueRotate), unref(sepia))
                              }, null, 8, ["onClick"])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<div class="flex gap-x-2 items-center" data-v-bde26a89${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UTooltip, { text: "Cancel filters" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_UButton, {
                              variant: "ghost",
                              color: "gray",
                              icon: "i-heroicons-x-mark",
                              class: "hidden md:flex",
                              "aria-label": "Cancel filters",
                              onClick: ($event) => cancelFilter()
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_UButton, {
                                variant: "ghost",
                                color: "gray",
                                icon: "i-heroicons-x-mark",
                                class: "hidden md:flex",
                                "aria-label": "Cancel filters",
                                onClick: ($event) => cancelFilter()
                              }, null, 8, ["onClick"])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    }
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "bottom-menu-button" }, [
                        !unref(filter) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex gap-x-2 items-center"
                        }, [
                          !(unref(isFirstImg) || unref(isLastImg)) || unref(isSmallScreen) ? (openBlock(), createBlock(_component_UTooltip, {
                            key: 0,
                            text: "Back to gallery",
                            shortcuts: ["Esc"]
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UButton, {
                                variant: "ghost",
                                color: "gray",
                                to: "/",
                                size: "md",
                                icon: "i-heroicons-rectangle-group-20-solid",
                                "aria-label": "Back to gallery",
                                class: "back flex transition-colors duration-200"
                              })
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          createVNode(_component_UTooltip, { text: "Add filters" }, {
                            default: withCtx(() => [
                              createVNode(_component_UButton, {
                                variant: "ghost",
                                color: "gray",
                                size: "md",
                                icon: "i-heroicons-paint-brush-20-solid",
                                "aria-label": "Add filters on image",
                                class: "hidden lg:flex",
                                onClick: ($event) => filter.value = true
                              }, null, 8, ["onClick"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UTooltip, { text: "Open in a new tab" }, {
                            default: withCtx(() => [
                              createVNode(_component_UButton, {
                                variant: "ghost",
                                color: "gray",
                                icon: "i-heroicons-arrow-up-right-20-solid",
                                size: "md",
                                href: unref(image).url,
                                target: "_blank",
                                "aria-label": "Open original image"
                              }, null, 8, ["href"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UTooltip, { text: "Download" }, {
                            default: withCtx(() => [
                              createVNode(_component_UButton, {
                                variant: "ghost",
                                color: "gray",
                                icon: "i-heroicons-arrow-down-tray-20-solid",
                                size: "md",
                                class: "hidden md:flex",
                                "aria-label": "Download original or modified image",
                                onClick: ($event) => unref(imageEl) && unref(downloadImage)(unref(image).url, unref(imageEl), unref(contrast), unref(blur), unref(invert), unref(saturate), unref(hueRotate), unref(sepia))
                              }, null, 8, ["onClick"])
                            ]),
                            _: 1
                          })
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex gap-x-2 items-center"
                        }, [
                          createVNode(_component_UTooltip, { text: "Cancel filters" }, {
                            default: withCtx(() => [
                              createVNode(_component_UButton, {
                                variant: "ghost",
                                color: "gray",
                                icon: "i-heroicons-x-mark",
                                class: "hidden md:flex",
                                "aria-label": "Cancel filters",
                                onClick: ($event) => cancelFilter()
                              }, null, 8, ["onClick"])
                            ]),
                            _: 1
                          })
                        ]))
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="${ssrRenderClass([{ "-translate-x-[100px]": unref(filter) }, "transition-all duration-200 overflow-hidden pt-8 flex items-center justify-center w-full h-screen relative"])}" data-v-bde26a89${_scopeId}><div class="flex items-center justify-center md:justify-between gap-x-4 w-full" data-v-bde26a89${_scopeId}>`);
              if (!unref(isFirstImg)) {
                _push2(ssrRenderComponent(_component_UTooltip, {
                  text: "Previous",
                  shortcuts: ["←"]
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UButton, {
                        variant: "ghost",
                        color: "gray",
                        to: (() => {
                          const prev = unref(images)?.[unref(currentIndex) - 1];
                          return prev?.id ? `/detail/${prev.id}` : "/";
                        })(),
                        size: "lg",
                        icon: "i-heroicons-chevron-left",
                        class: "hidden md:flex ml-4",
                        "aria-label": "Go to previous image",
                        onClick: ($event) => active.value = unref(image).id
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UButton, {
                          variant: "ghost",
                          color: "gray",
                          to: (() => {
                            const prev = unref(images)?.[unref(currentIndex) - 1];
                            return prev?.id ? `/detail/${prev.id}` : "/";
                          })(),
                          size: "lg",
                          icon: "i-heroicons-chevron-left",
                          class: "hidden md:flex ml-4",
                          "aria-label": "Go to previous image",
                          onClick: ($event) => active.value = unref(image).id
                        }, null, 8, ["to", "onClick"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<div class="flex group" data-v-bde26a89${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UTooltip, {
                  text: "Back to gallery",
                  shortcuts: ["Esc"]
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UButton, {
                        to: "/",
                        size: "xl",
                        color: "gray",
                        variant: "ghost",
                        class: "back hidden md:flex ml-4 transition-colors duration-200",
                        "aria-label": "Back to gallery",
                        onClick: ($event) => active.value = unref(image).id
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_UIcon, {
                              name: "i-heroicons-rectangle-group-20-solid",
                              class: "w-6 h-6"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_UIcon, {
                                name: "i-heroicons-rectangle-group-20-solid",
                                class: "w-6 h-6"
                              })
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UButton, {
                          to: "/",
                          size: "xl",
                          color: "gray",
                          variant: "ghost",
                          class: "back hidden md:flex ml-4 transition-colors duration-200",
                          "aria-label": "Back to gallery",
                          onClick: ($event) => active.value = unref(image).id
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-rectangle-group-20-solid",
                              class: "w-6 h-6"
                            })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(`<div class="relative flex items-center justify-center xl:m-16" data-v-bde26a89${_scopeId}><div data-v-bde26a89${_scopeId}><div class="group" data-v-bde26a89${_scopeId}>`);
              if (unref(image)) {
                _push2(`<img${ssrRenderAttr("src", unref(image).url)}${ssrRenderAttr("alt", unref(image).id)} class="${ssrRenderClass([[{ imageEl: unref(isCurrentImage) }, unref(filter) ? "w-[80%] ml-[12px]" : "w-full"], "rounded object-contain transition-all duration-200 block"])}" style="${ssrRenderStyle(unref(imageStyle))}" data-v-bde26a89${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(magnifier)) {
                _push2(`<div class="w-[100px] h-[100px] absolute border border-gray-200 pointer-events-none rounded-full block opacity-0 group-hover:opacity-100 transition-opacity duration-200" style="${ssrRenderStyle(unref(magnifierStyle))}" data-v-bde26a89${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
              if (!unref(isLastImg)) {
                _push2(ssrRenderComponent(_component_UTooltip, {
                  text: "Next",
                  shortcuts: ["→"]
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UButton, {
                        variant: "ghost",
                        color: "gray",
                        to: (() => {
                          const next = unref(images)?.[unref(currentIndex) + 1];
                          return next?.id ? `/detail/${next.id}` : "/";
                        })(),
                        size: "lg",
                        icon: "i-heroicons-chevron-right",
                        class: "hidden md:flex mr-4 rounded-full",
                        "aria-label": "Go to next image",
                        onClick: ($event) => active.value = unref(image).id
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UButton, {
                          variant: "ghost",
                          color: "gray",
                          to: (() => {
                            const next = unref(images)?.[unref(currentIndex) + 1];
                            return next?.id ? `/detail/${next.id}` : "/";
                          })(),
                          size: "lg",
                          icon: "i-heroicons-chevron-right",
                          class: "hidden md:flex mr-4 rounded-full",
                          "aria-label": "Go to next image",
                          onClick: ($event) => active.value = unref(image).id
                        }, null, 8, ["to", "onClick"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(_component_UTooltip, {
                  text: "Back to gallery",
                  shortcuts: ["Esc"]
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex" data-v-bde26a89${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UButton, {
                        variant: "ghost",
                        color: "gray",
                        to: "/",
                        size: "xl",
                        class: "back hidden md:flex mr-4 transition-colors duration-200",
                        "aria-label": "Back to gallery",
                        onClick: ($event) => active.value = unref(image).id
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_UIcon, {
                              name: "i-heroicons-rectangle-group-20-solid",
                              class: "w-6 h-6"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_UIcon, {
                                name: "i-heroicons-rectangle-group-20-solid",
                                class: "w-6 h-6"
                              })
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex" }, [
                          createVNode(_component_UButton, {
                            variant: "ghost",
                            color: "gray",
                            to: "/",
                            size: "xl",
                            class: "back hidden md:flex mr-4 transition-colors duration-200",
                            "aria-label": "Back to gallery",
                            onClick: ($event) => active.value = unref(image).id
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UIcon, {
                                name: "i-heroicons-rectangle-group-20-solid",
                                class: "w-6 h-6"
                              })
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              }
              _push2(`</div></div></div>`);
            } else {
              return [
                createVNode(_component_ImageFilters, {
                  class: ["absolute md:mt-36 transition-transform duration-200", unref(filter) ? "translate-x-0 right-8 " : "translate-x-full right-0"],
                  onResetFilter: resetFilter,
                  onCloseFilter: ($event) => filter.value = false
                }, {
                  default: withCtx(() => [
                    createVNode("div", {
                      class: ["flex flex-col gap-y-12 pb-6 h-[60dvh]", unref(filter) ? "block opacity-100" : "hidden opacity-0"]
                    }, [
                      createVNode("div", { class: "flex flex-col gap-y-4" }, [
                        createVNode("div", { class: "flex gap-x-4 justify-between items-center pb-4" }, [
                          createVNode("span", { class: "text-white w-40" }, "Fit"),
                          createVNode(_component_USelectMenu, {
                            modelValue: unref(objectFitSelected),
                            "onUpdate:modelValue": ($event) => isRef(objectFitSelected) ? objectFitSelected.value = $event : null,
                            items: unref(objectsFit),
                            class: "!w-52 mr-4"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        createVNode("div", { class: "flex gap-x-4 w-full justify-end pr-4 pb-4" }, [
                          createVNode(_component_UCheckbox, {
                            modelValue: unref(magnifier),
                            "onUpdate:modelValue": ($event) => isRef(magnifier) ? magnifier.value = $event : null,
                            name: "magnifier",
                            label: "Magnifier",
                            color: "gray",
                            ui: { label: "text-gray-300 dark:text-gray-300" }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-magnifying-glass-solid",
                            class: "w-5 h-5 text-gray-300"
                          })
                        ]),
                        unref(magnifier) ? (openBlock(), createBlock(_component_UGauge, {
                          key: 0,
                          modelValue: unref(zoomFactor),
                          "onUpdate:modelValue": ($event) => isRef(zoomFactor) ? zoomFactor.value = $event : null,
                          max: 4,
                          title: "Zoom level"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                        createVNode(_component_UGauge, {
                          modelValue: unref(sepia),
                          "onUpdate:modelValue": ($event) => isRef(sepia) ? sepia.value = $event : null,
                          max: 100,
                          title: "Sepia"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UGauge, {
                          modelValue: unref(hueRotate),
                          "onUpdate:modelValue": ($event) => isRef(hueRotate) ? hueRotate.value = $event : null,
                          max: 180,
                          title: "Hue-rotate"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UGauge, {
                          modelValue: unref(saturate),
                          "onUpdate:modelValue": ($event) => isRef(saturate) ? saturate.value = $event : null,
                          max: 100,
                          title: "Saturate"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UGauge, {
                          modelValue: unref(invert),
                          "onUpdate:modelValue": ($event) => isRef(invert) ? invert.value = $event : null,
                          max: 100,
                          title: "Invert"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UGauge, {
                          modelValue: unref(contrast),
                          "onUpdate:modelValue": ($event) => isRef(contrast) ? contrast.value = $event : null,
                          max: 200,
                          title: "Contrast"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UGauge, {
                          modelValue: unref(blur),
                          "onUpdate:modelValue": ($event) => isRef(blur) ? blur.value = $event : null,
                          max: 5,
                          title: "Blur"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ], 2)
                  ]),
                  _: 1
                }, 8, ["class", "onCloseFilter"]),
                createVNode("div", { class: "h-full w-full max-w-7xl flex items-center justify-center relative mx-auto" }, [
                  createVNode(_component_BottomMenu, {
                    ref_key: "bottomMenu",
                    ref: bottomMenu,
                    class: ["bottom-menu", { "right-[350px]": unref(filter) }]
                  }, {
                    description: withCtx(() => [
                      createVNode("p", { class: "bottom-menu-description" }, " Nuxt Image Gallery ")
                    ]),
                    buttons: withCtx(() => [
                      createVNode("div", { class: "bottom-menu-button" }, [
                        !unref(filter) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex gap-x-2 items-center"
                        }, [
                          !(unref(isFirstImg) || unref(isLastImg)) || unref(isSmallScreen) ? (openBlock(), createBlock(_component_UTooltip, {
                            key: 0,
                            text: "Back to gallery",
                            shortcuts: ["Esc"]
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UButton, {
                                variant: "ghost",
                                color: "gray",
                                to: "/",
                                size: "md",
                                icon: "i-heroicons-rectangle-group-20-solid",
                                "aria-label": "Back to gallery",
                                class: "back flex transition-colors duration-200"
                              })
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          createVNode(_component_UTooltip, { text: "Add filters" }, {
                            default: withCtx(() => [
                              createVNode(_component_UButton, {
                                variant: "ghost",
                                color: "gray",
                                size: "md",
                                icon: "i-heroicons-paint-brush-20-solid",
                                "aria-label": "Add filters on image",
                                class: "hidden lg:flex",
                                onClick: ($event) => filter.value = true
                              }, null, 8, ["onClick"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UTooltip, { text: "Open in a new tab" }, {
                            default: withCtx(() => [
                              createVNode(_component_UButton, {
                                variant: "ghost",
                                color: "gray",
                                icon: "i-heroicons-arrow-up-right-20-solid",
                                size: "md",
                                href: unref(image).url,
                                target: "_blank",
                                "aria-label": "Open original image"
                              }, null, 8, ["href"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UTooltip, { text: "Download" }, {
                            default: withCtx(() => [
                              createVNode(_component_UButton, {
                                variant: "ghost",
                                color: "gray",
                                icon: "i-heroicons-arrow-down-tray-20-solid",
                                size: "md",
                                class: "hidden md:flex",
                                "aria-label": "Download original or modified image",
                                onClick: ($event) => unref(imageEl) && unref(downloadImage)(unref(image).url, unref(imageEl), unref(contrast), unref(blur), unref(invert), unref(saturate), unref(hueRotate), unref(sepia))
                              }, null, 8, ["onClick"])
                            ]),
                            _: 1
                          })
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex gap-x-2 items-center"
                        }, [
                          createVNode(_component_UTooltip, { text: "Cancel filters" }, {
                            default: withCtx(() => [
                              createVNode(_component_UButton, {
                                variant: "ghost",
                                color: "gray",
                                icon: "i-heroicons-x-mark",
                                class: "hidden md:flex",
                                "aria-label": "Cancel filters",
                                onClick: ($event) => cancelFilter()
                              }, null, 8, ["onClick"])
                            ]),
                            _: 1
                          })
                        ]))
                      ])
                    ]),
                    _: 1
                  }, 8, ["class"]),
                  createVNode("div", {
                    class: [{ "-translate-x-[100px]": unref(filter) }, "transition-all duration-200 overflow-hidden pt-8 flex items-center justify-center w-full h-screen relative"]
                  }, [
                    createVNode("div", { class: "flex items-center justify-center md:justify-between gap-x-4 w-full" }, [
                      !unref(isFirstImg) ? (openBlock(), createBlock(_component_UTooltip, {
                        key: 0,
                        text: "Previous",
                        shortcuts: ["←"]
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UButton, {
                            variant: "ghost",
                            color: "gray",
                            to: (() => {
                              const prev = unref(images)?.[unref(currentIndex) - 1];
                              return prev?.id ? `/detail/${prev.id}` : "/";
                            })(),
                            size: "lg",
                            icon: "i-heroicons-chevron-left",
                            class: "hidden md:flex ml-4",
                            "aria-label": "Go to previous image",
                            onClick: ($event) => active.value = unref(image).id
                          }, null, 8, ["to", "onClick"])
                        ]),
                        _: 1
                      })) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex group"
                      }, [
                        createVNode(_component_UTooltip, {
                          text: "Back to gallery",
                          shortcuts: ["Esc"]
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UButton, {
                              to: "/",
                              size: "xl",
                              color: "gray",
                              variant: "ghost",
                              class: "back hidden md:flex ml-4 transition-colors duration-200",
                              "aria-label": "Back to gallery",
                              onClick: ($event) => active.value = unref(image).id
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UIcon, {
                                  name: "i-heroicons-rectangle-group-20-solid",
                                  class: "w-6 h-6"
                                })
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          _: 1
                        })
                      ])),
                      createVNode("div", { class: "relative flex items-center justify-center xl:m-16" }, [
                        createVNode("div", {
                          ref_key: "imageContainer",
                          ref: imageContainer
                        }, [
                          createVNode("div", { class: "group" }, [
                            unref(image) ? (openBlock(), createBlock("img", {
                              key: 0,
                              ref_key: "imageEl",
                              ref: imageEl,
                              src: unref(image).url,
                              alt: unref(image).id,
                              class: ["rounded object-contain transition-all duration-200 block", [{ imageEl: unref(isCurrentImage) }, unref(filter) ? "w-[80%] ml-[12px]" : "w-full"]],
                              style: unref(imageStyle),
                              onMousemove: ($event) => unref(magnifier) && unref(imageContainer) && unref(imageEl) && unref(magnifierEl) ? unref(magnifierImage)($event, unref(imageContainer), unref(imageEl), unref(magnifierEl), unref(zoomFactor)) : () => {
                              }
                            }, null, 46, ["src", "alt", "onMousemove"])) : createCommentVNode("", true),
                            unref(magnifier) ? (openBlock(), createBlock("div", {
                              key: 1,
                              ref_key: "magnifierEl",
                              ref: magnifierEl,
                              class: "w-[100px] h-[100px] absolute border border-gray-200 pointer-events-none rounded-full block opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                              style: unref(magnifierStyle)
                            }, null, 4)) : createCommentVNode("", true)
                          ])
                        ], 512)
                      ]),
                      !unref(isLastImg) ? (openBlock(), createBlock(_component_UTooltip, {
                        key: 2,
                        text: "Next",
                        shortcuts: ["→"]
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UButton, {
                            variant: "ghost",
                            color: "gray",
                            to: (() => {
                              const next = unref(images)?.[unref(currentIndex) + 1];
                              return next?.id ? `/detail/${next.id}` : "/";
                            })(),
                            size: "lg",
                            icon: "i-heroicons-chevron-right",
                            class: "hidden md:flex mr-4 rounded-full",
                            "aria-label": "Go to next image",
                            onClick: ($event) => active.value = unref(image).id
                          }, null, 8, ["to", "onClick"])
                        ]),
                        _: 1
                      })) : (openBlock(), createBlock(_component_UTooltip, {
                        key: 3,
                        text: "Back to gallery",
                        shortcuts: ["Esc"]
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex" }, [
                            createVNode(_component_UButton, {
                              variant: "ghost",
                              color: "gray",
                              to: "/",
                              size: "xl",
                              class: "back hidden md:flex mr-4 transition-colors duration-200",
                              "aria-label": "Back to gallery",
                              onClick: ($event) => active.value = unref(image).id
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UIcon, {
                                  name: "i-heroicons-rectangle-group-20-solid",
                                  class: "w-6 h-6"
                                })
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ])
                        ]),
                        _: 1
                      }))
                    ])
                  ], 2)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-black" }, _attrs))} data-v-bde26a89><div class="text-center" data-v-bde26a89>`);
        if (!unref(images) || unref(images).length === 0) {
          _push(`<div class="space-y-4" data-v-bde26a89>`);
          _push(ssrRenderComponent(_component_USkeleton, {
            class: "h-12 w-12 bg-white-500 mx-auto",
            ui: { rounded: "rounded-full" }
          }, null, _parent));
          _push(`<p class="text-white" data-v-bde26a89>加载中...</p></div>`);
        } else {
          _push(`<div class="space-y-4" data-v-bde26a89><p class="text-white text-xl" data-v-bde26a89>图片未找到</p>`);
          _push(ssrRenderComponent(_component_UButton, {
            to: "/",
            color: "primary",
            variant: "outline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` 返回图库 `);
              } else {
                return [
                  createTextVNode(" 返回图库 ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        }
        _push(`</div></div>`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ImageDetail.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-bde26a89"]]), { __name: "ImageDetail" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { images } = useFile();
    const image = computed(() => {
      if (!images.value) return null;
      const imageId = String(route.params.slug[0]);
      return images.value.find((img) => String(img.id) === imageId);
    });
    watchEffect(() => {
      if (image.value && image.value.url) {
        const imageName = `Image ${image.value.id}`;
        const imageUrl = image.value.url;
        useHead({
          title: `${imageName} - Nuxt Image Gallery`,
          meta: [
            { name: "description", content: `View ${imageName} in high quality. Part of our curated image gallery collection.` },
            { property: "og:title", content: `${imageName} - Nuxt Image Gallery` },
            { property: "og:description", content: `View ${imageName} in high quality. Part of our curated image gallery collection.` },
            { property: "og:image", content: imageUrl },
            { property: "og:image:alt", content: imageName },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:image", content: imageUrl },
            { name: "twitter:image:alt", content: imageName }
          ]
        });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ImageDetail = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_ImageDetail, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/detail/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...slug_-lSBmVVq7.mjs.map
