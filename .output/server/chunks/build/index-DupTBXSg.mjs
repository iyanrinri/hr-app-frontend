import { _ as _sfc_main$6 } from './Button-gKFWS_xI.mjs';
import { _ as _sfc_main$7 } from './Card-CVi1E1xp.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$8 } from './CardTitle-D9AdQELc.mjs';
import { _ as _sfc_main$9 } from './CardContent-BE35Q-6Q.mjs';
import { _ as _sfc_main$a } from './Input-CKYYc_rG.mjs';
import { defineComponent, ref, watch, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, withModifiers, createBlock, createCommentVNode, openBlock, computed, withDirectives, Fragment, renderList, vModelSelect, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { d as useEmployee, e as useUpdateEmployee, u as useAllEmployees, f as useAssignManager, g as useAssignSubordinates } from './useEmployees-CEaIsP48.mjs';
import { f as useEmployeeProfile, g as useUpdateEmployeeProfile, h as useUploadEmployeePicture, i as useDeleteEmployeePicture, _ as _sfc_main$b, d as _sfc_main$1$2, e as _sfc_main$2$1 } from './ProfilePictureUpload-DFGwDs2u.mjs';
import { u as useRoute, n as useRouter, o as ArrowLeft, a3 as Network, a as Users, a4 as UserPlus, W as Wallet, b as Calendar, a5 as Award, a6 as History, D as DollarSign, U as User } from './server.mjs';
import { c as cn } from './index-B7s_3MI_.mjs';
import { u as useFetch } from './fetch-VuP8VKdC.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'uuid';
import 'clsx';
import 'tailwind-merge';
import '@vue/shared';
import 'perfect-debounce';

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "SubordinateManager",
  __ssrInlineRender: true,
  props: {
    employeeId: {},
    currentSubordinates: {},
    allEmployees: {},
    isSaving: { type: Boolean }
  },
  emits: ["save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isEditing = ref(false);
    const selectedIds = ref([]);
    const handleStartEdit = () => {
      selectedIds.value = props.currentSubordinates.map((e) => Number(e.id));
      isEditing.value = true;
    };
    const handleSave = () => {
      emit("save", selectedIds.value);
      isEditing.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$6;
      if (isEditing.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div class="max-h-[200px] overflow-y-auto border rounded-md p-2 space-y-1"><!--[-->`);
        ssrRenderList(__props.allEmployees, (e) => {
          _push(`<label class="flex items-center gap-2 p-1 hover:bg-gray-50 rounded cursor-pointer"><input type="checkbox"${ssrIncludeBooleanAttr(selectedIds.value.includes(Number(e.id))) ? " checked" : ""} class="rounded border-gray-300 text-brand-navy focus:ring-brand-navy"><span class="text-sm">${ssrInterpolate(e.firstName)} ${ssrInterpolate(e.lastName)}</span><span class="text-xs text-gray-400">(${ssrInterpolate(e.position)})</span></label>`);
        });
        _push(`<!--]--></div><div class="flex gap-2 justify-end">`);
        _push(ssrRenderComponent(_component_UiButton, {
          variant: "ghost",
          onClick: ($event) => isEditing.value = false
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
          onClick: handleSave,
          isLoading: __props.isSaving
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Save Assignment`);
            } else {
              return [
                createTextVNode("Save Assignment")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-4 max-h-[150px] overflow-y-auto space-y-2">`);
        if (__props.currentSubordinates.length === 0) {
          _push(`<div class="text-sm text-gray-500 italic"> No direct reports. </div>`);
        } else {
          _push(`<!--[-->`);
          ssrRenderList(__props.currentSubordinates, (sub) => {
            _push(`<div class="flex items-center gap-2 p-2 bg-gray-50 rounded-md border border-gray-100"><div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs font-bold">${ssrInterpolate(sub.firstName[0])}${ssrInterpolate(sub.lastName[0])}</div><div><p class="text-sm font-medium">${ssrInterpolate(sub.firstName)} ${ssrInterpolate(sub.lastName)}</p><p class="text-xs text-gray-500">${ssrInterpolate(sub.position)}</p></div></div>`);
          });
          _push(`<!--]-->`);
        }
        _push(`</div>`);
        _push(ssrRenderComponent(_component_UiButton, {
          variant: "secondary",
          class: "w-full",
          onClick: handleStartEdit
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Manage Subordinates `);
            } else {
              return [
                createTextVNode(" Manage Subordinates ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/employees/SubordinateManager.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "NodeCard",
  __ssrInlineRender: true,
  props: {
    name: {},
    position: {},
    isCurrent: { type: Boolean, default: false },
    isManager: { type: Boolean, default: false },
    isSubordinate: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)(
          "flex flex-col items-center p-3 rounded-lg border shadow-sm min-w-[150px] bg-white transition-all hover:shadow-md",
          __props.isCurrent ? "border-brand-navy ring-2 ring-brand-navy/20 bg-brand-navy/5" : "border-gray-200",
          __props.isManager ? "border-purple-200 bg-purple-50" : "",
          __props.isSubordinate ? "border-green-200 bg-green-50" : ""
        )
      }, _attrs))}><div class="${ssrRenderClass(unref(cn)(
        "w-10 h-10 rounded-full flex items-center justify-center mb-2",
        __props.isCurrent ? "bg-brand-navy text-white" : "bg-gray-100 text-gray-500",
        __props.isManager ? "bg-purple-100 text-purple-600" : "",
        __props.isSubordinate ? "bg-green-100 text-green-600" : ""
      ))}">`);
      _push(ssrRenderComponent(unref(User), { class: "w-5 h-5" }, null, _parent));
      _push(`</div><p class="font-semibold text-sm text-gray-900 text-center">${ssrInterpolate(__props.name)}</p><p class="text-xs text-gray-500 text-center">${ssrInterpolate(__props.position)}</p></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/employees/NodeCard.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "OrgChart",
  __ssrInlineRender: true,
  props: {
    employeeId: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (_ctx.loading) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-8 text-center text-gray-500" }, _attrs))}>Loading organization chart...</div>`);
      } else if (_ctx.error || !_ctx.tree) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-8 text-center text-red-500" }, _attrs))}>Failed to load organization chart</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center space-y-8 p-6 overflow-auto bg-gray-50 rounded-xl min-h-[400px]" }, _attrs))}>`);
        if (_ctx.tree.manager) {
          _push(`<div class="flex flex-col items-center">`);
          _push(ssrRenderComponent(_sfc_main$4, {
            name: `${_ctx.tree.manager.firstName} ${_ctx.tree.manager.lastName}`,
            position: _ctx.tree.manager.position,
            isManager: ""
          }, null, _parent));
          _push(`<div class="h-8 w-px bg-gray-300"></div></div>`);
        } else {
          _push(`<div class="text-xs text-gray-400 mb-4 italic">No Manager (Root)</div>`);
        }
        _push(`<div class="flex flex-col items-center relative z-10">`);
        _push(ssrRenderComponent(_sfc_main$4, {
          name: `${_ctx.tree.employee.firstName} ${_ctx.tree.employee.lastName}`,
          position: _ctx.tree.employee.position,
          isCurrent: ""
        }, null, _parent));
        if (_ctx.tree.subordinates.length > 0) {
          _push(`<div class="h-8 w-px bg-gray-300"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (_ctx.tree.subordinates.length > 0) {
          _push(`<div class="flex gap-6 items-start justify-center relative">`);
          if (_ctx.tree.subordinates.length > 1) {
            _push(`<div class="absolute -top-4 left-10 right-10 h-px bg-gray-300"></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--[-->`);
          ssrRenderList(_ctx.tree.subordinates, (sub) => {
            _push(`<div class="flex flex-col items-center relative"><div class="h-4 w-px bg-gray-300 absolute -top-4"></div>`);
            _push(ssrRenderComponent(_sfc_main$4, {
              name: `${sub.firstName} ${sub.lastName}`,
              position: sub.position,
              isSubordinate: ""
            }, null, _parent));
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.tree.subordinates.length === 0) {
          _push(`<div class="text-xs text-gray-400 italic">No direct subordinates</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/employees/OrgChart.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "HierarchyManager",
  __ssrInlineRender: true,
  props: {
    employeeId: {}
  },
  setup(__props) {
    const props = __props;
    const { data: employee } = useEmployee(props.employeeId);
    const { data: allEmployees } = useAllEmployees();
    const { mutate: assignManager, loading: isAssigningManager } = useAssignManager();
    const { mutate: assignSubordinates, loading: isAssigningSubordinates } = useAssignSubordinates();
    const showOrgChart = ref(false);
    const isEditManager = ref(false);
    const selectedManagerId = ref(null);
    const otherEmployees = computed(() => {
      var _a;
      return ((_a = allEmployees.value) == null ? void 0 : _a.filter((e) => e.id !== props.employeeId)) || [];
    });
    const handleAssignManager = async () => {
      await assignManager(props.employeeId, { managerId: selectedManagerId.value });
      isEditManager.value = false;
    };
    const handleStartEditManager = () => {
      var _a;
      selectedManagerId.value = ((_a = employee.value) == null ? void 0 : _a.managerId) || null;
      isEditManager.value = true;
    };
    const getManagerName = (managerId) => {
      var _a;
      const mgr = (_a = allEmployees.value) == null ? void 0 : _a.find((e) => String(e.id) === String(managerId));
      return mgr;
    };
    const saveSubordinates = async (ids) => {
      await assignSubordinates(props.employeeId, { subordinateIds: ids });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$6;
      const _component_UiCard = _sfc_main$7;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$8;
      const _component_UiCardContent = _sfc_main$9;
      if (unref(employee)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200"><div><h3 class="text-lg font-medium text-gray-900">Organization Hierarchy</h3><p class="text-sm text-gray-500">Manage reporting lines and view structure</p></div>`);
        _push(ssrRenderComponent(_component_UiButton, {
          variant: "secondary",
          onClick: ($event) => showOrgChart.value = !showOrgChart.value
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Network), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(showOrgChart.value ? "Hide Org Chart" : "View Inheritance")}`);
            } else {
              return [
                createVNode(unref(Network), { class: "w-4 h-4 mr-2" }),
                createTextVNode(" " + toDisplayString(showOrgChart.value ? "Hide Org Chart" : "View Inheritance"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        if (showOrgChart.value) {
          _push(ssrRenderComponent(_component_UiCard, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Organization Chart`);
                          } else {
                            return [
                              createTextVNode("Organization Chart")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UiCardTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Organization Chart")
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
                      _push3(ssrRenderComponent(_sfc_main$3, { employeeId: __props.employeeId }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_sfc_main$3, { employeeId: __props.employeeId }, null, 8, ["employeeId"])
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
                          createTextVNode("Organization Chart")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardContent, null, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$3, { employeeId: __props.employeeId }, null, 8, ["employeeId"])
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6">`);
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-base flex items-center gap-2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Users), { class: "w-4 h-4 text-purple-600" }, null, _parent4, _scopeId3));
                          _push4(` Reports To (Manager) `);
                        } else {
                          return [
                            createVNode(unref(Users), { class: "w-4 h-4 text-purple-600" }),
                            createTextVNode(" Reports To (Manager) ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-base flex items-center gap-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(Users), { class: "w-4 h-4 text-purple-600" }),
                          createTextVNode(" Reports To (Manager) ")
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
                  var _a, _b, _c, _d, _e, _f;
                  if (_push3) {
                    if (isEditManager.value) {
                      _push3(`<div class="space-y-3"${_scopeId2}><select class="w-full p-2 border rounded-md text-sm bg-white text-black"${_scopeId2}><option${ssrRenderAttr("value", null)}${ssrIncludeBooleanAttr(Array.isArray(selectedManagerId.value) ? ssrLooseContain(selectedManagerId.value, null) : ssrLooseEqual(selectedManagerId.value, null)) ? " selected" : ""}${_scopeId2}>-- No Manager --</option><!--[-->`);
                      ssrRenderList(otherEmployees.value, (e) => {
                        _push3(`<option${ssrRenderAttr("value", Number(e.id))}${ssrIncludeBooleanAttr(Array.isArray(selectedManagerId.value) ? ssrLooseContain(selectedManagerId.value, Number(e.id)) : ssrLooseEqual(selectedManagerId.value, Number(e.id))) ? " selected" : ""}${_scopeId2}>${ssrInterpolate(e.firstName)} ${ssrInterpolate(e.lastName)} (${ssrInterpolate(e.position)}) </option>`);
                      });
                      _push3(`<!--]--></select><div class="flex gap-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiButton, {
                        onClick: handleAssignManager,
                        isLoading: unref(isAssigningManager)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Save`);
                          } else {
                            return [
                              createTextVNode("Save")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiButton, {
                        variant: "ghost",
                        onClick: ($event) => isEditManager.value = false
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Cancel`);
                          } else {
                            return [
                              createTextVNode("Cancel")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div></div>`);
                    } else {
                      _push3(`<div class="flex justify-between items-center"${_scopeId2}><div${_scopeId2}>`);
                      if (unref(employee).managerId) {
                        _push3(`<!--[-->`);
                        if (getManagerName(unref(employee).managerId)) {
                          _push3(`<div${_scopeId2}><p class="font-medium text-gray-900"${_scopeId2}>${ssrInterpolate((_a = getManagerName(unref(employee).managerId)) == null ? void 0 : _a.firstName)} ${ssrInterpolate((_b = getManagerName(unref(employee).managerId)) == null ? void 0 : _b.lastName)}</p><p class="text-xs text-gray-500"${_scopeId2}>${ssrInterpolate((_c = getManagerName(unref(employee).managerId)) == null ? void 0 : _c.position)}</p></div>`);
                        } else {
                          _push3(`<p class="text-gray-500 italic"${_scopeId2}>Unknown Manager (ID: ${ssrInterpolate(unref(employee).managerId)})</p>`);
                        }
                        _push3(`<!--]-->`);
                      } else {
                        _push3(`<p class="text-gray-500 italic"${_scopeId2}>No manager assigned</p>`);
                      }
                      _push3(`</div>`);
                      _push3(ssrRenderComponent(_component_UiButton, {
                        variant: "secondary",
                        onClick: handleStartEditManager
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Change `);
                          } else {
                            return [
                              createTextVNode(" Change ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    }
                  } else {
                    return [
                      isEditManager.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-3"
                      }, [
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => selectedManagerId.value = $event,
                          class: "w-full p-2 border rounded-md text-sm bg-white text-black"
                        }, [
                          createVNode("option", { value: null }, "-- No Manager --"),
                          (openBlock(true), createBlock(Fragment, null, renderList(otherEmployees.value, (e) => {
                            return openBlock(), createBlock("option", {
                              key: e.id,
                              value: Number(e.id)
                            }, toDisplayString(e.firstName) + " " + toDisplayString(e.lastName) + " (" + toDisplayString(e.position) + ") ", 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, selectedManagerId.value]
                        ]),
                        createVNode("div", { class: "flex gap-2" }, [
                          createVNode(_component_UiButton, {
                            onClick: handleAssignManager,
                            isLoading: unref(isAssigningManager)
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Save")
                            ]),
                            _: 1
                          }, 8, ["isLoading"]),
                          createVNode(_component_UiButton, {
                            variant: "ghost",
                            onClick: ($event) => isEditManager.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ])
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex justify-between items-center"
                      }, [
                        createVNode("div", null, [
                          unref(employee).managerId ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            getManagerName(unref(employee).managerId) ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("p", { class: "font-medium text-gray-900" }, toDisplayString((_d = getManagerName(unref(employee).managerId)) == null ? void 0 : _d.firstName) + " " + toDisplayString((_e = getManagerName(unref(employee).managerId)) == null ? void 0 : _e.lastName), 1),
                              createVNode("p", { class: "text-xs text-gray-500" }, toDisplayString((_f = getManagerName(unref(employee).managerId)) == null ? void 0 : _f.position), 1)
                            ])) : (openBlock(), createBlock("p", {
                              key: 1,
                              class: "text-gray-500 italic"
                            }, "Unknown Manager (ID: " + toDisplayString(unref(employee).managerId) + ")", 1))
                          ], 64)) : (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-gray-500 italic"
                          }, "No manager assigned"))
                        ]),
                        createVNode(_component_UiButton, {
                          variant: "secondary",
                          onClick: handleStartEditManager
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Change ")
                          ]),
                          _: 1
                        })
                      ]))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, { class: "pb-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, { class: "text-base flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(Users), { class: "w-4 h-4 text-purple-600" }),
                        createTextVNode(" Reports To (Manager) ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => {
                    var _a, _b, _c;
                    return [
                      isEditManager.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-3"
                      }, [
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => selectedManagerId.value = $event,
                          class: "w-full p-2 border rounded-md text-sm bg-white text-black"
                        }, [
                          createVNode("option", { value: null }, "-- No Manager --"),
                          (openBlock(true), createBlock(Fragment, null, renderList(otherEmployees.value, (e) => {
                            return openBlock(), createBlock("option", {
                              key: e.id,
                              value: Number(e.id)
                            }, toDisplayString(e.firstName) + " " + toDisplayString(e.lastName) + " (" + toDisplayString(e.position) + ") ", 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, selectedManagerId.value]
                        ]),
                        createVNode("div", { class: "flex gap-2" }, [
                          createVNode(_component_UiButton, {
                            onClick: handleAssignManager,
                            isLoading: unref(isAssigningManager)
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Save")
                            ]),
                            _: 1
                          }, 8, ["isLoading"]),
                          createVNode(_component_UiButton, {
                            variant: "ghost",
                            onClick: ($event) => isEditManager.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ])
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex justify-between items-center"
                      }, [
                        createVNode("div", null, [
                          unref(employee).managerId ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            getManagerName(unref(employee).managerId) ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("p", { class: "font-medium text-gray-900" }, toDisplayString((_a = getManagerName(unref(employee).managerId)) == null ? void 0 : _a.firstName) + " " + toDisplayString((_b = getManagerName(unref(employee).managerId)) == null ? void 0 : _b.lastName), 1),
                              createVNode("p", { class: "text-xs text-gray-500" }, toDisplayString((_c = getManagerName(unref(employee).managerId)) == null ? void 0 : _c.position), 1)
                            ])) : (openBlock(), createBlock("p", {
                              key: 1,
                              class: "text-gray-500 italic"
                            }, "Unknown Manager (ID: " + toDisplayString(unref(employee).managerId) + ")", 1))
                          ], 64)) : (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-gray-500 italic"
                          }, "No manager assigned"))
                        ]),
                        createVNode(_component_UiButton, {
                          variant: "secondary",
                          onClick: handleStartEditManager
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Change ")
                          ]),
                          _: 1
                        })
                      ]))
                    ];
                  }),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-base flex items-center gap-2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(UserPlus), { class: "w-4 h-4 text-green-600" }, null, _parent4, _scopeId3));
                          _push4(` Direct Reports (Subordinates) `);
                        } else {
                          return [
                            createVNode(unref(UserPlus), { class: "w-4 h-4 text-green-600" }),
                            createTextVNode(" Direct Reports (Subordinates) ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-base flex items-center gap-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(UserPlus), { class: "w-4 h-4 text-green-600" }),
                          createTextVNode(" Direct Reports (Subordinates) ")
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
                  var _a, _b;
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$5, {
                      employeeId: __props.employeeId,
                      currentSubordinates: ((_a = unref(allEmployees)) == null ? void 0 : _a.filter((e) => String(e.managerId) === String(__props.employeeId))) || [],
                      allEmployees: otherEmployees.value,
                      onSave: saveSubordinates,
                      isSaving: unref(isAssigningSubordinates)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$5, {
                        employeeId: __props.employeeId,
                        currentSubordinates: ((_b = unref(allEmployees)) == null ? void 0 : _b.filter((e) => String(e.managerId) === String(__props.employeeId))) || [],
                        allEmployees: otherEmployees.value,
                        onSave: saveSubordinates,
                        isSaving: unref(isAssigningSubordinates)
                      }, null, 8, ["employeeId", "currentSubordinates", "allEmployees", "isSaving"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, { class: "pb-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, { class: "text-base flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(UserPlus), { class: "w-4 h-4 text-green-600" }),
                        createTextVNode(" Direct Reports (Subordinates) ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => {
                    var _a;
                    return [
                      createVNode(_sfc_main$5, {
                        employeeId: __props.employeeId,
                        currentSubordinates: ((_a = unref(allEmployees)) == null ? void 0 : _a.filter((e) => String(e.managerId) === String(__props.employeeId))) || [],
                        allEmployees: otherEmployees.value,
                        onSave: saveSubordinates,
                        isSaving: unref(isAssigningSubordinates)
                      }, null, 8, ["employeeId", "currentSubordinates", "allEmployees", "isSaving"])
                    ];
                  }),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/employees/HierarchyManager.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const useTenantUrl = () => {
  const route = useRoute();
  const tenantSlug = route.params.tenant_slug;
  return (path) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return tenantSlug ? `/api/${tenantSlug}${cleanPath}` : `/api${cleanPath}`;
  };
};
const useEmployeeSalaryHistory = (employeeId) => {
  const getUrl = useTenantUrl();
  const { data, pending, error, refresh } = useFetch(() => getUrl(`/salaries/employee/${unref(employeeId)}/history`), {
    key: `salary-history-${unref(employeeId)}`,
    immediate: !!unref(employeeId)
  }, "$2Uc16ObuBf");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "EmployeeSalaryAdjustmentHistory",
  __ssrInlineRender: true,
  props: {
    employeeId: {},
    currentBaseSalary: {}
  },
  setup(__props) {
    const props = __props;
    const { data: salaryHistory, loading } = useEmployeeSalaryHistory(props.employeeId);
    const salaries = computed(() => salaryHistory.value || []);
    const currentSalary = computed(() => salaries.value.find((s) => s.isActive));
    const historicalSalaries = computed(
      () => salaries.value.filter((s) => !s.isActive).sort((a, b) => new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime())
    );
    const formatCurrency = (amount) => {
      const num = typeof amount === "string" ? parseFloat(amount) : amount;
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(num);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };
    const calculateTotalSalary = (baseSalary, allowances) => {
      return parseFloat(baseSalary) + parseFloat(allowances);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      if (currentSalary.value) {
        _push(`<div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg"><div class="flex items-center justify-between mb-4"><div><p class="text-white/80 text-sm font-medium mb-1">Current Base Salary</p><p class="text-4xl font-bold">${ssrInterpolate(formatCurrency(currentSalary.value.baseSalary))}</p>`);
        if (parseFloat(currentSalary.value.allowances) > 0) {
          _push(`<p class="text-white/90 text-sm mt-2"> + Allowances: ${ssrInterpolate(formatCurrency(currentSalary.value.allowances))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="text-white text-lg font-semibold mt-2"> Total: ${ssrInterpolate(formatCurrency(calculateTotalSalary(currentSalary.value.baseSalary, currentSalary.value.allowances)))}</p></div><div class="bg-white/20 p-3 rounded-lg backdrop-blur-sm">`);
        _push(ssrRenderComponent(unref(Wallet), { class: "w-10 h-10 text-white" }, null, _parent));
        _push(`</div></div><div class="flex items-center justify-between text-sm"><div class="flex items-center gap-2 text-white/80">`);
        _push(ssrRenderComponent(unref(Calendar), { class: "w-4 h-4" }, null, _parent));
        _push(`<span>Effective since ${ssrInterpolate(formatDate(currentSalary.value.effectiveDate))}</span></div>`);
        if (currentSalary.value.grade) {
          _push(`<div class="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">`);
          _push(ssrRenderComponent(unref(Award), { class: "w-4 h-4" }, null, _parent));
          _push(`<span class="font-medium">${ssrInterpolate(currentSalary.value.grade)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"><div class="px-6 py-5 border-b border-gray-200 bg-gray-50"><div class="flex items-center justify-between"><div><h3 class="text-lg font-medium leading-6 text-gray-900 flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(History), { class: "w-5 h-5" }, null, _parent));
      _push(` Salary History </h3><p class="mt-1 text-sm text-gray-500">Complete history of salary changes</p></div><div class="flex items-center gap-2 text-sm text-gray-500"><span>${ssrInterpolate(salaries.value.length)} total records</span></div></div></div>`);
      if (unref(loading)) {
        _push(`<div class="p-12 text-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy mx-auto"></div><p class="text-gray-500 mt-4">Loading salary history...</p></div>`);
      } else if (salaries.value.length === 0) {
        _push(`<div class="p-12 text-center">`);
        _push(ssrRenderComponent(unref(DollarSign), { class: "w-12 h-12 text-gray-300 mx-auto mb-3" }, null, _parent));
        _push(`<p class="text-gray-500 text-lg">No salary records found</p><p class="text-gray-400 text-sm mt-1">Salary history will appear here once created</p></div>`);
      } else {
        _push(`<div class="p-6"><div class="space-y-4">`);
        if (currentSalary.value) {
          _push(`<div class="relative pl-8 pb-8 border-l-2 border-green-400"><div class="absolute left-[-9px] top-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow"></div><div class="bg-green-50 rounded-lg border-2 border-green-200 p-5"><div class="flex items-start justify-between mb-3"><div><div class="flex items-center gap-2 mb-2"><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"> Current </span>`);
          if (currentSalary.value.grade) {
            _push(`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">${ssrInterpolate(currentSalary.value.grade)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex items-center gap-2 text-sm text-gray-600">`);
          _push(ssrRenderComponent(unref(Calendar), { class: "w-4 h-4" }, null, _parent));
          _push(`<span>Effective: ${ssrInterpolate(formatDate(currentSalary.value.effectiveDate))}</span></div></div></div><div class="grid grid-cols-3 gap-4 mb-3"><div class="bg-white rounded-lg p-3 border border-gray-200"><p class="text-xs text-gray-500 mb-1">Base Salary</p><p class="font-semibold text-gray-900">${ssrInterpolate(formatCurrency(currentSalary.value.baseSalary))}</p></div><div class="bg-white rounded-lg p-3 border border-gray-200"><p class="text-xs text-gray-500 mb-1">Allowances</p><p class="font-semibold text-gray-900">${ssrInterpolate(formatCurrency(currentSalary.value.allowances))}</p></div><div class="bg-white rounded-lg p-3 border border-green-200 bg-green-50"><p class="text-xs text-gray-500 mb-1">Total</p><p class="font-bold text-green-600">${ssrInterpolate(formatCurrency(calculateTotalSalary(currentSalary.value.baseSalary, currentSalary.value.allowances)))}</p></div></div>`);
          if (currentSalary.value.notes) {
            _push(`<div class="bg-white rounded-lg p-3 border border-gray-200"><p class="text-xs text-gray-500 mb-1">Notes</p><p class="text-sm text-gray-700">${ssrInterpolate(currentSalary.value.notes)}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(historicalSalaries.value, (salary, index) => {
          _push(`<div class="relative pl-8 pb-8 border-l-2 border-gray-300 last:border-l-0 last:pb-0"><div class="absolute left-[-9px] top-0 w-4 h-4 bg-gray-400 rounded-full border-2 border-white shadow"></div><div class="bg-gray-50 rounded-lg border-2 border-gray-200 p-5"><div class="flex items-start justify-between mb-3"><div><div class="flex items-center gap-2 mb-2"><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"> Historical </span>`);
          if (salary.grade) {
            _push(`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">${ssrInterpolate(salary.grade)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex items-center gap-2 text-sm text-gray-600">`);
          _push(ssrRenderComponent(unref(Calendar), { class: "w-4 h-4" }, null, _parent));
          _push(`<span>${ssrInterpolate(formatDate(salary.effectiveDate))} ${ssrInterpolate(salary.endDate ? ` - ${formatDate(salary.endDate)}` : "")}</span></div></div></div><div class="grid grid-cols-3 gap-4 mb-3"><div class="bg-white rounded-lg p-3 border border-gray-200"><p class="text-xs text-gray-500 mb-1">Base Salary</p><p class="font-semibold text-gray-900">${ssrInterpolate(formatCurrency(salary.baseSalary))}</p></div><div class="bg-white rounded-lg p-3 border border-gray-200"><p class="text-xs text-gray-500 mb-1">Allowances</p><p class="font-semibold text-gray-900">${ssrInterpolate(formatCurrency(salary.allowances))}</p></div><div class="bg-white rounded-lg p-3 border border-gray-200"><p class="text-xs text-gray-500 mb-1">Total</p><p class="font-semibold text-gray-900">${ssrInterpolate(formatCurrency(calculateTotalSalary(salary.baseSalary, salary.allowances)))}</p></div></div>`);
          if (salary.notes) {
            _push(`<div class="bg-white rounded-lg p-3 border border-gray-200"><p class="text-xs text-gray-500 mb-1">Notes</p><p class="text-sm text-gray-700">${ssrInterpolate(salary.notes)}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/employees/EmployeeSalaryAdjustmentHistory.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const tenantSlug = route.params.tenant_slug;
    const id = route.params.id;
    const { data: employee, loading: isLoadingEmployee, error } = useEmployee(id);
    const { mutate: updateEmployee, loading: updating } = useUpdateEmployee();
    const { data: profile, loading: isLoadingProfile, refresh: refreshProfile } = useEmployeeProfile(id);
    const { mutate: updateProfile, loading: isUpdatingProfile } = useUpdateEmployeeProfile();
    const { mutate: uploadPicture, loading: isUploadingPicture } = useUploadEmployeePicture();
    const { mutate: deletePicture, loading: isDeletingPicture } = useDeleteEmployeePicture();
    const activeTab = ref("details");
    const isEditingProfile = ref(false);
    const form = ref({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      position: "",
      department: "",
      joinDate: "",
      baseSalary: 0
    });
    watch(employee, (emp) => {
      var _a;
      if (emp) {
        form.value = {
          firstName: emp.firstName,
          lastName: emp.lastName,
          email: ((_a = emp.user) == null ? void 0 : _a.email) || "",
          password: "",
          // Don't fill password
          position: emp.position,
          department: emp.department,
          joinDate: emp.joinDate ? emp.joinDate.split("T")[0] : "",
          // Format for date input
          baseSalary: emp.baseSalary
        };
      }
    }, { immediate: true });
    const goBack = () => {
      router.push(`/${tenantSlug}/dashboard/employees`);
    };
    const onSubmitAccount = async () => {
      const payload = { ...form.value };
      if (!payload.password) {
        delete payload.password;
      }
      if (payload.joinDate) {
        payload.joinDate = new Date(payload.joinDate).toISOString();
      }
      try {
        await updateEmployee(id, payload);
        alert("Employee updated successfully");
      } catch (e) {
        console.error(e);
        alert("Failed to update employee");
      }
    };
    const handleUploadPicture = async (file) => {
      try {
        await uploadPicture(id, file);
        await refreshProfile();
        alert("Profile picture uploaded");
      } catch (e) {
        console.error(e);
        alert("Failed to upload profile picture");
      }
    };
    const handleDeletePicture = async () => {
      try {
        await deletePicture(id);
        await refreshProfile();
        alert("Profile picture removed");
      } catch (e) {
        console.error(e);
        alert("Failed to remove profile picture");
      }
    };
    const handleUpdateProfile = async (data) => {
      try {
        await updateProfile(id, data);
        await refreshProfile();
        isEditingProfile.value = false;
        alert("Profile updated successfully");
      } catch (e) {
        console.error(e);
        alert("Failed to update profile");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_UiButton = _sfc_main$6;
      const _component_UiCard = _sfc_main$7;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$8;
      const _component_UiCardContent = _sfc_main$9;
      const _component_UiInput = _sfc_main$a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }, _attrs))}><div class="flex items-center space-x-4">`);
      _push(ssrRenderComponent(_component_UiButton, {
        variant: "ghost",
        onClick: goBack
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
      _push(`<h2 class="text-2xl font-bold text-gray-900">Edit Employee</h2></div><div class="flex gap-4 border-b border-gray-200 overflow-x-auto"><!--[-->`);
      ssrRenderList(["details", "profile", "management", "salary"], (tab) => {
        _push(`<button class="${ssrRenderClass(["px-4 py-2 font-medium text-sm transition-colors border-b-2 whitespace-nowrap capitalize", activeTab.value === tab ? "border-brand-navy text-brand-navy" : "border-transparent text-gray-500 hover:text-gray-700"])}">${ssrInterpolate(tab === "details" ? "Account Settings" : tab === "profile" ? "Profile Information" : tab === "management" ? "Management & Hierarchy" : "Salary & History")}</button>`);
      });
      _push(`<!--]--></div><div class="mt-6">`);
      if (unref(isLoadingEmployee) && !unref(employee)) {
        _push(`<div class="text-center py-12">Loading...</div>`);
      } else if (unref(error) || !unref(employee)) {
        _push(`<div class="text-center py-12 text-red-500">Error loading employee</div>`);
      } else {
        _push(`<div>`);
        if (activeTab.value === "details") {
          _push(ssrRenderComponent(_component_UiCard, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Account Settings`);
                          } else {
                            return [
                              createTextVNode("Account Settings")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UiCardTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Account Settings")
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
                        label: "First Name",
                        modelValue: form.value.firstName,
                        "onUpdate:modelValue": ($event) => form.value.firstName = $event,
                        required: ""
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiInput, {
                        label: "Last Name",
                        modelValue: form.value.lastName,
                        "onUpdate:modelValue": ($event) => form.value.lastName = $event,
                        required: ""
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiInput, {
                        label: "Email Address",
                        type: "email",
                        modelValue: form.value.email,
                        "onUpdate:modelValue": ($event) => form.value.email = $event,
                        required: ""
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiInput, {
                        label: "Password (leave empty to keep current)",
                        type: "password",
                        modelValue: form.value.password,
                        "onUpdate:modelValue": ($event) => form.value.password = $event,
                        placeholder: "Enter new password or leave empty"
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiInput, {
                        label: "Position",
                        modelValue: form.value.position,
                        "onUpdate:modelValue": ($event) => form.value.position = $event,
                        required: ""
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiInput, {
                        label: "Department",
                        modelValue: form.value.department,
                        "onUpdate:modelValue": ($event) => form.value.department = $event,
                        required: ""
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiInput, {
                        label: "Join Date",
                        type: "date",
                        modelValue: form.value.joinDate,
                        "onUpdate:modelValue": ($event) => form.value.joinDate = $event,
                        required: ""
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiInput, {
                        label: "Base Salary",
                        type: "number",
                        modelValue: form.value.baseSalary,
                        "onUpdate:modelValue": ($event) => form.value.baseSalary = $event,
                        required: ""
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><div class="flex justify-end space-x-4"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiButton, {
                        type: "button",
                        variant: "secondary",
                        onClick: goBack
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Cancel `);
                          } else {
                            return [
                              createTextVNode(" Cancel ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiButton, {
                        type: "submit",
                        disabled: unref(updating)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(unref(updating) ? "Saving..." : "Save Changes")}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(unref(updating) ? "Saving..." : "Save Changes"), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div></form>`);
                    } else {
                      return [
                        createVNode("form", {
                          onSubmit: withModifiers(onSubmitAccount, ["prevent"]),
                          class: "space-y-6"
                        }, [
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                            createVNode(_component_UiInput, {
                              label: "First Name",
                              modelValue: form.value.firstName,
                              "onUpdate:modelValue": ($event) => form.value.firstName = $event,
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_UiInput, {
                              label: "Last Name",
                              modelValue: form.value.lastName,
                              "onUpdate:modelValue": ($event) => form.value.lastName = $event,
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_UiInput, {
                              label: "Email Address",
                              type: "email",
                              modelValue: form.value.email,
                              "onUpdate:modelValue": ($event) => form.value.email = $event,
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_UiInput, {
                              label: "Password (leave empty to keep current)",
                              type: "password",
                              modelValue: form.value.password,
                              "onUpdate:modelValue": ($event) => form.value.password = $event,
                              placeholder: "Enter new password or leave empty"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_UiInput, {
                              label: "Position",
                              modelValue: form.value.position,
                              "onUpdate:modelValue": ($event) => form.value.position = $event,
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_UiInput, {
                              label: "Department",
                              modelValue: form.value.department,
                              "onUpdate:modelValue": ($event) => form.value.department = $event,
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_UiInput, {
                              label: "Join Date",
                              type: "date",
                              modelValue: form.value.joinDate,
                              "onUpdate:modelValue": ($event) => form.value.joinDate = $event,
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_UiInput, {
                              label: "Base Salary",
                              type: "number",
                              modelValue: form.value.baseSalary,
                              "onUpdate:modelValue": ($event) => form.value.baseSalary = $event,
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "flex justify-end space-x-4" }, [
                            createVNode(_component_UiButton, {
                              type: "button",
                              variant: "secondary",
                              onClick: goBack
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Cancel ")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiButton, {
                              type: "submit",
                              disabled: unref(updating)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(updating) ? "Saving..." : "Save Changes"), 1)
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
                          createTextVNode("Account Settings")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardContent, null, {
                    default: withCtx(() => [
                      createVNode("form", {
                        onSubmit: withModifiers(onSubmitAccount, ["prevent"]),
                        class: "space-y-6"
                      }, [
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                          createVNode(_component_UiInput, {
                            label: "First Name",
                            modelValue: form.value.firstName,
                            "onUpdate:modelValue": ($event) => form.value.firstName = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_UiInput, {
                            label: "Last Name",
                            modelValue: form.value.lastName,
                            "onUpdate:modelValue": ($event) => form.value.lastName = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_UiInput, {
                            label: "Email Address",
                            type: "email",
                            modelValue: form.value.email,
                            "onUpdate:modelValue": ($event) => form.value.email = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_UiInput, {
                            label: "Password (leave empty to keep current)",
                            type: "password",
                            modelValue: form.value.password,
                            "onUpdate:modelValue": ($event) => form.value.password = $event,
                            placeholder: "Enter new password or leave empty"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_UiInput, {
                            label: "Position",
                            modelValue: form.value.position,
                            "onUpdate:modelValue": ($event) => form.value.position = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_UiInput, {
                            label: "Department",
                            modelValue: form.value.department,
                            "onUpdate:modelValue": ($event) => form.value.department = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_UiInput, {
                            label: "Join Date",
                            type: "date",
                            modelValue: form.value.joinDate,
                            "onUpdate:modelValue": ($event) => form.value.joinDate = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_UiInput, {
                            label: "Base Salary",
                            type: "number",
                            modelValue: form.value.baseSalary,
                            "onUpdate:modelValue": ($event) => form.value.baseSalary = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "flex justify-end space-x-4" }, [
                          createVNode(_component_UiButton, {
                            type: "button",
                            variant: "secondary",
                            onClick: goBack
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Cancel ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiButton, {
                            type: "submit",
                            disabled: unref(updating)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(updating) ? "Saving..." : "Save Changes"), 1)
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
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value === "profile") {
          _push(ssrRenderComponent(_component_UiCard, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-center justify-between" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Extended Profile`);
                          } else {
                            return [
                              createTextVNode("Extended Profile")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      if (!isEditingProfile.value) {
                        _push3(ssrRenderComponent(_component_UiButton, {
                          onClick: ($event) => isEditingProfile.value = true,
                          variant: "secondary",
                          class: "py-1 px-3 h-8 text-xs"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(` Edit Profile `);
                            } else {
                              return [
                                createTextVNode(" Edit Profile ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                    } else {
                      return [
                        createVNode(_component_UiCardTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Extended Profile")
                          ]),
                          _: 1
                        }),
                        !isEditingProfile.value ? (openBlock(), createBlock(_component_UiButton, {
                          key: 0,
                          onClick: ($event) => isEditingProfile.value = true,
                          variant: "secondary",
                          class: "py-1 px-3 h-8 text-xs"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Edit Profile ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])) : createCommentVNode("", true)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UiCardContent, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      if (unref(isLoadingProfile)) {
                        _push3(`<div class="py-12 flex justify-center"${_scopeId2}><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy"${_scopeId2}></div></div>`);
                      } else if (!unref(profile)) {
                        _push3(`<div class="py-12 text-center text-gray-500"${_scopeId2}> Profile not found or could not be loaded. </div>`);
                      } else {
                        _push3(`<div${_scopeId2}><div class="mb-8 flex justify-center pb-6 border-b border-gray-100"${_scopeId2}>`);
                        _push3(ssrRenderComponent(_sfc_main$b, {
                          currentImageUrl: unref(profile).profilePicture || unref(profile).profilePictureUrl,
                          altText: `${unref(profile).firstName} ${unref(profile).lastName}`,
                          onUpload: handleUploadPicture,
                          onDelete: handleDeletePicture,
                          isUploading: unref(isUploadingPicture),
                          isDeleting: unref(isDeletingPicture),
                          canEdit: true,
                          size: "xl"
                        }, null, _parent3, _scopeId2));
                        _push3(`</div>`);
                        if (isEditingProfile.value) {
                          _push3(ssrRenderComponent(_sfc_main$1$2, {
                            initialData: unref(profile),
                            onSubmit: handleUpdateProfile,
                            onCancel: ($event) => isEditingProfile.value = false,
                            isLoading: unref(isUpdatingProfile),
                            isAdmin: true
                          }, null, _parent3, _scopeId2));
                        } else {
                          _push3(ssrRenderComponent(_sfc_main$2$1, { profile: unref(profile) }, null, _parent3, _scopeId2));
                        }
                        _push3(`</div>`);
                      }
                    } else {
                      return [
                        unref(isLoadingProfile) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "py-12 flex justify-center"
                        }, [
                          createVNode("div", { class: "animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy" })
                        ])) : !unref(profile) ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "py-12 text-center text-gray-500"
                        }, " Profile not found or could not be loaded. ")) : (openBlock(), createBlock("div", { key: 2 }, [
                          createVNode("div", { class: "mb-8 flex justify-center pb-6 border-b border-gray-100" }, [
                            createVNode(_sfc_main$b, {
                              currentImageUrl: unref(profile).profilePicture || unref(profile).profilePictureUrl,
                              altText: `${unref(profile).firstName} ${unref(profile).lastName}`,
                              onUpload: handleUploadPicture,
                              onDelete: handleDeletePicture,
                              isUploading: unref(isUploadingPicture),
                              isDeleting: unref(isDeletingPicture),
                              canEdit: true,
                              size: "xl"
                            }, null, 8, ["currentImageUrl", "altText", "isUploading", "isDeleting"])
                          ]),
                          isEditingProfile.value ? (openBlock(), createBlock(_sfc_main$1$2, {
                            key: 0,
                            initialData: unref(profile),
                            onSubmit: handleUpdateProfile,
                            onCancel: ($event) => isEditingProfile.value = false,
                            isLoading: unref(isUpdatingProfile),
                            isAdmin: true
                          }, null, 8, ["initialData", "onCancel", "isLoading"])) : (openBlock(), createBlock(_sfc_main$2$1, {
                            key: 1,
                            profile: unref(profile)
                          }, null, 8, ["profile"]))
                        ]))
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between" }, {
                    default: withCtx(() => [
                      createVNode(_component_UiCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Extended Profile")
                        ]),
                        _: 1
                      }),
                      !isEditingProfile.value ? (openBlock(), createBlock(_component_UiButton, {
                        key: 0,
                        onClick: ($event) => isEditingProfile.value = true,
                        variant: "secondary",
                        class: "py-1 px-3 h-8 text-xs"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Edit Profile ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardContent, null, {
                    default: withCtx(() => [
                      unref(isLoadingProfile) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "py-12 flex justify-center"
                      }, [
                        createVNode("div", { class: "animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy" })
                      ])) : !unref(profile) ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "py-12 text-center text-gray-500"
                      }, " Profile not found or could not be loaded. ")) : (openBlock(), createBlock("div", { key: 2 }, [
                        createVNode("div", { class: "mb-8 flex justify-center pb-6 border-b border-gray-100" }, [
                          createVNode(_sfc_main$b, {
                            currentImageUrl: unref(profile).profilePicture || unref(profile).profilePictureUrl,
                            altText: `${unref(profile).firstName} ${unref(profile).lastName}`,
                            onUpload: handleUploadPicture,
                            onDelete: handleDeletePicture,
                            isUploading: unref(isUploadingPicture),
                            isDeleting: unref(isDeletingPicture),
                            canEdit: true,
                            size: "xl"
                          }, null, 8, ["currentImageUrl", "altText", "isUploading", "isDeleting"])
                        ]),
                        isEditingProfile.value ? (openBlock(), createBlock(_sfc_main$1$2, {
                          key: 0,
                          initialData: unref(profile),
                          onSubmit: handleUpdateProfile,
                          onCancel: ($event) => isEditingProfile.value = false,
                          isLoading: unref(isUpdatingProfile),
                          isAdmin: true
                        }, null, 8, ["initialData", "onCancel", "isLoading"])) : (openBlock(), createBlock(_sfc_main$2$1, {
                          key: 1,
                          profile: unref(profile)
                        }, null, 8, ["profile"]))
                      ]))
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value === "management") {
          _push(`<div>`);
          _push(ssrRenderComponent(_sfc_main$2, { employeeId: unref(id) }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value === "salary") {
          _push(`<div>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            employeeId: unref(id),
            currentBaseSalary: (_a = unref(employee)) == null ? void 0 : _a.baseSalary
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/employees/[id]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DupTBXSg.mjs.map
