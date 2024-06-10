import {Box} from '@mui/material';
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
import React, {useEffect, useMemo, useState} from 'react';
import Lightbox, {SlideshowRef} from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/plugins/captions.css';
import Inline from 'yet-another-react-lightbox/plugins/inline';
import YARLSlideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Video from 'yet-another-react-lightbox/plugins/video';
import './slideshow.css';

const Slideshow: React.FC = () => {
  const {slideshowSettings: settings} = useSettings();
  const {images} = useData();
  const {
    width,
    height,
    // areControlButtonsShown,
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
    captionsPosition,
    captionFontFamily,
    captionColor,
  } = settings as ISlideshowSettings;
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [videoAutoplay, setVideoAutoplay] = useState<boolean>(false);
  const slideshowRef = React.useRef<SlideshowRef>(null);
  const plugins = useMemo<any[]>(() => {
    const newPlugins: any[] = [Inline, Video];
    if (isSlideshowAllowed || autoplay) {
      newPlugins.push(YARLSlideshow as any);
    }
    if (thumbnailsPosition !== LightboxThumbnailsPosition.NONE) {
      newPlugins.push(Thumbnails as any);
    }
    if (captionsPosition !== LightboxCaptionsPosition.NONE) {
      newPlugins.push(Captions as any);
    }

    return newPlugins;
  }, [isSlideshowAllowed, autoplay, thumbnailsPosition, captionsPosition]);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
          <p
            className={'reacg-slideshow-captions__title'}
            style={{color: captionColor, fontFamily: captionFontFamily}}
          >
            {image.title}
          </p>
          <p
            className={'reacg-slideshow-captions__description'}
            style={{color: captionColor, fontFamily: captionFontFamily}}
          >
            {image.description}
          </p>
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
  }, [images, captionColor, captionFontFamily]);

  return (
    <Box
      sx={{
        width: `${Math.min(innerWidth, width)}px`,
        height: `${Math.min(innerHeight, height)}px`,
        mx: 'auto',
      }}
    >
      <Lightbox
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
              captionsPosition !== LightboxCaptionsPosition.NONE,
            'reacg-slideshow-captions_top': [
              LightboxCaptionsPosition.TOP,
              LightboxCaptionsPosition.ABOVE,
            ].includes(captionsPosition),
            'reacg-slideshow-captions_below':
              captionsPosition === LightboxCaptionsPosition.BELOW,
            'reacg-slideshow-captions_above':
              captionsPosition === LightboxCaptionsPosition.ABOVE,
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
        }}
        on={{
          slideshowStart: () => {
            if (!videoAutoplay) setVideoAutoplay(true);
          },
          slideshowStop: () => {
            if (videoAutoplay) setVideoAutoplay(false);
          },
        }}
      />
    </Box>
  );
};

export {Slideshow};
