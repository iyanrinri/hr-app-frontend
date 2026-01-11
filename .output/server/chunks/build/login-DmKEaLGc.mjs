import { _ as _sfc_main$1 } from './Input-CKYYc_rG.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DsceMx1n.mjs';
import { _ as _sfc_main$2 } from './Button-gKFWS_xI.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { z } from 'zod';
import { u as useAuth } from './useAuth-Dt3T5Rvc.mjs';
import { a as Users, Q as Quote, M as Mail, L as Lock, A as ArrowRight } from './server.mjs';
import './index-B7s_3MI_.mjs';
import 'clsx';
import 'tailwind-merge';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'uuid';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const { loading } = useAuth();
    const form = ref({
      email: "",
      password: ""
    });
    const errors = ref({
      email: "",
      password: ""
    });
    const generalError = ref("");
    z.object({
      email: z.string().email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters")
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiInput = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UiButton = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen grid grid-cols-1 lg:grid-cols-2" }, _attrs))}><div class="hidden lg:flex flex-col justify-between bg-gradient-to-br from-brand-navy to-gray-900 p-12 text-white relative overflow-hidden"><div class="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-cyan/20 rounded-full blur-3xl"></div><div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div><div class="relative z-10 flex items-center space-x-3"><div class="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">`);
      _push(ssrRenderComponent(unref(Users), { class: "w-6 h-6 text-brand-cyan" }, null, _parent));
      _push(`</div><span class="text-xl font-bold tracking-tight">HR Portal</span></div><div class="relative z-10 max-w-lg"><h1 class="text-5xl font-extrabold tracking-tight mb-6 leading-tight"> Manage your workforce with <span class="text-brand-cyan">confidence</span>. </h1><p class="text-lg text-gray-300 leading-relaxed mb-8"> Access your personalized dashboard to manage leaves, track attendance, and stay connected with your team. </p><div class="flex items-center space-x-4 pt-4"><div class="flex -space-x-2"><!--[-->`);
      ssrRenderList(3, (i) => {
        _push(`<div class="w-10 h-10 rounded-full bg-gray-600 border-2 border-brand-navy flex items-center justify-center text-xs font-medium"><span class="text-white/50">U${ssrInterpolate(i)}</span></div>`);
      });
      _push(`<!--]--></div><div class="text-sm text-gray-400"><span class="font-bold text-white">2.5k+</span> employees active daily </div></div></div><div class="relative z-10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">`);
      _push(ssrRenderComponent(unref(Quote), { class: "w-8 h-8 text-brand-cyan/50 mb-4" }, null, _parent));
      _push(`<p class="text-gray-300 italic mb-4"> &quot;This platform has transformed how we handle HR operations. It&#39;s intuitive, fast, and reliable.&quot; </p><div class="flex items-center"><div class="w-8 h-8 rounded-full bg-brand-cyan flex items-center justify-center text-brand-navy font-bold text-xs mr-3"> JD </div><div><p class="text-sm font-bold text-white">John Doe</p><p class="text-xs text-gray-400">HR Manager</p></div></div></div></div><div class="flex flex-col justify-center items-center p-8 bg-gray-50 lg:bg-white"><div class="w-full max-w-md space-y-8"><div class="lg:hidden flex justify-center mb-8"><div class="w-12 h-12 bg-brand-navy rounded-xl flex items-center justify-center">`);
      _push(ssrRenderComponent(unref(Users), { class: "w-6 h-6 text-white" }, null, _parent));
      _push(`</div></div><div class="text-center"><h2 class="text-3xl font-bold text-gray-900 tracking-tight"> Welcome Back </h2><p class="mt-2 text-sm text-gray-600"> Please enter your details to sign in </p></div><form class="mt-8 space-y-6 bg-white lg:bg-transparent p-8 lg:p-0 rounded-2xl lg:rounded-none shadow-xl lg:shadow-none shadow-gray-100/50">`);
      if (generalError.value) {
        _push(`<div class="p-4 rounded-md bg-red-50 border border-red-200 text-sm text-red-600">${ssrInterpolate(generalError.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="space-y-5">`);
      _push(ssrRenderComponent(_component_UiInput, {
        label: "Email address",
        type: "email",
        placeholder: "name@company.com",
        modelValue: form.value.email,
        "onUpdate:modelValue": ($event) => form.value.email = $event,
        error: errors.value.email,
        disabled: unref(loading),
        class: "bg-gray-50 border-gray-200 focus:bg-white transition-colors"
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Mail), { class: "w-4 h-4 text-gray-400" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Mail), { class: "w-4 h-4 text-gray-400" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="space-y-1"><div class="flex justify-between items-center"><label class="block text-sm font-medium text-gray-700">Password</label>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "#",
        class: "text-xs font-medium text-brand-navy hover:text-brand-cyan hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Forgot password? `);
          } else {
            return [
              createTextVNode(" Forgot password? ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="relative">`);
      _push(ssrRenderComponent(_component_UiInput, {
        type: "password",
        placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
        modelValue: form.value.password,
        "onUpdate:modelValue": ($event) => form.value.password = $event,
        error: errors.value.password,
        disabled: unref(loading),
        class: "bg-gray-50 border-gray-200 focus:bg-white transition-colors"
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Lock), { class: "w-4 h-4 text-gray-400" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Lock), { class: "w-4 h-4 text-gray-400" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(_component_UiButton, {
        type: "submit",
        class: "w-full h-12 text-base font-semibold shadow-lg shadow-brand-navy/20 active:scale-[0.98] transition-all",
        "is-loading": unref(loading)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sign In `);
            _push2(ssrRenderComponent(unref(ArrowRight), { class: "ml-2 w-4 h-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" Sign In "),
              createVNode(unref(ArrowRight), { class: "ml-2 w-4 h-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="relative my-6"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200"></div></div><div class="relative flex justify-center text-sm"><span class="px-2 bg-white text-gray-500">Secure login</span></div></div></form><p class="text-center text-xs text-gray-400 mt-8"> \xA9 ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} HR Portal by NodeStudio. All rights reserved. </p></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/auth/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-DmKEaLGc.mjs.map
