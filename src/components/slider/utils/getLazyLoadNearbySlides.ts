import {IImageDTO} from 'data-structures';

export const getLazyLoadNearbySlides = (swiper: any, images: IImageDTO[]) => {
  if (!images?.length) return;

  const total = images.length;
  const activeIndex = swiper.realIndex;

  const prevIndex = activeIndex - 1 < 0 ? total - 1 : activeIndex - 1;
  const nextIndex = activeIndex + 1 >= total ? 0 : activeIndex + 1;

  const indexesToLoad = new Set([prevIndex, activeIndex, nextIndex]);

  swiper.slides.forEach((slide: HTMLElement) => {
    const realIndexAttr = slide.getAttribute('data-swiper-slide-index');
    if (!realIndexAttr) return;

    const realIndex = Number(realIndexAttr);
    if (!indexesToLoad.has(realIndex)) return;

    const image = images[realIndex];
    if (!image) return;

    const img = slide.querySelector('img') as HTMLImageElement | null;
    if (img && !img.src) {
      img.src = image.original.url;
      img.srcset =
        `${image.thumbnail.url} ${image.thumbnail.width}w, ` +
        `${image.medium_large.url} ${image.medium_large.width}w, ` +
        `${image.original.url} ${image.original.width}w`;
    }
  });
};
