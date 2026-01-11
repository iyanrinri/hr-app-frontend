import { ref, computed, unref, defineComponent, watch, mergeProps, useSSRContext, createVNode, resolveDynamicComponent } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrRenderDynamicModel, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderVNode } from "vue/server-renderer";
import { u as useRoute, p as LoaderCircle, q as Save, r as __nuxt_component_0, s as Settings, B as Building2, b as Calendar, v as Bell, S as Shield } from "../server.mjs";
import { u as useFetch, r as refreshNuxtData } from "./fetch-VuP8VKdC.js";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/hookable/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/klona/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/destr/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ohash/dist/index.mjs";
import "uuid";
import "@vue/shared";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/perfect-debounce/dist/index.mjs";
var SettingCategory = /* @__PURE__ */ ((SettingCategory2) => {
  SettingCategory2["COMPANY"] = "COMPANY";
  SettingCategory2["ATTENDANCE"] = "ATTENDANCE";
  SettingCategory2["GENERAL"] = "GENERAL";
  SettingCategory2["NOTIFICATION"] = "NOTIFICATION";
  SettingCategory2["SECURITY"] = "SECURITY";
  return SettingCategory2;
})(SettingCategory || {});
var SettingDataType = /* @__PURE__ */ ((SettingDataType2) => {
  SettingDataType2["STRING"] = "STRING";
  SettingDataType2["BOOLEAN"] = "BOOLEAN";
  SettingDataType2["NUMBER"] = "NUMBER";
  SettingDataType2["JSON"] = "JSON";
  return SettingDataType2;
})(SettingDataType || {});
const useTenantUrl = () => {
  const route = useRoute();
  const tenantSlug = route.params.tenant_slug;
  return (path) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return tenantSlug ? `/api/${tenantSlug}${cleanPath}` : `/api${cleanPath}`;
  };
};
const useSettings = (page = 1, limit = 20, category, isPublic) => {
  const getUrl = useTenantUrl();
  const queryParams = computed(() => {
    const params = {
      page: unref(page),
      limit: unref(limit)
    };
    if (unref(category)) params.category = unref(category);
    if (unref(isPublic) !== void 0) params.isPublic = unref(isPublic);
    return params;
  });
  const key = computed(() => `settings-${unref(page)}-${unref(limit)}-${unref(category)}-${unref(isPublic)}`);
  const { data, pending, error, refresh } = useFetch(() => getUrl("/settings"), {
    key: key.value,
    query: queryParams,
    watch: [queryParams],
    server: false
  }, "$U09R3Uuj5h");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const useUpdateSetting = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (payload) => {
    loading.value = true;
    try {
      await $fetch(getUrl(`/settings/${payload.key}`), {
        method: "PATCH",
        body: { value: payload.value }
      });
      refreshNuxtData((key) => typeof key === "string" && key.startsWith("settings-"));
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
const useInitializeSettings = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async () => {
    loading.value = true;
    try {
      await $fetch(getUrl("/settings/initialize"), {
        method: "POST"
      });
      refreshNuxtData((key) => typeof key === "string" && key.startsWith("settings-"));
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
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SettingItem",
  __ssrInlineRender: true,
  props: {
    setting: {}
  },
  setup(__props) {
    const props = __props;
    const { loading: isUpdating } = useUpdateSetting();
    const value = ref(props.setting.value);
    const isDirty = ref(false);
    watch(() => props.setting.value, (newVal) => {
      value.value = newVal;
      isDirty.value = false;
    });
    const formatSettingName = (key) => {
      return key.replace(/_/g, " ").replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).trim();
    };
    const isBoolean = props.setting.dataType === SettingDataType.BOOLEAN;
    const isTrue = computed(() => String(value.value) === "true" || value.value === true);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors" }, _attrs))}><div class="flex items-start justify-between mb-2"><div><label class="block text-sm font-semibold text-gray-900">${ssrInterpolate(formatSettingName(__props.setting.key))}</label><p class="text-xs text-gray-500 mt-1">${ssrInterpolate(__props.setting.description)}</p></div></div><div class="mt-3 flex items-center gap-3">`);
      if (isBoolean) {
        _push(`<div class="flex items-center"><button type="button" class="${ssrRenderClass([
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2",
          isTrue.value ? "bg-brand-navy" : "bg-gray-200"
        ])}"><span class="${ssrRenderClass([
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          isTrue.value ? "translate-x-5" : "translate-x-0"
        ])}"></span></button><span class="ml-3 text-sm text-gray-900">${ssrInterpolate(isTrue.value ? "Enabled" : "Disabled")} `);
        if (unref(isUpdating)) {
          _push(ssrRenderComponent(unref(LoaderCircle), { class: "w-3 h-3 animate-spin inline ml-2" }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</span></div>`);
      } else {
        _push(`<div class="flex-1 flex gap-2"><input${ssrRenderAttr("type", __props.setting.dataType === unref(SettingDataType).NUMBER ? "number" : "text")}${ssrRenderDynamicModel(__props.setting.dataType === unref(SettingDataType).NUMBER ? "number" : "text", value.value, null)} class="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-navy focus:ring-brand-navy sm:text-sm p-2 border"${ssrRenderAttr("placeholder", __props.setting.description)}>`);
        if (isDirty.value) {
          _push(`<button${ssrIncludeBooleanAttr(unref(isUpdating)) ? " disabled" : ""} class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-brand-navy hover:bg-brand-navy/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy disabled:opacity-50">`);
          if (unref(isUpdating)) {
            _push(ssrRenderComponent(unref(LoaderCircle), { class: "w-4 h-4 animate-spin" }, null, _parent));
          } else {
            _push(ssrRenderComponent(unref(Save), { class: "w-4 h-4" }, null, _parent));
          }
          _push(`</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/SettingItem.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AttendanceMap",
  __ssrInlineRender: true,
  props: {
    latitude: {},
    longitude: {},
    radius: {}
  },
  emits: ["locationSelect"],
  setup(__props, { emit: __emit }) {
    ref(null);
    const props = __props;
    ref(15);
    const hasLocation = computed(() => !!(props.latitude && props.longitude));
    const currentPosition = ref(
      hasLocation.value ? [props.latitude, props.longitude] : [-6.2088, 106.8456]
    );
    watch(() => [props.latitude, props.longitude], ([newLat, newLng]) => {
      if (newLat && newLng) {
        currentPosition.value = [newLat, newLng];
      }
    });
    const pendingLocation = ref(null);
    const center = ref(currentPosition.value);
    watch(currentPosition, (newPos) => {
      if (!pendingLocation.value) {
        center.value = newPos;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4 relative" }, _attrs))}><div class="h-[400px] w-full rounded-lg overflow-hidden border border-gray-300 relative z-0">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      if (pendingLocation.value) {
        _push(`<div class="absolute inset-0 z-[1000] flex items-end justify-center pb-6 bg-black/10 pointer-events-none"><div class="bg-white p-4 rounded-lg shadow-lg pointer-events-auto flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-4"><p class="text-sm font-medium text-gray-900">Update Check Point Location?</p><div class="flex gap-2"><button class="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors pointer-events-auto"> Cancel </button><button class="px-3 py-1.5 text-xs font-medium text-white bg-brand-navy hover:opacity-90 rounded-md transition-colors pointer-events-auto"> Save Location </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="text-xs text-gray-500"> Click on the map to set the attendance check-point center. You will be asked to confirm. </p></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/AttendanceMap.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SettingsTabContent",
  __ssrInlineRender: true,
  props: {
    category: {}
  },
  setup(__props) {
    const props = __props;
    const { data: response, loading, error } = useSettings(1, 100, computed(() => props.category));
    const { mutate: updateSetting } = useUpdateSetting();
    const settings = computed(() => response.value?.data || []);
    const locationKeys = ["attendance_checkpoint_lat", "attendance_checkpoint_lng", "attendance_checkpoint_radius", "attendance_checkpoint_address"];
    const showMap = computed(() => props.category === SettingCategory.ATTENDANCE);
    const latSetting = computed(() => settings.value.find((s) => s.key === "attendance_checkpoint_lat"));
    const lngSetting = computed(() => settings.value.find((s) => s.key === "attendance_checkpoint_lng"));
    const radiusSetting = computed(() => settings.value.find((s) => s.key === "attendance_checkpoint_radius"));
    const addressSetting = computed(() => settings.value.find((s) => s.key === "attendance_checkpoint_address"));
    const otherSettings = computed(
      () => showMap.value ? settings.value.filter((s) => !locationKeys.includes(s.key)) : settings.value
    );
    const onLocationSelect = async (lat, lng) => {
      try {
        await updateSetting({ key: "attendance_checkpoint_lat", value: String(lat) });
        await updateSetting({ key: "attendance_checkpoint_lng", value: String(lng) });
      } catch (e) {
        console.error("Failed to update location settings", e);
        alert("Failed to save location");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 max-w-4xl" }, _attrs))}>`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center items-center h-64">`);
        _push(ssrRenderComponent(unref(LoaderCircle), { class: "w-8 h-8 animate-spin text-brand-navy" }, null, _parent));
        _push(`</div>`);
      } else if (unref(error)) {
        _push(`<div class="text-center text-red-500 py-8"> Failed to load settings. Please try again. </div>`);
      } else {
        _push(`<!--[-->`);
        if (settings.value.length === 0) {
          _push(`<div><p class="text-gray-500 italic">No settings found for this category.</p></div>`);
        } else {
          _push(`<div class="grid gap-6"><!--[-->`);
          ssrRenderList(otherSettings.value, (setting) => {
            _push(ssrRenderComponent(_sfc_main$3, {
              key: `${setting.id}-${setting.value}`,
              setting
            }, null, _parent));
          });
          _push(`<!--]--></div>`);
        }
        if (showMap.value) {
          _push(`<div class="mt-8 border-t pt-8"><h3 class="text-lg font-medium text-brand-navy mb-6">Attendance Check Point</h3><div class="mb-6 grid gap-6">`);
          if (addressSetting.value) {
            _push(ssrRenderComponent(_sfc_main$3, {
              key: `${addressSetting.value.id}-${addressSetting.value.value}`,
              setting: addressSetting.value
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6">`);
          if (latSetting.value) {
            _push(ssrRenderComponent(_sfc_main$3, {
              key: `${latSetting.value.id}-${latSetting.value.value}`,
              setting: latSetting.value
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          if (lngSetting.value) {
            _push(ssrRenderComponent(_sfc_main$3, {
              key: `${lngSetting.value.id}-${lngSetting.value.value}`,
              setting: lngSetting.value
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (radiusSetting.value) {
            _push(ssrRenderComponent(_sfc_main$3, {
              key: `${radiusSetting.value.id}-${radiusSetting.value.value}`,
              setting: radiusSetting.value
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="rounded-lg overflow-hidden border border-gray-200">`);
          _push(ssrRenderComponent(_sfc_main$2, {
            latitude: parseFloat(String(latSetting.value?.value || "0")),
            longitude: parseFloat(String(lngSetting.value?.value || "0")),
            radius: parseFloat(String(radiusSetting.value?.value || "100")),
            onLocationSelect
          }, null, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/SettingsTabContent.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const tabs = [
      { id: SettingCategory.GENERAL, label: "General", icon: Settings },
      { id: SettingCategory.COMPANY, label: "Company", icon: Building2 },
      { id: SettingCategory.ATTENDANCE, label: "Attendance", icon: Calendar },
      { id: SettingCategory.NOTIFICATION, label: "Notifications", icon: Bell },
      { id: SettingCategory.SECURITY, label: "Security", icon: Shield }
    ];
    const activeTab = ref(SettingCategory.GENERAL);
    const { loading: isInitializing } = useInitializeSettings();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="border-b border-gray-200 bg-white rounded-t-lg"><div class="flex items-center justify-between px-6 py-4"><nav class="flex space-x-4 overflow-x-auto no-scrollbar" aria-label="Tabs"><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<button class="${ssrRenderClass([
          "flex items-center px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors",
          activeTab.value === tab.id ? "bg-brand-light text-brand-navy" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
        ])}">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(tab.icon), { class: "w-4 h-4 mr-2" }, null), _parent);
        _push(` ${ssrInterpolate(tab.label)}</button>`);
      });
      _push(`<!--]--></nav><button${ssrIncludeBooleanAttr(unref(isInitializing)) ? " disabled" : ""} class="ml-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy disabled:opacity-50 inline-flex items-center">`);
      if (unref(isInitializing)) {
        _push(ssrRenderComponent(unref(LoaderCircle), { class: "w-4 h-4 animate-spin mr-2" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(` Initialize Defaults </button></div></div><div class="p-6 bg-white rounded-b-lg shadow-sm border border-t-0 border-gray-200">`);
      _push(ssrRenderComponent(_sfc_main$1, { category: activeTab.value }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/settings/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-yZIXBZ0Y.js.map
