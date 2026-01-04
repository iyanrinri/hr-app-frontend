import { _ as _sfc_main$1 } from "./Input-BiMdQ6SY.js";
import { _ as _sfc_main$2 } from "./Button-DjJ57WMA.js";
import { _ as __nuxt_component_0 } from "./nuxt-link-BACLTvko.js";
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { z } from "zod";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/hookable/dist/index.mjs";
import { B as Building2, C as CircleCheck, Q as Quote, T as Tag, U as User, M as Mail, L as Lock, A as ArrowRight } from "../server.mjs";
import "./index-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/klona/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const isPending = ref(false);
    const generalError = ref("");
    const errors = ref({});
    const form = ref({
      tenantName: "",
      slug: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    z.object({
      email: z.string().email("Invalid email address"),
      tenantName: z.string().min(2, "Company name must be at least 2 characters"),
      slug: z.string().min(2, "Slug must be at least 2 characters").regex(/^[a-z0-9_]+$/, "Slug must contain only lowercase letters, numbers, and underscores"),
      firstName: z.string().min(2, "First name must be at least 2 characters"),
      lastName: z.string().min(2, "Last name must be at least 2 characters"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string().min(6, "Please confirm your password")
    }).refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiInput = _sfc_main$1;
      const _component_UiButton = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen grid grid-cols-1 lg:grid-cols-2" }, _attrs))}><div class="hidden lg:flex flex-col justify-between bg-gradient-to-br from-brand-navy to-gray-900 p-12 text-white relative overflow-hidden"><div class="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-cyan/20 rounded-full blur-3xl"></div><div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div><div class="relative z-10 flex items-center space-x-3"><div class="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">`);
      _push(ssrRenderComponent(unref(Building2), { class: "w-6 h-6 text-brand-cyan" }, null, _parent));
      _push(`</div><span class="text-xl font-bold tracking-tight">HR Portal</span></div><div class="relative z-10 max-w-lg"><h1 class="text-5xl font-extrabold tracking-tight mb-6 leading-tight"> Start managing your team <span class="text-brand-cyan">today</span>. </h1><p class="text-lg text-gray-300 leading-relaxed mb-8"> Create your company workspace and get instant access to powerful HR management tools. </p><div class="space-y-4"><!--[-->`);
      ssrRenderList([
        "Complete employee management system",
        "Attendance tracking & reporting",
        "Leave & overtime management",
        "Payroll & payslip generation"
      ], (feature, i) => {
        _push(`<div class="flex items-center space-x-3">`);
        _push(ssrRenderComponent(unref(CircleCheck), { class: "w-5 h-5 text-brand-cyan flex-shrink-0" }, null, _parent));
        _push(`<span class="text-gray-300">${ssrInterpolate(feature)}</span></div>`);
      });
      _push(`<!--]--></div></div><div class="relative z-10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">`);
      _push(ssrRenderComponent(unref(Quote), { class: "w-8 h-8 text-brand-cyan/50 mb-4" }, null, _parent));
      _push(`<p class="text-gray-300 italic mb-4"> &quot;Setting up our HR system was incredibly easy. We were up and running in minutes!&quot; </p><div class="flex items-center"><div class="w-8 h-8 rounded-full bg-brand-cyan flex items-center justify-center text-brand-navy font-bold text-xs mr-3"> SM </div><div><p class="text-sm font-bold text-white">Sarah Miller</p><p class="text-xs text-gray-400">CEO, TechStart</p></div></div></div></div><div class="flex flex-col justify-center items-center p-8 bg-gray-50 lg:bg-white overflow-y-auto"><div class="w-full max-w-md space-y-8 py-8"><div class="lg:hidden flex justify-center mb-8"><div class="w-12 h-12 bg-brand-navy rounded-xl flex items-center justify-center">`);
      _push(ssrRenderComponent(unref(Building2), { class: "w-6 h-6 text-white" }, null, _parent));
      _push(`</div></div><div class="text-center"><h2 class="text-3xl font-bold text-gray-900 tracking-tight">Create Your Workspace</h2><p class="mt-2 text-sm text-gray-600"> Register your company and start managing your team </p></div><form class="mt-8 space-y-5 bg-white lg:bg-transparent p-8 lg:p-0 rounded-2xl lg:rounded-none shadow-xl lg:shadow-none shadow-gray-100/50">`);
      if (generalError.value) {
        _push(`<div class="p-4 rounded-md bg-red-50 border border-red-200 text-sm text-red-600">${ssrInterpolate(generalError.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="space-y-4"><h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Company Information</h3>`);
      _push(ssrRenderComponent(_component_UiInput, {
        label: "Company Name",
        type: "text",
        placeholder: "Acme Corporation",
        modelValue: form.value.tenantName,
        "onUpdate:modelValue": ($event) => form.value.tenantName = $event,
        error: errors.value.tenantName,
        class: "bg-gray-50 border-gray-200 focus:bg-white transition-colors"
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Building2), { class: "w-4 h-4 text-gray-400" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Building2), { class: "w-4 h-4 text-gray-400" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiInput, {
        label: "Company Slug",
        type: "text",
        placeholder: "acme_corp",
        modelValue: form.value.slug,
        "onUpdate:modelValue": ($event) => form.value.slug = $event,
        error: errors.value.slug,
        class: "bg-gray-50 border-gray-200 focus:bg-white transition-colors",
        helperText: "Used in your workspace URL (lowercase, numbers, underscores only)"
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Tag), { class: "w-4 h-4 text-gray-400" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Tag), { class: "w-4 h-4 text-gray-400" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="space-y-4 pt-4"><h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Admin Account</h3><div class="grid grid-cols-2 gap-4">`);
      _push(ssrRenderComponent(_component_UiInput, {
        label: "First Name",
        type: "text",
        placeholder: "John",
        modelValue: form.value.firstName,
        "onUpdate:modelValue": ($event) => form.value.firstName = $event,
        error: errors.value.firstName,
        class: "bg-gray-50 border-gray-200 focus:bg-white transition-colors"
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(User), { class: "w-4 h-4 text-gray-400" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(User), { class: "w-4 h-4 text-gray-400" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiInput, {
        label: "Last Name",
        type: "text",
        placeholder: "Doe",
        modelValue: form.value.lastName,
        "onUpdate:modelValue": ($event) => form.value.lastName = $event,
        error: errors.value.lastName,
        class: "bg-gray-50 border-gray-200 focus:bg-white transition-colors"
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(User), { class: "w-4 h-4 text-gray-400" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(User), { class: "w-4 h-4 text-gray-400" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UiInput, {
        label: "Email Address",
        type: "email",
        placeholder: "admin@acme.com",
        modelValue: form.value.email,
        "onUpdate:modelValue": ($event) => form.value.email = $event,
        error: errors.value.email,
        class: "bg-gray-50 border-gray-200 focus:bg-white transition-colors",
        autocomplete: "email"
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
      _push(ssrRenderComponent(_component_UiInput, {
        label: "Password",
        type: "password",
        placeholder: "••••••••",
        modelValue: form.value.password,
        "onUpdate:modelValue": ($event) => form.value.password = $event,
        error: errors.value.password,
        class: "bg-gray-50 border-gray-200 focus:bg-white transition-colors",
        autocomplete: "new-password"
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
      _push(ssrRenderComponent(_component_UiInput, {
        label: "Confirm Password",
        type: "password",
        placeholder: "••••••••",
        modelValue: form.value.confirmPassword,
        "onUpdate:modelValue": ($event) => form.value.confirmPassword = $event,
        error: errors.value.confirmPassword,
        class: "bg-gray-50 border-gray-200 focus:bg-white transition-colors",
        autocomplete: "new-password"
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
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UiButton, {
        type: "submit",
        class: "w-full h-12 text-base font-semibold shadow-lg shadow-brand-navy/20 active:scale-[0.98] transition-all mt-6",
        "is-loading": isPending.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Create Workspace `);
            _push2(ssrRenderComponent(unref(ArrowRight), { class: "ml-2 w-4 h-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" Create Workspace "),
              createVNode(unref(ArrowRight), { class: "ml-2 w-4 h-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mt-6 text-center text-sm"><span class="text-gray-500">Already have an account? </span>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/find-workspace",
        class: "font-semibold text-brand-navy hover:text-brand-cyan transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sign in to your workspace `);
          } else {
            return [
              createTextVNode(" Sign in to your workspace ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form><p class="text-center text-xs text-gray-400 mt-8"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} HR Portal by NodeStudio. All rights reserved. </p></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=register-DT6YeZ9U.js.map
