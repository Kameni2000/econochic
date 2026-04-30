import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CartDrawer from '@/components/CartDrawer'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Onyx & Soie by Kameni | Robes Haute Couture & Gala",
  description: "Découvrez la collection exclusive Onyx & Soie par Kameni. Robes de mariée, de bal et de gala au design minimaliste et luxueux.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* 1. Ajoute le Header ici pour qu'il soit disponible partout */}
        <Header />
        {/* 2. Ajoute le CartDrawer ici pour qu'il soit disponible partout */}
        <CartDrawer />
        {children}
        {/* 3. Ajoute le Footer ici pour qu'il soit disponible partout */}
        <Footer />
        {/* 4. Ajoute le bouton WhatsApp ici pour qu'il soit disponible partout */}
        <WhatsAppButton />
      </body>
    </html>
  );
}
