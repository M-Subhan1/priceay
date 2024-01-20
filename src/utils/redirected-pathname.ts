import { Locale } from "../../i18n-config";

export const redirectedPathName = (pathname: string, locale: Locale) => {
  if (!pathname) return "/";
  const segments = pathname.split("/");
  segments[1] = locale;
  return segments.join("/");
};
