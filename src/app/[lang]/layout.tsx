import "../../styles/globals.css";
import "../../styles/main.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import Header from "@/components/Layout/Header";
import Analytics from "@/ui/components/Analytics";

import { ParamsWithLang } from "@/types";
import { PropsWithChildren } from "react";
import { TranslationProvider } from "@/providers/translation";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { AppProvider } from "@/providers/app";
import { Almarai, Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";

type Props = PropsWithChildren<{
  params: ParamsWithLang;
}>;

const almarai = Almarai({
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-almarai",
  subsets: ["arabic"],
});

const cairo = Cairo({
  weight: ["200", "300", "400", "600"],
  display: "swap",
  variable: "--font-cairo",
  subsets: ["latin"],
});

const ibm = IBM_Plex_Sans_Arabic({
  weight: ["400", "600"],
  display: "swap",
  subsets: ["arabic"],
  variable: "--font-ibm",
});

export default async function Root({ params, children }: Props) {
  const { lang } = params;
  const dictionary = await getDictionary(lang ?? "ar");

  return (
    <html lang={lang}>
      <body>
        <AppProvider>
          <TranslationProvider value={{ lang, dictionary }}>
            <Header />
            <main
              className={`${ibm.className} ${almarai.className} ${
                cairo.className
              } ${lang === "ar" ? "font-Almarai" : "font-Cairo"}`}
            >
              {children}
            </main>
            <Analytics />
          </TranslationProvider>
        </AppProvider>
      </body>
    </html>
  );
}
