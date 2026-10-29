import * as React from 'react';
import {resolveCaptionsProps} from './Captions';
import {
  getSlide,
  makeUseContext,
  useController,
  useLightboxState,
} from 'yet-another-react-lightbox';
import {Description} from './Description';

export interface ICaptionsContext {
  visible: boolean;
  isSlideReady: boolean;
  show: () => void;
  hide: () => void;
}

export const CaptionsContext = React.createContext<ICaptionsContext | null>(
  null
);

export const useCaptions = makeUseContext(
  'useCaptions',
  'CaptionsContext',
  CaptionsContext
);

const parseTimeListMs = (value: string): number => {
  if (!value) return 0;
  return Math.max(
    0,
    ...value.split(',').map((part) => {
      const trimmed = part.trim();
      if (trimmed.endsWith('ms')) {
        return parseFloat(trimmed) || 0;
      }
      if (trimmed.endsWith('s')) {
        return (parseFloat(trimmed) || 0) * 1000;
      }
      return 0;
    })
  );
};

const getElementTransitionMs = (el: HTMLElement | null): number => {
  if (!el) return 0;
  const style = window.getComputedStyle(el);
  const duration = parseTimeListMs(style.transitionDuration);
  const delay = parseTimeListMs(style.transitionDelay);
  return duration > 0 ? duration + delay : 0;
};

export function CaptionsContextProvider({captions, children}: any) {
  const {ref, hideOnSlideChange} = resolveCaptionsProps(captions);
  const {
    slides,
    globalIndex,
    animation: stateAnimation,
  } = useLightboxState() as any;
  const {containerRef} = useController() as any;

  const [visible, setVisible] = React.useState(true);
  const [readyGlobalIndex, setReadyGlobalIndex] = React.useState<number | null>(
    null
  );
  const hasMountedSlideRef = React.useRef(false);

  React.useEffect(() => {
    if (!hideOnSlideChange) {
      return;
    }

    const isSlideChange = hasMountedSlideRef.current;
    hasMountedSlideRef.current = true;
    const startTime = performance.now();

    let timeoutId: number | null = null;
    let rafId1: number | null = null;
    let rafId2: number | null = null;
    let observedMedia: HTMLElement | null = null;
    let isCancelled = false;
    let resizeObserver: ResizeObserver | null = null;

    const clearPendingTimers = () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
      if (rafId1 !== null) {
        window.cancelAnimationFrame(rafId1);
        rafId1 = null;
      }
      if (rafId2 !== null) {
        window.cancelAnimationFrame(rafId2);
        rafId2 = null;
      }
    };

    const checkIfSlideVisible = () => {
      if (isCancelled) return;

      const container = containerRef?.current as HTMLElement | null;
      const slide = container?.querySelector(
        '.yarl__slide_current'
      ) as HTMLElement | null;

      if (!slide) return;

      const wrapper = slide.querySelector(
        '.yarl__slide_wrapper'
      ) as HTMLElement | null;
      const mediaElements = slide.querySelectorAll('img, video');
      const media = (Array.from(mediaElements).find(
        (el) => (el as HTMLElement).style.visibility !== 'hidden'
      ) || mediaElements[mediaElements.length - 1]) as HTMLElement | undefined;

      if (media && media !== observedMedia) {
        if (observedMedia) {
          resizeObserver?.unobserve(observedMedia);
          observedMedia.removeEventListener('load', checkIfSlideVisible);
          observedMedia.removeEventListener(
            'loadedmetadata',
            checkIfSlideVisible
          );
          observedMedia.removeEventListener('loadeddata', checkIfSlideVisible);
        }
        observedMedia = media;
        resizeObserver?.observe(media);
        media.addEventListener('load', checkIfSlideVisible);
        media.addEventListener('loadedmetadata', checkIfSlideVisible);
        media.addEventListener('loadeddata', checkIfSlideVisible);
      }

      const carouselDuration = isSlideChange
        ? stateAnimation?.duration || 0
        : 0;
      const wrapperDuration = isSlideChange
        ? getElementTransitionMs(wrapper)
        : 0;
      const mediaDuration = isSlideChange
        ? getElementTransitionMs(media || null)
        : 0;
      const totalTransitionMs = Math.max(
        carouselDuration,
        wrapperDuration,
        mediaDuration
      );
      const elapsed = performance.now() - startTime;
      const remainingMs = Math.max(0, totalTransitionMs - elapsed);

      if (remainingMs > 16) {
        if (timeoutId !== null) {
          window.clearTimeout(timeoutId);
        }
        timeoutId = window.setTimeout(() => {
          timeoutId = null;
          checkIfSlideVisible();
        }, Math.ceil(remainingMs));
        return;
      }

      const hasError = !!slide.querySelector('.yarl__slide_error');
      const hasLoadingPlaceholder = !!slide.querySelector(
        '.yarl__slide_placeholder'
      );

      let isMediaReady = false;
      if (hasError) {
        isMediaReady = true;
      } else if (media && !hasLoadingPlaceholder) {
        const boxWidth = media.clientWidth || media.offsetWidth;
        const boxHeight = media.clientHeight || media.offsetHeight;

        if (media instanceof HTMLImageElement) {
          isMediaReady =
            media.complete &&
            media.naturalWidth > 0 &&
            media.naturalHeight > 0 &&
            !media.classList.contains('yarl__slide_image_loading') &&
            boxWidth > 0 &&
            boxHeight > 0;
        } else if (media instanceof HTMLVideoElement) {
          isMediaReady = boxWidth > 0 && boxHeight > 0;
        }
      }

      if (isMediaReady) {
        clearPendingTimers();
        rafId1 = window.requestAnimationFrame(() => {
          rafId1 = null;
          rafId2 = window.requestAnimationFrame(() => {
            rafId2 = null;
            if (!isCancelled) {
              setReadyGlobalIndex(globalIndex);
            }
          });
        });
      }
    };

    resizeObserver = new ResizeObserver(checkIfSlideVisible);
    const mutationObserver = new MutationObserver(checkIfSlideVisible);

    const container = containerRef?.current as HTMLElement | null;
    if (container) {
      mutationObserver.observe(container, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'src', 'style'],
      });
    }

    checkIfSlideVisible();

    return () => {
      isCancelled = true;
      clearPendingTimers();
      mutationObserver.disconnect();
      resizeObserver?.disconnect();
      if (observedMedia) {
        observedMedia.removeEventListener('load', checkIfSlideVisible);
        observedMedia.removeEventListener(
          'loadedmetadata',
          checkIfSlideVisible
        );
        observedMedia.removeEventListener('loadeddata', checkIfSlideVisible);
      }
    };
  }, [globalIndex, containerRef, stateAnimation?.duration, hideOnSlideChange]);

  const isSlideReady = !hideOnSlideChange || readyGlobalIndex === globalIndex;

  const context = React.useMemo(
    () => ({
      visible,
      isSlideReady,
      show: () => setVisible(true),
      hide: () => setVisible(false),
    }),
    [visible, isSlideReady]
  );

  React.useImperativeHandle(ref, () => context, [context]);

  return (
    <CaptionsContext.Provider value={context}>
      {children}
      <Description
        description={
          (getSlide(slides as any, globalIndex) as any)?.description as any
        }
        style={{position: 'relative'}}
      />
    </CaptionsContext.Provider>
  );
}
