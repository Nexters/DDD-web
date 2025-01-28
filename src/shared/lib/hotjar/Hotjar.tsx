"use client";

import Script from "next/script";

export default function Hotjar() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <Script id="hotjar-script" strategy="afterInteractive">
      {`
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:5281109,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');   
   `}
    </Script>
  );
}
