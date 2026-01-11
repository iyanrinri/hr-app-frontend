import { _ as _sfc_main$1 } from "./Card-CVi1E1xp.js";
import { _ as _sfc_main$2 } from "./CardContent-BE35Q-6Q.js";
import { defineComponent, computed, mergeProps, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { b as useMyPayslips } from "./usePayslips-toysh2Fm.js";
import { _ as _sfc_main$3 } from "./PayslipHistoryTable-2hg4T3Ds.js";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/hookable/dist/index.mjs";
import "./index-B7s_3MI_.js";
import "clsx";
import "tailwind-merge";
import "../server.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/klona/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/destr/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ohash/dist/index.mjs";
import "uuid";
import "./fetch-VuP8VKdC.js";
import "@vue/shared";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/perfect-debounce/dist/index.mjs";
import "./nuxt-link-DsceMx1n.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { data: payslips, loading: isLoading } = useMyPayslips();
    const payslipList = computed(() => payslips.value || []);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$1;
      const _component_UiCardContent = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }, _attrs))}><div class="md:flex md:items-center md:justify-between"><div class="flex-1 min-w-0"><h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"> My Payslips </h2><p class="mt-1 text-sm text-gray-500"> Your salary slip history </p></div></div>`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    payslips: unref(payslipList),
                    loading: unref(isLoading)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$3, {
                      payslips: unref(payslipList),
                      loading: unref(isLoading)
                    }, null, 8, ["payslips", "loading"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode(_sfc_main$3, {
                    payslips: unref(payslipList),
                    loading: unref(isLoading)
                  }, null, 8, ["payslips", "loading"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/payslips/my/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-QzAAUG9g.js.map
