import type { Metadata } from "next";
import "./studio.css";

export const metadata: Metadata = {
  title: "Janitor Profile Studio",
  description: "Build a Janitor.AI profile visually, check the CSS, and export the complete ready-to-paste style block.",
};

export default function ProfileStudioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
