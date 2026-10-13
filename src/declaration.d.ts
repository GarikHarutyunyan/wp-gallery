declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.webp' {
  const value: string;
  export default value;
}

declare module '*.css' {
  const classes: {[key: string]: string};
  export default classes;
}

/**
 * Programmatic access to a mounted settings UI, keyed by gallery ID on
 * `window.reacg_global.settings_api`. Used by page builder integrations to
 * flush unsaved option changes through the same code path as the Save button.
 */
interface ReacgSettingsApi {
  save: (params?: {silent?: boolean}) => Promise<boolean>;
  reset: () => Promise<void>;
  hasChanges: () => boolean;
  getOptions: () => import('data-structures').ReacgOptions;
}

interface Window {
  reacg_global?: {
    options_api_version?: number;
    onOptionsChange?: (
      options: import('data-structures').ReacgOptions,
      meta: import('data-structures').ReacgOptionsMeta
    ) => void;
    settings_api?: {[galleryId: string]: ReacgSettingsApi};
    [key: string]: any;
  };
  reacg_mount_settings?: (rootElement: HTMLElement) => void;
  reacg_unmount_settings?: (rootElement: HTMLElement) => void;
  reacg_mount_gallery?: (rootElement: HTMLElement) => void;
  [key: string]: any;
}
