import { _ as _sfc_main$1 } from "./Button-gKFWS_xI.js";
import { _ as _sfc_main$2 } from "./Card-CVi1E1xp.js";
import { _ as _sfc_main$3, a as _sfc_main$4 } from "./CardTitle-D9AdQELc.js";
import { _ as _sfc_main$5 } from "./CardContent-BE35Q-6Q.js";
import { _ as _sfc_main$6 } from "./Input-CKYYc_rG.js";
import { _ as _sfc_main$7 } from "./Textarea-6YBrhHFV.js";
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, withModifiers, withDirectives, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrInterpolate } from "vue/server-renderer";
import { u as useRoute, n as useRouter, o as ArrowLeft } from "../server.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/hookable/dist/index.mjs";
import { d as useCreateAttendancePeriod } from "./useAttendancePeriods-DfCT75w6.js";
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
import "./fetch-VuP8VKdC.js";
import "@vue/shared";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "create",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const tenantSlug = route.params.tenant_slug;
    const { mutate: createPeriod, loading } = useCreateAttendancePeriod();
    const form = ref({
      name: "",
      startDate: "",
      endDate: "",
      workingDaysPerWeek: 5,
      workingHoursPerDay: 8,
      workingStartTime: "09:00",
      workingEndTime: "17:00",
      allowSaturdayWork: false,
      allowSundayWork: false,
      lateToleranceMinutes: 15,
      earlyLeaveToleranceMinutes: 15,
      description: "",
      isActive: true
      // holidays: [] // optional
    });
    const goBack = () => {
      router.push(`/${tenantSlug}/dashboard/attendance-periods`);
    };
    const handleSubmit = async () => {
      if (!form.value.name || !form.value.startDate || !form.value.endDate) {
        alert("Please fill in all required fields");
        return;
      }
      if (new Date(form.value.endDate) <= new Date(form.value.startDate)) {
        alert("End date must be after start date");
        return;
      }
      const payload = { ...form.value };
      if (!payload.description) delete payload.description;
      try {
        await createPeriod(payload);
        goBack();
      } catch (e) {
        console.error(e);
        alert("Failed to create attendance period");
      }
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
      _push(`<h2 class="text-2xl font-bold text-gray-900">Create Attendance Period</h2></div>`);
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
                    placeholder: "e.g., January 2024",
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
                  _push3(`</div><div class="md:col-span-2"${_scopeId2}><label class="flex items-center space-x-2"${_scopeId2}><input type="checkbox" class="w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan"${ssrIncludeBooleanAttr(Array.isArray(form.value.isActive) ? ssrLooseContain(form.value.isActive, null) : form.value.isActive) ? " checked" : ""}${_scopeId2}><span class="text-sm font-medium text-gray-900"${_scopeId2}>Set as Active Period</span></label></div></div><div class="flex justify-end space-x-4"${_scopeId2}>`);
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
                    disabled: unref(loading)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(loading) ? "Creating..." : "Create Period")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(loading) ? "Creating..." : "Create Period"), 1)
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
                            placeholder: "e.g., January 2024",
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
                            createVNode("span", { class: "text-sm font-medium text-gray-900" }, "Set as Active Period")
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
                          disabled: unref(loading)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(loading) ? "Creating..." : "Create Period"), 1)
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
                          placeholder: "e.g., January 2024",
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
                          createVNode("span", { class: "text-sm font-medium text-gray-900" }, "Set as Active Period")
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
                        disabled: unref(loading)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(loading) ? "Creating..." : "Create Period"), 1)
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/attendance-periods/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=create-CVk6NrUe.js.map
