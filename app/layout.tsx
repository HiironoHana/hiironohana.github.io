import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flowy's Scarlet Mansion",
  description: "Game development portfolio and playable web projects by Flowy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
