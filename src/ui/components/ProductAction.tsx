"use client";

import { Media, Product, Store } from "@/payload/payload-types";
import { useTranslation } from "@/providers/translation";
import Image from "next/image";
import Link from "next/link";

import React, { useState } from "react";

type Price = Product["variants"][number]["stores"][number];

interface Props {
  price: Price;
}

export default function ProductAction({ price }: Props) {
  const { dictionary, lang } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);
  const store = price.store as Store;
  const storeImage = store.storeImage as Media;
  const aspectRatio = (storeImage.width || 80) / (storeImage.height || 40);
  const discountCode = store?.discountCode;

  const copyToClipboard = async () => {
    if (navigator.clipboard && discountCode) {
      await navigator.clipboard.writeText(discountCode);
      setIsCopied(true);
    }
  };

  return (
    <>
      <section className="border border-gray-500 my-2">
        <div className="font-IBM text-xss flex justify-between gap-0 flex-shrink-0    px-2  sm:text-sm w-full float-right bg-primaryWarning">
          {lang === "en" && store.conditions && (
            <span className="font-IBM font-semibold hover:cursor-pointer underline transp">
              Conditions
            </span>
          )}
          {lang === "ar" && store.conditions && (
            <span className="font-IBM font-semibold hover:cursor-pointer underline transp">
              الشروط
            </span>
          )}
          {lang === "en" ? store.storeTextEnglish : store.storeTextArabic}
        </div>

        <div className="flex justify-between px-5 mt-8 mb-4   sm:mb-8  sm:mt-16  ">
          <button className="brand">
            <Image
              alt={`Store Image - ${store.name}`}
              src={storeImage.url ? storeImage.url : "/nice-one.png"}
              height={40}
              width={aspectRatio * 40}
            />
          </button>
          <div className="flex flex-row-reverse gap-2">
            <span className="text-xl mx-2">{price.price}</span>
            <span className="font-bold">{dictionary["riyal"]}</span>
            <div>Out of Stock</div>
          </div>
        </div>

        <hr className="bg-gray-400  seprated" />
        <div className="flex justify-around hover:cursor-pointer items-center  my-4">
          {discountCode && (
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
          )}
          <button className="hover:cursor-pointer transp">
            {dictionary["more"]}
          </button>
          <button className="bg-primaryBlue text-white rounded-3xl  p-2">
            <Link
              href={price.link ? price.link : "#"}
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
