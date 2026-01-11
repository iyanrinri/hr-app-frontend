import { _ as _sfc_main$1 } from "./Card-CVi1E1xp.js";
import { _ as _sfc_main$2 } from "./CardContent-BE35Q-6Q.js";
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, withDirectives, createBlock, openBlock, Fragment, renderList, toDisplayString, vModelSelect, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { a as usePayslips } from "./usePayslips-toysh2Fm.js";
import { u as useAllEmployees } from "./useEmployees-CEaIsP48.js";
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
    const selectedEmployeeId = ref("");
    const { data: employees } = useAllEmployees();
    const filters = computed(() => ({
      employeeId: selectedEmployeeId.value || void 0
      // Add period filter if needed
    }));
    const { data: payslipsData, loading: isLoading } = usePayslips(filters);
    const payslips = computed(() => payslipsData.value?.data || []);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$1;
      const _component_UiCardContent = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }, _attrs))}><div class="md:flex md:items-center md:justify-between"><div class="flex-1 min-w-0"><h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"> Payslips </h2><p class="mt-1 text-sm text-gray-500"> View and print employee payslips </p></div></div>`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center space-x-4"${_scopeId2}><div class="w-full max-w-xs"${_scopeId2}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId2}>Filter by Employee</label><select class="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-navy focus:ring-brand-navy sm:text-sm h-10 border px-3"${_scopeId2}><option value=""${ssrIncludeBooleanAttr(Array.isArray(selectedEmployeeId.value) ? ssrLooseContain(selectedEmployeeId.value, "") : ssrLooseEqual(selectedEmployeeId.value, "")) ? " selected" : ""}${_scopeId2}>All Employees</option><!--[-->`);
                  ssrRenderList(unref(employees), (emp) => {
                    _push3(`<option${ssrRenderAttr("value", emp.id)}${ssrIncludeBooleanAttr(Array.isArray(selectedEmployeeId.value) ? ssrLooseContain(selectedEmployeeId.value, emp.id) : ssrLooseEqual(selectedEmployeeId.value, emp.id)) ? " selected" : ""}${_scopeId2}>${ssrInterpolate(emp.firstName)} ${ssrInterpolate(emp.lastName)}</option>`);
                  });
                  _push3(`<!--]--></select></div></div>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    payslips: unref(payslips),
                    loading: unref(isLoading)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "flex items-center space-x-4" }, [
                      createVNode("div", { class: "w-full max-w-xs" }, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Filter by Employee"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => selectedEmployeeId.value = $event,
                          class: "block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-navy focus:ring-brand-navy sm:text-sm h-10 border px-3"
                        }, [
                          createVNode("option", { value: "" }, "All Employees"),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(employees), (emp) => {
                            return openBlock(), createBlock("option", {
                              key: emp.id,
                              value: emp.id
                            }, toDisplayString(emp.firstName) + " " + toDisplayString(emp.lastName), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, selectedEmployeeId.value]
                        ])
                      ])
                    ]),
                    createVNode(_sfc_main$3, {
                      payslips: unref(payslips),
                      loading: unref(isLoading)
                    }, null, 8, ["payslips", "loading"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardContent, { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center space-x-4" }, [
                    createVNode("div", { class: "w-full max-w-xs" }, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Filter by Employee"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => selectedEmployeeId.value = $event,
                        class: "block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-navy focus:ring-brand-navy sm:text-sm h-10 border px-3"
                      }, [
                        createVNode("option", { value: "" }, "All Employees"),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(employees), (emp) => {
                          return openBlock(), createBlock("option", {
                            key: emp.id,
                            value: emp.id
                          }, toDisplayString(emp.firstName) + " " + toDisplayString(emp.lastName), 9, ["value"]);
                        }), 128))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, selectedEmployeeId.value]
                      ])
                    ])
                  ]),
                  createVNode(_sfc_main$3, {
                    payslips: unref(payslips),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/payslips/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-BvzntiGY.js.map
