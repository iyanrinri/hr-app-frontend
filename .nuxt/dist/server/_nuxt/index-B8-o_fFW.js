import { _ as __nuxt_component_0 } from "./nuxt-link-BACLTvko.js";
import { _ as _sfc_main$1 } from "./Button-DjJ57WMA.js";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./CardContent-BenvirN4.js";
import { _ as _sfc_main$5 } from "./Input-BiMdQ6SY.js";
import { _ as _sfc_main$6, a as _sfc_main$7 } from "./CardTitle--sGWBRLF.js";
import { defineComponent, computed, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, withDirectives, vModelSelect, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { u as useAuthStore } from "./auth-BV7LzjtB.js";
import { e as useAttendanceHistory } from "./useAttendance-CQNHNk3m.js";
import { _ as _sfc_main$4 } from "./EmployeeSelector-D0f4uo7f.js";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/hookable/dist/index.mjs";
import { u as useRoute, F as Filter, b as Calendar, E as Eye } from "../server.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ufo/dist/index.mjs";
import "./index-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/h3/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/destr/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ohash/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/klona/dist/index.mjs";
import "./ssr-BF3tP62J.js";
import "@vue/shared";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/perfect-debounce/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/unctx/dist/index.mjs";
import "vue-router";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/defu/dist/defu.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const tenantSlug = route.params.tenant_slug;
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);
    const selectedEmployeeId = ref("");
    const startDateInput = ref("");
    const endDateInput = ref("");
    const statusInput = ref("");
    const filters = ref({
      employeeId: "",
      startDate: "",
      endDate: "",
      status: ""
    });
    const handleApplyFilters = () => {
      filters.value = {
        employeeId: selectedEmployeeId.value,
        startDate: startDateInput.value,
        endDate: endDateInput.value,
        status: statusInput.value
      };
    };
    const handleResetFilters = () => {
      selectedEmployeeId.value = "";
      startDateInput.value = "";
      endDateInput.value = "";
      statusInput.value = "";
      filters.value = {
        employeeId: "",
        startDate: "",
        endDate: "",
        status: ""
      };
    };
    const { data: response, loading } = useAttendanceHistory(1, 10, filters.value);
    const viewAttendance = ref(null);
    const getStatusBadge = (status) => {
      const badges = {
        PRESENT: "bg-green-100 text-green-800",
        LATE: "bg-yellow-100 text-yellow-800",
        ABSENT: "bg-red-100 text-red-800",
        EXCUSED: "bg-blue-100 text-blue-800"
      };
      return badges[status || ""] || "bg-gray-100 text-gray-800";
    };
    const formatTime = (dateString) => {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UiButton = _sfc_main$1;
      const _component_UiCard = _sfc_main$2;
      const _component_UiCardContent = _sfc_main$3;
      const _component_UiInput = _sfc_main$5;
      const _component_UiCardHeader = _sfc_main$6;
      const _component_UiCardTitle = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex justify-between items-center"><h2 class="text-2xl font-bold text-gray-900">Attendance History</h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(tenantSlug) ? `/${unref(tenantSlug)}/dashboard/attendance` : "/dashboard/attendance"
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
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "pt-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-4"${_scopeId2}>`);
                  if (user.value?.role === "HR" || user.value?.role === "SUPER" || user.value?.role === "ADMIN") {
                    _push3(ssrRenderComponent(_sfc_main$4, {
                      modelValue: selectedEmployeeId.value,
                      "onUpdate:modelValue": ($event) => selectedEmployeeId.value = $event
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiInput, {
                    label: "Start Date",
                    type: "date",
                    modelValue: startDateInput.value,
                    "onUpdate:modelValue": ($event) => startDateInput.value = $event,
                    class: "bg-white border-gray-600"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    label: "End Date",
                    type: "date",
                    modelValue: endDateInput.value,
                    "onUpdate:modelValue": ($event) => endDateInput.value = $event,
                    class: "bg-white border-gray-600"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div${_scopeId2}><label class="block text-sm font-bold text-gray-900 mb-2"${_scopeId2}>Status</label><div class="relative"${_scopeId2}><select class="w-full appearance-none px-4 py-2 pr-10 border border-gray-600 rounded-md focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan bg-white text-black cursor-pointer"${_scopeId2}><option value=""${ssrIncludeBooleanAttr(Array.isArray(statusInput.value) ? ssrLooseContain(statusInput.value, "") : ssrLooseEqual(statusInput.value, "")) ? " selected" : ""}${_scopeId2}>All Status</option><option value="PRESENT"${ssrIncludeBooleanAttr(Array.isArray(statusInput.value) ? ssrLooseContain(statusInput.value, "PRESENT") : ssrLooseEqual(statusInput.value, "PRESENT")) ? " selected" : ""}${_scopeId2}>Present</option><option value="LATE"${ssrIncludeBooleanAttr(Array.isArray(statusInput.value) ? ssrLooseContain(statusInput.value, "LATE") : ssrLooseEqual(statusInput.value, "LATE")) ? " selected" : ""}${_scopeId2}>Late</option><option value="ABSENT"${ssrIncludeBooleanAttr(Array.isArray(statusInput.value) ? ssrLooseContain(statusInput.value, "ABSENT") : ssrLooseEqual(statusInput.value, "ABSENT")) ? " selected" : ""}${_scopeId2}>Absent</option><option value="EXCUSED"${ssrIncludeBooleanAttr(Array.isArray(statusInput.value) ? ssrLooseContain(statusInput.value, "EXCUSED") : ssrLooseEqual(statusInput.value, "EXCUSED")) ? " selected" : ""}${_scopeId2}>Excused</option></select><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"${_scopeId2}><svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"${_scopeId2}><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"${_scopeId2}></path></svg></div></div></div><div class="flex items-end gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiButton, {
                    onClick: handleApplyFilters,
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
                    onClick: handleResetFilters,
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
                      user.value?.role === "HR" || user.value?.role === "SUPER" || user.value?.role === "ADMIN" ? (openBlock(), createBlock(_sfc_main$4, {
                        key: 0,
                        modelValue: selectedEmployeeId.value,
                        "onUpdate:modelValue": ($event) => selectedEmployeeId.value = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" }, [
                        createVNode(_component_UiInput, {
                          label: "Start Date",
                          type: "date",
                          modelValue: startDateInput.value,
                          "onUpdate:modelValue": ($event) => startDateInput.value = $event,
                          class: "bg-white border-gray-600"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UiInput, {
                          label: "End Date",
                          type: "date",
                          modelValue: endDateInput.value,
                          "onUpdate:modelValue": ($event) => endDateInput.value = $event,
                          class: "bg-white border-gray-600"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-bold text-gray-900 mb-2" }, "Status"),
                          createVNode("div", { class: "relative" }, [
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => statusInput.value = $event,
                              class: "w-full appearance-none px-4 py-2 pr-10 border border-gray-600 rounded-md focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan bg-white text-black cursor-pointer"
                            }, [
                              createVNode("option", { value: "" }, "All Status"),
                              createVNode("option", { value: "PRESENT" }, "Present"),
                              createVNode("option", { value: "LATE" }, "Late"),
                              createVNode("option", { value: "ABSENT" }, "Absent"),
                              createVNode("option", { value: "EXCUSED" }, "Excused")
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, statusInput.value]
                            ]),
                            createVNode("div", { class: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700" }, [
                              (openBlock(), createBlock("svg", {
                                class: "h-4 w-4 fill-current",
                                xmlns: "http://www.w3.org/2000/svg",
                                viewBox: "0 0 20 20"
                              }, [
                                createVNode("path", { d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" })
                              ]))
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "flex items-end gap-2" }, [
                          createVNode(_component_UiButton, {
                            onClick: handleApplyFilters,
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
                            onClick: handleResetFilters,
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
                    user.value?.role === "HR" || user.value?.role === "SUPER" || user.value?.role === "ADMIN" ? (openBlock(), createBlock(_sfc_main$4, {
                      key: 0,
                      modelValue: selectedEmployeeId.value,
                      "onUpdate:modelValue": ($event) => selectedEmployeeId.value = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" }, [
                      createVNode(_component_UiInput, {
                        label: "Start Date",
                        type: "date",
                        modelValue: startDateInput.value,
                        "onUpdate:modelValue": ($event) => startDateInput.value = $event,
                        class: "bg-white border-gray-600"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_UiInput, {
                        label: "End Date",
                        type: "date",
                        modelValue: endDateInput.value,
                        "onUpdate:modelValue": ($event) => endDateInput.value = $event,
                        class: "bg-white border-gray-600"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-bold text-gray-900 mb-2" }, "Status"),
                        createVNode("div", { class: "relative" }, [
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => statusInput.value = $event,
                            class: "w-full appearance-none px-4 py-2 pr-10 border border-gray-600 rounded-md focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan bg-white text-black cursor-pointer"
                          }, [
                            createVNode("option", { value: "" }, "All Status"),
                            createVNode("option", { value: "PRESENT" }, "Present"),
                            createVNode("option", { value: "LATE" }, "Late"),
                            createVNode("option", { value: "ABSENT" }, "Absent"),
                            createVNode("option", { value: "EXCUSED" }, "Excused")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, statusInput.value]
                          ]),
                          createVNode("div", { class: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-4 w-4 fill-current",
                              xmlns: "http://www.w3.org/2000/svg",
                              viewBox: "0 0 20 20"
                            }, [
                              createVNode("path", { d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" })
                            ]))
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "flex items-end gap-2" }, [
                        createVNode(_component_UiButton, {
                          onClick: handleApplyFilters,
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
                          onClick: handleResetFilters,
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
                    _push3(`<div class="flex flex-col items-center justify-center py-12"${_scopeId2}><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy mb-4"${_scopeId2}></div><p class="text-gray-600"${_scopeId2}>Loading attendance history...</p></div>`);
                  } else {
                    _push3(`<table class="min-w-full divide-y divide-gray-200"${_scopeId2}><thead class="bg-gray-50"${_scopeId2}><tr${_scopeId2}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}>Date</th>`);
                    if (user.value?.role === "HR" || user.value?.role === "SUPER" || user.value?.role === "ADMIN") {
                      _push3(`<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}>Employee</th>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}>Clock In</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}>Clock Out</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}>Total Hours</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}>Status</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}>Notes</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}>Actions</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId2}>`);
                    if (!unref(response)?.data || unref(response).data.length === 0) {
                      _push3(`<tr${_scopeId2}><td colspan="8" class="px-6 py-8 text-center text-gray-500"${_scopeId2}> No attendance records found </td></tr>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(response)?.data, (attendance) => {
                      _push3(`<tr class="hover:bg-gray-50"${_scopeId2}><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId2}><div class="flex items-center"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Calendar), { class: "w-4 h-4 mr-2 text-gray-400" }, null, _parent3, _scopeId2));
                      _push3(` ${ssrInterpolate(new Date(attendance.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }))}</div></td>`);
                      if (user.value?.role === "HR" || user.value?.role === "SUPER" || user.value?.role === "ADMIN") {
                        _push3(`<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId2}>${ssrInterpolate(attendance.employee?.firstName)} ${ssrInterpolate(attendance.employee?.lastName)}</td>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId2}>${ssrInterpolate(formatTime(attendance.checkIn))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId2}>${ssrInterpolate(formatTime(attendance.checkOut))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId2}>${ssrInterpolate(attendance.workDuration ? `${(attendance.workDuration / 60).toFixed(1)}h` : "-")}</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId2}><span class="${ssrRenderClass([getStatusBadge(attendance.status), "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"])}"${_scopeId2}>${ssrInterpolate(attendance.status)}</span></td><td class="px-6 py-4 text-sm text-gray-600 max-w-xs truncate"${_scopeId2}>${ssrInterpolate(attendance.notes || "-")}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiButton, {
                        variant: "secondary",
                        class: "p-2",
                        onClick: ($event) => viewAttendance.value = attendance,
                        title: "View Details"
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
                } else {
                  return [
                    unref(loading) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex flex-col items-center justify-center py-12"
                    }, [
                      createVNode("div", { class: "animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy mb-4" }),
                      createVNode("p", { class: "text-gray-600" }, "Loading attendance history...")
                    ])) : (openBlock(), createBlock("table", {
                      key: 1,
                      class: "min-w-full divide-y divide-gray-200"
                    }, [
                      createVNode("thead", { class: "bg-gray-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Date"),
                          user.value?.role === "HR" || user.value?.role === "SUPER" || user.value?.role === "ADMIN" ? (openBlock(), createBlock("th", {
                            key: 0,
                            class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          }, "Employee")) : createCommentVNode("", true),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Clock In"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Clock Out"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Total Hours"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Status"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Notes"),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Actions")
                        ])
                      ]),
                      createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                        !unref(response)?.data || unref(response).data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "8",
                            class: "px-6 py-8 text-center text-gray-500"
                          }, " No attendance records found ")
                        ])) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(response)?.data, (attendance) => {
                          return openBlock(), createBlock("tr", {
                            key: attendance.id,
                            class: "hover:bg-gray-50"
                          }, [
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, [
                              createVNode("div", { class: "flex items-center" }, [
                                createVNode(unref(Calendar), { class: "w-4 h-4 mr-2 text-gray-400" }),
                                createTextVNode(" " + toDisplayString(new Date(attendance.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })), 1)
                              ])
                            ]),
                            user.value?.role === "HR" || user.value?.role === "SUPER" || user.value?.role === "ADMIN" ? (openBlock(), createBlock("td", {
                              key: 0,
                              class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                            }, toDisplayString(attendance.employee?.firstName) + " " + toDisplayString(attendance.employee?.lastName), 1)) : createCommentVNode("", true),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(formatTime(attendance.checkIn)), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(formatTime(attendance.checkOut)), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(attendance.workDuration ? `${(attendance.workDuration / 60).toFixed(1)}h` : "-"), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("span", {
                                class: ["inline-flex items-center px-3 py-1 rounded-full text-xs font-medium", getStatusBadge(attendance.status)]
                              }, toDisplayString(attendance.status), 3)
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-600 max-w-xs truncate" }, toDisplayString(attendance.notes || "-"), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                              createVNode(_component_UiButton, {
                                variant: "secondary",
                                class: "p-2",
                                onClick: ($event) => viewAttendance.value = attendance,
                                title: "View Details"
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
                    ]))
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
                    class: "flex flex-col items-center justify-center py-12"
                  }, [
                    createVNode("div", { class: "animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy mb-4" }),
                    createVNode("p", { class: "text-gray-600" }, "Loading attendance history...")
                  ])) : (openBlock(), createBlock("table", {
                    key: 1,
                    class: "min-w-full divide-y divide-gray-200"
                  }, [
                    createVNode("thead", { class: "bg-gray-50" }, [
                      createVNode("tr", null, [
                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Date"),
                        user.value?.role === "HR" || user.value?.role === "SUPER" || user.value?.role === "ADMIN" ? (openBlock(), createBlock("th", {
                          key: 0,
                          class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        }, "Employee")) : createCommentVNode("", true),
                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Clock In"),
                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Clock Out"),
                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Total Hours"),
                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Status"),
                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Notes"),
                        createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Actions")
                      ])
                    ]),
                    createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                      !unref(response)?.data || unref(response).data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                        createVNode("td", {
                          colspan: "8",
                          class: "px-6 py-8 text-center text-gray-500"
                        }, " No attendance records found ")
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(response)?.data, (attendance) => {
                        return openBlock(), createBlock("tr", {
                          key: attendance.id,
                          class: "hover:bg-gray-50"
                        }, [
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode(unref(Calendar), { class: "w-4 h-4 mr-2 text-gray-400" }),
                              createTextVNode(" " + toDisplayString(new Date(attendance.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })), 1)
                            ])
                          ]),
                          user.value?.role === "HR" || user.value?.role === "SUPER" || user.value?.role === "ADMIN" ? (openBlock(), createBlock("td", {
                            key: 0,
                            class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                          }, toDisplayString(attendance.employee?.firstName) + " " + toDisplayString(attendance.employee?.lastName), 1)) : createCommentVNode("", true),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(formatTime(attendance.checkIn)), 1),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(formatTime(attendance.checkOut)), 1),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(attendance.workDuration ? `${(attendance.workDuration / 60).toFixed(1)}h` : "-"), 1),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                            createVNode("span", {
                              class: ["inline-flex items-center px-3 py-1 rounded-full text-xs font-medium", getStatusBadge(attendance.status)]
                            }, toDisplayString(attendance.status), 3)
                          ]),
                          createVNode("td", { class: "px-6 py-4 text-sm text-gray-600 max-w-xs truncate" }, toDisplayString(attendance.notes || "-"), 1),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                            createVNode(_component_UiButton, {
                              variant: "secondary",
                              class: "p-2",
                              onClick: ($event) => viewAttendance.value = attendance,
                              title: "View Details"
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
                  ]))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (viewAttendance.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"><div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"><div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between"><h3 class="text-xl font-bold text-gray-900">Attendance Details</h3><button class="p-2 hover:bg-gray-100 rounded-full transition-colors"><svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="p-6 space-y-6">`);
        if (viewAttendance.value.employee) {
          _push(`<div class="bg-gray-50 p-4 rounded-lg"><h4 class="font-bold text-gray-900 mb-2">Employee Information</h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"><div><p class="text-gray-600">Name</p><p class="font-medium text-gray-900">${ssrInterpolate(viewAttendance.value.employee.firstName)} ${ssrInterpolate(viewAttendance.value.employee.lastName)}</p></div><div><p class="text-gray-600">Email</p><p class="font-medium text-gray-900">${ssrInterpolate(viewAttendance.value.employee.user.email)}</p></div><div><p class="text-gray-600">Position</p><p class="font-medium text-gray-900">${ssrInterpolate(viewAttendance.value.employee.position)}</p></div><div><p class="text-gray-600">Department</p><p class="font-medium text-gray-900">${ssrInterpolate(viewAttendance.value.employee.department)}</p></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-bold text-gray-700 mb-1">Date</label><p class="text-gray-900">${ssrInterpolate(formatDate(viewAttendance.value.date))}</p></div><div><label class="block text-sm font-bold text-gray-700 mb-1">Status</label><span class="${ssrRenderClass([getStatusBadge(viewAttendance.value.status), "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"])}">${ssrInterpolate(viewAttendance.value.status)}</span></div><div><label class="block text-sm font-bold text-gray-700 mb-1">Check In</label><p class="text-gray-900">${ssrInterpolate(formatTime(viewAttendance.value.checkIn))}</p></div><div><label class="block text-sm font-bold text-gray-700 mb-1">Check Out</label><p class="text-gray-900">${ssrInterpolate(formatTime(viewAttendance.value.checkOut))}</p></div><div><label class="block text-sm font-bold text-gray-700 mb-1">Work Duration</label><p class="text-gray-900">${ssrInterpolate(viewAttendance.value.workDuration ? `${(viewAttendance.value.workDuration / 60).toFixed(1)} hours` : "-")}</p></div><div><label class="block text-sm font-bold text-gray-700 mb-1">Period</label><p class="text-gray-900">${ssrInterpolate(viewAttendance.value.attendancePeriod?.name || "-")}</p></div>`);
        if (viewAttendance.value.notes) {
          _push(`<div class="md:col-span-2"><label class="block text-sm font-bold text-gray-700 mb-1">Notes</label><p class="text-gray-900">${ssrInterpolate(viewAttendance.value.notes)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (viewAttendance.value.checkInLocation || viewAttendance.value.checkOutLocation) {
          _push(`<div class="bg-gray-50 border border-gray-200 rounded p-4 text-center"><p class="text-sm text-gray-500">Map view is not available yet.</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200">`);
        _push(ssrRenderComponent(_component_UiButton, {
          onClick: ($event) => viewAttendance.value = null,
          variant: "secondary",
          class: "w-full"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Close `);
            } else {
              return [
                createTextVNode(" Close ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
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
//# sourceMappingURL=index-B8-o_fFW.js.map
