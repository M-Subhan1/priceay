import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Media, Product } from "@/payload/payload-types";
import { useTranslation } from "@/providers/translation";

export default function ProductCard(props: { product: Product }) {
  const { product } = props;
  const { lang } = useTranslation();
  const productImage = product.productImage as Media;
  const aspectRatio =
    (productImage.width || 300) / (productImage.height || 200);

  return (
    <Link href={`/products/${product.slug}`} legacyBehavior>
      <div className="flex flex-col hover:cursor-pointer items-center justify-center">
        <div>
          {productImage.url ? (
            <Image
              src={"/perfume.png"}
              objectFit="contain"
              alt={productImage.alt || `${product.nameEnglish} Image`}
              className="align-middle"
              height={200}
              width={aspectRatio * 200}
            />
          ) : (
            <div className="w-24 h-24"></div>
          )}
        </div>
        <h3 className="text-center">
          <Link href={`/products/${product.slug}`}>
            {lang === "en"
              ? product.nameEnglish.substring(0, 40)
              : product.nameArabic.substring(0, 40)}
            ...
          </Link>
        </h3>
      </div>
    </Link>
  );
}
