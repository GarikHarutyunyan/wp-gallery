import React, {useEffect, useState} from 'react';
import Lightbox, {SlideshowRef} from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import {
  IImageDTO,
  LightboxCaptionsPosition,
  LightboxThumbnailsPosition,
} from 'data-structures';
import {ILightboxSettings} from 'components/light-box-settings';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Download from 'yet-another-react-lightbox/plugins/download';
import clsx from 'clsx';
import {Captions} from './CustomCaptions/Captions';
import 'yet-another-react-lightbox/plugins/captions.css';
import './lightbox.css';
import {createPortal} from 'react-dom';

interface ILightboxProviderProps {
  activeIndex: number;
  onClose: () => void;
  images: IImageDTO[];
  settings: ILightboxSettings;
}

interface ILightboxBackgroundProps {
  isVisible: boolean;
  onClick: () => void;
}

const LightboxBackground: React.FC<ILightboxBackgroundProps> = ({
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
        id={'reacg-lightbox__background-helper'}
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>,
    element
  );
};

const VLightbox: React.FC<React.PropsWithChildren & ILightboxProviderProps> = ({
  activeIndex,
  onClose,
  images,
  settings,
}) => {
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
    isFullscreenAllowed,
    thumbnailsPosition,
    thumbnailWidth,
    thumbnailHeight,
    thumbnailBorder,
    thumbnailBorderRadius,
    thumbnailBorderColor,
    thumbnailPadding,
    thumbnailGap,
    captionsPosition,
    captionFontFamily,
    captionColor,
  } = settings;

  const plugins: any[] = [];

  if (canDownload) {
    plugins.push(Download as any);
  }
  if (canZoom) {
    plugins.push(Zoom as any);
  }
  if (isSlideshowAllowed || autoplay) {
    plugins.push(Slideshow as any);
  }
  if (isFullscreenAllowed) {
    plugins.push(Fullscreen as any);
  }
  if (thumbnailsPosition !== LightboxThumbnailsPosition.NONE) {
    plugins.push(Thumbnails as any);
  }
  if (captionsPosition !== LightboxCaptionsPosition.NONE) {
    plugins.push(Captions as any);
  }

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderLighbox = () => {
    return (
      <Lightbox
        plugins={plugins}
        open={activeIndex >= 0}
        index={activeIndex}
        close={onClose}
        // @ts-ignore
        captions={{showToggle: true}}
        slideshow={{autoplay, delay: slideDuration > 700 ? slideDuration : 700}}
        slides={images.map((image: IImageDTO) => ({
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
          src: image.original.url,
          srcSet: [
            {
              src: image.original.url,
              width: image.original.width,
              height: image.original.height,
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
        }))}
        render={{
          // thumbnail: ({slide}) => {
          //   return <img src={(slide as any).metadata}></img>;
          // },
          buttonSlideshow: isSlideshowAllowed ? undefined : () => null,
        }}
        carousel={{
          preload: 5,
          finite: !isInfinite,
          padding,
        }}
        thumbnails={{
          position: thumbnailsPosition as any,
          width: thumbnailWidth,
          height: thumbnailHeight,
          border: thumbnailBorder,
          borderColor: thumbnailBorderColor,
          borderRadius: thumbnailBorderRadius,
          padding: thumbnailPadding,
          gap: thumbnailGap,
          // imageFit: 'contain',
        }}
        className={clsx('reacg-lightbox', {
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
        })}
        styles={{
          root: {
            width: isFullscreen ? '100%' : `${Math.min(innerWidth, width)}px`,
            height: isFullscreen
              ? '100%'
              : `${Math.min(innerHeight, height)}px`,
            margin: 'auto',
          },
        }}
        portal={{
          root: document.getElementById('reacg-lightbox__background-helper'),
        }}
      />
    );
  };

  return (
    <>
      {renderLighbox()}
      <LightboxBackground isVisible={activeIndex >= 0} onClick={onClose} />
    </>
  );
};

export {VLightbox};
