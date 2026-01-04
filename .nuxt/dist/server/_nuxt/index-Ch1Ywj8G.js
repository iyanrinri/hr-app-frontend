import { _ as _sfc_main$2, a as _sfc_main$3 } from "./CardContent-BenvirN4.js";
import { _ as _sfc_main$5 } from "./Button-DjJ57WMA.js";
import { _ as __nuxt_component_0 } from "./nuxt-link-BACLTvko.js";
import { defineComponent, ref, mergeProps, useSSRContext, computed, unref, withCtx, createVNode, createBlock, openBlock, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderClass } from "vue/server-renderer";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { u as useAuthStore } from "./auth-BV7LzjtB.js";
import { u as useTodayAttendance, a as useClockIn, b as useClockOut, c as useAttendanceStats } from "./useAttendance-CQNHNk3m.js";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/hookable/dist/index.mjs";
import { u as useRoute, b as Calendar, c as Timer, d as LogIn, e as LogOut, f as MapPin, g as UserCheck, h as TriangleAlert, i as UserX } from "../server.mjs";
import { _ as _sfc_main$4 } from "./EmployeeSelector-D0f4uo7f.js";
import "./index-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ufo/dist/index.mjs";
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
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DigitalClock",
  __ssrInlineRender: true,
  setup(__props) {
    const time = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "font-mono text-3xl md:text-4xl font-bold tracking-wider text-brand-navy" }, _attrs))}>`);
      if (time.value) {
        _push(`<span>${ssrInterpolate(time.value.toLocaleTimeString("en-US", { hour12: false }))}</span>`);
      } else {
        _push(`<span>--:--:--</span>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/attendance/DigitalClock.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const tenantSlug = route.params.tenant_slug;
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);
    const selectedEmployeeId = ref("");
    const notes = ref("");
    const isGettingLocation = ref(false);
    const { data: todayAttendance, loading: loadingToday, refresh: refreshToday } = useTodayAttendance();
    const { mutate: clockIn, loading: clockingIn } = useClockIn();
    const { mutate: clockOut, loading: clockingOut } = useClockOut();
    const currentDate = /* @__PURE__ */ new Date();
    const startDate = format(startOfMonth(currentDate), "yyyy-MM-dd");
    const endDate = format(endOfMonth(currentDate), "yyyy-MM-dd");
    const { data: stats, refresh: refreshStats } = useAttendanceStats(startDate, endDate, selectedEmployeeId);
    const getLocation = () => {
      return new Promise((resolve, reject) => {
        if (!(void 0).geolocation) {
          reject(new Error("Geolocation is not supported by your browser"));
          return;
        }
        isGettingLocation.value = true;
        (void 0).geolocation.getCurrentPosition(
          (position) => {
            isGettingLocation.value = false;
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            isGettingLocation.value = false;
            reject(error);
          }
        );
      });
    };
    const handleClockIn = async () => {
      try {
        const location = await getLocation();
        await clockIn({
          ...location,
          notes: notes.value || void 0
        });
        notes.value = "";
        refreshToday();
        refreshStats();
      } catch (error) {
        alert("Please enable location access to clock in");
        console.error(error);
      }
    };
    const handleClockOut = async () => {
      try {
        const location = await getLocation();
        await clockOut({
          ...location,
          notes: notes.value || void 0
        });
        notes.value = "";
        refreshToday();
        refreshStats();
      } catch (error) {
        alert("Please enable location access to clock out");
        console.error(error);
      }
    };
    const formatTime = (dateString) => {
      if (!dateString) return "--:--";
      return new Date(dateString).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
    };
    const getStatusColor = (status) => {
      const colors = {
        PRESENT: "text-green-600 bg-green-50 ring-green-500/20",
        LATE: "text-yellow-600 bg-yellow-50 ring-yellow-500/20",
        ABSENT: "text-red-600 bg-red-50 ring-red-500/20",
        EXCUSED: "text-blue-600 bg-blue-50 ring-blue-500/20"
      };
      return colors[status || ""] || "text-gray-600 bg-gray-50 ring-gray-500/20";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$2;
      const _component_UiCardContent = _sfc_main$3;
      const _component_UiButton = _sfc_main$5;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }, _attrs))}><div class="flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-gray-100 pb-6"><div><h2 class="text-2xl font-bold text-gray-900">My Attendance</h2><p class="flex items-center text-gray-500 mt-1">`);
      _push(ssrRenderComponent(unref(Calendar), { class: "w-4 h-4 mr-2" }, null, _parent));
      _push(` ${ssrInterpolate(unref(format)(/* @__PURE__ */ new Date(), "EEEE, d MMMM yyyy"))}</p></div><div class="flex flex-col items-end"><div class="text-xs text-gray-400 uppercase font-medium mb-1">Current Time</div>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div></div>`);
      if (user.value?.role === "HR" || user.value?.role === "SUPER" || user.value?.role === "ADMIN") {
        _push(ssrRenderComponent(_component_UiCard, { class: "border-none shadow-sm bg-gray-50" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "pt-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$4, {
                      modelValue: selectedEmployeeId.value,
                      "onUpdate:modelValue": ($event) => selectedEmployeeId.value = $event
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$4, {
                        modelValue: selectedEmployeeId.value,
                        "onUpdate:modelValue": ($event) => selectedEmployeeId.value = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardContent, { class: "pt-6" }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$4, {
                      modelValue: selectedEmployeeId.value,
                      "onUpdate:modelValue": ($event) => selectedEmployeeId.value = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
      _push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2 space-y-6"><div class="bg-white rounded-2xl shadow-xl shadow-brand-navy/5 overflow-hidden border border-gray-100"><div class="p-8"><div class="flex justify-between items-start mb-8"><div><div class="flex items-center gap-2 mb-2">`);
      _push(ssrRenderComponent(unref(Calendar), { class: "w-5 h-5 text-gray-400" }, null, _parent));
      _push(`<h3 class="text-lg font-medium text-gray-500">Today&#39;s Status</h3></div>`);
      if (unref(loadingToday)) {
        _push(`<div class="h-8 w-32 bg-gray-100 rounded animate-pulse mt-2"></div>`);
      } else {
        _push(`<div class="${ssrRenderClass([getStatusColor(unref(todayAttendance)?.status), "inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold mt-2 ring-1 ring-inset"])}">${ssrInterpolate(unref(todayAttendance)?.status || "NOT STARTED")}</div>`);
      }
      _push(`</div>`);
      if (unref(todayAttendance)?.workDuration) {
        _push(`<div class="text-right"><div class="flex items-center justify-end gap-2 mb-2">`);
        _push(ssrRenderComponent(unref(Timer), { class: "w-5 h-5 text-gray-400" }, null, _parent));
        _push(`<p class="text-sm text-gray-500">Duration</p></div><p class="text-3xl font-bold text-brand-navy">${ssrInterpolate((unref(todayAttendance).workDuration / 60).toFixed(1))}<span class="text-sm font-normal text-gray-400 ml-1">hrs</span></p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grid grid-cols-2 gap-8 mb-8"><div><div class="flex items-center text-gray-400 mb-2">`);
      _push(ssrRenderComponent(unref(LogIn), { class: "w-4 h-4 mr-2" }, null, _parent));
      _push(`<span class="text-xs font-medium uppercase tracking-wider">Clock In</span></div><div class="text-2xl font-mono text-gray-900">${ssrInterpolate(unref(loadingToday) ? "..." : formatTime(unref(todayAttendance)?.checkIn))}</div></div><div><div class="flex items-center text-gray-400 mb-2">`);
      _push(ssrRenderComponent(unref(LogOut), { class: "w-4 h-4 mr-2" }, null, _parent));
      _push(`<span class="text-xs font-medium uppercase tracking-wider">Clock Out</span></div><div class="text-2xl font-mono text-gray-900">${ssrInterpolate(unref(loadingToday) ? "..." : formatTime(unref(todayAttendance)?.checkOut))}</div></div></div><div class="mb-6"><textarea placeholder="Add notes for your attendance (optional)..." class="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-navy/20 resize-none transition-all placeholder:text-gray-400 outline-none" rows="2">${ssrInterpolate(notes.value)}</textarea></div><div class="grid grid-cols-2 gap-4">`);
      _push(ssrRenderComponent(_component_UiButton, {
        onClick: handleClockIn,
        disabled: unref(clockingIn) || isGettingLocation.value || !!unref(todayAttendance)?.checkIn,
        class: ["h-14 text-lg font-bold shadow-lg shadow-blue-500/20 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 border-0 text-white", !!unref(todayAttendance)?.checkIn ? "opacity-50 grayscale" : ""]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isGettingLocation.value) {
              _push2(`<span class="flex items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(MapPin), { class: "w-5 h-5 mr-2 animate-pulse" }, null, _parent2, _scopeId));
              _push2(` Locating... </span>`);
            } else {
              _push2(`<span class="flex items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(LogIn), { class: "w-5 h-5 mr-2" }, null, _parent2, _scopeId));
              _push2(` Clock In </span>`);
            }
          } else {
            return [
              isGettingLocation.value ? (openBlock(), createBlock("span", {
                key: 0,
                class: "flex items-center"
              }, [
                createVNode(unref(MapPin), { class: "w-5 h-5 mr-2 animate-pulse" }),
                createTextVNode(" Locating... ")
              ])) : (openBlock(), createBlock("span", {
                key: 1,
                class: "flex items-center"
              }, [
                createVNode(unref(LogIn), { class: "w-5 h-5 mr-2" }),
                createTextVNode(" Clock In ")
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiButton, {
        onClick: handleClockOut,
        disabled: unref(clockingOut) || isGettingLocation.value || !unref(todayAttendance)?.checkIn,
        class: ["h-14 text-lg font-bold shadow-lg shadow-orange-500/20 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0", !unref(todayAttendance)?.checkIn ? "opacity-50 grayscale" : ""]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isGettingLocation.value) {
              _push2(`<span class="flex items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(MapPin), { class: "w-5 h-5 mr-2 animate-pulse" }, null, _parent2, _scopeId));
              _push2(` Locating... </span>`);
            } else {
              _push2(`<span class="flex items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(LogOut), { class: "w-5 h-5 mr-2" }, null, _parent2, _scopeId));
              _push2(` Clock Out </span>`);
            }
          } else {
            return [
              isGettingLocation.value ? (openBlock(), createBlock("span", {
                key: 0,
                class: "flex items-center"
              }, [
                createVNode(unref(MapPin), { class: "w-5 h-5 mr-2 animate-pulse" }),
                createTextVNode(" Locating... ")
              ])) : (openBlock(), createBlock("span", {
                key: 1,
                class: "flex items-center"
              }, [
                createVNode(unref(LogOut), { class: "w-5 h-5 mr-2" }),
                createTextVNode(" Clock Out ")
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mt-4 flex items-center justify-center text-xs text-gray-400">`);
      _push(ssrRenderComponent(unref(MapPin), { class: "w-3 h-3 mr-1" }, null, _parent));
      _push(` Your location is recorded securely </div></div></div></div><div class="space-y-6"><div class="flex items-center justify-between"><h3 class="font-bold text-gray-900">Month Summary</h3>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(tenantSlug) ? `/${unref(tenantSlug)}/dashboard/attendance/history` : "/dashboard/attendance/history",
        class: "text-xs font-medium text-brand-navy hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View History `);
          } else {
            return [
              createTextVNode(" View History ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-1 gap-4"><div class="p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 relative overflow-hidden"><div class="absolute right-0 top-0 p-3 opacity-10">`);
      _push(ssrRenderComponent(unref(UserCheck), { class: "w-16 h-16 text-emerald-600" }, null, _parent));
      _push(`</div><p class="text-emerald-600 font-medium text-sm">Present</p><p class="text-3xl font-bold text-emerald-700 mt-1">${ssrInterpolate(unref(stats)?.statusCounts?.PRESENT || 0)}<span class="text-sm font-normal text-emerald-600/60 ml-1">days</span></p></div><div class="p-5 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100 relative overflow-hidden"><div class="absolute right-0 top-0 p-3 opacity-10">`);
      _push(ssrRenderComponent(unref(TriangleAlert), { class: "w-16 h-16 text-amber-600" }, null, _parent));
      _push(`</div><p class="text-amber-600 font-medium text-sm">Late</p><p class="text-3xl font-bold text-amber-700 mt-1">${ssrInterpolate(unref(stats)?.statusCounts?.LATE || 0)}<span class="text-sm font-normal text-amber-600/60 ml-1">days</span></p></div><div class="p-5 rounded-xl bg-gradient-to-br from-rose-50 to-red-50 border border-rose-100 relative overflow-hidden"><div class="absolute right-0 top-0 p-3 opacity-10">`);
      _push(ssrRenderComponent(unref(UserX), { class: "w-16 h-16 text-rose-600" }, null, _parent));
      _push(`</div><p class="text-rose-600 font-medium text-sm">Absent</p><p class="text-3xl font-bold text-rose-700 mt-1">${ssrInterpolate(unref(stats)?.statusCounts?.ABSENT || 0)}<span class="text-sm font-normal text-rose-600/60 ml-1">days</span></p></div><div class="p-5 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 relative overflow-hidden"><div class="absolute right-0 top-0 p-3 opacity-10">`);
      _push(ssrRenderComponent(unref(Timer), { class: "w-16 h-16 text-indigo-600" }, null, _parent));
      _push(`</div><p class="text-indigo-600 font-medium text-sm">Avg Hours/Day</p><p class="text-3xl font-bold text-indigo-700 mt-1">${ssrInterpolate(unref(stats)?.averageWorkDuration ? (unref(stats).averageWorkDuration / 60).toFixed(1) : "0.0")} <span class="text-sm font-normal text-indigo-600/60 ml-1">hrs</span></p></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/attendance/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-Ch1Ywj8G.js.map
