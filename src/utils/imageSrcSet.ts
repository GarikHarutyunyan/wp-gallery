import {IImageDTO} from 'data-structures';

export interface ISrcSetItem {
  src: string;
  width: number;
  height: number;
}

interface IBuildImageSrcSetOptions {
  includeThumbnail?: boolean;
  includeMediumLarge?: boolean;
  includeLarge?: boolean;
  includeOriginal?: boolean;
  maxDimension?: number;
}

const DEFAULT_MAX_DIMENSION = 2000;

const isValidSrcItem = (item: Partial<ISrcSetItem>): item is ISrcSetItem => {
  return Boolean(item.src) && Number(item.width) > 0 && Number(item.height) > 0;
};

const getItemMaxDimension = (item: ISrcSetItem): number =>
  Math.max(item.width, item.height);

const deduplicateBySrc = (items: ISrcSetItem[]): ISrcSetItem[] => {
  const map = new Map<string, ISrcSetItem>();

  items.forEach((item) => {
    if (!map.has(item.src)) {
      map.set(item.src, item);
    }
  });

  return Array.from(map.values());
};

export const buildImageSrcSet = (
  image: IImageDTO,
  options: IBuildImageSrcSetOptions = {}
): ISrcSetItem[] => {
  const {
    includeThumbnail = true,
    includeMediumLarge = true,
    includeLarge = true,
    includeOriginal = true,
    maxDimension = DEFAULT_MAX_DIMENSION,
  } = options;

  const candidates = deduplicateBySrc(
    [
      includeThumbnail
        ? {
            src: image.thumbnail.url,
            width: image.thumbnail.width,
            height: image.thumbnail.height,
          }
        : null,
      includeMediumLarge
        ? {
            src: image.medium_large.url,
            width: image.medium_large.width,
            height: image.medium_large.height,
          }
        : null,
      includeLarge
        ? {
            src: image.large.url,
            width: image.large.width,
            height: image.large.height,
          }
        : null,
      includeOriginal
        ? {
            src: image.original.url,
            width: image.original.width,
            height: image.original.height,
          }
        : null,
    ].filter((item): item is ISrcSetItem =>
      Boolean(item && isValidSrcItem(item))
    )
  );

  if (candidates.length === 0) {
    return [];
  }

  const allowed = candidates
    .filter((item) => getItemMaxDimension(item) <= maxDimension)
    .sort((a, b) => a.width - b.width);

  if (allowed.length > 0) {
    return allowed;
  }

  // Fallback: if no downsized variant exists, keep the smallest available source.
  const fallback = candidates.reduce((smallest, current) => {
    return getItemMaxDimension(current) < getItemMaxDimension(smallest)
      ? current
      : smallest;
  });

  return [fallback];
};

export const buildImageSrcSetString = (
  image: IImageDTO,
  options: IBuildImageSrcSetOptions = {}
): string | undefined => {
  const srcSet = buildImageSrcSet(image, options)
    .map((item) => `${item.src} ${item.width}w`)
    .join(', ');

  return srcSet || undefined;
};
