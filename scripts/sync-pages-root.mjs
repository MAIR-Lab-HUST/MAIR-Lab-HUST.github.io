import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const dist = resolve(root, "dist")
const requiredFiles = ["index.html", "assets"]

for (const file of requiredFiles) {
  const source = resolve(dist, file)
  if (!existsSync(source)) {
    throw new Error(`Missing build output: ${source}`)
  }
}

rmSync(resolve(root, "assets"), { recursive: true, force: true })
cpSync(resolve(dist, "index.html"), resolve(root, "index.html"))
cpSync(resolve(dist, "assets"), resolve(root, "assets"), { recursive: true })
