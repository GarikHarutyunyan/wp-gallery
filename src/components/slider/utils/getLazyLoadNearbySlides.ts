import {IImageDTO} from 'data-structures';
import {getLargestSrcItem, getSrcSetString} from 'utils/imageSrcSet';
export const getLazyLoadNearbySlides = (swiper: any, images: IImageDTO[]) => {
  if (!images?.length) return;

  const total = images.length;
  const activeIndex = swiper.realIndex;

  const prevIndex = activeIndex - 1 < 0 ? total - 1 : activeIndex - 1;
  const nextIndex = activeIndex + 1 >= total ? 0 : activeIndex + 1;

  const indexesToLoad = new Set([prevIndex, activeIndex, nextIndex]);

  swiper.slides.forEach((slide: HTMLElement, i: number) => {
    const realIndexAttr = slide.getAttribute('data-swiper-slide-index');

    const realIndex = realIndexAttr !== null ? Number(realIndexAttr) : i;
    if (!indexesToLoad.has(realIndex)) return;

    const image = images[realIndex];
    if (!image) return;

    const img = slide.querySelector('img') as HTMLImageElement | null;
    if (img && !img.src) {
      const largest = getLargestSrcItem(image.sizes);
      const srcSet = getSrcSetString(image.sizes);

      img.src = largest.src;
      img.srcset = srcSet;
    }
  });
};
