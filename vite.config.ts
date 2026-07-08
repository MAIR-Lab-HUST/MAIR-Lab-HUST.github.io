import { existsSync, rmSync, cpSync } from "node:fs"
import { resolve } from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

function copyTmpoStaticPage() {
  return {
    name: "copy-tmpo-static-page",
    closeBundle() {
      const source = resolve(__dirname, "TMPO")
      const target = resolve(__dirname, "dist", "TMPO")

      if (!existsSync(source)) {
        return
      }

      rmSync(target, { recursive: true, force: true })
      cpSync(source, target, { recursive: true })
    },
  }
}

export default defineConfig({
  root: "app",
  plugins: [react(), copyTmpoStaticPage()],
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "app", "src"),
    },
  },
})
