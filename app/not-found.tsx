import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-shell grid min-h-screen place-items-center overflow-hidden bg-[#0b0a0f] px-5 text-[#f8f3eb]">
      <div className="paper-noise pointer-events-none fixed inset-0" />
      <section className="relative max-w-2xl text-center">
        <p className="text-8xl font-black tracking-[-.08em] text-[#ff8fb3] md:text-9xl">404</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-.05em] text-white md:text-6xl">yeah, that thing isn&apos;t here.</h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-8 text-zinc-400">Maybe I moved it. Maybe I broke it. Maybe it never existed and the URL is gaslighting both of us.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-[#ff8fb3] px-6 py-3 text-sm font-black text-[#210d15] transition hover:-translate-y-1">take me somewhere real →</Link>
      </section>
    </main>
  );
}
