import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {target :'http://localhost:5001'} 
    },
  },
})

// For https
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import fs from 'fs';
// import path from 'path';

// const keyPath = path.resolve(__dirname, 'ssl/key.pem');
// const certPath = path.resolve(__dirname, 'ssl/cert.pem');

// console.log('SSL Key Path:', keyPath);
// console.log('SSL Cert Path:', certPath);

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     https: {
//       key: fs.readFileSync(path.resolve(__dirname, '../ssl/key.pem')),
//       cert: fs.readFileSync(path.resolve(__dirname, '../ssl/cert.pem')),
//     },
//     proxy: {
//       '/api': { target: 'http://localhost:5001' },
//     },
//   },
// });
