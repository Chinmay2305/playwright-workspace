import fs from 'fs';
import path from 'path';

type Locators = Record<string, any>;

export interface Properties {
  baseUrl: string;
  loginUrl: string;
  inventoriesUrl: string;
  email: string;
  password: string;
  locators: Locators;
}

let props: Properties | null = null;

export function loadConfig(): Properties {
  if (props) return props;
  const file = path.resolve(__dirname, './properties.json');
  const raw = fs.readFileSync(file, { encoding: 'utf8' });
  props = JSON.parse(raw) as Properties;
  return props;
}

export function get(key: keyof Properties) {
  const cfg = loadConfig();
  // @ts-ignore
  return cfg[key];
}

export function getLocator(pathStr: string) {
  const cfg = loadConfig();
  const parts = pathStr.split('.');
  let cur: any = cfg.locators;
  for (const p of parts) {
    if (!cur) return null;
    cur = cur[p];
  }
  return cur;
}

