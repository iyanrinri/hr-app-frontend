import { defineComponent, ref, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useMyProfile, a as useUpdateMyProfile, b as useUploadMyProfilePicture, c as useDeleteMyProfilePicture, _ as _sfc_main$1, d as _sfc_main$1$1, e as _sfc_main$2 } from './ProfilePictureUpload-DFGwDs2u.mjs';
import { k as Pencil, l as BadgeCheck, S as Shield, M as Mail } from './server.mjs';
import './fetch-VuP8VKdC.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@vue/shared';
import 'perfect-debounce';
import './Input-CKYYc_rG.mjs';
import './index-B7s_3MI_.mjs';
import 'clsx';
import 'tailwind-merge';
import './Button-gKFWS_xI.mjs';
import './nuxt-link-DsceMx1n.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'uuid';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { data: profile, loading: isLoading, refresh } = useMyProfile();
    const { mutate: updateProfile, loading: isUpdating } = useUpdateMyProfile();
    const { mutate: uploadPicture, loading: isUploading } = useUploadMyProfilePicture();
    const { mutate: deletePicture, loading: isDeleting } = useDeleteMyProfilePicture();
    const isEditing = ref(false);
    const handleUpload = async (file) => {
      await uploadPicture(file);
      refresh();
    };
    const handleDeletePicture = async () => {
      await deletePicture();
      refresh();
    };
    const handleUpdateProfile = async (data) => {
      await updateProfile(data, {
        onSuccess: () => {
          isEditing.value = false;
          refresh();
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      if (unref(isLoading) || !unref(profile)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-[400px] flex items-center justify-center" }, _attrs))}><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy"></div></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }, _attrs))}><div class="md:flex md:items-center md:justify-between"><div class="flex-1 min-w-0"><h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"> My Profile </h2><p class="mt-1 text-sm text-gray-500"> View and manage your personal information </p></div><div class="mt-4 flex md:mt-0 md:ml-4">`);
        if (!isEditing.value) {
          _push(`<button class="inline-flex items-center px-4 py-2 border border-transparent shadow-lg shadow-brand-navy/20 text-sm font-medium rounded-md text-white bg-brand-navy hover:bg-brand-navy/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy">`);
          _push(ssrRenderComponent(unref(Pencil), { class: "w-4 h-4 mr-2" }, null, _parent));
          _push(` Edit Profile </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="relative mb-8"><div class="h-48 rounded-xl bg-gradient-to-r from-brand-navy/90 via-blue-600/90 to-indigo-600/90 shadow-xl overflow-hidden relative"><div class="absolute inset-0 opacity-20 bg-[url(&#39;https://grainy-gradients.vercel.app/noise.svg&#39;)] mix-blend-overlay"></div><div class="absolute top-0 right-0 p-8 opacity-10">`);
        _push(ssrRenderComponent(unref(BadgeCheck), { class: "w-64 h-64 text-white transform rotate-12" }, null, _parent));
        _push(`</div></div><div class="px-8 relative"><div class="flex flex-col md:flex-row items-end gap-6 -mt-12"><div class="relative z-10">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          currentImageUrl: unref(profile).profilePicture || unref(profile).profilePictureUrl,
          altText: `${unref(profile).firstName} ${unref(profile).lastName}`,
          isUploading: unref(isUploading),
          isDeleting: unref(isDeleting),
          canEdit: true,
          size: "lg",
          onUpload: handleUpload,
          onDelete: handleDeletePicture
        }, null, _parent));
        _push(`</div><div class="flex-1 pb-2"><h1 class="text-3xl font-bold text-gray-900">${ssrInterpolate(unref(profile).firstName)} ${ssrInterpolate(unref(profile).lastName)}</h1><div class="flex flex-wrap items-center text-sm text-gray-600 gap-3 mt-2 font-medium"><span class="flex items-center bg-gray-100 px-3 py-1 rounded-full border border-gray-200 text-gray-700">`);
        _push(ssrRenderComponent(unref(Shield), { class: "w-3.5 h-3.5 mr-2 text-brand-navy" }, null, _parent));
        _push(` ${ssrInterpolate(((_a = unref(profile).user) == null ? void 0 : _a.role) || unref(profile).role)}</span><span class="flex items-center bg-gray-100 px-3 py-1 rounded-full border border-gray-200 text-gray-700">`);
        _push(ssrRenderComponent(unref(Mail), { class: "w-3.5 h-3.5 mr-2 text-brand-navy" }, null, _parent));
        _push(` ${ssrInterpolate(((_b = unref(profile).user) == null ? void 0 : _b.email) || unref(profile).email)}</span><span class="flex items-center bg-gray-100 px-3 py-1 rounded-full border border-gray-200 text-gray-700">`);
        _push(ssrRenderComponent(unref(BadgeCheck), { class: "w-3.5 h-3.5 mr-2 text-brand-navy" }, null, _parent));
        _push(` #${ssrInterpolate(unref(profile).employeeNumber || unref(profile).id)}</span></div></div><div class="pb-4 z-10">`);
        if (!isEditing.value) {
          _push(`<button class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-md text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy">`);
          _push(ssrRenderComponent(unref(Pencil), { class: "w-4 h-4 mr-2" }, null, _parent));
          _push(` Edit Profile </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div><div class="mt-16 pt-2">`);
        if (isEditing.value) {
          _push(`<div class="bg-white rounded-xl shadow-lg border border-gray-100 p-8"><div class="mb-6 pb-6 border-b border-gray-100"><h2 class="text-xl font-bold text-gray-900">Edit Profile Information</h2><p class="text-sm text-gray-500 mt-1">Update your personal and contact details</p></div>`);
          _push(ssrRenderComponent(_sfc_main$1$1, {
            initialData: unref(profile),
            isLoading: unref(isUpdating),
            isAdmin: false,
            onSubmit: handleUpdateProfile,
            onCancel: ($event) => isEditing.value = false
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(ssrRenderComponent(_sfc_main$2, { profile: unref(profile) }, null, _parent));
        }
        _push(`</div></div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/profile/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CxL_MVrY.mjs.map
