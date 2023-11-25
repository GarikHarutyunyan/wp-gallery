import {useEffect, useRef, useState} from 'react';
import {IThumbnailGalleryProps, ThumbnailGallery} from './ThumbnailGallery';
import axios from 'axios';
import {IImageDTO, PaginationType} from 'data-structures';
import {DataFetcher} from './DataFetcher';
import {LightboxProvider} from 'components/lightbox/LightboxContext';
import {PaginationProvider} from './PaginationProvider';
import {IThumbnailSettings} from 'components/thumbnail-settings';
import {IAdvancedSettings} from 'components/advanced-settings';

interface IThumbnailGalleryWithDataFetchingProps {
  id: string;
  images: IImageDTO[];
  thumbnailSettings: IThumbnailSettings;
  advancedSettings: IAdvancedSettings;
}

const ThumbnailGalleryWithDataFetching = ({
  id,
  images: propsImages,
  thumbnailSettings,
  advancedSettings,
}: IThumbnailGalleryWithDataFetchingProps) => {
  const {itemsPerPage, paginationType} = advancedSettings;
  const [images, setImages] = useState<IImageDTO[]>([]);
  const [imageCount, setImageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const pagesCount: number = Math.ceil(imageCount / itemsPerPage);
  const isFullyLoaded: boolean = currentPage >= pagesCount;

  useEffect(() => {
    onReloadData();
  }, [itemsPerPage, paginationType]);

  const getData = async (page: number) => {
    const dataElement = document.getElementById(id);
    const fetchUrl: string = dataElement?.getAttribute(
      'data-get-images-url'
    ) as string;
    if (fetchUrl) {
      const perPageQueryString: string =
        paginationType !== PaginationType.NONE
          ? `&per_page=${itemsPerPage}`
          : '';
      const imgData: any[] = (
        await axios.get(`${fetchUrl}?page=${page}${perPageQueryString}`)
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
    } else {
      setImages(propsImages);
    }
  };

  const getItemsCount = async () => {
    const dataElement = document.getElementsByClassName('reacg-preview')?.[0];
    const fetchUrl: string = dataElement?.getAttribute(
      'data-get-gallery-url'
    ) as string;
    if (fetchUrl) {
      const imgData: any = (await axios.get(`${fetchUrl}`)).data;
      const newImageCount: number = imgData?.images_count;

      setImageCount(newImageCount);
    } else {
      setImageCount(0);
    }
  };

  useEffect(() => {
    getData(1);
    getItemsCount();
  }, []);

  const onPageChange = (_event?: any, newPage: number = currentPage + 1) => {
    return getData(newPage);
  };

  const onReloadData = () => {
    setImages([]);
    setCurrentPage(0);
    setImageCount(0);
    getData(1);
    getItemsCount();
  };

  return (
    <LightboxProvider images={images}>
      <ThumbnailGallery settings={thumbnailSettings} images={images} />
      <PaginationProvider
        type={paginationType}
        pagesCount={pagesCount}
        onLoad={onPageChange}
        isFullyLoaded={isFullyLoaded}
        settings={advancedSettings}
      />
      <DataFetcher onClick={onReloadData} />
    </LightboxProvider>
  );
};

export {ThumbnailGalleryWithDataFetching};
