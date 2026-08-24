# Flowy's corner

My personal site: games, Janitor creator tools, and weird web experiments.

## Run it locally

```bash
npm install
npm run dev
```

The site is a statically exported Next.js app. `NEXT_PUBLIC_BASE_PATH` can be set when it needs to live below a domain root.

## Main pages

- `/` — personal homepage and project index
- `/janitor` — dedicated Janitor Tools hub
- `/janitor/profile-studio` — the working visual profile editor
- `/sans-simulator` — browser game

## Build

```bash
npm run build
```

The static output lands in `out/`.
