import CircularProgress from '@mui/material/CircularProgress';
import {
  GalleryType,
  IGeneralSettings,
  ILightboxSettings,
  PaginationType,
} from 'data-structures';
import React, {
  lazy,
  ReactElement,
  ReactNode,
  Suspense,
  useMemo,
  useState,
} from 'react';
import {useData} from './data-context/useData';
import {useSettings} from './settings';

const ThumbnailGallery = lazy(
  () => import('./thumbnail-gallery/ThumbnailGallery')
);
const MosaicGallery = lazy(() => import('./mosaic-gallery/MosaicGallery'));
const MasonryGallery = lazy(() => import('./masonry-gallery/MasonryGallery'));
const CubeGallery = lazy(() => import('./cube-gallery/CubeGallery'));
const CardsGallery = lazy(() => import('./cards-gallery/CardsGallery'));
const Carousel = lazy(() => import('./carousel/Carousel'));
const Lightbox = lazy(() => import('components/lightbox/Lightbox'));
const Slideshow = lazy(() => import('components/slideshow/Slideshow'));
const PaginationProvider = lazy(
  () => import('./thumbnail-gallery/PaginationProvider')
);

const Gallery: React.FC = () => {
  const {
    type,
    generalSettings,
    lightboxSettings,
    mosaicSettings,
    thumbnailSettings,
    masonrySettings,
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
    mosaicSettings?.paginationType,
    thumbnailSettings?.paginationType,
    masonrySettings?.paginationType,
  ]);

  const {showLightbox} = lightboxSettings as ILightboxSettings;

  const [activeImageIndex, setActiveImageIndex] = useState<number>(-1);

  const renderGallery = (): ReactNode => {
    const hideGallery: boolean =
      !!isLoading &&
      [PaginationType.SIMPLE, PaginationType.NONE].includes(paginationType);

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
        gallery = (
          <ThumbnailGallery onClick={showLightbox ? openLightbox : undefined} />
        );
        break;
      case GalleryType.CUBE:
        gallery = <CubeGallery />;
        break;
      case GalleryType.CAROUSEL:
        gallery = <Carousel />;
        break;
      case GalleryType.CARDS:
        gallery = <CardsGallery />;
        break;
    }

    return <Suspense>{gallery}</Suspense>;
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
      <Suspense>
        <PaginationProvider
          type={paginationType}
          pagesCount={pagesCount || 1}
          onLoad={onPageChange as any}
          isFullyLoaded={isFullyLoaded}
          settings={generalSettings as IGeneralSettings}
        />
      </Suspense>
    );
  };

  const renderLightbox = (): ReactNode => {
    return (
      <Suspense>
        <Lightbox activeIndex={activeImageIndex} onClose={closeLightbox} />
      </Suspense>
    );
  };

  const closeLightbox = (): void => {
    setActiveImageIndex(-1);
  };

  return (
    <>
      {renderGallery()}
      {renderLoader()}
      {paginationType !== PaginationType.NONE && renderPaginationProvider()}
      {renderLightbox()}
    </>
  );
};

export {Gallery};
