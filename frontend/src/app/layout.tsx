import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const SITE_URL = "https://ask-vadym.com";
const SITE_TITLE = "Vadym Marochok | AI Automation and Quality Engineering";
const SITE_DESCRIPTION =
  "Agentic workflows, LLM integrations, and business automation, backed by a decade of quality engineering and test automation.";

export const metadata: Metadata = {
  // Required so relative Open Graph image paths resolve to absolute URLs.
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    url: SITE_URL,
    siteName: "Ask Vadym",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vadym Marochok — AI Automation and Quality Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="e75414ca-ace6-4cc8-8842-ecd18e0e81f4"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Script
          id="cal-embed"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(C,A,L){
                let p=function(a,ar){a.q.push(ar);};
                let d=C.document;
                C.Cal=C.Cal||function(){
                  let cal=C.Cal;let ar=arguments;
                  if(!cal.loaded){cal.ns={};cal.q=cal.q||[];d.head.appendChild(d.createElement("script")).src=A;cal.loaded=true;}
                  if(ar[0]===L){const api=function(){p(api,arguments);};const ns=ar[1];api.q=api.q||[];if(typeof ns==="string"){cal.ns[ns]=cal.ns[ns]||api;p(cal.ns[ns],ar);p(cal,[L,ns,api]);}else{p(cal,ar);}return;}
                  p(cal,ar);
                };
              })(window,"https://app.cal.com/embed/embed.js","init");
              Cal("init",{origin:"https://cal.com"});
            `,
          }}
        />
      </body>
    </html>
  );
}
