import { copyFile, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const DATA_ROOT = path.join(ROOT, "public", "taisei-web", "data");
const BUILD_CANDIDATES = [
  path.join(ROOT, "external", "taisei-project-mp-source", "build-emscripten-clean"),
  path.join(ROOT, "external", "taisei-project-mp-source", "build-emscripten"),
];
const PUBLIC_WEB_ROOT = path.join(ROOT, "public", "taisei-web");
const LEGACY_SOURCE_ROOT = path.join(ROOT, "app", "_taisei-project-mp-source");
const RUNTIME_ARTIFACTS = [
  ["src/taisei.js", "taisei.js"],
  ["src/taisei.wasm", "taisei.wasm"],
];

function decodeCString(value) {
  return value.replace(/\\\\/g, "\\");
}

async function findBuildRoot() {
  for (const candidate of BUILD_CANDIDATES) {
    const resIndexPath = path.join(candidate, "resources", "res-index.inc.h");

    try {
      await stat(resIndexPath);
      return { buildRoot: candidate, resIndexPath };
    } catch {}
  }

  throw new Error(
    `Could not find a Taisei Emscripten build with resources/res-index.inc.h. Checked:\n${BUILD_CANDIDATES.join("\n")}`,
  );
}

async function pathExists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

function remapSourcePath(sourcePath, buildRoot) {
  const sourceRoot = path.dirname(buildRoot);

  if (sourcePath.startsWith(sourceRoot)) {
    return sourcePath;
  }

  if (sourcePath.startsWith(LEGACY_SOURCE_ROOT)) {
    return path.join(sourceRoot, path.relative(LEGACY_SOURCE_ROOT, sourcePath));
  }

  const resourcesMarker = `${path.sep}resources${path.sep}`;
  const markerIndex = sourcePath.indexOf(resourcesMarker);

  if (markerIndex !== -1) {
    return path.join(sourceRoot, sourcePath.slice(markerIndex + 1));
  }

  return sourcePath;
}

function parseResourceIndex(source) {
  const fileEntries = [];
  const regex = /FILE\(\s*\d+,\s*"([0-9a-f]{64})",\s*"((?:[^"\\]|\\.)*)",\s*"((?:[^"\\]|\\.)*)"\s*\)/g;

  for (const match of source.matchAll(regex)) {
    fileEntries.push({
      hash: match[1],
      virtualName: decodeCString(match[2]),
      sourcePath: decodeCString(match[3]),
    });
  }

  return fileEntries;
}

async function main() {
  const { buildRoot, resIndexPath } = await findBuildRoot();
  const resIndexSource = await readFile(resIndexPath, "utf8");
  const resources = parseResourceIndex(resIndexSource);

  if (resources.length === 0) {
    throw new Error(`No FILE entries were parsed from ${resIndexPath}`);
  }

  await mkdir(PUBLIC_WEB_ROOT, { recursive: true });
  await mkdir(DATA_ROOT, { recursive: true });

  let copiedRuntimeArtifacts = 0;

  for (const [fromRelativePath, toFileName] of RUNTIME_ARTIFACTS) {
    const sourcePath = path.join(buildRoot, fromRelativePath);
    const targetPath = path.join(PUBLIC_WEB_ROOT, toFileName);

    await copyFile(sourcePath, targetPath);
    copiedRuntimeArtifacts += 1;
  }

  const validHashes = new Set(resources.map((resource) => resource.hash));
  const existingFiles = await readdir(DATA_ROOT);
  let removed = 0;

  for (const existingFile of existingFiles) {
    if (!validHashes.has(existingFile)) {
      await rm(path.join(DATA_ROOT, existingFile), { force: true });
      removed += 1;
    }
  }

  let written = 0;

  for (const resource of resources) {
    const targetPath = path.join(DATA_ROOT, resource.hash);

    if (await pathExists(targetPath)) {
      continue;
    }

    const resolvedSourcePath = remapSourcePath(resource.sourcePath, buildRoot);
    const bytes = await readFile(resolvedSourcePath);
    await writeFile(targetPath, bytes);
    written += 1;
  }

  console.log("Taisei local data rebuild complete.");
  console.log(`Build root: ${buildRoot}`);
  console.log(`Resource index: ${resIndexPath}`);
  console.log(`Resource files indexed: ${resources.length}`);
  console.log(`Runtime artifacts copied: ${copiedRuntimeArtifacts}`);
  console.log(`New hashed data files written: ${written}`);
  console.log(`Stale hashed data files removed: ${removed}`);
}

await main();
