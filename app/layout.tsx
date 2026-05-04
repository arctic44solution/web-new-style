import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brandin Hall — Creative Director",
  description: "Creative Director specializing in AI, Branding & Web Design",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
