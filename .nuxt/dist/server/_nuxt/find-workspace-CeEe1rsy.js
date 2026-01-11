import { _ as _sfc_main$1 } from "./Input-CKYYc_rG.js";
import { _ as _sfc_main$2 } from "./Button-gKFWS_xI.js";
import { _ as __nuxt_component_0 } from "./nuxt-link-DsceMx1n.js";
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { z } from "zod";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/hookable/dist/index.mjs";
import { a as Users, Q as Quote, B as Building2, A as ArrowRight } from "../server.mjs";
import "./index-B7s_3MI_.js";
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
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/destr/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ohash/dist/index.mjs";
import "uuid";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "find-workspace",
  __ssrInlineRender: true,
  setup(__props) {
    const isChecking = ref(false);
    const generalError = ref("");
    const errors = ref({
      slug: ""
    });
    const form = ref({
      slug: ""
    });
    z.object({
      slug: z.string().min(1, "Workspace URL is required").regex(/^[a-z0-9_]+$/, "Only lowercase letters, numbers, and underscores are allowed")
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiInput = _sfc_main$1;
      const _component_UiButton = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen grid grid-cols-1 lg:grid-cols-2" }, _attrs))}><div class="hidden lg:flex flex-col justify-between bg-gradient-to-br from-brand-navy to-gray-900 p-12 text-white relative overflow-hidden"><div class="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-cyan/20 rounded-full blur-3xl"></div><div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div><div class="relative z-10 flex items-center space-x-3"><div class="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">`);
      _push(ssrRenderComponent(unref(Users), { class: "w-6 h-6 text-brand-cyan" }, null, _parent));
      _push(`</div><span class="text-xl font-bold tracking-tight">HR Portal</span></div><div class="relative z-10 max-w-lg"><h1 class="text-5xl font-extrabold tracking-tight mb-6 leading-tight"> Find your <span class="text-brand-cyan">workspace</span>. </h1><p class="text-lg text-gray-300 leading-relaxed mb-8"> Enter your company&#39;s workspace URL to verify your identity and access your dashboard safely. </p><div class="flex items-center space-x-4 pt-4"><div class="flex -space-x-2"><!--[-->`);
      ssrRenderList(3, (i) => {
        _push(`<div class="w-10 h-10 rounded-full bg-gray-600 border-2 border-brand-navy flex items-center justify-center text-xs font-medium"><span class="text-white/50">U${ssrInterpolate(i)}</span></div>`);
      });
      _push(`<!--]--></div><div class="text-sm text-gray-400"><span class="font-bold text-white">Trust</span> by 2.5k+ companies </div></div></div><div class="relative z-10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">`);
      _push(ssrRenderComponent(unref(Quote), { class: "w-8 h-8 text-brand-cyan/50 mb-4" }, null, _parent));
      _push(`<p class="text-gray-300 italic mb-4"> &quot;The security and ease of access provided by HR Portal is unmatched.&quot; </p><div class="flex items-center"><div class="w-8 h-8 rounded-full bg-brand-cyan flex items-center justify-center text-brand-navy font-bold text-xs mr-3"> AS </div><div><p class="text-sm font-bold text-white">Sarah Jenkins</p><p class="text-xs text-gray-400">Operations Director</p></div></div></div></div><div class="flex flex-col justify-center items-center p-8 bg-gray-50 lg:bg-white"><div class="w-full max-w-md space-y-8"><div class="lg:hidden flex justify-center mb-8"><div class="w-12 h-12 bg-brand-navy rounded-xl flex items-center justify-center">`);
      _push(ssrRenderComponent(unref(Users), { class: "w-6 h-6 text-white" }, null, _parent));
      _push(`</div></div><div class="text-center"><h2 class="text-3xl font-bold text-gray-900 tracking-tight">Find your workspace</h2><p class="mt-2 text-sm text-gray-600"> We&#39;ll help you get to the right place </p></div><form class="mt-8 space-y-6 bg-white lg:bg-transparent p-8 lg:p-0 rounded-2xl lg:rounded-none shadow-xl lg:shadow-none shadow-gray-100/50">`);
      if (generalError.value) {
        _push(`<div class="p-4 rounded-md bg-red-50 border border-red-200 text-sm text-red-600">${ssrInterpolate(generalError.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="space-y-5">`);
      _push(ssrRenderComponent(_component_UiInput, {
        label: "Workspace URL",
        type: "text",
        placeholder: "company_slug",
        modelValue: form.value.slug,
        "onUpdate:modelValue": ($event) => form.value.slug = $event,
        error: errors.value.slug,
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
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UiButton, {
        type: "submit",
        class: "w-full h-12 text-base font-semibold shadow-lg shadow-brand-navy/20 active:scale-[0.98] transition-all",
        "is-loading": isChecking.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Continue `);
            _push2(ssrRenderComponent(unref(ArrowRight), { class: "ml-2 w-4 h-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" Continue "),
              createVNode(unref(ArrowRight), { class: "ml-2 w-4 h-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mt-6 text-center text-sm"><span class="text-gray-500">Don&#39;t have a workspace? </span>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/register",
        class: "font-semibold text-brand-navy hover:text-brand-cyan transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Create new workspace `);
          } else {
            return [
              createTextVNode(" Create new workspace ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/find-workspace.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=find-workspace-CeEe1rsy.js.map
