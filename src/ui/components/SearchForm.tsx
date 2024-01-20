"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useDebounce } from "use-debounce";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "./ProductCard";

export default function SearchForm({
  setIsSearching,
}: {
  setIsSearching: (v: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 250);
  const productsQuery = useProducts({ query: debouncedQuery });

  const goBack = () => {
    setIsSearching(false);
  };

  return (
    <div className="w-full bg-white fixed z-50 px-4 min-h-screen py-2 top-0 left-0 right-0 bottom-0 m-auto">
      <div className="my-12 w-full">
        <div className="relative">
          <ArrowLeft
            onClick={goBack}
            className="left-2 top-1/2 -translate-y-1/2 absolute hover:cursor-pointer"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-2.5 px-8 border border-black focus:border-purple-300 font-medium"
          />
        </div>
      </div>

      <div className="container w-full mx-auto">
        {!productsQuery.isLoading && (
          <div className="grid grid-cols-2 gap-4">
            {productsQuery.data?.docs.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
