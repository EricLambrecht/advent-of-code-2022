import path from "path"
import { fileURLToPath } from "url"

export const getDirnameFromImportMetaUrl = (importMetaUrl: string) => {
  const __filename = fileURLToPath(importMetaUrl)
  return path.dirname(__filename)
}
