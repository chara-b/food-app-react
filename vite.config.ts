import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import Checker from "vite-plugin-checker";

import AutoImport from "unplugin-auto-import/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
    Checker({ typescript: true }),
    AutoImport({
      imports: ["react", "react-router-dom"],
      dirs: ["./src/features/", "./src/shared/", "./src/api/"],
      dts: "./src/auto-imports.d.ts",
    }),
  ],
});
