import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { c as cn } from "./index-B7s_3MI_.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Textarea",
  __ssrInlineRender: true,
  props: {
    modelValue: { default: "" },
    label: {},
    error: {},
    id: {},
    placeholder: {},
    disabled: { type: Boolean, default: false },
    rows: { default: 3 }
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
      _push(`<textarea${ssrRenderAttr("id", __props.id)}${ssrRenderAttr("placeholder", __props.placeholder)}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}${ssrRenderAttr("rows", __props.rows)} class="${ssrRenderClass(unref(cn)(
        "block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-base disabled:bg-gray-100 disabled:text-gray-500 placeholder:text-gray-400",
        __props.error && "border-red-500 focus:border-red-500 focus:ring-red-500",
        _ctx.$attrs.class
      ))}">${ssrInterpolate(__props.modelValue)}</textarea>`);
      if (__props.error) {
        _push(`<p class="mt-1 text-sm text-red-600">${ssrInterpolate(__props.error)}</p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/Textarea.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=Textarea-6YBrhHFV.js.map
