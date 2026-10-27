import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import localFont from "next/font/local";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

// Body font — Satoshi (Fontshare), self-hosted variable font, weights 300–900.
const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Variable.woff2", weight: "300 900", style: "normal" },
    { path: "./fonts/Satoshi-VariableItalic.woff2", weight: "300 900", style: "italic" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

// Heading font — Rethink Sans (Google Fonts), variable font, weights 400–800.
const rethinkSans = Rethink_Sans({
  variable: "--font-rethink-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Beyond The Fall Initiative",
    template: "%s | Beyond The Fall Initiative",
  },
  description:
    "Beyond The Fall Initiative helps individuals and small business owners who have experienced significant setbacks rebuild their lives and livelihoods.",
};

const revealScript = `(function(){var d=document.documentElement;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("reveal");setTimeout(function(){if(!d.classList.contains("reveal-ready"))d.classList.remove("reveal")},4000)})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script below adds classes to <html> before React loads.
    <html
      lang="en"
      className={`${satoshi.variable} ${rethinkSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Hide [data-reveal] elements until the scroll reveals take over, so nothing flashes.
            Skipped for reduced motion; undone after 4s if the reveal code never starts. */}
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </head>
      <body id="top" className="min-h-full">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:font-bold focus:text-surface"
        >
          Skip to content
        </a>
        <SiteHeader />
        <SmoothScroll>
          {children}
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
