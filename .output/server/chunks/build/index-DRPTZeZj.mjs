import { _ as _sfc_main$1 } from './Button-gKFWS_xI.mjs';
import { defineComponent, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import './nuxt-link-DsceMx1n.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'uuid';
import './index-B7s_3MI_.mjs';
import 'clsx';
import 'tailwind-merge';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Users = resolveComponent("Users");
      const _component_UiButton = _sfc_main$1;
      const _component_ArrowRight = resolveComponent("ArrowRight");
      const _component_Shield = resolveComponent("Shield");
      const _component_Lock = resolveComponent("Lock");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white" }, _attrs))}><header class="fixed w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"><div class="flex items-center space-x-2"><div class="w-8 h-8 bg-brand-navy rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Users, { class: "w-5 h-5 text-white" }, null, _parent));
      _push(`</div><span class="text-xl font-bold text-gray-900">HR Portal</span></div><div class="flex items-center space-x-4">`);
      _push(ssrRenderComponent(_component_UiButton, {
        to: "/register",
        variant: "outline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Create Workspace`);
          } else {
            return [
              createTextVNode("Create Workspace")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiButton, { to: "/find-workspace" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Sign In`);
          } else {
            return [
              createTextVNode("Sign In")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></header><section class="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"><div class="text-center max-w-3xl mx-auto"><h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-8"> Manage your workforce with <span class="text-brand-cyan">confidence</span></h1><p class="text-xl text-gray-600 mb-10 leading-relaxed"> A comprehensive solution for modern HR management. Streamline employee data, manage roles, and secure your organization&#39;s internal structure. </p><div class="flex flex-col sm:flex-row items-center justify-center gap-4">`);
      _push(ssrRenderComponent(_component_UiButton, {
        to: "/register",
        class: "h-12 px-8 text-lg w-full sm:w-auto"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Create Workspace `);
            _push2(ssrRenderComponent(_component_ArrowRight, { class: "ml-2 w-5 h-5" }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" Create Workspace "),
              createVNode(_component_ArrowRight, { class: "ml-2 w-5 h-5" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiButton, {
        to: "/find-workspace",
        variant: "outline",
        class: "h-12 px-8 text-lg w-full sm:w-auto"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sign In to Existing `);
          } else {
            return [
              createTextVNode(" Sign In to Existing ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><section class="py-20 bg-gray-50"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid grid-cols-1 md:grid-cols-3 gap-8"><div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"><div class="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center mb-6">`);
      _push(ssrRenderComponent(_component_Users, { class: "w-6 h-6 text-brand-navy" }, null, _parent));
      _push(`</div><h3 class="text-xl font-bold text-gray-900 mb-3"> Employee Management </h3><p class="text-gray-600"> Easily add, edit, and manage employee records. Keep track of departments, roles, and status in one place. </p></div><div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"><div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">`);
      _push(ssrRenderComponent(_component_Shield, { class: "w-6 h-6 text-indigo-600" }, null, _parent));
      _push(`</div><h3 class="text-xl font-bold text-gray-900 mb-3"> Role &amp; Permissions </h3><p class="text-gray-600"> Define granular roles and permissions. Ensure the right people have access to the right resources. </p></div><div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"><div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">`);
      _push(ssrRenderComponent(_component_Lock, { class: "w-6 h-6 text-green-600" }, null, _parent));
      _push(`</div><h3 class="text-xl font-bold text-gray-900 mb-3">Secure Access</h3><p class="text-gray-600"> Enterprise-grade security with JWT authentication and protected routes. Your data is safe with us. </p></div></div></div></section><footer class="bg-white border-t border-gray-100 py-12"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center"><div class="flex items-center space-x-2 mb-4 md:mb-0"><div class="w-6 h-6 bg-brand-navy rounded-md flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Users, { class: "w-3 h-3 text-white" }, null, _parent));
      _push(`</div><span class="text-lg font-bold text-gray-900">HR Portal</span></div><p class="text-gray-500 text-sm"> \xA9 ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} HR Portal Internal System. All rights reserved. </p></div></footer></div>`);
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
//# sourceMappingURL=index-DRPTZeZj.mjs.map
