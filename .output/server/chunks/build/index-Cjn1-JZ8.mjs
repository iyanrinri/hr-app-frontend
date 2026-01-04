import { _ as _sfc_main$2 } from './Button-DjJ57WMA.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-BACLTvko.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$3 } from './CardContent-BenvirN4.mjs';
import { _ as _sfc_main$1$2, a as _sfc_main$4 } from './CardTitle--sGWBRLF.mjs';
import { defineComponent, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { d as useTodayAttendanceDashboard } from './useAttendance-CQNHNk3m.mjs';
import { u as useNotificationStore } from './notifications-CP0wUJbA.mjs';
import { u as useRoute, b as Calendar, R as RefreshCw, a as Users, g as UserCheck, i as UserX, l as Clock, j as Bell, k as BellOff } from './server.mjs';
import './index-H80jjgLf.mjs';
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
import '@vue/shared';
import './ssr-BF3tP62J.mjs';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "NotificationPermissionButton",
  __ssrInlineRender: true,
  setup(__props) {
    const permission = ref("default");
    const requestPermission = async () => {
      if ("Notification" in void 0) {
        const result = await Notification.requestPermission();
        permission.value = result;
        if (result === "granted") {
          new Notification("Notifications Enabled! \u{1F389}", {
            body: "You will now receive attendance updates",
            icon: "/favicon.ico"
          });
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$2;
      if (permission.value === "granted") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-2 text-sm text-green-600" }, _attrs))}>`);
        _push(ssrRenderComponent(unref(Bell), { class: "w-4 h-4" }, null, _parent));
        _push(`<span>Notifications enabled</span></div>`);
      } else if (permission.value === "denied") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-2 text-sm text-red-600" }, _attrs))}>`);
        _push(ssrRenderComponent(unref(BellOff), { class: "w-4 h-4" }, null, _parent));
        _push(`<span>Notifications blocked</span></div>`);
      } else {
        _push(ssrRenderComponent(_component_UiButton, mergeProps({
          onClick: requestPermission,
          variant: "secondary",
          class: "text-sm"
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Bell), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Enable Notifications `);
            } else {
              return [
                createVNode(unref(Bell), { class: "w-4 h-4 mr-2" }),
                createTextVNode(" Enable Notifications ")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/notifications/NotificationPermissionButton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const tenantSlug = route.params.tenant_slug;
    const notificationStore = useNotificationStore();
    const { data: dashboard, loading, refresh } = useTodayAttendanceDashboard();
    watch(() => notificationStore.dashboardUpdateTrigger, (newVal) => {
      if (newVal > 0) {
        console.log("\u{1F504} [AUTO-REFRESH] Dashboard refreshing due to dashboard-update event");
        refresh();
      }
    });
    watch(() => notificationStore.notifications, (newVal) => {
      if (newVal.length > 0) {
        refresh();
      }
    }, { deep: true });
    const formatTime = (dateObj) => {
      if (!dateObj) return "-";
      try {
        const date = new Date(dateObj);
        return date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        });
      } catch {
        return "-";
      }
    };
    const getStatusBadge = (status) => {
      const badges = {
        PRESENT: "bg-green-100 text-green-800",
        LATE: "bg-yellow-100 text-yellow-800",
        ABSENT: "bg-red-100 text-red-800",
        EXCUSED: "bg-blue-100 text-blue-800"
      };
      return badges[status || ""] || "bg-gray-100 text-gray-800";
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UiCard = _sfc_main$1$1;
      const _component_UiCardContent = _sfc_main$3;
      const _component_UiCardHeader = _sfc_main$1$2;
      const _component_UiCardTitle = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      if (unref(loading) && !unref(dashboard)) {
        _push(`<div class="flex flex-col items-center justify-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy mb-4"></div><p class="text-gray-600">Loading today&#39;s attendance...</p></div>`);
      } else if (!unref(dashboard)) {
        _push(`<div class="text-center py-12 text-gray-500"> No attendance data available for today </div>`);
      } else {
        _push(`<div class="space-y-6"><div class="flex justify-between items-center"><div><h2 class="text-2xl font-bold text-gray-900">Today&#39;s Attendance Dashboard</h2><div class="flex items-center gap-4 mt-2"><div class="flex items-center text-sm text-gray-600">`);
        _push(ssrRenderComponent(unref(Calendar), { class: "w-4 h-4 mr-2" }, null, _parent));
        _push(` ${ssrInterpolate(formatDate(unref(dashboard).date))}</div><div class="flex items-center text-sm"><div class="${ssrRenderClass([unref(notificationStore).isConnected ? "bg-green-500" : "bg-red-500", "w-2 h-2 rounded-full mr-2"])}"></div> ${ssrInterpolate(unref(notificationStore).isConnected ? "Live Updates Active" : "Disconnected")}</div>`);
        _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
        _push(`</div></div><div class="flex gap-2">`);
        _push(ssrRenderComponent(_component_UiButton, {
          onClick: unref(refresh),
          variant: "secondary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(RefreshCw), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Refresh `);
            } else {
              return [
                createVNode(unref(RefreshCw), { class: "w-4 h-4 mr-2" }),
                createTextVNode(" Refresh ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(tenantSlug) ? `/${unref(tenantSlug)}/dashboard/attendance/history` : "/dashboard/attendance/history"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiButton, { variant: "secondary" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`View History`);
                  } else {
                    return [
                      createTextVNode("View History")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiButton, { variant: "secondary" }, {
                  default: withCtx(() => [
                    createTextVNode("View History")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div class="grid grid-cols-1 md:grid-cols-4 gap-4">`);
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "pt-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center justify-between"${_scopeId2}><div${_scopeId2}><p class="text-sm text-gray-600 mb-1"${_scopeId2}>Total Employees</p><p class="text-3xl font-bold text-gray-900"${_scopeId2}>${ssrInterpolate(unref(dashboard).summary.totalEmployees)}</p></div>`);
                    _push3(ssrRenderComponent(unref(Users), { class: "w-10 h-10 text-gray-400" }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-gray-600 mb-1" }, "Total Employees"),
                          createVNode("p", { class: "text-3xl font-bold text-gray-900" }, toDisplayString(unref(dashboard).summary.totalEmployees), 1)
                        ]),
                        createVNode(unref(Users), { class: "w-10 h-10 text-gray-400" })
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
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm text-gray-600 mb-1" }, "Total Employees"),
                        createVNode("p", { class: "text-3xl font-bold text-gray-900" }, toDisplayString(unref(dashboard).summary.totalEmployees), 1)
                      ]),
                      createVNode(unref(Users), { class: "w-10 h-10 text-gray-400" })
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
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "pt-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center justify-between"${_scopeId2}><div${_scopeId2}><p class="text-sm text-gray-600 mb-1"${_scopeId2}>Present</p><p class="text-3xl font-bold text-green-600"${_scopeId2}>${ssrInterpolate(unref(dashboard).summary.totalPresent)}</p><p class="text-xs text-gray-500 mt-1"${_scopeId2}>${ssrInterpolate(unref(dashboard).summary.attendanceRate.toFixed(0))}% rate</p></div>`);
                    _push3(ssrRenderComponent(unref(UserCheck), { class: "w-10 h-10 text-green-400" }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-gray-600 mb-1" }, "Present"),
                          createVNode("p", { class: "text-3xl font-bold text-green-600" }, toDisplayString(unref(dashboard).summary.totalPresent), 1),
                          createVNode("p", { class: "text-xs text-gray-500 mt-1" }, toDisplayString(unref(dashboard).summary.attendanceRate.toFixed(0)) + "% rate", 1)
                        ]),
                        createVNode(unref(UserCheck), { class: "w-10 h-10 text-green-400" })
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
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm text-gray-600 mb-1" }, "Present"),
                        createVNode("p", { class: "text-3xl font-bold text-green-600" }, toDisplayString(unref(dashboard).summary.totalPresent), 1),
                        createVNode("p", { class: "text-xs text-gray-500 mt-1" }, toDisplayString(unref(dashboard).summary.attendanceRate.toFixed(0)) + "% rate", 1)
                      ]),
                      createVNode(unref(UserCheck), { class: "w-10 h-10 text-green-400" })
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
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "pt-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center justify-between"${_scopeId2}><div${_scopeId2}><p class="text-sm text-gray-600 mb-1"${_scopeId2}>Absent</p><p class="text-3xl font-bold text-red-600"${_scopeId2}>${ssrInterpolate(unref(dashboard).summary.totalAbsent)}</p></div>`);
                    _push3(ssrRenderComponent(unref(UserX), { class: "w-10 h-10 text-red-400" }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-gray-600 mb-1" }, "Absent"),
                          createVNode("p", { class: "text-3xl font-bold text-red-600" }, toDisplayString(unref(dashboard).summary.totalAbsent), 1)
                        ]),
                        createVNode(unref(UserX), { class: "w-10 h-10 text-red-400" })
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
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm text-gray-600 mb-1" }, "Absent"),
                        createVNode("p", { class: "text-3xl font-bold text-red-600" }, toDisplayString(unref(dashboard).summary.totalAbsent), 1)
                      ]),
                      createVNode(unref(UserX), { class: "w-10 h-10 text-red-400" })
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
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "pt-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center justify-between"${_scopeId2}><div${_scopeId2}><p class="text-sm text-gray-600 mb-1"${_scopeId2}>Late</p><p class="text-3xl font-bold text-yellow-600"${_scopeId2}>${ssrInterpolate(unref(dashboard).summary.totalLate)}</p><p class="text-xs text-gray-500 mt-1"${_scopeId2}>${ssrInterpolate(unref(dashboard).summary.lateRate.toFixed(0))}% rate</p></div>`);
                    _push3(ssrRenderComponent(unref(Clock), { class: "w-10 h-10 text-yellow-400" }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-gray-600 mb-1" }, "Late"),
                          createVNode("p", { class: "text-3xl font-bold text-yellow-600" }, toDisplayString(unref(dashboard).summary.totalLate), 1),
                          createVNode("p", { class: "text-xs text-gray-500 mt-1" }, toDisplayString(unref(dashboard).summary.lateRate.toFixed(0)) + "% rate", 1)
                        ]),
                        createVNode(unref(Clock), { class: "w-10 h-10 text-yellow-400" })
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
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm text-gray-600 mb-1" }, "Late"),
                        createVNode("p", { class: "text-3xl font-bold text-yellow-600" }, toDisplayString(unref(dashboard).summary.totalLate), 1),
                        createVNode("p", { class: "text-xs text-gray-500 mt-1" }, toDisplayString(unref(dashboard).summary.lateRate.toFixed(0)) + "% rate", 1)
                      ]),
                      createVNode(unref(Clock), { class: "w-10 h-10 text-yellow-400" })
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
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "pt-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center justify-between"${_scopeId2}><div${_scopeId2}><p class="text-sm text-gray-600"${_scopeId2}>Attendance Period</p><p class="text-lg font-bold text-gray-900"${_scopeId2}>${ssrInterpolate(unref(dashboard).attendancePeriod.name)}</p></div><div class="text-right"${_scopeId2}><p class="text-sm text-gray-600"${_scopeId2}>Working Hours</p><p class="text-lg font-bold text-gray-900"${_scopeId2}>${ssrInterpolate(unref(dashboard).attendancePeriod.workingStartTime)} - ${ssrInterpolate(unref(dashboard).attendancePeriod.workingEndTime)}</p><p class="text-xs text-gray-500 mt-1"${_scopeId2}> Tolerance: ${ssrInterpolate(unref(dashboard).attendancePeriod.toleranceMinutes)} minutes </p></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-gray-600" }, "Attendance Period"),
                          createVNode("p", { class: "text-lg font-bold text-gray-900" }, toDisplayString(unref(dashboard).attendancePeriod.name), 1)
                        ]),
                        createVNode("div", { class: "text-right" }, [
                          createVNode("p", { class: "text-sm text-gray-600" }, "Working Hours"),
                          createVNode("p", { class: "text-lg font-bold text-gray-900" }, toDisplayString(unref(dashboard).attendancePeriod.workingStartTime) + " - " + toDisplayString(unref(dashboard).attendancePeriod.workingEndTime), 1),
                          createVNode("p", { class: "text-xs text-gray-500 mt-1" }, " Tolerance: " + toDisplayString(unref(dashboard).attendancePeriod.toleranceMinutes) + " minutes ", 1)
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
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm text-gray-600" }, "Attendance Period"),
                        createVNode("p", { class: "text-lg font-bold text-gray-900" }, toDisplayString(unref(dashboard).attendancePeriod.name), 1)
                      ]),
                      createVNode("div", { class: "text-right" }, [
                        createVNode("p", { class: "text-sm text-gray-600" }, "Working Hours"),
                        createVNode("p", { class: "text-lg font-bold text-gray-900" }, toDisplayString(unref(dashboard).attendancePeriod.workingStartTime) + " - " + toDisplayString(unref(dashboard).attendancePeriod.workingEndTime), 1),
                        createVNode("p", { class: "text-xs text-gray-500 mt-1" }, " Tolerance: " + toDisplayString(unref(dashboard).attendancePeriod.toleranceMinutes) + " minutes ", 1)
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
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "flex items-center" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(UserCheck), { class: "w-5 h-5 mr-2 text-green-600" }, null, _parent4, _scopeId3));
                          _push4(` Present Employees (${ssrInterpolate(unref(dashboard).presentEmployees.length)}) `);
                        } else {
                          return [
                            createVNode(unref(UserCheck), { class: "w-5 h-5 mr-2 text-green-600" }),
                            createTextVNode(" Present Employees (" + toDisplayString(unref(dashboard).presentEmployees.length) + ") ", 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "flex items-center" }, {
                        default: withCtx(() => [
                          createVNode(unref(UserCheck), { class: "w-5 h-5 mr-2 text-green-600" }),
                          createTextVNode(" Present Employees (" + toDisplayString(unref(dashboard).presentEmployees.length) + ") ", 1)
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
                    if (unref(dashboard).presentEmployees.length > 0) {
                      _push3(`<div class="overflow-x-auto"${_scopeId2}><table class="min-w-full divide-y divide-gray-200"${_scopeId2}><thead class="bg-gray-50"${_scopeId2}><tr${_scopeId2}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Employee</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Department</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Position</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Check In</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Check Out</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Duration</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Status</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId2}><!--[-->`);
                      ssrRenderList(unref(dashboard).presentEmployees, (employee) => {
                        _push3(`<tr class="hover:bg-gray-50"${_scopeId2}><td class="px-6 py-4 whitespace-nowrap"${_scopeId2}><div${_scopeId2}><p class="text-sm font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(employee.firstName)} ${ssrInterpolate(employee.lastName)}</p><p class="text-sm text-gray-500"${_scopeId2}>${ssrInterpolate(employee.email)}</p></div></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId2}>${ssrInterpolate(employee.department)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId2}>${ssrInterpolate(employee.position)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId2}>${ssrInterpolate(formatTime(employee.checkIn))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId2}>${ssrInterpolate(formatTime(employee.checkOut))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId2}>${ssrInterpolate(employee.workDuration ? `${(employee.workDuration / 60).toFixed(1)}h` : "-")}</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId2}><div class="flex flex-col gap-1"${_scopeId2}><span class="${ssrRenderClass([getStatusBadge(employee.status), "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"])}"${_scopeId2}>${ssrInterpolate(employee.status)}</span>`);
                        if (employee.isLate) {
                          _push3(`<span class="text-xs text-yellow-600"${_scopeId2}> Late by ${ssrInterpolate(employee.minutesLate)} min </span>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div></td></tr>`);
                      });
                      _push3(`<!--]--></tbody></table></div>`);
                    } else {
                      _push3(`<p class="text-center text-gray-500 py-4"${_scopeId2}>No employees present yet</p>`);
                    }
                  } else {
                    return [
                      unref(dashboard).presentEmployees.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "overflow-x-auto"
                      }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Employee"),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Department"),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Position"),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Check In"),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Check Out"),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Duration"),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Status")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(dashboard).presentEmployees, (employee) => {
                              return openBlock(), createBlock("tr", {
                                key: employee.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", null, [
                                    createVNode("p", { class: "text-sm font-medium text-gray-900" }, toDisplayString(employee.firstName) + " " + toDisplayString(employee.lastName), 1),
                                    createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(employee.email), 1)
                                  ])
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(employee.department), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(employee.position), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(formatTime(employee.checkIn)), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(formatTime(employee.checkOut)), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(employee.workDuration ? `${(employee.workDuration / 60).toFixed(1)}h` : "-"), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "flex flex-col gap-1" }, [
                                    createVNode("span", {
                                      class: ["inline-flex items-center px-3 py-1 rounded-full text-xs font-medium", getStatusBadge(employee.status)]
                                    }, toDisplayString(employee.status), 3),
                                    employee.isLate ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "text-xs text-yellow-600"
                                    }, " Late by " + toDisplayString(employee.minutesLate) + " min ", 1)) : createCommentVNode("", true)
                                  ])
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ])) : (openBlock(), createBlock("p", {
                        key: 1,
                        class: "text-center text-gray-500 py-4"
                      }, "No employees present yet"))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, null, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, { class: "flex items-center" }, {
                      default: withCtx(() => [
                        createVNode(unref(UserCheck), { class: "w-5 h-5 mr-2 text-green-600" }),
                        createTextVNode(" Present Employees (" + toDisplayString(unref(dashboard).presentEmployees.length) + ") ", 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    unref(dashboard).presentEmployees.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "overflow-x-auto"
                    }, [
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                        createVNode("thead", { class: "bg-gray-50" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Employee"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Department"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Position"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Check In"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Check Out"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Duration"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Status")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(dashboard).presentEmployees, (employee) => {
                            return openBlock(), createBlock("tr", {
                              key: employee.id,
                              class: "hover:bg-gray-50"
                            }, [
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", null, [
                                  createVNode("p", { class: "text-sm font-medium text-gray-900" }, toDisplayString(employee.firstName) + " " + toDisplayString(employee.lastName), 1),
                                  createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(employee.email), 1)
                                ])
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(employee.department), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(employee.position), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(formatTime(employee.checkIn)), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(formatTime(employee.checkOut)), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(employee.workDuration ? `${(employee.workDuration / 60).toFixed(1)}h` : "-"), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", { class: "flex flex-col gap-1" }, [
                                  createVNode("span", {
                                    class: ["inline-flex items-center px-3 py-1 rounded-full text-xs font-medium", getStatusBadge(employee.status)]
                                  }, toDisplayString(employee.status), 3),
                                  employee.isLate ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "text-xs text-yellow-600"
                                  }, " Late by " + toDisplayString(employee.minutesLate) + " min ", 1)) : createCommentVNode("", true)
                                ])
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ])) : (openBlock(), createBlock("p", {
                      key: 1,
                      class: "text-center text-gray-500 py-4"
                    }, "No employees present yet"))
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
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "flex items-center" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(UserX), { class: "w-5 h-5 mr-2 text-red-600" }, null, _parent4, _scopeId3));
                          _push4(` Absent Employees (${ssrInterpolate(unref(dashboard).absentEmployees.length)}) `);
                        } else {
                          return [
                            createVNode(unref(UserX), { class: "w-5 h-5 mr-2 text-red-600" }),
                            createTextVNode(" Absent Employees (" + toDisplayString(unref(dashboard).absentEmployees.length) + ") ", 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "flex items-center" }, {
                        default: withCtx(() => [
                          createVNode(unref(UserX), { class: "w-5 h-5 mr-2 text-red-600" }),
                          createTextVNode(" Absent Employees (" + toDisplayString(unref(dashboard).absentEmployees.length) + ") ", 1)
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
                    if (unref(dashboard).absentEmployees.length > 0) {
                      _push3(`<div class="overflow-x-auto"${_scopeId2}><table class="min-w-full divide-y divide-gray-200"${_scopeId2}><thead class="bg-gray-50"${_scopeId2}><tr${_scopeId2}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Employee</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Department</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Position</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId2}><!--[-->`);
                      ssrRenderList(unref(dashboard).absentEmployees, (employee) => {
                        _push3(`<tr class="hover:bg-gray-50"${_scopeId2}><td class="px-6 py-4 whitespace-nowrap"${_scopeId2}><div${_scopeId2}><p class="text-sm font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(employee.firstName)} ${ssrInterpolate(employee.lastName)}</p><p class="text-sm text-gray-500"${_scopeId2}>${ssrInterpolate(employee.email)}</p></div></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId2}>${ssrInterpolate(employee.department)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId2}>${ssrInterpolate(employee.position)}</td></tr>`);
                      });
                      _push3(`<!--]--></tbody></table></div>`);
                    } else {
                      _push3(`<p class="text-center text-gray-500 py-4"${_scopeId2}>All employees are present! \u{1F389}</p>`);
                    }
                  } else {
                    return [
                      unref(dashboard).absentEmployees.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "overflow-x-auto"
                      }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Employee"),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Department"),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Position")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(dashboard).absentEmployees, (employee) => {
                              return openBlock(), createBlock("tr", {
                                key: employee.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", null, [
                                    createVNode("p", { class: "text-sm font-medium text-gray-900" }, toDisplayString(employee.firstName) + " " + toDisplayString(employee.lastName), 1),
                                    createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(employee.email), 1)
                                  ])
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(employee.department), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(employee.position), 1)
                              ]);
                            }), 128))
                          ])
                        ])
                      ])) : (openBlock(), createBlock("p", {
                        key: 1,
                        class: "text-center text-gray-500 py-4"
                      }, "All employees are present! \u{1F389}"))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, null, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, { class: "flex items-center" }, {
                      default: withCtx(() => [
                        createVNode(unref(UserX), { class: "w-5 h-5 mr-2 text-red-600" }),
                        createTextVNode(" Absent Employees (" + toDisplayString(unref(dashboard).absentEmployees.length) + ") ", 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    unref(dashboard).absentEmployees.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "overflow-x-auto"
                    }, [
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                        createVNode("thead", { class: "bg-gray-50" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Employee"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Department"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Position")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(dashboard).absentEmployees, (employee) => {
                            return openBlock(), createBlock("tr", {
                              key: employee.id,
                              class: "hover:bg-gray-50"
                            }, [
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", null, [
                                  createVNode("p", { class: "text-sm font-medium text-gray-900" }, toDisplayString(employee.firstName) + " " + toDisplayString(employee.lastName), 1),
                                  createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(employee.email), 1)
                                ])
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(employee.department), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(employee.position), 1)
                            ]);
                          }), 128))
                        ])
                      ])
                    ])) : (openBlock(), createBlock("p", {
                      key: 1,
                      class: "text-center text-gray-500 py-4"
                    }, "All employees are present! \u{1F389}"))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/attendance/today/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Cjn1-JZ8.mjs.map
