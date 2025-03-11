import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    outDir: "dist",
  },
  server: {
    proxy: {
      "/api": {
        target: "http://173.249.28.63", // Change this to your actual API URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
