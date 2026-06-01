import {
  IGeneralSettings,
  IGridSettings,
  ILightboxSettings,
} from 'data-structures';
import {ReactElement} from 'react';
import {Gallery} from './Gallery';
import {DataProvider} from './data-context/DataContext';
import {useSettings} from './settings';

const GalleryWithSettings = (): ReactElement | null => {
  const {
    generalSettings,
    gridSettings,
    lightboxSettings,
  }: {
    gridSettings?: IGridSettings;
    generalSettings?: IGeneralSettings;
    lightboxSettings?: ILightboxSettings;
  } = useSettings();

  return generalSettings && gridSettings && lightboxSettings ? (
    <DataProvider>
      <Gallery />
    </DataProvider>
  ) : null;
};

export {GalleryWithSettings};
