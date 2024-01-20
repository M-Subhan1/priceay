"use client";

import { PropsWithChildren, createContext, useContext } from "react";
import { Locale } from "../../i18n-config";
import { getDictionary } from "../dictionaries/get-dictionary";

type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
type TranslationContextProps = {
  lang: Locale;
  dictionary: Dictionary;
};

const TranslationContext = createContext<TranslationContextProps | null>(null);

const useTranslation = () => {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }

  return context;
};

const TranslationProvider = (
  props: PropsWithChildren<{
    value: {
      lang: Locale;
      dictionary: Dictionary;
    };
  }>
) => {
  return (
    <TranslationContext.Provider value={props.value}>
      {props.children}
    </TranslationContext.Provider>
  );
};

export { TranslationProvider, useTranslation };
