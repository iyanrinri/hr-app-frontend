import { _ as __nuxt_component_0 } from './nuxt-link-DsceMx1n.mjs';
import { _ as _sfc_main$2 } from './Button-gKFWS_xI.mjs';
import { _ as _sfc_main$3 } from './Card-CVi1E1xp.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useRoute, P as Plus, y as Search, z as LayoutGrid, G as List, U as User, M as Mail, H as Briefcase, w as SquarePen, d as Trash2, E as Eye, x as RotateCcw, X } from './server.mjs';
import { a as useEmployees, b as useDeleteEmployee, c as useRestoreEmployee } from './useEmployees-CEaIsP48.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './index-B7s_3MI_.mjs';
import 'clsx';
import 'tailwind-merge';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'uuid';
import './fetch-VuP8VKdC.mjs';
import '@vue/shared';
import 'perfect-debounce';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "EmployeeTable",
  __ssrInlineRender: true,
  props: {
    employees: {}
  },
  emits: ["delete", "restore"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const route = useRoute();
    const tenantSlug = route.params.tenant_slug;
    const confirmAction = ref(null);
    const viewEmployee = ref(null);
    const handleConfirm = () => {
      if (confirmAction.value) {
        if (confirmAction.value.type === "delete") {
          emit("delete", confirmAction.value.id);
        } else {
          emit("restore", confirmAction.value.id);
        }
        confirmAction.value = null;
      }
    };
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(value);
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const formatDateShort = (dateString) => {
      return new Date(dateString).toLocaleDateString();
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_UiButton = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`);
      ssrRenderList(__props.employees, (employee) => {
        var _a2, _b2, _c2;
        _push(`<tr class="hover:bg-gray-50"><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"><div class="flex flex-col"><span>${ssrInterpolate(employee.firstName)} ${ssrInterpolate(employee.lastName)}</span>`);
        if ((_a2 = employee.user) == null ? void 0 : _a2.deletedAt) {
          _push(`<span class="mt-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 w-fit"> Inactive User </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${ssrInterpolate((_b2 = employee.user) == null ? void 0 : _b2.email)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${ssrInterpolate(employee.position)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${ssrInterpolate(employee.department)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${ssrInterpolate(formatDateShort(employee.joinDate))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><div class="flex justify-end space-x-2">`);
        _push(ssrRenderComponent(_component_UiButton, {
          variant: "secondary",
          class: "p-2",
          onClick: ($event) => viewEmployee.value = employee,
          title: "View Details"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Eye), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(Eye), { class: "w-4 h-4" })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/${unref(tenantSlug)}/dashboard/employees/${employee.id}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiButton, {
                variant: "secondary",
                class: "p-2",
                title: "Edit Employee"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(SquarePen), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(SquarePen), { class: "w-4 h-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiButton, {
                  variant: "secondary",
                  class: "p-2",
                  title: "Edit Employee"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(SquarePen), { class: "w-4 h-4" })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 2
        }, _parent));
        if ((_c2 = employee.user) == null ? void 0 : _c2.deletedAt) {
          _push(ssrRenderComponent(_component_UiButton, {
            variant: "secondary",
            class: "p-2 bg-green-50 text-green-600 hover:bg-green-100 border-green-200",
            onClick: ($event) => confirmAction.value = { type: "restore", id: employee.id },
            title: "Restore Employee"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(RotateCcw), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(RotateCcw), { class: "w-4 h-4" })
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(ssrRenderComponent(_component_UiButton, {
            variant: "danger",
            class: "p-2",
            onClick: ($event) => confirmAction.value = { type: "delete", id: employee.id },
            title: "Delete Employee"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(Trash2), { class: "w-4 h-4" })
                ];
              }
            }),
            _: 2
          }, _parent));
        }
        _push(`</div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div>`);
      if (viewEmployee.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"><div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"><div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between"><h3 class="text-xl font-bold text-gray-900">Employee Details</h3><button class="p-2 hover:bg-gray-100 rounded-full transition-colors">`);
        _push(ssrRenderComponent(unref(X), { class: "w-5 h-5 text-gray-500" }, null, _parent));
        _push(`</button></div><div class="p-6 space-y-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-bold text-gray-700 mb-1">First Name</label><p class="text-gray-900">${ssrInterpolate(viewEmployee.value.firstName)}</p></div><div><label class="block text-sm font-bold text-gray-700 mb-1">Last Name</label><p class="text-gray-900">${ssrInterpolate(viewEmployee.value.lastName)}</p></div><div><label class="block text-sm font-bold text-gray-700 mb-1">Email</label><p class="text-gray-900">${ssrInterpolate((_a = viewEmployee.value.user) == null ? void 0 : _a.email)}</p></div><div><label class="block text-sm font-bold text-gray-700 mb-1">Role</label><p class="text-gray-900 capitalize">${ssrInterpolate((_b = viewEmployee.value.user) == null ? void 0 : _b.role)}</p></div><div><label class="block text-sm font-bold text-gray-700 mb-1">Position</label><p class="text-gray-900">${ssrInterpolate(viewEmployee.value.position)}</p></div><div><label class="block text-sm font-bold text-gray-700 mb-1">Department</label><p class="text-gray-900">${ssrInterpolate(viewEmployee.value.department)}</p></div><div><label class="block text-sm font-bold text-gray-700 mb-1">Join Date</label><p class="text-gray-900">${ssrInterpolate(formatDate(viewEmployee.value.joinDate))}</p></div><div><label class="block text-sm font-bold text-gray-700 mb-1">Base Salary</label><p class="text-gray-900">${ssrInterpolate(formatCurrency(viewEmployee.value.baseSalary))}</p></div><div><label class="block text-sm font-bold text-gray-700 mb-1">Status</label><span class="${ssrRenderClass([
          "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
          ((_c = viewEmployee.value.user) == null ? void 0 : _c.deletedAt) ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
        ])}">${ssrInterpolate(((_d = viewEmployee.value.user) == null ? void 0 : _d.deletedAt) ? "Inactive" : "Active")}</span></div><div><label class="block text-sm font-bold text-gray-700 mb-1">Created At</label><p class="text-gray-900">${ssrInterpolate(formatDate(viewEmployee.value.createdAt))}</p></div></div></div><div class="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200">`);
        _push(ssrRenderComponent(_component_UiButton, {
          onClick: ($event) => viewEmployee.value = null,
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
      if (confirmAction.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-white rounded-lg p-6 max-w-md w-full mx-4"><h3 class="text-lg font-bold text-gray-900 mb-2">${ssrInterpolate(confirmAction.value.type === "delete" ? "Delete Employee" : "Restore Employee")}</h3><p class="text-gray-600 mb-6">${ssrInterpolate(confirmAction.value.type === "delete" ? "Are you sure you want to delete this employee? This action will deactivate their account." : "Are you sure you want to restore this employee? This will reactivate their account.")}</p><div class="flex justify-end space-x-3">`);
        _push(ssrRenderComponent(_component_UiButton, {
          variant: "secondary",
          onClick: ($event) => confirmAction.value = null
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Cancel `);
            } else {
              return [
                createTextVNode(" Cancel ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UiButton, {
          variant: confirmAction.value.type === "delete" ? "danger" : "primary",
          onClick: handleConfirm
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(confirmAction.value.type === "delete" ? "Delete" : "Restore")}`);
            } else {
              return [
                createTextVNode(toDisplayString(confirmAction.value.type === "delete" ? "Delete" : "Restore"), 1)
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tables/EmployeeTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const tenantSlug = route.params.tenant_slug;
    const viewMode = ref("grid");
    const searchInput = ref("");
    const statusInput = ref("");
    const searchQuery = ref("");
    const statusQuery = ref("");
    const { data: response, loading, error, refresh } = useEmployees(1, 50, searchQuery, statusQuery);
    const { mutate: deleteEmployee } = useDeleteEmployee();
    const { mutate: restoreEmployee } = useRestoreEmployee();
    const handleApplyFilters = () => {
      searchQuery.value = searchInput.value;
      statusQuery.value = statusInput.value;
    };
    const handleResetFilters = () => {
      searchInput.value = "";
      statusInput.value = "";
      searchQuery.value = "";
      statusQuery.value = "";
    };
    const handleDelete = async (id) => {
      if (confirm("Are you sure you want to delete this employee?")) {
        await deleteEmployee(id);
        refresh();
      }
    };
    const handleRestore = async (id) => {
      await restoreEmployee(id);
      refresh();
    };
    const isEmployeeActive = (emp) => {
      var _a;
      return !((_a = emp.user) == null ? void 0 : _a.deletedAt);
    };
    const employees = computed(() => {
      var _a;
      return ((_a = response.value) == null ? void 0 : _a.data) || [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UiButton = _sfc_main$2;
      const _component_UiCard = _sfc_main$3;
      const _component_TablesEmployeeTable = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h2 class="text-3xl font-bold text-gray-900 tracking-tight">Employee Directory</h2><p class="text-gray-500 mt-1">Manage your organization&#39;s workforce and profiles.</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/${unref(tenantSlug)}/dashboard/employees/create`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, { class: "shadow-lg shadow-brand-navy/20 h-10 px-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Add Employee `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Add Employee ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiButton, { class: "shadow-lg shadow-brand-navy/20 h-10 px-6" }, {
                default: withCtx(() => [
                  createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                  createTextVNode(" Add Employee ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-4 items-center justify-between"><div class="flex flex-col md:flex-row gap-4 w-full lg:w-auto flex-1"><div class="relative flex-1 max-w-md">`);
      _push(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" }, null, _parent));
      _push(`<input type="text" placeholder="Search by name, email, position..."${ssrRenderAttr("value", searchInput.value)} class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-brand-cyan/20 focus:bg-white transition-all text-sm"></div><div class="flex items-center gap-2 bg-gray-50 p-1 rounded-lg self-start"><button class="${ssrRenderClass(["px-4 py-1.5 text-sm font-medium rounded-md transition-all", statusInput.value === "" ? "bg-white text-brand-navy shadow-sm" : "text-gray-500 hover:text-gray-900"])}"> All </button><button class="${ssrRenderClass(["px-4 py-1.5 text-sm font-medium rounded-md transition-all", statusInput.value === "active" ? "bg-white text-green-700 shadow-sm" : "text-gray-500 hover:text-gray-900"])}"> Active </button><button class="${ssrRenderClass(["px-4 py-1.5 text-sm font-medium rounded-md transition-all", statusInput.value === "inactive" ? "bg-white text-gray-700 shadow-sm" : "text-gray-500 hover:text-gray-900"])}"> Inactive </button></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_UiButton, {
        onClick: handleApplyFilters,
        variant: "secondary",
        class: "px-4 shadow-sm border border-gray-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Apply`);
          } else {
            return [
              createTextVNode("Apply")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (searchInput.value || statusInput.value) {
        _push(ssrRenderComponent(_component_UiButton, {
          onClick: handleResetFilters,
          variant: "ghost",
          class: "px-4 text-gray-500"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Reset`);
            } else {
              return [
                createTextVNode("Reset")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex items-center bg-gray-50 p-1 rounded-lg border border-gray-100"><button class="${ssrRenderClass(["p-2 rounded-md transition-all", viewMode.value === "grid" ? "bg-white text-brand-navy shadow-sm" : "text-gray-400 hover:text-gray-600"])}" title="Grid View">`);
      _push(ssrRenderComponent(unref(LayoutGrid), { class: "w-5 h-5" }, null, _parent));
      _push(`</button><button class="${ssrRenderClass(["p-2 rounded-md transition-all", viewMode.value === "list" ? "bg-white text-brand-navy shadow-sm" : "text-gray-400 hover:text-gray-600"])}" title="List View">`);
      _push(ssrRenderComponent(unref(List), { class: "w-5 h-5" }, null, _parent));
      _push(`</button></div></div>`);
      if (unref(loading)) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"><!--[-->`);
        ssrRenderList(8, (i) => {
          _push(`<div class="h-64 bg-gray-100 rounded-xl animate-pulse"></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (unref(error)) {
        _push(`<div class="p-12 text-center text-red-600 bg-red-50 rounded-lg border border-red-100 mt-6 lg:mx-8"> Error loading employees. Please try refreshing the page. </div>`);
      } else if (employees.value.length === 0) {
        _push(`<div class="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200"><div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">`);
        _push(ssrRenderComponent(unref(User), { class: "w-8 h-8 text-gray-300" }, null, _parent));
        _push(`</div><h3 class="text-lg font-medium text-gray-900">No employees found</h3><p class="text-gray-500 mt-1">Try adjusting your filters or add a new employee.</p></div>`);
      } else {
        _push(`<div>`);
        if (viewMode.value === "grid") {
          _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"><!--[-->`);
          ssrRenderList(employees.value, (emp) => {
            var _a, _b, _c, _d, _e;
            _push(`<div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden group relative"><div class="absolute top-3 right-3 z-10"><span class="${ssrRenderClass(["inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase shadow-sm backdrop-blur-md", isEmployeeActive(emp) ? "bg-green-100/90 text-green-700" : "bg-red-100/90 text-red-700"])}">${ssrInterpolate(isEmployeeActive(emp) ? "Active" : "Inactive")}</span></div><div class="h-24 bg-gradient-to-r from-gray-50 to-gray-100 relative border-b border-gray-100"></div><div class="px-6 pb-6 pt-16 relative"><div class="w-20 h-20 rounded-2xl bg-white p-1 absolute -top-10 left-6 shadow-md shadow-gray-200"><div class="w-full h-full rounded-xl bg-brand-navy text-white flex items-center justify-center text-2xl font-bold">${ssrInterpolate((((_a = emp.firstName) == null ? void 0 : _a[0]) || "") + (((_b = emp.lastName) == null ? void 0 : _b[0]) || ""))}</div></div><div class="mb-4">`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/${unref(tenantSlug)}/dashboard/employees/${emp.id}`,
              class: "block hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-cyan rounded-md"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<h3 class="font-bold text-gray-900 text-xl leading-tight group-hover:text-brand-navy transition-colors truncate pr-2"${ssrRenderAttr("title", `${emp.firstName} ${emp.lastName}`)}${_scopeId}>${ssrInterpolate(emp.firstName)} ${ssrInterpolate(emp.lastName)}</h3>`);
                } else {
                  return [
                    createVNode("h3", {
                      class: "font-bold text-gray-900 text-xl leading-tight group-hover:text-brand-navy transition-colors truncate pr-2",
                      title: `${emp.firstName} ${emp.lastName}`
                    }, toDisplayString(emp.firstName) + " " + toDisplayString(emp.lastName), 9, ["title"])
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`<p class="text-brand-cyan font-medium text-sm mt-1 truncate">${ssrInterpolate(emp.position || ((_c = emp.user) == null ? void 0 : _c.role))}</p></div><div class="space-y-3 mb-6 pt-4 border-t border-gray-50"><div class="flex items-center text-sm text-gray-500">`);
            _push(ssrRenderComponent(unref(Mail), { class: "w-4 h-4 mr-3 text-gray-400 shrink-0" }, null, _parent));
            _push(`<span class="truncate"${ssrRenderAttr("title", (_d = emp.user) == null ? void 0 : _d.email)}>${ssrInterpolate((_e = emp.user) == null ? void 0 : _e.email)}</span></div><div class="flex items-center text-sm text-gray-500">`);
            _push(ssrRenderComponent(unref(Briefcase), { class: "w-4 h-4 mr-3 text-gray-400 shrink-0" }, null, _parent));
            _push(`<span class="truncate"${ssrRenderAttr("title", emp.department || "No Dept")}>${ssrInterpolate(emp.department || "No Dept")}</span></div></div><div class="flex gap-2">`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/${unref(tenantSlug)}/dashboard/employees/${emp.id}`,
              class: "flex-1"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_UiButton, {
                    variant: "secondary",
                    class: "w-full h-9 text-xs"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(unref(SquarePen), { class: "w-3.5 h-3.5 mr-1.5" }, null, _parent3, _scopeId2));
                        _push3(` Edit `);
                      } else {
                        return [
                          createVNode(unref(SquarePen), { class: "w-3.5 h-3.5 mr-1.5" }),
                          createTextVNode(" Edit ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_UiButton, {
                      variant: "secondary",
                      class: "w-full h-9 text-xs"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(SquarePen), { class: "w-3.5 h-3.5 mr-1.5" }),
                        createTextVNode(" Edit ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(ssrRenderComponent(_component_UiButton, {
              variant: "danger",
              class: "flex-1 h-9 text-xs bg-red-50 text-red-600 hover:bg-red-100 border-red-100 shadow-sm",
              onClick: ($event) => handleDelete(emp.id)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(Trash2), { class: "w-3.5 h-3.5 mr-1.5" }, null, _parent2, _scopeId));
                  _push2(` Delete `);
                } else {
                  return [
                    createVNode(unref(Trash2), { class: "w-3.5 h-3.5 mr-1.5" }),
                    createTextVNode(" Delete ")
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div></div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(ssrRenderComponent(_component_UiCard, { class: "border border-gray-100 shadow-sm overflow-hidden" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="overflow-x-auto"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_TablesEmployeeTable, {
                  employees: employees.value,
                  onDelete: handleDelete,
                  onRestore: handleRestore
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                return [
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode(_component_TablesEmployeeTable, {
                      employees: employees.value,
                      onDelete: handleDelete,
                      onRestore: handleRestore
                    }, null, 8, ["employees"])
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/employees/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CHntTw0H.mjs.map
