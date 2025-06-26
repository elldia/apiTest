// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // '/B490007'로 시작하는 모든 요청을 https://apis.data.go.kr로 보내줍니다.
      '/B490007': {
        target: 'https://apis.data.go.kr', // 데이터를 가져올 진짜 서버 주소
        changeOrigin: true, // 이 설정을 꼭 true로 해주세요! CORS 문제 해결에 필수적
        rewrite: (path) => path.replace(/^\/B490007/, '/B490007'), // 요청 경로를 유지합니다.
        secure: false, // 개발 환경에서 HTTPS 인증서 문제를 무시 (배포 시에는 주의)
      },
    },
  },
});