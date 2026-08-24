import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Janitor Tools — made by Patchies",
  description: "Free, practical tools for making and maintaining Janitor.AI profiles without losing your mind to CSS.",
};

const features = [
  ["Point at stuff", "Use the element picker on a Janitor-shaped preview instead of guessing which mystery selector you need."],
  ["See it immediately", "Change colors, spacing, cards, buttons, images, and more while the preview updates right beside you."],
  ["Bring the fun bits", "Add image buttons, page dolls, details boxes, links, and cards for experiences hosted somewhere else."],
  ["Export the whole thing", "Copy or download a complete wrapped style block, with a compatibility check before it leaves the editor."],
];

const someday = [
  ["Selector Lab", "Turn a saved Janitor page into a less-annoying map of useful CSS targets."],
  ["Media Checker", "Check Ella and public image URLs before they become a tiny broken icon on your profile."],
  ["Theme Vault", "Keep versions of the themes you swear you will remember to back up next time."],
];

export default function JanitorHub() {
  return (
    <main className="site-shell min-h-screen overflow-x-hidden bg-[#090d10] text-[#f7fbfc] selection:bg-[#b8f4ff] selection:text-[#07171a]">
      <div className="paper-noise pointer-events-none fixed inset-0 z-50" />

      <header className="relative z-20 px-4 pt-4 md:px-7">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 rounded-full border border-white/10 bg-[#0d1216]/85 px-4 shadow-2xl shadow-black/20 backdrop-blur-xl md:px-6">
          <Link href="/" className="group flex items-center gap-2 text-sm font-black text-white">
            <span className="grid size-8 place-items-center rounded-full bg-[#ff8fb3] text-[#1c0c13] transition group-hover:-rotate-12">P</span>
            <span>back to Patchies</span>
          </Link>
          <span className="hidden rounded-full bg-[#b8f4ff]/10 px-3 py-2 text-xs font-black text-[#b8f4ff] sm:block">janitor tools / not affiliated, just stubborn</span>
        </div>
      </header>

      <section className="relative px-5 pb-20 pt-20 md:px-8 md:pb-28 md:pt-28">
        <div className="blob blob-blue absolute -right-48 top-0 size-[700px] rounded-full" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_.55fr]">
            <div>
              <p className="w-fit -rotate-2 rounded-full border border-[#b8f4ff]/30 bg-[#b8f4ff]/10 px-4 py-2 text-xs font-black text-[#b8f4ff]">tools for Janitor.AI creators 🧹</p>
              <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[.9] tracking-[-.065em] text-white sm:text-7xl md:text-8xl xl:text-[7rem]">Profiles are held together with <span className="text-[#b8f4ff]">CSS and hope.</span></h1>
            </div>
            <div className="relative rounded-3xl border border-white/10 bg-white/[.04] p-6 lg:rotate-2">
              <span className="absolute -right-3 -top-4 rotate-6 rounded-md bg-[#fff2a8] px-3 py-2 text-xs font-black text-[#262015]">so I made tools</span>
              <p className="pt-3 text-base leading-8 text-zinc-300">Because “inspect element, guess, paste, refresh, cry” is not a creative workflow. Everything here is built to make profile work quicker, clearer, and a lot less cursed.</p>
            </div>
          </div>

          <Link href="/janitor/profile-studio" className="group relative mt-14 grid overflow-hidden rounded-[2.5rem] border border-[#b8f4ff]/25 bg-[#11191e] shadow-[0_35px_120px_rgba(0,0,0,.45)] transition duration-300 hover:-translate-y-2 hover:border-[#b8f4ff]/60 lg:grid-cols-[1.05fr_.95fr]">
            <div className="relative min-h-[430px] overflow-hidden p-6 md:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_80%,rgba(255,143,179,.17),transparent_36%),radial-gradient(circle_at_85%_15%,rgba(184,244,255,.2),transparent_37%)]" />
              <div className="absolute inset-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0c1014] shadow-2xl md:inset-10">
                <div className="flex h-11 items-center gap-2 border-b border-white/10 px-4"><i className="size-2.5 rounded-full bg-[#ff8fb3]"/><i className="size-2.5 rounded-full bg-[#fff2a8]"/><i className="size-2.5 rounded-full bg-[#b8f4ff]"/><span className="ml-auto text-[10px] font-bold text-zinc-500">draft saved locally</span></div>
                <div className="grid h-[calc(100%_-_2.75rem)] grid-cols-[.38fr_.62fr]">
                  <div className="space-y-3 border-r border-white/10 p-4"><b className="text-xs text-[#b8f4ff]">PROFILE BUILDER</b><span className="block h-9 rounded-lg bg-white/5"/><span className="block h-3 w-2/3 rounded bg-white/10"/><span className="block h-9 rounded-lg bg-white/5"/><span className="block h-3 w-1/2 rounded bg-white/10"/><span className="block h-20 rounded-lg bg-white/5"/></div>
                  <div className="grid place-items-center bg-[linear-gradient(135deg,rgba(184,244,255,.05),rgba(255,143,179,.05))] p-5"><div className="w-full rounded-2xl border border-white/10 bg-[#191621] p-5"><div className="flex items-center gap-3"><div className="size-14 rounded-full bg-gradient-to-br from-[#ff8fb3] to-[#b8f4ff]"/><div className="flex-1"><span className="block h-3 w-24 rounded bg-white/25"/><span className="mt-2 block h-2 w-16 rounded bg-white/10"/></div></div><span className="mt-5 block h-2 w-full rounded bg-white/10"/><span className="mt-2 block h-2 w-4/5 rounded bg-white/10"/><div className="mt-5 grid grid-cols-2 gap-2"><span className="h-16 rounded-lg bg-[#ff8fb3]/10"/><span className="h-16 rounded-lg bg-[#b8f4ff]/10"/></div></div></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center border-t border-white/10 bg-black/20 p-7 md:p-11 lg:border-l lg:border-t-0">
              <span className="w-fit rounded-full bg-[#b8f4ff] px-3 py-1.5 text-xs font-black text-[#07171a]">live right now</span>
              <h2 className="mt-5 text-4xl font-black tracking-[-.045em] text-white md:text-6xl">Profile Studio</h2>
              <p className="mt-5 text-base leading-8 text-zinc-300">Import a saved Janitor page, edit against the real profile structure, and export the complete About Me source—CSS and HTML together, exactly where Janitor actually stores them.</p>
              <div className="mt-7 flex flex-wrap gap-2">{["real page preview", "saved-page import", "element picker", "image library", "complete source export"].map(tag => <span key={tag} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-xs font-bold text-zinc-400">{tag}</span>)}</div>
              <strong className="mt-9 text-sm text-[#b8f4ff]">open Profile Studio <span className="inline-block transition group-hover:translate-x-2">→</span></strong>
            </div>
          </Link>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl"><p className="text-sm font-black text-[#ffb3cb]">what it actually does</p><h2 className="mt-3 text-4xl font-black tracking-[-.05em] text-white md:text-6xl">Less wrestling. More making.</h2><p className="mt-5 text-base leading-8 text-zinc-400">Profile Studio doesn&apos;t pretend Janitor can run arbitrary JavaScript. It works inside the real limits and gives you better ways to use what the platform does allow.</p></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">{features.map(([title, copy], index) => <article key={title} className="rounded-3xl border border-white/10 bg-white/[.035] p-6 md:p-8"><span className="text-sm font-black text-[#b8f4ff]">0{index + 1}</span><h3 className="mt-8 text-2xl font-black text-white">{title}</h3><p className="mt-3 text-sm leading-7 text-zinc-400">{copy}</p></article>)}</div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-[#11151a] p-6 md:p-10 lg:p-14">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-sm font-black text-[#fff2a8]">the “maybe next” pile</p><h2 className="mt-3 text-4xl font-black tracking-[-.05em] text-white md:text-5xl">Not fake buttons. Just plans.</h2></div><p className="max-w-md text-sm leading-7 text-zinc-400">These are ideas, not finished products wearing a “coming soon” badge forever. They&apos;ll become real pages when they&apos;re actually useful.</p></div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">{someday.map(([title, copy], index) => <article key={title} className="rounded-3xl border border-dashed border-white/15 p-6"><span className="text-xs font-black text-zinc-600">someday / 0{index + 2}</span><h3 className="mt-10 text-2xl font-black text-white">{title}</h3><p className="mt-3 text-sm leading-7 text-zinc-400">{copy}</p></article>)}</div>
        </div>
      </section>

      <section className="px-5 pb-20 pt-8 md:px-8 md:pb-28">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2.5rem] bg-[#b8f4ff] px-7 py-12 text-[#07171a] md:flex-row md:items-center md:px-12 md:py-16">
          <div><p className="text-sm font-black">your CSS has suffered enough</p><h2 className="mt-2 text-4xl font-black tracking-[-.045em] md:text-5xl">Go make something pretty.</h2></div>
          <Link href="/janitor/profile-studio" className="rounded-full bg-[#07171a] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-1">launch the studio →</Link>
        </div>
      </section>

      <footer className="px-5 pb-8 md:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-7 text-xs font-bold text-zinc-500 sm:flex-row sm:items-center sm:justify-between"><span>made by Patchies, because apparently I enjoy CSS</span><Link href="/" className="transition hover:text-white">back to the main site ↑</Link></div></footer>
    </main>
  );
}
