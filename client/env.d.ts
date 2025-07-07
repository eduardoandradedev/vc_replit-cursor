/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID: string;
  readonly VITE_WEBHOOK_URL: string;
  readonly VITE_WEBHOOK_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
