import http from "http";
import listen from "test-listen";
import fetch from "node-fetch";
import fetchAbsolute from "fetch-absolute";

import { createApp, createMockApp } from ":/app";

export default async function create(useMock = false) {
  const app = useMock ? createMockApp() : createApp();
  const app_server = http.createServer(app);
  const app_prefixUrl = await listen(app_server);
  const app_fetch = fetchAbsolute(fetch)(app_prefixUrl);
  return await app_fetch;
}
