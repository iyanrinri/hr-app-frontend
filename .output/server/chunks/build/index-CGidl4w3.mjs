import { _ as _sfc_main$1 } from './Button-gKFWS_xI.mjs';
import { _ as _sfc_main$2 } from './Card-CVi1E1xp.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$3 } from './CardTitle-D9AdQELc.mjs';
import { _ as _sfc_main$4 } from './CardContent-BE35Q-6Q.mjs';
import { _ as _sfc_main$5 } from './Input-CKYYc_rG.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useRoute, n as useRouter, o as ArrowLeft } from './server.mjs';
import { h as useCreateEmployee } from './useEmployees-CEaIsP48.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const tenantSlug = route.params.tenant_slug;
    const { mutate: createEmployee, loading } = useCreateEmployee();
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
    const goBack = () => {
      router.push(`/${tenantSlug}/dashboard/employees`);
    };
    const handleSubmit = async () => {
      if (!form.value.firstName || !form.value.lastName || !form.value.email || !form.value.password || !form.value.position || !form.value.department || !form.value.joinDate) {
        alert("Please fill in all required fields");
        return;
      }
      const payload = {
        ...form.value,
        joinDate: new Date(form.value.joinDate).toISOString()
      };
      try {
        await createEmployee(payload);
        goBack();
      } catch (e) {
        console.error(e);
        alert("Failed to create employee");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_UiCard = _sfc_main$2;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$3;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiInput = _sfc_main$5;
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
      _push(`<h2 class="text-2xl font-bold text-gray-900">Add New Employee</h2></div>`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Employee Details`);
                      } else {
                        return [
                          createTextVNode("Employee Details")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Employee Details")
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
                    label: "Password",
                    type: "password",
                    modelValue: form.value.password,
                    "onUpdate:modelValue": ($event) => form.value.password = $event,
                    required: ""
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
                    disabled: unref(loading)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(loading) ? "Creating..." : "Create Employee")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(loading) ? "Creating..." : "Create Employee"), 1)
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
                          label: "Password",
                          type: "password",
                          modelValue: form.value.password,
                          "onUpdate:modelValue": ($event) => form.value.password = $event,
                          required: ""
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
                          disabled: unref(loading)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(loading) ? "Creating..." : "Create Employee"), 1)
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
                      createTextVNode("Employee Details")
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
                        label: "Password",
                        type: "password",
                        modelValue: form.value.password,
                        "onUpdate:modelValue": ($event) => form.value.password = $event,
                        required: ""
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
                        disabled: unref(loading)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(loading) ? "Creating..." : "Create Employee"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/employees/create/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CGidl4w3.mjs.map
