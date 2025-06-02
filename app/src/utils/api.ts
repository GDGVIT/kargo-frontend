import axios from "axios";

// IMPORTANT: For cookies to work with authentication, ensure:
// 1. Backend sets cookies with SameSite=None; Secure (for HTTPS/cross-origin)
// 2. Backend sets Access-Control-Allow-Credentials: true
// 3. Backend sets Access-Control-Allow-Origin to the exact frontend origin (not *)
// 4. Frontend uses credentials: 'include' (fetch) or withCredentials: true (axios)
// 5. baseURL matches the backend you are running (local/prod)

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.kargo.upayan.dev";

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export { baseURL };
export default instance;
