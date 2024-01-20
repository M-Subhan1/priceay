import type { Locale } from "../i18n-config";
import { Product } from "./payload/payload-types";

export type ParamsWithLang<T = unknown> = {
  lang: Locale;
} & T;

export type PayloadResponse<T = unknown> = {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: unknown;
  nextPage: unknown;
};
