import {IGeneralSettings} from 'components/general-settings';
import {ILightboxSettings} from 'components/light-box-settings';
import {IThumbnailSettings} from 'components/thumbnail-settings/ThumbnailSettings';
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
