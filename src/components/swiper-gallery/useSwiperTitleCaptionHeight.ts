import {RefObject, useEffect, useState} from 'react';

export const useSwiperTitleCaptionHeight = (
  galleryRef: RefObject<HTMLDivElement | null>,
  deps: unknown[]
): number => {
  const [titleCaptionHeight, setTitleCaptionHeight] = useState(0);

  useEffect(() => {
    if (!galleryRef.current) return;

    const measureTitleCaptionHeight = () => {
      if (!galleryRef.current) return;
      let maxAboveHeight = 0;
      let maxBelowHeight = 0;

      galleryRef.current
        .querySelectorAll<HTMLElement>('.swiper-slide')
        .forEach((slide) => {
          let slideAbove = 0;
          let slideBelow = 0;

          slide
            .querySelectorAll<HTMLElement>(
              '.swiper-gallery__above-items > .swiper-gallery__item-outline'
            )
            .forEach((el) => {
              slideAbove += el.offsetHeight;
            });

          slide
            .querySelectorAll<HTMLElement>(
              ':scope > .swiper-gallery__item-outline'
            )
            .forEach((el) => {
              slideBelow += el.offsetHeight;
            });

          if (slideAbove > maxAboveHeight) maxAboveHeight = slideAbove;
          if (slideBelow > maxBelowHeight) maxBelowHeight = slideBelow;
        });

      galleryRef.current.style.setProperty(
        '--reacg-above-height',
        `${maxAboveHeight}px`
      );
      setTitleCaptionHeight(maxAboveHeight + maxBelowHeight);
    };

    measureTitleCaptionHeight();
    const frameId = requestAnimationFrame(measureTitleCaptionHeight);

    const resizeObserver = new ResizeObserver(() => {
      measureTitleCaptionHeight();
    });

    const outlines = galleryRef.current.querySelectorAll(
      '.swiper-gallery__item-outline'
    );
    outlines.forEach((el) => resizeObserver.observe(el));

    const swiperSlide = galleryRef.current.querySelector(
      '.swiper-slide'
    ) as HTMLElement;
    if (swiperSlide) {
      resizeObserver.observe(swiperSlide);
    }

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return titleCaptionHeight;
};
