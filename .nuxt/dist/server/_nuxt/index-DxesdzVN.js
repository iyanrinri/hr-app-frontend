import { _ as _sfc_main$3 } from "./Button-gKFWS_xI.js";
import { _ as _sfc_main$4 } from "./Card-CVi1E1xp.js";
import { _ as _sfc_main$5, a as _sfc_main$6 } from "./CardTitle-D9AdQELc.js";
import { _ as _sfc_main$7 } from "./CardContent-BE35Q-6Q.js";
import { _ as _sfc_main$2 } from "./Input-CKYYc_rG.js";
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext, computed, watchEffect, createVNode, withModifiers, withDirectives, vModelCheckbox, vModelText, createBlock, openBlock, Fragment, renderList, toDisplayString, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import { l as useCreateLeaveType, m as useLeavePeriod, n as useUpdateLeavePeriod, a as useLeaveTypes, o as useDeleteLeaveType } from "./useLeaves-DMmgn55L.js";
import { X, o as ArrowLeft, P as Plus, ad as Trash } from "../server.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/hookable/dist/index.mjs";
import "./nuxt-link-DsceMx1n.js";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ufo/dist/index.mjs";
import "./index-B7s_3MI_.js";
import "clsx";
import "tailwind-merge";
import "./fetch-VuP8VKdC.js";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ohash/dist/index.mjs";
import "@vue/shared";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/perfect-debounce/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/h3/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/klona/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/destr/dist/index.mjs";
import "uuid";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LeaveTypeModal",
  __ssrInlineRender: true,
  props: {
    isOpen: { type: Boolean },
    leavePeriodId: {}
  },
  emits: ["close", "created"],
  setup(__props, { emit: __emit }) {
    const { loading: isPending } = useCreateLeaveType();
    const form = ref({
      type: "",
      name: "",
      description: "",
      defaultQuota: 12,
      maxConsecutiveDays: 5,
      advanceNoticeDays: 3,
      isCarryForward: false,
      maxCarryForward: 0,
      isActive: true
    });
    const errors = ref({});
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiInput = _sfc_main$2;
      const _component_UiButton = _sfc_main$3;
      if (__props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" }, _attrs))}><div class="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"><div class="p-6 border-b flex justify-between items-center"><h3 class="text-lg font-bold">Add Leave Type</h3><button class="text-gray-500 hover:text-gray-700">`);
        _push(ssrRenderComponent(unref(X), { class: "w-5 h-5" }, null, _parent));
        _push(`</button></div><div class="p-6"><form class="space-y-4"><div class="grid grid-cols-2 gap-4">`);
        _push(ssrRenderComponent(_component_UiInput, {
          label: "Type Code (e.g. ANNUAL)",
          modelValue: form.value.type,
          "onUpdate:modelValue": ($event) => form.value.type = $event,
          error: errors.value.type
        }, null, _parent));
        _push(ssrRenderComponent(_component_UiInput, {
          label: "Display Name",
          modelValue: form.value.name,
          "onUpdate:modelValue": ($event) => form.value.name = $event,
          error: errors.value.name
        }, null, _parent));
        _push(`</div><div class="grid grid-cols-3 gap-4">`);
        _push(ssrRenderComponent(_component_UiInput, {
          label: "Default Quota",
          type: "number",
          modelValue: form.value.defaultQuota,
          "onUpdate:modelValue": ($event) => form.value.defaultQuota = $event,
          modelModifiers: { number: true }
        }, null, _parent));
        _push(ssrRenderComponent(_component_UiInput, {
          label: "Max Consec.",
          type: "number",
          modelValue: form.value.maxConsecutiveDays,
          "onUpdate:modelValue": ($event) => form.value.maxConsecutiveDays = $event,
          modelModifiers: { number: true }
        }, null, _parent));
        _push(ssrRenderComponent(_component_UiInput, {
          label: "Adv. Notice",
          type: "number",
          modelValue: form.value.advanceNoticeDays,
          "onUpdate:modelValue": ($event) => form.value.advanceNoticeDays = $event,
          modelModifiers: { number: true }
        }, null, _parent));
        _push(`</div><div class="space-y-2 p-3 bg-gray-50 rounded border"><label class="flex items-center gap-2"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(form.value.isCarryForward) ? ssrLooseContain(form.value.isCarryForward, null) : form.value.isCarryForward) ? " checked" : ""} class="rounded border-gray-300"><span class="text-sm font-medium">Allow Carry Forward?</span></label>`);
        if (form.value.isCarryForward) {
          _push(`<div>`);
          _push(ssrRenderComponent(_component_UiInput, {
            label: "Max Carry Fwd Days",
            type: "number",
            modelValue: form.value.maxCarryForward,
            "onUpdate:modelValue": ($event) => form.value.maxCarryForward = $event,
            modelModifiers: { number: true }
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="space-y-1"><label class="text-sm font-medium">Description</label><textarea class="w-full border rounded p-2 text-sm">${ssrInterpolate(form.value.description)}</textarea></div><div class="flex justify-end gap-3 pt-4">`);
        _push(ssrRenderComponent(_component_UiButton, {
          type: "button",
          variant: "ghost",
          onClick: ($event) => _ctx.$emit("close")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Cancel`);
            } else {
              return [
                createTextVNode("Cancel")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UiButton, {
          type: "submit",
          disabled: unref(isPending)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Create Type`);
            } else {
              return [
                createTextVNode("Create Type")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/leaves/LeaveTypeModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const periodId = computed(() => Number(route.params.id));
    route.params.tenant_slug;
    const { data: period, loading: isLoadingPeriod, refresh: refreshPeriod, error } = useLeavePeriod(periodId);
    const { mutate: updatePeriod, loading: isUpdating } = useUpdateLeavePeriod();
    const { data: leaveTypes, loading: isLoadingTypes, refresh: refreshTypes } = useLeaveTypes(periodId);
    const { mutate: deleteType } = useDeleteLeaveType();
    const form = ref({
      name: "",
      startDate: "",
      endDate: "",
      description: "",
      isActive: false
    });
    const isTypeModalOpen = ref(false);
    watchEffect(() => {
      if (period.value) {
        form.value = {
          name: period.value.name,
          startDate: period.value.startDate.split("T")[0],
          endDate: period.value.endDate.split("T")[0],
          description: period.value.description,
          isActive: period.value.isActive
        };
      }
    });
    const onPeriodSubmit = async () => {
      await updatePeriod(periodId.value, form.value);
      refreshPeriod();
    };
    const handleDeleteType = async (typeId) => {
      if (confirm("Delete this leave type?")) {
        await deleteType(typeId);
        refreshTypes();
      }
    };
    const onTypeCreated = () => {
      refreshTypes();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$3;
      const _component_UiCard = _sfc_main$4;
      const _component_UiCardHeader = _sfc_main$5;
      const _component_UiCardTitle = _sfc_main$6;
      const _component_UiCardContent = _sfc_main$7;
      const _component_UiInput = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}>`);
      if (unref(isLoadingPeriod)) {
        _push(`<div class="p-8 text-center">Loading...</div>`);
      } else if (unref(error) || !unref(period)) {
        _push(`<div class="p-8 text-center text-red-500">Period not found</div>`);
      } else {
        _push(`<!--[--><div class="flex items-center gap-4">`);
        _push(ssrRenderComponent(_component_UiButton, {
          variant: "ghost",
          onClick: ($event) => unref(router).back()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Back `);
            } else {
              return [
                createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                createTextVNode(" Back ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<h2 class="text-2xl font-bold text-gray-900">Edit Leave Period</h2></div>`);
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Configuration`);
                        } else {
                          return [
                            createTextVNode("Configuration")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Configuration")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<form class="space-y-6"${_scopeId2}><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiInput, {
                      label: "Period Name",
                      modelValue: form.value.name,
                      "onUpdate:modelValue": ($event) => form.value.name = $event
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="flex items-end pb-2"${_scopeId2}><label class="flex items-center gap-2 cursor-pointer"${_scopeId2}><input type="checkbox" class="w-5 h-5 rounded border-gray-300 text-brand-navy focus:ring-brand-navy"${ssrIncludeBooleanAttr(Array.isArray(form.value.isActive) ? ssrLooseContain(form.value.isActive, null) : form.value.isActive) ? " checked" : ""}${_scopeId2}><span class="text-sm font-medium text-gray-700"${_scopeId2}>Set as Active Period</span></label></div>`);
                    _push3(ssrRenderComponent(_component_UiInput, {
                      label: "Start Date",
                      type: "date",
                      modelValue: form.value.startDate,
                      "onUpdate:modelValue": ($event) => form.value.startDate = $event
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiInput, {
                      label: "End Date",
                      type: "date",
                      modelValue: form.value.endDate,
                      "onUpdate:modelValue": ($event) => form.value.endDate = $event
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="space-y-1"${_scopeId2}><label class="text-sm font-medium text-gray-700"${_scopeId2}>Description</label><textarea class="w-full min-h-[80px] border border-gray-300 rounded-md p-2"${_scopeId2}>${ssrInterpolate(form.value.description)}</textarea></div><div class="flex justify-end"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiButton, {
                      type: "submit",
                      disabled: unref(isUpdating)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Save Changes`);
                        } else {
                          return [
                            createTextVNode("Save Changes")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></form>`);
                  } else {
                    return [
                      createVNode("form", {
                        onSubmit: withModifiers(onPeriodSubmit, ["prevent"]),
                        class: "space-y-6"
                      }, [
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                          createVNode(_component_UiInput, {
                            label: "Period Name",
                            modelValue: form.value.name,
                            "onUpdate:modelValue": ($event) => form.value.name = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "flex items-end pb-2" }, [
                            createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [
                              withDirectives(createVNode("input", {
                                type: "checkbox",
                                class: "w-5 h-5 rounded border-gray-300 text-brand-navy focus:ring-brand-navy",
                                "onUpdate:modelValue": ($event) => form.value.isActive = $event
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelCheckbox, form.value.isActive]
                              ]),
                              createVNode("span", { class: "text-sm font-medium text-gray-700" }, "Set as Active Period")
                            ])
                          ]),
                          createVNode(_component_UiInput, {
                            label: "Start Date",
                            type: "date",
                            modelValue: form.value.startDate,
                            "onUpdate:modelValue": ($event) => form.value.startDate = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_UiInput, {
                            label: "End Date",
                            type: "date",
                            modelValue: form.value.endDate,
                            "onUpdate:modelValue": ($event) => form.value.endDate = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-1" }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-700" }, "Description"),
                          withDirectives(createVNode("textarea", {
                            class: "w-full min-h-[80px] border border-gray-300 rounded-md p-2",
                            "onUpdate:modelValue": ($event) => form.value.description = $event
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, form.value.description]
                          ])
                        ]),
                        createVNode("div", { class: "flex justify-end" }, [
                          createVNode(_component_UiButton, {
                            type: "submit",
                            disabled: unref(isUpdating)
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Save Changes")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ])
                      ], 32)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, null, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Configuration")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("form", {
                      onSubmit: withModifiers(onPeriodSubmit, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode(_component_UiInput, {
                          label: "Period Name",
                          modelValue: form.value.name,
                          "onUpdate:modelValue": ($event) => form.value.name = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "flex items-end pb-2" }, [
                          createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [
                            withDirectives(createVNode("input", {
                              type: "checkbox",
                              class: "w-5 h-5 rounded border-gray-300 text-brand-navy focus:ring-brand-navy",
                              "onUpdate:modelValue": ($event) => form.value.isActive = $event
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, form.value.isActive]
                            ]),
                            createVNode("span", { class: "text-sm font-medium text-gray-700" }, "Set as Active Period")
                          ])
                        ]),
                        createVNode(_component_UiInput, {
                          label: "Start Date",
                          type: "date",
                          modelValue: form.value.startDate,
                          "onUpdate:modelValue": ($event) => form.value.startDate = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UiInput, {
                          label: "End Date",
                          type: "date",
                          modelValue: form.value.endDate,
                          "onUpdate:modelValue": ($event) => form.value.endDate = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-1" }, [
                        createVNode("label", { class: "text-sm font-medium text-gray-700" }, "Description"),
                        withDirectives(createVNode("textarea", {
                          class: "w-full min-h-[80px] border border-gray-300 rounded-md p-2",
                          "onUpdate:modelValue": ($event) => form.value.description = $event
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, form.value.description]
                        ])
                      ]),
                      createVNode("div", { class: "flex justify-end" }, [
                        createVNode(_component_UiButton, {
                          type: "submit",
                          disabled: unref(isUpdating)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Save Changes")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ])
                    ], 32)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="space-y-4"><div class="flex justify-between items-center"><h3 class="text-xl font-bold text-gray-800">Leave Types &amp; Quotas</h3>`);
        _push(ssrRenderComponent(_component_UiButton, {
          onClick: ($event) => isTypeModalOpen.value = true
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Add Leave Type `);
            } else {
              return [
                createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                createTextVNode(" Add Leave Type ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "p-0 overflow-hidden" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<table class="w-full text-sm text-left"${_scopeId2}><thead class="bg-gray-50 border-b"${_scopeId2}><tr${_scopeId2}><th class="px-4 py-3 font-medium text-gray-500"${_scopeId2}>Code</th><th class="px-4 py-3 font-medium text-gray-500"${_scopeId2}>Name</th><th class="px-4 py-3 font-medium text-gray-500"${_scopeId2}>Quota</th><th class="px-4 py-3 font-medium text-gray-500"${_scopeId2}>Settings</th><th class="px-4 py-3 font-medium text-right text-gray-500"${_scopeId2}>Action</th></tr></thead><tbody class="divide-y"${_scopeId2}>`);
                    if (unref(isLoadingTypes)) {
                      _push3(`<tr${_scopeId2}><td colspan="5" class="p-4 text-center"${_scopeId2}>Loading types...</td></tr>`);
                    } else if (!unref(leaveTypes) || unref(leaveTypes).length === 0) {
                      _push3(`<tr${_scopeId2}><td colspan="5" class="p-4 text-center text-gray-500 italic"${_scopeId2}>No leave types defined.</td></tr>`);
                    } else {
                      _push3(`<!--[-->`);
                      ssrRenderList(unref(leaveTypes), (lt) => {
                        _push3(`<tr class="hover:bg-gray-50"${_scopeId2}><td class="px-4 py-3 font-mono text-xs"${_scopeId2}>${ssrInterpolate(lt.type)}</td><td class="px-4 py-3 font-medium"${_scopeId2}>${ssrInterpolate(lt.name)}</td><td class="px-4 py-3"${_scopeId2}>${ssrInterpolate(lt.defaultQuota)} Days</td><td class="px-4 py-3 text-xs text-gray-500 space-y-1"${_scopeId2}><div${_scopeId2}>Max Consec: ${ssrInterpolate(lt.maxConsecutiveDays)}d</div><div${_scopeId2}>Notice: ${ssrInterpolate(lt.advanceNoticeDays)}d</div>`);
                        if (lt.isCarryForward) {
                          _push3(`<div class="text-green-600"${_scopeId2}>Carry Fwd: ${ssrInterpolate(lt.maxCarryForward)}d</div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</td><td class="px-4 py-3 text-right"${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_UiButton, {
                          variant: "destructive",
                          class: "h-8 px-2",
                          onClick: ($event) => handleDeleteType(lt.id)
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(unref(Trash), { class: "w-4 h-4" }, null, _parent4, _scopeId3));
                            } else {
                              return [
                                createVNode(unref(Trash), { class: "w-4 h-4" })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(`</td></tr>`);
                      });
                      _push3(`<!--]-->`);
                    }
                    _push3(`</tbody></table>`);
                  } else {
                    return [
                      createVNode("table", { class: "w-full text-sm text-left" }, [
                        createVNode("thead", { class: "bg-gray-50 border-b" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Code"),
                            createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Name"),
                            createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Quota"),
                            createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Settings"),
                            createVNode("th", { class: "px-4 py-3 font-medium text-right text-gray-500" }, "Action")
                          ])
                        ]),
                        createVNode("tbody", { class: "divide-y" }, [
                          unref(isLoadingTypes) ? (openBlock(), createBlock("tr", { key: 0 }, [
                            createVNode("td", {
                              colspan: "5",
                              class: "p-4 text-center"
                            }, "Loading types...")
                          ])) : !unref(leaveTypes) || unref(leaveTypes).length === 0 ? (openBlock(), createBlock("tr", { key: 1 }, [
                            createVNode("td", {
                              colspan: "5",
                              class: "p-4 text-center text-gray-500 italic"
                            }, "No leave types defined.")
                          ])) : (openBlock(true), createBlock(Fragment, { key: 2 }, renderList(unref(leaveTypes), (lt) => {
                            return openBlock(), createBlock("tr", {
                              key: lt.id,
                              class: "hover:bg-gray-50"
                            }, [
                              createVNode("td", { class: "px-4 py-3 font-mono text-xs" }, toDisplayString(lt.type), 1),
                              createVNode("td", { class: "px-4 py-3 font-medium" }, toDisplayString(lt.name), 1),
                              createVNode("td", { class: "px-4 py-3" }, toDisplayString(lt.defaultQuota) + " Days", 1),
                              createVNode("td", { class: "px-4 py-3 text-xs text-gray-500 space-y-1" }, [
                                createVNode("div", null, "Max Consec: " + toDisplayString(lt.maxConsecutiveDays) + "d", 1),
                                createVNode("div", null, "Notice: " + toDisplayString(lt.advanceNoticeDays) + "d", 1),
                                lt.isCarryForward ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-green-600"
                                }, "Carry Fwd: " + toDisplayString(lt.maxCarryForward) + "d", 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("td", { class: "px-4 py-3 text-right" }, [
                                createVNode(_component_UiButton, {
                                  variant: "destructive",
                                  class: "h-8 px-2",
                                  onClick: ($event) => handleDeleteType(lt.id)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Trash), { class: "w-4 h-4" })
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardContent, { class: "p-0 overflow-hidden" }, {
                  default: withCtx(() => [
                    createVNode("table", { class: "w-full text-sm text-left" }, [
                      createVNode("thead", { class: "bg-gray-50 border-b" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Code"),
                          createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Name"),
                          createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Quota"),
                          createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Settings"),
                          createVNode("th", { class: "px-4 py-3 font-medium text-right text-gray-500" }, "Action")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y" }, [
                        unref(isLoadingTypes) ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "5",
                            class: "p-4 text-center"
                          }, "Loading types...")
                        ])) : !unref(leaveTypes) || unref(leaveTypes).length === 0 ? (openBlock(), createBlock("tr", { key: 1 }, [
                          createVNode("td", {
                            colspan: "5",
                            class: "p-4 text-center text-gray-500 italic"
                          }, "No leave types defined.")
                        ])) : (openBlock(true), createBlock(Fragment, { key: 2 }, renderList(unref(leaveTypes), (lt) => {
                          return openBlock(), createBlock("tr", {
                            key: lt.id,
                            class: "hover:bg-gray-50"
                          }, [
                            createVNode("td", { class: "px-4 py-3 font-mono text-xs" }, toDisplayString(lt.type), 1),
                            createVNode("td", { class: "px-4 py-3 font-medium" }, toDisplayString(lt.name), 1),
                            createVNode("td", { class: "px-4 py-3" }, toDisplayString(lt.defaultQuota) + " Days", 1),
                            createVNode("td", { class: "px-4 py-3 text-xs text-gray-500 space-y-1" }, [
                              createVNode("div", null, "Max Consec: " + toDisplayString(lt.maxConsecutiveDays) + "d", 1),
                              createVNode("div", null, "Notice: " + toDisplayString(lt.advanceNoticeDays) + "d", 1),
                              lt.isCarryForward ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-green-600"
                              }, "Carry Fwd: " + toDisplayString(lt.maxCarryForward) + "d", 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("td", { class: "px-4 py-3 text-right" }, [
                              createVNode(_component_UiButton, {
                                variant: "destructive",
                                class: "h-8 px-2",
                                onClick: ($event) => handleDeleteType(lt.id)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Trash), { class: "w-4 h-4" })
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          isOpen: isTypeModalOpen.value,
          leavePeriodId: periodId.value,
          onClose: ($event) => isTypeModalOpen.value = false,
          onCreated: onTypeCreated
        }, null, _parent));
        _push(`<!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/leaves/periods/[id]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-DxesdzVN.js.map
