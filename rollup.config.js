import { terser } from "rollup-plugin-terser";
import vue from "rollup-plugin-vue";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import builtins from "rollup-plugin-node-builtins";
import commonjs from "rollup-plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
import purgecss from "@fullhuman/postcss-purgecss";
import json from "rollup-plugin-json";

const production = process.env.NODE_ENV || "development";

export default {
  input: "src/index.js",
  output: [
    {
      name: "index",
      file: "dist/index.js",
      sourcemap: true,
    },
  ],
  plugins: [
    builtins(),
    vue({
      css: true,
    }),
    postcss({
      extract: true,
      minimize: true,
      plugins: [
        autoprefixer(),
        tailwind(),
        production &&
          purgecss({
            content: ["./static/index.html", "./src/**/*.vue"],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
          }),
      ],
    }),
    peerDepsExternal(),
    resolve(),
    json(),
    commonjs(),
    terser(),
  ],
};
