import React from 'react';

import {IImageDTO, ISliderSettings} from 'data-structures';

interface SlideTextProps {
  image: IImageDTO;
  settings: ISliderSettings;
}

const getVerticalPosition = (
  textPosition: ISliderSettings['textPosition']
): React.CSSProperties => {
  switch (textPosition) {
    case 'top':
      return {top: 0, transform: 'none'};

    case 'bottom':
      return {bottom: 0, transform: 'none'};

    case 'center':
      return {
        top: '50%',
        transform: 'translateY(-50%)',
        height: '100%',
      };

    case 'above':
    case 'below':
      return {
        position: 'relative',
        backgroundColor: 'transparent',
      };

    default:
      return {};
  }
};

export const SlideText = ({image, settings}: SlideTextProps): JSX.Element => {
  const {
    textPosition,
    showTitle,
    titleSource,
    titleFontSize,
    titleAlignment,
    showCaption,
    captionSource,
    captionFontSize,
    captionFontColor,
    showDescription,
    descriptionSource,
    descriptionFontSize,
    descriptionMaxRowsCount,
    textBackground,
    textColor,
    textFontFamily,
  } = settings;
  return (
    <div
      className="slider__slide-text-container"
      style={{
        position:
          textPosition === 'above' || textPosition === 'below'
            ? 'relative'
            : 'absolute',
        backgroundColor: textBackground || 'transparent',
        color: textColor,
        fontFamily: textFontFamily,
        ...getVerticalPosition(textPosition),
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
            data-swiper-parallax="-30%"
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
            data-swiper-parallax="-20%"
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
};
