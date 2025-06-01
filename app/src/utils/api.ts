import axios from "axios";

// IMPORTANT: For cookies to work with authentication, ensure:
// 1. Backend sets cookies with SameSite=None; Secure (for HTTPS/cross-origin)
// 2. Backend sets Access-Control-Allow-Credentials: true
// 3. Backend sets Access-Control-Allow-Origin to the exact frontend origin (not *)
// 4. Frontend uses credentials: 'include' (fetch) or withCredentials: true (axios)
// 5. baseURL matches the backend you are running (local/prod)

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.kargo.upayan.dev";

if (typeof window !== "undefined") {
  const frontendOrigin = window.location.origin;
  if (!baseURL.startsWith(frontendOrigin)) {
    // Warn developer in dev mode if origins mismatch
    console.warn(
      `WARNING: Frontend origin (${frontendOrigin}) does not match backend baseURL (${baseURL}).\nCookies may not be sent/received properly.\nEnsure CORS and cookie settings are correct on the backend.`
    );
  }
}

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export { baseURL };
export default instance;
