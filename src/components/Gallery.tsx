import {Grid} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import {
  GalleryType,
  IGeneralSettings,
  ImageClickAction,
  PaginationType,
} from 'data-structures';
import React, {
  lazy,
  ReactElement,
  ReactNode,
  Suspense,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useData} from './data-context/useData';
import './gallery.css';
import {useSettings} from './settings';
const ThumbnailGallery = lazy(
  () => import('./thumbnail-gallery/ThumbnailGallery')
);
const MosaicGallery = lazy(() => import('./mosaic-gallery/MosaicGallery'));
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

const Gallery: React.FC = () => {
  const {
    type,
    generalSettings,
    mosaicSettings,
    thumbnailSettings,
    masonrySettings,
    blogSettings,
  } = useSettings();
  const {
    isLoading,
    pagesCount,
    onPageChange,
    onSearchSubmit,
    currentPage = 1,
    itemsPerPage = 1,
    isFullyLoaded,
    loadAllLightboxImages,
    images,
  } = useData();
  const searchDebounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    if (searchDebounceTimeoutRef.current) {
      clearTimeout(searchDebounceTimeoutRef.current);
    }

    searchDebounceTimeoutRef.current = setTimeout(() => {
      if (onSearchSubmit) {
        onSearchSubmit(searchTerm);
      }
    }, 500);
  };
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
    if (type === GalleryType.BLOG) {
      return blogSettings!.paginationType;
    }

    return PaginationType.NONE;
  }, [
    type,
    mosaicSettings?.paginationType,
    thumbnailSettings?.paginationType,
    masonrySettings?.paginationType,
    blogSettings?.paginationType,
  ]);

  const {clickAction, openUrlInNewTab} = generalSettings as IGeneralSettings;
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

    return <Suspense>{gallery}</Suspense>;
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
      <Suspense>
        <PaginationProvider
          type={paginationType}
          pagesCount={pagesCount || 1}
          onLoad={onPageChange as any}
          isFullyLoaded={isFullyLoaded}
          settings={generalSettings as IGeneralSettings}
          page={currentPage}
        />
      </Suspense>
    );
  };

  const renderLightbox = (): ReactNode => {
    if (!showLightbox) {
      return null;
    }
    return (
      <Suspense>
        <Lightbox activeIndex={activeImageIndex} onClose={closeLightbox} />
      </Suspense>
    );
  };
  const renderSearchTextField = (): ReactNode => {
    return (
      <Grid container spacing={0} style={{margin: '15px 0'}}>
        <Grid item xs={3} style={{height: '100%'}}>
          <TextField
            className={'reacg-gallery-wrapper__top-layout-text-field'}
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            onChange={handleSearchInputChange}
            InputProps={{
              sx: {
                'padding': 0,
                '& input': {
                  padding: '16.5px 14px',
                  minHeight: 0,
                  border: 0,
                  boxShadow: 'none',
                },
              },
            }}
          />
        </Grid>
      </Grid>
    );
  };
  const closeLightbox = (): void => {
    setActiveImageIndex(-1);
  };

  return (
    <>
      {renderSearchTextField()}
      {!!images?.length && renderGallery()}
      {renderLoader()}
      {paginationType !== PaginationType.NONE && renderPaginationProvider()}
      {showLightbox && renderLightbox()}
    </>
  );
};

export {Gallery};
