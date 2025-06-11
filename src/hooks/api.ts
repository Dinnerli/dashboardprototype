import axios from "axios";

// Create a reusable axios instance with interceptors for base URL and tenant site
const api = axios.create();

api.interceptors.request.use((config) => {
  const baseUrl = import.meta.env.VITE_BASE_URL || "";
  const site = import.meta.env.VITE_TENANT_SITE;
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

export { api };