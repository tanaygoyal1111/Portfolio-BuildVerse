import type { Metadata } from "next";
import { Inter, Bebas_Neue, Anton } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas-neue" });
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });

export const metadata: Metadata = {
  title: "BuildVerse | Tanay Goyal",
  description: "Cinematic Developer Portfolio of Tanay Goyal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${bebasNeue.variable} ${anton.variable} font-inter antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
