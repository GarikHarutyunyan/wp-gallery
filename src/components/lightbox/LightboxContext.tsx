import React, {Dispatch, useState} from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
// import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import {IImageDTO} from 'data-structures';

interface ILightboxData {
  setActiveImageIndex: Dispatch<React.SetStateAction<number>>;
}

const LightboxContext = React.createContext<ILightboxData | null>(null);

interface ILightboxProviderProps {
  images: IImageDTO[];
}

const LightboxProvider: React.FC<
  React.PropsWithChildren & ILightboxProviderProps
> = ({images, children}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(-1);

  return (
    <LightboxContext.Provider value={{setActiveImageIndex}}>
      <Lightbox
        plugins={[Fullscreen, Slideshow, Zoom]}
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
        // render={{
        //   thumbnail: ({slide}) => {
        //     return <img src={(slide as any).metadata}></img>;
        //   },
        // }}
        carousel={{
          preload: 20,
        }}
      />
      {children}
    </LightboxContext.Provider>
  );
};

export {LightboxContext, LightboxProvider};
