import * as i18next from "i18next";
import zhTW from "../locales/de.json";
import en from "../locales/en.json";

export const LOCALE_DATA: Record<string, string> = {
  de: "Deutsch",
  en: "English",
};
export const DEFAULT_LOCALE = "en";

export function initLocale(locale: string) {
  i18next.init({
    lng: locale,
    resources: {
      de: zhTW,
      en,
    },
  });
}

export async function switchLocale(locale: string) {
  await i18next.changeLanguage(locale);
}

export class LocaleActor {
  prefixArr: string[];

  constructor(prefix: string) {
    this.prefixArr = prefix.split(".");
  }

  t(key: string, options?: string | i18next.TOptions): string {
    const heading = key.match(/(^\.+)/g);
    if (heading !== null) {
      if (heading[0].length === 1) {
        key = `${this.prefixArr.join(".")}${key}`;
      } else {
        const prefix = this.prefixArr.slice(0, -1 * (heading[0].length - 1));
        key = `${prefix.join(".")}.${key.replace(/\.+/g, "")}`;
      }
    }
    return i18next.t(key, options);
  }
}

export function localeOptions(): { label: string; value: string }[] {
  return Object.keys(LOCALE_DATA).map((locale) => {
    return { label: LOCALE_DATA[locale], value: locale };
  });
}

export function detectLocalLocale(): string {
  const preferredLangs = window.navigator.languages;
  const localLocale = preferredLangs.filter((value) => {
    return Object.keys(LOCALE_DATA).includes(value);
  })[0];
  return localLocale || DEFAULT_LOCALE;
}
