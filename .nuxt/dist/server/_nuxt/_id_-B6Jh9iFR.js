import { _ as _sfc_main$1 } from "./Button-gKFWS_xI.js";
import { _ as _sfc_main$2 } from "./Card-CVi1E1xp.js";
import { _ as _sfc_main$3, a as _sfc_main$4 } from "./CardTitle-D9AdQELc.js";
import { _ as _sfc_main$5 } from "./CardContent-BE35Q-6Q.js";
import { _ as _sfc_main$6 } from "./Input-CKYYc_rG.js";
import { _ as _sfc_main$7 } from "./Textarea-6YBrhHFV.js";
import { computed, unref, ref, defineComponent, watch, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, withModifiers, withDirectives, vModelCheckbox, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { K as useAuthStore, u as useRoute, n as useRouter, o as ArrowLeft, P as Plus, b as Calendar, d as Trash2 } from "../server.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/hookable/dist/index.mjs";
import { u as useAttendancePeriod, a as useUpdateAttendancePeriod } from "./useAttendancePeriods-DfCT75w6.js";
import { u as useFetch } from "./fetch-VuP8VKdC.js";
import "./nuxt-link-DsceMx1n.js";
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
import "@vue/shared";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/perfect-debounce/dist/index.mjs";
const useTenantUrl = () => {
  const route = useRoute();
  const tenantSlug = route.params.tenant_slug;
  return (path) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return tenantSlug ? `/api/${tenantSlug}${cleanPath}` : `/api${cleanPath}`;
  };
};
const useHolidays = (attendancePeriodId) => {
  const getUrl = useTenantUrl();
  const authStore = useAuthStore();
  const { data, pending, error, refresh } = useFetch(() => getUrl("/attendance-periods/holidays/list"), {
    key: `holidays-${unref(attendancePeriodId)}`,
    query: computed(() => ({ attendancePeriodId: unref(attendancePeriodId) })),
    immediate: !!unref(attendancePeriodId),
    headers: computed(() => ({
      Authorization: `Bearer ${authStore.token}`
    }))
  }, "$9Uuuwc77my");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const useCreateHoliday = () => {
  const getUrl = useTenantUrl();
  const authStore = useAuthStore();
  const loading = ref(false);
  const mutate = async (data) => {
    loading.value = true;
    try {
      await $fetch(getUrl("/attendance-periods/holidays"), {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      });
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  };
  return {
    mutate,
    loading
  };
};
const useDeleteHoliday = () => {
  const getUrl = useTenantUrl();
  const authStore = useAuthStore();
  const loading = ref(false);
  const mutate = async (id) => {
    loading.value = true;
    try {
      await $fetch(getUrl(`/attendance-periods/holidays/${id}`), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      });
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  };
  return {
    mutate,
    loading
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const tenantSlug = route.params.tenant_slug;
    const id = route.params.id;
    const { data: period, loading: loadingPeriod, error: errorPeriod } = useAttendancePeriod(id);
    const { mutate: updatePeriod, loading: updating } = useUpdateAttendancePeriod();
    const { data: holidays, refresh: refreshHolidays } = useHolidays(id);
    const { mutate: createHoliday } = useCreateHoliday();
    const { mutate: deleteHoliday } = useDeleteHoliday();
    const form = ref({
      name: "",
      startDate: "",
      endDate: "",
      workingDaysPerWeek: 5,
      workingHoursPerDay: 8,
      workingStartTime: "",
      workingEndTime: "",
      allowSaturdayWork: false,
      allowSundayWork: false,
      lateToleranceMinutes: 0,
      earlyLeaveToleranceMinutes: 0,
      description: "",
      isActive: false
    });
    watch(period, (p) => {
      if (p) {
        form.value = {
          name: p.name,
          startDate: p.startDate.split("T")[0],
          endDate: p.endDate.split("T")[0],
          workingDaysPerWeek: p.workingDaysPerWeek,
          workingHoursPerDay: p.workingHoursPerDay,
          workingStartTime: p.workingStartTime,
          workingEndTime: p.workingEndTime,
          allowSaturdayWork: p.allowSaturdayWork,
          allowSundayWork: p.allowSundayWork,
          lateToleranceMinutes: p.lateToleranceMinutes,
          earlyLeaveToleranceMinutes: p.earlyLeaveToleranceMinutes,
          description: p.description || "",
          isActive: p.isActive
        };
      }
    }, { immediate: true });
    const goBack = () => {
      router.push(`/${tenantSlug}/dashboard/attendance-periods`);
    };
    const handleSubmit = async () => {
      if (!form.value.name || !form.value.startDate || !form.value.endDate) {
        alert("Please fill in all required fields");
        return;
      }
      const payload = { ...form.value };
      try {
        await updatePeriod(id, payload);
        alert("Attendance period updated successfully");
      } catch (e) {
        console.error(e);
        alert("Failed to update attendance period");
      }
    };
    const showHolidayForm = ref(false);
    const holidayForm = ref({
      name: "",
      date: "",
      isNational: false,
      isRecurring: false,
      description: ""
    });
    const handleAddHoliday = async () => {
      if (!holidayForm.value.name || !holidayForm.value.date) {
        alert("Name and Date are required");
        return;
      }
      try {
        await createHoliday({
          ...holidayForm.value,
          attendancePeriodId: id,
          description: holidayForm.value.description || null
        });
        holidayForm.value = {
          name: "",
          date: "",
          isNational: false,
          isRecurring: false,
          description: ""
        };
        showHolidayForm.value = false;
        refreshHolidays();
      } catch (e) {
        console.error(e);
        alert("Failed to add holiday");
      }
    };
    const handleDeleteHoliday = async (holidayId) => {
      if (confirm("Are you sure you want to remove this holiday?")) {
        await deleteHoliday(holidayId);
        refreshHolidays();
      }
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_UiCard = _sfc_main$2;
      const _component_UiCardHeader = _sfc_main$3;
      const _component_UiCardTitle = _sfc_main$4;
      const _component_UiCardContent = _sfc_main$5;
      const _component_UiInput = _sfc_main$6;
      const _component_UiTextarea = _sfc_main$7;
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
      _push(`<h2 class="text-2xl font-bold text-gray-900">Edit Attendance Period</h2></div>`);
      if (unref(loadingPeriod)) {
        _push(`<div class="text-center py-12">Loading...</div>`);
      } else if (unref(errorPeriod) || !unref(period)) {
        _push(`<div class="text-center py-12 text-red-500">Error loading period details</div>`);
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Period Details`);
                        } else {
                          return [
                            createTextVNode("Period Details")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Period Details")
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
                    _push3(`<form class="space-y-6"${_scopeId2}><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId2}><div class="md:col-span-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiInput, {
                      label: "Period Name",
                      modelValue: form.value.name,
                      "onUpdate:modelValue": ($event) => form.value.name = $event,
                      required: ""
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(_component_UiInput, {
                      label: "Start Date",
                      type: "date",
                      modelValue: form.value.startDate,
                      "onUpdate:modelValue": ($event) => form.value.startDate = $event,
                      required: ""
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiInput, {
                      label: "End Date",
                      type: "date",
                      modelValue: form.value.endDate,
                      "onUpdate:modelValue": ($event) => form.value.endDate = $event,
                      required: ""
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiInput, {
                      label: "Working Days Per Week",
                      type: "number",
                      min: "1",
                      max: "7",
                      modelValue: form.value.workingDaysPerWeek,
                      "onUpdate:modelValue": ($event) => form.value.workingDaysPerWeek = $event,
                      modelModifiers: { number: true },
                      required: ""
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiInput, {
                      label: "Working Hours Per Day",
                      type: "number",
                      min: "1",
                      max: "24",
                      modelValue: form.value.workingHoursPerDay,
                      "onUpdate:modelValue": ($event) => form.value.workingHoursPerDay = $event,
                      modelModifiers: { number: true },
                      required: ""
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiInput, {
                      label: "Working Start Time",
                      type: "time",
                      modelValue: form.value.workingStartTime,
                      "onUpdate:modelValue": ($event) => form.value.workingStartTime = $event,
                      required: ""
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiInput, {
                      label: "Working End Time",
                      type: "time",
                      modelValue: form.value.workingEndTime,
                      "onUpdate:modelValue": ($event) => form.value.workingEndTime = $event,
                      required: ""
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiInput, {
                      label: "Late Tolerance (Minutes)",
                      type: "number",
                      min: "0",
                      max: "120",
                      modelValue: form.value.lateToleranceMinutes,
                      "onUpdate:modelValue": ($event) => form.value.lateToleranceMinutes = $event,
                      modelModifiers: { number: true },
                      required: ""
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiInput, {
                      label: "Early Leave Tolerance (Minutes)",
                      type: "number",
                      min: "0",
                      max: "120",
                      modelValue: form.value.earlyLeaveToleranceMinutes,
                      "onUpdate:modelValue": ($event) => form.value.earlyLeaveToleranceMinutes = $event,
                      modelModifiers: { number: true },
                      required: ""
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="md:col-span-2 space-y-3"${_scopeId2}><label class="flex items-center space-x-2"${_scopeId2}><input type="checkbox" class="w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan"${ssrIncludeBooleanAttr(Array.isArray(form.value.allowSaturdayWork) ? ssrLooseContain(form.value.allowSaturdayWork, null) : form.value.allowSaturdayWork) ? " checked" : ""}${_scopeId2}><span class="text-sm font-medium text-gray-900"${_scopeId2}>Allow Saturday Work</span></label><label class="flex items-center space-x-2"${_scopeId2}><input type="checkbox" class="w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan"${ssrIncludeBooleanAttr(Array.isArray(form.value.allowSundayWork) ? ssrLooseContain(form.value.allowSundayWork, null) : form.value.allowSundayWork) ? " checked" : ""}${_scopeId2}><span class="text-sm font-medium text-gray-900"${_scopeId2}>Allow Sunday Work</span></label></div><div class="md:col-span-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiTextarea, {
                      label: "Description",
                      placeholder: "Optional description for this period",
                      modelValue: form.value.description,
                      "onUpdate:modelValue": ($event) => form.value.description = $event
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="md:col-span-2"${_scopeId2}><label class="flex items-center space-x-2"${_scopeId2}><input type="checkbox" class="w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan"${ssrIncludeBooleanAttr(Array.isArray(form.value.isActive) ? ssrLooseContain(form.value.isActive, null) : form.value.isActive) ? " checked" : ""}${_scopeId2}><span class="text-sm font-medium text-gray-900"${_scopeId2}>Active Period</span></label></div></div><div class="flex justify-end space-x-4"${_scopeId2}>`);
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
                        onSubmit: withModifiers(handleSubmit, ["prevent"]),
                        class: "space-y-6"
                      }, [
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                          createVNode("div", { class: "md:col-span-2" }, [
                            createVNode(_component_UiInput, {
                              label: "Period Name",
                              modelValue: form.value.name,
                              "onUpdate:modelValue": ($event) => form.value.name = $event,
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode(_component_UiInput, {
                            label: "Start Date",
                            type: "date",
                            modelValue: form.value.startDate,
                            "onUpdate:modelValue": ($event) => form.value.startDate = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_UiInput, {
                            label: "End Date",
                            type: "date",
                            modelValue: form.value.endDate,
                            "onUpdate:modelValue": ($event) => form.value.endDate = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_UiInput, {
                            label: "Working Days Per Week",
                            type: "number",
                            min: "1",
                            max: "7",
                            modelValue: form.value.workingDaysPerWeek,
                            "onUpdate:modelValue": ($event) => form.value.workingDaysPerWeek = $event,
                            modelModifiers: { number: true },
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_UiInput, {
                            label: "Working Hours Per Day",
                            type: "number",
                            min: "1",
                            max: "24",
                            modelValue: form.value.workingHoursPerDay,
                            "onUpdate:modelValue": ($event) => form.value.workingHoursPerDay = $event,
                            modelModifiers: { number: true },
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_UiInput, {
                            label: "Working Start Time",
                            type: "time",
                            modelValue: form.value.workingStartTime,
                            "onUpdate:modelValue": ($event) => form.value.workingStartTime = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_UiInput, {
                            label: "Working End Time",
                            type: "time",
                            modelValue: form.value.workingEndTime,
                            "onUpdate:modelValue": ($event) => form.value.workingEndTime = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_UiInput, {
                            label: "Late Tolerance (Minutes)",
                            type: "number",
                            min: "0",
                            max: "120",
                            modelValue: form.value.lateToleranceMinutes,
                            "onUpdate:modelValue": ($event) => form.value.lateToleranceMinutes = $event,
                            modelModifiers: { number: true },
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_UiInput, {
                            label: "Early Leave Tolerance (Minutes)",
                            type: "number",
                            min: "0",
                            max: "120",
                            modelValue: form.value.earlyLeaveToleranceMinutes,
                            "onUpdate:modelValue": ($event) => form.value.earlyLeaveToleranceMinutes = $event,
                            modelModifiers: { number: true },
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "md:col-span-2 space-y-3" }, [
                            createVNode("label", { class: "flex items-center space-x-2" }, [
                              withDirectives(createVNode("input", {
                                type: "checkbox",
                                class: "w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan",
                                "onUpdate:modelValue": ($event) => form.value.allowSaturdayWork = $event
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelCheckbox, form.value.allowSaturdayWork]
                              ]),
                              createVNode("span", { class: "text-sm font-medium text-gray-900" }, "Allow Saturday Work")
                            ]),
                            createVNode("label", { class: "flex items-center space-x-2" }, [
                              withDirectives(createVNode("input", {
                                type: "checkbox",
                                class: "w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan",
                                "onUpdate:modelValue": ($event) => form.value.allowSundayWork = $event
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelCheckbox, form.value.allowSundayWork]
                              ]),
                              createVNode("span", { class: "text-sm font-medium text-gray-900" }, "Allow Sunday Work")
                            ])
                          ]),
                          createVNode("div", { class: "md:col-span-2" }, [
                            createVNode(_component_UiTextarea, {
                              label: "Description",
                              placeholder: "Optional description for this period",
                              modelValue: form.value.description,
                              "onUpdate:modelValue": ($event) => form.value.description = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "md:col-span-2" }, [
                            createVNode("label", { class: "flex items-center space-x-2" }, [
                              withDirectives(createVNode("input", {
                                type: "checkbox",
                                class: "w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan",
                                "onUpdate:modelValue": ($event) => form.value.isActive = $event
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelCheckbox, form.value.isActive]
                              ]),
                              createVNode("span", { class: "text-sm font-medium text-gray-900" }, "Active Period")
                            ])
                          ])
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
                        createTextVNode("Period Details")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("form", {
                      onSubmit: withModifiers(handleSubmit, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", { class: "md:col-span-2" }, [
                          createVNode(_component_UiInput, {
                            label: "Period Name",
                            modelValue: form.value.name,
                            "onUpdate:modelValue": ($event) => form.value.name = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(_component_UiInput, {
                          label: "Start Date",
                          type: "date",
                          modelValue: form.value.startDate,
                          "onUpdate:modelValue": ($event) => form.value.startDate = $event,
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UiInput, {
                          label: "End Date",
                          type: "date",
                          modelValue: form.value.endDate,
                          "onUpdate:modelValue": ($event) => form.value.endDate = $event,
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UiInput, {
                          label: "Working Days Per Week",
                          type: "number",
                          min: "1",
                          max: "7",
                          modelValue: form.value.workingDaysPerWeek,
                          "onUpdate:modelValue": ($event) => form.value.workingDaysPerWeek = $event,
                          modelModifiers: { number: true },
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UiInput, {
                          label: "Working Hours Per Day",
                          type: "number",
                          min: "1",
                          max: "24",
                          modelValue: form.value.workingHoursPerDay,
                          "onUpdate:modelValue": ($event) => form.value.workingHoursPerDay = $event,
                          modelModifiers: { number: true },
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UiInput, {
                          label: "Working Start Time",
                          type: "time",
                          modelValue: form.value.workingStartTime,
                          "onUpdate:modelValue": ($event) => form.value.workingStartTime = $event,
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UiInput, {
                          label: "Working End Time",
                          type: "time",
                          modelValue: form.value.workingEndTime,
                          "onUpdate:modelValue": ($event) => form.value.workingEndTime = $event,
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UiInput, {
                          label: "Late Tolerance (Minutes)",
                          type: "number",
                          min: "0",
                          max: "120",
                          modelValue: form.value.lateToleranceMinutes,
                          "onUpdate:modelValue": ($event) => form.value.lateToleranceMinutes = $event,
                          modelModifiers: { number: true },
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UiInput, {
                          label: "Early Leave Tolerance (Minutes)",
                          type: "number",
                          min: "0",
                          max: "120",
                          modelValue: form.value.earlyLeaveToleranceMinutes,
                          "onUpdate:modelValue": ($event) => form.value.earlyLeaveToleranceMinutes = $event,
                          modelModifiers: { number: true },
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "md:col-span-2 space-y-3" }, [
                          createVNode("label", { class: "flex items-center space-x-2" }, [
                            withDirectives(createVNode("input", {
                              type: "checkbox",
                              class: "w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan",
                              "onUpdate:modelValue": ($event) => form.value.allowSaturdayWork = $event
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, form.value.allowSaturdayWork]
                            ]),
                            createVNode("span", { class: "text-sm font-medium text-gray-900" }, "Allow Saturday Work")
                          ]),
                          createVNode("label", { class: "flex items-center space-x-2" }, [
                            withDirectives(createVNode("input", {
                              type: "checkbox",
                              class: "w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan",
                              "onUpdate:modelValue": ($event) => form.value.allowSundayWork = $event
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, form.value.allowSundayWork]
                            ]),
                            createVNode("span", { class: "text-sm font-medium text-gray-900" }, "Allow Sunday Work")
                          ])
                        ]),
                        createVNode("div", { class: "md:col-span-2" }, [
                          createVNode(_component_UiTextarea, {
                            label: "Description",
                            placeholder: "Optional description for this period",
                            modelValue: form.value.description,
                            "onUpdate:modelValue": ($event) => form.value.description = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "md:col-span-2" }, [
                          createVNode("label", { class: "flex items-center space-x-2" }, [
                            withDirectives(createVNode("input", {
                              type: "checkbox",
                              class: "w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan",
                              "onUpdate:modelValue": ($event) => form.value.isActive = $event
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, form.value.isActive]
                            ]),
                            createVNode("span", { class: "text-sm font-medium text-gray-900" }, "Active Period")
                          ])
                        ])
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
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-center justify-between" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Holidays`);
                        } else {
                          return [
                            createTextVNode("Holidays")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiButton, {
                      onClick: ($event) => showHolidayForm.value = !showHolidayForm.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent4, _scopeId3));
                          _push4(` Add Holiday `);
                        } else {
                          return [
                            createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Add Holiday ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Holidays")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiButton, {
                        onClick: ($event) => showHolidayForm.value = !showHolidayForm.value
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Add Holiday ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (showHolidayForm.value) {
                      _push3(`<div class="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50"${_scopeId2}><h4 class="font-bold text-gray-900 mb-4"${_scopeId2}>New Holiday</h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiInput, {
                        label: "Holiday Name",
                        modelValue: holidayForm.value.name,
                        "onUpdate:modelValue": ($event) => holidayForm.value.name = $event
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiInput, {
                        label: "Date",
                        type: "date",
                        modelValue: holidayForm.value.date,
                        "onUpdate:modelValue": ($event) => holidayForm.value.date = $event
                      }, null, _parent3, _scopeId2));
                      _push3(`<div class="md:col-span-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiInput, {
                        label: "Description",
                        modelValue: holidayForm.value.description,
                        "onUpdate:modelValue": ($event) => holidayForm.value.description = $event
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><div class="flex items-center space-x-4"${_scopeId2}><label class="flex items-center space-x-2"${_scopeId2}><input type="checkbox" class="w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan"${ssrIncludeBooleanAttr(Array.isArray(holidayForm.value.isNational) ? ssrLooseContain(holidayForm.value.isNational, null) : holidayForm.value.isNational) ? " checked" : ""}${_scopeId2}><span class="text-sm font-medium text-gray-900"${_scopeId2}>National Holiday</span></label><label class="flex items-center space-x-2"${_scopeId2}><input type="checkbox" class="w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan"${ssrIncludeBooleanAttr(Array.isArray(holidayForm.value.isRecurring) ? ssrLooseContain(holidayForm.value.isRecurring, null) : holidayForm.value.isRecurring) ? " checked" : ""}${_scopeId2}><span class="text-sm font-medium text-gray-900"${_scopeId2}>Recurring</span></label></div></div><div class="flex justify-end space-x-2 mt-4"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiButton, {
                        variant: "secondary",
                        onClick: ($event) => showHolidayForm.value = false
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
                      _push3(ssrRenderComponent(_component_UiButton, { onClick: handleAddHoliday }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Add Holiday `);
                          } else {
                            return [
                              createTextVNode(" Add Holiday ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="overflow-x-auto"${_scopeId2}><table class="min-w-full divide-y divide-gray-200"${_scopeId2}><thead class="bg-gray-50"${_scopeId2}><tr${_scopeId2}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Name</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Date</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Type</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Actions</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId2}>`);
                    if (unref(holidays) && unref(holidays).length > 0) {
                      _push3(`<!--[-->`);
                      ssrRenderList(unref(holidays), (holiday) => {
                        _push3(`<tr class="hover:bg-gray-50"${_scopeId2}><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"${_scopeId2}><div class="flex items-center"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(Calendar), { class: "w-4 h-4 mr-2 text-gray-400" }, null, _parent3, _scopeId2));
                        _push3(` ${ssrInterpolate(holiday.name)}</div></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"${_scopeId2}>${ssrInterpolate(formatDate(holiday.date))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"${_scopeId2}><div class="flex gap-2"${_scopeId2}>`);
                        if (holiday.isNational) {
                          _push3(`<span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded"${_scopeId2}> National </span>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        if (holiday.isRecurring) {
                          _push3(`<span class="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded"${_scopeId2}> Recurring </span>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div></td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_UiButton, {
                          variant: "danger",
                          class: "p-2",
                          onClick: ($event) => handleDeleteHoliday(holiday.id),
                          title: "Delete Holiday"
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
                        _push3(`</td></tr>`);
                      });
                      _push3(`<!--]-->`);
                    } else {
                      _push3(`<tr${_scopeId2}><td colspan="4" class="px-6 py-8 text-center text-gray-500"${_scopeId2}> No holidays configured for this period </td></tr>`);
                    }
                    _push3(`</tbody></table></div>`);
                  } else {
                    return [
                      showHolidayForm.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50"
                      }, [
                        createVNode("h4", { class: "font-bold text-gray-900 mb-4" }, "New Holiday"),
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                          createVNode(_component_UiInput, {
                            label: "Holiday Name",
                            modelValue: holidayForm.value.name,
                            "onUpdate:modelValue": ($event) => holidayForm.value.name = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_UiInput, {
                            label: "Date",
                            type: "date",
                            modelValue: holidayForm.value.date,
                            "onUpdate:modelValue": ($event) => holidayForm.value.date = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "md:col-span-2" }, [
                            createVNode(_component_UiInput, {
                              label: "Description",
                              modelValue: holidayForm.value.description,
                              "onUpdate:modelValue": ($event) => holidayForm.value.description = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "flex items-center space-x-4" }, [
                            createVNode("label", { class: "flex items-center space-x-2" }, [
                              withDirectives(createVNode("input", {
                                type: "checkbox",
                                class: "w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan",
                                "onUpdate:modelValue": ($event) => holidayForm.value.isNational = $event
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelCheckbox, holidayForm.value.isNational]
                              ]),
                              createVNode("span", { class: "text-sm font-medium text-gray-900" }, "National Holiday")
                            ]),
                            createVNode("label", { class: "flex items-center space-x-2" }, [
                              withDirectives(createVNode("input", {
                                type: "checkbox",
                                class: "w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan",
                                "onUpdate:modelValue": ($event) => holidayForm.value.isRecurring = $event
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelCheckbox, holidayForm.value.isRecurring]
                              ]),
                              createVNode("span", { class: "text-sm font-medium text-gray-900" }, "Recurring")
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "flex justify-end space-x-2 mt-4" }, [
                          createVNode(_component_UiButton, {
                            variant: "secondary",
                            onClick: ($event) => showHolidayForm.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Cancel ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, { onClick: handleAddHoliday }, {
                            default: withCtx(() => [
                              createTextVNode(" Add Holiday ")
                            ]),
                            _: 1
                          })
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Name"),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Date"),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Type"),
                              createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase" }, "Actions")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            unref(holidays) && unref(holidays).length > 0 ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(holidays), (holiday) => {
                              return openBlock(), createBlock("tr", {
                                key: holiday.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" }, [
                                  createVNode("div", { class: "flex items-center" }, [
                                    createVNode(unref(Calendar), { class: "w-4 h-4 mr-2 text-gray-400" }),
                                    createTextVNode(" " + toDisplayString(holiday.name), 1)
                                  ])
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(formatDate(holiday.date)), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, [
                                  createVNode("div", { class: "flex gap-2" }, [
                                    holiday.isNational ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded"
                                    }, " National ")) : createCommentVNode("", true),
                                    holiday.isRecurring ? (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded"
                                    }, " Recurring ")) : createCommentVNode("", true)
                                  ])
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                                  createVNode(_component_UiButton, {
                                    variant: "danger",
                                    class: "p-2",
                                    onClick: ($event) => handleDeleteHoliday(holiday.id),
                                    title: "Delete Holiday"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Trash2), { class: "w-4 h-4" })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ])
                              ]);
                            }), 128)) : (openBlock(), createBlock("tr", { key: 1 }, [
                              createVNode("td", {
                                colspan: "4",
                                class: "px-6 py-8 text-center text-gray-500"
                              }, " No holidays configured for this period ")
                            ]))
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
                createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between" }, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Holidays")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiButton, {
                      onClick: ($event) => showHolidayForm.value = !showHolidayForm.value
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Add Holiday ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    showHolidayForm.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50"
                    }, [
                      createVNode("h4", { class: "font-bold text-gray-900 mb-4" }, "New Holiday"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode(_component_UiInput, {
                          label: "Holiday Name",
                          modelValue: holidayForm.value.name,
                          "onUpdate:modelValue": ($event) => holidayForm.value.name = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UiInput, {
                          label: "Date",
                          type: "date",
                          modelValue: holidayForm.value.date,
                          "onUpdate:modelValue": ($event) => holidayForm.value.date = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "md:col-span-2" }, [
                          createVNode(_component_UiInput, {
                            label: "Description",
                            modelValue: holidayForm.value.description,
                            "onUpdate:modelValue": ($event) => holidayForm.value.description = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "flex items-center space-x-4" }, [
                          createVNode("label", { class: "flex items-center space-x-2" }, [
                            withDirectives(createVNode("input", {
                              type: "checkbox",
                              class: "w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan",
                              "onUpdate:modelValue": ($event) => holidayForm.value.isNational = $event
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, holidayForm.value.isNational]
                            ]),
                            createVNode("span", { class: "text-sm font-medium text-gray-900" }, "National Holiday")
                          ]),
                          createVNode("label", { class: "flex items-center space-x-2" }, [
                            withDirectives(createVNode("input", {
                              type: "checkbox",
                              class: "w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan",
                              "onUpdate:modelValue": ($event) => holidayForm.value.isRecurring = $event
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, holidayForm.value.isRecurring]
                            ]),
                            createVNode("span", { class: "text-sm font-medium text-gray-900" }, "Recurring")
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "flex justify-end space-x-2 mt-4" }, [
                        createVNode(_component_UiButton, {
                          variant: "secondary",
                          onClick: ($event) => showHolidayForm.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Cancel ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, { onClick: handleAddHoliday }, {
                          default: withCtx(() => [
                            createTextVNode(" Add Holiday ")
                          ]),
                          _: 1
                        })
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                        createVNode("thead", { class: "bg-gray-50" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Name"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Date"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Type"),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase" }, "Actions")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                          unref(holidays) && unref(holidays).length > 0 ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(holidays), (holiday) => {
                            return openBlock(), createBlock("tr", {
                              key: holiday.id,
                              class: "hover:bg-gray-50"
                            }, [
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" }, [
                                createVNode("div", { class: "flex items-center" }, [
                                  createVNode(unref(Calendar), { class: "w-4 h-4 mr-2 text-gray-400" }),
                                  createTextVNode(" " + toDisplayString(holiday.name), 1)
                                ])
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(formatDate(holiday.date)), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, [
                                createVNode("div", { class: "flex gap-2" }, [
                                  holiday.isNational ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded"
                                  }, " National ")) : createCommentVNode("", true),
                                  holiday.isRecurring ? (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded"
                                  }, " Recurring ")) : createCommentVNode("", true)
                                ])
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                                createVNode(_component_UiButton, {
                                  variant: "danger",
                                  class: "p-2",
                                  onClick: ($event) => handleDeleteHoliday(holiday.id),
                                  title: "Delete Holiday"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Trash2), { class: "w-4 h-4" })
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ])
                            ]);
                          }), 128)) : (openBlock(), createBlock("tr", { key: 1 }, [
                            createVNode("td", {
                              colspan: "4",
                              class: "px-6 py-8 text-center text-gray-500"
                            }, " No holidays configured for this period ")
                          ]))
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
        _push(`<!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/attendance-periods/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_id_-B6Jh9iFR.js.map
