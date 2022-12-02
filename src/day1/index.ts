import fs from 'fs/promises';
import { getDirnameFromImportMetaUrl } from "../util/getDirnameFromImportMetaUrl.js";

export const run = async () => {
    const __dirname = getDirnameFromImportMetaUrl(import.meta.url);
    console.log('loading', __dirname + '/input.txt');
    const input = await fs.readFile(__dirname + '/input.txt', { encoding: 'utf8' })
    console.log(input);
}