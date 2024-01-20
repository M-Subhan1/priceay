/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    products: Product;
    brands: Brand;
    stores: Store;
    media: Media;
    users: User;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {};
}
export interface Product {
  id: string;
  nameEnglish: string;
  nameArabic: string;
  slug?: string | null;
  brand: string | Brand;
  gender: 'Male' | 'Female' | 'Unisex';
  productImage: string | Media;
  variants?:
    | {
        name: string;
        store?: (string | null) | Store;
        link: string;
        price: number;
        sku: string;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
export interface Brand {
  id: string;
  name: string;
  startsWith?: string | null;
  slug?: string | null;
  updatedAt: string;
  createdAt: string;
}
export interface Media {
  id: string;
  alt?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
}
export interface Store {
  id: string;
  name: string;
  url: string;
  storeImage: string | Media;
  storeTextEnglish?: string | null;
  storeTextArabic?: string | null;
  moreTextEnglish?: string | null;
  moreTextArabic?: string | null;
  discountCode?: string | null;
  conditions?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}