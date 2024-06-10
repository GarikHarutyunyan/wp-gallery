import {CircularProgress} from '@mui/material';
import {VLightbox as Lightbox} from 'components/lightbox/Lightbox';
import {
  GalleryType,
  IGeneralSettings,
  ILightboxSettings,
  PaginationType,
} from 'data-structures';
import React, {ReactElement, ReactNode, useMemo, useState} from 'react';
import {useData} from './data-context/useData';
import {MasonryGallery} from './masonry-gallery/MasonryGallery';
import {MosaicGallery} from './mosaic-gallery/MosaicGallery';
import {useSettings} from './settings';
import {Slideshow} from './slideshow';
import {PaginationProvider} from './thumbnail-gallery/PaginationProvider';
import {ThumbnailGallery} from './thumbnail-gallery/ThumbnailGallery';

const Gallery: React.FC = () => {
  const {
    type,
    generalSettings,
    lightboxSettings,
    mosaicSettings,
    thumbnailSettings,
    masonrySettings,
    slideshowSettings,
  } = useSettings();
  const {
    isLoading,
    pagesCount,
    onPageChange,
    isFullyLoaded,
    loadAllLightboxImages,
    images,
  } = useData();

  const paginationType: PaginationType = useMemo(() => {
    if (type === GalleryType.MOSAIC) {
      return mosaicSettings!.paginationType;
    }
    if (type === GalleryType.THUMBNAILS) {
      return thumbnailSettings!.paginationType;
    }
    if (type === GalleryType.MASONRY) {
      return masonrySettings!.paginationType;
    }

    return PaginationType.NONE;
  }, [
    type,
    mosaicSettings,
    thumbnailSettings,
    masonrySettings,
    slideshowSettings,
  ]);

  const {showLightbox} = lightboxSettings as ILightboxSettings;

  const [activeImageIndex, setActiveImageIndex] = useState<number>(-1);

  const renderGallery = (): ReactNode => {
    const hideGallery: boolean =
      !!isLoading && paginationType === PaginationType.SIMPLE;

    if (hideGallery) {
      return null;
    }
    let gallery: ReactElement = <></>;

    switch (type) {
      case GalleryType.MOSAIC:
        gallery = (
          <MosaicGallery onClick={showLightbox ? openLightbox : undefined} />
        );
        break;
      case GalleryType.MASONRY:
        gallery = (
          <MasonryGallery onClick={showLightbox ? openLightbox : undefined} />
        );
        break;
      case GalleryType.SLIDESHOW:
        gallery = <Slideshow key={images?.length} />;
        break;
      case GalleryType.THUMBNAILS:
      default:
        gallery = (
          <ThumbnailGallery onClick={showLightbox ? openLightbox : undefined} />
        );
        break;
    }

    return gallery;
  };

  const openLightbox = async (index: number): Promise<void> => {
    await (loadAllLightboxImages as Function)();
    setActiveImageIndex(index);
  };

  const renderLoader = (): ReactNode => {
    if (isLoading) {
      return (
        <div className={'pagination-privider__loader-container'}>
          <CircularProgress color="primary" size={60} />
        </div>
      );
    }

    return null;
  };

  const renderPaginationProvider = () => {
    return (
      <PaginationProvider
        type={paginationType}
        pagesCount={pagesCount || 1}
        onLoad={onPageChange as any}
        isFullyLoaded={isFullyLoaded}
        settings={generalSettings as IGeneralSettings}
      />
    );
  };

  const renderLightbox = (): ReactNode => {
    return <Lightbox activeIndex={activeImageIndex} onClose={closeLightbox} />;
  };

  const closeLightbox = (): void => {
    setActiveImageIndex(-1);
  };

  return (
    <>
      {renderGallery()}
      {renderLoader()}
      {renderPaginationProvider()}
      {renderLightbox()}
    </>
  );
};

export {Gallery};
