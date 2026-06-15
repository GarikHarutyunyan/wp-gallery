import Box from '@mui/material/Box';
import clsx from 'clsx';
import {useData} from 'components/data-context/useData';
import {getSlideMargins} from 'components/lightbox/CommonFunctions/getSlideMargins';
import {Captions} from 'components/lightbox/CustomCaptions/Captions';
import {useSettings} from 'components/settings';
import {ActionButton} from 'core-components/action-button';
import {
  ActionURLSource,
  IImageDTO,
  ISlideshowSettings,
  LightboxImageAnimation,
  LightboxTextPosition,
  LightboxThumbnailsPosition,
} from 'data-structures';
import React, {ReactElement, useEffect, useMemo, useState} from 'react';
import {createPortal} from 'react-dom';
import {getLargestSrcItem, getSrcSet, ISrcSetItem} from 'utils/imageSrcSet';
import {Watermark} from 'utils/renderWatermark';
import Lightbox, {
  ControllerRef,
  SlideshowRef,
} from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/plugins/captions.css';
import Inline from 'yet-another-react-lightbox/plugins/inline';
import YARLSlideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';

import {useAppInfo} from 'contexts/AppInfoContext';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/plugins/counter.css';
import Download from 'yet-another-react-lightbox/plugins/download';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Share from 'yet-another-react-lightbox/plugins/share';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Video from 'yet-another-react-lightbox/plugins/video';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import './slideshow.css';

interface ISlideshowProps {
  onClick?: (index: number) => void;
}

