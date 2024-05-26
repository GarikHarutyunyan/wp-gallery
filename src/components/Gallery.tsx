import {CircularProgress} from '@mui/material';
import {VLightbox as Lightbox} from 'components/lightbox/Lightbox';
import {GalleryType, PaginationType} from 'data-structures';
import React, {ReactNode, useMemo, useState} from 'react';
import {useData} from './data-context/useData';
import {IGeneralSettings} from './general-settings';
import {ILightboxSettings} from './light-box-settings';
import {MosaicGallery} from './mosaic-gallery/MosaicGallery';
import {useSettings} from './settings';
import {PaginationProvider} from './thumbnail-gallery/PaginationProvider';
import {ThumbnailGallery} from './thumbnail-gallery/ThumbnailGallery';

const Gallery: React.FC = () => {
  const {
    type,
    generalSettings,
    lightboxSettings,
    mosaicSettings,
    thumbnailSettings,
  } = useSettings();
  const {
    isLoading,
    pagesCount,
    onPageChange,
    isFullyLoaded,
    loadAllLightboxImages,
  } = useData();

  const paginationType: PaginationType = useMemo(() => {
    if (type === GalleryType.MOSAIC) {
      return mosaicSettings!.paginationType;
    }
    if (type === GalleryType.THUMBNAILS) {
      return thumbnailSettings!.paginationType;
    }

    return PaginationType.NONE;
  }, [type, mosaicSettings, thumbnailSettings]);

  const {showLightbox} = lightboxSettings as ILightboxSettings;

  const [activeImageIndex, setActiveImageIndex] = useState<number>(-1);

  const renderGallery = (): ReactNode => {
    const hideGallery: boolean =
      !!isLoading && paginationType === PaginationType.SIMPLE;

    return !hideGallery ? (
      type === GalleryType.MOSAIC ? (
        <MosaicGallery onClick={showLightbox ? openLightbox : undefined} />
      ) : (
        <ThumbnailGallery onClick={showLightbox ? openLightbox : undefined} />
      )
    ) : null;
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
