import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.payslips',
  appName: 'payslips-vite',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    // url: 'http://127.0.0.1:3000',
    cleartext: true,
  }
};

export default config;
