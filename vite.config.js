import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import AutoImport from "unplugin-auto-import/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    AutoImport({
      imports: ["react", "react-router-dom"],
      dirs: ["./src/hooks", "./src/components"],
      dts: "./src/auto-imports.d.ts",
    }),
  ],
});
