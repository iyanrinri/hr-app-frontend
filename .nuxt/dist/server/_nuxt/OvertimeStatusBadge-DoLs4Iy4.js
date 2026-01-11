import { defineComponent, unref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { O as OvertimeStatus } from "./overtime-kX-Lpsii.js";
import { C as CircleCheck, f as Clock, h as CircleX } from "../server.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "OvertimeStatusBadge",
  __ssrInlineRender: true,
  props: {
    status: {},
    managerApprovedAt: {},
    hrApprovedAt: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.status === unref(OvertimeStatus).APPROVED || __props.status === unref(OvertimeStatus).HR_APPROVED) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-1" }, _attrs))}><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">`);
        _push(ssrRenderComponent(unref(CircleCheck), { class: "w-3 h-3 mr-1" }, null, _parent));
        _push(` Approved </span></div>`);
      } else if (__props.status === unref(OvertimeStatus).MANAGER_APPROVED) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-1" }, _attrs))}><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">`);
        _push(ssrRenderComponent(unref(CircleCheck), { class: "w-3 h-3 mr-1" }, null, _parent));
        _push(` Manager Approved </span><span class="text-[10px] text-gray-500 leading-tight">Waiting for HR</span></div>`);
      } else if (__props.status === unref(OvertimeStatus).PENDING) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-1" }, _attrs))}><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">`);
        _push(ssrRenderComponent(unref(Clock), { class: "w-3 h-3 mr-1" }, null, _parent));
        _push(` Pending </span></div>`);
      } else if (__props.status === unref(OvertimeStatus).REJECTED) {
        _push(`<span${ssrRenderAttrs(mergeProps({ class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200" }, _attrs))}>`);
        _push(ssrRenderComponent(unref(CircleX), { class: "w-3 h-3 mr-1" }, null, _parent));
        _push(` Rejected </span>`);
      } else {
        _push(`<span${ssrRenderAttrs(mergeProps({ class: "text-gray-500 text-xs" }, _attrs))}>${ssrInterpolate(__props.status)}</span>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/overtime/OvertimeStatusBadge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=OvertimeStatusBadge-DoLs4Iy4.js.map
