import clsx from 'clsx';
import {
  HoverEffect,
  IImageDTO,
  IScrollerSettings,
  ScrollerDirection,
  ThumbnailTitlePosition,
} from 'data-structures';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {getLargestSrcItem, ISrcSetItem} from 'utils/imageSrcSet';
import './scroller.css';
import {fillWithClones, getResponsiveScale} from './Scroller.utils';
import {IScrollerItem, ScrollerItem} from './ScrollerItem';

interface IRowData {
  itemsInSet: IScrollerItem[];
  spanWidth: number;
  duration: number;
}

interface IScrollerProps {
  images: IImageDTO[];
  settings: IScrollerSettings;
  onClick?: (index: number) => void;
}

const Scroller: React.FC<IScrollerProps> = ({images, settings, onClick}) => {
  const {
    height,
    equalHeight,
    width,
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
  } = settings;
  const reverseScrollDirection: ScrollerDirection =
    scrollDirection === ScrollerDirection.LEFT
      ? ScrollerDirection.RIGHT
      : ScrollerDirection.LEFT;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [itemWidth, setItemWidth] = useState<number>(200);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    if (!wrapperRef.current || !images.length) return;

    const updateLayout = (currentWidth: number) => {
      setContainerWidth(currentWidth);
      const scale = getResponsiveScale(currentWidth);
      const scaledConfiguredWidth = Math.max(50, Math.round(width * scale));

      setItemWidth(scaledConfiguredWidth);
    };

    updateLayout(wrapperRef.current.clientWidth);

    const observer = new ResizeObserver((entries) => {
      updateLayout(entries[0].contentRect.width);
    });

    observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, [images.length, width, gap]);

  const effectiveContainerWidth =
    containerWidth || wrapperRef.current?.clientWidth || 800;
  const responsiveScale: number = getResponsiveScale(effectiveContainerWidth);
  const responsiveHeight: number = Math.max(
    50,
    Math.round(height * responsiveScale)
  );

  const scrollerItems: IScrollerItem[] = useMemo(
    () =>
      images.map((image: IImageDTO, originalIndex: number) => {
        const srcItem: ISrcSetItem = getLargestSrcItem(image.sizes);
        const ratio: number = srcItem ? srcItem.width / srcItem.height : 1;
        let width: number;
        let itemHeight: number;

        if (equalWidth && equalHeight) {
          width = itemWidth;
          itemHeight = responsiveHeight;
        } else if (equalWidth) {
          width = itemWidth;
          itemHeight = Math.min(responsiveHeight, itemWidth / ratio);
        } else if (equalHeight) {
          itemHeight = responsiveHeight;
          width = responsiveHeight * ratio;
        } else {
          // Use configured width/height as max bounds and preserve natural ratio.
          const maxWidth = itemWidth;
          const widthByHeight = responsiveHeight * ratio;
          if (widthByHeight <= maxWidth) {
            width = widthByHeight;
            itemHeight = responsiveHeight;
          } else {
            width = maxWidth;
            itemHeight = maxWidth / ratio;
          }
        }

        const src = srcItem?.src || image.original?.url;

        return {image, originalIndex, src, width, height: itemHeight};
      }),
    [images, itemWidth, responsiveHeight, equalWidth, equalHeight]
  );

  const rowData: Array<IRowData> = useMemo(() => {
    // TODO: use constant for 6 rows max and validate rowCount in settings
    const normalizedRowCount = Math.max(1, Math.min(6, Math.round(rowCount)));
    const itemsCountPerRow: number = Math.floor(
      scrollerItems.length / normalizedRowCount
    );
    const remainder: number = scrollerItems.length % normalizedRowCount;

    const result: Array<IRowData> = [];
    let offset: number = 0;

    for (let rowIndex = 0; rowIndex < normalizedRowCount; rowIndex++) {
      const rowItemsCount = itemsCountPerRow + (rowIndex < remainder ? 1 : 0);
      const baseItems: IScrollerItem[] = scrollerItems.slice(
        offset,
        offset + rowItemsCount
      );

      if (baseItems.length > 0) {
        const rowItems: IScrollerItem[] = fillWithClones(
          baseItems,
          gap,
          effectiveContainerWidth
        );

        const rowItemsWidth: number = rowItems.reduce(
          (sumOfWidth: number, item: IScrollerItem) => sumOfWidth + item.width,
          0
        );
        const rowItemsGap: number =
          Math.max(0, rowItems.length - 1) * (gap || 0);
        const totalRowItemsWidth = rowItemsWidth + rowItemsGap;
        const spanWidth = totalRowItemsWidth + gap;

        const newRowData: IRowData = {
          itemsInSet: rowItems,
          spanWidth,
          duration: spanWidth / Math.max(animationSpeed, 1),
        };

        result.push(newRowData);

        offset += rowItemsCount;
      }
    }
    return result;
  }, [
    scrollerItems,
    rowCount,
    gap,
    animationSpeed,
    effectiveContainerWidth,
    itemWidth,
  ]);

  const isTitleAbove: boolean = titlePosition === ThumbnailTitlePosition.ABOVE;
  const isTitleBelow: boolean = titlePosition === ThumbnailTitlePosition.BELOW;
  const isCaptionAbove: boolean =
    captionPosition === ThumbnailTitlePosition.ABOVE;
  const isCaptionBelow: boolean =
    captionPosition === ThumbnailTitlePosition.BELOW;
  const isButtonAbove: boolean =
    buttonPosition === ThumbnailTitlePosition.ABOVE;
  const isButtonBelow: boolean =
    buttonPosition === ThumbnailTitlePosition.BELOW;
  const hasOutsideTitle: boolean = showTitle && (isTitleAbove || isTitleBelow);
  const hasOutsideCaption: boolean =
    showCaption && (isCaptionAbove || isCaptionBelow);
  const hasOutsideButton: boolean =
    showButton && (isButtonAbove || isButtonBelow);

  const hasOutsideMetadata: boolean =
    hasOutsideTitle || hasOutsideCaption || hasOutsideButton;

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

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
        const rowDirection: ScrollerDirection =
          rowIndex % 2 === 0 ? scrollDirection : reverseScrollDirection;
        const rowHeight =
          !equalHeight && !hasOutsideMetadata ? responsiveHeight : undefined;
        const isLeftScroll: boolean = rowDirection === ScrollerDirection.LEFT;
        const animationDurationString: string = `${row.duration}s`;
        const shiftPxString: string = `${row.spanWidth}px`;
        const gapString: string = `${gap || 0}px`;

        return (
          <div
            key={`row-${rowIndex}`}
            className={clsx(
              'reacg-scroller__track',
              'reacg-scroller__track--animating',
              {
                'reacg-scroller__track--left': isLeftScroll,
                'reacg-scroller__track--right': !isLeftScroll,
                'reacg-scroller__track--paused': isPaused,
                'reacg-scroller__track--mixed-height': !equalHeight,
              }
            )}
            style={{
              animationDuration: animationDurationString,
              height: rowHeight,
              ['--reacg-shift-px' as string]: shiftPxString,
              ['--reacg-gap' as string]: gapString,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {[0, 1].map((setIndex) => (
              <div
                key={`set-${rowIndex}-${setIndex}`}
                className="reacg-scroller__set"
                aria-hidden={setIndex === 1}
              >
                {row.itemsInSet.map((item, i) => (
                  <div
                    key={`${rowIndex}-${setIndex}-${i}-${item.image.id}`}
                    className="reacg-scroller__item"
                    style={{
                      width: item.width,
                    }}
                  >
                    <ScrollerItem
                      item={item}
                      imageHeight={item.height}
                      hoverEffect={hoverEffect}
                      padding={padding}
                      paddingColor={paddingColor}
                      borderRadius={borderRadius}
                      showVideoCover={showVideoCover}
                      onClick={onClick}
                      settings={settings}
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

export {Scroller};
export default Scroller;
