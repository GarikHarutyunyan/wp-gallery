import React, {Dispatch, useState} from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import {IImageDTO, LightboxThumbnailsPosition} from 'data-structures';
import {ILightboxSettings} from 'components/light-box-settings';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Download from 'yet-another-react-lightbox/plugins/download';

interface ILightboxData {
  setActiveImageIndex: Dispatch<React.SetStateAction<number>>;
}

const LightboxContext = React.createContext<ILightboxData | null>(null);

interface ILightboxProviderProps {
  images: IImageDTO[];
  settings: ILightboxSettings;
}

const LightboxProvider: React.FC<
  React.PropsWithChildren & ILightboxProviderProps
> = ({images, settings, children}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(-1);
  const {
    areControlButtonsShown,
    isInfinite,
    padding,
    canDownload,
    canZoom,
    isSlideshowAllowed,
    isFullscreenAllowed,
    thumbnailsPosition,
    thumbnailWidth,
    thumbnailHeight,
    thumbnailBorder,
    thumbnailBorderRadius,
    thumbnailBorderColor,
    thumbnailPadding,
    thumbnailGap,
    isThumbnailsToggleShown,
  } = settings;

  const plugins = [];

  if (canDownload) {
    plugins.push(Download as any);
  }
  if (canZoom) {
    plugins.push(Zoom as any);
  }
  if (isSlideshowAllowed) {
    plugins.push(Slideshow as any);
  }
  if (isFullscreenAllowed) {
    plugins.push(Fullscreen as any);
  }
  if (thumbnailsPosition !== LightboxThumbnailsPosition.NONE) {
    plugins.push(Thumbnails as any);
  }

  return (
    <LightboxContext.Provider value={{setActiveImageIndex}}>
      <Lightbox
        plugins={plugins}
        open={activeImageIndex >= 0}
        index={activeImageIndex}
        close={() => setActiveImageIndex(-1)}
        slides={images.map((image) => ({
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
          buttonPrev: areControlButtonsShown ? undefined : () => null,
          buttonNext: areControlButtonsShown ? undefined : () => null,
        }}
        carousel={{
          preload: 20,
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
          showToggle: isThumbnailsToggleShown,
        }}
      />
      {children}
    </LightboxContext.Provider>
  );
};

export {LightboxContext, LightboxProvider};
