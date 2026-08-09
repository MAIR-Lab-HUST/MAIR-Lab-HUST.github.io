import { existsSync, rmSync, cpSync, copyFileSync, mkdirSync } from "node:fs"
import { resolve } from "node:path"
import tailwindcss from "@tailwindcss/vite"
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

function createRouteEntryPoints() {
  return {
    name: "create-route-entry-points",
    closeBundle() {
      const dist = resolve(__dirname, "dist")
      const source = resolve(dist, "index.html")
      const routes = ["about", "research", "publications", "projects", "people", "join"]

      if (!existsSync(source)) return

      for (const route of routes) {
        const targetDirectory = resolve(dist, route)
        mkdirSync(targetDirectory, { recursive: true })
        copyFileSync(source, resolve(targetDirectory, "index.html"))
      }
    },
  }
}

export default defineConfig({
  root: "app",
  plugins: [react(), tailwindcss(), copyTmpoStaticPage(), createRouteEntryPoints()],
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