const Slideshow = ({onClick}: ISlideshowProps): ReactElement => {
  const {slideshowSettings: settings, wrapperRef} = useSettings();
  const {images} = useData();
  const {
    width,
    height,
    isInfinite,
    padding,
    showCounter,
    canShare,
    canDownload,
    canZoom,
    canFullscreen,
    isSlideshowAllowed,
    autoplay,
    slideDuration,
    imageAnimation,
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
    isFullCoverImage,
    titleSource,
    descriptionSource,
    showCaption,
    captionSource,
    captionFontSize,
    captionFontColor,
    showButton,
    buttonText,
    buttonAlignment,
    buttonColor,
    buttonTextColor,
    buttonFontSize,
    buttonBorderSize,
    buttonBorderColor,
    buttonBorderRadius,
    buttonUrlSource,
    openInNewTab,
  } = settings as ISlideshowSettings;
  const wrapper = wrapperRef.current;
  const [innerWidth, setInnerWidth] = useState<number>(
    wrapper?.clientWidth || width
  );
  const [videoAutoplay, setVideoAutoplay] = useState<boolean>(false);
  const [index, setIndex] = useState(0);
  const [buttonContainerHeight, setButtonContainerHeight] = useState<number>(0);
  const [thumbnailContainer, setThumbnailContainer] =
    useState<HTMLElement | null>(null);
  const {galleryId} = useAppInfo();

  const slideshowRef = React.useRef<SlideshowRef>(null);
  const controllerRef = React.useRef<ControllerRef>(null);
  const slideshowRootRef = React.useRef<HTMLDivElement>(null);

  const showThumbnails: boolean =
    thumbnailsPosition !== LightboxThumbnailsPosition.END;
  const imagesCount = images?.length || 0;
  const areThumbnailArrowsShown: boolean =
    thumbnailsPosition !== LightboxThumbnailsPosition.NONE && imagesCount > 1;
  const areThumbnailsVertical: boolean = [
    LightboxThumbnailsPosition.START,
    LightboxThumbnailsPosition.END,
  ].includes(thumbnailsPosition);
  const minHeight: number = showThumbnails
    ? thumbnailHeight + thumbnailPadding * 2
    : height;
  const ratio: number = width / height;
  const containerWidth: number = Math.min(innerWidth, width);
  const containerHeight: number = Math.max(minHeight, containerWidth / ratio);
  const minFactor = 1.45;
  const maxFactor = 1.25;
  const paddingAroundText = 10;
  const titleMargin = 4;

  const plugins = useMemo<any[]>(() => {
    const newPlugins: any[] = [Inline, Video];
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
    if (canFullscreen) {
      newPlugins.push(Fullscreen as any);
    }
    if (isSlideshowAllowed || autoplay) {
      newPlugins.push(YARLSlideshow as any);
    }
    if (thumbnailsPosition !== LightboxThumbnailsPosition.NONE) {
      newPlugins.push(Thumbnails as any);
    }
    if (showTitle || showCaption || showDescription || showButton) {
      newPlugins.push(Captions as any);
    }

    return newPlugins;
  }, [
    showCounter,
    canShare,
    canDownload,
    canZoom,
    canFullscreen,
    isSlideshowAllowed,
    autoplay,
    thumbnailsPosition,
    textPosition,
    showTitle,
    showCaption,
    showDescription,
    showButton,
  ]);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(wrapper?.clientWidth || width);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [wrapper?.clientWidth]);

  useEffect(() => {
    if (autoplay) {
      slideshowRef.current?.play();
    } else {
      slideshowRef.current?.pause();
    }
  }, [autoplay]);

  useEffect(() => {
    if (!showButton) {
      setButtonContainerHeight(0);
      return;
    }

    const measureButtonContainerHeight = () => {
      const buttonContainer = slideshowRootRef.current?.querySelector(
        '.yarl__slide_captions_container .reacg-slideshow-texts__button'
      ) as HTMLElement | null;

      if (!buttonContainer) {
        return;
      }

      const rect = buttonContainer.getBoundingClientRect();
      const styles = window.getComputedStyle(buttonContainer);
      const marginTop = parseFloat(styles.marginTop || '0');
      const marginBottom = parseFloat(styles.marginBottom || '0');
      const nextHeight = Math.round(rect.height + marginTop + marginBottom);

      setButtonContainerHeight((prevHeight) =>
        prevHeight !== nextHeight ? nextHeight : prevHeight
      );
    };

    measureButtonContainerHeight();
    window.addEventListener('resize', measureButtonContainerHeight);

    const mutationObserver = new MutationObserver(measureButtonContainerHeight);
    if (slideshowRootRef.current) {
      mutationObserver.observe(slideshowRootRef.current, {
        childList: true,
        subtree: true,
      });
    }

    const resizeObserver = new ResizeObserver(measureButtonContainerHeight);
    const buttonContainer = slideshowRootRef.current?.querySelector(
      '.yarl__slide_captions_container .reacg-slideshow-texts__button'
    ) as HTMLElement | null;
    if (buttonContainer) {
      resizeObserver.observe(buttonContainer);
    }

    return () => {
      window.removeEventListener('resize', measureButtonContainerHeight);
      mutationObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [
    showButton,
    index,
    buttonText,
    buttonFontSize,
    buttonBorderSize,
    buttonBorderRadius,
  ]);

  const deepLink = () => {
    const url = new URL(window.location.href);

    return url.toString();
  };

  const slides = useMemo(() => {
    return images?.map((image: IImageDTO) => {
      const srcSet: ISrcSetItem[] = getSrcSet(image.sizes);
      const largestSrcItem: ISrcSetItem = getLargestSrcItem(image.sizes);

      return {
        description: (
          <>
            {((showTitle && image[titleSource]) ||
              (showCaption && image[captionSource])) && (
              <p
                className={'reacg-slideshow-texts__title'}
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
                    className={'reacg-slideshow__caption'}
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
                className={'reacg-slideshow-texts__description'}
                style={{
                  color: textColor,
                  fontFamily: textFontFamily,
                  fontSize: `clamp(${
                    descriptionFontSize / minFactor
                  }rem,${descriptionFontSize}vw ,${
                    descriptionFontSize * maxFactor
                  }rem)`,
                  textAlign: titleAlignment,
                  WebkitLineClamp: descriptionMaxRowsCount,
                  WebkitBoxOrient: 'vertical',
                  display: '-webkit-box',
                }}
              >
                {image[descriptionSource]}
              </p>
            )}
            {showButton && (
              <div className={'reacg-slideshow-texts__button'}>
                <ActionButton
                  url={image?.[buttonUrlSource as ActionURLSource] || ''}
                  openInNewTab={openInNewTab}
                  text={buttonText}
                  alignment={buttonAlignment}
                  backgroundColor={buttonColor}
                  textColor={buttonTextColor}
                  borderSize={buttonBorderSize}
                  borderColor={buttonBorderColor}
                  borderRadius={buttonBorderRadius}
                  style={{
                    fontSize: `clamp(${
                      buttonFontSize / minFactor
                    }rem, ${buttonFontSize}vw, ${
                      buttonFontSize * maxFactor
                    }rem)`,
                  }}
                />
              </div>
            )}
          </>
        ),
        type: image.type,
        sources: [
          {
            src: image.original.url,
            type: ``,
          },
        ],
        poster: largestSrcItem.src,
        src: largestSrcItem.src,
        share: {
          url: deepLink(),
          title: image.title,
          text: image.description,
        },
        alt: image.alt,
        srcSet: srcSet,
        download: {url: image.original.url, filename: image.title},
      };
    });
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
    showButton,
    buttonText,
    buttonAlignment,
    buttonColor,
    buttonTextColor,
    buttonFontSize,
    buttonBorderSize,
    buttonBorderColor,
    buttonBorderRadius,
    buttonUrlSource,
    openInNewTab,
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
      showButton,
      titleSource,
      captionSource,
      descriptionSource,
      buttonBorderSize,
      buttonContainerHeight,
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
    showButton,
    captionSource,
    captionFontSize,
    captionFontColor,
    titleSource,
    descriptionSource,
    buttonBorderSize,
    buttonContainerHeight,
  ]);

  useEffect(() => {
    setIndex(0);
  }, [isInfinite]);

  useEffect(() => {
    if (!areThumbnailArrowsShown) {
      setThumbnailContainer(null);
      return;
    }

    let animationFrameId: number | null = null;

    const updateThumbnailContainer = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        setThumbnailContainer(
          slideshowRootRef.current?.querySelector(
            '.yarl__thumbnails_container'
          ) as HTMLElement | null
        );
        animationFrameId = null;
      });
    };

    updateThumbnailContainer();

    const observer = new MutationObserver(updateThumbnailContainer);
    if (slideshowRootRef.current) {
      observer.observe(slideshowRootRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      observer.disconnect();
    };
  }, [areThumbnailArrowsShown, thumbnailsPosition]);

  const handleThumbnailNavigate = (direction: -1 | 1) => {
    if (direction === -1) {
      controllerRef.current?.prev();
    } else {
      controllerRef.current?.next();
    }
  };

  const thumbnailArrows = areThumbnailArrowsShown ? (
    <div
      className={clsx(
        'reacg-slideshow-thumbnail-arrows',
        `reacg-slideshow-thumbnail-arrows_${thumbnailsPosition}`,
        {
          'reacg-slideshow-thumbnail-arrows_vertical': areThumbnailsVertical,
        }
      )}
    >
      <button
        type="button"
        className={clsx(
          'reacg-slideshow-thumbnail-arrow',
          'reacg-slideshow-thumbnail-arrow_prev'
        )}
        aria-label="Previous thumbnail"
        disabled={!isInfinite && index === 0}
        onClick={(event) => {
          event.stopPropagation();
          handleThumbnailNavigate(-1);
        }}
      />
      <button
        type="button"
        className={clsx(
          'reacg-slideshow-thumbnail-arrow',
          'reacg-slideshow-thumbnail-arrow_next'
        )}
        aria-label="Next thumbnail"
        disabled={!isInfinite && index === imagesCount - 1}
        onClick={(event) => {
          event.stopPropagation();
          handleThumbnailNavigate(1);
        }}
      />
    </div>
  ) : null;

  const WatermarkOverlay: React.FC<{
    rootRef: React.RefObject<HTMLDivElement>;
  }> = ({rootRef}) => {
    const [rect, setRect] = useState<{
      width: number;
      height: number;
      left: number;
      top: number;
    } | null>(null);
    useEffect(() => {
      function updateRect() {
        if (!rootRef.current) return;
        // Query only inside this slideshow instance
        const media = rootRef.current.querySelector(
          '.yarl__slide_current img, .yarl__slide_current video'
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
      if (rootRef.current)
        observer.observe(rootRef.current, {childList: true, subtree: true});
      return () => {
        window.removeEventListener('resize', updateRect);
        observer.disconnect();
      };
    }, [rootRef]);
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

  return (
    <Box
      ref={slideshowRootRef}
      sx={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        mx: 'auto',
      }}
    >
      <Lightbox
        index={index}
        plugins={plugins}
        slideshow={{
          autoplay,
          delay: slideDuration > 700 ? slideDuration : 700,
          ref: slideshowRef,
        }}
        slides={slides}
        counter={{
          container: {
            style: {
              marginTop: slideMargins.marginTop,
              marginBottom: slideMargins.marginBottom,
              top: textPosition === LightboxTextPosition.TOP ? 'unset' : 0,
              bottom: textPosition === LightboxTextPosition.TOP ? 0 : 'unset',
            },
          },
        }}
        animation={{
          swipe: imageAnimation === LightboxImageAnimation.SLIDEH ? 500 : 1,
          easing: {swipe: 'ease-out', navigation: 'ease-in-out'},
        }}
        render={{
          buttonSlideshow: isSlideshowAllowed ? undefined : () => null,
          slideFooter: () => <WatermarkOverlay rootRef={slideshowRootRef} />,
        }}
        carousel={{
          spacing: 0,
          preload: 5,
          finite: !isInfinite,
          padding,
        }}
        controller={{
          ref: controllerRef,
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
          'reacg-slideshow',
          'reacg-slideshow-animation-' + imageAnimation,
          {
            'reacg-slideshow-control-buttons_play-button-centered': !(
              canShare ||
              canDownload ||
              canZoom ||
              canFullscreen
            ),
            'reacg-slideshow-texts':
              showTitle || showCaption || showDescription || showButton,
            'reacg-slideshow-texts_top': [
              LightboxTextPosition.TOP,
              LightboxTextPosition.ABOVE,
            ].includes(textPosition),
            'reacg-slideshow-is-full-cover-image': isFullCoverImage,
            'reacg-invert-captions': invertTextColor,
            'reacg-slideshow-gallery__text-background-top-gradient':
              textBackground === '' &&
              textPosition === LightboxTextPosition.TOP,
            'reacg-slideshow-gallery__text-background-bottom-gradient':
              textBackground === '' &&
              textPosition === LightboxTextPosition.BOTTOM,
          }
        )}
        styles={{
          root: {
            'margin': 'auto',
            '--yarl__thumbnails_container_padding': `${thumbnailPadding}px`,
            '--yarl__thumbnails_container_background_color': `${backgroundColor}`,
            '--yarl__slide_captions_container_padding': `${paddingAroundText}px`,
            '--yarl__slide_captions_container_background':
              textBackground &&
              ((showTitle && images?.[index]?.title) ||
                (showCaption && images?.[index]?.caption) ||
                (showDescription && images?.[index]?.description) ||
                showButton)
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
            top: textPosition === LightboxTextPosition.TOP ? 'unset' : 0,
            bottom: textPosition === LightboxTextPosition.TOP ? 0 : 'unset',
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

          container: {
            backgroundColor: `${backgroundColor}`,
          },
          slide: {
            cursor: onClick ? 'pointer' : undefined,
            marginTop: slideMargins.marginTop,
            marginBottom: slideMargins.marginBottom,
          },
        }}
        on={{
          slideshowStart: () => {
            if (!videoAutoplay) setVideoAutoplay(true);
          },
          slideshowStop: () => {
            if (videoAutoplay) setVideoAutoplay(false);
          },
          view: ({index: currentIndex}) => setIndex(currentIndex),
          click: ({index: currentIndex}) => onClick?.(currentIndex),
        }}
      />
      {thumbnailContainer &&
        thumbnailArrows &&
        createPortal(thumbnailArrows, thumbnailContainer)}
    </Box>
  );
};

export {Slideshow};
export default Slideshow;
