import "server-only";
import { Locale } from "../../i18n-config";

const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  ar: () => import("./ar.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => await dictionaries[locale]();
