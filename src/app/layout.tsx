import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-headings",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "O CORTE | Modern Barbershop & Grooming Laboratory | Viseu, Portugal",
  description: "Experience premium styling, custom cuts, and professional grooming rituals at O CORTE in Viseu. Browse our specialized laboratory products and book your chair in seconds.",
  keywords: ["barbershop viseu", "barber portugal", "lightning mcqueen barber chair", "haircut viseu", "grooming products", "hair clinic", "beard care"],
  authors: [{ name: "O CORTE Team" }],
  openGraph: {
    title: "O CORTE | Modern Barbershop & Grooming Laboratory",
    description: "Premium hair and beard care rituals in Viseu, Portugal. Seamless online booking and high-performance grooming products.",
    type: "website",
    locale: "pt_PT",
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export const viewport: Viewport = {
  themeColor: "#FF5A1F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="no-scroll-x">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
