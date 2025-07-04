import CircularProgress from '@mui/material/CircularProgress';
import {
  GalleryType,
  IBlogSettings,
  IGeneralSettings,
  ImageClickAction,
  IMasonrySettings,
  IMosaicSettings,
  IThumbnailSettings,
  PaginationType,
} from 'data-structures';
import React, {
  lazy,
  ReactElement,
  ReactNode,
  Suspense,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {useData} from './data-context/useData';
import './gallery.css';
import {useSettings} from './settings';

const ThumbnailGallery = lazy(
  () => import('./thumbnail-gallery/ThumbnailGallery')
);
const MosaicGallery = lazy(() => import('./mosaic-gallery/MosaicGallery'));
const JustifiedGallery = lazy(
  () => import('./justified-gallery/JustifiedGallery')
);
const MasonryGallery = lazy(() => import('./masonry-gallery/MasonryGallery'));
const CubeGallery = lazy(() => import('./cube-gallery/CubeGallery'));
const CardsGallery = lazy(() => import('./cards-gallery/CardsGallery'));
const BlogGallery = lazy(() => import('./blog-gallery/BlogGallery'));
const Carousel = lazy(() => import('./carousel/Carousel'));
const Lightbox = lazy(() => import('./lightbox/Lightbox'));
const Slideshow = lazy(() => import('./slideshow/Slideshow'));
const PaginationProvider = lazy(
  () => import('./thumbnail-gallery/PaginationProvider')
);
const FilterProvider = lazy(() => import('./filter-provider/FilterProvider'));

type NonBlogSettings = IMosaicSettings | IThumbnailSettings | IMasonrySettings;
type GallerySettings = NonBlogSettings | IBlogSettings | undefined;

const Gallery: React.FC = () => {
  const {
    type,
    generalSettings,
    mosaicSettings,
    justifiedSettings,
    thumbnailSettings,
    masonrySettings,
    blogSettings,
  } = useSettings();
  const {
    isLoading,
    pagesCount,
    onPageChange,
    onSearch,
    currentPage = 1,
    itemsPerPage = 1,
    loadAllLightboxImages,
    images,
  } = useData();

  const paginationType: PaginationType = useMemo(() => {
    if (type === GalleryType.MOSAIC) {
      return mosaicSettings!.paginationType;
    }
    if (type === GalleryType.JUSTIFIED) {
      return justifiedSettings!.paginationType;
    }
    if (type === GalleryType.THUMBNAILS) {
      return thumbnailSettings!.paginationType;
    }
    if (type === GalleryType.MASONRY) {
      return masonrySettings!.paginationType;
    }
    if (type === GalleryType.BLOG) {
      return blogSettings!.paginationType;
    }

    return PaginationType.NONE;
  }, [
    type,
    mosaicSettings?.paginationType,
    justifiedSettings?.paginationType,
    thumbnailSettings?.paginationType,
    masonrySettings?.paginationType,
    blogSettings?.paginationType,
  ]);

  const {
    clickAction,
    openUrlInNewTab,
    showSearchField,
    searchFieldPlaceholder,
  } = generalSettings as IGeneralSettings;
  const showLightbox: boolean = clickAction === ImageClickAction.LIGHTBOX;
  const shouldOpenUrl: boolean = clickAction === ImageClickAction.URL;
  const isClickable: boolean = showLightbox || shouldOpenUrl;

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
          <MosaicGallery onClick={isClickable ? onImageClick : undefined} />
        );
        break;
      case GalleryType.JUSTIFIED:
        gallery = (
          <JustifiedGallery onClick={isClickable ? onImageClick : undefined} />
        );
        break;
      case GalleryType.MASONRY:
        gallery = (
          <MasonryGallery onClick={isClickable ? onImageClick : undefined} />
        );
        break;
      case GalleryType.SLIDESHOW:
        gallery = (
          <Slideshow
            key={images?.length}
            onClick={isClickable ? onImageClick : undefined}
          />
        );
        break;
      case GalleryType.THUMBNAILS:
        gallery = (
          <ThumbnailGallery onClick={isClickable ? onImageClick : undefined} />
        );
        break;
      case GalleryType.CUBE:
        gallery = (
          <CubeGallery onClick={isClickable ? onImageClick : undefined} />
        );
        break;
      case GalleryType.CAROUSEL:
        gallery = <Carousel onClick={isClickable ? onImageClick : undefined} />;
        break;
      case GalleryType.CARDS:
        gallery = (
          <CardsGallery onClick={isClickable ? onImageClick : undefined} />
        );
        break;
      case GalleryType.BLOG:
        gallery = (
          <BlogGallery onClick={isClickable ? onImageClick : undefined} />
        );
        break;
    }

    return gallery;
  };

  const onImageClick = (index: number) => {
    const imageIndex: number =
      paginationType === PaginationType.SIMPLE
        ? (currentPage - 1) * itemsPerPage + index
        : index;

    if (showLightbox) {
      openLightbox(imageIndex);
    } else if (shouldOpenUrl) {
      onCustomActionToggle(imageIndex);
    }
  };

  const onCustomActionToggle = (index: number) => {
    const url: string = images?.[index]?.action_url || '';

    if (!!url) {
      if (openUrlInNewTab) {
        window?.open(url, '_blank')?.focus();
      } else {
        window?.open(url, '_self');
      }
    }
  };

  const openLightbox = async (index: number): Promise<void> => {
    await (loadAllLightboxImages as Function)();
    setActiveImageIndex(index);
  };

  const renderLoader = (): ReactNode => {
    if (isLoading) {
      return (
        <div className={'gallery__loader'}>
          <CircularProgress sx={{color: 'black'}} size={60} />
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
        settings={generalSettings as IGeneralSettings}
        page={currentPage}
      />
    );
  };

  const renderLightbox = (): ReactNode => {
    if (!showLightbox) {
      return null;
    }
    return <Lightbox activeIndex={activeImageIndex} onClose={closeLightbox} />;
  };

  const renderFilterProvider = () => {
    return <FilterProvider onSearch={onSearch as any} />;
  };

  const closeLightbox = (): void => {
    setActiveImageIndex(-1);
  };

  const getSettingsByType = useCallback((): GallerySettings => {
    switch (type) {
      case GalleryType.MOSAIC:
        return mosaicSettings;
      case GalleryType.JUSTIFIED:
        return justifiedSettings;
      case GalleryType.THUMBNAILS:
        return thumbnailSettings;
      case GalleryType.MASONRY:
        return masonrySettings;
      case GalleryType.BLOG:
        return blogSettings;
      default:
        return undefined;
    }
  }, [
    type,
    mosaicSettings,
    justifiedSettings,
    thumbnailSettings,
    masonrySettings,
    blogSettings,
  ]);

  const selectedSettings = useMemo(
    () => getSettingsByType(),
    [getSettingsByType]
  );

  const {containerPadding, backgroundColor, calculatedWidth} = useMemo(() => {
    const {containerPadding = 0, backgroundColor = 'transparent'} =
      selectedSettings ?? {};
    const {width = 100} =
      type !== GalleryType.BLOG && selectedSettings
        ? (selectedSettings as NonBlogSettings)
        : {};

    const {
      columns = 4,
      gap = 10,
      padding = 0,
    } = type === GalleryType.THUMBNAILS && selectedSettings
      ? (selectedSettings as NonBlogSettings)
      : {};

    const calculatedWidth =
      type === GalleryType.THUMBNAILS
        ? `${columns * width + (columns - 1) * gap + columns * 2 * padding}px`
        : `${width}%`;

    return {
      containerPadding,
      backgroundColor,
      calculatedWidth,
    };
  }, [selectedSettings, type]);

  return (
    <Suspense>
      <div
        style={{
          margin: 'auto',
          boxSizing: 'border-box',
          padding: containerPadding + 'px',
          backgroundColor,
          width: calculatedWidth,
          maxWidth: '100%',
        }}
      >
        {showSearchField && renderFilterProvider()}
        {!!images?.length && renderGallery()}
        {renderLoader()}
        {paginationType !== PaginationType.NONE && renderPaginationProvider()}
        {showLightbox && renderLightbox()}
      </div>
    </Suspense>
  );
};

export {Gallery};
