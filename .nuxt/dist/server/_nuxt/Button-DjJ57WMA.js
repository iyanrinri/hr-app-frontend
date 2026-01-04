import { _ as __nuxt_component_0 } from "./nuxt-link-BACLTvko.js";
import { defineComponent, resolveComponent, mergeProps, unref, withCtx, renderSlot, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { c as cn } from "./index-H80jjgLf.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    variant: { default: "primary" },
    isLoading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    type: { default: "button" },
    to: { default: void 0 }
  },
  setup(__props) {
    const variants = {
      primary: "bg-brand-navy text-white hover:bg-opacity-90 focus:ring-brand-cyan",
      secondary: "bg-white text-brand-navy border border-gray-300 hover:bg-brand-light focus:ring-brand-navy",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      ghost: "bg-transparent text-brand-navy hover:bg-brand-light focus:ring-brand-navy",
      outline: "bg-transparent text-brand-navy border-2 border-brand-navy hover:bg-brand-navy hover:text-white focus:ring-brand-cyan"
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Loader2 = resolveComponent("Loader2");
      const _component_NuxtLink = __nuxt_component_0;
      if (!__props.to) {
        _push(`<button${ssrRenderAttrs(mergeProps({
          type: __props.type,
          disabled: __props.disabled || __props.isLoading,
          class: unref(cn)(
            "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
            variants[__props.variant],
            _ctx.$attrs.class
          )
        }, _attrs))}>`);
        if (__props.isLoading) {
          _push(ssrRenderComponent(_component_Loader2, { class: "w-4 h-4 mr-2 animate-spin" }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</button>`);
      } else {
        _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
          to: __props.to,
          class: unref(cn)(
            "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
            variants[__props.variant],
            _ctx.$attrs.class
          )
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
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/Button.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=Button-DjJ57WMA.js.map
