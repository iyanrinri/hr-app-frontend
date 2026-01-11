import { _ as _sfc_main$1 } from './Button-gKFWS_xI.mjs';
import { _ as _sfc_main$2 } from './Card-CVi1E1xp.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$3 } from './CardTitle-D9AdQELc.mjs';
import { _ as _sfc_main$4 } from './CardContent-BE35Q-6Q.mjs';
import { _ as _sfc_main$5 } from './Input-CKYYc_rG.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, withModifiers, withDirectives, vModelText, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { p as useCreateLeavePeriod } from './useLeaves-DMmgn55L.mjs';
import { o as ArrowLeft } from './server.mjs';
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
import './fetch-VuP8VKdC.mjs';
import '@vue/shared';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'uuid';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const route = useRoute();
    const tenantSlug = route.params.tenant_slug;
    const { mutate: createPeriod, loading: isPending } = useCreateLeavePeriod();
    const form = ref({
      name: "",
      startDate: "",
      endDate: "",
      description: ""
    });
    const errors = ref({});
    const validate = () => {
      errors.value = {};
      if (!form.value.name || form.value.name.length < 3) errors.value.name = "Name is required (min 3 chars)";
      if (!form.value.startDate) errors.value.startDate = "Start date is required";
      if (!form.value.endDate) errors.value.endDate = "End date is required";
      return Object.keys(errors.value).length === 0;
    };
    const onSubmit = async () => {
      if (!validate()) return;
      try {
        await createPeriod(form.value);
        router.push(`/${tenantSlug}/dashboard/leaves/periods`);
      } catch (e) {
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_UiCard = _sfc_main$2;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$3;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiInput = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 max-w-2xl mx-auto" }, _attrs))}><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_UiButton, {
        variant: "ghost",
        onClick: ($event) => unref(router).back()
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
      _push(`<h2 className="text-2xl font-bold text-gray-900">Create Leave Period</h2></div>`);
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
                  _push3(`<form class="space-y-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiInput, {
                    label: "Period Name (e.g. Annual Leave 2025)",
                    modelValue: form.value.name,
                    "onUpdate:modelValue": ($event) => form.value.name = $event,
                    error: errors.value.name
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="grid grid-cols-2 gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiInput, {
                    label: "Start Date",
                    type: "date",
                    modelValue: form.value.startDate,
                    "onUpdate:modelValue": ($event) => form.value.startDate = $event,
                    error: errors.value.startDate
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    label: "End Date",
                    type: "date",
                    modelValue: form.value.endDate,
                    "onUpdate:modelValue": ($event) => form.value.endDate = $event,
                    error: errors.value.endDate
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-1"${_scopeId2}><label class="text-sm font-medium text-gray-700"${_scopeId2}>Description</label><textarea class="w-full min-h-[100px] border border-gray-300 rounded-md p-2 focus:ring-brand-navy focus:border-brand-navy" placeholder="Optional description..."${_scopeId2}>${ssrInterpolate(form.value.description)}</textarea></div><div class="flex justify-end gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiButton, {
                    type: "button",
                    variant: "secondary",
                    onClick: ($event) => unref(router).back()
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Cancel`);
                      } else {
                        return [
                          createTextVNode("Cancel")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiButton, {
                    type: "submit",
                    disabled: unref(isPending)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(isPending)) {
                          _push4(`<span class="mr-2"${_scopeId3}>Loading...</span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(` Create Period `);
                      } else {
                        return [
                          unref(isPending) ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "mr-2"
                          }, "Loading...")) : createCommentVNode("", true),
                          createTextVNode(" Create Period ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></form>`);
                } else {
                  return [
                    createVNode("form", {
                      onSubmit: withModifiers(onSubmit, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode(_component_UiInput, {
                        label: "Period Name (e.g. Annual Leave 2025)",
                        modelValue: form.value.name,
                        "onUpdate:modelValue": ($event) => form.value.name = $event,
                        error: errors.value.name
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                      createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                        createVNode(_component_UiInput, {
                          label: "Start Date",
                          type: "date",
                          modelValue: form.value.startDate,
                          "onUpdate:modelValue": ($event) => form.value.startDate = $event,
                          error: errors.value.startDate
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                        createVNode(_component_UiInput, {
                          label: "End Date",
                          type: "date",
                          modelValue: form.value.endDate,
                          "onUpdate:modelValue": ($event) => form.value.endDate = $event,
                          error: errors.value.endDate
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                      ]),
                      createVNode("div", { class: "space-y-1" }, [
                        createVNode("label", { class: "text-sm font-medium text-gray-700" }, "Description"),
                        withDirectives(createVNode("textarea", {
                          class: "w-full min-h-[100px] border border-gray-300 rounded-md p-2 focus:ring-brand-navy focus:border-brand-navy",
                          placeholder: "Optional description...",
                          "onUpdate:modelValue": ($event) => form.value.description = $event
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, form.value.description]
                        ])
                      ]),
                      createVNode("div", { class: "flex justify-end gap-3" }, [
                        createVNode(_component_UiButton, {
                          type: "button",
                          variant: "secondary",
                          onClick: ($event) => unref(router).back()
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, {
                          type: "submit",
                          disabled: unref(isPending)
                        }, {
                          default: withCtx(() => [
                            unref(isPending) ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "mr-2"
                            }, "Loading...")) : createCommentVNode("", true),
                            createTextVNode(" Create Period ")
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
                    onSubmit: withModifiers(onSubmit, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode(_component_UiInput, {
                      label: "Period Name (e.g. Annual Leave 2025)",
                      modelValue: form.value.name,
                      "onUpdate:modelValue": ($event) => form.value.name = $event,
                      error: errors.value.name
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                    createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                      createVNode(_component_UiInput, {
                        label: "Start Date",
                        type: "date",
                        modelValue: form.value.startDate,
                        "onUpdate:modelValue": ($event) => form.value.startDate = $event,
                        error: errors.value.startDate
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                      createVNode(_component_UiInput, {
                        label: "End Date",
                        type: "date",
                        modelValue: form.value.endDate,
                        "onUpdate:modelValue": ($event) => form.value.endDate = $event,
                        error: errors.value.endDate
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                    ]),
                    createVNode("div", { class: "space-y-1" }, [
                      createVNode("label", { class: "text-sm font-medium text-gray-700" }, "Description"),
                      withDirectives(createVNode("textarea", {
                        class: "w-full min-h-[100px] border border-gray-300 rounded-md p-2 focus:ring-brand-navy focus:border-brand-navy",
                        placeholder: "Optional description...",
                        "onUpdate:modelValue": ($event) => form.value.description = $event
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, form.value.description]
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-end gap-3" }, [
                      createVNode(_component_UiButton, {
                        type: "button",
                        variant: "secondary",
                        onClick: ($event) => unref(router).back()
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Cancel")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_UiButton, {
                        type: "submit",
                        disabled: unref(isPending)
                      }, {
                        default: withCtx(() => [
                          unref(isPending) ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "mr-2"
                          }, "Loading...")) : createCommentVNode("", true),
                          createTextVNode(" Create Period ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/leaves/periods/create/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BVAlYwNE.mjs.map
