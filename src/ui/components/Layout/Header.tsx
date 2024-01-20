"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/providers/translation";
import { Locale, i18n } from "../../../../i18n-config";
import { redirectedPathName } from "@/utils/redirected-pathname";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { dictionary, lang } = useTranslation();
  const pathname = usePathname();

  const navBar = [
    { title: dictionary["perfume-men"], slug: "perfume-men" },
    { title: dictionary["perfume-women"], slug: "perfume-women" },
    { title: dictionary["perfume-unisex"], slug: "perfume-unisex" },
    { title: dictionary["fav"], slug: "fav" },
    { title: dictionary["stores"], slug: "stores" },
    { title: dictionary["contact-us"], slug: "contact-us" },
    { title: dictionary["privacy-policy"], slug: "privacy-policy" },
    { title: dictionary["terms-and-condition"], slug: "terms-and-condition" },
  ];

  return (
    <header>
      <nav className="flex justify-between py-1 px-4 items-center     ">
        <div className="logo text-4xl ">
          <Link href={"/"}>
            <Image alt="logo" width={130} height={45} src={"/imgs/logo.png"} />
          </Link>
        </div>
        <div className=" md:hidden flex gap-2 items-center justify-center hover:cursor-pointer">
          <div className="    ">
            <Link
              href={"https://onelink.to/xu2b6x"}
              target="_blank"
              rel="noopener"
            >
              <Image alt="logo" width={130} height={40} src={"/imgs/ss.png"} />
            </Link>
          </div>

          <Link href={`/search`} className="" legacyBehavior>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </Link>

          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 hover:cursor-pointer block md:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
              onClick={() => setIsOpen(!isOpen)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 hover:cursor-pointer block md:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
              onClick={() => setIsOpen(!isOpen)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </div>
        <div
          className={`${
            isOpen
              ? "absolute flex-col px-6"
              : "hidden md:flex items-center w-full"
          } py-4   bg-white  w-screen top-12 left-0 z-50 flex gap-4  nav-items md:flex-row md:justify-end md:items-center  md:gap-4  lg:gap-6`}
        >
          {navBar.map((navlink) => (
            <Link
              href={`${lang}/${navlink.slug}`}
              key={`${lang}/${navlink.slug}`}
              className={"hover:underline py-2 border-b-2 md:border-b-0"}
            >
              {navlink.title}
            </Link>
          ))}

          <div>
            {i18n.locales.map((loc) => (
              <Link
                href={redirectedPathName(pathname ?? "#", loc)}
                className="pb-2 border-b-2 md:border-b-0"
                key={loc}
              >
                <button
                  className={`mx-2 p-2 border  ${
                    loc === lang ? "border-blue-400" : ""
                  }`}
                >
                  {loc}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
