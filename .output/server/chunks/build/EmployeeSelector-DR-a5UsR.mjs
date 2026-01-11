import { defineComponent, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { K as useAuthStore } from './server.mjs';
import { a as useEmployees } from './useEmployees-CEaIsP48.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EmployeeSelector",
  __ssrInlineRender: true,
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);
    const { data: response } = useEmployees(1, 100);
    const employees = computed(() => {
      var _a;
      return ((_a = response.value) == null ? void 0 : _a.data) || [];
    });
    const isAuthorized = computed(() => {
      if (!user.value) return false;
      return ["HR", "SUPER", "ADMIN"].includes(user.value.role);
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (isAuthorized.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}><label class="block text-sm font-bold text-gray-900 mb-2"> Select Employee </label><div class="relative"><select${ssrRenderAttr("value", __props.modelValue)} class="w-full appearance-none px-4 py-2 pr-10 border border-gray-600 rounded-md focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan bg-white text-black cursor-pointer"><option value="">All Employees</option><!--[-->`);
        ssrRenderList(employees.value, (employee) => {
          _push(`<option${ssrRenderAttr("value", employee.id)}>${ssrInterpolate(employee.firstName)} ${ssrInterpolate(employee.lastName)} (${ssrInterpolate(employee.user.email)}) </option>`);
        });
        _push(`<!--]--></select><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path></svg></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/attendance/EmployeeSelector.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=EmployeeSelector-DR-a5UsR.mjs.map
