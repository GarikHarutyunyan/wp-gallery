import Box from '@mui/material/Box';
import clsx from 'clsx';
import {useData} from 'components/data-context/useData';
import {Captions} from 'components/lightbox/CustomCaptions/Captions';
import {useSettings} from 'components/settings';
import {
  IImageDTO,
  ISlideshowSettings,
  LightboxCaptionsPosition,
  LightboxImageAnimation,
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
  } = settings as ISlideshowSettings;
  const wrapper = wrapperRef.current;
  const [innerWidth, setInnerWidth] = useState<number>(
    wrapper?.clientWidth || width
  );
  const showThumbnails: boolean =
    thumbnailsPosition !== LightboxThumbnailsPosition.END;
  const minHeight: number = showThumbnails
    ? thumbnailHeight + thumbnailPadding * 2
    : height;
  const ratio: number = width / height;
  const containerWidth: number = Math.min(innerWidth, width);
  const containerHeight: number = Math.max(minHeight, containerWidth / ratio);
  const [videoAutoplay, setVideoAutoplay] = useState<boolean>(false);
  const [index, setIndex] = useState(0);

  const slideshowRef = React.useRef<SlideshowRef>(null);
  const plugins = useMemo<any[]>(() => {
    const newPlugins: any[] = [Inline, Video];
    if (isSlideshowAllowed || autoplay) {
      newPlugins.push(YARLSlideshow as any);
    }
    if (thumbnailsPosition !== LightboxThumbnailsPosition.NONE) {
      newPlugins.push(Thumbnails as any);
    }
    if (textPosition !== LightboxCaptionsPosition.NONE) {
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
              className={'reacg-slideshow-captions__title'}
              style={{
                color: textColor,
                fontFamily: textFontFamily,
                fontSize: titleFontSize,
                textAlign: titleAlignment,
              }}
            >
              {image.title}
            </p>
          )}
          {showDescription && image.description && (
            <p
              className={'reacg-slideshow-captions__description'}
              style={{
                color: textColor,
                fontFamily: textFontFamily,
                fontSize: descriptionFontSize,
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
    const hasCaptions = showTitle || showDescription;
    const titleSpace =
      showTitle && images![index].title ? titleFontSize * 1.5 : 0;
    const descriptionSpace =
      showDescription && images![index].description
        ? descriptionFontSize * 1.5 * (descriptionMaxRowsCount || 1)
        : 0;
    const extraSpace = 10;

    return {
      marginTop:
        textPosition === LightboxCaptionsPosition.ABOVE && hasCaptions
          ? titleSpace + descriptionSpace + extraSpace
          : 0,
      marginBottom:
        textPosition === LightboxCaptionsPosition.BELOW && hasCaptions
          ? titleSpace + descriptionSpace + extraSpace
          : 0,
    };
  }, [
    textPosition,
    showTitle,
    showDescription,
    titleFontSize,
    descriptionFontSize,
    descriptionMaxRowsCount,
    index,
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
        // #TODO add generic validation mechanism to avoid this kind of checkings
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
            'reacg-slideshow-captions':
              textPosition !== LightboxCaptionsPosition.NONE,
            'reacg-slideshow-captions_top': [
              LightboxCaptionsPosition.TOP,
              LightboxCaptionsPosition.ABOVE,
            ].includes(textPosition),
            'reacg-slideshow-captions_below':
              textPosition === LightboxCaptionsPosition.BELOW,
            'reacg-slideshow-captions_above':
              textPosition === LightboxCaptionsPosition.ABOVE,
          }
        )}
        styles={{
          root: {
            'margin': 'auto',
            '--yarl__thumbnails_container_padding': `${thumbnailPadding}px`,
            '--yarl__thumbnails_container_background_color': `${backgroundColor}`,
            '--yarl__slide_captions_container_background': `${backgroundColor}80`,
          },
          thumbnail: {
            '--yarl__thumbnails_thumbnail_active_border_color':
              thumbnailBorderColor || 'transparent',
            '--yarl__thumbnails_thumbnail_border_color':
              thumbnailBorderColor || 'transparent',
            '--yarl__thumbnails_thumbnail_border_radius': `${thumbnailBorderRadius}%`,
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
