import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { BlogSettings } from 'components/blog-settings';
import { CardsSettings } from 'components/cards-settings/CardsSettings';
import { CarouselSettings } from 'components/carousel-settings';
import { CubeSettings } from 'components/cube-settings/CubeSettings';
import { GeneralSettings } from 'components/general-settings';
import { JustifiedSettings } from 'components/justified-settings';
import { LightboxSettings } from 'components/light-box-settings';
import { MasonrySettings } from 'components/masonry-settings';
import { MosaicSettings } from 'components/mosaic-settings';
import { SliderSettings } from 'components/slider-settings';
import { SlideshowSettings } from 'components/slideshow-settings';
import { ThumbnailSettings } from 'components/thumbnail-settings';
import { GalleryType, ImageClickAction } from 'data-structures';
import React, { ReactNode, useState } from 'react';
import { SettingsPanelTabs } from './SettingsPanelTabs';
import { useSettings } from './useSettings';

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
    justifiedSettings,
    masonrySettings,
    slideshowSettings,
    cubeSettings,
    carouselSettings,
    cardsSettings,
    generalSettings,
    blogSettings,
    sliderSettings,
  } = useSettings();
  const clickAction = generalSettings?.clickAction;
  const [activeTab, setActiveTab] = useState<string>('gallery');
  const showLightbox: boolean = clickAction === ImageClickAction.LIGHTBOX;
  const hideLightboxOptions: boolean = !showLightbox;

  const onActiveTabChange = (_: any, newActiveTab: string) => {
    if (hideLightboxOptions && newActiveTab === 'lightbox') {
      return;
    }
    setActiveTab(newActiveTab);
  };

  const renderGalleryOptions = (): ReactNode => {
    let galleryOprions = renderThumbnailSettings();
    switch (type) {
      case GalleryType.MOSAIC:
        galleryOprions = renderMosaicSettings();
        break;
      case GalleryType.JUSTIFIED:
        galleryOprions = renderJustifiedSettings();
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
      case GalleryType.BLOG:
        galleryOprions = renderBlogSettings();
        break;
      case GalleryType.SLIDER:
        galleryOprions = renderSliderSettings();
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
  const renderJustifiedSettings = (): ReactNode => {
    return justifiedSettings && <JustifiedSettings isLoading={isLoading} />;
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
  const renderBlogSettings = (): ReactNode => {
    return blogSettings && <BlogSettings isLoading={isLoading} />;
  };
  const renderSliderSettings = (): ReactNode => {
    return sliderSettings && <SliderSettings isLoading={isLoading} />;
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

export { OptionsPanelBody };

