import {IImageDTO, ISliderSettings} from 'data-structures';
import {forwardRef} from 'react';
import {getTextVerticalPosition} from './utils/getTextVerticalPosition';

interface SlideTextProps {
  image: IImageDTO;
  settings: ISliderSettings;
  variant: 'main' | 'thumb';
}

export const SlideText = forwardRef<HTMLDivElement, SlideTextProps>(
  ({image, settings, variant}, ref) => {
    const isThumb = variant === 'thumb';

    const textPosition = isThumb
      ? settings.thumbnailTextPosition
      : settings.textPosition;
    const textFontFamily = isThumb
      ? settings.thumbnailTextFontFamily
      : settings.textFontFamily;
    const textColor = isThumb
      ? settings.thumbnailTextColor
      : settings.textColor;
    const textBackground = isThumb
      ? settings.thumbnailTextBackground
      : settings.textBackground;
    const showTitle = isThumb
      ? settings.thumbnailShowTitle
      : settings.showTitle;
    const titleSource = isThumb
      ? settings.thumbnailTitleSource
      : settings.titleSource;
    const titleFontSize = isThumb
      ? settings.thumbnailTitleFontSize
      : settings.titleFontSize;
    const titleAlignment = isThumb
      ? settings.thumbnailTitleAlignment
      : settings.titleAlignment;
    const showCaption = isThumb
      ? settings.thumbnailShowCaption
      : settings.showCaption;
    const captionSource = isThumb
      ? settings.thumbnailCaptionSource
      : settings.captionSource;
    const captionFontSize = isThumb
      ? settings.thumbnailCaptionFontSize
      : settings.captionFontSize;
    const captionFontColor = isThumb
      ? settings.thumbnailCaptionFontColor
      : settings.captionFontColor;
    const showDescription = isThumb
      ? settings.thumbnailShowDescription
      : settings.showDescription;
    const descriptionSource = isThumb
      ? settings.thumbnailDescriptionSource
      : settings.descriptionSource;
    const descriptionFontSize = isThumb
      ? settings.thumbnailDescriptionFontSize
      : settings.descriptionFontSize;
    const descriptionMaxRowsCount = isThumb
      ? settings.thumbnailDescriptionMaxRowsCount
      : settings.descriptionMaxRowsCount;

    return (
      <div
        ref={ref}
        className="slider__slide-text-container"
        style={{
          position:
            textPosition === 'above' || textPosition === 'below'
              ? 'relative'
              : 'absolute',
          backgroundColor: textBackground || 'transparent',
          color: textColor,
          fontFamily: textFontFamily,
          ...getTextVerticalPosition(textPosition),
        }}
      >
        <div
          className="slider__slide_text-wrapper"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            flex: 1,
            overflow: 'hidden',
          }}
        >
          {/* TITLE + CAPTION */}
          {showTitle && (
            <p
              data-swiper-parallax={isThumb ? undefined : '-30%'}
              className="slider__slide-title"
              style={{
                fontSize: `${titleFontSize}vw`,
                textAlign: titleAlignment,
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontWeight: 600,
              }}
            >
              {image?.[titleSource]}

              {showCaption && image?.[captionSource] && (
                <span
                  className="slider__slide-caption"
                  style={{
                    fontSize: `${captionFontSize}vw`,
                    marginLeft: 6,
                    color: captionFontColor,
                  }}
                >
                  {image[captionSource]}
                </span>
              )}
            </p>
          )}

          {/* DESCRIPTION */}
          {showDescription && image?.[descriptionSource] && (
            <p
              data-swiper-parallax={isThumb ? undefined : '-30%'}
              className="slider__slide-description"
              style={{
                fontSize: `${descriptionFontSize}vw`,
                textAlign: titleAlignment,
                lineHeight: '1.5',
                margin: 0,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: descriptionMaxRowsCount,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {image[descriptionSource]}
            </p>
          )}
        </div>
      </div>
    );
  }
);
