import { u as useRoute, U as User, b as Calendar, a7 as Heart, a8 as CreditCard, a9 as Phone, Y as MapPin, H as Briefcase, l as BadgeCheck, B as Building2, X, q as Save, p as LoaderCircle, aa as Camera, ab as CloudUpload, d as Trash2 } from "../server.mjs";
import { u as useFetch } from "./fetch-VuP8VKdC.js";
import { ref, unref, defineComponent, mergeProps, createVNode, resolveDynamicComponent, useSSRContext, watch, withCtx, createTextVNode, toDisplayString, createBlock, openBlock, Fragment } from "vue";
import { ssrRenderAttrs, ssrRenderVNode, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$4 } from "./Input-CKYYc_rG.js";
import { _ as _sfc_main$5 } from "./Button-gKFWS_xI.js";
const useTenantUrl = () => {
  const route = useRoute();
  const tenantSlug = route.params.tenant_slug;
  return (path) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return tenantSlug ? `/api/${tenantSlug}${cleanPath}` : `/api${cleanPath}`;
  };
};
const useMyProfile = () => {
  const getUrl = useTenantUrl();
  const { data, pending, error, refresh } = useFetch(() => getUrl("/employees/profile/me"), {
    key: "profile-me"
  }, "$Q-u-1cimg_");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const useUpdateMyProfile = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (data, options) => {
    loading.value = true;
    try {
      const response = await $fetch(getUrl("/employees/profile/me"), {
        method: "PATCH",
        body: data
      });
      if (options?.onSuccess) options.onSuccess();
      return response;
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
const useEmployeeProfile = (id) => {
  const getUrl = useTenantUrl();
  const { data, pending, error, refresh } = useFetch(() => getUrl(`/employees/${unref(id)}/profile`), {
    key: `employee-profile-${unref(id)}`,
    immediate: !!unref(id)
  }, "$kJlCrMgQ8D");
  return {
    data,
    loading: pending,
    error,
    refresh
  };
};
const useUpdateEmployeeProfile = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (id, data, options) => {
    loading.value = true;
    try {
      const response = await $fetch(getUrl(`/employees/${id}/profile`), {
        method: "PATCH",
        body: data
      });
      if (options?.onSuccess) options.onSuccess();
      return response;
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
const useUploadEmployeePicture = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (id, file) => {
    loading.value = true;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await $fetch(getUrl(`/employees/${id}/picture`), {
        method: "POST",
        body: formData
      });
      return response;
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
const useDeleteEmployeePicture = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (id) => {
    loading.value = true;
    try {
      await $fetch(getUrl(`/employees/${id}/picture`), {
        method: "DELETE"
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
const useUploadMyProfilePicture = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async (file) => {
    loading.value = true;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await $fetch(getUrl("/employees/profile/me/picture"), {
        method: "POST",
        body: formData
      });
      return response;
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
const useDeleteMyProfilePicture = () => {
  const getUrl = useTenantUrl();
  const loading = ref(false);
  const mutate = async () => {
    loading.value = true;
    try {
      await $fetch(getUrl("/employees/profile/me/picture"), {
        method: "DELETE"
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
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "InfoItem",
  __ssrInlineRender: true,
  props: {
    icon: { type: [Function, Object] },
    label: {},
    value: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-start p-3 bg-gray-50 rounded-lg border border-gray-100" }, _attrs))}><div class="flex-shrink-0 mr-3">`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.icon), { class: "w-5 h-5 text-gray-400" }, null), _parent);
      _push(`</div><div class="min-w-0 flex-1"><p class="text-xs font-medium text-gray-500 uppercase tracking-wide">${ssrInterpolate(__props.label)}</p><p class="mt-1 text-sm font-medium text-gray-900 break-words">${ssrInterpolate(__props.value || "-")}</p></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/InfoItem.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ProfileView",
  __ssrInlineRender: true,
  props: {
    profile: {}
  },
  setup(__props) {
    const formatDate = (dateString) => {
      if (!dateString) return "-";
      try {
        return new Date(dateString).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });
      } catch {
        return dateString;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"><div class="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100 flex items-center">`);
      _push(ssrRenderComponent(unref(User), { class: "w-5 h-5 mr-2 text-brand-navy" }, null, _parent));
      _push(`<h3 class="text-lg font-semibold text-gray-900">Personal Details</h3></div><div class="p-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(User),
        label: "Full Name",
        value: `${__props.profile.firstName} ${__props.profile.lastName}`
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(Calendar),
        label: "Date of Birth",
        value: formatDate(__props.profile.dateOfBirth)
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(User),
        label: "Gender",
        value: __props.profile.gender?.replace("_", " ") || "-"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(Heart),
        label: "Marital Status",
        value: __props.profile.maritalStatus || "-"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(User),
        label: "Nationality",
        value: __props.profile.nationality || "-"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(User),
        label: "Religion",
        value: __props.profile.religion || "-"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(Heart),
        label: "Blood Type",
        value: __props.profile.bloodType || "-"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(CreditCard),
        label: "ID Number (NIK)",
        value: __props.profile.idNumber || "-"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(CreditCard),
        label: "Tax Number (NPWP)",
        value: __props.profile.taxNumber || "-"
      }, null, _parent));
      _push(`</div></div></div><div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"><div class="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-gray-100 flex items-center">`);
      _push(ssrRenderComponent(unref(Phone), { class: "w-5 h-5 mr-2 text-emerald-700" }, null, _parent));
      _push(`<h3 class="text-lg font-semibold text-gray-900">Contact Information</h3></div><div class="p-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(Phone),
        label: "Phone Number",
        value: __props.profile.phoneNumber
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(Phone),
        label: "Alt Phone",
        value: __props.profile.alternativePhone
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(MapPin),
        label: "City",
        value: __props.profile.city
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(MapPin),
        label: "Province",
        value: __props.profile.province
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(MapPin),
        label: "Postal Code",
        value: __props.profile.postalCode
      }, null, _parent));
      _push(`<div class="md:col-span-2">`);
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(MapPin),
        label: "Address",
        value: __props.profile.address
      }, null, _parent));
      _push(`</div><div class="md:col-span-2 pt-4 border-t border-gray-100 mt-2"><p class="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Emergency Contact</p><div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(User),
        label: "Name",
        value: __props.profile.emergencyContactName
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(Phone),
        label: "Phone",
        value: __props.profile.emergencyContactPhone
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(Heart),
        label: "Relation",
        value: __props.profile.emergencyContactRelation
      }, null, _parent));
      _push(`</div></div></div></div></div><div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"><div class="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-gray-100 flex items-center">`);
      _push(ssrRenderComponent(unref(Briefcase), { class: "w-5 h-5 mr-2 text-amber-700" }, null, _parent));
      _push(`<h3 class="text-lg font-semibold text-gray-900">Employment Details</h3></div><div class="p-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(BadgeCheck),
        label: "Employee ID",
        value: __props.profile.employeeNumber || __props.profile.id
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(Briefcase),
        label: "Status",
        value: __props.profile.employmentStatus
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(Briefcase),
        label: "Position",
        value: __props.profile.position || __props.profile?.user?.role
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(Building2),
        label: "Department",
        value: __props.profile.department
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(MapPin),
        label: "Work Location",
        value: __props.profile.workLocation
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(Calendar),
        label: "Join Date",
        value: formatDate(__props.profile.joinDate)
      }, null, _parent));
      if (__props.profile.contractStartDate || __props.profile.contractEndDate) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_sfc_main$3, {
          icon: unref(Calendar),
          label: "Contract Start",
          value: formatDate(__props.profile.contractStartDate)
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$3, {
          icon: unref(Calendar),
          label: "Contract End",
          value: formatDate(__props.profile.contractEndDate)
        }, null, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"><div class="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100 flex items-center">`);
      _push(ssrRenderComponent(unref(CreditCard), { class: "w-5 h-5 mr-2 text-purple-700" }, null, _parent));
      _push(`<h3 class="text-lg font-semibold text-gray-900">Financial Information</h3></div><div class="p-6"><div class="grid grid-cols-1 gap-4">`);
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(Building2),
        label: "Bank Name",
        value: __props.profile.bankName
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(CreditCard),
        label: "Account Number",
        value: __props.profile.bankAccountNumber
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        icon: unref(User),
        label: "Account Holder",
        value: __props.profile.bankAccountName || __props.profile.bankAccountHolder
      }, null, _parent));
      _push(`</div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfileView.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var Gender = /* @__PURE__ */ ((Gender2) => {
  Gender2["MALE"] = "MALE";
  Gender2["FEMALE"] = "FEMALE";
  return Gender2;
})(Gender || {});
var MaritalStatus = /* @__PURE__ */ ((MaritalStatus2) => {
  MaritalStatus2["SINGLE"] = "SINGLE";
  MaritalStatus2["MARRIED"] = "MARRIED";
  MaritalStatus2["DIVORCED"] = "DIVORCED";
  MaritalStatus2["WIDOWED"] = "WIDOWED";
  return MaritalStatus2;
})(MaritalStatus || {});
var EmploymentStatus = /* @__PURE__ */ ((EmploymentStatus2) => {
  EmploymentStatus2["PERMANENT"] = "PERMANENT";
  EmploymentStatus2["CONTRACT"] = "CONTRACT";
  EmploymentStatus2["INTERN"] = "INTERN";
  EmploymentStatus2["FREELANCE"] = "FREELANCE";
  EmploymentStatus2["PROBATION"] = "PROBATION";
  EmploymentStatus2["TERMINATED"] = "TERMINATED";
  EmploymentStatus2["RESIGNED"] = "RESIGNED";
  return EmploymentStatus2;
})(EmploymentStatus || {});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProfileForm",
  __ssrInlineRender: true,
  props: {
    initialData: {},
    isLoading: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false }
  },
  emits: ["submit", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const INDONESIAN_RELIGIONS = [
      "ISLAM",
      "PROTESTANT",
      "CATHOLIC",
      "HINDU",
      "BUDDHA",
      "CONFUCIANISM",
      "OTHER"
    ];
    const INDONESIAN_PROVINCES = [
      "Aceh",
      "Bali",
      "Banten",
      "Bengkulu",
      "DI Yogyakarta",
      "DKI Jakarta",
      "Gorontalo",
      "Jambi",
      "Jawa Barat",
      "Jawa Tengah",
      "Jawa Timur",
      "Kalimantan Barat",
      "Kalimantan Selatan",
      "Kalimantan Tengah",
      "Kalimantan Timur",
      "Kalimantan Utara",
      "Kepulauan Bangka Belitung",
      "Kepulauan Riau",
      "Lampung",
      "Maluku",
      "Maluku Utara",
      "Nusa Tenggara Barat",
      "Nusa Tenggara Timur",
      "Papua",
      "Papua Barat",
      "Riau",
      "Sulawesi Barat",
      "Sulawesi Selatan",
      "Sulawesi Tengah",
      "Sulawesi Tenggara",
      "Sulawesi Utara",
      "Sumatera Barat",
      "Sumatera Selatan",
      "Sumatera Utara",
      "Other"
    ];
    const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const EMERGENCY_RELATIONS = [
      "Parent",
      "Husband",
      "Wife",
      "Spouse",
      "Sibling",
      "Child",
      "Relative",
      "Friend",
      "Other"
    ];
    const formData = ref({});
    const isOtherReligion = ref(false);
    const isOtherProvince = ref(false);
    watch(() => props.initialData, (data) => {
      if (data) {
        formData.value = {
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber || "",
          alternativePhone: data.alternativePhone || "",
          address: data.address || "",
          city: data.city || "",
          province: data.province || "",
          postalCode: data.postalCode || "",
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
          gender: data.gender,
          maritalStatus: data.maritalStatus,
          nationality: data.nationality || "",
          religion: data.religion || "",
          bloodType: data.bloodType || "",
          idNumber: data.idNumber || "",
          taxNumber: data.taxNumber || "",
          bankName: data.bankName || "",
          bankAccountNumber: data.bankAccountNumber || "",
          bankAccountName: data.bankAccountName || data.bankAccountHolder || "",
          emergencyContactName: data.emergencyContactName || "",
          emergencyContactPhone: data.emergencyContactPhone || "",
          emergencyContactRelation: data.emergencyContactRelation || "",
          // Admin fields
          employmentStatus: data.employmentStatus,
          workLocation: data.workLocation || "",
          joinDate: data.joinDate ? data.joinDate.split("T")[0] : "",
          position: data.position || "",
          department: data.department || "",
          employeeNumber: data.employeeNumber || "",
          contractStartDate: data.contractStartDate ? data.contractStartDate.split("T")[0] : "",
          contractEndDate: data.contractEndDate ? data.contractEndDate.split("T")[0] : ""
        };
        isOtherReligion.value = !!(data.religion && !INDONESIAN_RELIGIONS.includes(data.religion));
        isOtherProvince.value = !!(data.province && !INDONESIAN_PROVINCES.includes(data.province));
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiInput = _sfc_main$4;
      const _component_UiButton = _sfc_main$5;
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="bg-gray-50/50 p-6 rounded-xl border border-gray-100 transition-colors hover:border-brand-navy/20"><h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4">Personal Information</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-5">`);
      _push(ssrRenderComponent(_component_UiInput, {
        label: "First Name",
        modelValue: formData.value.firstName,
        "onUpdate:modelValue": ($event) => formData.value.firstName = $event,
        placeholder: "John"
      }, null, _parent));
      _push(ssrRenderComponent(_component_UiInput, {
        label: "Last Name",
        modelValue: formData.value.lastName,
        "onUpdate:modelValue": ($event) => formData.value.lastName = $event,
        placeholder: "Doe"
      }, null, _parent));
      _push(ssrRenderComponent(_component_UiInput, {
        label: "Date of Birth",
        type: "date",
        modelValue: formData.value.dateOfBirth,
        "onUpdate:modelValue": ($event) => formData.value.dateOfBirth = $event
      }, null, _parent));
      _push(`<div><label class="block text-sm font-medium text-gray-700 mb-1">Gender</label><select class="block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-sm"><option value=""${ssrIncludeBooleanAttr(Array.isArray(formData.value.gender) ? ssrLooseContain(formData.value.gender, "") : ssrLooseEqual(formData.value.gender, "")) ? " selected" : ""}>Select Gender</option><!--[-->`);
      ssrRenderList(Object.values(unref(Gender)), (g) => {
        _push(`<option${ssrRenderAttr("value", g)}${ssrIncludeBooleanAttr(Array.isArray(formData.value.gender) ? ssrLooseContain(formData.value.gender, g) : ssrLooseEqual(formData.value.gender, g)) ? " selected" : ""}>${ssrInterpolate(g.replace("_", " "))}</option>`);
      });
      _push(`<!--]--></select></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Marital Status</label><select class="block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-sm"><option value=""${ssrIncludeBooleanAttr(Array.isArray(formData.value.maritalStatus) ? ssrLooseContain(formData.value.maritalStatus, "") : ssrLooseEqual(formData.value.maritalStatus, "")) ? " selected" : ""}>Select Status</option><!--[-->`);
      ssrRenderList(Object.values(unref(MaritalStatus)), (s) => {
        _push(`<option${ssrRenderAttr("value", s)}${ssrIncludeBooleanAttr(Array.isArray(formData.value.maritalStatus) ? ssrLooseContain(formData.value.maritalStatus, s) : ssrLooseEqual(formData.value.maritalStatus, s)) ? " selected" : ""}>${ssrInterpolate(s.replace("_", " "))}</option>`);
      });
      _push(`<!--]--></select></div>`);
      _push(ssrRenderComponent(_component_UiInput, {
        label: "Nationality",
        modelValue: formData.value.nationality,
        "onUpdate:modelValue": ($event) => formData.value.nationality = $event,
        placeholder: "Indonesian"
      }, null, _parent));
      _push(`<div><label class="block text-sm font-medium text-gray-700 mb-1">Religion</label>`);
      if (!isOtherReligion.value) {
        _push(`<div><select${ssrRenderAttr("value", formData.value.religion)} class="block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-sm"><option value="">Select Religion</option><!--[-->`);
        ssrRenderList(INDONESIAN_RELIGIONS, (r) => {
          _push(`<option${ssrRenderAttr("value", r)}>${ssrInterpolate(r)}</option>`);
        });
        _push(`<!--]--></select></div>`);
      } else {
        _push(`<div class="flex gap-2">`);
        _push(ssrRenderComponent(_component_UiInput, {
          modelValue: formData.value.religion,
          "onUpdate:modelValue": ($event) => formData.value.religion = $event,
          placeholder: "Specify religion",
          class: "flex-1"
        }, null, _parent));
        _push(ssrRenderComponent(_component_UiButton, {
          type: "button",
          variant: "secondary",
          onClick: ($event) => {
            isOtherReligion.value = false;
            formData.value.religion = "";
          },
          class: "whitespace-nowrap"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Show List`);
            } else {
              return [
                createTextVNode("Show List")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div><div><label class="block text-sm font-medium text-gray-700 mb-1">Blood Type</label><select class="block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-sm"><option value=""${ssrIncludeBooleanAttr(Array.isArray(formData.value.bloodType) ? ssrLooseContain(formData.value.bloodType, "") : ssrLooseEqual(formData.value.bloodType, "")) ? " selected" : ""}>Select</option><!--[-->`);
      ssrRenderList(BLOOD_TYPES, (t) => {
        _push(`<option${ssrRenderAttr("value", t)}${ssrIncludeBooleanAttr(Array.isArray(formData.value.bloodType) ? ssrLooseContain(formData.value.bloodType, t) : ssrLooseEqual(formData.value.bloodType, t)) ? " selected" : ""}>${ssrInterpolate(t)}</option>`);
      });
      _push(`<!--]--></select></div>`);
      _push(ssrRenderComponent(_component_UiInput, {
        label: "ID Number (NIK)",
        modelValue: formData.value.idNumber,
        "onUpdate:modelValue": ($event) => formData.value.idNumber = $event
      }, null, _parent));
      _push(ssrRenderComponent(_component_UiInput, {
        label: "Tax Number (NPWP)",
        modelValue: formData.value.taxNumber,
        "onUpdate:modelValue": ($event) => formData.value.taxNumber = $event
      }, null, _parent));
      _push(`</div></div><div class="bg-gray-50/50 p-6 rounded-xl border border-gray-100 transition-colors hover:border-brand-navy/20"><h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4">Contact Information</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-5">`);
      _push(ssrRenderComponent(_component_UiInput, {
        label: "Phone Number",
        modelValue: formData.value.phoneNumber,
        "onUpdate:modelValue": ($event) => formData.value.phoneNumber = $event,
        placeholder: "+62..."
      }, null, _parent));
      _push(ssrRenderComponent(_component_UiInput, {
        label: "Alternative Phone",
        modelValue: formData.value.alternativePhone,
        "onUpdate:modelValue": ($event) => formData.value.alternativePhone = $event
      }, null, _parent));
      _push(`<div class="md:col-span-2">`);
      _push(ssrRenderComponent(_component_UiInput, {
        label: "Address",
        modelValue: formData.value.address,
        "onUpdate:modelValue": ($event) => formData.value.address = $event,
        placeholder: "Full address"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UiInput, {
        label: "City",
        modelValue: formData.value.city,
        "onUpdate:modelValue": ($event) => formData.value.city = $event
      }, null, _parent));
      _push(`<div><label class="block text-sm font-medium text-gray-700 mb-1">Province</label>`);
      if (!isOtherProvince.value) {
        _push(`<div><select${ssrRenderAttr("value", formData.value.province)} class="block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-sm"><option value="">Select Province</option><!--[-->`);
        ssrRenderList(INDONESIAN_PROVINCES, (p) => {
          _push(`<option${ssrRenderAttr("value", p)}>${ssrInterpolate(p)}</option>`);
        });
        _push(`<!--]--></select></div>`);
      } else {
        _push(`<div class="flex gap-2">`);
        _push(ssrRenderComponent(_component_UiInput, {
          modelValue: formData.value.province,
          "onUpdate:modelValue": ($event) => formData.value.province = $event,
          placeholder: "Specify province",
          class: "flex-1"
        }, null, _parent));
        _push(ssrRenderComponent(_component_UiButton, {
          type: "button",
          variant: "secondary",
          onClick: ($event) => {
            isOtherProvince.value = false;
            formData.value.province = "";
          },
          class: "whitespace-nowrap"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Show List`);
            } else {
              return [
                createTextVNode("Show List")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UiInput, {
        label: "Postal Code",
        modelValue: formData.value.postalCode,
        "onUpdate:modelValue": ($event) => formData.value.postalCode = $event
      }, null, _parent));
      _push(`<div class="md:col-span-2 pt-4 mt-2 border-t border-gray-200"><p class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Emergency Contact</p><div class="grid grid-cols-1 md:grid-cols-3 gap-4">`);
      _push(ssrRenderComponent(_component_UiInput, {
        label: "Name",
        modelValue: formData.value.emergencyContactName,
        "onUpdate:modelValue": ($event) => formData.value.emergencyContactName = $event
      }, null, _parent));
      _push(ssrRenderComponent(_component_UiInput, {
        label: "Phone",
        modelValue: formData.value.emergencyContactPhone,
        "onUpdate:modelValue": ($event) => formData.value.emergencyContactPhone = $event
      }, null, _parent));
      _push(`<div><label class="block text-sm font-medium text-gray-700 mb-1">Relation</label><select class="block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-sm"><option value=""${ssrIncludeBooleanAttr(Array.isArray(formData.value.emergencyContactRelation) ? ssrLooseContain(formData.value.emergencyContactRelation, "") : ssrLooseEqual(formData.value.emergencyContactRelation, "")) ? " selected" : ""}>Select Relation</option><!--[-->`);
      ssrRenderList(EMERGENCY_RELATIONS, (r) => {
        _push(`<option${ssrRenderAttr("value", r)}${ssrIncludeBooleanAttr(Array.isArray(formData.value.emergencyContactRelation) ? ssrLooseContain(formData.value.emergencyContactRelation, r) : ssrLooseEqual(formData.value.emergencyContactRelation, r)) ? " selected" : ""}>${ssrInterpolate(r)}</option>`);
      });
      _push(`<!--]--></select></div></div></div></div></div><div class="bg-gray-50/50 p-6 rounded-xl border border-gray-100 transition-colors hover:border-brand-navy/20"><h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4">Financial Information</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-5">`);
      _push(ssrRenderComponent(_component_UiInput, {
        label: "Bank Name",
        modelValue: formData.value.bankName,
        "onUpdate:modelValue": ($event) => formData.value.bankName = $event,
        placeholder: "BCA"
      }, null, _parent));
      _push(ssrRenderComponent(_component_UiInput, {
        label: "Account Number",
        modelValue: formData.value.bankAccountNumber,
        "onUpdate:modelValue": ($event) => formData.value.bankAccountNumber = $event
      }, null, _parent));
      _push(`<div class="md:col-span-2">`);
      _push(ssrRenderComponent(_component_UiInput, {
        label: "Account Holder Name",
        modelValue: formData.value.bankAccountName,
        "onUpdate:modelValue": ($event) => formData.value.bankAccountName = $event
      }, null, _parent));
      _push(`</div></div></div>`);
      if (__props.isAdmin) {
        _push(`<div class="bg-gray-50/50 p-6 rounded-xl border border-gray-100 transition-colors hover:border-brand-navy/20"><h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4">Employment Details (Admin)</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-5">`);
        _push(ssrRenderComponent(_component_UiInput, {
          label: "Employee ID",
          modelValue: formData.value.employeeNumber,
          "onUpdate:modelValue": ($event) => formData.value.employeeNumber = $event
        }, null, _parent));
        _push(`<div><label class="block text-sm font-medium text-gray-700 mb-1">Employment Status</label><select class="block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-sm"><option value=""${ssrIncludeBooleanAttr(Array.isArray(formData.value.employmentStatus) ? ssrLooseContain(formData.value.employmentStatus, "") : ssrLooseEqual(formData.value.employmentStatus, "")) ? " selected" : ""}>Select Status</option><!--[-->`);
        ssrRenderList(Object.values(unref(EmploymentStatus)), (s) => {
          _push(`<option${ssrRenderAttr("value", s)}${ssrIncludeBooleanAttr(Array.isArray(formData.value.employmentStatus) ? ssrLooseContain(formData.value.employmentStatus, s) : ssrLooseEqual(formData.value.employmentStatus, s)) ? " selected" : ""}>${ssrInterpolate(s)}</option>`);
        });
        _push(`<!--]--></select></div>`);
        _push(ssrRenderComponent(_component_UiInput, {
          label: "Position",
          modelValue: formData.value.position,
          "onUpdate:modelValue": ($event) => formData.value.position = $event
        }, null, _parent));
        _push(ssrRenderComponent(_component_UiInput, {
          label: "Department",
          modelValue: formData.value.department,
          "onUpdate:modelValue": ($event) => formData.value.department = $event
        }, null, _parent));
        _push(ssrRenderComponent(_component_UiInput, {
          label: "Work Location",
          modelValue: formData.value.workLocation,
          "onUpdate:modelValue": ($event) => formData.value.workLocation = $event
        }, null, _parent));
        _push(ssrRenderComponent(_component_UiInput, {
          label: "Join Date",
          type: "date",
          modelValue: formData.value.joinDate,
          "onUpdate:modelValue": ($event) => formData.value.joinDate = $event
        }, null, _parent));
        _push(ssrRenderComponent(_component_UiInput, {
          label: "Contract Start",
          type: "date",
          modelValue: formData.value.contractStartDate,
          "onUpdate:modelValue": ($event) => formData.value.contractStartDate = $event
        }, null, _parent));
        _push(ssrRenderComponent(_component_UiInput, {
          label: "Contract End",
          type: "date",
          modelValue: formData.value.contractEndDate,
          "onUpdate:modelValue": ($event) => formData.value.contractEndDate = $event
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">`);
      _push(ssrRenderComponent(_component_UiButton, {
        type: "button",
        variant: "secondary",
        onClick: ($event) => _ctx.$emit("cancel"),
        disabled: __props.isLoading
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(X), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Cancel `);
          } else {
            return [
              createVNode(unref(X), { class: "w-4 h-4 mr-2" }),
              createTextVNode(" Cancel ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiButton, {
        type: "submit",
        disabled: __props.isLoading,
        class: "bg-brand-navy text-white hover:bg-brand-navy/90"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Save), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(__props.isLoading ? "Saving..." : "Save Changes")}`);
          } else {
            return [
              createVNode(unref(Save), { class: "w-4 h-4 mr-2" }),
              createTextVNode(" " + toDisplayString(__props.isLoading ? "Saving..." : "Save Changes"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfileForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProfilePictureUpload",
  __ssrInlineRender: true,
  props: {
    currentImageUrl: {},
    altText: {},
    isUploading: { type: Boolean },
    isDeleting: { type: Boolean, default: false },
    canEdit: { type: Boolean, default: true },
    size: { default: "xl" }
  },
  emits: ["upload", "delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const fileInputRef = ref(null);
    const dragActive = ref(false);
    const handleDelete = () => {
      if (!confirm("Are you sure you want to remove your profile picture?")) return;
      emit("delete");
    };
    const triggerFileInput = () => {
      if (props.canEdit && !props.isUploading) {
        fileInputRef.value?.click();
      }
    };
    const sizeClasses = {
      sm: "w-16 h-16",
      md: "w-24 h-24",
      lg: "w-32 h-32",
      xl: "w-40 h-40"
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center space-y-4" }, _attrs))}><div class="${ssrRenderClass([
        "relative group rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center transition-all",
        sizeClasses[__props.size],
        __props.canEdit && "cursor-pointer hover:ring-4 hover:ring-brand-navy/20",
        dragActive.value && "ring-4 ring-brand-cyan scale-105"
      ])}">`);
      if (__props.isUploading) {
        _push(`<div class="absolute inset-0 flex items-center justify-center bg-black/50 z-20">`);
        _push(ssrRenderComponent(unref(LoaderCircle), { class: "w-8 h-8 text-white animate-spin" }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!--[-->`);
        if (__props.canEdit) {
          _push(`<div class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">`);
          _push(ssrRenderComponent(unref(Camera), { class: "w-8 h-8 text-white mb-1" }, null, _parent));
          _push(`<span class="text-xs text-white font-medium">Change Photo</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      if (__props.currentImageUrl) {
        _push(`<img${ssrRenderAttr("src", __props.currentImageUrl)}${ssrRenderAttr("alt", __props.altText)} class="w-full h-full object-cover">`);
      } else {
        _push(`<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">`);
        _push(ssrRenderComponent(unref(User), { class: "w-1/2 h-1/2" }, null, _parent));
        _push(`</div>`);
      }
      _push(`<input type="file" class="hidden" accept="image/jpeg,image/png,image/gif"${ssrIncludeBooleanAttr(__props.isUploading || !__props.canEdit) ? " disabled" : ""}></div>`);
      if (__props.canEdit) {
        _push(`<div class="flex gap-2">`);
        _push(ssrRenderComponent(_component_UiButton, {
          variant: "secondary",
          onClick: triggerFileInput,
          disabled: __props.isUploading,
          class: "text-xs h-8 px-3"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(CloudUpload), { class: "w-3.5 h-3.5 mr-1.5" }, null, _parent2, _scopeId));
              _push2(` Upload `);
            } else {
              return [
                createVNode(unref(CloudUpload), { class: "w-3.5 h-3.5 mr-1.5" }),
                createTextVNode(" Upload ")
              ];
            }
          }),
          _: 1
        }, _parent));
        if (__props.currentImageUrl) {
          _push(ssrRenderComponent(_component_UiButton, {
            variant: "secondary",
            onClick: handleDelete,
            disabled: __props.isUploading || __props.isDeleting,
            class: "text-xs text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 h-8 px-3"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (__props.isDeleting) {
                  _push2(ssrRenderComponent(unref(LoaderCircle), { class: "w-3.5 h-3.5 animate-spin" }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!--[-->`);
                  _push2(ssrRenderComponent(unref(Trash2), { class: "w-3.5 h-3.5 mr-1.5" }, null, _parent2, _scopeId));
                  _push2(` Remove <!--]-->`);
                }
              } else {
                return [
                  __props.isDeleting ? (openBlock(), createBlock(unref(LoaderCircle), {
                    key: 0,
                    class: "w-3.5 h-3.5 animate-spin"
                  })) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                    createVNode(unref(Trash2), { class: "w-3.5 h-3.5 mr-1.5" }),
                    createTextVNode(" Remove ")
                  ], 64))
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfilePictureUpload.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  useUpdateMyProfile as a,
  useUploadMyProfilePicture as b,
  useDeleteMyProfilePicture as c,
  _sfc_main$1 as d,
  _sfc_main$2 as e,
  useEmployeeProfile as f,
  useUpdateEmployeeProfile as g,
  useUploadEmployeePicture as h,
  useDeleteEmployeePicture as i,
  useMyProfile as u
};
//# sourceMappingURL=ProfilePictureUpload-DFGwDs2u.js.map
