import type { Metadata } from "next";
import "./studio.css";

export const metadata: Metadata = {
  title: "Janitor Profile Studio — drag everything",
  description: "Move and resize Janitor profile elements, build custom layers, apply complete themes, recover autosaves, and export one About Me source block.",
  alternates: { canonical: "/janitor/profile-studio/" },
  openGraph: { title:"Patchies Janitor Profile Studio", description:"A visual drag-and-resize editor for Janitor.AI creator profiles.", url:"/janitor/profile-studio/", images:[{url:"/og.png",width:1731,height:908,alt:"Patchies Profile Studio"}] },
  twitter: { card:"summary_large_image", title:"Patchies Janitor Profile Studio", description:"Drag, resize, style, recover, and export your Janitor profile.", images:["/og.png"] },
};

export default function ProfileStudioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
