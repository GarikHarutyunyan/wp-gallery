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
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/plugins/captions.css';
import Download from 'yet-another-react-lightbox/plugins/download';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Video from 'yet-another-react-lightbox/plugins/video';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
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
    showTitle,
    titleFontSize,
    titleAlignment,
    showDescription,
    descriptionFontSize,
    descriptionMaxRowsCount,
    titleSource,
    descriptionSource,
  } = settings as ILightboxSettings;
  const lightboxId: string = useId();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [videoAutoplay, setVideoAutoplay] = useState<boolean>(false);
  const [index, setIndex] = useState(0);

  const minFactor = 1.45;
  const maxFactor = 1.25;
  const paddingAroundText = 10;
  const titleMargin = 4;

  const plugins = useMemo<any[]>(() => {
    const newPlugins: any[] = [Video];
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
    if (textPosition !== LightboxTextPosition.NONE) {
      newPlugins.push(Captions as any);
    }

    return newPlugins;
  }, [
    canDownload,
    canZoom,
    isSlideshowAllowed,
    autoplay,
    isFullscreenAllowed,
    thumbnailsPosition,
    textPosition,
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

  const slides = useMemo(() => {
    return images!.map((image: IImageDTO) => ({
      description: (
        <>
          {showTitle && image[titleSource] && (
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
              {image[titleSource]}
              {image.price && (
                <span className={'reacg-lightbox__caption'}>
                  &nbsp;{image.price}
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
  ]);

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
        animation={{
          swipe: imageAnimation === LightboxImageAnimation.SLIDEH ? 500 : 1,
          easing: {swipe: 'ease-out', navigation: 'ease-in-out'},
        }}
        render={{
          buttonSlideshow: isSlideshowAllowed ? undefined : () => null,
        }}
        carousel={{
          preload: 5,
          finite: !isInfinite,
          padding,
        }}
        // #TODO add generic validation mechanism to avoid this kind of checkings
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
            'reacg-lightbox-texts': textPosition !== LightboxTextPosition.NONE,
            'reacg-lightbox-texts_top': [
              LightboxTextPosition.TOP,
              LightboxTextPosition.ABOVE,
            ].includes(textPosition),
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
              (showTitle && images![index]?.title) ||
              (showDescription && images![index]?.description)
                ? `${backgroundColor}80`
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
          view: ({index: currentIndex}) => setIndex(currentIndex),
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
