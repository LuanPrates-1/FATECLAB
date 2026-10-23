/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // O modo demonstração usa rotas com # e caminhos relativos, para funcionar em qualquer pasta.
  base: mode === "demo" ? "./" : "/",
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
  },
}));
