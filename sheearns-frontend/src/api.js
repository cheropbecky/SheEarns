const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || "http://127.0.0.1:8000";

function buildUrl(path) {
  if (!path.startsWith("/")) {
    return `${API_BASE_URL}/${path}`;
  }
  return `${API_BASE_URL}${path}`;
}

async function apiRequest(path, options = {}) {
  let authHeader = {};
  try {
    const savedUser = localStorage.getItem("sheearns_user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      if (parsed?.token) {
        authHeader = { Authorization: `Bearer ${parsed.token}` };
      }
    }
  } catch {
    authHeader = {};
  }

  const response = await fetch(buildUrl(path), {
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
      ...(options.headers || {}),
    },
    ...options,
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const message = payload?.detail || payload?.message || "Request failed";
    throw new Error(message);
  }

  return payload;
}

export { API_BASE_URL, buildUrl, apiRequest };