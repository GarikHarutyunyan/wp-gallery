import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import {GeneralSettings} from 'components/general-settings';
import {LightboxSettings} from 'components/light-box-settings';
import {MasonrySettings} from 'components/masonry-settings';
import {MosaicSettings} from 'components/mosaic-settings';
import {SlideshowSettings} from 'components/slideshow-settings';
import {ThumbnailSettings} from 'components/thumbnail-settings';
import {GalleryType} from 'data-structures';
import React, {ReactNode, useState} from 'react';
import {SettingsPanelTabs} from './SettingsPanelTabs';
import {useSettings} from './useSettings';

interface IOptionsPanelBodyProps {
  isLoading: boolean;
  onSave: () => Promise<void>;
  onReset: () => Promise<void>;
}

const OptionsPanelBody: React.FC<IOptionsPanelBodyProps> = ({
  isLoading,
  onSave,
  onReset,
}) => {
  const {
    type,
    thumbnailSettings,
    mosaicSettings,
    masonrySettings,
    slideshowSettings,
    generalSettings,
    lightboxSettings,
  } = useSettings();
  const [activeTab, setActiveTab] = useState<string>('gallery');
  const showGeneralSettings: boolean = type !== GalleryType.SLIDESHOW;

  const onActiveTabChange = (_: any, newActiveTab: string) => {
    setActiveTab(newActiveTab);
  };

  const renderGalleryOptions = (): ReactNode => {
    let galleryOprions = renderThumbnailSettings();
    switch (type) {
      case GalleryType.MOSAIC:
        galleryOprions = renderMosaicSettings();
        break;
      case GalleryType.MASONRY:
        galleryOprions = renderMasonrySettings();
        break;
      case GalleryType.SLIDESHOW:
        galleryOprions = renderSlideshowSettings();
        break;
    }
    return galleryOprions;
  };

  const renderThumbnailSettings = (): ReactNode => {
    return thumbnailSettings && <ThumbnailSettings isLoading={isLoading} />;
  };

  const renderMosaicSettings = (): ReactNode => {
    return mosaicSettings && <MosaicSettings isLoading={isLoading} />;
  };

  const renderMasonrySettings = (): ReactNode => {
    return masonrySettings && <MasonrySettings isLoading={isLoading} />;
  };

  const renderSlideshowSettings = (): ReactNode => {
    return slideshowSettings && <SlideshowSettings isLoading={isLoading} />;
  };

  return (
    <TabContext value={activeTab}>
      <SettingsPanelTabs
        activeTab={activeTab}
        onActiveTabChange={onActiveTabChange}
        onSave={onSave}
        onReset={onReset}
      />
      <TabPanel value={'gallery'} className={'reacg-tab-panel'}>
        {renderGalleryOptions()}
      </TabPanel>
      {showGeneralSettings ? (
        <TabPanel value={'general'} className={'reacg-tab-panel'}>
          {generalSettings && <GeneralSettings isLoading={isLoading} />}
        </TabPanel>
      ) : null}
      <TabPanel value={'lightbox'} className={'reacg-tab-panel'}>
        {lightboxSettings && <LightboxSettings isLoading={isLoading} />}
      </TabPanel>
    </TabContext>
  );
};

export {OptionsPanelBody};
