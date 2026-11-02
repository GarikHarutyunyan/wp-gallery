import {Paper, Typography} from '@mui/material';
import axios, {CancelTokenSource} from 'axios';
import {useAppInfo} from 'contexts/AppInfoContext';
import {TranslationsContext} from 'contexts/TranslationsContext';
import {
  GalleryType,
  ICategoryDTO,
  IGeneralSettings,
  IImageDTO,
  PaginationType,
} from 'data-structures';
import useUpdateEffect from 'hooks/useUpdateEffect';
import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {DataFetcher} from '../grid-gallery/DataFetcher';
import {useSettings} from '../settings';

const propsImages: IImageDTO[] = [];

const DataContext = createContext<{
  images?: IImageDTO[];
  lightboxImages?: IImageDTO[];
  isLoading?: boolean;
  pagesCount?: number;
  onPageChange?: (_: any, page: number) => void;
  onSearch?: (newSearchTerm: string) => void;
  currentPage?: number;
  itemsPerPage?: number;
  isFullyLoaded?: boolean;
  loadAllLightboxImages?: () => Promise<void>;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  availableCategories?: ICategoryDTO[];
  selectedSorting?: string;
  onSortingChange?: (sorting: string) => void;
}>({});

const DataProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const {
    type,
    generalSettings,
    gridSettings,
    mosaicSettings,
    justifiedSettings,
    masonrySettings,
    blogSettings,
    changeImagesCount,
  } = useSettings();

  const paginationType: PaginationType = useMemo(() => {
    if (type === GalleryType.MOSAIC) {
      return mosaicSettings!.paginationType;
    }
    if (type === GalleryType.JUSTIFIED) {
      return justifiedSettings!.paginationType;
    }
    if (type === GalleryType.GRID) {
      return gridSettings!.paginationType;
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
    gridSettings?.paginationType,
    masonrySettings?.paginationType,
    blogSettings?.paginationType,
  ]);

  const showAllItems: boolean = useMemo(() => {
    if (type === GalleryType.MOSAIC) {
      return mosaicSettings!.showAllItems;
    }
    if (type === GalleryType.JUSTIFIED) {
      return justifiedSettings!.showAllItems;
    }
    if (type === GalleryType.GRID) {
      return gridSettings!.showAllItems;
    }
    if (type === GalleryType.MASONRY) {
      return masonrySettings!.showAllItems;
    }
    if (type === GalleryType.BLOG) {
      return blogSettings!.showAllItems;
    }

    return true;
  }, [
    type,
    mosaicSettings?.showAllItems,
    justifiedSettings?.showAllItems,
    gridSettings?.showAllItems,
    masonrySettings?.showAllItems,
    blogSettings?.showAllItems,
  ]);

  const {
    itemsPerPage = 1,
    orderBy = 'default',
    orderDirection = 'asc',
  } = generalSettings as IGeneralSettings;
  const {galleryId, baseUrl, getGalleryTimestamp} = useAppInfo();
  const {
    noDataText,
    setLoadMoreText,
    setNoDataText,
    setSearchPlaceholder,
    setAllText,
  } = useContext(TranslationsContext);
  const [images, setImages] = useState<IImageDTO[]>([]);
  const [lightboxImages, setLightboxImages] = useState<
    IImageDTO[] | undefined
  >();
  const [imageCount, setImageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSorting, setSelectedSorting] = useState<string>('default');
  const [availableCategories, setAvailableCategories] = useState<ICategoryDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pagesCount: number =
    itemsPerPage > 0 ? Math.ceil(imageCount / itemsPerPage) : imageCount;
  const isFullyLoaded: boolean = currentPage >= pagesCount;
  const cancelTokenSourceRef = useRef<CancelTokenSource | null>(null);
  const lastRequestRef = useRef<{
    page: number;
    search: string;
    itemsPerPage: number;
  } | null>(null);
  useEffect(() => {
    changeImagesCount?.(0);
    setLightboxImages([]);
    setCurrentPage(0);
    setImageCount(0);
    const allData = (window as any).reacg_data;
    const currentData = allData?.[galleryId as string];
    const hasFirstChunk: boolean = currentData?.images?.length;
    if (!hasFirstChunk) {
      getData(1);
    } else {
      getDataFromWindow(1);
    }

    // setIsFetched(true);
  }, []);

  useUpdateEffect(() => {
    itemsPerPage > 0 && onReloadData();
  }, [itemsPerPage, paginationType, showAllItems, orderBy, orderDirection]);

  const loadAllLightboxImages = async (gid?: string): Promise<void> => {
    if (
      gid ||
      ((!lightboxImages || lightboxImages.length < imageCount) &&
        images.length < imageCount)
    ) {
      const newLightboxImages: IImageDTO[] = await (getAllData as Function)(
        gid
      );

      setLightboxImages(newLightboxImages);
    } else if (images.length == imageCount) {
      setLightboxImages(images);
    }
  };

  const getAllData = async (gid?: string): Promise<IImageDTO[]> => {
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'gallery/' + (gid || galleryId) + '/images'
      : undefined;
    if (fetchUrl) {
      const queryStringSeperator: string = fetchUrl.includes('?') ? '&' : '?';
      let queryString = queryStringSeperator;

      queryString += `order_by=${orderBy}`;
      queryString += `&order=${orderDirection}`;
      queryString += `&s=${searchTerm}`;
      queryString += `&timestamp=${getGalleryTimestamp?.()}`;
      const imgData: any[] = (await axios.get(`${fetchUrl}${queryString}`))
        .data;
      const newImages: IImageDTO[] = imgData.map((data: any) => ({
        id: data.id,
        type: data.type,
        original: data.original,
        sizes: data.sizes.length ? data.sizes : [data.original],
        width: data.width,
        height: data.height,
        title: data.title,
        description: data.description,
        author: data.author,
        date_created: data.date_created,
        exif: (
          <>
            {data.exif.split('\n').map((line: string) => (
              <>
                {line}
                <br />
              </>
            ))}
          </>
        ),
        caption: data.caption,
        price: data.price,
        alt: data.alt,
        action_url: data.action_url,
        item_url: data.item_url,
        checkout_url: data.checkout_url,
        crop_position: data.crop_position || 'center center',
        image_title: data.image_title || '',
        image_caption: data.image_caption || '',
        image_alt: data.image_alt || '',
        image_description: data.image_description || '',
        categories: data.categories || [],
      }));

      return newImages;
    }
    return images;
  };

  const getDataFromWindow = (page: number) => {
    setImages([]);

    const data = (window as any).reacg_data[galleryId as string];
    const imgData: any[] = data.images;
    const newImageCount: number = data.imagesCount;
    const newImages: IImageDTO[] = imgData.map((data: any) => ({
      id: data.id,
      type: data.type,
      original: data.original,
      sizes: data.sizes.length ? data.sizes : [data.original],
      width: data.width,
      height: data.height,
      title: data.title,
      caption: data.caption,
      price: data.price,
      alt: data.alt,
      description: data.description,
      author: data.author,
      date_created: data.date_created,
      exif: (
        <>
          {data.exif.split('\n').map((line: string) => (
            <>
              {line}
              <br />
            </>
          ))}
        </>
      ),
      action_url: data.action_url,
      item_url: data.item_url,
      checkout_url: data.checkout_url,
      crop_position: data.crop_position || 'center center',
      image_title: data.image_title || '',
      image_caption: data.image_caption || '',
      image_alt: data.image_alt || '',
      image_description: data.image_description || '',
      categories: data.categories || [],
    }));

    if (Array.isArray(data.categories) && data.categories.length > 0) {
      setAvailableCategories(data.categories);
    } else if (Array.isArray(imgData)) {
      const catsMap: {[key: string]: ICategoryDTO} = {};
      imgData.forEach((item: any) => {
        if (Array.isArray(item.categories)) {
          item.categories.forEach((cat: any) => {
            const key = cat.slug || cat.name;
            if (!catsMap[key]) {
              catsMap[key] = {id: cat.id, name: cat.name, slug: key, count: 0};
            }
            catsMap[key].count = (catsMap[key].count || 0) + 1;
          });
        }
      });
      const derived = Object.values(catsMap);
      if (derived.length > 0) {
        setAvailableCategories(derived);
      }
    }

    const loadMoreText: string | undefined =
      (window as any).reacg_global?.text?.load_more || undefined;
    const noDataText: string | undefined =
      (window as any).reacg_global?.text?.no_data || undefined;
    const searchPlaceHolder: string | undefined =
      (window as any).reacg_global?.text?.search || undefined;
    const allText: string | undefined =
      (window as any).reacg_global?.text?.all || undefined;

    loadMoreText && setLoadMoreText?.(loadMoreText);
    noDataText && setNoDataText?.(noDataText);
    searchPlaceHolder && setSearchPlaceholder?.(searchPlaceHolder);
    allText && setAllText?.(allText);
    setImageCount(newImageCount);

    setImages(newImages);
    changeImagesCount?.(newImages.length);
    setCurrentPage(page);
  };

  const getData = async (
    page: number,
    search: string = searchTerm,
    category: string = selectedCategory,
    sorting: string = selectedSorting
  ) => {
    if (cancelTokenSourceRef.current) {
      cancelTokenSourceRef.current.cancel(
        'Operation canceled due to new request.'
      );
    }

    const newCancelTokenSource = axios.CancelToken.source();
    cancelTokenSourceRef.current = newCancelTokenSource;
    lastRequestRef.current = {page, search, itemsPerPage};

    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'gallery/' + galleryId + '/images'
      : undefined;

    if (fetchUrl) {
      setIsLoading(true);

      if (page === 1) {
        setImages([]);
      }

      let sortOrderBy = orderBy;
      let sortOrder = orderDirection;
      if (sorting === 'date_desc') {
        sortOrderBy = 'date';
        sortOrder = 'desc';
      } else if (sorting === 'date_asc') {
        sortOrderBy = 'date';
        sortOrder = 'asc';
      } else if (sorting === 'title_asc') {
        sortOrderBy = 'title';
        sortOrder = 'asc';
      } else if (sorting === 'title_desc') {
        sortOrderBy = 'title';
        sortOrder = 'desc';
      }

      const queryStringSeperator: string = fetchUrl.includes('?') ? '&' : '?';
      let queryString = queryStringSeperator;
      queryString += `order_by=${sortOrderBy}`;
      queryString += `&order=${sortOrder}`;
      queryString += `&s=${encodeURIComponent(search)}`;
      queryString += `&timestamp=${getGalleryTimestamp?.()}`;
      if (category && category !== 'all') {
        queryString += `&category=${encodeURIComponent(category)}`;
      }
      if (paginationType !== PaginationType.NONE || !showAllItems) {
        queryString += `&page=${page}`;
        queryString += `&per_page=${itemsPerPage}`;
      }
      try {
        const response = await axios.get(`${fetchUrl}${queryString}`, {
          cancelToken: newCancelTokenSource.token,
        });
        const imgData: any[] = response.data;
        const headers: any = response.headers;
        const newImages: IImageDTO[] = imgData.map((data: any) => ({
          id: data.id,
          type: data.type,
          original: data.original,
          sizes: data.sizes.length ? data.sizes : [data.original],
          width: data.width,
          height: data.height,
          title: data.title,
          caption: data.caption,
          price: data.price,
          alt: data.alt,
          description: data.description,
          author: data.author,
          date_created: data.date_created,
          exif: (
            <>
              {data.exif.split('\n').map((line: string) => (
                <>
                  {line}
                  <br />
                </>
              ))}
            </>
          ),
          action_url: data.action_url,
          item_url: data.item_url,
          checkout_url: data.checkout_url,
          crop_position: data.crop_position || 'center center',
          image_title: data.image_title || '',
          image_caption: data.image_caption || '',
          image_alt: data.image_alt || '',
          image_description: data.image_description || '',
          categories: data.categories || [],
        }));
        const newImageCount: number = headers?.['x-images-count'];

        const rawCategories = headers?.['x-images-categories'];
        if (rawCategories) {
          try {
            const parsed = JSON.parse(decodeURIComponent(rawCategories));
            if (Array.isArray(parsed) && parsed.length > 0) {
              setAvailableCategories(parsed);
            }
          } catch (e) {}
        } else if (Array.isArray(imgData)) {
          const catsMap: {[key: string]: ICategoryDTO} = {};
          imgData.forEach((item: any) => {
            if (Array.isArray(item.categories)) {
              item.categories.forEach((cat: any) => {
                const key = cat.slug || cat.name;
                if (!catsMap[key]) {
                  catsMap[key] = {id: cat.id, name: cat.name, slug: key, count: 0};
                }
                catsMap[key].count = (catsMap[key].count || 0) + 1;
              });
            }
          });
          const derived = Object.values(catsMap);
          if (derived.length > 0) {
            setAvailableCategories(derived);
          }
        }

        const loadMoreText: string | undefined =
          (window as any).reacg_global?.text?.load_more || undefined;
        const noDataText: string | undefined =
          (window as any).reacg_global?.text?.no_data || undefined;
        const searchPlaceHolder: string | undefined =
          (window as any).reacg_global?.text?.search || undefined;
        const allText: string | undefined =
          (window as any).reacg_global?.text?.all || undefined;
        loadMoreText && setLoadMoreText?.(loadMoreText);
        noDataText && setNoDataText?.(noDataText);
        searchPlaceHolder && setSearchPlaceholder?.(searchPlaceHolder);
        allText && setAllText?.(allText);
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
        setLightboxImages(newImages);
      } catch (error: any) {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.error('Error loading images:', error);
        }
      }
    } else {
      const allWinData =
        (window as any).reacg_data?.[galleryId as string]?.images || propsImages;
      let filtered: IImageDTO[] = Array.isArray(allWinData) ? [...allWinData] : [];
      if (category && category !== 'all') {
        filtered = filtered.filter((img: any) =>
          img.categories?.some(
            (c: any) =>
              c.slug === category ||
              String(c.id) === category ||
              c.name === category
          )
        );
      }
      if (search) {
        filtered = filtered.filter((img: any) =>
          (img.title || '').toLowerCase().includes(search.toLowerCase())
        );
      }
      if (sorting === 'title_asc') {
        filtered.sort((a: any, b: any) =>
          (a.title || '').localeCompare(b.title || '')
        );
      } else if (sorting === 'title_desc') {
        filtered.sort((a: any, b: any) =>
          (b.title || '').localeCompare(a.title || '')
        );
      }
      setImages(filtered);
      changeImagesCount?.(filtered.length);
      setIsLoading(false);
    }
  };

  const onPageChange = async (
    _event?: any,
    newPage: number = currentPage + 1
  ): Promise<void> => {
    await getData(newPage, searchTerm, selectedCategory, selectedSorting);
  };

  const onSearch = async (newSearchTerm: string = ''): Promise<void> => {
    setCurrentPage(0);
    setSearchTerm(newSearchTerm);
    getData(1, newSearchTerm, selectedCategory, selectedSorting);
  };

  const onCategoryChange = async (newCategory: string = 'all'): Promise<void> => {
    setSelectedCategory(newCategory);
    setCurrentPage(0);
    getData(1, searchTerm, newCategory, selectedSorting);
  };

  const onSortingChange = async (newSorting: string = 'default'): Promise<void> => {
    setSelectedSorting(newSorting);
    setCurrentPage(0);
    getData(1, searchTerm, selectedCategory, newSorting);
  };

  const onReloadData = async (fromWindow: boolean = false) => {
    changeImagesCount?.(0);
    setLightboxImages([]);
    setCurrentPage(0);
    setImageCount(0);

    if (fromWindow) {
      getDataFromWindow(1);
      return;
    }

    getData(1, searchTerm, selectedCategory, selectedSorting);
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
        onSearch,
        currentPage,
        itemsPerPage,
        isFullyLoaded,
        loadAllLightboxImages,
        selectedCategory,
        onCategoryChange,
        availableCategories,
        selectedSorting,
        onSortingChange,
      }}
    >
      {children}
      {!images.length && !isLoading && renderContentPlaceholder()}
      <DataFetcher onClick={onReloadData} />
    </DataContext.Provider>
  );
};

export {DataContext, DataProvider};
