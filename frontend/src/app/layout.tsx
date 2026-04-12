import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ask Vadym | AI QA Engineer",
  description:
    "Chat with an AI assistant to learn about Vadym Marochok experience as an QA Engineer with 10+ years in Quality Assurance, test automation, Playwright, and AI testing.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Ask Vadym | AI QA Engineer",
    description:
      "Chat with an AI assistant to learn about Vadym Marochok's professional experience in QA and test automation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
