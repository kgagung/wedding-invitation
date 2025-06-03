import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);

export function generateKodeUndangan() {
  return nanoid(); // contoh: '3gT9yzkd10'
}
