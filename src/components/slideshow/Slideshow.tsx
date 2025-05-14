import Box from '@mui/material/Box';
import clsx from 'clsx';
import {useData} from 'components/data-context/useData';
import {getSlideMargins} from 'components/lightbox/CommonFunctions/getSlideMargins';
import {Captions} from 'components/lightbox/CustomCaptions/Captions';
import {useSettings} from 'components/settings';
import {
  IImageDTO,
  ISlideshowSettings,
  LightboxImageAnimation,
  LightboxTextsPosition,
  LightboxThumbnailsPosition,
} from 'data-structures';
import React, {ReactElement, useEffect, useMemo, useState} from 'react';
import Lightbox, {SlideshowRef} from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/plugins/captions.css';
import Inline from 'yet-another-react-lightbox/plugins/inline';
import YARLSlideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';

import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Video from 'yet-another-react-lightbox/plugins/video';
import 'yet-another-react-lightbox/styles.css';
import './slideshow.css';

interface ISlideshowProps {
  onClick?: (index: number) => void;
}

const Slideshow = ({onClick}: ISlideshowProps): ReactElement => {
  const {slideshowSettings: settings, wrapperRef} = useSettings();
  const {images} = useData();
  const {
    width,
    height,
    isInfinite,
    padding,
    isSlideshowAllowed,
    autoplay,
    slideDuration,
    imageAnimation,
    thumbnailsPosition,
    thumbnailWidth,
    thumbnailHeight,
    thumbnailBorder,
    thumbnailBorderRadius,
    thumbnailBorderColor,
    thumbnailPadding,
    thumbnailGap,
    backgroundColor,
    textPosition,
    textFontFamily,
    textColor,
    showTitle,
    titleFontSize,
    titleAlignment,
    showDescription,
    descriptionFontSize,
    descriptionMaxRowsCount,
    isFullCoverImage,
  } = settings as ISlideshowSettings;
  const wrapper = wrapperRef.current;
  const [innerWidth, setInnerWidth] = useState<number>(
    wrapper?.clientWidth || width
  );
  const [videoAutoplay, setVideoAutoplay] = useState<boolean>(false);
  const [index, setIndex] = useState(0);

  const slideshowRef = React.useRef<SlideshowRef>(null);

  const showThumbnails: boolean =
    thumbnailsPosition !== LightboxThumbnailsPosition.END;
  const minHeight: number = showThumbnails
    ? thumbnailHeight + thumbnailPadding * 2
    : height;
  const ratio: number = width / height;
  const containerWidth: number = Math.min(innerWidth, width);
  const containerHeight: number = Math.max(minHeight, containerWidth / ratio);
  const minFactor = 1.45;
  const maxFactor = 1.25;
  const paddingAroundText = 10;
  const titleMargin = 4;

  const plugins = useMemo<any[]>(() => {
    const newPlugins: any[] = [Inline, Video];
    if (isSlideshowAllowed || autoplay) {
      newPlugins.push(YARLSlideshow as any);
    }
    if (thumbnailsPosition !== LightboxThumbnailsPosition.NONE) {
      newPlugins.push(Thumbnails as any);
    }
    if (textPosition !== LightboxTextsPosition.NONE) {
      newPlugins.push(Captions as any);
    }

    return newPlugins;
  }, [isSlideshowAllowed, autoplay, thumbnailsPosition, textPosition]);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(wrapper?.clientWidth || width);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [wrapper?.clientWidth]);

  useEffect(() => {
    if (autoplay) {
      slideshowRef.current?.play();
    } else {
      slideshowRef.current?.pause();
    }
  }, [autoplay]);

  const slides = useMemo(() => {
    return images!.map((image: IImageDTO) => ({
      description: (
        <>
          {showTitle && image.title && (
            <p
              className={'reacg-slideshow-texts__title'}
              style={{
                margin: `${titleMargin}px 0`,
                color: textColor,
                fontFamily: textFontFamily,
                fontSize: `clamp(${
                  titleFontSize / minFactor
                }rem, ${titleFontSize}vw, ${titleFontSize * maxFactor}rem)`,
                textAlign: titleAlignment,
              }}
            >
              {image.title}
            </p>
          )}

          {showDescription && image.description && (
            <p
              className={'reacg-slideshow-texts__description'}
              style={{
                color: textColor,
                fontFamily: textFontFamily,
                fontSize: `clamp(${
                  descriptionFontSize / minFactor
                }rem,${descriptionFontSize}vw ,${
                  descriptionFontSize * maxFactor
                }rem)`,
                WebkitLineClamp: descriptionMaxRowsCount,
                WebkitBoxOrient: 'vertical',
                display: '-webkit-box',
              }}
            >
              {image.description}
            </p>
          )}
        </>
      ),
      type: image.type,
      sources: [
        {
          src: image.original.url,
          type: `video/${image.original.url.split('.').pop()}`,
        },
      ],
      poster: image.medium_large.url,
      src: image.original.url,
      alt: image.alt,
      srcSet: [
        {
          src: image.original.url,
          width: image.original.width,
          height: image.original.height,
        },
        {
          src: image.large.url,
          width: image.large.width,
          height: image.large.height,
        },
        {
          src: image.medium_large.url,
          width: image.medium_large.width,
          height: image.medium_large.height,
        },
        {
          src: image.thumbnail.url,
          width: image.thumbnail.width,
          height: image.thumbnail.height,
        },
      ],
      metadata: image.thumbnail.url,
    }));
  }, [
    images,
    textColor,
    textFontFamily,
    showTitle,
    titleFontSize,
    titleAlignment,
    showDescription,
    descriptionFontSize,
    descriptionMaxRowsCount,
  ]);

  const slideMargins = useMemo(() => {
    return getSlideMargins({
      images,
      index,
      showTitle,
      showDescription,
      textPosition,
      titleFontSize,
      descriptionFontSize,
      descriptionMaxRowsCount,
      minFactor,
      maxFactor,
      paddingAroundText,
      titleMargin,
    });
  }, [
    images,
    index,
    showTitle,
    showDescription,
    textPosition,
    titleFontSize,
    descriptionFontSize,
    descriptionMaxRowsCount,
  ]);

  useEffect(() => {
    setIndex(0);
  }, [isInfinite]);

  return (
    <Box
      sx={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        mx: 'auto',
      }}
    >
      <Lightbox
        index={index}
        plugins={plugins}
        slideshow={{
          autoplay,
          delay: slideDuration > 700 ? slideDuration : 700,
          ref: slideshowRef,
        }}
        slides={slides}
        animation={{
          swipe: imageAnimation === LightboxImageAnimation.SLIDEH ? 500 : 1,
          easing: {swipe: 'ease-out', navigation: 'ease-in-out'},
        }}
        render={{
          buttonSlideshow: isSlideshowAllowed ? undefined : () => null,
        }}
        carousel={{
          preload: 5,
          finite: !isInfinite,
          padding,
        }}
        thumbnails={{
          position: thumbnailsPosition as any,
          width: thumbnailWidth > 0 ? thumbnailWidth : 10,
          height: thumbnailHeight > 0 ? thumbnailHeight : 10,
          border: thumbnailBorder,
          padding: 0,
          gap: thumbnailGap,
          imageFit: 'cover',
          vignette: false,
        }}
        video={{
          autoPlay: videoAutoplay,
        }}
        className={clsx(
          'reacg-slideshow',
          'reacg-slideshow-animation-' + imageAnimation,
          {
            // 'reacg-slideshow-control-buttons_hidden': !areControlButtonsShown,
            'reacg-slideshow-texts':
              textPosition !== LightboxTextsPosition.NONE,
            'reacg-slideshow-texts_top': [
              LightboxTextsPosition.TOP,
              LightboxTextsPosition.ABOVE,
            ].includes(textPosition),
            'reacg-slideshow-is-full-cover-image': isFullCoverImage,
          }
        )}
        styles={{
          root: {
            'margin': 'auto',
            '--yarl__thumbnails_container_padding': `${thumbnailPadding}px`,
            '--yarl__thumbnails_container_background_color': `${backgroundColor}`,
            '--yarl__slide_captions_container_padding': `${paddingAroundText}px`,
            '--yarl__slide_captions_container_background':
              (showTitle && images![index]?.title) ||
              (showDescription && images![index]?.description)
                ? `${backgroundColor}80`
                : `none`,
          },
          thumbnail: {
            '--yarl__thumbnails_thumbnail_active_border_color':
              thumbnailBorderColor || 'transparent',
            '--yarl__thumbnails_thumbnail_border_color':
              thumbnailBorderColor || 'transparent',
            '--yarl__thumbnails_thumbnail_border_radius': `${thumbnailBorderRadius}%`,
          },
          toolbar: {
            marginTop: slideMargins.marginTop,
            marginBottom: slideMargins.marginBottom,
          },
          navigationPrev: {
            marginTop: slideMargins.marginTop,
            marginBottom: slideMargins.marginBottom,
            ...(slideMargins.marginTop || slideMargins.marginBottom
              ? {transform: 'translateY(0%)', top: 'auto'}
              : {}),
          },
          navigationNext: {
            marginTop: `${slideMargins.marginTop}`,
            marginBottom: `${slideMargins.marginBottom}`,
            ...(slideMargins.marginTop || slideMargins.marginBottom
              ? {transform: 'translateY(0%)', top: 'auto'}
              : {}),
          },

          container: {
            backgroundColor: `${backgroundColor}`,
          },
          slide: {
            cursor: onClick ? 'pointer' : undefined,
            marginTop: slideMargins.marginTop,
            marginBottom: slideMargins.marginBottom,
          },
        }}
        on={{
          slideshowStart: () => {
            if (!videoAutoplay) setVideoAutoplay(true);
          },
          slideshowStop: () => {
            if (videoAutoplay) setVideoAutoplay(false);
          },
          view: ({index: currentIndex}) => setIndex(currentIndex),
          click: ({index: currentIndex}) => onClick?.(currentIndex),
        }}
      />
    </Box>
  );
};

export {Slideshow};
export default Slideshow;
