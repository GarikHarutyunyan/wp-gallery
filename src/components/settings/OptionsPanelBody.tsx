import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import {GeneralSettings} from 'components/general-settings';
import {LightboxSettings} from 'components/light-box-settings';
import {GalleryType, ImageClickAction} from 'data-structures';
import {ReactNode, useState} from 'react';
import {BlogAppearanceSettings} from './blog-settings/BlogAppearanceSettings';
import {BlogSettings} from './blog-settings/BlogSettings';
import {CardsAppearanceSettings} from './cards-settings/CardsAppearanceSettings';
import {CardsSettings} from './cards-settings/CardsSettings';
import {CarouselAppearanceSettings} from './carousel-settings/CarouselAppearanceSettings';
import {CarouselSettings} from './carousel-settings/CarouselSettings';
import {CoverflowAppearanceSettings} from './coverflow-settings/CoverflowAppearanceSettings';
import {CoverflowSettings} from './coverflow-settings/CoverflowSettings';
import {CubeAppearanceSettings} from './cube-settings/CubeAppearanceSettings';
import {CubeSettings} from './cube-settings/CubeSettings';
import {GridAdvancedSettings} from './gird-settings/GridAdvancedSettings';
import {GridSettings} from './gird-settings/GridSettings';
import {JustifiedAppearanceSettings} from './justified-settings/JustifiedAppearanceSettings';
import {JustifiedSettings} from './justified-settings/JustifiedSettings';
import {MasonryAppearanceSettings} from './masonry-settings/MasonryAppearanceSettings';
import {MasonrySettings} from './masonry-settings/MasonrySettings';
import {MosaicAppearanceSettings} from './mosaic-settings/MosaicAppearanceSettings';
import {MosaicSettings} from './mosaic-settings/MosaicSettings';
import {SettingsPanelTabs} from './SettingsPanelTabs';
import {SlideshowAppearanceSettings} from './slideshow-settings/SlideshowAppearanceSettings';
import {SlideshowSettings} from './slideshow-settings/SlideshowSettings';
import {TextAndMetadataSettings} from './TextAndMetadataSettings';
import {useSettings} from './useSettings';

interface IOptionsPanelBodyProps {
  isLoading: boolean;
  isSmall: boolean;
  onSave: () => Promise<void>;
  onReset: () => Promise<void>;
}

