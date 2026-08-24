import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, "out");
const dist = path.join(root, "dist");
const client = path.join(dist, "client");
const server = path.join(dist, "server");

await rm(dist, { recursive: true, force: true });
await mkdir(server, { recursive: true });
await cp(out, client, { recursive: true });
await writeFile(
  path.join(server, "index.js"),
  `export default {\n  fetch(request, env) {\n    return env.ASSETS.fetch(request);\n  },\n};\n`,
  "utf8",
);

