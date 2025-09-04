const baseApiUrl = process.env.REACT_APP_API;

export function apiFetchEvents({ payload }) {
  const params = new URLSearchParams();

  if (payload && typeof payload === "object") {
    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      if (typeof value === "object") {
        params.set(key, JSON.stringify(value));
      } else {
        params.set(key, String(value));
      }
    });
  }

  const queryString = params.toString();
  const url = `${baseApiUrl}/api/blocks${queryString ? `?${queryString}` : ""}`;
  return fetch(url).then(async (res) => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to fetch templates");
    }
    return res.json();
  });
}
