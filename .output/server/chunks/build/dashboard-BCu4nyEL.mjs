import { defineComponent, mergeProps, ref, computed, unref, withCtx, createVNode, resolveDynamicComponent, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderAttr, ssrRenderList, ssrRenderVNode, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './nuxt-link-DsceMx1n.mjs';
import { K as useAuthStore, u as useRoute, ar as LayoutDashboard, f as Clock, v as Bell, a as Users, b as Calendar, s as Settings, as as CalendarClock, F as FileText, at as SquareCheckBig, ae as ChartColumn, N as Timer, au as Hourglass, e as Banknote, W as Wallet, I as ChevronRight, av as ChevronLeft, V as LogOut } from './server.mjs';
import { u as useNotificationStore } from './notifications-D37lH9VQ.mjs';
import { u as useAuth } from './useAuth-Dt3T5Rvc.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const authStore = useAuthStore();
    const notificationStore = useNotificationStore();
    useAuth();
    const isCollapsed = ref(false);
    const user = computed(() => authStore.user);
    const unreadCount = computed(() => notificationStore.unreadCount);
    const tenantSlug = route.params.tenant_slug;
    const navigation = [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["SUPER", "ADMIN", "HR", "EMPLOYEE"] },
      { name: "My Attendance", href: "/dashboard/attendance", icon: Clock, roles: ["SUPER", "ADMIN", "HR", "EMPLOYEE"] },
      { name: "Today's Attendance", href: "/dashboard/attendance/today", icon: Bell, roles: ["SUPER", "ADMIN", "HR"] },
      { name: "Employees", href: "/dashboard/employees", icon: Users, roles: ["SUPER", "ADMIN", "HR"] },
      { name: "Attendance Periods", href: "/dashboard/attendance-periods", icon: Calendar, roles: ["SUPER", "ADMIN", "HR"] },
      { name: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["SUPER", "ADMIN"] },
      { name: "Leave Config", href: "/dashboard/leaves/periods", icon: CalendarClock, roles: ["SUPER", "ADMIN", "HR"] },
      { name: "My Leaves", href: "/dashboard/leaves/my", icon: FileText },
      // All roles
      { name: "Approvals", href: "/dashboard/leaves/approvals", icon: SquareCheckBig, roles: ["SUPER", "ADMIN", "HR", "MANAGER"] },
      { name: "Leave Admin", href: "/dashboard/leaves/admin", icon: ChartColumn, roles: ["SUPER", "ADMIN", "HR"] },
      // Overtime
      { name: "My Overtime", href: "/dashboard/overtime/my", icon: Timer },
      // All roles
      { name: "Pending Overtime", href: "/dashboard/overtime/pending", icon: Hourglass, roles: ["SUPER", "ADMIN", "HR", "MANAGER"] },
      { name: "Approval History", href: "/dashboard/overtime/approvals", icon: SquareCheckBig, roles: ["SUPER", "ADMIN", "HR", "MANAGER"] },
      { name: "Overtime Admin", href: "/dashboard/overtime/admin", icon: ChartColumn, roles: ["SUPER", "ADMIN", "HR"] },
      // Payroll
      { name: "Payroll", href: "/dashboard/payroll", icon: Banknote, roles: ["SUPER", "ADMIN", "HR"] },
      { name: "Payslips", href: "/dashboard/payslips", icon: FileText, roles: ["SUPER", "ADMIN", "HR"] },
      { name: "My Salary", href: "/dashboard/payroll/my", icon: Wallet },
      // All roles
      { name: "My Payslips", href: "/dashboard/payslips/my", icon: FileText }
      // All roles
    ];
    const filteredNavigation = computed(() => {
      return navigation.filter((item) => {
        var _a, _b;
        if (item.name === "Approvals" && ((_a = user.value) == null ? void 0 : _a.hasSubordinates)) {
          return true;
        }
        return !item.roles || ((_b = user.value) == null ? void 0 : _b.role) && item.roles.includes(user.value.role);
      }).map((item) => ({
        ...item,
        href: tenantSlug ? `/${tenantSlug}${item.href}` : item.href
      }));
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["flex flex-col bg-white border-r border-gray-200 min-h-screen transition-all duration-300", isCollapsed.value ? "w-20" : "w-64"]
      }, _attrs))}><div class="flex items-center justify-between h-16 border-b border-gray-200 px-4">`);
      if (!isCollapsed.value) {
        _push(`<span class="text-xl font-bold text-brand-navy">HR Portal</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="p-2 rounded-md hover:bg-gray-100 transition-colors ml-auto"${ssrRenderAttr("title", isCollapsed.value ? "Expand Sidebar" : "Collapse Sidebar")}>`);
      if (isCollapsed.value) {
        _push(ssrRenderComponent(unref(ChevronRight), { class: "w-5 h-5 text-gray-600" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(ChevronLeft), { class: "w-5 h-5 text-gray-600" }, null, _parent));
      }
      _push(`</button></div><nav class="flex-1 px-2 py-4 space-y-1 overflow-y-auto"><!--[-->`);
      ssrRenderList(filteredNavigation.value, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.name,
          to: item.href,
          class: ["flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors relative", [
            unref(route).path === item.href ? "bg-brand-light text-brand-navy" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
            isCollapsed.value && "justify-center"
          ]],
          title: isCollapsed.value ? item.name : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(item.icon), {
                class: ["w-5 h-5", !isCollapsed.value && "mr-3"]
              }, null), _parent2, _scopeId);
              if (!isCollapsed.value) {
                _push2(`<span${_scopeId}>${ssrInterpolate(item.name)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (item.name === "Today's Attendance" && unreadCount.value > 0) {
                _push2(`<span class="ml-auto bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"${_scopeId}>${ssrInterpolate(unreadCount.value > 9 ? "9+" : unreadCount.value)}</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                  class: ["w-5 h-5", !isCollapsed.value && "mr-3"]
                }, null, 8, ["class"])),
                !isCollapsed.value ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(item.name), 1)) : createCommentVNode("", true),
                item.name === "Today's Attendance" && unreadCount.value > 0 ? (openBlock(), createBlock("span", {
                  key: 1,
                  class: "ml-auto bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                }, toDisplayString(unreadCount.value > 9 ? "9+" : unreadCount.value), 1)) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="p-4 border-t border-gray-200 space-y-2">`);
      if (!isCollapsed.value && user.value) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(tenantSlug) ? `/${unref(tenantSlug)}/dashboard/profile` : "/dashboard/profile",
          class: "flex items-center p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors mb-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="h-8 w-8 rounded-full bg-brand-navy flex items-center justify-center text-white shrink-0"${_scopeId}><span class="text-xs font-bold"${_scopeId}>${ssrInterpolate((user.value.name || "U").charAt(0).toUpperCase())}</span></div><div class="ml-3 overflow-hidden"${_scopeId}><p class="text-sm font-medium text-gray-900 truncate"${_scopeId}>${ssrInterpolate(user.value.name)}</p><p class="text-xs text-gray-500 truncate"${_scopeId}>${ssrInterpolate(user.value.role)}</p></div>`);
            } else {
              return [
                createVNode("div", { class: "h-8 w-8 rounded-full bg-brand-navy flex items-center justify-center text-white shrink-0" }, [
                  createVNode("span", { class: "text-xs font-bold" }, toDisplayString((user.value.name || "U").charAt(0).toUpperCase()), 1)
                ]),
                createVNode("div", { class: "ml-3 overflow-hidden" }, [
                  createVNode("p", { class: "text-sm font-medium text-gray-900 truncate" }, toDisplayString(user.value.name), 1),
                  createVNode("p", { class: "text-xs text-gray-500 truncate" }, toDisplayString(user.value.role), 1)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="${ssrRenderClass([isCollapsed.value && "justify-center", "flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"])}"${ssrRenderAttr("title", isCollapsed.value ? "Logout" : "")}>`);
      _push(ssrRenderComponent(unref(LogOut), {
        class: ["w-5 h-5", !isCollapsed.value && "mr-3"]
      }, null, _parent));
      if (!isCollapsed.value) {
        _push(`<span>Logout</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/Sidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TopBar",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6" }, _attrs))}><h1 class="text-lg font-semibold text-gray-800"> Welcome back, ${ssrInterpolate(((_a = unref(authStore).user) == null ? void 0 : _a.name) || "User")}</h1><div class="flex items-center space-x-4"><div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">${ssrInterpolate((((_c = (_b = unref(authStore).user) == null ? void 0 : _b.name) == null ? void 0 : _c.charAt(0)) || "U").toUpperCase())}</div></div></header>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/TopBar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const useWebSocket = () => {
  useAuthStore();
  useNotificationStore();
  const connect = () => {
    return;
  };
  const disconnect = () => {
  };
  return {
    connect,
    disconnect
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    useWebSocket();
    useAuthStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen bg-gray-50" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`<div class="flex-1 flex flex-col h-screen overflow-hidden">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<main class="flex-1 p-6 overflow-auto bg-gray-50">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard-BCu4nyEL.mjs.map
