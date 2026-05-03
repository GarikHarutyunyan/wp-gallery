import {IScrollerItem} from './ScrollerItem';

const BREAKPOINT_MOBILE = 480;
const BREAKPOINT_TABLET = 768;
const SCALE_MOBILE = 0.62;
const SCALE_TABLET = 0.8;
const SCALE_DESKTOP = 1;

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
  const baseItemsWidth: number = baseItems.reduce(
    (sumOfWidth: number, item: IScrollerItem) => sumOfWidth + item.width,
    0
  );
  const baseItemsGap: number = Math.max(0, baseItems.length - 1) * (gap || 0);
  const totalBaseWidth = baseItemsWidth + baseItemsGap;

  const isSmallerThanContainer: boolean =
    totalBaseWidth > 0 && totalBaseWidth < containerWidth;
  const repeatCount: number = isSmallerThanContainer
    ? Math.ceil(containerWidth / totalBaseWidth)
    : 1;
  const result: IScrollerItem[] = [];

  for (let i = 0; i < repeatCount; i++) {
    baseItems.forEach((item) => {
      result.push(item);
    });
  }

  return result;
};
