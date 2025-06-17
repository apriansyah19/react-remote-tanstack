import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote_app",
      filename: "remoteEntry.js",
      exposes: {
        "./remoteReact": "./src/bootstrap.tsx",
      },
      shared: [
        "react",
        "react-dom",
        "react-router-dom",
        "@tanstack/react-query",
      ],
    }),
  ],
  server: {
    port: 9093,
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 👉 alias @ untuk src
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
});
