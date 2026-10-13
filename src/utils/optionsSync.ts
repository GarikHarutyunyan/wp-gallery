import {ReacgOptions} from 'data-structures';

/**
 * Cross-document options synchronization.
 *
 * Page builders render the gallery preview inside a canvas iframe while the
 * settings UI runs in the builder's top document. Both sides talk over
 * window.postMessage so that neither needs DOM access to the other.
 */

export const OPTIONS_MESSAGE = 'reacg:options';
export const REQUEST_OPTIONS_MESSAGE = 'reacg:request-options';

export interface IOptionsMessage {
  type: typeof OPTIONS_MESSAGE;
  galleryId: string;
  options: ReacgOptions;
  hasChanges: boolean;
}

export interface IRequestOptionsMessage {
  type: typeof REQUEST_OPTIONS_MESSAGE;
  galleryId: string;
}

const isSameOrigin = (event: MessageEvent): boolean => {
  return !event.origin || event.origin === window.location.origin;
};

/**
 * Collect every same-origin window reachable from the top window.
 */
const collectWindows = (): Window[] => {
  const result: Window[] = [];
  const visit = (win: Window) => {
    if (!win || result.indexOf(win) !== -1) {
      return;
    }
    result.push(win);
    try {
      for (let i = 0; i < win.frames.length; i++) {
        visit(win.frames[i]);
      }
    } catch (e) {
      /* Cross-origin frame; skip. */
    }
  };

  let top: Window = window;
  try {
    top = window.top || window;
  } catch (e) {
    top = window;
  }
  visit(top);
  if (result.indexOf(window) === -1) {
    result.push(window);
  }

  return result;
};

/**
 * Collect ancestor windows (parent chain up to the top window).
 */
const collectAncestors = (): Window[] => {
  const result: Window[] = [];
  let current: Window = window;
  try {
    while (current.parent && current.parent !== current) {
      current = current.parent;
      result.push(current);
    }
  } catch (e) {
    /* Cross-origin ancestor; stop. */
  }
  return result;
};

const post = (target: Window, message: object) => {
  try {
    target.postMessage(message, window.location.origin);
  } catch (e) {
    /* Ignore unreachable windows. */
  }
};

/**
 * Push the current options of a gallery to every reachable window.
 */
export const broadcastOptions = (
  galleryId: string,
  options: ReacgOptions,
  hasChanges: boolean
): void => {
  const message: IOptionsMessage = {
    type: OPTIONS_MESSAGE,
    galleryId: String(galleryId),
    options,
    hasChanges,
  };
  collectWindows().forEach((win) => {
    if (win !== window) {
      post(win, message);
    }
  });
};

/**
 * Ask ancestor windows for the latest options of a gallery. A settings app
 * holding unsaved changes answers with an options message.
 */
export const requestOptions = (galleryId: string): void => {
  const message: IRequestOptionsMessage = {
    type: REQUEST_OPTIONS_MESSAGE,
    galleryId: String(galleryId),
  };
  collectAncestors().forEach((win) => post(win, message));
};

/**
 * Subscribe to options messages for a gallery.
 */
export const onOptionsMessage = (
  galleryId: string,
  callback: (options: ReacgOptions, hasChanges: boolean) => void
): (() => void) => {
  const handler = (event: MessageEvent) => {
    if (!isSameOrigin(event)) {
      return;
    }
    const data = event.data as IOptionsMessage | undefined;
    if (
      !data ||
      data.type !== OPTIONS_MESSAGE ||
      String(data.galleryId) !== String(galleryId) ||
      !data.options
    ) {
      return;
    }
    callback(data.options, !!data.hasChanges);
  };

  window.addEventListener('message', handler);
  return () => window.removeEventListener('message', handler);
};

/**
 * Subscribe to options requests for a gallery and answer them.
 */
export const onOptionsRequest = (
  galleryId: string,
  getOptions: () => {options: ReacgOptions; hasChanges: boolean} | null
): (() => void) => {
  const handler = (event: MessageEvent) => {
    if (!isSameOrigin(event)) {
      return;
    }
    const data = event.data as IRequestOptionsMessage | undefined;
    if (
      !data ||
      data.type !== REQUEST_OPTIONS_MESSAGE ||
      String(data.galleryId) !== String(galleryId)
    ) {
      return;
    }
    const current = getOptions();
    const source = event.source as Window | null;
    if (!current || !source) {
      return;
    }
    const message: IOptionsMessage = {
      type: OPTIONS_MESSAGE,
      galleryId: String(galleryId),
      options: current.options,
      hasChanges: current.hasChanges,
    };
    post(source, message);
  };

  window.addEventListener('message', handler);
  return () => window.removeEventListener('message', handler);
};
