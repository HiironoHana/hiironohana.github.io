"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const REQUIRED_ASSET_PATHS = [
  "/taisei-web/shell.html",
  "/taisei-web/taisei.js",
  "/taisei-web/taisei.wasm",
];

async function assetExists(path: string) {
  const url = `${BASE_PATH}${path}`;

  try {
    const headResponse = await fetch(url, { method: "HEAD" });
    if (headResponse.ok) {
      return true;
    }
  } catch {}

  try {
    const getResponse = await fetch(url);
    return getResponse.ok;
  } catch {
    return false;
  }
}

export default function TaiseiWebHost() {
  const [checked, setChecked] = useState(false);
  const [missingAssets, setMissingAssets] = useState<string[]>([]);

  const runAssetCheck = useCallback(async () => {
    const results = await Promise.all(REQUIRED_ASSET_PATHS.map((assetPath) => assetExists(assetPath)));
    setMissingAssets(REQUIRED_ASSET_PATHS.filter((_, index) => !results[index]));
    setChecked(true);
  }, []);

  useEffect(() => {
    async function load() {
      await runAssetCheck();
    }

    void load();
  }, [runAssetCheck]);

  const canLaunch = checked && missingAssets.length === 0;

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {canLaunch ? (
        <>
          <iframe
            title="Taisei Project MP"
            src={`${BASE_PATH}/taisei-web/shell.html`}
            className="relative z-10 h-screen w-screen border-0"
            allow="fullscreen; autoplay; gamepad"
          />
          <div className="pointer-events-none absolute left-3 top-3 z-30 flex flex-wrap items-center gap-3 md:left-5 md:top-5">
            <Link
              href="/"
              className="pointer-events-auto rounded-full border border-white/20 bg-black/45 px-4 py-2 text-[10px] tracking-[0.26em] text-rose-50 backdrop-blur-sm transition hover:border-white/40 hover:bg-black/65 md:text-xs"
            >
              BACK
            </Link>
            <div className="rounded-full border border-cyan-200/30 bg-cyan-300/10 px-4 py-2 text-[10px] tracking-[0.24em] text-cyan-100 backdrop-blur-sm md:text-xs">
              TAISEI PROJECT MP
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,24,52,0.24),_transparent_36%),linear-gradient(180deg,_#120208,_#020103_70%,_#000)]" />
          <div className="absolute left-4 top-4 z-30 flex flex-wrap items-center gap-3 md:left-6 md:top-6">
            <Link
              href="/"
              className="rounded-full border border-white/20 bg-black/45 px-4 py-2 text-xs tracking-[0.26em] text-rose-50 backdrop-blur-sm transition hover:border-white/40 hover:bg-black/65"
            >
              BACK
            </Link>
            <div className="rounded-full border border-cyan-200/30 bg-cyan-300/10 px-4 py-2 text-xs tracking-[0.24em] text-cyan-100 backdrop-blur-sm">
              TAISEI PROJECT MP
            </div>
          </div>
          <section className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24">
          <div className="w-full max-w-3xl rounded-[2rem] border border-white/12 bg-black/55 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-sm md:p-8">
            <div className="text-xs uppercase tracking-[0.34em] text-rose-200/70">Local Web Build Status</div>
            <h1 className="mt-3 max-w-2xl font-[Cinzel] text-4xl leading-tight text-rose-50 md:text-6xl">
              Taisei is now set up to run on this site, but the local web build is still missing.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-rose-100/82 md:text-lg">
              The page no longer depends on <span className="font-mono text-cyan-200">play.taisei-project.org</span>.
              It only looks for local files under{" "}
              <span className="rounded bg-white/10 px-2 py-1 font-mono text-sm">/public/taisei-web</span>. Right now,
              the local Taisei runtime bootstrap is incomplete, so the game cannot finish booting yet.
            </p>

            <div className="mt-8 rounded-2xl border border-amber-200/20 bg-amber-300/8 p-5">
              <div className="text-xs uppercase tracking-[0.28em] text-amber-100/75">Missing Local Assets</div>
              <div className="mt-4 grid gap-3">
                {missingAssets.map((asset) => (
                  <code
                    key={asset}
                    className="block rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-amber-100"
                  >
                    {asset}
                  </code>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="text-xs uppercase tracking-[0.28em] text-cyan-100/72">What I Found</div>
                <p className="mt-3 text-sm leading-7 text-white/78">
                  Taisei&apos;s web page needs more than the HTML shell plus the compiled{" "}
                  <span className="font-mono">taisei.js</span> and <span className="font-mono">taisei.wasm</span>{" "}
                  files. It also expects the built resource bundle under{" "}
                  <span className="font-mono">/public/taisei-web/data</span>, where the game content is fetched from at
                  startup.
                </p>
              </article>

              <article className="rounded-2xl border border-white/10 bg-black/35 p-5">
                <div className="text-xs uppercase tracking-[0.28em] text-cyan-100/72">Why It Stopped Here</div>
                <p className="mt-3 text-sm leading-7 text-white/78">
                  If any required resource file is missing, Taisei&apos;s browser fetch layer keeps retrying it and the page
                  appears to hang after loading. That makes partial copies look like a startup freeze instead of a clean
                  missing-file error.
                </p>
              </article>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => {
                  setChecked(false);
                  void runAssetCheck();
                }}
                className="rounded-full border border-cyan-200/35 bg-cyan-300/10 px-5 py-3 text-sm tracking-[0.2em] text-cyan-100 transition hover:bg-cyan-300/18"
              >
                RETRY LOCAL FILES
              </button>
              <a
                href="https://github.com/taisei-project/taisei"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm tracking-[0.2em] text-white/85 transition hover:bg-white/10"
              >
                VIEW SOURCE REPO
              </a>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-5">
              <div className="text-xs uppercase tracking-[0.28em] text-rose-100/68">Needed Next</div>
              <div className="mt-3 space-y-3 text-sm leading-7 text-white/78">
                <p>1. Build Taisei&apos;s web target with Emscripten in a supported environment.</p>
                <p>2. Place the generated browser files and the <span className="font-mono">data</span> resource folder into <span className="font-mono">public/taisei-web</span>.</p>
                <p>3. This page will automatically switch to full-screen local launch as soon as those files exist.</p>
              </div>
            </div>
          </div>
          </section>
        </>
      )}
    </main>
  );
}
