import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import React, {useLayoutEffect, useRef} from 'react';
import {
  ImageFit,
  ImageSlide,
  Render,
  Slide,
  isImageSlide,
} from 'yet-another-react-lightbox';

const ThumbnailAriaLabel: React.FC<{
  label?: string;
  children: React.ReactNode;
}> = ({label, children}) => {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const button = ref.current?.closest(
      'button.yarl__thumbnails_thumbnail'
    ) as HTMLButtonElement | null;

    if (!button) {
      return;
    }

    if (label) {
      button.setAttribute('aria-label', label);
    } else {
      button.removeAttribute('aria-label');
    }
  }, [label]);

  return (
    <span ref={ref} style={{display: 'contents'}}>
      {children}
    </span>
  );
};

const getThumbnailLabel = (slide: Slide): string => {
  const slideData = slide as Slide & {
    share?: {title?: string};
    title?: unknown;
    alt?: string;
  };

  if (typeof slideData.share?.title === 'string' && slideData.share.title) {
    return slideData.share.title;
  }

  if (typeof slideData.title === 'string' && slideData.title) {
    return slideData.title;
  }

  return slideData.alt || '';
};

type RenderThumbnailProps = {
  slide: Slide;
  rect: {width: number; height: number};
  render: Render;
  imageFit: ImageFit;
};

const renderThumbnailWithAriaLabel = ({
  slide,
  render,
  rect,
  imageFit,
}: RenderThumbnailProps): React.ReactNode => {
  const label = getThumbnailLabel(slide);
  const playIconSize = Math.max(
    16,
    Math.min(rect.width, rect.height) * 0.45
  );

  if (isImageSlide(slide)) {
    return (
      <ThumbnailAriaLabel label={label}>
        <ImageSlide
          slide={slide}
          render={render}
          rect={rect}
          imageFit={imageFit}
        />
      </ThumbnailAriaLabel>
    );
  }

  if ((slide as {type?: string}).type === 'video') {
    const videoSlide = slide as Slide & {poster?: string};

    return (
      <ThumbnailAriaLabel label={label}>
        {videoSlide.poster ? (
          <ImageSlide
            slide={{src: videoSlide.poster}}
            render={render}
            rect={rect}
            imageFit={imageFit}
          />
        ) : null}
        <PlayArrowIcon
          className={'gallery__video-icon'}
          style={{fontSize: `${playIconSize}px`}}
        />
      </ThumbnailAriaLabel>
    );
  }

  return undefined;
};

export {renderThumbnailWithAriaLabel};
