import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build : {
    outDir : '../API/wwwroot' //production mode
  },
  server:{
         port: 3000
  },
  plugins: [react()],
})
