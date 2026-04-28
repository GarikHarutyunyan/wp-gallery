import {GalleryType} from 'data-structures';
import {ReactElement} from 'react';
import {BlogSettings} from './blog-settings/BlogSettings';
import {CardsSettings} from './cards-settings/CardsSettings';
import {CarouselSettings} from './carousel-settings/CarouselSettings';
import {CoverflowSettings} from './coverflow-settings/CoverflowSettings';
import {CubeSettings} from './cube-settings/CubeSettings';
import {GridSettings} from './gird-settings/GridSettings';
import {JustifiedSettings} from './justified-settings/JustifiedSettings';
import {MasonrySettings} from './masonry-settings/MasonrySettings';
import {MosaicSettings} from './mosaic-settings/MosaicSettings';
import {SlideshowSettings} from './slideshow-settings/SlideshowSettings';
import {useSettings} from './useSettings';

interface IOptionsPanelGalleryTabProps {
  isLoading: boolean;
  onProFeatureClick: (feature: string) => void;
}

const OptionsPanelGalleryTab = ({
  isLoading,
  onProFeatureClick,
}: IOptionsPanelGalleryTabProps): ReactElement => {
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
        <GridSettings
          isLoading={isLoading}
          settings={thumbnailSettings}
          onSettingsChange={changeThumbnailSettings!}
        />
      )}
      {isMosaic && mosaicSettings && (
        <MosaicSettings
          settings={mosaicSettings}
          onSettingsChange={changeMosaicSettings!}
          isLoading={isLoading}
        />
      )}
      {isJustified && justifiedSettings && (
        <JustifiedSettings
          settings={justifiedSettings}
          onSettingsChange={changeJustifiedSettings!}
          isLoading={isLoading}
        />
      )}
      {isMasonry && masonrySettings && (
        <MasonrySettings
          settings={masonrySettings}
          onSettingsChange={changeMasonrySettings!}
          isLoading={isLoading}
        />
      )}
      {isSlideshow && slideshowSettings && (
        <SlideshowSettings
          settings={slideshowSettings}
          onSettingsChange={changeSlideshowSettings!}
          isLoading={isLoading}
          onProFeatureClick={onProFeatureClick}
        />
      )}
      {isCube && cubeSettings && (
        <CubeSettings
          settings={cubeSettings}
          onSettingsChange={changeCubeSettings!}
          isLoading={isLoading}
          onProFeatureClick={onProFeatureClick}
        />
      )}
      {isCarousel && carouselSettings && (
        <CarouselSettings
          settings={carouselSettings}
          onSettingsChange={changeCarouselSettings!}
          isLoading={isLoading}
          onProFeatureClick={onProFeatureClick}
        />
      )}
      {isCards && cardsSettings && (
        <CardsSettings
          settings={cardsSettings}
          onSettingsChange={changeCardsSettings!}
          isLoading={isLoading}
          onProFeatureClick={onProFeatureClick}
        />
      )}
      {isBlog && blogSettings && (
        <BlogSettings
          settings={blogSettings}
          onSettingsChange={changeBlogSettings!}
          isLoading={isLoading}
        />
      )}
      {isCoverflow && coverflowSettings && (
        <CoverflowSettings
          settings={coverflowSettings}
          onSettingsChange={changeCoverflowSettings!}
          isLoading={isLoading}
          onProFeatureClick={onProFeatureClick}
        />
      )}
    </>
  );
};

export {OptionsPanelGalleryTab};
