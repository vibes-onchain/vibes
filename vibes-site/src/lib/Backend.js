import "isomorphic-fetch";
import "isomorphic-form-data";

import { serialize } from "object-to-formdata";

const DEFAULT_HEADERS = { credentials: "include" };

export function urlFor(path) {
  return `${process.env.REACT_APP_API_BASE_URL}${path}`;
}

export function headersFor(headers) {
  return Object.assign(
    {},
    // { signal: window.appAbortController.signal },
    DEFAULT_HEADERS,
    headers
  );
}

export function get(path) {
  return fetch(urlFor(path), headersFor())
    .then((response) => {
      if (response.statusText === "Unauthorized") {
        window.dontReportErrors = true;
        window.location = "/";
      }
      return response.json().then((json) => ({ response, json }));
    })
    .then(({ response, json }) => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      if (!json.ok && !json.data) {
        return Promise.reject(json);
      }
      return json;
    });
}

export function post(path, params) {
  let body = new FormData();
  if (params instanceof FormData) {
    body = params;
  } else {
    body = serialize(params);
  }

  return fetch(urlFor(path), headersFor({ method: "post", signal: null, body }))
    .then((response) => {
      return response.json().then((json) => ({ response, json }));
    })
    .then(({ response, json }) => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      if (!json.ok) {
        return Promise.reject(json);
      }
      return json;
    });
}

export function put(path, params) {
  let body = new FormData();
  if (params instanceof FormData) {
    body = params;
  } else {
    for (let key in params) {
      if (typeof params[key] === "object") {
        body.append(key, JSON.stringify(params[key]));
      } else {
        body.append(key, params[key]);
      }
    }
  }

  return fetch(urlFor(path), headersFor({ method: "put", signal: null, body }))
    .then((response) => {
      return response.json().then((json) => ({ response, json }));
    })
    .then(({ response, json }) => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      if (!json.ok) {
        return Promise.reject(json);
      }
      return json;
    });
}

export function patch(path, params) {
  let body = new FormData();
  if (params instanceof FormData) {
    body = params;
  } else {
    for (let key in params) {
      if (typeof params[key] === "object") {
        body.append(key, JSON.stringify(params[key]));
      } else {
        body.append(key, params[key]);
      }
    }
  }

  return fetch(
    urlFor(path),
    headersFor({ method: "PATCH", signal: null, body })
  )
    .then((response) => {
      return response.json().then((json) => ({ response, json }));
    })
    .then(({ response, json }) => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      if (!json.ok) {
        return Promise.reject(json);
      }
      return json;
    });
}

export function del(path) {
  return fetch(urlFor(path), headersFor({ method: "delete", signal: null }))
    .then((response) => {
      return response.json().then((json) => ({ response, json }));
    })
    .then(({ response, json }) => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      if (!json.ok) {
        return Promise.reject(json);
      }
      return json;
    });
}

export default {
  urlFor,
  headersFor,
  get,
  post,
  put,
  del,
  patch,
};
