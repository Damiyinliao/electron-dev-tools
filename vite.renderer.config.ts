import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig } from 'vite';
import { pluginExposeRenderer } from './vite.base.config';
import path from "node:path";
import React from '@vitejs/plugin-react';
import { vitePluginForArco } from '@arco-plugins/vite-react';

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env as ConfigEnv<'renderer'>;
  const { root, mode, forgeConfigSelf } = forgeEnv;
  const name = forgeConfigSelf.name ?? '';

  return {
    root,
    mode,
    base: './',
    build: {
      outDir: `.vite/renderer/${name}`,
    },
    plugins: [
      pluginExposeRenderer(name),
      React(),
      vitePluginForArco()
    ],
    resolve: {
      preserveSymlinks: true,
      alias: [{ find: "@", replacement: path.resolve(__dirname, 'src')}]
    },
    clearScreen: false,
  } as UserConfig;
});