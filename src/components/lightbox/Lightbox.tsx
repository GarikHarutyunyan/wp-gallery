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
    captionsPosition,
    captionFontFamily,
    captionColor,
  } = settings as ILightboxSettings;
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [videoAutoplay, setVideoAutoplay] = useState<boolean>(false);
  const lightboxId: string = useId();

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
    if (captionsPosition !== LightboxCaptionsPosition.NONE) {
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
    captionsPosition,
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
          <p
            className={'reacg-lightbox-captions__title'}
            style={{color: captionColor, fontFamily: captionFontFamily}}
          >
            {image.title}
          </p>
          <p
            className={'reacg-lightbox-captions__description'}
            style={{color: captionColor, fontFamily: captionFontFamily}}
          >
            {image.description}
          </p>
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
  }, [images, captionColor, captionFontFamily]);

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
              captionsPosition !== LightboxCaptionsPosition.NONE,
            'reacg-lightbox-captions_top': [
              LightboxCaptionsPosition.TOP,
              LightboxCaptionsPosition.ABOVE,
            ].includes(captionsPosition),
            'reacg-lightbox-captions_below':
              captionsPosition === LightboxCaptionsPosition.BELOW,
            'reacg-lightbox-captions_above':
              captionsPosition === LightboxCaptionsPosition.ABOVE,
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
            '--yarl__slide_captions_container_background': `${backgroundColor}80`,
          },
          thumbnail: {
            '--yarl__thumbnails_thumbnail_active_border_color':
              thumbnailBorderColor || 'transparent',
            '--yarl__thumbnails_thumbnail_border_color':
              thumbnailBorderColor || 'transparent',
            '--yarl__thumbnails_thumbnail_border_radius': `${thumbnailBorderRadius}%`,
          },
          container: {backgroundColor: `${backgroundColor}`},
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
