import vue from '@vitejs/plugin-vue'
import vuejsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    vuejsx(),
    dts({
      outDir: 'es',
    }),
  ],
  build: {
    lib: {
      entry: './src/main.ts',
    },
    rollupOptions: {
      external: ['vue', '@arco-design/web-vue', 'lodash-es'],
      output: [
        {
          format: 'es',
          dir: 'es',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
      ],
    },
  },
})
