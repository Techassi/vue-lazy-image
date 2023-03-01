import { basename, dirname, join } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: 'src/index.ts',
        formats: ['cjs', 'es'],
        fileName: 'index',
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
    plugins: [
      dts({
        tsConfigFilePath: './tsconfig.json',
        exclude: 'node_modules',
        staticImport: true,
        outputDir: 'dist',
        include: '.',
        beforeWriteFile: (path: string, content: string) => {
          return {
            filePath: join(dirname(path).replace('src', ''), basename(path)),
            content,
          };
        },
      }),
    ],
  };
});