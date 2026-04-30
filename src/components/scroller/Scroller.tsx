import ImageListItemBar from '@mui/material/ImageListItemBar';
import clsx from 'clsx';
import { useData } from 'components/data-context/useData';
import { useSettings } from 'components/settings';
import { ActionButton } from 'core-components/action-button';
import ReImage from 'core-components/re-image/ReImage';
import ReVideo from 'core-components/re-video/ReVideo';
import {
  ActionURLSource,
  HoverEffect,
  IImageDTO,
  ImageType,
  IScrollerSettings,
  ThumbnailTitlePosition,
  TitleAlignment,
  TitleSource,
  TitleVisibility,
} from 'data-structures';
import React, { useEffect, useRef, useState } from 'react';
import { getLargestSrcItem, getSrcSetString } from 'utils/imageSrcSet';
import { Watermark } from 'utils/renderWatermark';
import './scroller.css';

interface IScrollerProps {
  onClick?: (index: number) => void;
}

interface IScrollerItem {
  image: IImageDTO;
  originalIndex: number;
  src: string;
  width: number;
  height: number;
}

interface IScrollerMediaProps {
  item: IScrollerItem;
  showVideoCover: boolean;
  size: number;
  wrapperRef: React.RefObject<HTMLDivElement>;
}

type IScrollerMetaPosition =
  | ThumbnailTitlePosition.TOP
  | ThumbnailTitlePosition.BOTTOM
  | ThumbnailTitlePosition.CENTER;

const ScrollerMedia: React.FC<IScrollerMediaProps> = ({
  item,
  showVideoCover,
  size,
  wrapperRef,
}) => {
  const srcSetString = getSrcSetString(item.image.sizes);

  if (item.image.type === ImageType.VIDEO) {
    return (
      <ReVideo
        wrapperRef={wrapperRef}
        item={item.image}
        settings={{showVideoCover, showVideoControls: false}}
        coverImageProps={{
          src: item.src,
          srcSet: srcSetString,
          sizes: `${size}px`,
          alt: item.image.alt || item.image.title,
          loading: 'eager',
          className: 'reacg-scroller__media',
        }}
        className="reacg-scroller__media"
      />
    );
  }

  return (
    <ReImage
      wrapperRef={wrapperRef}
      src={item.src}
      srcSet={srcSetString}
      sizes={`${size}px`}
      alt={item.image.alt || item.image.title}
      loading="eager"
      className="reacg-scroller__media"
    />
  );
};

