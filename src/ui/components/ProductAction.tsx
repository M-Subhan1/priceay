"use client"

import { Product, Store } from "@/payload/payload-types";
import { useTranslation } from "@/providers/translation";
import Image from "next/image";
import Link from "next/link";

import React, { useEffect, useState } from "react";

type Variant = NonNullable<Product["variantsTab"]["variants"]>[number];

interface Props {
  variations: Variant[];
  selectedVariantIndex: number;
  textToCopy: string;
  setIsVisible: any;
  showPopup: any;
}

export default function ProductAction(props: Props) {
  const { variations, selectedVariantIndex, textToCopy } = props;

  const { dictionary } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);
  const [variantIndex, setVariantIndex] = useState<number>();

  const copyToClipboard = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
    }
  };

  const selectedVariant = () => {
    return variations.find((_, idx) => idx === selectedVariantIndex);
  };

  const storeImg = selectedVariant?.store as Store;

  return (
    <>
      <section className="border border-gray-500">
        <div className="font-IBM text-xss flex justify-between gap-0 flex-shrink-0    px-2  sm:text-sm w-full float-right bg-primaryWarning">
          <span
            className="font-IBM font-semibold hover:cursor-pointer underline transp"
            onClick={() => props.showPopup("condition")}
          >
            الشروط
          </span>
          {selectedVariation()?.store?.data !== null
            ? selectedVariation()?.store?.data.attributes.store_text
            : ""}
        </div>
        <div className="">
          <div className="flex justify-between px-5 mt-8 mb-4   sm:mb-8  sm:mt-16  ">
            <button className="brand">
              <Image
                alt={"Store Image"}
                src={storeImg ? storeImg : "/nice-one.png"}
                width={80}
                height={40}
              />
            </button>
            <div className="flex flex-row-reverse">
              <span className="text-xl mx-2">
                {selectedVariation()?.price ? selectedVariation()?.price : 125}
              </span>
              <span className="font-bold">{dictionary["riyal"]}</span>
            </div>
          </div>
        </div>
        <hr className="bg-gray-400  seprated" />

        <div className="flex justify-around hover:cursor-pointer items-center  my-4">
          <div
            onClick={copyToClipboard}
            className="flex gap-2 transp sm:gap-4 border border-black p-2 sm:p-3 rounded-md border-dashed"
          >
            <span className="text-sm font-bold ">
              {isCopied ? dictionary["copied"] : dictionary["copy-code"]}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${isCopied ? "text-green-700" : ""}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
              <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
            </svg>
          </div>
          <button
            className="hover:cursor-pointer transp"
            onClick={() => props.showPopup("true")}
          >
            {dictionary["more"]}
          </button>
          <button className="bg-primaryBlue text-white rounded-3xl  p-2">
            <Link
              href={selectedVariant ? variation.link : "#"}
              target="_blank"
              rel="noopener"
              className="font-bold"
            >
              {dictionary["go-to-store"]}
            </Link>
          </button>
        </div>
      </section>
    </>
  );
}
