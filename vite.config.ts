import {
  fileURLToPath,
  URL
} from "node:url";
import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";
import mkcert from "vite-plugin-mkcert";

// https://vite.dev/config/
// eslint-disable-next-line no-restricted-exports
export default defineConfig({
  plugins: [react(), mkcert()],
  define: {"import.meta.env.VITE_BASE_URL": JSON.stringify(
    process.env.CI ? "/bleedcode-interview/" : "/",
  ),},
  resolve: {alias: {"@": fileURLToPath(new URL("./src", import.meta.url))}},
});
