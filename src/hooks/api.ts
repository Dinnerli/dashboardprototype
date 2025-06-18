import axios from "axios";

// Create a reusable axios instance with interceptors for base URL and tenant site
const api = axios.create();

api.interceptors.request.use((config) => {
  const baseUrl = import.meta.env.VITE_BASE_URL || "";
  
  // Get site from URL params, fallback to playground
  const urlParams = new URLSearchParams(window.location.search);
  const site = urlParams.get("site") || "playground";
  
  // If the request URL is relative, prepend the base URL
  if (config.url && !config.url.startsWith("http")) {
    config.url = `${baseUrl}${config.url}`;
  }
  // Add tenant site param to all requests if not present
  if (config.url) {
    const url = new URL(config.url, window.location.origin);
    if (!url.searchParams.has("site")) {
      url.searchParams.set("site", site);
    }
    config.url = url.pathname + "?" + url.searchParams.toString();
  }
  return config;
});

// Response interceptor to handle global 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check for 401 unauthorized error on any endpoint
    if (error.response && error.response.status === 401) {
      // Remove dashboard filter storage on unauthorized
      localStorage.removeItem('dashboard-filters');
      // Redirect to base URL on unauthorized access
      const baseUrl = import.meta.env.VITE_BASE_URL || "/";
      window.location.href = baseUrl;
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export { api };