import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'payslips-vite',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    // url: 'http://192.168.100.135:5173',
    cleartext: true,
  }
};

export default config;
