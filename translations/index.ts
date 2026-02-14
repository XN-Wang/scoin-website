import type { Language } from '../types';
import { en } from './en';
import { zh } from './zh';

export type TranslationKey = keyof typeof en;

/** Combined EN/ZH map for backward compatibility: translations[key][lang] */
const keys = Object.keys(en) as TranslationKey[];
const combined = Object.fromEntries(
  keys.map((k) => [k, { EN: en[k], ZH: zh[k as keyof typeof zh] }])
) as Record<TranslationKey, { EN: string; ZH: string }>;

export const translations = combined;

export { en, zh };

/**
 * Get translation for a key in the given language.
 * Use in components: const t = (key: string) => getT(key, lang);
 */
export function getT(key: string, lang: Language): string {
  const entry = combined[key as TranslationKey];
  if (!entry) return key;
  return entry[lang] ?? key;
}
