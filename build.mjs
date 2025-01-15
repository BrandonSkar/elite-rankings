import esbuild from "esbuild";
import fs from "fs/promises";
import pathlib from "path";

const FILES_TO_COMPILE = ["config.js", "panel.jsx"];
const PATHS_TO_COPY = ["assets", "config.html", "panel.html"];

const pathRelativeToAbsolute = (path) => pathlib.join(import.meta.dirname, path);

console.log("Copying assets...");
for (let assetPath of PATHS_TO_COPY) {
    fs.cp(pathRelativeToAbsolute(`src/${assetPath}`), pathRelativeToAbsolute(`dist/${assetPath}`), {recursive: true});
}
console.log("Done!");

console.log("Compiling scripts...");
const buildContext = await esbuild.context({
    bundle: true,
    entryPoints: FILES_TO_COMPILE.map(path => `src/${path}`).map(pathRelativeToAbsolute),
    outdir: pathRelativeToAbsolute("dist"),
});
console.log(buildContext);
console.log("Done!");

if (process.argv.includes("--serve")) {
    await buildContext.watch();
    await buildContext.serve({servedir: pathRelativeToAbsolute("dist")});
    console.log("Watching and serving");
} else {
    await buildContext.dispose();
}
