'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-slate-100 overflow-x-hidden" style={{ backgroundColor: '#000' }}>
      <div className="absolute inset-0 bg-black/90 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[140px] w-[140px] rounded-full bg-rose-700/20 blur-3xl" />
      <main className="relative z-10">
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center z-0 brightness-90"
            style={{ backgroundImage: 'url(https://www.spriters-resource.com/media/assets/207/210640.png?updated=1755489750)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/90 z-10" />
          <div className="relative z-20 max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: -24, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1 }}
              className="text-6xl md:text-7xl lg:text-8xl font-[Cinzel] tracking-wide text-rose-200 drop-shadow-[0_4px_30px_rgba(231,62,111,0.8)]"
            >
              Flowy&apos;s Scarlet Mansion
            </motion.h1>

            <div className="mt-8 flex flex-wrap gap-4 justify-center text-base font-medium">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="#about"
                className="px-8 py-3 rounded-lg bg-rose-800/90 border-2 border-rose-300/80 text-rose-50 shadow-inner shadow-rose-900/90 hover:bg-rose-700 transition-all"
              >
                About Me
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                className="px-8 py-3 rounded-lg border-2 border-rose-300/80 text-rose-100 bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-all"
              >
                My Projects
              </motion.a>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 px-6 md:px-12 bg-[linear-gradient(180deg,_rgba(30,7,33,0.9),_rgba(10,3,16,0.72))]">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-rose-100 drop-shadow-md">About Me</h2>
            <p className="mt-5 text-lg md:text-xl text-rose-200/90 leading-relaxed text-left">
              I&apos;m a Game Developer with 10 years in Roblox Studio and a strong focus on fast, polished interactive
              content. My toolkit includes:
            </p>
            <ul className="mt-4 list-disc list-inside text-rose-200/90 space-y-2 text-left">
              <li>Map design & level building for immersive gameplay worlds</li>
              <li>C++, Python, and Luau scripting for gameplay systems and tools</li>
              <li>Unity modding and plugin extension for custom game frameworks</li>
              <li>Roblox animation with Moon Animator 2 to produce cinematic motion</li>
              <li>Dozens of published projects and experience across many genres</li>
            </ul>
            <p className="mt-4 text-lg md:text-xl text-rose-200/90 leading-relaxed text-left">
              I balance creativity with technical discipline, delivering projects that feel strong, responsive, and
              replay-ready.
            </p>
          </div>
        </section>

        <section id="projects" className="py-20 px-6 md:px-12 bg-black">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-rose-100">Projects</h2>
            <motion.div
              className="mt-10 mx-auto w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ maxHeight: '72vh' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Images/ABook.png"
                alt="Spellbook"
                className="mx-auto h-full w-auto max-h-[72vh]"
                style={{ objectFit: 'contain', backgroundColor: 'black' }}
              />

              <Link
                href="/sans-simulator"
                className="project-title absolute top-16 left-32 md:top-18 md:left-85 text-xl md:text-3xl font-[Pacifico] text-black cursor-pointer tracking-wider"
                style={{
                  textShadow: '0 0 10px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.9)',
                  padding: '0.08rem 0.22rem',
                  borderRadius: '2px',
                  backgroundColor: 'transparent',
                }}
              >
                Sans Simulator
              </Link>
              <style jsx>{`
                .project-title:hover {
                  color: #f7e52a;
                  text-shadow: 0 0 14px rgba(0, 0, 0, 0.9), 1px 1px 3px rgba(0, 0, 0, 0.95);
                  background-color: rgba(0, 0, 0, 0.95);
                }
              `}</style>
            </motion.div>
          </div>
        </section>

        <footer className="py-8 text-center text-rose-200/80 border-t border-rose-300/20">
          &copy; {new Date().getFullYear()} Flowy | Game Developer (Roblox / C++ / Python / Luau / Unity modding /
          Moon Animator 2)
        </footer>
      </main>
    </div>
  );
}
