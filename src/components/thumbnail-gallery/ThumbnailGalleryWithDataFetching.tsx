import {ReactElement, ReactNode, useContext, useEffect, useState} from 'react';
import {ThumbnailGallery} from './ThumbnailGallery';
import axios from 'axios';
import {IImageDTO, PaginationType} from 'data-structures';
import {DataFetcher} from './DataFetcher';
import {VLightbox as Lightbox} from 'components/lightbox/Lightbox';
import {PaginationProvider} from './PaginationProvider';
import {IThumbnailSettings} from 'components/thumbnail-settings';
import {IGeneralSettings} from 'components/general-settings';
import {AppInfoContext} from 'contexts/AppInfoContext';
import {TranslationsContext} from 'contexts/TranslationsContext';
import {CircularProgress, Paper, Typography} from '@mui/material';
import {ILightboxSettings} from 'components/light-box-settings';

interface IThumbnailGalleryWithDataFetchingProps {
  images: IImageDTO[];
  thumbnailSettings: IThumbnailSettings;
  generalSettings: IGeneralSettings;
  lightboxSettings: ILightboxSettings;
}

const ThumbnailGalleryWithDataFetching = ({
  images: propsImages,
  thumbnailSettings,
  generalSettings,
  lightboxSettings,
}: IThumbnailGalleryWithDataFetchingProps) => {
  const {itemsPerPage = 1, paginationType} = generalSettings;
  const [activeImageIndex, setActiveImageIndex] = useState<number>(-1);
  const {galleryId, baseUrl, nonce} = useContext(AppInfoContext);
  const {noDataText, setLoadMoreText, setNoDataText} =
    useContext(TranslationsContext);
  const [images, setImages] = useState<IImageDTO[]>([]);
  const [lightboxImages, setLightboxImages] = useState<
    IImageDTO[] | undefined
  >();
  const [imageCount, setImageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pagesCount: number =
    itemsPerPage > 0 ? Math.ceil(imageCount / itemsPerPage) : imageCount;
  const isFullyLoaded: boolean = currentPage >= pagesCount;

  useEffect(() => {
    const reloadData = setTimeout(() => {
      itemsPerPage > 0 && onReloadData();
    }, 500);

    return () => clearTimeout(reloadData);
  }, [itemsPerPage, paginationType]);

  const getAllData = async () => {
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'gallery/' + galleryId + '/images'
      : undefined;

    if (fetchUrl) {
      const imgData: any[] = (
        await axios.get(fetchUrl, {
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
        description: data.description,
        caption: data.caption,
      }));

      setLightboxImages(newImages);
    } else {
      setImages(images);
    }
  };

  const getData = async (page: number) => {
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'gallery/' + galleryId + '/images'
      : undefined;

    if (fetchUrl) {
      setIsLoading(true);
      const queryStringSeperator: string = fetchUrl.includes('?') ? '&' : '?';
      const perPageQueryString: string =
        paginationType !== PaginationType.NONE
          ? `&per_page=${itemsPerPage}`
          : '';
      const queryString: string = perPageQueryString
        ? `${queryStringSeperator}page=${page}${perPageQueryString}`
        : '';
      const imgData: any[] = (
        await axios.get(`${fetchUrl}${queryString}`, {
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
        caption: data.caption,
        description: data.description,
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
    setLightboxImages([]);
    setCurrentPage(0);
    setImageCount(0);
    getData(1);
    getItemsCount();
  };

  const onThumbClick = (index: number) => {
    getAllData();
    setActiveImageIndex(index);
  };

  const renderThumbnailGallery = (): ReactElement => {
    const hideGallery: boolean =
      isLoading && paginationType === PaginationType.SIMPLE;

    return (
      <>
        {!hideGallery && (
          <ThumbnailGallery
            settings={thumbnailSettings}
            images={images}
            onClick={lightboxSettings.showLightbox ? onThumbClick : undefined}
          />
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
    <>
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
      <Lightbox
        activeIndex={activeImageIndex}
        onClose={() => setActiveImageIndex(-1)}
        images={lightboxImages || images}
        settings={lightboxSettings}
      />
    </>
  );
};

export {ThumbnailGalleryWithDataFetching};
