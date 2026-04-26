import {
  IGeneralSettings,
  ILightboxSettings,
  IThumbnailSettings,
} from 'data-structures';
import {ReactElement} from 'react';
import {Gallery} from './Gallery';
import {DataProvider} from './data-context/DataContext';
import {useSettings} from './settings';

const GalleryWithSettings = (): ReactElement | null => {
  const {
    generalSettings,
    thumbnailSettings,
    lightboxSettings,
  }: {
    thumbnailSettings?: IThumbnailSettings;
    generalSettings?: IGeneralSettings;
    lightboxSettings?: ILightboxSettings;
  } = useSettings();

  return generalSettings && thumbnailSettings && lightboxSettings ? (
    <DataProvider>
      <Gallery />
    </DataProvider>
  ) : null;
};

export {GalleryWithSettings};
