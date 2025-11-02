import clsx from 'clsx';
import {
  IImageDTO,
  ILightboxSettings,
  LightboxImageAnimation,
  LightboxTextPosition,
  LightboxThumbnailsPosition,
} from 'data-structures';
import React, {useEffect, useId, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {Watermark} from 'utils/renderWatermark';
import {Lightbox} from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/plugins/captions.css';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/plugins/counter.css';
import Download from 'yet-another-react-lightbox/plugins/download';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Share from 'yet-another-react-lightbox/plugins/share';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Video from 'yet-another-react-lightbox/plugins/video';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import {useAppInfo} from '../../contexts';
import {useData} from '../data-context/useData';
import {useSettings} from '../settings/useSettings';
import {getSlideMargins} from './CommonFunctions/getSlideMargins';
import {Captions} from './CustomCaptions/Captions';
import './lightbox.css';

interface ILightboxProviderProps {
  activeIndex: number;
  onClose: () => void;
}

interface ILightboxBackgroundProps {
  id: string;
  isVisible: boolean;
  onClick: () => void;
  setDrag: (value: boolean) => void;
}

const LightboxBackground: React.FC<ILightboxBackgroundProps> = ({
  id,
  isVisible,
  onClick,
  setDrag,
}) => {
  const element = document.getElementById('wpwrap') || document.body;
  const startPos = useRef<{x: number; y: number}>({x: 0, y: 0});
  const dragged = useRef(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const dragThreshold = 5;

  const handleMouseDown = (e: any) => {
    startPos.current = {x: e.clientX, y: e.clientY};
    dragged.current = false;
    setIsMouseDown(true);
  };

  const handleMouseMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isMouseDown) return;

    const dx = Math.abs(e.clientX - startPos.current.x);
    const dy = Math.abs(e.clientY - startPos.current.y);
    if (dx > dragThreshold || dy > dragThreshold) {
      dragged.current = true;
    }
  };

  const handleMouseUp = () => {
    setDrag(dragged.current);
    setIsMouseDown(false);
  };

  return createPortal(
    <div
      onClick={onClick}
      className={'react-lightbox__background'}
      style={{display: isVisible ? 'block' : 'none'}}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        id={`reacg-lightbox__background-helper${id}`}
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    element
  );
};

const WatermarkOverlay: React.FC = () => {
  const [rect, setRect] = useState<{
    width: number;
    height: number;
    left: number;
    top: number;
  } | null>(null);
  useEffect(() => {
    function updateRect() {
      const media = document.querySelector(
        '.reacg-lightbox .yarl__slide_current img, .reacg-lightbox .yarl__slide_current video'
      );
      if (media) {
        const r = (media as HTMLElement).getBoundingClientRect();
        // Find the slide container to get its position
        const slide = media.closest('.yarl__slide');
        if (slide) {
          const slideRect = (slide as HTMLElement).getBoundingClientRect();
          setRect({
            width: r.width,
            height: r.height,
            left: r.left - slideRect.left,
            top: r.top - slideRect.top,
          });
        } else {
          setRect({width: r.width, height: r.height, left: 0, top: 0});
        }
      } else {
        setRect(null);
      }
    }
    updateRect();
    window.addEventListener('resize', updateRect);
    const observer = new MutationObserver(updateRect);
    observer.observe(document.body, {childList: true, subtree: true});
    return () => {
      window.removeEventListener('resize', updateRect);
      observer.disconnect();
    };
  }, []);
  if (!rect) return null;
  return (
    <div
      className={'react-watermark-overlay'}
      style={{
        position: 'absolute',
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        pointerEvents: 'none',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1,
      }}
    >
      <Watermark />
    </div>
  );
};

