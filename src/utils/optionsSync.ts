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
export const IMAGES_COUNT_MESSAGE = 'reacg:images-count';

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

export interface IImagesCountMessage {
  type: typeof IMAGES_COUNT_MESSAGE;
  galleryId: string;
  imagesCount: number;
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
    try {
      if (win.document) {
        const iframes = win.document.querySelectorAll('iframe');
        for (let i = 0; i < iframes.length; i++) {
          const cw = iframes[i].contentWindow;
          if (cw) {
            visit(cw);
          }
        }
      }
    } catch (e) {
      /* Cross-origin document; skip. */
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
  try {
    if (window.top && result.indexOf(window.top) === -1) {
      result.push(window.top);
    }
  } catch (e) {
    /* Cross-origin top; stop. */
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
 * Deliver a message to a window exactly once. Same-origin windows whose
 * document is reachable (including Divi 4's `about:blank` app frame) get a
 * synchronous CustomEvent; anything else falls back to postMessage.
 */
const deliver = (target: Window, message: {type: string}) => {
  try {
    // Throws for cross-origin windows.
    if (target.document) {
      const EventCtor: typeof CustomEvent =
        (target as any).CustomEvent || CustomEvent;
      target.dispatchEvent(new EventCtor(message.type, {detail: message}));
      return;
    }
  } catch (e) {
    /* Cross-origin window; use postMessage below. */
  }
  post(target, message);
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
      deliver(win, message);
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
  collectAncestors().forEach((win) => deliver(win, message));
};

/**
 * Subscribe to options messages for a gallery.
 */
export const onOptionsMessage = (
  galleryId: string,
  callback: (options: ReacgOptions, hasChanges: boolean) => void
): (() => void) => {
  const handleData = (data: IOptionsMessage | undefined) => {
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

  const handler = (event: MessageEvent) => {
    if (!isSameOrigin(event)) {
      return;
    }
    handleData(event.data as IOptionsMessage | undefined);
  };

  const directHandler = (event: Event) => {
    const customEvt = event as CustomEvent<IOptionsMessage>;
    handleData(customEvt.detail);
  };

  window.addEventListener('message', handler);
  window.addEventListener(OPTIONS_MESSAGE, directHandler);
  return () => {
    window.removeEventListener('message', handler);
    window.removeEventListener(OPTIONS_MESSAGE, directHandler);
  };
};

/**
 * Subscribe to options requests for a gallery and answer them.
 */
export const onOptionsRequest = (
  galleryId: string,
  getOptions: () => {options: ReacgOptions; hasChanges: boolean} | null
): (() => void) => {
  const answer = (source: Window | null) => {
    const current = getOptions();
    if (!current || !source) {
      return;
    }
    const message: IOptionsMessage = {
      type: OPTIONS_MESSAGE,
      galleryId: String(galleryId),
      options: current.options,
      hasChanges: current.hasChanges,
    };
    deliver(source, message);
  };

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
    answer(event.source as Window | null);
  };

  const directHandler = (event: Event) => {
    const customEvt = event as CustomEvent<IRequestOptionsMessage>;
    const data = customEvt.detail;
    if (
      !data ||
      data.type !== REQUEST_OPTIONS_MESSAGE ||
      String(data.galleryId) !== String(galleryId)
    ) {
      return;
    }
    // A direct event carries no source window: answer every reachable
    // window; receivers filter by galleryId.
    collectWindows().forEach((win) => {
      if (win !== window) {
        answer(win);
      }
    });
  };

  window.addEventListener('message', handler);
  window.addEventListener(REQUEST_OPTIONS_MESSAGE, directHandler);
  return () => {
    window.removeEventListener('message', handler);
    window.removeEventListener(REQUEST_OPTIONS_MESSAGE, directHandler);
  };
};

/**
 * Broadcast the images count of a gallery to reachable windows.
 */
export const broadcastImagesCount = (
  galleryId: string,
  imagesCount: number
): void => {
  const message: IImagesCountMessage = {
    type: IMAGES_COUNT_MESSAGE,
    galleryId: String(galleryId),
    imagesCount,
  };
  collectWindows().forEach((win) => {
    if (win !== window) {
      deliver(win, message);
    }
  });
};

/**
 * Subscribe to images count updates for a gallery.
 */
export const onImagesCountMessage = (
  galleryId: string,
  callback: (imagesCount: number) => void
): (() => void) => {
  const handleData = (data: IImagesCountMessage | undefined) => {
    if (
      !data ||
      data.type !== IMAGES_COUNT_MESSAGE ||
      String(data.galleryId) !== String(galleryId) ||
      typeof data.imagesCount !== 'number'
    ) {
      return;
    }
    callback(data.imagesCount);
  };

  const handler = (event: MessageEvent) => {
    if (!isSameOrigin(event)) {
      return;
    }
    handleData(event.data as IImagesCountMessage | undefined);
  };

  const directHandler = (event: Event) => {
    const customEvt = event as CustomEvent<IImagesCountMessage>;
    handleData(customEvt.detail);
  };

  window.addEventListener('message', handler);
  window.addEventListener(IMAGES_COUNT_MESSAGE, directHandler);
  return () => {
    window.removeEventListener('message', handler);
    window.removeEventListener(IMAGES_COUNT_MESSAGE, directHandler);
  };
};

