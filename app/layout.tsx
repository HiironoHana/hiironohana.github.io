import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://patchies.nanaka-desu.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Patchies — games, tools & weird web stuff",
    template: "%s | Patchies",
  },
  description: "Patchies' little corner of the internet: games, Janitor creator tools, playable experiments, and other weird things.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Patchies",
    description: "Games, tools & weird web stuff—built by Patchies.",
    type: "website",
    url: siteUrl,
    images: [{ url: "/og.png", width: 1731, height: 908, alt: "Patchies — games, tools & weird web stuff" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Patchies",
    description: "Games, tools & weird web stuff—built by Patchies.",
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
