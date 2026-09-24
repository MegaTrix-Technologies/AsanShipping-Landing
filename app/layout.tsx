import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://asanshipping.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Asan Shipping — Autonomous Logistics Control Tower for Pakistan",
    template: "%s | Asan Shipping",
  },
  description:
    "Pakistan's premier AI-driven autonomous logistics engine. Eliminate COD RTO friction with automated WhatsApp verification, multi-courier routing (TCS, Trax, Leopards, PostEx, M&P), and reverse scrap management.",
  keywords: [
    "courier Pakistan",
    "ecommerce shipping Pakistan",
    "COD RTO reduction",
    "TCS API",
    "Trax Logistics",
    "PostEx courier",
    "Leopards Courier",
    "M&P courier",
    "Shopify Pakistan app",
    "reverse logistics barcode scan",
  ],
  authors: [{ name: "Asan Shipping Team" }],
  creator: "Asan Shipping",
  publisher: "Asan Shipping",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: siteUrl,
    siteName: "Asan Shipping",
    title: "Asan Shipping — Autonomous Logistics Control Tower for Pakistan",
    description:
      "Automate COD WhatsApp verification, eliminate RTO losses, and auto-route orders across Pakistan's top couriers.",
    images: [
      {
        url: "/images/login-screen-logo.png",
        width: 1200,
        height: 630,
        alt: "Asan Shipping Control Tower",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asan Shipping — Courier OS for Pakistan",
    description:
      "Automate COD verification, reduce RTO losses, and dispatch via TCS, Trax, Leopards, PostEx, and M&P.",
    images: ["/images/login-screen-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${manrope.variable} ${sora.variable}`}>
      <body className="min-h-screen font-sans antialiased bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
