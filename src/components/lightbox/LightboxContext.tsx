import React, {Dispatch, useState} from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
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
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        open={activeImageIndex >= 0}
        index={activeImageIndex}
        close={() => setActiveImageIndex(-1)}
        slides={images.map((image) => ({src: image.uri}))}
        carousel={{
          preload: 20,
        }}
      />
      {children}
    </LightboxContext.Provider>
  );
};

export {LightboxContext, LightboxProvider};
