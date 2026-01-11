import { _ as __nuxt_component_0 } from "./nuxt-link-DsceMx1n.js";
import { _ as _sfc_main$1 } from "./Button-gKFWS_xI.js";
import { _ as _sfc_main$2 } from "./Card-CVi1E1xp.js";
import { _ as _sfc_main$3 } from "./CardContent-BE35Q-6Q.js";
import { _ as _sfc_main$4, a as _sfc_main$5 } from "./CardTitle-D9AdQELc.js";
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, withDirectives, vModelText, vModelSelect, createBlock, openBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { u as useRoute, P as Plus, y as Search, aq as Filter, c as CircleCheckBig, h as CircleX, E as Eye, w as SquarePen, d as Trash2, b as Calendar, X } from "../server.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/hookable/dist/index.mjs";
import { b as useAttendancePeriods, c as useDeleteAttendancePeriod } from "./useAttendancePeriods-DfCT75w6.js";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ufo/dist/index.mjs";
import "./index-B7s_3MI_.js";
import "clsx";
import "tailwind-merge";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/klona/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/destr/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ohash/dist/index.mjs";
import "uuid";
import "./fetch-VuP8VKdC.js";
import "@vue/shared";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const tenantSlug = route.params.tenant_slug;
    const searchInput = ref("");
    const isActiveInput = ref("");
    const searchQuery = ref("");
    const isActiveQuery = ref("");
    const page = ref(1);
    const limit = ref(10);
    const { data: response, loading, error, refresh } = useAttendancePeriods(page, limit, searchQuery, isActiveQuery);
    const { mutate: deletePeriod } = useDeleteAttendancePeriod();
    const viewPeriod = ref(null);
    const deleteConfirm = ref(null);
    const handleApplyFilters = () => {
      searchQuery.value = searchInput.value;
      isActiveQuery.value = isActiveInput.value;
      page.value = 1;
    };
    const handleResetFilters = () => {
      searchInput.value = "";
      isActiveInput.value = "";
      searchQuery.value = "";
      isActiveQuery.value = "";
      page.value = 1;
    };
    const handleDelete = async () => {
      if (deleteConfirm.value) {
        await deletePeriod(deleteConfirm.value);
        deleteConfirm.value = null;
        refresh();
      }
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString();
    };
    const formatDateLong = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      });
    };
    const formatDateShort = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      });
    };
    const formatDateShortYear = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    };
    const periods = computed(() => response.value?.data || []);
    const activePeriod = computed(() => periods.value.find((p) => p.isActive));
    const getTimelineStatus = (period) => {
      const startDate = new Date(period.startDate);
      const endDate = new Date(period.endDate);
      const today = /* @__PURE__ */ new Date();
      const isOngoing = today >= startDate && today <= endDate;
      const isPast = today > endDate;
      const isFuture = today < startDate;
      return { isOngoing, isPast, isFuture };
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UiButton = _sfc_main$1;
      const _component_UiCard = _sfc_main$2;
      const _component_UiCardContent = _sfc_main$3;
      const _component_UiCardHeader = _sfc_main$4;
      const _component_UiCardTitle = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }, _attrs))}><div class="flex justify-between items-center"><h2 class="text-2xl font-bold text-gray-900">Attendance Periods</h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/${unref(tenantSlug)}/dashboard/attendance-periods/create`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Add Period `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Add Period ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiButton, null, {
                default: withCtx(() => [
                  createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                  createTextVNode(" Add Period ")
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
                  _push3(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"${_scopeId2}><div class="relative lg:col-span-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" }, null, _parent3, _scopeId2));
                  _push3(`<input type="text" placeholder="Search by name or year..."${ssrRenderAttr("value", searchInput.value)} class="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan bg-white text-black"${_scopeId2}></div><div class="relative"${_scopeId2}><select class="w-full appearance-none px-4 py-2 pr-10 border border-gray-600 rounded-md focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan bg-white text-black cursor-pointer"${_scopeId2}><option value=""${ssrIncludeBooleanAttr(Array.isArray(isActiveInput.value) ? ssrLooseContain(isActiveInput.value, "") : ssrLooseEqual(isActiveInput.value, "")) ? " selected" : ""}${_scopeId2}>All Status</option><option value="true"${ssrIncludeBooleanAttr(Array.isArray(isActiveInput.value) ? ssrLooseContain(isActiveInput.value, "true") : ssrLooseEqual(isActiveInput.value, "true")) ? " selected" : ""}${_scopeId2}>Active Only</option><option value="false"${ssrIncludeBooleanAttr(Array.isArray(isActiveInput.value) ? ssrLooseContain(isActiveInput.value, "false") : ssrLooseEqual(isActiveInput.value, "false")) ? " selected" : ""}${_scopeId2}>Inactive Only</option></select><div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"${_scopeId2}><svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d="M19 9l-7 7-7-7"${_scopeId2}></path></svg></div></div><div class="flex gap-2"${_scopeId2}>`);
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
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" }, [
                      createVNode("div", { class: "relative lg:col-span-2" }, [
                        createVNode(unref(Search), { class: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" }),
                        withDirectives(createVNode("input", {
                          type: "text",
                          placeholder: "Search by name or year...",
                          "onUpdate:modelValue": ($event) => searchInput.value = $event,
                          class: "w-full pl-10 pr-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan bg-white text-black"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, searchInput.value]
                        ])
                      ]),
                      createVNode("div", { class: "relative" }, [
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => isActiveInput.value = $event,
                          class: "w-full appearance-none px-4 py-2 pr-10 border border-gray-600 rounded-md focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan bg-white text-black cursor-pointer"
                        }, [
                          createVNode("option", { value: "" }, "All Status"),
                          createVNode("option", { value: "true" }, "Active Only"),
                          createVNode("option", { value: "false" }, "Inactive Only")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, isActiveInput.value]
                        ]),
                        createVNode("div", { class: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-5 h-5 text-gray-600",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: "{2}",
                              d: "M19 9l-7 7-7-7"
                            })
                          ]))
                        ])
                      ]),
                      createVNode("div", { class: "flex gap-2" }, [
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
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardContent, { class: "pt-6" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" }, [
                    createVNode("div", { class: "relative lg:col-span-2" }, [
                      createVNode(unref(Search), { class: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" }),
                      withDirectives(createVNode("input", {
                        type: "text",
                        placeholder: "Search by name or year...",
                        "onUpdate:modelValue": ($event) => searchInput.value = $event,
                        class: "w-full pl-10 pr-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan bg-white text-black"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, searchInput.value]
                      ])
                    ]),
                    createVNode("div", { class: "relative" }, [
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => isActiveInput.value = $event,
                        class: "w-full appearance-none px-4 py-2 pr-10 border border-gray-600 rounded-md focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan bg-white text-black cursor-pointer"
                      }, [
                        createVNode("option", { value: "" }, "All Status"),
                        createVNode("option", { value: "true" }, "Active Only"),
                        createVNode("option", { value: "false" }, "Inactive Only")
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, isActiveInput.value]
                      ]),
                      createVNode("div", { class: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-5 h-5 text-gray-600",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "{2}",
                            d: "M19 9l-7 7-7-7"
                          })
                        ]))
                      ])
                    ]),
                    createVNode("div", { class: "flex gap-2" }, [
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
                        _push4(`All Periods`);
                      } else {
                        return [
                          createTextVNode("All Periods")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("All Periods")
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
                    _push3(`<div class="flex flex-col items-center justify-center py-12"${_scopeId2}><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy mb-4"${_scopeId2}></div><p class="text-gray-600"${_scopeId2}>Loading attendance periods...</p></div>`);
                  } else if (unref(error)) {
                    _push3(`<div class="text-center text-red-600 py-6"${_scopeId2}> Error loading attendance periods </div>`);
                  } else {
                    _push3(`<table class="min-w-full divide-y divide-gray-200"${_scopeId2}><thead class="bg-gray-50"${_scopeId2}><tr${_scopeId2}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}>Name</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}>Date Range</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}>Working Days/Hours</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}>Holidays</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}>Status</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}>Actions</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId2}><!--[-->`);
                    ssrRenderList(periods.value, (period) => {
                      _push3(`<tr class="hover:bg-gray-50"${_scopeId2}><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(period.name)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"${_scopeId2}>${ssrInterpolate(formatDate(period.startDate))} - ${ssrInterpolate(formatDate(period.endDate))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"${_scopeId2}>${ssrInterpolate(period.workingDaysPerWeek)} days / ${ssrInterpolate(period.workingHoursPerDay)} hours </td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"${_scopeId2}>${ssrInterpolate(period.holidays?.length || 0)} holidays </td><td class="px-6 py-4 whitespace-nowrap"${_scopeId2}><span class="${ssrRenderClass([
                        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                        period.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      ])}"${_scopeId2}>`);
                      if (period.isActive) {
                        _push3(`<!--[-->`);
                        _push3(ssrRenderComponent(unref(CircleCheckBig), { class: "w-3 h-3 mr-1" }, null, _parent3, _scopeId2));
                        _push3(` Active <!--]-->`);
                      } else {
                        _push3(`<!--[-->`);
                        _push3(ssrRenderComponent(unref(CircleX), { class: "w-3 h-3 mr-1" }, null, _parent3, _scopeId2));
                        _push3(` Inactive <!--]-->`);
                      }
                      _push3(`</span></td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"${_scopeId2}><div class="flex justify-end space-x-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiButton, {
                        variant: "secondary",
                        class: "p-2",
                        onClick: ($event) => viewPeriod.value = period,
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
                      _push3(ssrRenderComponent(_component_NuxtLink, {
                        to: `/${unref(tenantSlug)}/dashboard/attendance-periods/${period.id}`
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_UiButton, {
                              variant: "secondary",
                              class: "p-2",
                              title: "Edit Period"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(SquarePen), { class: "w-4 h-4" }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(SquarePen), { class: "w-4 h-4" })
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_UiButton, {
                                variant: "secondary",
                                class: "p-2",
                                title: "Edit Period"
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
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiButton, {
                        variant: "danger",
                        class: "p-2",
                        onClick: ($event) => deleteConfirm.value = period.id,
                        title: "Delete Period"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(Trash2), { class: "w-4 h-4" })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div></td></tr>`);
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
                      createVNode("p", { class: "text-gray-600" }, "Loading attendance periods...")
                    ])) : unref(error) ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-center text-red-600 py-6"
                    }, " Error loading attendance periods ")) : (openBlock(), createBlock("table", {
                      key: 2,
                      class: "min-w-full divide-y divide-gray-200"
                    }, [
                      createVNode("thead", { class: "bg-gray-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Name"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Date Range"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Working Days/Hours"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Holidays"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Status"),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Actions")
                        ])
                      ]),
                      createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(periods.value, (period) => {
                          return openBlock(), createBlock("tr", {
                            key: period.id,
                            class: "hover:bg-gray-50"
                          }, [
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" }, toDisplayString(period.name), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(formatDate(period.startDate)) + " - " + toDisplayString(formatDate(period.endDate)), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(period.workingDaysPerWeek) + " days / " + toDisplayString(period.workingHoursPerDay) + " hours ", 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(period.holidays?.length || 0) + " holidays ", 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("span", {
                                class: [
                                  "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                                  period.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                ]
                              }, [
                                period.isActive ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                  createVNode(unref(CircleCheckBig), { class: "w-3 h-3 mr-1" }),
                                  createTextVNode(" Active ")
                                ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                  createVNode(unref(CircleX), { class: "w-3 h-3 mr-1" }),
                                  createTextVNode(" Inactive ")
                                ], 64))
                              ], 2)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                              createVNode("div", { class: "flex justify-end space-x-2" }, [
                                createVNode(_component_UiButton, {
                                  variant: "secondary",
                                  class: "p-2",
                                  onClick: ($event) => viewPeriod.value = period,
                                  title: "View Details"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Eye), { class: "w-4 h-4" })
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(_component_NuxtLink, {
                                  to: `/${unref(tenantSlug)}/dashboard/attendance-periods/${period.id}`
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiButton, {
                                      variant: "secondary",
                                      class: "p-2",
                                      title: "Edit Period"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(SquarePen), { class: "w-4 h-4" })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["to"]),
                                createVNode(_component_UiButton, {
                                  variant: "danger",
                                  class: "p-2",
                                  onClick: ($event) => deleteConfirm.value = period.id,
                                  title: "Delete Period"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Trash2), { class: "w-4 h-4" })
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ])
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
                      createTextVNode("All Periods")
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
                    createVNode("p", { class: "text-gray-600" }, "Loading attendance periods...")
                  ])) : unref(error) ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center text-red-600 py-6"
                  }, " Error loading attendance periods ")) : (openBlock(), createBlock("table", {
                    key: 2,
                    class: "min-w-full divide-y divide-gray-200"
                  }, [
                    createVNode("thead", { class: "bg-gray-50" }, [
                      createVNode("tr", null, [
                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Name"),
                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Date Range"),
                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Working Days/Hours"),
                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Holidays"),
                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Status"),
                        createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Actions")
                      ])
                    ]),
                    createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(periods.value, (period) => {
                        return openBlock(), createBlock("tr", {
                          key: period.id,
                          class: "hover:bg-gray-50"
                        }, [
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" }, toDisplayString(period.name), 1),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(formatDate(period.startDate)) + " - " + toDisplayString(formatDate(period.endDate)), 1),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(period.workingDaysPerWeek) + " days / " + toDisplayString(period.workingHoursPerDay) + " hours ", 1),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(period.holidays?.length || 0) + " holidays ", 1),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                            createVNode("span", {
                              class: [
                                "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                                period.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                              ]
                            }, [
                              period.isActive ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createVNode(unref(CircleCheckBig), { class: "w-3 h-3 mr-1" }),
                                createTextVNode(" Active ")
                              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                createVNode(unref(CircleX), { class: "w-3 h-3 mr-1" }),
                                createTextVNode(" Inactive ")
                              ], 64))
                            ], 2)
                          ]),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                            createVNode("div", { class: "flex justify-end space-x-2" }, [
                              createVNode(_component_UiButton, {
                                variant: "secondary",
                                class: "p-2",
                                onClick: ($event) => viewPeriod.value = period,
                                title: "View Details"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Eye), { class: "w-4 h-4" })
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(_component_NuxtLink, {
                                to: `/${unref(tenantSlug)}/dashboard/attendance-periods/${period.id}`
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiButton, {
                                    variant: "secondary",
                                    class: "p-2",
                                    title: "Edit Period"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(SquarePen), { class: "w-4 h-4" })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["to"]),
                              createVNode(_component_UiButton, {
                                variant: "danger",
                                class: "p-2",
                                onClick: ($event) => deleteConfirm.value = period.id,
                                title: "Delete Period"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Trash2), { class: "w-4 h-4" })
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ])
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
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Period Timeline`);
                      } else {
                        return [
                          createTextVNode("Period Timeline")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Period Timeline")
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
                  if (unref(loading)) {
                    _push3(`<div class="flex flex-col items-center justify-center py-12"${_scopeId2}><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy mb-4"${_scopeId2}></div><p class="text-gray-600"${_scopeId2}>Loading timeline...</p></div>`);
                  } else {
                    _push3(`<div class="space-y-4"${_scopeId2}>`);
                    if (activePeriod.value) {
                      _push3(`<div class="p-4 bg-brand-light border-l-4 border-brand-navy rounded"${_scopeId2}><div class="flex items-center"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Calendar), { class: "w-5 h-5 text-brand-navy mr-2" }, null, _parent3, _scopeId2));
                      _push3(`<div${_scopeId2}><p class="font-bold text-brand-navy"${_scopeId2}> Active Period: ${ssrInterpolate(activePeriod.value.name)}</p><p class="text-sm text-gray-600"${_scopeId2}>${ssrInterpolate(formatDateLong(activePeriod.value.startDate))} - ${ssrInterpolate(formatDateLong(activePeriod.value.endDate))}</p></div></div></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="relative"${_scopeId2}><div class="absolute left-0 top-0 bottom-0 w-1 bg-gray-200"${_scopeId2}></div><div class="space-y-6 ml-6"${_scopeId2}><!--[-->`);
                    ssrRenderList(periods.value, (period) => {
                      _push3(`<div class="relative"${_scopeId2}><div class="${ssrRenderClass([
                        "absolute -left-7-5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2",
                        period.isActive ? "bg-brand-navy border-brand-navy" : getTimelineStatus(period).isPast ? "bg-gray-300 border-gray-400" : "bg-white border-brand-cyan"
                      ])}"${_scopeId2}></div><div class="${ssrRenderClass([
                        "p-4 rounded-lg border-2",
                        period.isActive ? "border-brand-navy bg-brand-light" : "border-gray-200 bg-white"
                      ])}"${_scopeId2}><div class="flex items-start justify-between"${_scopeId2}><div class="flex-1"${_scopeId2}><div class="flex items-center gap-2 mb-2"${_scopeId2}><h4 class="${ssrRenderClass(["font-bold", period.isActive ? "text-brand-navy" : "text-gray-900"])}"${_scopeId2}>${ssrInterpolate(period.name)}</h4>`);
                      if (period.isActive) {
                        _push3(`<span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"${_scopeId2}> Active </span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (getTimelineStatus(period).isOngoing && !period.isActive) {
                        _push3(`<span class="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full"${_scopeId2}> Ongoing </span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (getTimelineStatus(period).isPast) {
                        _push3(`<span class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"${_scopeId2}> Past </span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (getTimelineStatus(period).isFuture) {
                        _push3(`<span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"${_scopeId2}> Upcoming </span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div><div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm"${_scopeId2}><div${_scopeId2}><p class="text-gray-500"${_scopeId2}>Duration</p><p class="font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(formatDateShort(period.startDate))} - ${ssrInterpolate(formatDateShortYear(period.endDate))}</p></div><div${_scopeId2}><p class="text-gray-500"${_scopeId2}>Working Schedule</p><p class="font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(period.workingDaysPerWeek)} days/week, ${ssrInterpolate(period.workingHoursPerDay)} hrs/day </p></div><div${_scopeId2}><p class="text-gray-500"${_scopeId2}>Holidays</p><p class="font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(period.holidays?.length || 0)} configured </p></div></div>`);
                      if (period.description) {
                        _push3(`<p class="mt-2 text-sm text-gray-600"${_scopeId2}>${ssrInterpolate(period.description)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div></div></div></div>`);
                    });
                    _push3(`<!--]--></div></div>`);
                    if (periods.value.length === 0) {
                      _push3(`<div class="text-center py-12 text-gray-500"${_scopeId2}> No attendance periods configured yet </div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  }
                } else {
                  return [
                    unref(loading) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex flex-col items-center justify-center py-12"
                    }, [
                      createVNode("div", { class: "animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy mb-4" }),
                      createVNode("p", { class: "text-gray-600" }, "Loading timeline...")
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-4"
                    }, [
                      activePeriod.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "p-4 bg-brand-light border-l-4 border-brand-navy rounded"
                      }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode(unref(Calendar), { class: "w-5 h-5 text-brand-navy mr-2" }),
                          createVNode("div", null, [
                            createVNode("p", { class: "font-bold text-brand-navy" }, " Active Period: " + toDisplayString(activePeriod.value.name), 1),
                            createVNode("p", { class: "text-sm text-gray-600" }, toDisplayString(formatDateLong(activePeriod.value.startDate)) + " - " + toDisplayString(formatDateLong(activePeriod.value.endDate)), 1)
                          ])
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "relative" }, [
                        createVNode("div", { class: "absolute left-0 top-0 bottom-0 w-1 bg-gray-200" }),
                        createVNode("div", { class: "space-y-6 ml-6" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(periods.value, (period) => {
                            return openBlock(), createBlock("div", {
                              key: period.id,
                              class: "relative"
                            }, [
                              createVNode("div", {
                                class: [
                                  "absolute -left-7-5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2",
                                  period.isActive ? "bg-brand-navy border-brand-navy" : getTimelineStatus(period).isPast ? "bg-gray-300 border-gray-400" : "bg-white border-brand-cyan"
                                ]
                              }, null, 2),
                              createVNode("div", {
                                class: [
                                  "p-4 rounded-lg border-2",
                                  period.isActive ? "border-brand-navy bg-brand-light" : "border-gray-200 bg-white"
                                ]
                              }, [
                                createVNode("div", { class: "flex items-start justify-between" }, [
                                  createVNode("div", { class: "flex-1" }, [
                                    createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                      createVNode("h4", {
                                        class: ["font-bold", period.isActive ? "text-brand-navy" : "text-gray-900"]
                                      }, toDisplayString(period.name), 3),
                                      period.isActive ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
                                      }, " Active ")) : createCommentVNode("", true),
                                      getTimelineStatus(period).isOngoing && !period.isActive ? (openBlock(), createBlock("span", {
                                        key: 1,
                                        class: "px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full"
                                      }, " Ongoing ")) : createCommentVNode("", true),
                                      getTimelineStatus(period).isPast ? (openBlock(), createBlock("span", {
                                        key: 2,
                                        class: "px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
                                      }, " Past ")) : createCommentVNode("", true),
                                      getTimelineStatus(period).isFuture ? (openBlock(), createBlock("span", {
                                        key: 3,
                                        class: "px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                                      }, " Upcoming ")) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm" }, [
                                      createVNode("div", null, [
                                        createVNode("p", { class: "text-gray-500" }, "Duration"),
                                        createVNode("p", { class: "font-medium text-gray-900" }, toDisplayString(formatDateShort(period.startDate)) + " - " + toDisplayString(formatDateShortYear(period.endDate)), 1)
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("p", { class: "text-gray-500" }, "Working Schedule"),
                                        createVNode("p", { class: "font-medium text-gray-900" }, toDisplayString(period.workingDaysPerWeek) + " days/week, " + toDisplayString(period.workingHoursPerDay) + " hrs/day ", 1)
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("p", { class: "text-gray-500" }, "Holidays"),
                                        createVNode("p", { class: "font-medium text-gray-900" }, toDisplayString(period.holidays?.length || 0) + " configured ", 1)
                                      ])
                                    ]),
                                    period.description ? (openBlock(), createBlock("p", {
                                      key: 0,
                                      class: "mt-2 text-sm text-gray-600"
                                    }, toDisplayString(period.description), 1)) : createCommentVNode("", true)
                                  ])
                                ])
                              ], 2)
                            ]);
                          }), 128))
                        ])
                      ]),
                      periods.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "text-center py-12 text-gray-500"
                      }, " No attendance periods configured yet ")) : createCommentVNode("", true)
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
                      createTextVNode("Period Timeline")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  unref(loading) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex flex-col items-center justify-center py-12"
                  }, [
                    createVNode("div", { class: "animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy mb-4" }),
                    createVNode("p", { class: "text-gray-600" }, "Loading timeline...")
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "space-y-4"
                  }, [
                    activePeriod.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-4 bg-brand-light border-l-4 border-brand-navy rounded"
                    }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode(unref(Calendar), { class: "w-5 h-5 text-brand-navy mr-2" }),
                        createVNode("div", null, [
                          createVNode("p", { class: "font-bold text-brand-navy" }, " Active Period: " + toDisplayString(activePeriod.value.name), 1),
                          createVNode("p", { class: "text-sm text-gray-600" }, toDisplayString(formatDateLong(activePeriod.value.startDate)) + " - " + toDisplayString(formatDateLong(activePeriod.value.endDate)), 1)
                        ])
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "relative" }, [
                      createVNode("div", { class: "absolute left-0 top-0 bottom-0 w-1 bg-gray-200" }),
                      createVNode("div", { class: "space-y-6 ml-6" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(periods.value, (period) => {
                          return openBlock(), createBlock("div", {
                            key: period.id,
                            class: "relative"
                          }, [
                            createVNode("div", {
                              class: [
                                "absolute -left-7-5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2",
                                period.isActive ? "bg-brand-navy border-brand-navy" : getTimelineStatus(period).isPast ? "bg-gray-300 border-gray-400" : "bg-white border-brand-cyan"
                              ]
                            }, null, 2),
                            createVNode("div", {
                              class: [
                                "p-4 rounded-lg border-2",
                                period.isActive ? "border-brand-navy bg-brand-light" : "border-gray-200 bg-white"
                              ]
                            }, [
                              createVNode("div", { class: "flex items-start justify-between" }, [
                                createVNode("div", { class: "flex-1" }, [
                                  createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                    createVNode("h4", {
                                      class: ["font-bold", period.isActive ? "text-brand-navy" : "text-gray-900"]
                                    }, toDisplayString(period.name), 3),
                                    period.isActive ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
                                    }, " Active ")) : createCommentVNode("", true),
                                    getTimelineStatus(period).isOngoing && !period.isActive ? (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full"
                                    }, " Ongoing ")) : createCommentVNode("", true),
                                    getTimelineStatus(period).isPast ? (openBlock(), createBlock("span", {
                                      key: 2,
                                      class: "px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
                                    }, " Past ")) : createCommentVNode("", true),
                                    getTimelineStatus(period).isFuture ? (openBlock(), createBlock("span", {
                                      key: 3,
                                      class: "px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                                    }, " Upcoming ")) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm" }, [
                                    createVNode("div", null, [
                                      createVNode("p", { class: "text-gray-500" }, "Duration"),
                                      createVNode("p", { class: "font-medium text-gray-900" }, toDisplayString(formatDateShort(period.startDate)) + " - " + toDisplayString(formatDateShortYear(period.endDate)), 1)
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("p", { class: "text-gray-500" }, "Working Schedule"),
                                      createVNode("p", { class: "font-medium text-gray-900" }, toDisplayString(period.workingDaysPerWeek) + " days/week, " + toDisplayString(period.workingHoursPerDay) + " hrs/day ", 1)
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("p", { class: "text-gray-500" }, "Holidays"),
                                      createVNode("p", { class: "font-medium text-gray-900" }, toDisplayString(period.holidays?.length || 0) + " configured ", 1)
                                    ])
                                  ]),
                                  period.description ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "mt-2 text-sm text-gray-600"
                                  }, toDisplayString(period.description), 1)) : createCommentVNode("", true)
                                ])
                              ])
                            ], 2)
                          ]);
                        }), 128))
                      ])
                    ]),
                    periods.value.length === 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-center py-12 text-gray-500"
                    }, " No attendance periods configured yet ")) : createCommentVNode("", true)
                  ]))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (viewPeriod.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"><div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"><div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between"><h3 class="text-xl font-bold text-gray-900">Period Details</h3><button class="p-2 hover:bg-gray-100 rounded-full transition-colors">`);
        _push(ssrRenderComponent(unref(X), { class: "w-5 h-5 text-gray-500" }, null, _parent));
        _push(`</button></div><div class="p-6 space-y-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-bold text-gray-700 mb-1">Name</label><p class="text-gray-900">${ssrInterpolate(viewPeriod.value.name)}</p></div><div><label class="block text-sm font-bold text-gray-700 mb-1">Status</label><span class="${ssrRenderClass([
          "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
          viewPeriod.value.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
        ])}">${ssrInterpolate(viewPeriod.value.isActive ? "Active" : "Inactive")}</span></div><div><label class="block text-sm font-bold text-gray-700 mb-1">Start Date</label><p class="text-gray-900">${ssrInterpolate(formatDateLong(viewPeriod.value.startDate))}</p></div><div><label class="block text-sm font-bold text-gray-700 mb-1">End Date</label><p class="text-gray-900">${ssrInterpolate(formatDateLong(viewPeriod.value.endDate))}</p></div><div><label class="block text-sm font-bold text-gray-700 mb-1">Working Days Per Week</label><p class="text-gray-900">${ssrInterpolate(viewPeriod.value.workingDaysPerWeek)} days</p></div><div><label class="block text-sm font-bold text-gray-700 mb-1">Working Hours Per Day</label><p class="text-gray-900">${ssrInterpolate(viewPeriod.value.workingHoursPerDay)} hours</p></div><div class="md:col-span-2"><label class="block text-sm font-bold text-gray-700 mb-1">Description</label><p class="text-gray-900">${ssrInterpolate(viewPeriod.value.description || "-")}</p></div><div><label class="block text-sm font-bold text-gray-700 mb-1">Holidays</label><p class="text-gray-900">${ssrInterpolate(viewPeriod.value.holidays?.length || 0)} holidays configured</p></div></div></div><div class="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200">`);
        _push(ssrRenderComponent(_component_UiButton, {
          onClick: ($event) => viewPeriod.value = null,
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
      if (deleteConfirm.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-white rounded-lg p-6 max-w-md w-full mx-4"><h3 class="text-lg font-bold text-gray-900 mb-2">Delete Attendance Period</h3><p class="text-gray-600 mb-6"> Are you sure you want to delete this attendance period? This action cannot be undone. </p><div class="flex justify-end space-x-3">`);
        _push(ssrRenderComponent(_component_UiButton, {
          variant: "secondary",
          onClick: ($event) => deleteConfirm.value = null
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
          variant: "danger",
          onClick: handleDelete
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Delete `);
            } else {
              return [
                createTextVNode(" Delete ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/attendance-periods/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-fKom5L9j.js.map
