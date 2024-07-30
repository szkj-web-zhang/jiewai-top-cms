import vue from "@vitejs/plugin-vue";
import { PluginOption } from "vite";
import NextDevTools from "vite-plugin-vue-devtools";
import eslintPlugin from "vite-plugin-eslint";
import { join, resolve } from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { readdirSync } from "node:fs";
import history from "connect-history-api-fallback";
import type { Rewrite } from "connect-history-api-fallback";

const readDirGeneratedRules = (rootPath: string): Rewrite[] => {
  let rules: Rewrite[] = [];
  const uiPath = join(rootPath, "src/pages");
  readdirSync(uiPath).forEach(name => {
    rules.push({
      from: new RegExp(`/${name}`),
      to: `/src/pages/${name}/index.html`
    });
  });
  return rules;
};

// 访问路径改写：/index.html/home==>/home
const viteRewritePathPlugin = (): PluginOption => {
  let rules: Rewrite[] = [];
  return {
    name: "vite-rewrite-path",
    configResolved(config) {
      rules = readDirGeneratedRules(config.root);
    },
    configureServer(server) {
      server.middlewares.use(
        history({
          htmlAcceptHeaders: ["text/html", "application/xhtml+xml"],
          disableDotRule: void 0,
          rewrites: rules
        })
      );
    }
  };
};

export const createVitePlugins = (
  viteEnv: ViteEnv
): (PluginOption | PluginOption[])[] => {
  const { VITE_DEVTOOLS } = viteEnv;
  return [
    vue(),
    VITE_DEVTOOLS && NextDevTools({ launchEditor: "code" }),
    eslintPlugin(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]"
    }),
    viteRewritePathPlugin()
  ];
};
