import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  const isProduction = mode === 'production'

  return {
    plugins: [vue()],

    // 基础路径（可通过环境变量配置，适配 GitHub Pages 等子路径部署）
    base: env.VITE_APP_BASE_URL || '/',

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },

    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "@/assets/styles/variables.less";`
        }
      }
    },

    server: {
      port: 3000,
      open: true,
      host: true
    },

    // ESBuild 选项（生产环境移除 console/debugger）
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : []
    },

    // 构建优化
    build: {
      // 输出目录
      outDir: 'dist',
      // 静态资源目录
      assetsDir: 'assets',
      // 生产环境 sourcemap 关闭
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      // 使用 esbuild 压缩（更快，Vite 默认）
      minify: 'esbuild',

      // Rollup 打包配置
      rollupOptions: {
        output: {
          // 静态资源分类打包
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',

          // 分包策略 - 手动拆分
          manualChunks: {
            // Vue 生态核心库
            'vue-vendor': ['vue', 'vue-router', 'pinia'],
            // Pinia 持久化插件
            'pinia-persist': ['pinia-plugin-persistedstate']
          }
        }
      }
    },

    // 预构建优化
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'pinia',
        'pinia-plugin-persistedstate'
      ]
    }
  }
})
