"use client";

import { NextSeo } from "next-seo";
import React from "react";
import ProductCard from "@/components/ProductCard";
import { useTranslation } from "@/providers/translation";
import { useFavoriteProducts, useFavorites } from "@/hooks/useFavorites";

export default function Fav() {
  const { dictionary } = useTranslation();
  const { favorites } = useFavorites();
  const getFavoriteProducts = useFavoriteProducts(favorites);
  const products = getFavoriteProducts.data;

  return (
    <div>
      <NextSeo title={dictionary["fav"]} />

      <h1 className="text-center text-4xl my-4">{dictionary["fav"]}</h1>
      {!getFavoriteProducts.isLoading ? (
        !!products?.docs.length ? (
          <div className="grid grid-cols-2 md:grid-cols-4">
            {products.docs.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="container mx-auto py-12 text-center text-lg">
            No Products added to Favorites
          </div>
        )
      ) : (
        getFavoriteProducts.isLoading && (
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200px"
              height="200px"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
            >
              <circle
                cx="50"
                cy="50"
                fill="none"
                stroke="#4cabf6"
                strokeWidth="10"
                r="35"
                strokeDasharray="164.93361431346415 56.97787143782138"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  repeatCount="indefinite"
                  dur="1s"
                  values="0 50 50;360 50 50"
                  keyTimes="0;1"
                ></animateTransform>
              </circle>
            </svg>
          </div>
        )
      )}
    </div>
  );
}
