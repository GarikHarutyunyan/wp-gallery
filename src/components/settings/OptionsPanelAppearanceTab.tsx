import {GalleryType} from 'data-structures';
import {ReactElement} from 'react';
import {BlogAppearanceSettings} from './blog-settings/BlogAppearanceSettings';
import {CardsAppearanceSettings} from './cards-settings/CardsAppearanceSettings';
import {CarouselAppearanceSettings} from './carousel-settings/CarouselAppearanceSettings';
import {CoverflowAppearanceSettings} from './coverflow-settings/CoverflowAppearanceSettings';
import {CubeAppearanceSettings} from './cube-settings/CubeAppearanceSettings';
import {GridAppearanceSettings} from './gird-settings/GridAppearanceSettings';
import {JustifiedAppearanceSettings} from './justified-settings/JustifiedAppearanceSettings';
import {MasonryAppearanceSettings} from './masonry-settings/MasonryAppearanceSettings';
import {MosaicAppearanceSettings} from './mosaic-settings/MosaicAppearanceSettings';
import {SlideshowAppearanceSettings} from './slideshow-settings/SlideshowAppearanceSettings';
import {useSettings} from './useSettings';

interface IOptionsPanelAppearanceTabProps {
  isLoading: boolean;
  onProFeatureClick: (feature: string) => void;
}

const OptionsPanelAppearanceTab = ({
  isLoading,
  onProFeatureClick,
}: IOptionsPanelAppearanceTabProps): ReactElement => {
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
    blogSettings,
    changeBlogSettings,
  } = useSettings();

  const isGrid: boolean = type === GalleryType.THUMBNAILS;
  const isMosaic: boolean = type === GalleryType.MOSAIC;
  const isJustified: boolean = type === GalleryType.JUSTIFIED;
  const isMasonry: boolean = type === GalleryType.MASONRY;
  const isSlideshow: boolean = type === GalleryType.SLIDESHOW;
  const isCube: boolean = type === GalleryType.CUBE;
  const isCarousel: boolean = type === GalleryType.CAROUSEL;
  const isCards: boolean = type === GalleryType.CARDS;
  const isBlog: boolean = type === GalleryType.BLOG;
  const isCoverflow: boolean = type === GalleryType.COVERFLOW;

  return (
    <>
      {isGrid && thumbnailSettings && (
        <GridAppearanceSettings
          settings={thumbnailSettings}
          onSettingsChange={changeThumbnailSettings!}
          onProFeatureClick={onProFeatureClick}
          isLoading={isLoading}
        />
      )}
      {isMosaic && mosaicSettings && (
        <MosaicAppearanceSettings
          settings={mosaicSettings}
          onSettingsChange={changeMosaicSettings!}
          onProFeatureClick={onProFeatureClick}
          isLoading={isLoading}
        />
      )}
      {isJustified && justifiedSettings && (
        <JustifiedAppearanceSettings
          settings={justifiedSettings}
          onSettingsChange={changeJustifiedSettings!}
          onProFeatureClick={onProFeatureClick}
          isLoading={isLoading}
        />
      )}
      {isMasonry && masonrySettings && (
        <MasonryAppearanceSettings
          settings={masonrySettings}
          onSettingsChange={changeMasonrySettings!}
          onProFeatureClick={onProFeatureClick}
          isLoading={isLoading}
        />
      )}
      {isSlideshow && slideshowSettings && (
        <SlideshowAppearanceSettings
          settings={slideshowSettings}
          onSettingsChange={changeSlideshowSettings!}
          isLoading={isLoading}
          onProFeatureClick={onProFeatureClick}
        />
      )}
      {isCube && cubeSettings && (
        <CubeAppearanceSettings
          settings={cubeSettings}
          onSettingsChange={changeCubeSettings!}
          isLoading={isLoading}
          onProFeatureClick={onProFeatureClick}
        />
      )}
      {isCarousel && carouselSettings && (
        <CarouselAppearanceSettings
          settings={carouselSettings}
          onSettingsChange={changeCarouselSettings!}
          isLoading={isLoading}
          onProFeatureClick={onProFeatureClick}
        />
      )}
      {isCards && cardsSettings && (
        <CardsAppearanceSettings
          settings={cardsSettings}
          onSettingsChange={changeCardsSettings!}
          isLoading={isLoading}
          onProFeatureClick={onProFeatureClick}
        />
      )}
      {isBlog && blogSettings && (
        <BlogAppearanceSettings
          settings={blogSettings}
          onSettingsChange={changeBlogSettings!}
          isLoading={isLoading}
          onProFeatureClick={onProFeatureClick}
        />
      )}
      {isCoverflow && coverflowSettings && (
        <CoverflowAppearanceSettings
          settings={coverflowSettings}
          onSettingsChange={changeCoverflowSettings!}
          isLoading={isLoading}
          onProFeatureClick={onProFeatureClick}
        />
      )}
    </>
  );
};

export {OptionsPanelAppearanceTab};
