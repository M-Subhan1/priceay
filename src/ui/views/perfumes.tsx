"use client";

import { NextSeo } from "next-seo";
import ProductCard from "../components/ProductCard";
import { Product } from "@/payload/payload-types";
import { useTranslation } from "@/providers/translation";
import { env } from "../../../env.mjs";
import { usePagination } from "@/hooks/usePagination";
import Link from "next/link";

type Props = {
  products: Product[];
  currentPage: number;
  pageCount: number;
  slug: "perfume-men" | "perfume-women" | "perfume-unisex";
};

export default async function Perfumes({
  slug,
  products,
  currentPage,
  pageCount,
}: Props) {
  const { dictionary, lang } = useTranslation();
  const pages = usePagination({
    page: currentPage,
    total: pageCount,
  });

  return (
    <>
      <NextSeo
        title={dictionary[slug]}
        canonical={env.NEXT_PUBLIC_APP_URL + slug}
        openGraph={{
          title: dictionary[slug],
          locale: lang,
        }}
      />
      <div className="px-3">
        <p className="text-3xl text-center ">{dictionary[slug]}</p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 my-8">
          {Array.from({ length: 25 }).map((_, idx) => (
            <ProductCard product={products[0]!} key={idx} />
          ))}
        </div>
      </div>
      <div className="flex gap-4 my-16 justify-center">
        {pages.map((i) => (
          <div
            key={i}
            className={`px-4 py-3 border ${
              currentPage === i && "border-purple-300"
            }`}
          >
            <Link href={`/${lang}/${slug}?page=${i}`}>{i}</Link>
          </div>
        ))}
      </div>
    </>
  );
}
