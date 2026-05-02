import ImageListItemBar from '@mui/material/ImageListItemBar';
import clsx from 'clsx';
import {ActionButton} from 'core-components/action-button';
import {
  ActionURLSource,
  IImageDTO,
  IScrollerSettings,
  ThumbnailTitlePosition,
  TitleAlignment,
  TitleSource,
  TitleVisibility,
} from 'data-structures';
import React, {useRef} from 'react';
import {Watermark} from 'utils/renderWatermark';
import {ScrollerMedia} from './scroller-media/ScrollerMedia';

export interface IScrollerItem {
  image: IImageDTO;
  originalIndex: number;
  src: string;
  width: number;
  height: number;
}

interface IScrollerItemProps {
  item: IScrollerItem;
  imageHeight: number;
  hoverEffect: string;
  padding: number;
  paddingColor: string;
  borderRadius: number;
  showVideoCover: boolean;
  onClick?: (index: number) => void;
  settings: IScrollerSettings;
}

const ScrollerItem: React.FC<IScrollerItemProps> = ({
  item,
  imageHeight,
  hoverEffect,
  padding,
  paddingColor,
  borderRadius,
  showVideoCover,
  onClick,
  settings,
}) => {
  const {
    showTitle = false,
    titleSource = TitleSource.TITLE,
    titleVisibility = TitleVisibility.ALWAYS_SHOWN,
    titlePosition = ThumbnailTitlePosition.BOTTOM,
    titleFontSize = 20,
    titleColor = 'Black',
    titleAlignment = TitleAlignment.LEFT,
    titleFontFamily = 'Roboto',
    overlayTextBackground = 'rgba(0, 0, 0, 0.5)',
    invertTextColor = false,
    showCaption = false,
    captionSource = 'caption',
    captionVisibility = TitleVisibility.ALWAYS_SHOWN,
    captionPosition = ThumbnailTitlePosition.BOTTOM,
    captionFontSize = 18,
    captionFontColor = 'Grey',
    showButton = false,
    buttonText,
    buttonVisibility = TitleVisibility.ALWAYS_SHOWN,
    buttonPosition = ThumbnailTitlePosition.BOTTOM,
    buttonAlignment = TitleAlignment.LEFT,
    buttonColor = '#22eaaa',
    buttonTextColor = '#fff',
    buttonFontSize = 16,
    buttonBorderSize = 0,
    buttonBorderColor = '#22eaaa',
    buttonBorderRadius = 4,
    buttonUrlSource,
    openInNewTab = false,
  } = settings;

  const isTitleAbove: boolean = titlePosition === ThumbnailTitlePosition.ABOVE;
  const isTitleBelow: boolean = titlePosition === ThumbnailTitlePosition.BELOW;
  const isTitleTop: boolean = titlePosition === ThumbnailTitlePosition.TOP;
  const isTitleBottom: boolean =
    titlePosition === ThumbnailTitlePosition.BOTTOM;
  const isTitleCenter: boolean =
    titlePosition === ThumbnailTitlePosition.CENTER;
  const isCaptionAbove: boolean =
    captionPosition === ThumbnailTitlePosition.ABOVE;
  const isCaptionBelow: boolean =
    captionPosition === ThumbnailTitlePosition.BELOW;
  const isCaptionTop: boolean = captionPosition === ThumbnailTitlePosition.TOP;
  const isCaptionBottom: boolean =
    captionPosition === ThumbnailTitlePosition.BOTTOM;
  const isCaptionCenter: boolean =
    captionPosition === ThumbnailTitlePosition.CENTER;

  const renderTitle = (image: IImageDTO) => {
    let itemPaddingText = '0';
    if (isTitleBelow || isTitleAbove) {
      itemPaddingText = (borderRadius || 0) / 2 + '%';
    }

    const isHoverAllowed: boolean =
      showTitle &&
      titleVisibility === TitleVisibility.ON_HOVER &&
      !isTitleBelow &&
      !isTitleAbove;

    return (
      <div
        className={clsx(
          'scroller-gallery__title',
          'scroller-gallery__title-caption',
          {
            'scroller-gallery__title_on-hover': isHoverAllowed,
            'scroller-gallery__title_hidden': !showTitle,
            'scroller-gallery__item-outline':
              showTitle && (isTitleBelow || isTitleAbove),
            'reacg-gallery__text-background-top-gradient':
              overlayTextBackground === '' && isTitleTop,
            'reacg-gallery__text-background-bottom-gradient':
              overlayTextBackground === '' && isTitleBottom,
            'reacg-gallery__text-background-center-gradient':
              overlayTextBackground === '' && isTitleCenter,
          }
        )}
        style={{
          paddingLeft: itemPaddingText,
          paddingRight: itemPaddingText,
        }}
      >
        <ImageListItemBar
          sx={{
            '& .MuiImageListItemBar-subtitle': {
              fontSize: `${captionFontSize}px`,
              fontFamily: titleFontFamily,
              color: captionFontColor,
              lineHeight: 'normal',
            },
            '& .MuiImageListItemBar-title': {
              fontSize: `${titleFontSize}px`,
              fontFamily: titleFontFamily,
              lineHeight: 'normal',
            },
          }}
          style={{
            textAlign: titleAlignment,
            color: titleColor,
            backgroundColor:
              overlayTextBackground === '' ? 'unset' : overlayTextBackground,
            mixBlendMode: invertTextColor ? 'difference' : 'initial',
          }}
          className={`scroller-gallery__title-content_${titlePosition}`}
          title={<span>{image[titleSource] || <br />}</span>}
          subtitle={
            (titlePosition === captionPosition &&
              showCaption &&
              image[captionSource]) ||
            (titlePosition === buttonPosition && showButton) ? (
              <>
                {titlePosition === captionPosition &&
                  showCaption &&
                  image[captionSource] && (
                    <span className="thumbnail-image__caption">
                      {image[captionSource]}
                    </span>
                  )}
                {titlePosition === buttonPosition && showButton && (
                  <span className="reacg-action-button-wrap">
                    <ActionButton
                      url={image?.[buttonUrlSource as ActionURLSource] || ''}
                      openInNewTab={openInNewTab}
                      text={buttonText}
                      alignment={buttonAlignment}
                      backgroundColor={buttonColor}
                      textColor={buttonTextColor}
                      fontSize={buttonFontSize}
                      borderSize={buttonBorderSize}
                      borderColor={buttonBorderColor}
                      borderRadius={buttonBorderRadius}
                      isOnHover={
                        buttonVisibility === TitleVisibility.ON_HOVER &&
                        buttonPosition !== ThumbnailTitlePosition.ABOVE &&
                        buttonPosition !== ThumbnailTitlePosition.BELOW
                      }
                    />
                  </span>
                )}
              </>
            ) : null
          }
          position={
            titlePosition === ThumbnailTitlePosition.CENTER
              ? 'bottom'
              : titlePosition === ThumbnailTitlePosition.ABOVE
              ? 'below'
              : titlePosition
          }
        />
      </div>
    );
  };

  const renderCaption = (image: IImageDTO) => {
    let itemPaddingText = '0';
    if (isCaptionBelow || isCaptionAbove) {
      itemPaddingText = (borderRadius || 0) / 2 + '%';
    }

    return (
      <div
        className={clsx(
          'scroller-gallery__title',
          'scroller-gallery__caption',
          {
            'scroller-gallery__title_on-hover':
              showCaption &&
              captionVisibility === TitleVisibility.ON_HOVER &&
              !isCaptionBelow &&
              !isCaptionAbove,
            'scroller-gallery__title_hidden': !showCaption,
            'scroller-gallery__item-outline':
              showCaption && (isCaptionBelow || isCaptionAbove),
            'reacg-gallery__text-background-top-gradient':
              overlayTextBackground === '' && isCaptionTop,
            'reacg-gallery__text-background-bottom-gradient':
              overlayTextBackground === '' && isCaptionBottom,
            'reacg-gallery__text-background-center-gradient':
              overlayTextBackground === '' && isCaptionCenter,
          }
        )}
        style={{
          paddingLeft: itemPaddingText,
          paddingRight: itemPaddingText,
        }}
      >
        <ImageListItemBar
          sx={{
            '& .MuiImageListItemBar-subtitle': {
              fontSize: `${captionFontSize}px`,
              fontFamily: titleFontFamily,
              color: captionFontColor,
              lineHeight: 'normal',
            },
          }}
          style={{
            textAlign: titleAlignment,
            color: captionFontColor,
            backgroundColor:
              overlayTextBackground === '' ? 'unset' : overlayTextBackground,
            mixBlendMode: invertTextColor ? 'difference' : 'initial',
          }}
          className={`scroller-gallery__title-content_${captionPosition}`}
          title={
            (showCaption && image[captionSource]) ||
            (captionPosition === buttonPosition && showButton) ? (
              <>
                {showCaption && image[captionSource] && (
                  <span className="scroller-image__caption">
                    {image[captionSource]}
                  </span>
                )}
                {captionPosition === buttonPosition && showButton && (
                  <span className="reacg-action-button-wrap">
                    <ActionButton
                      url={image?.[buttonUrlSource as ActionURLSource] || ''}
                      openInNewTab={openInNewTab}
                      text={buttonText}
                      alignment={buttonAlignment}
                      backgroundColor={buttonColor}
                      textColor={buttonTextColor}
                      fontSize={buttonFontSize}
                      borderSize={buttonBorderSize}
                      borderColor={buttonBorderColor}
                      borderRadius={buttonBorderRadius}
                      isOnHover={
                        buttonVisibility === TitleVisibility.ON_HOVER &&
                        buttonPosition !== ThumbnailTitlePosition.ABOVE &&
                        buttonPosition !== ThumbnailTitlePosition.BELOW
                      }
                    />
                  </span>
                )}
              </>
            ) : null
          }
          position={
            captionPosition === ThumbnailTitlePosition.CENTER
              ? 'bottom'
              : captionPosition === ThumbnailTitlePosition.ABOVE
              ? 'below'
              : captionPosition
          }
        />
      </div>
    );
  };

  const renderButton = (position: ThumbnailTitlePosition, image: IImageDTO) => {
    let itemPaddingText = '0';
    if (
      position === ThumbnailTitlePosition.BELOW ||
      position === ThumbnailTitlePosition.ABOVE
    ) {
      itemPaddingText = (borderRadius || 0) / 2 + '%';
    }

    const isOutside =
      position === ThumbnailTitlePosition.ABOVE ||
      position === ThumbnailTitlePosition.BELOW;

    return (
      <div
        className={clsx('scroller-gallery__title', 'scroller-gallery__button', {
          'reacg-action-button-container_on-hover':
            showButton && buttonVisibility === TitleVisibility.ON_HOVER,
          'scroller-gallery__item-outline': isOutside,
          'reacg-gallery__text-background-top-gradient':
            overlayTextBackground === '' &&
            position === ThumbnailTitlePosition.TOP,
          'reacg-gallery__text-background-bottom-gradient':
            overlayTextBackground === '' &&
            position === ThumbnailTitlePosition.BOTTOM,
          'reacg-gallery__text-background-center-gradient':
            overlayTextBackground === '' &&
            position === ThumbnailTitlePosition.CENTER,
        })}
        style={{
          paddingLeft: itemPaddingText,
          paddingRight: itemPaddingText,
        }}
      >
        <ImageListItemBar
          style={{
            textAlign: buttonAlignment,
            backgroundColor:
              position !== ThumbnailTitlePosition.BELOW &&
              position !== ThumbnailTitlePosition.ABOVE
                ? overlayTextBackground === ''
                  ? 'unset'
                  : overlayTextBackground
                : 'initial',
            mixBlendMode:
              invertTextColor &&
              position !== ThumbnailTitlePosition.BELOW &&
              position !== ThumbnailTitlePosition.ABOVE
                ? 'difference'
                : 'initial',
          }}
          className={`scroller-gallery__title-content_${position}`}
          title={
            <span className="reacg-action-button-wrap">
              <ActionButton
                url={image?.[buttonUrlSource as ActionURLSource] || ''}
                openInNewTab={openInNewTab}
                text={buttonText}
                alignment={buttonAlignment}
                backgroundColor={buttonColor}
                textColor={buttonTextColor}
                fontSize={buttonFontSize}
                borderSize={buttonBorderSize}
                borderColor={buttonBorderColor}
                borderRadius={buttonBorderRadius}
                isOnHover={
                  buttonVisibility === TitleVisibility.ON_HOVER && !isOutside
                }
              />
            </span>
          }
          position={
            position === ThumbnailTitlePosition.CENTER
              ? 'bottom'
              : position === ThumbnailTitlePosition.ABOVE
              ? 'below'
              : position
          }
        />
      </div>
    );
  };

  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRequestSize = Math.max(item.width, imageHeight);

  return (
    <div className="reacg-scroller__item-card" style={{width: item.width}}>
      {showTitle && isTitleAbove && renderTitle(item.image)}
      {showCaption &&
        (titlePosition != captionPosition || !showTitle) &&
        isCaptionAbove &&
        renderCaption(item.image)}
      {showButton &&
        (titlePosition != buttonPosition || !showTitle) &&
        (captionPosition != buttonPosition || !showCaption) &&
        buttonPosition === ThumbnailTitlePosition.ABOVE &&
        renderButton(buttonPosition, item.image)}
      <div
        className="reacg-scroller__media-shell"
        style={{
          width: '100%',
          height: imageHeight,
          padding: padding,
          background: paddingColor,
          borderRadius: `${borderRadius}px`,
          boxSizing: 'border-box',
        }}
      >
        <div
          ref={wrapperRef}
          className={clsx(
            'reacg-scroller__image-wrapper',
            'scroller-gallery__image-wrapper',
            'reacg-action-button-hover-parent',
            'reacg-scroller__image-wrapper_overflow',
            `reacg-scroller__image-wrapper_${hoverEffect}`,
            {'reacg-scroller__image-wrapper_clickable': !!onClick},
            {'reacg-scroller__image-wrapper_non_clickable': !onClick}
          )}
          style={{height: '100%', borderRadius: `${borderRadius}px`}}
          onClick={() => onClick?.(item.originalIndex)}
        >
          <ScrollerMedia
            item={item}
            showVideoCover={showVideoCover}
            size={imageRequestSize}
            wrapperRef={wrapperRef}
          />
          <Watermark />
          {showTitle &&
            !isTitleBelow &&
            !isTitleAbove &&
            renderTitle(item.image)}
          {showCaption &&
            (titlePosition != captionPosition || !showTitle) &&
            captionPosition !== ThumbnailTitlePosition.BELOW &&
            captionPosition !== ThumbnailTitlePosition.ABOVE &&
            renderCaption(item.image)}
          {showButton &&
            (titlePosition != buttonPosition || !showTitle) &&
            (captionPosition != buttonPosition || !showCaption) &&
            buttonPosition !== ThumbnailTitlePosition.BELOW &&
            buttonPosition !== ThumbnailTitlePosition.ABOVE &&
            renderButton(buttonPosition, item.image)}
        </div>
      </div>
      {showTitle && isTitleBelow && renderTitle(item.image)}
      {showCaption &&
        (titlePosition != captionPosition || !showTitle) &&
        captionPosition === ThumbnailTitlePosition.BELOW &&
        renderCaption(item.image)}
      {showButton &&
        (titlePosition != buttonPosition || !showTitle) &&
        (captionPosition != buttonPosition || !showCaption) &&
        buttonPosition === ThumbnailTitlePosition.BELOW &&
        renderButton(buttonPosition, item.image)}
    </div>
  );
};

export {ScrollerItem};
export default ScrollerItem;
