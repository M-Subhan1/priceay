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

type Props = PropsWithChildren<{
  params: ParamsWithLang;
}>;

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
              className={params.lang === "ar" ? "font-Almarai" : "font-Cairo"}
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
