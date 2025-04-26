import clsx from 'clsx';
import {
  IImageDTO,
  ILightboxSettings,
  LightboxCaptionsPosition,
  LightboxImageAnimation,
  LightboxThumbnailsPosition,
} from 'data-structures';
import React, {useEffect, useId, useMemo, useState} from 'react';
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
}

const LightboxBackground: React.FC<ILightboxBackgroundProps> = ({
  id,
  isVisible,
  onClick,
}) => {
  const element = document.getElementById('wpwrap') || document.body;

  return createPortal(
    <div
      onClick={onClick}
      className={'react-lightbox__background'}
      style={{display: isVisible ? 'block' : 'none'}}
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
  } = settings as ILightboxSettings;
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [videoAutoplay, setVideoAutoplay] = useState<boolean>(false);
  const lightboxId: string = useId();
  const [index, setIndex] = useState(0);

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
    if (textPosition !== LightboxCaptionsPosition.NONE) {
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

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slides = useMemo(() => {
    return images!.map((image: IImageDTO) => ({
      description: (
        <>
          {showTitle && image.title && (
            <p
              className={'reacg-lightbox-captions__title'}
              style={{
                color: textColor,
                fontFamily: textFontFamily,
                fontSize: `${titleFontSize * (innerWidth / 100)}px`,
                textAlign: titleAlignment,
              }}
            >
              {image.title}
            </p>
          )}
          {showDescription && image.description && (
            <p
              className={'reacg-lightbox-captions__description'}
              style={{
                color: textColor,
                fontFamily: textFontFamily,
                fontSize: `${descriptionFontSize * (innerWidth / 100)}px`,
                WebkitLineClamp: descriptionMaxRowsCount,
                WebkitBoxOrient: 'vertical',
                display: '-webkit-box',
              }}
            >
              {image.description}
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
    innerWidth,
  ]);

  const slideMargins = useMemo(() => {
    const hasCaptions = showTitle || showDescription;
    const titleSpace =
      showTitle && images![index].title
        ? titleFontSize * (innerWidth / 100) * 1.5 + 8
        : 0;
    const descriptionSpace =
      showDescription && images![index].description
        ? descriptionFontSize *
          (innerWidth / 100) *
          1.5 *
          (descriptionMaxRowsCount || 1)
        : 0;
    const parentPadding = 20;

    return {
      marginTop:
        textPosition === LightboxCaptionsPosition.ABOVE && hasCaptions
          ? titleSpace + descriptionSpace + parentPadding
          : 0,
      marginBottom:
        textPosition === LightboxCaptionsPosition.BELOW && hasCaptions
          ? titleSpace + descriptionSpace + parentPadding
          : 0,
    };
  }, [
    textPosition,
    showTitle,
    showDescription,
    titleFontSize,
    descriptionFontSize,
    descriptionMaxRowsCount,
    index,
    padding,
    innerWidth,
  ]);

  const renderLighbox = () => {
    return (
      <Lightbox
        plugins={plugins}
        open={activeIndex >= 0}
        index={activeIndex}
        close={onClose}
        slideshow={{autoplay, delay: slideDuration > 700 ? slideDuration : 700}}
        slides={slides}
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
            'reacg-lightbox-captions':
              textPosition !== LightboxCaptionsPosition.NONE,
            'reacg-lightbox-captions_top': [
              LightboxCaptionsPosition.TOP,
              LightboxCaptionsPosition.ABOVE,
            ].includes(textPosition),
            'reacg-lightbox-captions_below':
              textPosition === LightboxCaptionsPosition.BELOW,
            'reacg-lightbox-captions_above':
              textPosition === LightboxCaptionsPosition.ABOVE,
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
            '--yarl__slide_captions_container_background':
              showTitle || showDescription ? `${backgroundColor}80` : `none`,
          },
          thumbnail: {
            '--yarl__thumbnails_thumbnail_active_border_color':
              thumbnailBorderColor || 'transparent',
            '--yarl__thumbnails_thumbnail_border_color':
              thumbnailBorderColor || 'transparent',
            '--yarl__thumbnails_thumbnail_border_radius': `${thumbnailBorderRadius}%`,
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
        }}
      />
    );
  };

  return (
    <>
      {renderLighbox()}
      <LightboxBackground
        isVisible={activeIndex >= 0}
        onClick={onClose}
        id={lightboxId}
      />
    </>
  );
};

export {VLightbox};
export default VLightbox;
