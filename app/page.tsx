"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const toolbox = ["C++", "Python", "Luau", "React", "Next.js", "game systems", "level design", "animation", "making tools for my own problems"];

const chaos = [
  ["build", "a combat system"],
  ["tweak", "the hit feedback"],
  ["break", "the combat system"],
  ["repeat", "until it feels good"],
];

export default function Home() {
  return (
    <main className="site-shell min-h-screen overflow-x-hidden bg-[#0b0a0f] text-[#f8f3eb] selection:bg-[#ff8fb3] selection:text-[#220b14]">
      <div className="paper-noise pointer-events-none fixed inset-0 z-50" />

      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 md:px-7">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 rounded-full border border-white/10 bg-[#111016]/85 px-4 shadow-2xl shadow-black/20 backdrop-blur-xl md:px-6">
          <Link href="/" className="group flex items-center gap-2" aria-label="Patchies home">
            <span className="grid size-8 place-items-center rounded-full bg-[#ff8fb3] font-black text-[#1c0c13] transition group-hover:-rotate-12">P</span>
            <span className="text-sm font-black tracking-[-.02em] text-white">Patchies</span>
          </Link>
          <nav className="flex items-center gap-1 text-sm font-bold text-zinc-400" aria-label="Main navigation">
            <a className="hidden rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white sm:block" href="#stuff">my stuff</a>
            <Link className="rounded-full px-3 py-2 transition hover:bg-[#b8f4ff]/10 hover:text-[#b8f4ff]" href="/janitor">janitor tools</Link>
            <a className="rounded-full border border-white/12 bg-white/[.04] px-3 py-2 text-white transition hover:border-[#ff8fb3]/60 hover:bg-[#ff8fb3]/10" href="https://github.com/hiironohana" target="_blank" rel="noreferrer">github ↗</a>
          </nav>
        </div>
      </header>

      <section className="relative min-h-[100svh] overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pt-32">
        <div className="blob blob-pink absolute -right-40 top-16 size-[520px] rounded-full md:right-[-8vw] md:size-[760px]" />
        <div className="blob blob-blue absolute -left-48 bottom-[-12rem] size-[440px] rounded-full md:size-[620px]" />
        <div className="relative mx-auto grid min-h-[calc(100svh-10rem)] max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,.55fr)]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
            <p className="mb-6 w-fit -rotate-2 rounded-full border border-[#ff8fb3]/35 bg-[#ff8fb3]/10 px-4 py-2 text-xs font-black text-[#ffc4d6]">hey, i&apos;m Patchies 👋</p>
            <h1 className="max-w-5xl text-5xl font-black leading-[.9] tracking-[-.065em] text-white sm:text-7xl md:text-8xl xl:text-[7.5rem]">I make weird little things <span className="scribble text-[#ff8fb3]">for the internet.</span></h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-300">Games, tools, chaotic experiments, whatever looked fun at 2 AM. If it moves, makes noise, or saves me from doing something manually, I&apos;m probably building it.</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#stuff" className="rounded-full bg-[#ff8fb3] px-6 py-3 text-sm font-black text-[#210d15] transition hover:-translate-y-1 hover:bg-[#ffc0d3]">see the stuff ↓</a>
              <Link href="/janitor" className="rounded-full border border-white/15 bg-white/[.04] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-1 hover:border-[#b8f4ff]/50 hover:text-[#b8f4ff]">I&apos;m here for Janitor →</Link>
            </div>
          </motion.div>

          <motion.aside initial={{ opacity: 0, rotate: 2, x: 24 }} animate={{ opacity: 1, rotate: 1, x: 0 }} transition={{ duration: .65, delay: .08 }} className="doodle-card relative rounded-[2rem] border border-white/12 bg-[#15131b]/90 p-6 shadow-[0_30px_100px_rgba(0,0,0,.45)]">
            <span className="absolute -right-3 -top-4 rotate-6 rounded-md bg-[#fff2a8] px-3 py-2 text-xs font-black text-[#262015] shadow-lg">currently cooking</span>
            <p className="text-xs font-black uppercase tracking-[.2em] text-zinc-500">the desk is a mess</p>
            <div className="mt-5 space-y-3">
              <Link href="/janitor" className="group block rounded-2xl border border-[#b8f4ff]/20 bg-[#b8f4ff]/[.06] p-4 transition hover:-translate-y-1 hover:border-[#b8f4ff]/50">
                <span className="text-xs font-bold text-[#b8f4ff]">01 / actually useful</span>
                <strong className="mt-1 block text-xl text-white">Janitor Tools</strong>
                <small className="mt-2 block leading-5 text-zinc-400">Making profile CSS slightly less cursed.</small>
              </Link>
              <Link href="/sans-simulator" className="group block rounded-2xl border border-[#ff8fb3]/20 bg-[#ff8fb3]/[.06] p-4 transition hover:-translate-y-1 hover:border-[#ff8fb3]/50">
                <span className="text-xs font-bold text-[#ffb3cb]">02 / questionable decision</span>
                <strong className="mt-1 block text-xl text-white">Sans Simulator</strong>
                <small className="mt-2 block leading-5 text-zinc-400">Yes, the skeleton will shoot you.</small>
              </Link>
            </div>
            <p className="mt-5 text-center text-xs text-zinc-500">10+ years making things • still googles basic syntax</p>
          </motion.aside>
        </div>
      </section>

      <section id="stuff" className="relative scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><p className="text-sm font-black text-[#b8f4ff]">okay, here&apos;s the good stuff</p><h2 className="mt-2 text-4xl font-black tracking-[-.05em] text-white md:text-6xl">Things I actually shipped.</h2></div>
            <p className="max-w-md text-sm leading-7 text-zinc-400">A very small hall of fame. I refuse to put seventeen fake case studies here just to make the grid look busier.</p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.12fr_.88fr]">
            <Link href="/janitor" className="project-card group relative min-h-[560px] overflow-hidden rounded-[2.25rem] border border-[#b8f4ff]/20 bg-[#111a1e] p-6 transition duration-300 hover:-translate-y-2 hover:border-[#b8f4ff]/55 md:p-9">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(184,244,255,.18),transparent_34%),radial-gradient(circle_at_5%_90%,rgba(255,143,179,.13),transparent_38%)]" />
              <div className="janitor-window absolute inset-x-6 top-7 h-64 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1014] shadow-2xl md:inset-x-9">
                <div className="flex h-10 items-center gap-2 border-b border-white/10 px-4"><i className="size-2.5 rounded-full bg-[#ff8fb3]"/><i className="size-2.5 rounded-full bg-[#fff2a8]"/><i className="size-2.5 rounded-full bg-[#b8f4ff]"/><span className="ml-2 text-[10px] font-bold text-zinc-500">profile-studio.css</span></div>
                <div className="grid h-[calc(100%_-_2.5rem)] grid-cols-[.42fr_.58fr]">
                  <div className="space-y-3 border-r border-white/10 p-4"><span className="block h-3 w-20 rounded bg-[#b8f4ff]/20"/><span className="block h-8 rounded bg-white/5"/><span className="block h-3 w-16 rounded bg-[#ff8fb3]/20"/><span className="block h-8 rounded bg-white/5"/><span className="block h-16 rounded bg-white/5"/></div>
                  <div className="grid place-items-center bg-[radial-gradient(circle,rgba(255,143,179,.12),transparent_60%)] p-5"><div className="w-full rounded-xl border border-white/10 bg-[#191621] p-4"><div className="size-12 rounded-full bg-gradient-to-br from-[#ff8fb3] to-[#b8f4ff]"/><span className="mt-3 block h-3 w-24 rounded bg-white/20"/><span className="mt-2 block h-2 w-full rounded bg-white/10"/><span className="mt-1 block h-2 w-2/3 rounded bg-white/10"/></div></div>
                </div>
              </div>
              <div className="relative flex h-full flex-col justify-end pt-72">
                <span className="w-fit rounded-full bg-[#b8f4ff] px-3 py-1.5 text-xs font-black text-[#07171a]">the useful one</span>
                <h3 className="mt-4 text-4xl font-black tracking-[-.04em] text-white md:text-5xl">Janitor Tools</h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-zinc-300">A home for the tools I build around Janitor.AI—starting with a visual profile editor that lets you design, preview, validate, and export without arguing with raw CSS for six hours.</p>
                <span className="mt-7 text-sm font-black text-[#b8f4ff]">open the toolbox <b className="inline-block transition group-hover:translate-x-2">→</b></span>
              </div>
            </Link>

            <Link href="/sans-simulator" className="project-card group relative min-h-[560px] overflow-hidden rounded-[2.25rem] border border-[#ff8fb3]/20 bg-[#160f17] transition duration-300 hover:-translate-y-2 hover:border-[#ff8fb3]/55">
              <div className="absolute inset-x-0 top-0 h-[58%] overflow-hidden">
                <Image src="/Images/sans_face_high_res.png" alt="Sans grinning in the simulator" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-top opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-95" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#160f17] via-transparent to-black/10" />
              </div>
              <div className="relative flex h-full flex-col justify-end p-6 pt-80 md:p-9">
                <span className="w-fit rounded-full bg-[#ff8fb3] px-3 py-1.5 text-xs font-black text-[#210d15]">the loud one</span>
                <h3 className="mt-4 text-4xl font-black tracking-[-.04em] text-white">Sans Simulator</h3>
                <p className="mt-4 text-base leading-7 text-zinc-300">An Undertale-inspired browser boss fight with bones, blasters, waves, touch controls, sound, and peer-to-peer lobbies. It is exactly as calm as that sounds.</p>
                <span className="mt-7 text-sm font-black text-[#ffb2ca]">get attacked by a skeleton <b className="inline-block transition group-hover:translate-x-2">→</b></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 rounded-[2.5rem] border border-white/10 bg-[#121117] p-6 md:p-10 lg:grid-cols-[.8fr_1.2fr] lg:p-14">
          <div><p className="text-sm font-black text-[#ffb2ca]">the short version</p><h2 className="mt-3 text-4xl font-black tracking-[-.05em] text-white md:text-6xl">I like making things feel good.</h2></div>
          <div className="space-y-5 text-base leading-8 text-zinc-300">
            <p>I&apos;m a game developer and chronic tool-maker. I&apos;ve spent 10+ years in Roblox Studio, and I bounce between gameplay code, level design, animation, web stuff, and whatever else gets the idea out of my head.</p>
            <p>My favorite part is the bit where something goes from “technically working” to <em className="font-bold text-white">oh, that actually feels nice.</em> Better timing. Better feedback. One less annoying step. Tiny details, huge rabbit holes.</p>
            <div className="flex flex-wrap gap-2 pt-3">{toolbox.map(item => <span key={item} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-xs font-bold text-zinc-300">{item}</span>)}</div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-sm font-black text-[#fff2a8]">my highly professional process</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{chaos.map(([verb, thing], index) => <div key={verb} className={`rounded-3xl border border-white/10 bg-white/[.035] p-6 ${index % 2 ? "sm:translate-y-5" : ""}`}><span className="text-4xl font-black text-white/10">0{index + 1}</span><h3 className="mt-8 text-2xl font-black text-[#ffb2ca]">{verb}</h3><p className="mt-1 text-sm text-zinc-400">{thing}</p></div>)}</div>
        </div>
      </section>

      <section className="px-5 pb-20 pt-10 md:px-8 md:pb-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#ff8fb3] px-6 py-14 text-[#210d15] md:px-12 md:py-20">
          <div className="absolute -right-16 -top-28 size-80 rounded-full border-[45px] border-[#210d15]/10" />
          <p className="relative text-sm font-black">you made it to the bottom. impressive.</p>
          <h2 className="relative mt-3 max-w-3xl text-4xl font-black leading-[.95] tracking-[-.055em] md:text-6xl">Want to poke around the code or say hi?</h2>
          <a href="https://github.com/hiironohana" target="_blank" rel="noreferrer" className="relative mt-8 inline-flex rounded-full bg-[#210d15] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-1">wander over to GitHub ↗</a>
        </div>
      </section>

      <footer className="px-5 pb-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-7 text-xs font-bold text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Patchies. built with code and bad sleep habits.</span>
          <span>games • tools • weird web stuff</span>
        </div>
      </footer>
    </main>
  );
}
