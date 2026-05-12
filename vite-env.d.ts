/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  readonly VITE_API_URL: string;
  readonly VITE_MAPBOX_API_ACCESS_TOKEN: string;
  readonly VITE_OPENSTATES_API_KEY: string;
  readonly VITE_API_DEV_VOTER_INFO_URL?: string;
  readonly VITE_API_DEV_REPRESENTATIVES_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
