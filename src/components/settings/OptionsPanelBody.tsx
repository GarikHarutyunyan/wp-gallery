import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import {BlogSettings} from 'components/blog-settings';
import {CardsSettings} from 'components/cards-settings/CardsSettings';
import {CarouselSettings} from 'components/carousel-settings';
import {CoverflowSettings} from 'components/coverflow-settings/CoverflowSettings';
import {CubeSettings} from 'components/cube-settings/CubeSettings';
import {GeneralSettings} from 'components/general-settings';
import {JustifiedSettings} from 'components/justified-settings';
import {LightboxSettings} from 'components/light-box-settings';
import {MasonrySettings} from 'components/masonry-settings';
import {MosaicSettings} from 'components/mosaic-settings';
import {SlideshowSettings} from 'components/slideshow-settings';
import {ThumbnailSettings} from 'components/thumbnail-settings';
import {GalleryType, ImageClickAction} from 'data-structures';
import React, {ReactNode, useState} from 'react';
import {SettingsPanelTabs} from './SettingsPanelTabs';
import {TextAndMetadataSettings} from './TextAndMetadataSettings';
import {useSettings} from './useSettings';

interface IOptionsPanelBodyProps {
  isLoading: boolean;
  isSmall: boolean;
  onSave: () => Promise<void>;
  onReset: () => Promise<void>;
}

type LayoutSections = 'all' | 'basic' | 'advanced';

const OptionsPanelBody: React.FC<IOptionsPanelBodyProps> = ({
  isLoading,
  isSmall,
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
    coverflowSettings,
    cardsSettings,
    generalSettings,
    blogSettings,
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
    let galleryOprions = renderThumbnailSettings('basic');
    switch (type) {
      case GalleryType.MOSAIC:
        galleryOprions = renderMosaicSettings('basic');
        break;
      case GalleryType.JUSTIFIED:
        galleryOprions = renderJustifiedSettings('basic');
        break;
      case GalleryType.MASONRY:
        galleryOprions = renderMasonrySettings('basic');
        break;
      case GalleryType.SLIDESHOW:
        galleryOprions = renderSlideshowSettings('basic');
        break;
      case GalleryType.CUBE:
        galleryOprions = renderCubeSettings('basic');
        break;
      case GalleryType.CAROUSEL:
        galleryOprions = renderCarouselSettings('basic');
        break;
      case GalleryType.CARDS:
        galleryOprions = renderCardsSettings('basic');
        break;
      case GalleryType.BLOG:
        galleryOprions = renderBlogSettings('basic');
        break;
      case GalleryType.COVERFLOW:
        galleryOprions = renderCoverflowSettings('basic');
        break;
    }
    return galleryOprions;
  };

  const renderAppearanceOptions = (): ReactNode => {
    let appearanceOptions = renderThumbnailSettings('advanced');
    switch (type) {
      case GalleryType.MOSAIC:
        appearanceOptions = renderMosaicSettings('advanced');
        break;
      case GalleryType.JUSTIFIED:
        appearanceOptions = renderJustifiedSettings('advanced');
        break;
      case GalleryType.MASONRY:
        appearanceOptions = renderMasonrySettings('advanced');
        break;
      case GalleryType.SLIDESHOW:
        appearanceOptions = renderSlideshowSettings('advanced');
        break;
      case GalleryType.CUBE:
        appearanceOptions = renderCubeSettings('advanced');
        break;
      case GalleryType.CAROUSEL:
        appearanceOptions = renderCarouselSettings('advanced');
        break;
      case GalleryType.CARDS:
        appearanceOptions = renderCardsSettings('advanced');
        break;
      case GalleryType.BLOG:
        appearanceOptions = renderBlogSettings('advanced');
        break;
      case GalleryType.COVERFLOW:
        appearanceOptions = renderCoverflowSettings('advanced');
        break;
    }
    return appearanceOptions;
  };

  const renderThumbnailSettings = (
    sections: LayoutSections = 'all'
  ): ReactNode => {
    return (
      thumbnailSettings && (
        <ThumbnailSettings isLoading={isLoading} sections={sections} />
      )
    );
  };

  const renderMosaicSettings = (
    sections: LayoutSections = 'all'
  ): ReactNode => {
    return (
      mosaicSettings && (
        <MosaicSettings isLoading={isLoading} sections={sections} />
      )
    );
  };
  const renderJustifiedSettings = (
    sections: LayoutSections = 'all'
  ): ReactNode => {
    return (
      justifiedSettings && (
        <JustifiedSettings isLoading={isLoading} sections={sections} />
      )
    );
  };

  const renderMasonrySettings = (
    sections: LayoutSections = 'all'
  ): ReactNode => {
    return (
      masonrySettings && (
        <MasonrySettings isLoading={isLoading} sections={sections} />
      )
    );
  };

  const renderSlideshowSettings = (
    sections: LayoutSections = 'all'
  ): ReactNode => {
    return (
      slideshowSettings && (
        <SlideshowSettings isLoading={isLoading} sections={sections} />
      )
    );
  };

  const renderCubeSettings = (sections: LayoutSections = 'all'): ReactNode => {
    return (
      cubeSettings && <CubeSettings isLoading={isLoading} sections={sections} />
    );
  };

  const renderCarouselSettings = (
    sections: LayoutSections = 'all'
  ): ReactNode => {
    return (
      carouselSettings && (
        <CarouselSettings isLoading={isLoading} sections={sections} />
      )
    );
  };

  const renderCoverflowSettings = (
    sections: LayoutSections = 'all'
  ): ReactNode => {
    return (
      coverflowSettings && (
        <CoverflowSettings isLoading={isLoading} sections={sections} />
      )
    );
  };

  const renderCardsSettings = (sections: LayoutSections = 'all'): ReactNode => {
    return (
      cardsSettings && (
        <CardsSettings isLoading={isLoading} sections={sections} />
      )
    );
  };
  const renderBlogSettings = (sections: LayoutSections = 'all'): ReactNode => {
    return (
      blogSettings && <BlogSettings isLoading={isLoading} sections={sections} />
    );
  };

  return (
    <TabContext value={activeTab}>
      <SettingsPanelTabs
        activeTab={activeTab}
        onActiveTabChange={onActiveTabChange}
        onSave={onSave}
        onReset={onReset}
        hideLightboxOptions={hideLightboxOptions}
        isSmall={isSmall}
      />
      <TabPanel value={'gallery'} className={'reacg-tab-panel'}>
        {renderGalleryOptions()}
      </TabPanel>
      <TabPanel value={'appearance'} className={'reacg-tab-panel'}>
        {renderAppearanceOptions()}
      </TabPanel>
      <TabPanel value={'general'} className={'reacg-tab-panel'}>
        <GeneralSettings isLoading={isLoading} sections={'main'} />
      </TabPanel>
      <TabPanel value={'protection'} className={'reacg-tab-panel'}>
        <GeneralSettings isLoading={isLoading} sections={'protection'} />
      </TabPanel>
      <TabPanel value={'text-metadata'} className={'reacg-tab-panel'}>
        {type ? (
          <TextAndMetadataSettings isLoading={isLoading} galleryType={type} />
        ) : null}
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
