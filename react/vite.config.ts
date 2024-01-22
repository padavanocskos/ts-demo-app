import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
    // depending on your application, base can also be "/"
    base: '',
    plugins: [
        react(),
        viteTsconfigPaths(),
        svgr({
            include: '**/*.svg?react'
        })
    ],
    define: {
        // By default, Vite doesn't include shims for NodeJS/
        // necessary for segment analytics lib to work
        global: {},
    },
    resolve: {
        alias: {
            'stream' : 'stream-browserify',
            'node-fetch' : 'node-fetch/lib/index.js',
        },
    },
    server: {    
        host: true,
        port: 8000, 
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
        // coverage: {
        //     reporter: ['text', 'json', 'html'],
        // }
    }
})