const VLightbox: React.FC<ILightboxProviderProps> = ({
  activeIndex,
  onClose,
}) => {
  const {lightboxSettings: settings} = useSettings();
  const {lightboxImages: images} = useData();
  const [drag, setDrag] = useState(false);
  const {
    isFullscreen,
    width,
    height,
    areControlButtonsShown,
    isInfinite,
    padding,
    showCounter,
    canShare,
    canDownload,
    canZoom,
    isSlideshowAllowed,
    autoplay,
    slideDuration,
    imageAnimation,
    isFullscreenAllowed,
    thumbnailsPosition,
    thumbnailWidth,
    thumbnailHeight,
    thumbnailBorder,
    thumbnailBorderRadius,
    thumbnailBorderColor,
    thumbnailPadding,
    thumbnailGap,
    backgroundColor,
    textPosition,
    textFontFamily,
    textColor,
    textBackground,
    invertTextColor,
    showTitle,
    titleFontSize,
    titleAlignment,
    showDescription,
    descriptionFontSize,
    descriptionMaxRowsCount,
    titleSource,
    descriptionSource,
    showCaption,
    captionSource,
    captionFontSize,
    captionFontColor,
  } = settings as ILightboxSettings;
  const lightboxId: string = useId();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [videoAutoplay, setVideoAutoplay] = useState<boolean>(false);
  const [index, setIndex] = useState(0);
  const {galleryId} = useAppInfo();

  const minFactor = 1.45;
  const maxFactor = 1.25;
  const paddingAroundText = 10;
  const titleMargin = 4;

  const plugins = useMemo<any[]>(() => {
    const newPlugins: any[] = [Video];
    if (showCounter) {
      newPlugins.push(Counter as any);
    }
    if (canShare) {
      newPlugins.push(Share as any);
    }
    if (canDownload) {
      newPlugins.push(Download as any);
    }
    if (canZoom) {
      newPlugins.push(Zoom as any);
    }
    if (isSlideshowAllowed || autoplay) {
      newPlugins.push(Slideshow as any);
    }
    if (isFullscreenAllowed) {
      newPlugins.push(Fullscreen as any);
    }
    if (thumbnailsPosition !== LightboxThumbnailsPosition.NONE) {
      newPlugins.push(Thumbnails as any);
    }
    if (showTitle || showCaption || showDescription) {
      newPlugins.push(Captions as any);
    }

    return newPlugins;
  }, [
    showCounter,
    canShare,
    canDownload,
    canZoom,
    isSlideshowAllowed,
    autoplay,
    isFullscreenAllowed,
    thumbnailsPosition,
    textPosition,
    showTitle,
    showCaption,
    showDescription,
  ]);

  const togglePageScroll = (open: boolean) => {
    // Scroll is toggled on <body> by default; <html> should be handled as well.
    const html = document.documentElement;

    if (open) {
      html.classList.add('react-lightbox--no-scroll');
    } else {
      html.classList.remove('react-lightbox--no-scroll');
    }
  };

  const handleClose = () => {
    onClose();
    togglePageScroll(false);
    updateURL(-1);
  };
  const handleOpen = () => {
    togglePageScroll(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const thumbnail = document.querySelector('.yarl__thumbnails_track');
      if (thumbnail) {
        const handleEvent = (e: MouseEvent) => {
          e.stopPropagation();
        };

        thumbnail.addEventListener('mousedown', handleEvent as EventListener);
        thumbnail.addEventListener('mouseup', handleEvent as EventListener);

        // Once found and attached, stop observing
        observer.disconnect();
      }
    });

    observer.observe(document.body, {childList: true, subtree: true});

    return () => {
      observer.disconnect();
    };
  }, []);

  const updateURL = (index: number) => {
    window.history.replaceState({}, '', deepLink(index));
  };

  const deepLink = (index: number) => {
    const url = new URL(window.location.href);
    if (index >= 0) {
      if (galleryId) {
        url.searchParams.set('gid', galleryId);
      }
      url.searchParams.set('sid', index.toString());
    } else {
      url.searchParams.delete('gid');
      url.searchParams.delete('sid');
    }

    return url.toString();
  };

  const slides = useMemo(() => {
    return images?.map((image: IImageDTO, index: number) => ({
      description: (
        <>
          {((showTitle && image[titleSource]) ||
            (showCaption && image[captionSource])) && (
            <p
              className={'reacg-lightbox-texts__title'}
              style={{
                margin: `${titleMargin}px 0`,
                color: textColor,
                fontFamily: textFontFamily,
                fontSize: `clamp(${
                  titleFontSize / minFactor
                }rem, ${titleFontSize}vw, ${titleFontSize * maxFactor}rem)`,
                textAlign: titleAlignment,
              }}
            >
              {showTitle && image[titleSource]}
              {showCaption && image[captionSource] && (
                <span
                  className={'reacg-lightbox__caption'}
                  style={{
                    color: captionFontColor,
                    fontSize: `clamp(${
                      captionFontSize / minFactor
                    }rem, ${captionFontSize}vw, ${
                      captionFontSize * maxFactor
                    }rem)`,
                  }}
                >
                  &nbsp;{image[captionSource]}
                </span>
              )}
            </p>
          )}
          {showDescription && image[descriptionSource] && (
            <p
              className={'reacg-lightbox-texts__description'}
              style={{
                color: textColor,
                fontFamily: textFontFamily,
                fontSize: `clamp(${
                  descriptionFontSize / minFactor
                }rem, ${descriptionFontSize}vw, ${
                  descriptionFontSize * maxFactor
                }rem)`,
                WebkitLineClamp: descriptionMaxRowsCount,
                WebkitBoxOrient: 'vertical',
                display: '-webkit-box',
              }}
            >
              {image[descriptionSource]}
            </p>
          )}
        </>
      ),
      type: image.type,
      sources: [
        {
          src: image.original.url,
          type: `video/${image.original.url.split('.').pop()}`,
        },
      ],
      poster: image.medium_large.url,
      src: image.original.url,
      share: {
        url: deepLink(index),
        title: image.title,
        text: image.description,
      },
      alt: image.alt,
      srcSet: [
        {
          src: image.original.url,
          width: image.original.width,
          height: image.original.height,
        },
        {
          src: image.large.url,
          width: image.large.width,
          height: image.large.height,
        },
        {
          src: image.medium_large.url,
          width: image.medium_large.width,
          height: image.medium_large.height,
        },
        {
          src: image.thumbnail.url,
          width: image.thumbnail.width,
          height: image.thumbnail.height,
        },
      ],
      metadata: image.thumbnail.url,
    }));
  }, [
    images,
    textColor,
    textFontFamily,
    showTitle,
    titleFontSize,
    titleAlignment,
    showDescription,
    descriptionFontSize,
    descriptionMaxRowsCount,
    titleSource,
    descriptionSource,
    showCaption,
    captionSource,
    captionFontSize,
    captionFontColor,
  ]);

  const slideMargins = useMemo(() => {
    return getSlideMargins({
      images,
      index,
      showTitle,
      showDescription,
      textPosition,
      titleFontSize,
      descriptionFontSize,
      descriptionMaxRowsCount,
      minFactor,
      maxFactor,
      paddingAroundText,
      titleMargin,
      showCaption,
    });
  }, [
    images,
    index,
    showTitle,
    showDescription,
    textPosition,
    titleFontSize,
    descriptionFontSize,
    descriptionMaxRowsCount,
    showCaption,
    captionSource,
    captionFontSize,
    captionFontColor,
  ]);

  const responsivePadding = useMemo(() => {
    if (innerWidth <= 768 || innerHeight <= 576) {
      return padding / 10;
    }
    return padding;
  }, [innerWidth, innerHeight, padding]);

  const renderLighbox = () => {
    return (
      <Lightbox
        plugins={plugins}
        open={activeIndex >= 0}
        index={activeIndex}
        close={handleClose}
        slideshow={{autoplay, delay: slideDuration > 700 ? slideDuration : 700}}
        slides={slides}
        controller={{closeOnBackdropClick: !drag}}
        noScroll={{
          disabled: false,
        }}
        counter={{
          separator: '/',
          container: {
            style: {
              top:
                textPosition === LightboxTextPosition.TOP ||
                textPosition === LightboxTextPosition.ABOVE
                  ? 'unset'
                  : 0,
              bottom:
                textPosition === LightboxTextPosition.TOP ||
                textPosition === LightboxTextPosition.ABOVE
                  ? 0
                  : 'unset',
            },
          },
        }}
        animation={{
          swipe: imageAnimation === LightboxImageAnimation.SLIDEH ? 500 : 1,
          easing: {swipe: 'ease-out', navigation: 'ease-in-out'},
        }}
        render={{
          buttonSlideshow: isSlideshowAllowed ? undefined : () => null,
          slideFooter: () => <WatermarkOverlay />,
        }}
        carousel={{
          preload: 5,
          finite: !isInfinite,
          padding: responsivePadding,
        }}
        thumbnails={{
          position: thumbnailsPosition as any,
          width: thumbnailWidth > 0 ? thumbnailWidth : 10,
          height: thumbnailHeight > 0 ? thumbnailHeight : 10,
          border: thumbnailBorder,
          padding: 0,
          gap: thumbnailGap,
          imageFit: 'cover',
          vignette: false,
        }}
        video={{
          autoPlay: videoAutoplay,
        }}
        className={clsx(
          'reacg-lightbox',
          'reacg-lightbox-animation-' + imageAnimation,
          {
            'reacg-lightbox-control-buttons_hidden': !areControlButtonsShown,
            'reacg-lightbox-texts': showTitle || showCaption || showDescription,
            'reacg-lightbox-texts_top': [
              LightboxTextPosition.TOP,
              LightboxTextPosition.ABOVE,
            ].includes(textPosition),
            'reacg-invert-captions': invertTextColor,
          }
        )}
        styles={{
          root: {
            'width': isFullscreen ? '100%' : `${Math.min(innerWidth, width)}px`,
            'height': isFullscreen
              ? '100%'
              : `${Math.min(innerHeight, height)}px`,
            'margin': 'auto',
            '--yarl__thumbnails_container_padding': `${thumbnailPadding}px`,
            '--yarl__thumbnails_container_background_color': `${backgroundColor}`,
            '--yarl__slide_captions_container_padding': `${paddingAroundText}px`,
            '--yarl__slide_captions_container_background':
              textBackground &&
              ((showTitle && images?.[index]?.title) ||
                (showCaption && images?.[index]?.caption) ||
                (showDescription && images?.[index]?.description))
                ? `${textBackground}`
                : `none`,
          },
          thumbnail: {
            '--yarl__thumbnails_thumbnail_active_border_color':
              thumbnailBorderColor || 'transparent',
            '--yarl__thumbnails_thumbnail_border_color':
              thumbnailBorderColor || 'transparent',
            '--yarl__thumbnails_thumbnail_border_radius': `${thumbnailBorderRadius}%`,
          },
          toolbar: {
            marginTop: slideMargins.marginTop,
            marginBottom: slideMargins.marginBottom,
          },
          navigationPrev: {
            marginTop: slideMargins.marginTop,
            marginBottom: slideMargins.marginBottom,
            ...(slideMargins.marginTop || slideMargins.marginBottom
              ? {transform: 'translateY(0%)', top: 'auto'}
              : {}),
          },
          navigationNext: {
            marginTop: `${slideMargins.marginTop}`,
            marginBottom: `${slideMargins.marginBottom}`,
            ...(slideMargins.marginTop || slideMargins.marginBottom
              ? {transform: 'translateY(0%)', top: 'auto'}
              : {}),
          },
          container: {backgroundColor: `${backgroundColor}`},
          slide: {
            marginTop: slideMargins.marginTop,
            marginBottom: slideMargins.marginBottom,
          },
        }}
        portal={{
          root: document.getElementById(
            `reacg-lightbox__background-helper${lightboxId}`
          ),
        }}
        on={{
          slideshowStart: () => {
            if (!videoAutoplay) setVideoAutoplay(true);
          },
          slideshowStop: () => {
            if (videoAutoplay) setVideoAutoplay(false);
          },
          view: ({index: currentIndex}) => {
            setIndex(currentIndex);
            updateURL(currentIndex);
          },
          entering: handleOpen,
        }}
      />
    );
  };

  return (
    <>
      {renderLighbox()}
      <LightboxBackground
        isVisible={activeIndex >= 0}
        onClick={handleClose}
        id={lightboxId}
        setDrag={setDrag}
      />
    </>
  );
};

export {VLightbox};
export default VLightbox;
