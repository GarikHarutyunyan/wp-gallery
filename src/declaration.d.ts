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

interface Window {
  reacg_global?: {
    options_api_version?: number;
    onOptionsChange?: (
      options: import('data-structures').ReacgOptions,
      meta: import('data-structures').ReacgOptionsMeta
    ) => void;
    [key: string]: any;
  };
  [key: string]: any;
}

