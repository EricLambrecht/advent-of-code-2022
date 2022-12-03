import { getDirnameFromImportMetaUrl } from "./getDirnameFromImportMetaUrl.js";
import fs from "fs/promises";

export const readInput = async (fileName = "input.txt") => {
  const __dirname = getDirnameFromImportMetaUrl(import.meta.url)
  return fs.readFile(__dirname + "/" + fileName, {
    encoding: "utf8",
  })
}