const baseApiUrl = process.env.REACT_APP_API;

export function apiFetchBlock({ payload }) {
  const url = `${baseApiUrl}/api/blocks/${payload.id}`;
  return fetch(url).then(async (res) => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to fetch templates");
    }
    return res.json();
  });
}

export function apiCreateBlock({ payload }) {
  const url = `${baseApiUrl}/api/blocks`;
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload }),
  }).then(async (res) => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to create page");
    }
    return res.json();
  });
}

export function apiDeleteBlock({ payload }) {
  const url = `${baseApiUrl}/api/blocks/${payload.id}}`;
  return fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload }),
  }).then(async (res) => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to create page");
    }
    return res.json();
  });
}

export function apiUpdateBlock({ payload }) {
  const url = `${baseApiUrl}/api/blocks/${payload.id}}`;
  return fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload }),
  }).then(async (res) => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to create page");
    }
    return res.json();
  });
}
