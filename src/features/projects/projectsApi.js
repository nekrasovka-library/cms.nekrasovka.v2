const baseApiUrl = process.env.REACT_APP_API;

export function apiFetchProjects() {
  const url = `${baseApiUrl}/api/projects`;
  return fetch(url).then(async (res) => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to fetch templates");
    }
    return res.json();
  });
}

export function apiCreateProject({ payload }) {
  const url = `${baseApiUrl}/api/projects`;
  return fetch(url, {
    method: "POST",
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
