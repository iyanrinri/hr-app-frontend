import { m as useNuxtApp, I as defineStore } from "../server.mjs";
import { ref, computed } from "vue";
import { parse } from "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import { getRequestHeader, setCookie, getCookie, deleteCookie } from "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/h3/dist/index.mjs";
import destr from "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/destr/dist/index.mjs";
import { isEqual } from "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ohash/dist/index.mjs";
import { klona } from "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/klona/dist/index.mjs";
import { a as useRequestEvent } from "./ssr-BF3tP62J.js";
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ??= (key) => key === name;
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? opts.default?.());
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies[name])) {
        return;
      }
      nuxtApp._cookies ||= {};
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
const useAuthStore = defineStore("auth", () => {
  const token = useCookie("auth-token", {
    maxAge: 60 * 60 * 24 * 7,
    // 7 Days
    path: "/"
  });
  const user = useCookie("auth-user", {
    maxAge: 60 * 60 * 24 * 7,
    path: "/"
  });
  function setAuth(newToken, newUser) {
    token.value = newToken;
    user.value = newUser;
  }
  function clearAuth() {
    token.value = null;
    user.value = null;
  }
  async function fetchProfile() {
    if (!token.value) return;
    try {
      const response = await $fetch("/api/auth/profile");
      if (response) {
        user.value = response;
      }
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  }
  const isAuthenticated = computed(() => !!token.value);
  return {
    token,
    user,
    setAuth,
    clearAuth,
    fetchProfile,
    isAuthenticated
  };
});
export {
  useAuthStore as u
};
//# sourceMappingURL=auth-BV7LzjtB.js.map