interface IScrollerItemCardProps {
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

const ScrollerItemCard: React.FC<IScrollerItemCardProps> = ({
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

  const renderTitle = (image: IImageDTO) => {
    let itemPaddingText = '0';
    let imagePaddingText = '0';
    if (
      titlePosition === ThumbnailTitlePosition.BELOW ||
      titlePosition === ThumbnailTitlePosition.ABOVE
    ) {
      itemPaddingText = (borderRadius || 0) / 2 + '%';
      imagePaddingText = padding + 'px';
    } else if (titlePosition !== ThumbnailTitlePosition.CENTER) {
      imagePaddingText = (borderRadius || 0) / 2 + '%';
    }

    return (
      <div
        className={clsx(
          'scroller-gallery__title scroller-gallery__title-caption',
          {
            'scroller-gallery__title_on-hover':
              showTitle &&
              titleVisibility === TitleVisibility.ON_HOVER &&
              titlePosition !== ThumbnailTitlePosition.BELOW &&
              titlePosition !== ThumbnailTitlePosition.ABOVE,
            'scroller-gallery__title_hidden': !showTitle,
            'scroller-gallery__item-outline':
              showTitle &&
              (titlePosition === ThumbnailTitlePosition.BELOW ||
                titlePosition === ThumbnailTitlePosition.ABOVE),
            'reacg-gallery__text-background-top-gradient':
              overlayTextBackground === '' &&
              titlePosition === ThumbnailTitlePosition.TOP,
            'reacg-gallery__text-background-bottom-gradient':
              overlayTextBackground === '' &&
              titlePosition === ThumbnailTitlePosition.BOTTOM,
            'reacg-gallery__text-background-center-gradient':
              overlayTextBackground === '' &&
              titlePosition === ThumbnailTitlePosition.CENTER,
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
            paddingLeft: '6px',
            paddingRight: '6px',
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
    let imagePaddingText = '0';
    if (
      captionPosition === ThumbnailTitlePosition.BELOW ||
      captionPosition === ThumbnailTitlePosition.ABOVE
    ) {
      itemPaddingText = (borderRadius || 0) / 2 + '%';
      imagePaddingText = padding + 'px';
    } else if (captionPosition !== ThumbnailTitlePosition.CENTER) {
      imagePaddingText = (borderRadius || 0) / 2 + '%';
    }

    return (
      <div
        className={clsx('scroller-gallery__title scroller-gallery__caption', {
          'scroller-gallery__title_on-hover':
            showCaption &&
            captionVisibility === TitleVisibility.ON_HOVER &&
            captionPosition !== ThumbnailTitlePosition.BELOW &&
            captionPosition !== ThumbnailTitlePosition.ABOVE,
          'scroller-gallery__title_hidden': !showCaption,
          'scroller-gallery__item-outline':
            showCaption &&
            (captionPosition === ThumbnailTitlePosition.BELOW ||
              captionPosition === ThumbnailTitlePosition.ABOVE),
          'reacg-gallery__text-background-top-gradient':
            overlayTextBackground === '' &&
            captionPosition === ThumbnailTitlePosition.TOP,
          'reacg-gallery__text-background-bottom-gradient':
            overlayTextBackground === '' &&
            captionPosition === ThumbnailTitlePosition.BOTTOM,
          'reacg-gallery__text-background-center-gradient':
            overlayTextBackground === '' &&
            captionPosition === ThumbnailTitlePosition.CENTER,
        })}
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
            paddingLeft: '6px',
            paddingRight: '6px',
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
    let imagePaddingText = '6px';
    if (
      position === ThumbnailTitlePosition.BELOW ||
      position === ThumbnailTitlePosition.ABOVE
    ) {
      itemPaddingText = (borderRadius || 0) / 2 + '%';
      imagePaddingText = padding + 'px';
    } else if (position !== ThumbnailTitlePosition.CENTER) {
      imagePaddingText = (borderRadius || 0) / 2 + '%';
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
            paddingLeft: imagePaddingText,
            paddingRight: imagePaddingText,
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
                isOnHover={!isOutside}
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
      {showTitle &&
        titlePosition === ThumbnailTitlePosition.ABOVE &&
        renderTitle(item.image)}
      {showCaption &&
        (titlePosition != captionPosition || !showTitle) &&
        captionPosition === ThumbnailTitlePosition.ABOVE &&
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
            !!onClick
              ? 'reacg-scroller__image-wrapper_clickable'
              : 'reacg-scroller__image-wrapper_non_clickable'
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
            titlePosition !== ThumbnailTitlePosition.BELOW &&
            titlePosition !== ThumbnailTitlePosition.ABOVE &&
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
      {showTitle &&
        titlePosition === ThumbnailTitlePosition.BELOW &&
        renderTitle(item.image)}
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

const Scroller: React.FC<IScrollerProps> = ({onClick}) => {
  const {images = []} = useData();
  const {scrollerSettings: settings} = useSettings();
  const {
    height,
    equalHeight,
    width: configuredWidth = 300,
    equalWidth = false,
    rowCount = 1,
    scrollDirection,
    animationSpeed,
    pauseOnHover,
    padding,
    paddingColor,
    hoverEffect = HoverEffect.NONE,
    showTitle = false,
    titlePosition = ThumbnailTitlePosition.BOTTOM,
    showCaption = false,
    captionPosition = ThumbnailTitlePosition.BOTTOM,
    showButton = false,
    buttonPosition = ThumbnailTitlePosition.BOTTOM,
    showVideoCover,
    gap,
    backgroundColor,
    containerPadding,
    borderRadius,
  } = settings as IScrollerSettings;
  const hasConfiguredWidth =
    typeof (settings as any)?.width === 'number' &&
    Number((settings as any)?.width) > 0;
  const legacyImagesCount = (settings as any)?.imagesCount as
    | number
    | null
    | undefined;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [itemWidth, setItemWidth] = useState<number>(200);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const getResponsiveScale = (currentWidth: number) => {
    if (currentWidth < 480) return 0.62;
    if (currentWidth < 768) return 0.8;
    return 1;
  };

  useEffect(() => {
    if (!wrapperRef.current || !images.length) return;

    const updateLayout = (currentWidth: number) => {
      setContainerWidth(currentWidth);
      const scale = getResponsiveScale(currentWidth);
      const scaledConfiguredWidth = Math.max(
        50,
        Math.round(configuredWidth * scale)
      );

      if (hasConfiguredWidth) {
        setItemWidth(scaledConfiguredWidth);
      } else if (legacyImagesCount && legacyImagesCount > 0) {
        // Backward compatibility for galleries saved before width/equalWidth.
        const totalSpacing = (legacyImagesCount - 1) * (gap || 0);
        setItemWidth((currentWidth - totalSpacing) / legacyImagesCount);
      } else {
        setItemWidth(Math.max(50, Math.round(300 * scale)));
      }
    };

    updateLayout(wrapperRef.current.clientWidth);

    const observer = new ResizeObserver((entries) => {
      updateLayout(entries[0].contentRect.width);
    });

    observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, [
    images.length,
    configuredWidth,
    hasConfiguredWidth,
    legacyImagesCount,
    gap,
  ]);

  if (!images.length) return null;

  const effectiveContainerWidth =
    containerWidth || wrapperRef.current?.clientWidth || 800;
  const responsiveScale = getResponsiveScale(effectiveContainerWidth);
  const responsiveHeight = Math.max(50, Math.round(height * responsiveScale));

  const normalizedRowCount = Math.max(1, Math.min(6, Math.round(rowCount || 1)));
  const sourceItems = images.map((image, originalIndex) => ({image, originalIndex}));
  const rowSources: Array<Array<{image: IImageDTO; originalIndex: number}>> = [];
  const basePerRow = Math.floor(sourceItems.length / normalizedRowCount);
  const remainder = sourceItems.length % normalizedRowCount;
  let offset = 0;

  for (let rowIndex = 0; rowIndex < normalizedRowCount; rowIndex++) {
    const rowSize = basePerRow + (rowIndex < remainder ? 1 : 0);
    rowSources.push(sourceItems.slice(offset, offset + rowSize));
    offset += rowSize;
  }

  const rowData = rowSources
    .filter((row) => row.length > 0)
    .map((row) => {
      const baseItems: IScrollerItem[] = row.map(({image, originalIndex}) => {
        const srcItem = getLargestSrcItem(image.sizes);
        const naturalRatio = srcItem ? srcItem.width / srcItem.height : 1;
        let width: number;
        let itemHeight: number;

        if (equalWidth && equalHeight) {
          width = itemWidth;
          itemHeight = responsiveHeight;
        } else if (equalWidth) {
          width = itemWidth;
          itemHeight = Math.min(responsiveHeight, itemWidth / naturalRatio);
        } else if (equalHeight) {
          itemHeight = responsiveHeight;
          width = responsiveHeight * naturalRatio;
        } else {
          // Use configured width/height as max bounds and preserve natural ratio.
          const maxWidth = itemWidth;
          const widthByHeight = responsiveHeight * naturalRatio;
          if (widthByHeight <= maxWidth) {
            width = widthByHeight;
            itemHeight = responsiveHeight;
          } else {
            width = maxWidth;
            itemHeight = maxWidth / naturalRatio;
          }
        }

        const src = srcItem?.src || image.original?.url;

        return {image, originalIndex, src, width, height: itemHeight};
      });

      const totalBaseWidth =
        baseItems.reduce((sum, item) => sum + item.width, 0) +
        Math.max(0, baseItems.length - 1) * (gap || 0);

      // One set contains available images only. Duplicate within set only if it is narrower than viewport.
      const setRepeat =
        totalBaseWidth > 0 && totalBaseWidth < effectiveContainerWidth
          ? Math.ceil(effectiveContainerWidth / totalBaseWidth)
          : 1;

      const setItems: IScrollerItem[] = [];
      for (let i = 0; i < setRepeat; i++) {
        baseItems.forEach((item) => {
          setItems.push(item);
        });
      }

      // Width of all items inside one set (without the trailing set boundary gap).
      const singleSetContentWidth =
        setItems.reduce((sum, item) => sum + item.width, 0) +
        Math.max(0, setItems.length - 1) * (gap || 0);
      // Span from start of one set to start of the cloned set.
      const setSpanWidth = singleSetContentWidth + (gap || 0);

      return {
        setItems,
        setSpanWidth,
        duration: setSpanWidth / Math.max(animationSpeed || 1, 1),
      };
    });
  const hasOutsideMetadata =
    (showTitle &&
      (titlePosition === ThumbnailTitlePosition.ABOVE ||
        titlePosition === ThumbnailTitlePosition.BELOW)) ||
    (showCaption &&
      (captionPosition === ThumbnailTitlePosition.ABOVE ||
        captionPosition === ThumbnailTitlePosition.BELOW)) ||
    (showButton &&
      (buttonPosition === ThumbnailTitlePosition.ABOVE ||
        buttonPosition === ThumbnailTitlePosition.BELOW)) ||
    false;

  return (
    <div
      ref={wrapperRef}
      className="reacg-scroller"
      style={{
        backgroundColor: backgroundColor || undefined,
        paddingTop: containerPadding,
        paddingBottom: containerPadding,
        display: 'flex',
        flexDirection: 'column',
        rowGap: `${gap || 0}px`,
      }}
    >
      {rowData.map((row, rowIndex) => {
        const rowDirection =
          rowIndex % 2 === 0
            ? scrollDirection || 'left'
            : (scrollDirection || 'left') === 'left'
            ? 'right'
            : 'left';

        return (
          <div
            key={`row-${rowIndex}`}
            className={clsx(
              'reacg-scroller__track',
              'reacg-scroller__track--animating',
              {
                [`reacg-scroller__track--${rowDirection}`]: true,
                'reacg-scroller__track--paused': isPaused,
                'reacg-scroller__track--mixed-height': !equalHeight,
              }
            )}
            style={{
              animationDuration: `${row.duration}s`,
              height:
                !equalHeight && !hasOutsideMetadata
                  ? responsiveHeight
                  : undefined,
              ['--reacg-shift-px' as string]: `${row.setSpanWidth}px`,
              ['--reacg-gap' as string]: `${gap || 0}px`,
            }}
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => pauseOnHover && setIsPaused(false)}
          >
            {[0, 1].map((setIndex) => (
              <div
                key={`set-${rowIndex}-${setIndex}`}
                className="reacg-scroller__set"
                aria-hidden={setIndex === 1}
              >
                {row.setItems.map((item, i) => (
                  <div
                    key={`${rowIndex}-${setIndex}-${i}-${item.image.id}`}
                    className="reacg-scroller__item"
                    style={{
                      width: item.width,
                    }}
                  >
                    <ScrollerItemCard
                      item={item}
                      imageHeight={item.height}
                      hoverEffect={hoverEffect}
                      padding={padding}
                      paddingColor={paddingColor}
                      borderRadius={borderRadius}
                      showVideoCover={showVideoCover}
                      onClick={onClick}
                      settings={settings as IScrollerSettings}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export { Scroller };
export default Scroller;
