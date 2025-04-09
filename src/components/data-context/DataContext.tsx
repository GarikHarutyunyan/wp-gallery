import {Paper, Typography} from '@mui/material';
import axios from 'axios';
import {useAppInfo} from 'contexts/AppInfoContext';
import {TranslationsContext} from 'contexts/TranslationsContext';
import {
  GalleryType,
  IGeneralSettings,
  IImageDTO,
  PaginationType,
} from 'data-structures';
import {
  ReactElement,
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {useSettings} from '../settings';
import {DataFetcher} from '../thumbnail-gallery/DataFetcher';

const propsImages: IImageDTO[] = [];

const DataContext = createContext<{
  images?: IImageDTO[];
  lightboxImages?: IImageDTO[];
  isLoading?: boolean;
  pagesCount?: number;
  onPageChange?: (_: any, page: number) => void;
  isFullyLoaded?: boolean;
  loadAllLightboxImages?: () => Promise<void>;
}>({});

const DataProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const {
    type,
    generalSettings,
    thumbnailSettings,
    mosaicSettings,
    masonrySettings,
    blogSettings,
    changeImagesCount,
  } = useSettings();

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

  const {
    itemsPerPage = 1,
    orderBy = 'default',
    orderDirection = 'asc',
  } = generalSettings as IGeneralSettings;
  const {galleryId, baseUrl, getGalleryTimestamp} = useAppInfo();
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

  useLayoutEffect(() => {
    itemsPerPage > 0 && onReloadData();
  }, [itemsPerPage, paginationType, orderBy, orderDirection]);

  const loadAllLightboxImages = async (): Promise<void> => {
    const newLightboxImages: IImageDTO[] = await (getAllData as Function)();

    setLightboxImages(newLightboxImages);
  };

  const getAllData = async (): Promise<IImageDTO[]> => {
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'gallery/' + galleryId + '/images'
      : undefined;

    if (fetchUrl) {
      const queryStringSeperator: string = fetchUrl.includes('?') ? '&' : '?';
      let queryString = queryStringSeperator;
      queryString += `timestamp=${getGalleryTimestamp?.()}`;
      const imgData: any[] = (await axios.get(`${fetchUrl}${queryString}`))
        .data;
      const newImages: IImageDTO[] = imgData.map((data: any) => ({
        id: data.id,
        type: data.type,
        original: data.original,
        width: data.width,
        height: data.height,
        large: data.large,
        medium_large: data.medium_large,
        thumbnail: data.thumbnail,
        title: data.title,
        description: data.description,
        caption: data.caption,
        action_url: data.action_url,
      }));

      return newImages;
    }
    return images;
  };

  const getData = async (page: number) => {
    if (isLoading) {
      return;
    }
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'gallery/' + galleryId + '/images'
      : undefined;

    if (fetchUrl) {
      setIsLoading(true);

      if (page === 1) {
        setImages([]);
      }

      const queryStringSeperator: string = fetchUrl.includes('?') ? '&' : '?';
      let queryString = queryStringSeperator;
      queryString += `order_by=${orderBy}`;
      queryString += `&order=${orderDirection}`;
      queryString += `&timestamp=${getGalleryTimestamp?.()}`;
      if (paginationType !== PaginationType.NONE) {
        queryString += `&page=${page}`;
        queryString += `&per_page=${itemsPerPage}`;
      }
      const response: any = await axios.get(`${fetchUrl}${queryString}`);
      const imgData: any[] = response.data;
      const headers: any = response.headers;
      const newImages: IImageDTO[] = imgData.map((data: any) => ({
        id: data.id,
        type: data.type,
        original: data.original,
        width: data.width,
        height: data.height,
        large: data.large,
        medium_large: data.medium_large,
        thumbnail: data.thumbnail,
        title: data.title,
        caption: data.caption,
        description: data.description,
        action_url: data.action_url,
      }));
      const newImageCount: number = headers?.['x-images-count'];
      const loadMoreText: string | undefined =
        (window as any).reacg_global?.text?.load_more || undefined;
      const noDataText: string | undefined =
        (window as any).reacg_global?.text?.no_data || undefined;

      loadMoreText && setLoadMoreText?.(loadMoreText);
      noDataText && setNoDataText?.(noDataText);
      setImageCount(newImageCount);

      if (paginationType === PaginationType.SIMPLE) {
        setImages(newImages);
        changeImagesCount?.(newImages.length);
      } else {
        setImages((prevImages) => [...prevImages, ...newImages]);
        changeImagesCount?.(newImages.length);
      }
      setCurrentPage(page);
      setIsLoading(false);
    } else {
      setImages(propsImages);
      changeImagesCount?.(propsImages.length);
      setIsLoading(false);
    }
  };

  const onPageChange = async (
    _event?: any,
    newPage: number = currentPage + 1
  ): Promise<void> => {
    getData(newPage);
  };

  const onReloadData = async () => {
    changeImagesCount?.(0);
    setLightboxImages([]);
    setCurrentPage(0);
    setImageCount(0);
    getData(1);
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
    <DataContext.Provider
      value={{
        images,
        lightboxImages,
        isLoading,
        pagesCount,
        onPageChange,
        isFullyLoaded,
        loadAllLightboxImages,
      }}
    >
      {images.length || isLoading ? children : renderContentPlaceholder()}
      <DataFetcher onClick={onReloadData} />
    </DataContext.Provider>
  );
};

export {DataContext, DataProvider};
