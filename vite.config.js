import { globSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const htmlEntries = ["index.html", ...globSync("boards/**/*.html")];

export default defineConfig({
  base: "/hunter-saas-moodboards/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        htmlEntries.map((file) => [file.replaceAll("/", "_").replace(".html", ""), resolve(file)]),
      ),
    },
  },
});
