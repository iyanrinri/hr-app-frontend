import { _ as __nuxt_component_0 } from "./nuxt-link-DsceMx1n.js";
import { _ as _sfc_main$9 } from "./Button-gKFWS_xI.js";
import { defineComponent, mergeProps, unref, useSSRContext, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, renderSlot, openBlock, ref, computed, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderSlot, ssrRenderComponent } from "vue/server-renderer";
import { X, aq as Filter, b as Calendar, E as Eye, u as useRoute, K as useAuthStore } from "../server.mjs";
import { _ as _sfc_main$5 } from "./Card-CVi1E1xp.js";
import { _ as _sfc_main$6 } from "./CardContent-BE35Q-6Q.js";
import { _ as _sfc_main$8 } from "./Input-CKYYc_rG.js";
import { c as cn } from "./index-B7s_3MI_.js";
import { _ as _sfc_main$a, a as _sfc_main$b } from "./CardTitle-D9AdQELc.js";
import { TransitionRoot, Dialog, TransitionChild, DialogPanel, DialogTitle, DialogDescription } from "@headlessui/vue";
import { e as useAttendanceHistory } from "./useAttendance-DJVfF5IK.js";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/klona/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/hookable/dist/index.mjs";
import { _ as _sfc_main$7 } from "./EmployeeSelector-DR-a5UsR.js";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/destr/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ohash/dist/index.mjs";
import "uuid";
import "clsx";
import "tailwind-merge";
import "./fetch-VuP8VKdC.js";
import "@vue/shared";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/perfect-debounce/dist/index.mjs";
import "./useEmployees-CEaIsP48.js";
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Select",
  __ssrInlineRender: true,
  props: {
    modelValue: { default: "" },
    label: {},
    error: {},
    id: {},
    options: {},
    placeholder: {},
    disabled: { type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}>`);
      if (__props.label) {
        _push(`<label${ssrRenderAttr("for", __props.id)} class="block text-sm font-bold text-gray-900 mb-1">${ssrInterpolate(__props.label)}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative"><select${ssrRenderAttr("id", __props.id)}${ssrRenderAttr("value", __props.modelValue)}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} class="${ssrRenderClass(unref(cn)(
        "block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-base disabled:bg-gray-100 disabled:text-gray-500",
        !__props.modelValue && "text-gray-400",
        __props.error && "border-red-500 focus:border-red-500 focus:ring-red-500",
        _ctx.$attrs.class
      ))}">`);
      if (__props.placeholder) {
        _push(`<option value="" disabled selected>${ssrInterpolate(__props.placeholder)}</option>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(__props.options, (option) => {
        _push(`<option${ssrRenderAttr("value", option.value)} class="text-black">${ssrInterpolate(option.label)}</option>`);
      });
      _push(`<!--]--></select></div>`);
      if (__props.error) {
        _push(`<p class="mt-1 text-sm text-red-600">${ssrInterpolate(__props.error)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/Select.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Badge",
  __ssrInlineRender: true,
  props: {
    variant: { default: "default" },
    class: {}
  },
  setup(__props) {
    const props = __props;
    const variants = {
      default: "bg-brand-navy text-white hover:bg-brand-navy/80",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200/80",
      destructive: "bg-red-100 text-red-700 hover:bg-red-200/80",
      outline: "text-gray-900 border border-gray-200 hover:bg-gray-100",
      success: "bg-green-100 text-green-700 hover:bg-green-200/80",
      warning: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200/80"
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transiton-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          variants[__props.variant],
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/Badge.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Dialog",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    title: {},
    description: {},
    className: {}
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TransitionRoot), mergeProps({
        appear: "",
        show: __props.open,
        as: "template"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Dialog), {
              as: "div",
              onClose: ($event) => _ctx.$emit("close"),
              class: "relative z-50"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="fixed inset-0 bg-black/25"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "fixed inset-0 bg-black/25" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="fixed inset-0 overflow-y-auto"${_scopeId2}><div class="flex min-h-full items-center justify-center p-4 text-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0 scale-95",
                    "enter-to": "opacity-100 scale-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100 scale-100",
                    "leave-to": "opacity-0 scale-95"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DialogPanel), {
                          class: unref(cn)(
                            "w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all",
                            props.className
                          )
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="flex justify-between items-center mb-4"${_scopeId4}>`);
                              if (__props.title) {
                                _push5(ssrRenderComponent(unref(DialogTitle), {
                                  as: "h3",
                                  class: "text-lg font-medium leading-6 text-gray-900"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(__props.title)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(__props.title), 1)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`<button class="text-gray-400 hover:text-gray-500"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(X), { class: "w-5 h-5" }, null, _parent5, _scopeId4));
                              _push5(`</button></div>`);
                              if (__props.description) {
                                _push5(ssrRenderComponent(unref(DialogDescription), { class: "mt-2 text-sm text-gray-500 mb-4" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(__props.description)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(__props.description), 1)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push5, _parent5, _scopeId4);
                            } else {
                              return [
                                createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                                  __props.title ? (openBlock(), createBlock(unref(DialogTitle), {
                                    key: 0,
                                    as: "h3",
                                    class: "text-lg font-medium leading-6 text-gray-900"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(__props.title), 1)
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true),
                                  createVNode("button", {
                                    onClick: ($event) => _ctx.$emit("close"),
                                    class: "text-gray-400 hover:text-gray-500"
                                  }, [
                                    createVNode(unref(X), { class: "w-5 h-5" })
                                  ], 8, ["onClick"])
                                ]),
                                __props.description ? (openBlock(), createBlock(unref(DialogDescription), {
                                  key: 0,
                                  class: "mt-2 text-sm text-gray-500 mb-4"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(__props.description), 1)
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                renderSlot(_ctx.$slots, "default")
                              ];
                            }
                          }),
                          _: 3
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DialogPanel), {
                            class: unref(cn)(
                              "w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all",
                              props.className
                            )
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                                __props.title ? (openBlock(), createBlock(unref(DialogTitle), {
                                  key: 0,
                                  as: "h3",
                                  class: "text-lg font-medium leading-6 text-gray-900"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(__props.title), 1)
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                createVNode("button", {
                                  onClick: ($event) => _ctx.$emit("close"),
                                  class: "text-gray-400 hover:text-gray-500"
                                }, [
                                  createVNode(unref(X), { class: "w-5 h-5" })
                                ], 8, ["onClick"])
                              ]),
                              __props.description ? (openBlock(), createBlock(unref(DialogDescription), {
                                key: 0,
                                class: "mt-2 text-sm text-gray-500 mb-4"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(__props.description), 1)
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              renderSlot(_ctx.$slots, "default")
                            ]),
                            _: 3
                          }, 8, ["class"])
                        ];
                      }
                    }),
                    _: 3
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode(unref(TransitionChild), {
                      as: "template",
                      enter: "duration-300 ease-out",
                      "enter-from": "opacity-0",
                      "enter-to": "opacity-100",
                      leave: "duration-200 ease-in",
                      "leave-from": "opacity-100",
                      "leave-to": "opacity-0"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "fixed inset-0 bg-black/25" })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "fixed inset-0 overflow-y-auto" }, [
                      createVNode("div", { class: "flex min-h-full items-center justify-center p-4 text-center" }, [
                        createVNode(unref(TransitionChild), {
                          as: "template",
                          enter: "duration-300 ease-out",
                          "enter-from": "opacity-0 scale-95",
                          "enter-to": "opacity-100 scale-100",
                          leave: "duration-200 ease-in",
                          "leave-from": "opacity-100 scale-100",
                          "leave-to": "opacity-0 scale-95"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(DialogPanel), {
                              class: unref(cn)(
                                "w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all",
                                props.className
                              )
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                                  __props.title ? (openBlock(), createBlock(unref(DialogTitle), {
                                    key: 0,
                                    as: "h3",
                                    class: "text-lg font-medium leading-6 text-gray-900"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(__props.title), 1)
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true),
                                  createVNode("button", {
                                    onClick: ($event) => _ctx.$emit("close"),
                                    class: "text-gray-400 hover:text-gray-500"
                                  }, [
                                    createVNode(unref(X), { class: "w-5 h-5" })
                                  ], 8, ["onClick"])
                                ]),
                                __props.description ? (openBlock(), createBlock(unref(DialogDescription), {
                                  key: 0,
                                  class: "mt-2 text-sm text-gray-500 mb-4"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(__props.description), 1)
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                renderSlot(_ctx.$slots, "default")
                              ]),
                              _: 3
                            }, 8, ["class"])
                          ]),
                          _: 3
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Dialog), {
                as: "div",
                onClose: ($event) => _ctx.$emit("close"),
                class: "relative z-50"
              }, {
                default: withCtx(() => [
                  createVNode(unref(TransitionChild), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "fixed inset-0 bg-black/25" })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "fixed inset-0 overflow-y-auto" }, [
                    createVNode("div", { class: "flex min-h-full items-center justify-center p-4 text-center" }, [
                      createVNode(unref(TransitionChild), {
                        as: "template",
                        enter: "duration-300 ease-out",
                        "enter-from": "opacity-0 scale-95",
                        "enter-to": "opacity-100 scale-100",
                        leave: "duration-200 ease-in",
                        "leave-from": "opacity-100 scale-100",
                        "leave-to": "opacity-0 scale-95"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(DialogPanel), {
                            class: unref(cn)(
                              "w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all",
                              props.className
                            )
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                                __props.title ? (openBlock(), createBlock(unref(DialogTitle), {
                                  key: 0,
                                  as: "h3",
                                  class: "text-lg font-medium leading-6 text-gray-900"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(__props.title), 1)
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                createVNode("button", {
                                  onClick: ($event) => _ctx.$emit("close"),
                                  class: "text-gray-400 hover:text-gray-500"
                                }, [
                                  createVNode(unref(X), { class: "w-5 h-5" })
                                ], 8, ["onClick"])
                              ]),
                              __props.description ? (openBlock(), createBlock(unref(DialogDescription), {
                                key: 0,
                                class: "mt-2 text-sm text-gray-500 mb-4"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(__props.description), 1)
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              renderSlot(_ctx.$slots, "default")
                            ]),
                            _: 3
                          }, 8, ["class"])
                        ]),
                        _: 3
                      })
                    ])
                  ])
                ]),
                _: 3
              }, 8, ["onClose"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/Dialog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AttendanceHistory",
  __ssrInlineRender: true,
  props: {
    isAdmin: { type: Boolean }
  },
  setup(__props) {
    const filters = ref({
      startDate: "",
      endDate: "",
      status: "",
      employeeId: ""
    });
    const appliedFilters = ref({
      startDate: "",
      endDate: "",
      status: "",
      employeeId: ""
    });
    const page = ref(1);
    const limit = ref(10);
    const { data: response, loading } = useAttendanceHistory(page, limit, {
      startDate: computed(() => appliedFilters.value.startDate),
      endDate: computed(() => appliedFilters.value.endDate),
      status: computed(() => appliedFilters.value.status),
      employeeId: computed(() => appliedFilters.value.employeeId)
    });
    const attendanceRecords = computed(() => response.value?.data || []);
    const totalPages = computed(() => response.value?.meta?.totalPages || 0);
    const applyFilters = () => {
      appliedFilters.value = { ...filters.value };
      page.value = 1;
    };
    const resetFilters = () => {
      filters.value = {
        startDate: "",
        endDate: "",
        status: "",
        employeeId: ""
      };
      appliedFilters.value = { ...filters.value };
      page.value = 1;
    };
    const getStatusBadgeVariant = (status) => {
      switch (status) {
        case "PRESENT":
          return "success";
        case "LATE":
          return "warning";
        case "ABSENT":
          return "destructive";
        case "EXCUSED":
          return "default";
        default:
          return "secondary";
      }
    };
    const formatTime = (dateString) => {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    };
    const viewAttendance = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$5;
      const _component_UiCardContent = _sfc_main$6;
      const _component_UiInput = _sfc_main$8;
      const _component_UiSelect = _sfc_main$4;
      const _component_UiButton = _sfc_main$9;
      const _component_UiCardHeader = _sfc_main$a;
      const _component_UiCardTitle = _sfc_main$b;
      const _component_UiBadge = _sfc_main$3;
      const _component_UiDialog = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "pt-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-4"${_scopeId2}>`);
                  if (__props.isAdmin) {
                    _push3(ssrRenderComponent(_sfc_main$7, {
                      modelValue: filters.value.employeeId,
                      "onUpdate:modelValue": ($event) => filters.value.employeeId = $event,
                      class: "max-w-md"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiInput, {
                    label: "Start Date",
                    type: "date",
                    modelValue: filters.value.startDate,
                    "onUpdate:modelValue": ($event) => filters.value.startDate = $event
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    label: "End Date",
                    type: "date",
                    modelValue: filters.value.endDate,
                    "onUpdate:modelValue": ($event) => filters.value.endDate = $event
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiSelect, {
                    label: "Status",
                    modelValue: filters.value.status,
                    "onUpdate:modelValue": ($event) => filters.value.status = $event,
                    options: [
                      { label: "All Status", value: "" },
                      { label: "Present", value: "PRESENT" },
                      { label: "Late", value: "LATE" },
                      { label: "Absent", value: "ABSENT" },
                      { label: "Excused", value: "EXCUSED" }
                    ]
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="flex items-end gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiButton, {
                    onClick: applyFilters,
                    class: "flex-1"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Filter), { class: "w-4 h-4 mr-2" }, null, _parent4, _scopeId3));
                        _push4(` Apply `);
                      } else {
                        return [
                          createVNode(unref(Filter), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Apply ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiButton, {
                    variant: "secondary",
                    onClick: resetFilters,
                    class: "flex-1"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Reset `);
                      } else {
                        return [
                          createTextVNode(" Reset ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-4" }, [
                      __props.isAdmin ? (openBlock(), createBlock(_sfc_main$7, {
                        key: 0,
                        modelValue: filters.value.employeeId,
                        "onUpdate:modelValue": ($event) => filters.value.employeeId = $event,
                        class: "max-w-md"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" }, [
                        createVNode(_component_UiInput, {
                          label: "Start Date",
                          type: "date",
                          modelValue: filters.value.startDate,
                          "onUpdate:modelValue": ($event) => filters.value.startDate = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UiInput, {
                          label: "End Date",
                          type: "date",
                          modelValue: filters.value.endDate,
                          "onUpdate:modelValue": ($event) => filters.value.endDate = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UiSelect, {
                          label: "Status",
                          modelValue: filters.value.status,
                          "onUpdate:modelValue": ($event) => filters.value.status = $event,
                          options: [
                            { label: "All Status", value: "" },
                            { label: "Present", value: "PRESENT" },
                            { label: "Late", value: "LATE" },
                            { label: "Absent", value: "ABSENT" },
                            { label: "Excused", value: "EXCUSED" }
                          ]
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "flex items-end gap-2" }, [
                          createVNode(_component_UiButton, {
                            onClick: applyFilters,
                            class: "flex-1"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Filter), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Apply ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiButton, {
                            variant: "secondary",
                            onClick: resetFilters,
                            class: "flex-1"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Reset ")
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardContent, { class: "pt-6" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-4" }, [
                    __props.isAdmin ? (openBlock(), createBlock(_sfc_main$7, {
                      key: 0,
                      modelValue: filters.value.employeeId,
                      "onUpdate:modelValue": ($event) => filters.value.employeeId = $event,
                      class: "max-w-md"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" }, [
                      createVNode(_component_UiInput, {
                        label: "Start Date",
                        type: "date",
                        modelValue: filters.value.startDate,
                        "onUpdate:modelValue": ($event) => filters.value.startDate = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_UiInput, {
                        label: "End Date",
                        type: "date",
                        modelValue: filters.value.endDate,
                        "onUpdate:modelValue": ($event) => filters.value.endDate = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_UiSelect, {
                        label: "Status",
                        modelValue: filters.value.status,
                        "onUpdate:modelValue": ($event) => filters.value.status = $event,
                        options: [
                          { label: "All Status", value: "" },
                          { label: "Present", value: "PRESENT" },
                          { label: "Late", value: "LATE" },
                          { label: "Absent", value: "ABSENT" },
                          { label: "Excused", value: "EXCUSED" }
                        ]
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("div", { class: "flex items-end gap-2" }, [
                        createVNode(_component_UiButton, {
                          onClick: applyFilters,
                          class: "flex-1"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Filter), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Apply ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiButton, {
                          variant: "secondary",
                          onClick: resetFilters,
                          class: "flex-1"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Reset ")
                          ]),
                          _: 1
                        })
                      ])
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
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Attendance Records`);
                      } else {
                        return [
                          createTextVNode("Attendance Records")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Attendance Records")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "overflow-x-auto" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(loading)) {
                    _push3(`<div class="flex justify-center py-12"${_scopeId2}><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy"${_scopeId2}></div></div>`);
                  } else {
                    _push3(`<table class="min-w-full divide-y divide-gray-200"${_scopeId2}><thead class="bg-gray-50"${_scopeId2}><tr${_scopeId2}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Date</th>`);
                    if (__props.isAdmin) {
                      _push3(`<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Employee</th>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Clock In</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Clock Out</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Total Hours</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Status</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Actions</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId2}>`);
                    if (attendanceRecords.value.length === 0) {
                      _push3(`<tr${_scopeId2}><td${ssrRenderAttr("colspan", __props.isAdmin ? 7 : 6)} class="px-6 py-8 text-center text-gray-500"${_scopeId2}> No attendance records found </td></tr>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<!--[-->`);
                    ssrRenderList(attendanceRecords.value, (record) => {
                      _push3(`<tr class="hover:bg-gray-50"${_scopeId2}><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId2}><div class="flex items-center"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Calendar), { class: "w-4 h-4 mr-2 text-gray-400" }, null, _parent3, _scopeId2));
                      _push3(` ${ssrInterpolate(formatDate(record.date))}</div></td>`);
                      if (__props.isAdmin) {
                        _push3(`<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId2}>${ssrInterpolate(record.employee?.firstName)} ${ssrInterpolate(record.employee?.lastName)}</td>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId2}>${ssrInterpolate(formatTime(record.checkIn))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId2}>${ssrInterpolate(formatTime(record.checkOut))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId2}>${ssrInterpolate(record.workDuration ? (record.workDuration / 60).toFixed(1) + "h" : "-")}</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiBadge, {
                        variant: getStatusBadgeVariant(record.status)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(record.status)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(record.status), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiButton, {
                        variant: "secondary",
                        class: "p-2 h-8 w-8",
                        onClick: ($event) => viewAttendance.value = record
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(Eye), { class: "w-4 h-4" }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(Eye), { class: "w-4 h-4" })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</td></tr>`);
                    });
                    _push3(`<!--]--></tbody></table>`);
                  }
                  if (totalPages.value > 1) {
                    _push3(`<div class="mt-4 flex justify-between items-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiButton, {
                      disabled: page.value <= 1,
                      onClick: ($event) => page.value--,
                      variant: "secondary"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Previous`);
                        } else {
                          return [
                            createTextVNode("Previous")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<span class="text-sm text-gray-600"${_scopeId2}>Page ${ssrInterpolate(page.value)} of ${ssrInterpolate(totalPages.value)}</span>`);
                    _push3(ssrRenderComponent(_component_UiButton, {
                      disabled: page.value >= totalPages.value,
                      onClick: ($event) => page.value++,
                      variant: "secondary"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Next`);
                        } else {
                          return [
                            createTextVNode("Next")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    unref(loading) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex justify-center py-12"
                    }, [
                      createVNode("div", { class: "animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy" })
                    ])) : (openBlock(), createBlock("table", {
                      key: 1,
                      class: "min-w-full divide-y divide-gray-200"
                    }, [
                      createVNode("thead", { class: "bg-gray-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Date"),
                          __props.isAdmin ? (openBlock(), createBlock("th", {
                            key: 0,
                            class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                          }, "Employee")) : createCommentVNode("", true),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Clock In"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Clock Out"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Total Hours"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Status"),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase" }, "Actions")
                        ])
                      ]),
                      createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                        attendanceRecords.value.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: __props.isAdmin ? 7 : 6,
                            class: "px-6 py-8 text-center text-gray-500"
                          }, " No attendance records found ", 8, ["colspan"])
                        ])) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(attendanceRecords.value, (record) => {
                          return openBlock(), createBlock("tr", {
                            key: record.id,
                            class: "hover:bg-gray-50"
                          }, [
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, [
                              createVNode("div", { class: "flex items-center" }, [
                                createVNode(unref(Calendar), { class: "w-4 h-4 mr-2 text-gray-400" }),
                                createTextVNode(" " + toDisplayString(formatDate(record.date)), 1)
                              ])
                            ]),
                            __props.isAdmin ? (openBlock(), createBlock("td", {
                              key: 0,
                              class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                            }, toDisplayString(record.employee?.firstName) + " " + toDisplayString(record.employee?.lastName), 1)) : createCommentVNode("", true),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(formatTime(record.checkIn)), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(formatTime(record.checkOut)), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(record.workDuration ? (record.workDuration / 60).toFixed(1) + "h" : "-"), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode(_component_UiBadge, {
                                variant: getStatusBadgeVariant(record.status)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(record.status), 1)
                                ]),
                                _: 2
                              }, 1032, ["variant"])
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                              createVNode(_component_UiButton, {
                                variant: "secondary",
                                class: "p-2 h-8 w-8",
                                onClick: ($event) => viewAttendance.value = record
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Eye), { class: "w-4 h-4" })
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])),
                    totalPages.value > 1 ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "mt-4 flex justify-between items-center"
                    }, [
                      createVNode(_component_UiButton, {
                        disabled: page.value <= 1,
                        onClick: ($event) => page.value--,
                        variant: "secondary"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Previous")
                        ]),
                        _: 1
                      }, 8, ["disabled", "onClick"]),
                      createVNode("span", { class: "text-sm text-gray-600" }, "Page " + toDisplayString(page.value) + " of " + toDisplayString(totalPages.value), 1),
                      createVNode(_component_UiButton, {
                        disabled: page.value >= totalPages.value,
                        onClick: ($event) => page.value++,
                        variant: "secondary"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Next")
                        ]),
                        _: 1
                      }, 8, ["disabled", "onClick"])
                    ])) : createCommentVNode("", true)
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
                      createTextVNode("Attendance Records")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, { class: "overflow-x-auto" }, {
                default: withCtx(() => [
                  unref(loading) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex justify-center py-12"
                  }, [
                    createVNode("div", { class: "animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy" })
                  ])) : (openBlock(), createBlock("table", {
                    key: 1,
                    class: "min-w-full divide-y divide-gray-200"
                  }, [
                    createVNode("thead", { class: "bg-gray-50" }, [
                      createVNode("tr", null, [
                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Date"),
                        __props.isAdmin ? (openBlock(), createBlock("th", {
                          key: 0,
                          class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        }, "Employee")) : createCommentVNode("", true),
                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Clock In"),
                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Clock Out"),
                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Total Hours"),
                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Status"),
                        createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase" }, "Actions")
                      ])
                    ]),
                    createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                      attendanceRecords.value.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                        createVNode("td", {
                          colspan: __props.isAdmin ? 7 : 6,
                          class: "px-6 py-8 text-center text-gray-500"
                        }, " No attendance records found ", 8, ["colspan"])
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(attendanceRecords.value, (record) => {
                        return openBlock(), createBlock("tr", {
                          key: record.id,
                          class: "hover:bg-gray-50"
                        }, [
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode(unref(Calendar), { class: "w-4 h-4 mr-2 text-gray-400" }),
                              createTextVNode(" " + toDisplayString(formatDate(record.date)), 1)
                            ])
                          ]),
                          __props.isAdmin ? (openBlock(), createBlock("td", {
                            key: 0,
                            class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                          }, toDisplayString(record.employee?.firstName) + " " + toDisplayString(record.employee?.lastName), 1)) : createCommentVNode("", true),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(formatTime(record.checkIn)), 1),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(formatTime(record.checkOut)), 1),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(record.workDuration ? (record.workDuration / 60).toFixed(1) + "h" : "-"), 1),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                            createVNode(_component_UiBadge, {
                              variant: getStatusBadgeVariant(record.status)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(record.status), 1)
                              ]),
                              _: 2
                            }, 1032, ["variant"])
                          ]),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                            createVNode(_component_UiButton, {
                              variant: "secondary",
                              class: "p-2 h-8 w-8",
                              onClick: ($event) => viewAttendance.value = record
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Eye), { class: "w-4 h-4" })
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ])
                        ]);
                      }), 128))
                    ])
                  ])),
                  totalPages.value > 1 ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "mt-4 flex justify-between items-center"
                  }, [
                    createVNode(_component_UiButton, {
                      disabled: page.value <= 1,
                      onClick: ($event) => page.value--,
                      variant: "secondary"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Previous")
                      ]),
                      _: 1
                    }, 8, ["disabled", "onClick"]),
                    createVNode("span", { class: "text-sm text-gray-600" }, "Page " + toDisplayString(page.value) + " of " + toDisplayString(totalPages.value), 1),
                    createVNode(_component_UiButton, {
                      disabled: page.value >= totalPages.value,
                      onClick: ($event) => page.value++,
                      variant: "secondary"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Next")
                      ]),
                      _: 1
                    }, 8, ["disabled", "onClick"])
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiDialog, {
        open: !!viewAttendance.value,
        onClose: ($event) => viewAttendance.value = null,
        title: "Attendance Details"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (viewAttendance.value) {
              _push2(`<div class="space-y-4"${_scopeId}>`);
              if (viewAttendance.value.employee) {
                _push2(`<div class="bg-gray-50 p-3 rounded-lg text-sm mb-4"${_scopeId}><p class="font-bold text-gray-900"${_scopeId}>${ssrInterpolate(viewAttendance.value.employee.firstName)} ${ssrInterpolate(viewAttendance.value.employee.lastName)}</p><p class="text-gray-500"${_scopeId}>${ssrInterpolate(viewAttendance.value.employee.position)} - ${ssrInterpolate(viewAttendance.value.employee.department)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="grid grid-cols-2 gap-4 text-sm"${_scopeId}><div${_scopeId}><p class="text-gray-500 font-medium"${_scopeId}>Date</p><p${_scopeId}>${ssrInterpolate(formatDate(viewAttendance.value.date))}</p></div><div${_scopeId}><p class="text-gray-500 font-medium"${_scopeId}>Status</p>`);
              _push2(ssrRenderComponent(_component_UiBadge, {
                variant: getStatusBadgeVariant(viewAttendance.value.status)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(viewAttendance.value.status)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(viewAttendance.value.status), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div${_scopeId}><p class="text-gray-500 font-medium"${_scopeId}>Check In</p><p${_scopeId}>${ssrInterpolate(formatTime(viewAttendance.value.checkIn))}</p></div><div${_scopeId}><p class="text-gray-500 font-medium"${_scopeId}>Check Out</p><p${_scopeId}>${ssrInterpolate(formatTime(viewAttendance.value.checkOut))}</p></div>`);
              if (viewAttendance.value.notes) {
                _push2(`<div class="col-span-2"${_scopeId}><p class="text-gray-500 font-medium"${_scopeId}>Notes</p><p class="bg-gray-50 p-2 rounded border border-gray-100 mt-1"${_scopeId}>${ssrInterpolate(viewAttendance.value.notes)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mt-6 flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UiButton, {
              variant: "secondary",
              onClick: ($event) => viewAttendance.value = null
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Close`);
                } else {
                  return [
                    createTextVNode("Close")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              viewAttendance.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "space-y-4"
              }, [
                viewAttendance.value.employee ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "bg-gray-50 p-3 rounded-lg text-sm mb-4"
                }, [
                  createVNode("p", { class: "font-bold text-gray-900" }, toDisplayString(viewAttendance.value.employee.firstName) + " " + toDisplayString(viewAttendance.value.employee.lastName), 1),
                  createVNode("p", { class: "text-gray-500" }, toDisplayString(viewAttendance.value.employee.position) + " - " + toDisplayString(viewAttendance.value.employee.department), 1)
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "grid grid-cols-2 gap-4 text-sm" }, [
                  createVNode("div", null, [
                    createVNode("p", { class: "text-gray-500 font-medium" }, "Date"),
                    createVNode("p", null, toDisplayString(formatDate(viewAttendance.value.date)), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-gray-500 font-medium" }, "Status"),
                    createVNode(_component_UiBadge, {
                      variant: getStatusBadgeVariant(viewAttendance.value.status)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(viewAttendance.value.status), 1)
                      ]),
                      _: 1
                    }, 8, ["variant"])
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-gray-500 font-medium" }, "Check In"),
                    createVNode("p", null, toDisplayString(formatTime(viewAttendance.value.checkIn)), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-gray-500 font-medium" }, "Check Out"),
                    createVNode("p", null, toDisplayString(formatTime(viewAttendance.value.checkOut)), 1)
                  ]),
                  viewAttendance.value.notes ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "col-span-2"
                  }, [
                    createVNode("p", { class: "text-gray-500 font-medium" }, "Notes"),
                    createVNode("p", { class: "bg-gray-50 p-2 rounded border border-gray-100 mt-1" }, toDisplayString(viewAttendance.value.notes), 1)
                  ])) : createCommentVNode("", true)
                ])
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "mt-6 flex justify-end" }, [
                createVNode(_component_UiButton, {
                  variant: "secondary",
                  onClick: ($event) => viewAttendance.value = null
                }, {
                  default: withCtx(() => [
                    createTextVNode("Close")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/attendance/AttendanceHistory.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const authStore = useAuthStore();
    const tenantSlug = route.params.tenant_slug;
    const isAdmin = computed(() => ["ADMIN", "HR", "SUPER"].includes(authStore.user?.role || ""));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UiButton = _sfc_main$9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex justify-between items-center"><h2 class="text-2xl font-bold text-gray-900">Attendance History</h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/${unref(tenantSlug)}/dashboard/attendance`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, { variant: "secondary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Back to Attendance`);
                } else {
                  return [
                    createTextVNode("Back to Attendance")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiButton, { variant: "secondary" }, {
                default: withCtx(() => [
                  createTextVNode("Back to Attendance")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$1, { isAdmin: unref(isAdmin) }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/attendance/history/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-iMlPAiUl.js.map
