import create from "./create";

export default async function () {
  const fetchFromApp = await create(false);
  const fetchFromMockApp = await create(true);
  const app_res = await fetchFromApp(...arguments);
  const mockApp_res = await fetchFromMockApp(...arguments);
  const app_res_text = await app_res.text();
  const mockApp_res_text = await mockApp_res.text();
  const app_res_json = (() => {
    try {
      return JSON.parse(app_res_text);
    } catch (e) {
      return undefined;
    }
  })();
  const mockApp_res_json = (() => {
    try {
      return JSON.parse(mockApp_res_text);
    } catch (e) {
      return undefined;
    }
  })();
  return [
    {
      headers: app_res.headers,
      status: app_res.status,
      statusText: app_res.statusText,
      bodyText: app_res_text,
      json: app_res_json,
    },
    {
      headers: mockApp_res.headers,
      status: mockApp_res.status,
      statusText: mockApp_res.statusText,
      bodyText: mockApp_res_text,
      json: mockApp_res_json,
    },
  ];
}
