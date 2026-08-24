import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://patchies.nanaka-desu.chatgpt.site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/janitor/", "/janitor/profile-studio/", "/sans-simulator/"].map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "monthly" : "weekly",
    priority: path === "/" ? 1 : path.includes("profile-studio") ? 0.9 : 0.7,
  }));
}
