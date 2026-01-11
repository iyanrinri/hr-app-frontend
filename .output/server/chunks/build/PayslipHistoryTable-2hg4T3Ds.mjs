import { _ as __nuxt_component_0 } from './nuxt-link-DsceMx1n.mjs';
import { defineComponent, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useRoute, E as Eye } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PayslipHistoryTable",
  __ssrInlineRender: true,
  props: {
    payslips: {},
    loading: { type: Boolean }
  },
  setup(__props) {
    const route = useRoute();
    const tenantSlug = route.params.tenant_slug;
    const formatIDR = (val) => {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(val));
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", { month: "long", year: "numeric" });
    };
    const formatShortDate = (date) => {
      return new Date(date).toLocaleDateString();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      if (__props.loading) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="h-16 bg-gray-100 rounded-md animate-pulse"></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (__props.payslips.length === 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300" }, _attrs))}> No payslip records found. </div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-x-auto rounded-lg border border-gray-200" }, _attrs))}><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Period / Date </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Employee </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"> Gross Salary </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"> Additions </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"> Deductions </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"> Take Home Pay </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`);
        ssrRenderList(__props.payslips, (payslip) => {
          var _a, _b;
          _push(`<tr class="hover:bg-gray-50 transition-colors"><td class="px-6 py-4 whitespace-nowrap"><div class="text-sm font-medium text-gray-900">${ssrInterpolate(((_a = payslip.payroll) == null ? void 0 : _a.periodStart) ? formatDate(payslip.payroll.periodStart) : "N/A")}</div><div class="text-xs text-gray-500"> Gen: ${ssrInterpolate(formatShortDate(payslip.generatedAt))}</div></td><td class="px-6 py-4 whitespace-nowrap">`);
          if ((_b = payslip.payroll) == null ? void 0 : _b.employee) {
            _push(`<!--[--><div class="text-sm font-medium text-gray-900">${ssrInterpolate(payslip.payroll.employee.firstName)} ${ssrInterpolate(payslip.payroll.employee.lastName)}</div><div class="text-xs text-gray-500">${ssrInterpolate(payslip.payroll.employee.position)}</div><!--]-->`);
          } else {
            _push(`<div class="text-sm text-gray-500">-</div>`);
          }
          _push(`</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">${ssrInterpolate(formatIDR(payslip.grossSalary))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-green-600"> +${ssrInterpolate(formatIDR(parseFloat(payslip.overtimePay || "0") + parseFloat(payslip.bonuses || "0") + parseFloat(payslip.allowances || "0")))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-red-600"> -${ssrInterpolate(formatIDR(payslip.totalDeductions || parseFloat(payslip.taxAmount || "0") + parseFloat(payslip.bpjsKesehatanEmployee || "0") + parseFloat(payslip.bpjsKetenagakerjaanEmployee || "0") + parseFloat(payslip.otherDeductions || "0")))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-brand-navy">${ssrInterpolate(formatIDR(payslip.takeHomePay))}</td><td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/${unref(tenantSlug)}/dashboard/payslips/${payslip.id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<button class="text-gray-500 hover:text-brand-navy p-2" title="View Detail"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Eye), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                return [
                  createVNode("button", {
                    class: "text-gray-500 hover:text-brand-navy p-2",
                    title: "View Detail"
                  }, [
                    createVNode(unref(Eye), { class: "w-4 h-4" })
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/payslips/PayslipHistoryTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=PayslipHistoryTable-2hg4T3Ds.mjs.map
