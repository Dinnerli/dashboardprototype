import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
   base: mode === 'production'
    ? 'https://insightdesk.layupcloud.com/'
    : '/',
  server: mode === 'development'
    ? {
        host: '::',
        port: 8080,
    proxy: {
      // Proxy any call that starts with /layuplive to your PHP backend
      "/layuplive": {
        target: "http://localhost",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/layuplive/, "/layuplive"),
        cookieDomainRewrite: "localhost",
      },
    },
  }
    : undefined,
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
