import ImageListItemBar from '@mui/material/ImageListItemBar';
import clsx from 'clsx';
import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {ActionButton} from 'core-components/action-button';
import ReImage from 'core-components/re-image/ReImage';
import ReVideo from 'core-components/re-video/ReVideo';
import {
  ActionURLSource,
  DescriptionPosition,
  HoverEffect,
  IImageDTO,
  ImageType,
  IScrollerSettings,
  ThumbnailTitlePosition,
  TitleAlignment,
  TitleSource,
  TitleVisibility,
} from 'data-structures';
import React, {useEffect, useRef, useState} from 'react';
import {getLargestSrcItem, getSrcSetString} from 'utils/imageSrcSet';
import {Watermark} from 'utils/renderWatermark';
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
}

type IScrollerMetaPosition =
  | ThumbnailTitlePosition.TOP
  | ThumbnailTitlePosition.BOTTOM
  | ThumbnailTitlePosition.CENTER;

const ScrollerMedia: React.FC<IScrollerMediaProps> = ({
  item,
  showVideoCover,
}) => {
  const mediaWrapperRef = useRef<HTMLDivElement>(null);

  if (item.image.type === ImageType.VIDEO) {
    return (
      <ReVideo
        wrapperRef={mediaWrapperRef}
        item={item.image}
        settings={{showVideoCover, showVideoControls: false}}
        coverImageProps={{
          src: item.src,
          alt: item.image.alt || item.image.title,
          width: item.width,
          height: item.height,
          className: 'reacg-scroller__media',
        }}
        className="reacg-scroller__media"
      />
    );
  }

  return (
    <ReImage
      wrapperRef={mediaWrapperRef}
      src={item.src}
      srcSet={getSrcSetString(item.image.sizes)}
      alt={item.image.alt || item.image.title}
      width={item.width}
      height={item.height}
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
    showDescription = false,
    descriptionSource = 'description',
    descriptionPosition = DescriptionPosition.BELOW,
    descriptionFontSize = 16,
    descriptionFontColor = 'Black',
    descriptionMaxRowsCount = 3,
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

  const outsideAbove: React.ReactNode[] = [];
  const outsideBelow: React.ReactNode[] = [];
  const overlayTop: React.ReactNode[] = [];
  const overlayCenter: React.ReactNode[] = [];
  const overlayBottom: React.ReactNode[] = [];

  const overlayBackground = overlayTextBackground || undefined;
  const textMixBlendMode = invertTextColor ? 'difference' : 'initial';
  const titleValue = item.image[titleSource as keyof IImageDTO];
  const captionValue = item.image[captionSource as keyof IImageDTO];
  const descriptionValue = item.image[descriptionSource as keyof IImageDTO];
  const buttonUrl = item.image?.[buttonUrlSource as ActionURLSource] || '';

  const pushOverlay = (
    position: IScrollerMetaPosition,
    node: React.ReactNode
  ) => {
    if (position === ThumbnailTitlePosition.TOP) {
      overlayTop.push(node);
    } else if (position === ThumbnailTitlePosition.CENTER) {
      overlayCenter.push(node);
    } else {
      overlayBottom.push(node);
    }
  };

  const getMetaClasses = (isOnHover: boolean) =>
    clsx('reacg-scroller__meta-block', {
      'reacg-scroller__meta-block_on-hover': isOnHover,
    });

  const renderTextBar = ({
    key,
    text,
    color,
    fontSize,
    position,
    visibility,
    isCaption = false,
  }: {
    key: string;
    text: React.ReactNode;
    color: string;
    fontSize: number;
    position: ThumbnailTitlePosition;
    visibility: TitleVisibility;
    isCaption?: boolean;
  }) => {
    if (!text) return null;

    const node = (
      <div
        key={key}
        className={getMetaClasses(visibility === TitleVisibility.ON_HOVER)}
      >
        <ImageListItemBar
          sx={{
            '& .MuiImageListItemBar-title': {
              fontSize: `${fontSize}px`,
              fontFamily: titleFontFamily,
              color,
              lineHeight: 'normal',
            },
          }}
          style={{
            textAlign: titleAlignment,
            color,
            backgroundColor:
              position === ThumbnailTitlePosition.ABOVE ||
              position === ThumbnailTitlePosition.BELOW
                ? 'initial'
                : overlayBackground,
            mixBlendMode:
              position === ThumbnailTitlePosition.ABOVE ||
              position === ThumbnailTitlePosition.BELOW
                ? 'initial'
                : textMixBlendMode,
          }}
          className={clsx(
            'reacg-scroller__title-content',
            `reacg-scroller__title-content_${position}`,
            {
              'reacg-scroller__title-content_gradient-top':
                !overlayBackground && position === ThumbnailTitlePosition.TOP,
              'reacg-scroller__title-content_gradient-bottom':
                !overlayBackground &&
                position === ThumbnailTitlePosition.BOTTOM,
              'reacg-scroller__title-content_gradient-center':
                !overlayBackground &&
                position === ThumbnailTitlePosition.CENTER,
            }
          )}
          title={
            <span
              className={clsx({
                'reacg-scroller__caption-text': isCaption,
              })}
            >
              {text}
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

    if (position === ThumbnailTitlePosition.ABOVE) {
      outsideAbove.push(node);
    } else if (position === ThumbnailTitlePosition.BELOW) {
      outsideBelow.push(node);
    } else {
      pushOverlay(position as IScrollerMetaPosition, node);
    }
  };

  const renderButtonBar = () => {
    if (!showButton) return;

    const node = (
      <div
        key="button"
        className={getMetaClasses(
          buttonVisibility === TitleVisibility.ON_HOVER
        )}
      >
        <ImageListItemBar
          style={{
            textAlign: buttonAlignment,
            backgroundColor:
              buttonPosition === ThumbnailTitlePosition.ABOVE ||
              buttonPosition === ThumbnailTitlePosition.BELOW
                ? 'initial'
                : overlayBackground,
            mixBlendMode:
              buttonPosition === ThumbnailTitlePosition.ABOVE ||
              buttonPosition === ThumbnailTitlePosition.BELOW
                ? 'initial'
                : textMixBlendMode,
          }}
          className={clsx(
            'reacg-scroller__title-content',
            `reacg-scroller__title-content_${buttonPosition}`,
            {
              'reacg-scroller__title-content_gradient-top':
                !overlayBackground &&
                buttonPosition === ThumbnailTitlePosition.TOP,
              'reacg-scroller__title-content_gradient-bottom':
                !overlayBackground &&
                buttonPosition === ThumbnailTitlePosition.BOTTOM,
              'reacg-scroller__title-content_gradient-center':
                !overlayBackground &&
                buttonPosition === ThumbnailTitlePosition.CENTER,
            }
          )}
          title={
            <span className="reacg-action-button-wrap">
              <ActionButton
                url={buttonUrl}
                openInNewTab={openInNewTab}
                text={
                  buttonText || (window as any).reacg_global?.text?.view_more
                }
                alignment={buttonAlignment}
                backgroundColor={buttonColor}
                textColor={buttonTextColor}
                fontSize={buttonFontSize}
                borderSize={buttonBorderSize}
                borderColor={buttonBorderColor}
                borderRadius={buttonBorderRadius}
              />
            </span>
          }
          position={
            buttonPosition === ThumbnailTitlePosition.CENTER
              ? 'bottom'
              : buttonPosition === ThumbnailTitlePosition.ABOVE
              ? 'below'
              : buttonPosition
          }
        />
      </div>
    );

    if (buttonPosition === ThumbnailTitlePosition.ABOVE) {
      outsideAbove.push(node);
    } else if (buttonPosition === ThumbnailTitlePosition.BELOW) {
      outsideBelow.push(node);
    } else {
      pushOverlay(buttonPosition as IScrollerMetaPosition, node);
    }
  };

  if (showTitle && titleValue) {
    renderTextBar({
      key: 'title',
      text: titleValue as React.ReactNode,
      color: titleColor,
      fontSize: titleFontSize,
      position: titlePosition,
      visibility: titleVisibility,
    });
  }

  if (showCaption && captionValue) {
    renderTextBar({
      key: 'caption',
      text: captionValue as React.ReactNode,
      color: captionFontColor,
      fontSize: captionFontSize,
      position: captionPosition,
      visibility: captionVisibility,
      isCaption: true,
    });
  }

  if (showDescription && descriptionValue) {
    const descriptionNode = (
      <div
        key="description"
        className="reacg-scroller__description"
        style={{
          WebkitLineClamp: descriptionMaxRowsCount,
          fontSize: `${descriptionFontSize}px`,
          color: descriptionFontColor,
          fontFamily: titleFontFamily,
          textAlign: titleAlignment,
        }}
      >
        {descriptionValue as React.ReactNode}
      </div>
    );

    if (descriptionPosition === DescriptionPosition.ABOVE) {
      outsideAbove.push(descriptionNode);
    } else {
      outsideBelow.push(descriptionNode);
    }
  }

  renderButtonBar();

  return (
    <div className="reacg-scroller__item-card" style={{width: item.width}}>
      {outsideAbove.length > 0 && (
        <div className="reacg-scroller__meta-stack reacg-scroller__meta-stack_above">
          {outsideAbove}
        </div>
      )}
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
          className={clsx(
            'reacg-scroller__image-wrapper',
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
          <ScrollerMedia item={item} showVideoCover={showVideoCover} />
          <Watermark />
          {overlayTop.length > 0 && (
            <div className="reacg-scroller__overlay reacg-scroller__overlay_top">
              {overlayTop}
            </div>
          )}
          {overlayCenter.length > 0 && (
            <div className="reacg-scroller__overlay reacg-scroller__overlay_center">
              {overlayCenter}
            </div>
          )}
          {overlayBottom.length > 0 && (
            <div className="reacg-scroller__overlay reacg-scroller__overlay_bottom">
              {overlayBottom}
            </div>
          )}
        </div>
      </div>
      {outsideBelow.length > 0 && (
        <div className="reacg-scroller__meta-stack reacg-scroller__meta-stack_below">
          {outsideBelow}
        </div>
      )}
    </div>
  );
};

const Scroller: React.FC<IScrollerProps> = ({onClick}) => {
  const {images = []} = useData();
  const {scrollerSettings: settings} = useSettings();
  const {
    height,
    equalHeight,
    imagesCount,
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
    showDescription = false,
    descriptionPosition = DescriptionPosition.BELOW,
    showVideoCover,
    gap,
    backgroundColor,
    containerPadding,
    borderRadius,
  } = settings as IScrollerSettings;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [itemWidth, setItemWidth] = useState<number>(200);

  useEffect(() => {
    if (!wrapperRef.current || !images.length) return;

    const containerWidth = wrapperRef.current.clientWidth;

    if (imagesCount && imagesCount > 0) {
      const totalSpacing = (imagesCount - 1) * (gap || 0);
      setItemWidth((containerWidth - totalSpacing) / imagesCount);
    } else {
      // Auto: derive width from image aspect ratios to fill viewport
      const avgRatio =
        images.reduce((sum, img) => {
          const src = getLargestSrcItem(img.sizes);
          return sum + (src ? src.width / src.height : 1);
        }, 0) / images.length;
      setItemWidth(height * avgRatio);
    }
  }, [
    wrapperRef.current?.clientWidth,
    images.length,
    imagesCount,
    height,
    gap,
  ]);

  if (!images.length) return null;

  const containerWidth = wrapperRef.current?.clientWidth || 800;
  const targetItemWidth =
    imagesCount && imagesCount > 0
      ? (containerWidth - (imagesCount - 1) * (gap || 0)) / imagesCount
      : undefined;
  const averageRatio =
    images.reduce((sum, image) => {
      const srcItem = getLargestSrcItem(image.sizes);
      return sum + (srcItem ? srcItem.width / srcItem.height : 1);
    }, 0) / images.length;
  const avgWidthAtRowHeight = height * averageRatio;
  const equalHeightScale =
    equalHeight && targetItemWidth && avgWidthAtRowHeight > 0
      ? targetItemWidth / avgWidthAtRowHeight
      : 1;

  const baseItems: IScrollerItem[] = images.map((image, originalIndex) => {
    const srcItem = getLargestSrcItem(image.sizes);
    const naturalRatio = srcItem ? srcItem.width / srcItem.height : 1;
    const width = equalHeight
      ? height * naturalRatio * equalHeightScale
      : itemWidth;
    const itemHeight = equalHeight
      ? height
      : Math.min(height, itemWidth / naturalRatio);
    const src = srcItem?.src || image.original?.url;

    return {image, originalIndex, src, width, height: itemHeight};
  });

  const totalBaseWidth =
    baseItems.reduce((sum, item) => sum + item.width, 0) +
    Math.max(0, baseItems.length - 1) * (gap || 0);

  // One set contains available images only. Duplicate within set only if it is narrower than viewport.
  const setRepeat =
    totalBaseWidth > 0 && totalBaseWidth < containerWidth
      ? Math.ceil(containerWidth / totalBaseWidth)
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
  const duration = setSpanWidth / Math.max(animationSpeed || 1, 1);
  const hasOutsideMetadata =
    (showTitle &&
      (titlePosition === ThumbnailTitlePosition.ABOVE ||
        titlePosition === ThumbnailTitlePosition.BELOW)) ||
    (showCaption &&
      (captionPosition === ThumbnailTitlePosition.ABOVE ||
        captionPosition === ThumbnailTitlePosition.BELOW)) ||
    showDescription ||
    false;

  return (
    <div
      ref={wrapperRef}
      className="reacg-scroller"
      style={{
        backgroundColor: backgroundColor || undefined,
        paddingTop: containerPadding,
        paddingBottom: containerPadding,
      }}
    >
      <div
        className={clsx(
          'reacg-scroller__track',
          'reacg-scroller__track--animating',
          {
            [`reacg-scroller__track--${scrollDirection || 'left'}`]: true,
            'reacg-scroller__track--paused': isPaused,
            'reacg-scroller__track--mixed-height': !equalHeight,
          }
        )}
        style={{
          animationDuration: `${duration}s`,
          height: !equalHeight && !hasOutsideMetadata ? height : undefined,
          ['--reacg-shift-px' as string]: `${setSpanWidth}px`,
          ['--reacg-gap' as string]: `${gap || 0}px`,
        }}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      >
        {[0, 1].map((setIndex) => (
          <div
            key={`set-${setIndex}`}
            className="reacg-scroller__set"
            aria-hidden={setIndex === 1}
          >
            {setItems.map((item, i) => (
              <div
                key={`${setIndex}-${i}-${item.image.id}`}
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
    </div>
  );
};

export {Scroller};
export default Scroller;
