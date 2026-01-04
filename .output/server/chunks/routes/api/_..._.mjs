import { d as defineEventHandler, u as useRuntimeConfig, p as proxyRequest } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const _____ = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const targetUrl = config.public.apiUrl || "https://hr-backend.bromn.biz.id";
  const path = event.path.replace(/^\/api/, "");
  const url = `${targetUrl}${path}`;
  console.log(`[Proxy] Request: ${event.path} -> ${url}`);
  return proxyRequest(event, url);
});

export { _____ as default };
//# sourceMappingURL=_..._.mjs.map
