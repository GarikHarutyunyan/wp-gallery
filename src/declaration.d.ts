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
