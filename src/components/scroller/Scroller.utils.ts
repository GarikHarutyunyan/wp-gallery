import {IScrollerItem} from './ScrollerItem';

const BREAKPOINT_MOBILE = 480;
const BREAKPOINT_TABLET = 768;
const SCALE_MOBILE = 0.62;
const SCALE_TABLET = 0.8;
const SCALE_DESKTOP = 1;
const MIN_SCROLLER_CHUNK_WIDTH = 1;

export const MAX_SCROLLER_REPEAT_COUNT = 100;

export const getResponsiveScale = (width: number) => {
  if (width < BREAKPOINT_MOBILE) return SCALE_MOBILE;

  if (width < BREAKPOINT_TABLET) return SCALE_TABLET;

  return SCALE_DESKTOP;
};

export const fillWithClones = (
  baseItems: IScrollerItem[],
  gap: number,
  containerWidth: number
): IScrollerItem[] => {
  if (!baseItems.length) return [];

  const normalizedGap = Number.isFinite(gap) ? Math.max(0, gap) : 0;
  const normalizedContainerWidth =
    Number.isFinite(containerWidth) && containerWidth > 0 ? containerWidth : 0;
  const baseItemsWidth: number = baseItems.reduce(
    (sumOfWidth: number, item: IScrollerItem) =>
      sumOfWidth + (Number.isFinite(item.width) ? Math.max(0, item.width) : 0),
    0
  );
  const baseItemsGap: number =
    Math.max(0, baseItems.length - 1) * normalizedGap;
  const totalBaseWidth = baseItemsWidth + baseItemsGap;

  const isSmallerThanContainer: boolean =
    totalBaseWidth > 0 && totalBaseWidth < normalizedContainerWidth;
  const repeatCount: number = isSmallerThanContainer
    ? Math.min(
        Math.ceil(
          normalizedContainerWidth /
            Math.max(totalBaseWidth, MIN_SCROLLER_CHUNK_WIDTH)
        ),
        MAX_SCROLLER_REPEAT_COUNT
      )
    : 1;
  const result: IScrollerItem[] = [];

  for (let i = 0; i < repeatCount; i++) {
    baseItems.forEach((item) => {
      result.push(item);
    });
  }

  return result;
};

export const calculateRowChunkWidth = (
  rowItems: IScrollerItem[],
  gap: number
): number => {
  const normalizedGap = Number.isFinite(gap) ? Math.max(0, gap) : 0;
  const rowItemsWidth: number = rowItems.reduce(
    (sumOfWidth: number, item: IScrollerItem) =>
      sumOfWidth + (Number.isFinite(item.width) ? Math.max(0, item.width) : 0),
    0
  );
  const rowItemsGap: number = Math.max(0, rowItems.length - 1) * normalizedGap;
  const totalRowItemsWidth = rowItemsWidth + rowItemsGap;
  const rowChunkWidth: number = Math.max(
    totalRowItemsWidth + normalizedGap,
    MIN_SCROLLER_CHUNK_WIDTH
  );

  return rowChunkWidth;
};
