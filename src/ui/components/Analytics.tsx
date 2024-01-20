// Analytics.tsx
"use client";

import Script from "next/script";

const GTM_ID = "G-33C36W7MN7";

export default function Analytics() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") {
    return null;
  }

  return (
    <>
      <Script
        id="15"
        strategy={"lazyOnload"}
        src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
      />
      <Script strategy="lazyOnload" id="16">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GTM_ID}');
        `}
      </Script>
    </>
  );
}
