/**
 * Gets the container HTMLElement based on the provided selector.
 * It first checks the current document, then the parent document (if in an iframe).
 * @param containerSelector - The CSS selector for the container element.
 * @returns The found HTMLElement or null if not found.
 */
export const getContainerElement = (containerSelector: string) => {
  if (containerSelector) {
    const docElement = document.querySelector(containerSelector);
    // eslint-disable-next-line no-restricted-globals
    const parentElement = parent?.document.querySelector(containerSelector);

    return (
      (docElement as HTMLElement) || (parentElement as HTMLElement) || null
    );
  }
  return null;
};
