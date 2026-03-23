import {IImageSizeObject} from 'data-structures';

export interface ISrcSetItem {
  src: string;
  width: number;
  height: number;
}

export const getSrcSet = (sizes: IImageSizeObject[]): ISrcSetItem[] => {
  const srcSetItems: ISrcSetItem[] = sizes.map((size) => ({
    src: size.url,
    width: size.width,
    height: size.height,
  }));

  return srcSetItems;
};

export const getSrcSetString = (sizes: IImageSizeObject[]): string => {
  const srcSet: string = getSrcSet(sizes)
    .map((item) => `${item.src} ${item.width}w`)
    .join(', ');

  return srcSet;
};

export const getLargestSrcItem = (sizes: IImageSizeObject[]): ISrcSetItem => {
  const largest = sizes.reduce((max, current) => {
    return current.width > max.width ? current : max;
  }, sizes[0]);
  const largestSrcItem: ISrcSetItem = getSrcItemFromImageSizeObject(largest);

  return largestSrcItem;
};

export const getMedianSrcItem = (sizes: IImageSizeObject[]): ISrcSetItem => {
  const sortedSizes = [...sizes].sort((a, b) => a.width - b.width);
  const middleIndex = Math.floor((sortedSizes.length - 1) / 2);
  const medianSize = sortedSizes[middleIndex];
  const medianSrcItem: ISrcSetItem = getSrcItemFromImageSizeObject(medianSize);

  return medianSrcItem;
};

export const getSrcItemFromImageSizeObject = (
  sizeObj: IImageSizeObject
): ISrcSetItem => ({
  src: sizeObj.url,
  width: sizeObj.width,
  height: sizeObj.height,
});
