const baseApiUrl = process.env.REACT_APP_API;

export function apiFetchPage({ payload }) {
  const url = `${baseApiUrl}/api/pages/${payload.id}${payload.blockId ? `/${payload.blockId}` : ""}`;
  return fetch(url).then(async (res) => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to fetch page");
    }
    return res.json();
  });
}

export function apiCreatePage({ payload }) {
  const url = `${baseApiUrl}/api/pages`;
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

export function apiCopyPage({ payload }) {
  const url = `${baseApiUrl}/api/pages/copy`;
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

export function apiCreateGroupedPage({ payload }) {
  const url = `${baseApiUrl}/api/pages/grouped`;
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

export function apiDeletePage({ payload }) {
  const url = `${baseApiUrl}/api/pages/${payload.id}}`;
  return fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then(async (res) => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to delete page");
    }
    return res.json();
  });
}

export function apiUpdatePage({ payload }) {
  const url = `${baseApiUrl}/api/pages/${payload.id}`;
  return fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload }),
  }).then(async (res) => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to fetch templates");
    }
    return res.json();
  });
}
