import type { Metadata } from "next";
import SansSimulatorPage from "./SansSimulatorPage";

export const metadata: Metadata = {
  title: "Sans Simulator",
  description: "An Undertale-inspired browser boss fight with bones, blasters, touch controls, sound, and peer-to-peer co-op.",
  alternates: { canonical: "/sans-simulator/" },
  openGraph: { title:"Patchies Sans Simulator", description:"Get attacked by a skeleton—in your browser.", url:"/sans-simulator/", images:[{url:"/Images/sans_face_high_res.png",alt:"Sans Simulator"}] },
  twitter: { card:"summary_large_image", title:"Patchies Sans Simulator", description:"An Undertale-inspired browser boss fight.", images:["/Images/sans_face_high_res.png"] },
};

export default function Page() {
  return <SansSimulatorPage />;
}