const OptionsPanelBody = ({
  isLoading,
  isSmall,
  onSave,
  onReset,
}: IOptionsPanelBodyProps) => {
  const {
    type,
    thumbnailSettings,
    changeThumbnailSettings,
    mosaicSettings,
    changeMosaicSettings,
    justifiedSettings,
    changeJustifiedSettings,
    masonrySettings,
    changeMasonrySettings,
    slideshowSettings,
    changeSlideshowSettings,
    cubeSettings,
    changeCubeSettings,
    carouselSettings,
    changeCarouselSettings,
    coverflowSettings,
    changeCoverflowSettings,
    cardsSettings,
    changeCardsSettings,
    generalSettings,
    blogSettings,
    changeBlogSettings,
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
    let galleryOprions: ReactNode = thumbnailSettings && (
      <GridSettings
        isLoading={isLoading}
        settings={thumbnailSettings}
        onSettingsChange={changeThumbnailSettings!}
      />
    );
    switch (type) {
      case GalleryType.MOSAIC:
        galleryOprions = mosaicSettings && (
          <MosaicSettings
            settings={mosaicSettings}
            onSettingsChange={changeMosaicSettings!}
            isLoading={isLoading}
          />
        );
        break;
      case GalleryType.JUSTIFIED:
        galleryOprions = justifiedSettings && (
          <JustifiedSettings
            settings={justifiedSettings}
            onSettingsChange={changeJustifiedSettings!}
            isLoading={isLoading}
          />
        );
        break;
      case GalleryType.MASONRY:
        galleryOprions = masonrySettings && (
          <MasonrySettings
            settings={masonrySettings}
            onSettingsChange={changeMasonrySettings!}
            isLoading={isLoading}
          />
        );
        break;
      case GalleryType.SLIDESHOW:
        galleryOprions = slideshowSettings && (
          <SlideshowSettings
            settings={slideshowSettings}
            onSettingsChange={changeSlideshowSettings!}
            isLoading={isLoading}
          />
        );
        break;
      case GalleryType.CUBE:
        galleryOprions = cubeSettings && (
          <CubeSettings
            settings={cubeSettings}
            onSettingsChange={changeCubeSettings!}
            isLoading={isLoading}
          />
        );
        break;
      case GalleryType.CAROUSEL:
        galleryOprions = carouselSettings && (
          <CarouselSettings
            settings={carouselSettings}
            onSettingsChange={changeCarouselSettings!}
            isLoading={isLoading}
          />
        );
        break;
      case GalleryType.CARDS:
        galleryOprions = cardsSettings && (
          <CardsSettings
            settings={cardsSettings}
            onSettingsChange={changeCardsSettings!}
            isLoading={isLoading}
          />
        );
        break;
      case GalleryType.BLOG:
        galleryOprions = blogSettings && (
          <BlogSettings
            settings={blogSettings}
            onSettingsChange={changeBlogSettings!}
            isLoading={isLoading}
          />
        );
        break;
      case GalleryType.COVERFLOW:
        galleryOprions = coverflowSettings && (
          <CoverflowSettings
            settings={coverflowSettings}
            onSettingsChange={changeCoverflowSettings!}
            isLoading={isLoading}
          />
        );
        break;
    }
    return galleryOprions;
  };

  const renderAppearanceOptions = (): ReactNode => {
    let appearanceOptions: ReactNode = thumbnailSettings && (
      <GridAdvancedSettings
        isLoading={isLoading}
        settings={thumbnailSettings}
        onSettingsChange={changeThumbnailSettings!}
      />
    );
    switch (type) {
      case GalleryType.MOSAIC:
        appearanceOptions = mosaicSettings && (
          <MosaicAppearanceSettings
            settings={mosaicSettings}
            onSettingsChange={changeMosaicSettings!}
            isLoading={isLoading}
          />
        );
        break;
      case GalleryType.JUSTIFIED:
        appearanceOptions = justifiedSettings && (
          <JustifiedAppearanceSettings
            settings={justifiedSettings}
            onSettingsChange={changeJustifiedSettings!}
            isLoading={isLoading}
          />
        );
        break;
      case GalleryType.MASONRY:
        appearanceOptions = masonrySettings && (
          <MasonryAppearanceSettings
            settings={masonrySettings}
            onSettingsChange={changeMasonrySettings!}
            isLoading={isLoading}
          />
        );
        break;
      case GalleryType.SLIDESHOW:
        appearanceOptions = slideshowSettings && (
          <SlideshowAppearanceSettings
            settings={slideshowSettings}
            onSettingsChange={changeSlideshowSettings!}
            isLoading={isLoading}
          />
        );
        break;
      case GalleryType.CUBE:
        appearanceOptions = cubeSettings && (
          <CubeAppearanceSettings
            settings={cubeSettings}
            onSettingsChange={changeCubeSettings!}
            isLoading={isLoading}
          />
        );
        break;
      case GalleryType.CAROUSEL:
        appearanceOptions = carouselSettings && (
          <CarouselAppearanceSettings
            settings={carouselSettings}
            onSettingsChange={changeCarouselSettings!}
            isLoading={isLoading}
          />
        );
        break;
      case GalleryType.CARDS:
        appearanceOptions = cardsSettings && (
          <CardsAppearanceSettings
            settings={cardsSettings}
            onSettingsChange={changeCardsSettings!}
            isLoading={isLoading}
          />
        );
        break;
      case GalleryType.BLOG:
        appearanceOptions = blogSettings && (
          <BlogAppearanceSettings
            settings={blogSettings}
            onSettingsChange={changeBlogSettings!}
            isLoading={isLoading}
          />
        );
        break;
      case GalleryType.COVERFLOW:
        appearanceOptions = coverflowSettings && (
          <CoverflowAppearanceSettings
            settings={coverflowSettings}
            onSettingsChange={changeCoverflowSettings!}
            isLoading={isLoading}
          />
        );
        break;
    }
    return appearanceOptions;
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
