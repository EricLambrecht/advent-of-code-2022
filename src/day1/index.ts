import fs from "fs/promises";
import { getDirnameFromImportMetaUrl } from "../util/getDirnameFromImportMetaUrl.js";

export const run = async () => {
  const __dirname = getDirnameFromImportMetaUrl(import.meta.url);
  const input = await fs.readFile(__dirname + "/input.txt", {
    encoding: "utf8",
  });
  const caloriesPerElf = input.split("\n\n").map((i) => i.split("\n"));
  console.log(caloriesPerElf);
};
