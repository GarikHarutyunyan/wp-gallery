import React, {useEffect, useState} from 'react';
import {IThumbnailGalleryProps, ThumbnailGallery} from './ThumbnailGallery';
import axios from 'axios';
import {IImageDTO} from 'data-structures';
import {DataFetcher} from './DataFetcher';
import {LightboxProvider} from 'components/lightbox/LightboxContext';
import {useLightbox} from 'components/lightbox';

const ThumbnailGalleryWithDataFetching = (props: IThumbnailGalleryProps) => {
  const [images, setImages] = useState<IImageDTO[]>([]);

  const getData = async () => {
    const dataElement = document.getElementsByClassName('aig-preview')?.[0];
    const fetchUrl: string = dataElement?.getAttribute(
      'data-get-images-url'
    ) as string;
    if (fetchUrl) {
      const imgData: any[] = (await axios.get(fetchUrl)).data;
      const newImages: IImageDTO[] = imgData.map((data: any) => ({
        uri: data.url,
        title: data.title,
      }));

      setImages(newImages);
    } else {
      setImages(props.images);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <LightboxProvider images={images}>
      <ThumbnailGallery {...props} images={images} />
      <DataFetcher onClick={getData} />
    </LightboxProvider>
  );
};

export {ThumbnailGalleryWithDataFetching};
