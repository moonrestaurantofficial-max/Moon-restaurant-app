import type { Metadata } from "next";
import { Poppins, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RestaurantBackdrop from "@/components/RestaurantBackdrop";

const poppins = Poppins({ 
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({ 
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Moon Restaurant - Where Taste Meets the Moonlight | Naran & Besar",
  description: "Premium Pakistani restaurant with two branches in Naran and Besar. Authentic cuisine, family dining, and warm hospitality. Contact: +92 311 2932080 (Naran), +92 331 2241322 (Besar). Open daily 11AM-11PM.",
  keywords: ["restaurant", "Pakistani cuisine", "Naran restaurant", "Besar restaurant", "dining", "food", "family dining", "authentic Pakistani food", "halal food", "Moon Restaurant"],
  authors: [{ name: "Moon Restaurant" }],
  openGraph: {
    title: "Moon Restaurant - Where Taste Meets the Moonlight",
    description: "Premium Pakistani restaurant with branches in Naran and Besar. Authentic cuisine and exceptional dining experience.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${cormorant.variable} antialiased`}
      >
        <RestaurantBackdrop />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
