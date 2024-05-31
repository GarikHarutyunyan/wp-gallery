import {
  IGeneralSettings,
  ILightboxSettings,
  IThumbnailSettings,
} from 'data-structures';
import {Gallery} from './Gallery';
import {DataProvider} from './data-context/DataContext';
import {useSettings} from './settings';

const GalleryWithSettings = () => {
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
