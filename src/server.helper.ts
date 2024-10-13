import serve from 'serve-static';
import path, { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const dir = join(__dirname, '../public');
export const servePublic = serve(dir);

// serve QR code
const dir2 = join(__dirname, '../');
export const serveFile = serve(dir2);