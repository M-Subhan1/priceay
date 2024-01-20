"use client";

import { NextSeo } from "next-seo";
import ProductCard from "../components/ProductCard";
import { Product } from "@/payload/payload-types";
import { useTranslation } from "@/providers/translation";
import { Link } from "lucide-react";
import { env } from "../../../env.mjs";

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
        <p className="text-3xl text-center ">{dictionary["perfume-men"]}</p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 my-8">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
      <div className="flex gap-4 my-16 justify-center">
        {[1, 2, 3].map((i) => (
          <>
            <div className="px-4 py-3 border">
              <Link href={`/perfume-men/page/${i}`}>{i}</Link>
            </div>
          </>
        ))}
        <div className="px-4 py-3 border">
          <Link href={`/perfume-men/page/${pageCount}`}>{pageCount}</Link>
        </div>
      </div>
    </>
  );
}
