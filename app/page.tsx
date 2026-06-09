"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Sans Simulator",
    href: "/sans-simulator",
    image: "/Images/sans_face_high_res.png",
    kicker: "Browser boss fight",
    description: "A fast Undertale-inspired survival arena with waves, bones, blasters, touch play, and peer lobbies.",
    accent: "from-sky-300/22 to-white/5",
  },
  {
    title: "Taisei Project MP",
    href: "/taisei-project-mp",
    image: "/taisei-web/background.webp",
    kicker: "Web game port",
    description: "A local web-hosted Taisei build with asset checks, fullscreen launch, and a cleaner fail state.",
    accent: "from-rose-300/20 to-cyan-300/10",
  },
];

const stats = [
  ["10+", "years in Roblox Studio"],
  ["C++", "Python, Luau, Unity modding"],
  ["Motion", "Moon Animator 2 workflow"],
];

const skills = ["Gameplay systems", "Level design", "Roblox animation", "Tool scripting", "Web game builds"];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#07080d] text-zinc-100">
      <section className="relative flex min-h-[94svh] items-stretch overflow-hidden px-5 py-5 md:px-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-48"
          style={{ backgroundImage: "url('/taisei-web/background.webp')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(7,8,13,0.96)_0%,_rgba(7,8,13,0.72)_46%,_rgba(7,8,13,0.42)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,_transparent,_#07080d)]" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col">
          <header className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="text-sm font-bold uppercase tracking-[0.24em] text-zinc-100"
              aria-label="Flowy home"
            >
              Flowy
            </Link>
            <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300">
              <a className="px-3 py-2 transition hover:text-white" href="#work">
                Work
              </a>
              <a className="px-3 py-2 transition hover:text-white" href="#profile">
                Profile
              </a>
            </nav>
          </header>

          <div className="grid flex-1 items-center gap-10 py-14 md:grid-cols-[minmax(0,1fr)_380px] md:py-20 lg:grid-cols-[minmax(0,1fr)_430px]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-4xl"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-cyan-200/85">
                Game developer and interactive builder
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.98] text-white sm:text-6xl md:text-7xl lg:text-8xl">
                Flowy&apos;s Scarlet Mansion
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-200 md:text-lg">
                I make punchy game systems, playable experiments, Roblox worlds, animation-heavy moments, and web builds
                that feel alive from the first click.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/sans-simulator"
                  className="rounded-md border border-rose-200/70 bg-rose-500 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[0_18px_50px_rgba(244,63,94,0.28)] transition hover:bg-rose-400"
                >
                  Play Sans Simulator
                </Link>
                <a
                  href="#work"
                  className="rounded-md border border-white/18 bg-white/8 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white backdrop-blur transition hover:bg-white/14"
                >
                  See Projects
                </a>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.1 }}
              className="border border-white/12 bg-black/48 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.46)] backdrop-blur-md"
            >
              <div className="grid gap-3">
                {stats.map(([value, label]) => (
                  <div key={value} className="flex items-baseline justify-between gap-5 border-b border-white/10 pb-3">
                    <span className="text-2xl font-black text-white">{value}</span>
                    <span className="text-right text-sm leading-6 text-zinc-300">{label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="rounded-md border border-cyan-200/20 bg-cyan-200/8 px-3 py-2 text-xs text-cyan-50">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      <section id="work" className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose-200/80">Selected builds</p>
              <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">Playable Work</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-zinc-300">
              A small arcade of experiments, ports, and systems work. More can slot in here without fighting the layout.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.href}
                href={project.href}
                className="group overflow-hidden rounded-md border border-white/12 bg-zinc-950 transition hover:-translate-y-1 hover:border-white/28"
              >
                <div className={`relative flex h-64 items-center justify-center bg-gradient-to-br ${project.accent}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt=""
                    className="h-full w-full object-cover opacity-78 transition duration-500 group-hover:scale-105 group-hover:opacity-95"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.06),_rgba(0,0,0,0.74))]" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-100/85">{project.kicker}</p>
                    <h3 className="mt-2 text-2xl font-black text-white">{project.title}</h3>
                  </div>
                </div>
                <p className="min-h-24 p-5 text-sm leading-7 text-zinc-300">{project.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="profile" className="px-5 pb-16 pt-4 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 border-t border-white/10 py-12 md:grid-cols-[0.82fr_1.18fr]">
          <h2 className="text-3xl font-black text-white md:text-5xl">Builder Profile</h2>
          <div className="space-y-5 text-base leading-8 text-zinc-300">
            <p>
              I&apos;m a game developer with a long Roblox Studio background and a practical toolkit across C++, Python,
              Luau, Unity modding, and animation production.
            </p>
            <p>
              My favorite work sits where design and implementation meet: maps that guide motion, combat loops that
              feel responsive, tools that make iteration faster, and little web game ports that actually ship.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-7 text-center text-xs uppercase tracking-[0.22em] text-zinc-500 md:px-8">
        {new Date().getFullYear()} Flowy
      </footer>
    </main>
  );
}
