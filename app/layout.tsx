import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Red Bull Energy Drinks. Vitalizes Body and Mind®.",
  description: "Discover Red Bull Energy Drink, Sugarfree and Red Bull Editions.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
