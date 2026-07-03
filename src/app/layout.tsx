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
  title: "Barbearia +55 | Barbearia em Viseu | Cortes, Barba & Grooming",
  description: "Barbearia em Viseu especializada em cortes de cabelo, barba e grooming masculino. Marque online de forma rápida e descubra uma experiência moderna e personalizada.",
  keywords: ["barbearia viseu", "barber portugal", "lightning mcqueen barber chair", "haircut viseu", "grooming products", "hair clinic", "beard care"],
  authors: [{ name: "Barbearia +55" }],
  openGraph: {
    title: "Barbearia +55 | Barbearia em Viseu | Cortes, Barba & Grooming",
    description: "Barbearia em Viseu especializada em cortes de cabelo, barba e grooming masculino. Marque online de forma rápida e descubra uma experiência moderna e personalizada.",
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
