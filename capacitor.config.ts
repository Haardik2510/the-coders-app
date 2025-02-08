
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.737ea0d18e994001a6724b950630ae55',
  appName: 'chat-coders-nexus',
  webDir: 'dist',
  server: {
    url: 'https://737ea0d1-8e99-4001-a672-4b950630ae55.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: 'release-key.keystore',
      keystoreAlias: 'key0',
    },
  },
};

export default config;
