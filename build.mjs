// Build both halves of the dsh-memory-panel plugin.
//
// Host half (src/index.ts → lib/index.js): a plain ESM node module the dsh
// host loader imports. Registers memory_save/recall/list tools and the
// GET /api/memory endpoint.
//
// Browser half (src/client/index.tsx → lib/client.js): the dsh client module
// system loads each plugin bundle as a classic script that registers a
// lazy-CJS factory:
//
//   window.__ModuleLoader__.load({
//     id: "<package name>",
//     factory: (require) => {
//       var module = { exports: {} };
//       var exports = module.exports;
//       Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//       // ... CJS bundle body ...
//       return module.exports;
//     }
//   });
//
// esbuild emits plain CJS (module/exports/require globals) for format=cjs, so
// we wrap its output verbatim inside the factory. Runtime dependencies are
// external: react comes from the shell's static module table, and dsh client
// packages are graph rows materialized by the loader's require on demand.
import { build } from "esbuild";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const id = pkg.name;

/** Every specifier the factory require() must resolve at runtime. */
const CLIENT_EXTERNALS = [
  // platform seed words (shell static module table)
  "react",
  "react/jsx-runtime",
  "react-dom",
  "react-dom/client",
  "@deepseek-ai/cordis",
  "@deepseek-ai/dsh-client-runtime",
  "@deepseek-ai/dsh-client-ui-sidebar",
];

const clientResult = await build({
  entryPoints: [join(root, "src/client/index.tsx")],
  bundle: true,
  format: "cjs",
  platform: "browser",
  target: "es2020",
  external: CLIENT_EXTERNALS,
  jsx: "automatic",
  sourcemap: true,
  write: false,
  logLevel: "info",
  charset: "utf8",
});

const clientBody = clientResult.outputFiles[0].text;
const clientOut = `// Auto-generated from src/client/index.tsx — do not edit directly.\nwindow.__ModuleLoader__.load({\n\tid: ${JSON.stringify(id)},\n\tfactory: (require) => {\n\t\tvar module = { exports: {} };\n\t\tvar exports = module.exports;\n\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: "Module" });\n${clientBody}\n\t\treturn module.exports;\n\t}\n});\n`;
writeFileSync(join(root, "lib/client.js"), clientOut);
writeFileSync(join(root, "lib/client.js.map"), clientResult.outputFiles[0].map ?? "");

await build({
  entryPoints: [join(root, "src/index.ts")],
  bundle: true,
  format: "esm",
  platform: "node",
  target: "es2020",
  external: [
    "node:*",
    "@deepseek-ai/cordis",
    "@deepseek-ai/dsh-tools",
    "@deepseek-ai/schemastery",
  ],
  sourcemap: false,
  write: true,
  outfile: join(root, "lib/index.js"),
  logLevel: "info",
  charset: "utf8",
});

console.log("build complete: lib/index.js + lib/client.js");
