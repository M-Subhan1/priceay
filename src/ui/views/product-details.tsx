"use client";

import ProductAction from "@/components/ProductAction";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import { NextSeo } from "next-seo";
import { useFavorites } from "@/hooks/useFavorites";
import { Brand, Media, Product } from "@/payload/payload-types";
import { useTranslation } from "@/providers/translation";

interface Props {
  product: Product;
}

export default function ProductDetails({ product }: Props) {
  const { dictionary, lang } = useTranslation();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isVisible, setIsVisible] = useState(false);
  const [variantIndex, setVariantIndex] = useState(0);

  const variants = product.variants;
  const brand = product.brand as Brand;
  const selectedVariant = product.variants.at(variantIndex)!;
  const sortedStores =
    selectedVariant?.stores.sort((a, b) => a.price - b.price) || [];

  const stores = sortedStores
    .filter((s) => s.enabled)
    .concat(sortedStores.filter((s) => !s.enabled));

  const diff =
    Math.abs(Date.now() - new Date(product.updatedAt).getTime()) / 36e5;

  const lastUpdateAt = diff >= 24 ? "24" : diff <= 1 ? "1" : diff.toFixed(0);

  return (
    <>
      <NextSeo
        title={lang === "ar" ? product.nameArabic : product.nameEnglish}
        canonical={
          process.env.NEXT_PUBLIC_DOMAIN_NAME + "/products/" + product.slug
        }
        openGraph={{
          title: lang === "ar" ? "product.nameArabic" : "product.nameEnglish",
          locale: lang,
          images: [
            {
              url: (product.productImage as Media).url!,
              alt:
                (product.productImage as Media).alt ||
                `${product.nameEnglish} Image`,
            },
          ],
        }}
      />
      <div className={`px-3 `}>
        <div className="flex justify-center product mt-6">
          <Image
            alt={
              (product.productImage as Media).alt ||
              `${product.nameEnglish} Image`
            }
            src={(product.productImage as Media).url!}
            height={250}
            objectFit="contain"
            width={200}
          />
        </div>
        <div className="flex flex-col  justify-end items-end ">
          <h1 className="text-xl ">
            {lang === "ar" ? product.nameArabic : product.nameEnglish}
          </h1>
          <div className="flex w-full items-center justify-between">
            <div
              onClick={() => toggleFavorite(product.id)}
              className="transp cursor-pointer"
            >
              {isFavorite(product.id) ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-red-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12  "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </>
              )}
            </div>
            <div className="">
              <Link
                className="font-bold"
                href={brand.slug ? `/${lang}/brands/${brand.slug}` : "#"}
              >
                {brand.name}
              </Link>
            </div>
          </div>
          <div className=" ">
            {dictionary["best-price"].replace("{{qty}}", selectedVariant.name)}
          </div>
          <div className="my-4 flex gap-8">
            {variants.map((variant, idx) => (
              <div
                key={idx}
                onClick={() => setVariantIndex(idx)}
                className={`border  cursor-pointer rounded-full   ${
                  variantIndex == idx ? "selected border-blue-700" : ""
                } border-gray-900 transp py-1 px-3`}
              >
                {variant.name}
              </div>
            ))}
          </div>
        </div>

        {stores.map((price) => (
          <ProductAction key={price.id} price={price} />
        ))}

        <p className="flex justify-end">
          {dictionary["updated"].replace("{{hours}}", lastUpdateAt)}
        </p>
      </div>
    </>
  );
}
