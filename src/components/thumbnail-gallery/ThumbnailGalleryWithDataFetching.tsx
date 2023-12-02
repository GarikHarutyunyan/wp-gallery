import {ReactElement, ReactNode, useContext, useEffect, useState} from 'react';
import {ThumbnailGallery} from './ThumbnailGallery';
import axios from 'axios';
import {IImageDTO, PaginationType} from 'data-structures';
import {DataFetcher} from './DataFetcher';
import {LightboxProvider} from 'components/lightbox/LightboxContext';
import {PaginationProvider} from './PaginationProvider';
import {IThumbnailSettings} from 'components/thumbnail-settings';
import {IGeneralSettings} from 'components/general-settings';
import {AppInfoContext} from 'AppInfoContext';
import {AppTranslationsContext} from 'AppTranslationsContext';
import {CircularProgress, Paper, Typography} from '@mui/material';

interface IThumbnailGalleryWithDataFetchingProps {
  images: IImageDTO[];
  thumbnailSettings: IThumbnailSettings;
  generalSettings: IGeneralSettings;
}

const ThumbnailGalleryWithDataFetching = ({
  images: propsImages,
  thumbnailSettings,
  generalSettings,
}: IThumbnailGalleryWithDataFetchingProps) => {
  const {itemsPerPage = 1, paginationType} = generalSettings;
  const {galleryId, baseUrl, nonce} = useContext(AppInfoContext);
  const {noDataText, setLoadMoreText, setNoDataText} = useContext(
    AppTranslationsContext
  );
  const [images, setImages] = useState<IImageDTO[]>([]);
  const [imageCount, setImageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pagesCount: number =
    itemsPerPage > 0 ? Math.ceil(imageCount / itemsPerPage) : imageCount;
  const isFullyLoaded: boolean = currentPage >= pagesCount;

  useEffect(() => {
    itemsPerPage > 0 && onReloadData();
  }, [itemsPerPage, paginationType]);

  const getData = async (page: number) => {
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'gallery/' + galleryId + '/images'
      : undefined;

    if (fetchUrl) {
      setIsLoading(true);
      const perPageQueryString: string =
        paginationType !== PaginationType.NONE
          ? `&per_page=${itemsPerPage}`
          : '';
      const imgData: any[] = (
        await axios.get(`${fetchUrl}?page=${page}${perPageQueryString}`, {
          headers: {'X-WP-Nonce': nonce},
        })
      ).data;
      const newImages: IImageDTO[] = imgData.map((data: any) => ({
        original: data.original,
        width: data.width,
        height: data.height,
        medium_large: data.medium_large,
        thumbnail: data.thumbnail,
        title: data.title,
      }));

      if (paginationType === PaginationType.SIMPLE) {
        setImages(newImages);
      } else {
        setImages((prevImages) => [...prevImages, ...newImages]);
      }
      setCurrentPage(page);
      setIsLoading(false);
    } else {
      setImages(propsImages);
    }
  };

  const getItemsCount = async () => {
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'gallery/' + galleryId
      : undefined;

    if (fetchUrl) {
      const imgData: any = (
        await axios.get(fetchUrl, {
          headers: {'X-WP-Nonce': nonce},
        })
      ).data;
      const newImageCount: number = imgData?.images_count;
      const loadMoreText: string | undefined =
        (window as any).reacg_global?.text?.load_more || undefined;
      const noDataText: string | undefined =
        (window as any).reacg_global?.text?.no_data || undefined;

      loadMoreText && setLoadMoreText?.(loadMoreText);
      noDataText && setNoDataText?.(noDataText);
      setImageCount(newImageCount);
    } else {
      setImageCount(0);
    }
  };

  const onPageChange = async (
    _event?: any,
    newPage: number = currentPage + 1
  ) => {
    getData(newPage);
  };

  const onReloadData = async () => {
    setIsLoading(true);
    setImages([]);
    setCurrentPage(0);
    setImageCount(0);
    getData(1);
    getItemsCount();
  };

  const renderThumbnailGallery = (): ReactElement => {
    const hideGallery: boolean =
      isLoading && paginationType === PaginationType.SIMPLE;

    return (
      <>
        {!hideGallery && (
          <ThumbnailGallery settings={thumbnailSettings} images={images} />
        )}
        {renderLoader()}
      </>
    );
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

  const renderContentPlaceholder = (): ReactElement => {
    return (
      <Paper variant={'outlined'} className={'content-placeholder'}>
        <Typography gutterBottom variant="h6" component="div">
          {noDataText}
        </Typography>
      </Paper>
    );
  };

  return (
    <LightboxProvider images={images}>
      {images.length || isLoading ? (
        <>
          {renderThumbnailGallery()}
          <PaginationProvider
            type={paginationType}
            pagesCount={pagesCount}
            onLoad={onPageChange}
            isFullyLoaded={isFullyLoaded}
            settings={generalSettings}
          />
        </>
      ) : (
        renderContentPlaceholder()
      )}
      <DataFetcher onClick={onReloadData} />
    </LightboxProvider>
  );
};

export {ThumbnailGalleryWithDataFetching};
