import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import {CardsSettings} from 'components/cards-settings/CardsSettings';
import {CarouselSettings} from 'components/carousel-settings';
import {CubeSettings} from 'components/cube-settings/CubeSettings';
import {GeneralSettings} from 'components/general-settings';
import {LightboxSettings} from 'components/light-box-settings';
import {MasonrySettings} from 'components/masonry-settings';
import {MosaicSettings} from 'components/mosaic-settings';
import {SlideshowSettings} from 'components/slideshow-settings';
import {ThumbnailSettings} from 'components/thumbnail-settings';
import {GalleryType, ImageClickAction} from 'data-structures';
import React, {ReactNode, useEffect, useState} from 'react';
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
    cubeSettings,
    carouselSettings,
    cardsSettings,
    generalSettings,
  } = useSettings();
  const clickAction = generalSettings?.clickAction;
  const [activeTab, setActiveTab] = useState<string>('gallery');
  const showLightbox: boolean = clickAction === ImageClickAction.LIGHTBOX;
  const hideLightboxOptions: boolean = !showLightbox;

  const onActiveTabChange = (_: any, newActiveTab: string) => {
    setActiveTab(newActiveTab);
  };

  useEffect(() => {
    if (hideLightboxOptions) {
      onActiveTabChange(null, 'gallery');
    }
  }, [hideLightboxOptions]);

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
      case GalleryType.CUBE:
        galleryOprions = renderCubeSettings();
        break;
      case GalleryType.CAROUSEL:
        galleryOprions = renderCarouselSettings();
        break;
      case GalleryType.CARDS:
        galleryOprions = renderCardsSettings();
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

  const renderCubeSettings = (): ReactNode => {
    return cubeSettings && <CubeSettings isLoading={isLoading} />;
  };

  const renderCarouselSettings = (): ReactNode => {
    return carouselSettings && <CarouselSettings isLoading={isLoading} />;
  };
  const renderCardsSettings = (): ReactNode => {
    return cardsSettings && <CardsSettings isLoading={isLoading} />;
  };

  return (
    <TabContext value={activeTab}>
      <SettingsPanelTabs
        activeTab={activeTab}
        onActiveTabChange={onActiveTabChange}
        onSave={onSave}
        onReset={onReset}
        hideLightboxOptions={hideLightboxOptions}
      />
      <TabPanel value={'gallery'} className={'reacg-tab-panel'}>
        {renderGalleryOptions()}
      </TabPanel>
      <TabPanel value={'general'} className={'reacg-tab-panel'}>
        <GeneralSettings isLoading={isLoading} />
      </TabPanel>
      {!hideLightboxOptions ? (
        <TabPanel value={'lightbox'} className={'reacg-tab-panel'}>
          <LightboxSettings isLoading={isLoading} />
        </TabPanel>
      ) : null}
    </TabContext>
  );
};

export {OptionsPanelBody};
