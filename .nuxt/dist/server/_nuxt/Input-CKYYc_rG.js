import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderSlot, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { c as cn } from "./index-B7s_3MI_.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Input",
  __ssrInlineRender: true,
  props: {
    modelValue: { default: "" },
    label: {},
    error: {},
    helperText: {},
    id: {},
    type: { default: "text" },
    placeholder: {},
    disabled: { type: Boolean, default: false },
    autocomplete: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}>`);
      if (__props.label) {
        _push(`<label${ssrRenderAttr("for", __props.id)} class="block text-sm font-bold text-gray-900 mb-1">${ssrInterpolate(__props.label)}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative">`);
      if (_ctx.$slots.icon) {
        _push(`<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">`);
        ssrRenderSlot(_ctx.$slots, "icon", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input${ssrRenderAttr("id", __props.id)}${ssrRenderAttr("type", __props.type)}${ssrRenderAttr("value", __props.modelValue)}${ssrRenderAttr("placeholder", __props.placeholder)}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}${ssrRenderAttr("autocomplete", __props.autocomplete)} class="${ssrRenderClass(unref(cn)(
        "block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-base disabled:bg-gray-100 disabled:text-gray-500 placeholder:text-gray-400",
        _ctx.$slots.icon && "pl-10",
        __props.error && "border-red-500 focus:border-red-500 focus:ring-red-500",
        _ctx.$attrs.class
      ))}"></div>`);
      if (__props.error) {
        _push(`<p class="mt-1 text-sm text-red-600">${ssrInterpolate(__props.error)}</p>`);
      } else if (__props.helperText) {
        _push(`<p class="mt-1 text-xs text-gray-500">${ssrInterpolate(__props.helperText)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/Input.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=Input-CKYYc_rG.js.map
