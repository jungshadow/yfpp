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

// Untyped third-party modules
declare module '@mapbox/mapbox-sdk' {
  const mbxClient: (config: { accessToken: string }) => unknown;
  export default mbxClient;
}

declare module '@mapbox/mapbox-sdk/services/geocoding' {
  const mbxGeocoding: (client: unknown) => {
    forwardGeocode: (config: {
      query: string;
      limit?: number;
      types?: string[];
      countries?: string[];
    }) => { send: () => Promise<{
      body: {
        query: string[];
        features: Array<{ place_name: string; center: [number, number] }>;
      };
    }> };
  };
  export default mbxGeocoding;
}

declare module '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions' {
  import type { IControl } from 'mapbox-gl';
  class MapboxDirections implements IControl {
    constructor(options?: Record<string, unknown>);
    onAdd(map: mapboxgl.Map): HTMLElement;
    onRemove(): void;
    setOrigin(origin: [number, number] | string): this;
    setDestination(destination: [number, number] | string): this;
  }
  export default MapboxDirections;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.json' {
  const value: unknown;
  export default value;
}
