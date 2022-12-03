import fs from "fs/promises"
import { getDirnameFromImportMetaUrl } from "../util/getDirnameFromImportMetaUrl.js"

interface Elf {
  name: string
  calories: number[]
}

export const run = async () => {
  const __dirname = getDirnameFromImportMetaUrl(import.meta.url)
  const input = await fs.readFile(__dirname + "/input.txt", {
    encoding: "utf8",
  })
  const caloriesPerElf = input.split("\n\n").map((rawCalories, i) => {
    const calories = rawCalories.split("\n")
    return {
      name: `${i + 1}. Elf`,
      calories,
    }
  })
  console.log(caloriesPerElf)
}
