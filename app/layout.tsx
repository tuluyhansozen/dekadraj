import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SubscriptionPopup } from "@/components/SubscriptionPopup";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dekadraj | Sinema Kolektifi",
    template: "%s | Dekadraj",
  },
  description:
    "Politik minimalizm, entelektüel doku ve sinematik direniş. Kadrın dışına çıkanların dijital mecmuası.",
  metadataBase: new URL("https://dekadraj.com"),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Dekadraj",
  },
  other: {
    "theme-color": "#F4F1E8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
      </head>
      <body className="min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-action focus:text-canvas focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:uppercase focus:tracking-wider"
        >
          İçeriğe Geç
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <SubscriptionPopup />
      </body>
    </html>
  );
}
