import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";

const outputRoot = resolve(process.cwd(), "out");
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "127.0.0.1";
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

if (!existsSync(outputRoot)) {
  console.error("Missing out/. Run npm run build first.");
  process.exit(1);
}

function findFile(pathname) {
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    return { error: 400 };
  }
  const cleanPath = normalize(decodedPath).replace(/^([/\\])+/, "");
  const base = resolve(outputRoot, cleanPath);
  if (base !== outputRoot && !base.startsWith(`${outputRoot}${sep}`)) return { error: 404 };

  const candidates = pathname.endsWith("/")
    ? [join(base, "index.html")]
    : [base, `${base}.html`, join(base, "index.html")];

  const file = candidates.find((candidate) => {
    try {
      return statSync(candidate).isFile();
    } catch {
      return false;
    }
  });
  return file ? { file } : { error: 404 };
}

createServer((request, response) => {
  let pathname;
  try {
    pathname = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`).pathname;
  } catch {
    response.writeHead(400).end("Bad request");
    return;
  }

  const result = findFile(pathname);
  if ("error" in result) {
    response.writeHead(result.error, { "content-type": "text/plain; charset=utf-8" }).end(result.error === 400 ? "Bad request" : "Not found");
    return;
  }
  const { file } = result;

  response.writeHead(200, {
    "cache-control": extname(file) === ".html" ? "no-cache" : "public, max-age=31536000, immutable",
    "content-type": contentTypes[extname(file)] || "application/octet-stream",
  });
  createReadStream(file).pipe(response);
}).listen(port, host, () => {
  console.log(`Patchies is running at http://${host}:${port}`);
});
