import {IImageDTO} from 'data-structures';

const loadImagesInRange = (
  swiperRef: any,
  images: IImageDTO[],
  startIndex: number,
  endIndex: number
) => {
  const swiper = swiperRef?.current?.swiper;
  if (!swiper || !images) return;
  console.log(startIndex, endIndex);
  for (let i = startIndex; i <= endIndex; i++) {
    const slide = swiper.slides[i];
    if (!slide) continue;

    let realIndex = slide.getAttribute('data-swiper-slide-index');
    if (realIndex === null) {
      realIndex = swiper.realIndex + (i - swiper.activeIndex);
    }
    const image = images[realIndex];
    const imgElement = slide.querySelector('img') as HTMLImageElement;
    console.log(imgElement, 'asssss');
    if (
      imgElement &&
      image &&
      (!imgElement.src || imgElement.src === undefined)
    ) {
      console.log(imgElement);
      imgElement.setAttribute('src', image.original.url);
      imgElement.setAttribute(
        'srcSet',
        `${image.thumbnail.url} ${image.thumbnail.width}w, ` +
          `${image.medium_large.url} ${image.medium_large.width}w, ` +
          `${image.original.url} ${image.original.width}w`
      );
    }
  }
};

export const handleSlideChange = (
  swiperRef: any,
  images: IImageDTO[],
  preloadCount: number
) => {
  const swiper = swiperRef.current?.swiper;
  if (!swiper || !images?.length) return;

  const allLoaded = images.every((_, index) => {
    const slide = swiper.slides[index];
    const img = slide?.querySelector('img') as HTMLImageElement | null;
    return img?.src;
  });

  const activeIndex = swiper.activeIndex;
  const totalSlides = swiper.slides.length;
  console.log(preloadCount, 'preloadC');
  const preloadStart = Math.max(0, activeIndex - preloadCount);
  const preloadEnd = Math.min(totalSlides - 1, activeIndex + preloadCount);
  if (!allLoaded) {
    loadImagesInRange(swiperRef, images, preloadStart, preloadEnd);
  }
};
