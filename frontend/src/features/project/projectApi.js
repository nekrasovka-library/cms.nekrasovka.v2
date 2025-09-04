const baseApiUrl = process.env.REACT_APP_API;

export function apiFetchProject({ payload }) {
  const url = `${baseApiUrl}/api/projects/${payload.id}`;
  return fetch(url).then(async (res) => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to fetch project");
    }
    return res.json();
  });
}

export function apiUpdateProject({ payload }) {
  const url = `${baseApiUrl}/api/projects/${payload.id}`;
  return fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload }),
  }).then(async (res) => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to update project");
    }
    return res.json();
  });
}
