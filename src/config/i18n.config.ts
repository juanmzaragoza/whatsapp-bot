import { I18n } from 'i18n';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); 

export const i18n = new I18n({
  locales: ['en', 'es'],
  defaultLocale: 'es',
  register: global,
  directory: path.join(__dirname, 'locales')
});

export const __ = (key = ''): string => {
  return i18n.__(key);
}

export const languages = {
  1: 'es',
  2: 'en'
}