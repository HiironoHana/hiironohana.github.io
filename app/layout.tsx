import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hiironohana.github.io"),
  title: {
    default: "Flowy's corner — games, tools & weird web stuff",
    template: "%s | Flowy",
  },
  description: "Flowy's little corner of the internet: games, Janitor creator tools, playable experiments, and other weird things.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Flowy's corner",
    description: "Games, tools & weird web stuff—built by Flowy.",
    type: "website",
    url: "https://hiironohana.github.io",
    images: [{ url: "/og.png", width: 1731, height: 908, alt: "Flowy's corner — games, tools & weird web stuff" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flowy's corner",
    description: "Games, tools & weird web stuff—built by Flowy.",
    images: ["/og.png"],
  },
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
