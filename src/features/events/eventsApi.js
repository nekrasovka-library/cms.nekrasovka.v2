const baseApiUrl = process.env.REACT_APP_API;

export function apiFetchEvents() {
  const url = `${baseApiUrl}/api/events`;
  return fetch(url).then(async (res) => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to fetch templates");
    }
    return res.json();
  });
}
