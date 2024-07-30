import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  const VITE_PORT = process.env.VITE_PORT || 5173;
  const API_APP_PROTOCOL =
    process.env.APP_PROTOCOL || process.env.API_APP_PROTOCOL || "http";
  const API_APP_HOST =
    process.env.APP_HOST || process.env.API_APP_HOST || "0.0.0.0";
  const API_APP_PORT = process.env.APP_PORT || process.env.API_APP_PORT || 4025;
  return {
    // vite config
    plugins: [react()],
    css: {
      postcss: {
        plugins: [
          tailwindcss("./client/user_module/tailwind.config.js"),
          autoprefixer
        ]
      }
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV)
    },
    root: "./client/user_module",
    base: "/",
    server: {
      port: VITE_PORT,
      proxy: {
        "/api": `${API_APP_PROTOCOL}://${API_APP_HOST}:${API_APP_PORT}`
      },
      watch: {
        usePolling: true
      }
    }
  };
});
