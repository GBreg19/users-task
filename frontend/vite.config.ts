import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/users-task/",
  plugins: [react()],
  // server: { proxy: { "/api": "http://localhost:4000" } },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["alert-dialog"],
  },
});
