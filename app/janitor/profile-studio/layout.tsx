import type { Metadata } from "next";
import "./studio.css";

export const metadata: Metadata = {
  title: "Janitor Profile Studio",
  description: "Build against Janitor's real profile structure, import existing pages, and export one complete About Me source block.",
};

export default function ProfileStudioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
