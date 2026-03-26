import {Button} from 'core-components/button';
import {ActionURLSource, IImageDTO, ISliderSettings} from 'data-structures';
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
    const descriptionFontColor = isThumb
      ? settings.thumbnailDescriptionFontColor
      : settings.descriptionFontColor;
    const showButton = !isThumb && settings.showButton;
    const buttonText = !isThumb ? settings.buttonText : undefined;
    const buttonUrlSource = !isThumb ? settings.buttonUrlSource : undefined;
    const buttonAlignment = !isThumb ? settings.buttonAlignment : undefined;
    const buttonColor = !isThumb ? settings.buttonColor : undefined;
    const buttonTextColor = !isThumb ? settings.buttonTextColor : undefined;
    const buttonFontSize = !isThumb ? settings.buttonFontSize : undefined;
    const openInNewTab = !isThumb ? settings.openInNewTab : undefined;

    const onCustomActionToggle = (url: string) => {
      if (!!url) {
        if (openInNewTab) {
          window?.open(url, '_blank')?.focus();
        } else {
          window?.open(url, '_self');
        }
      }
    };

    return (
      <div
        ref={ref}
        className="slider__slide-text-container"
        style={
          {
            'position':
              textPosition === 'above' || textPosition === 'below'
                ? 'relative'
                : 'absolute',
            '--slider__slide-text-bg-color': textBackground || 'transparent',
            '--slider__slide-text-color': textColor,
            '--slider__slide-caption-color': captionFontColor,
            '--slider__slide-description-color': descriptionFontColor,
            '--slider__slide-title-font-size': `${titleFontSize}vw`,
            '--slider__slide-caption-font-size': `${captionFontSize}vw`,
            '--slider__slide-description-font-size': `${descriptionFontSize}vw`,
            '--slider__slide-description-max-rows': descriptionMaxRowsCount,
            '--slider__slide-button-font-size': `${buttonFontSize}vw`,
            '--slider__slide-button-color': buttonColor,
            '--slider__slide-button-text-color': buttonTextColor,
            '--slider__slide-text-alignment': titleAlignment,
            'fontFamily': textFontFamily,
            ...getTextVerticalPosition(textPosition),
          } as React.CSSProperties
        }
      >
        <div
          data-swiper-parallax={isThumb ? undefined : '-30%'}
          className="slider__slide_text-wrapper"
        >
          {/* TITLE + CAPTION */}
          {showTitle && (
            <p
              // data-swiper-parallax={isThumb ? undefined : '-30%'}
              className="slider__slide-title"
            >
              <span>{image?.[titleSource]}</span>
              {showCaption && image?.[captionSource] && (
                <span
                  className="slider__slide-caption"
                  style={{
                    marginLeft: 6,
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
              // data-swiper-parallax={isThumb ? undefined : '-30%'}
              className="slider__slide-description"
            >
              <span>{image[descriptionSource]}</span>
            </p>
          )}
          {showButton && !isThumb && (
            <Button
              // data-swiper-parallax={isThumb ? undefined : '-30%'}
              onClick={() =>
                onCustomActionToggle(
                  image?.[buttonUrlSource as ActionURLSource] || ''
                )
              }
              className={'slider__slide-button'}
              style={{
                marginLeft:
                  buttonAlignment === 'center'
                    ? 'auto'
                    : buttonAlignment === 'right'
                    ? 'auto'
                    : '0',
                marginRight:
                  buttonAlignment === 'center'
                    ? 'auto'
                    : buttonAlignment === 'left'
                    ? 'auto'
                    : '0',
              }}
            >
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    );
  }
);
