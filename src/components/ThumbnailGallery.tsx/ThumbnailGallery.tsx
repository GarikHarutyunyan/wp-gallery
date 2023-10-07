import {ImageList, ImageListItem, ImageListItemBar} from '@mui/material';
import {IThumbnailSettings} from 'components/settings';
import {IImageDTO, TitlePosition} from 'data-structures';
import React, {useEffect, useMemo, useRef, useState} from 'react';

interface IThumbnailGalleryProps {
  images: IImageDTO[];
  settings: IThumbnailSettings;
}

const ThumbnailGallery: React.FC<IThumbnailGalleryProps> = ({
  images,
  settings,
}) => {
  const {
    width,
    height,
    columns,
    gap,
    backgroundColor,
    padding,
    paddingColor,
    borderWidth,
    borderRadius,
    borderColor,

    titlePosition,
    titleColor,
    titleFontSize,
  } = settings;
  const elementRef = useRef();
  const [containerWidth, setContainerWidth] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const changeContainerWidth = () => {
    const divElement = elementRef?.current;
    console.log((divElement as any)?.clientWidth);
    setContainerWidth((divElement as any)?.clientWidth);
  };

  useEffect(() => {
    changeContainerWidth();
    window.addEventListener('resize', () => changeContainerWidth());
  }, []);

  const getValidColumnsCount = (columns: number): number => {
    // debugger;
    if (
      !containerWidth ||
      width * columns +
        (columns - 1) * gap +
        columns * 2 * (padding + borderWidth) <=
        containerWidth
    ) {
      return columns;
    }

    return getValidColumnsCount(columns - 1);
  };

  const validColumnsCount = useMemo(
    () => getValidColumnsCount(columns),
    [columns, containerWidth]
  );

  useEffect(() => {
    changeContainerWidth();
  }, [width, gap, columns, padding, borderWidth, validColumnsCount]);

  const getWidth = useMemo((): number => {
    debugger;
    if (containerWidth) {
      const gaap =
        (validColumnsCount - 1) * gap +
        validColumnsCount * 2 * (padding + borderWidth);
      const a = containerWidth - gaap;

      return a / validColumnsCount;
    }

    return width;
  }, [
    containerWidth,
    width,
    gap,
    columns,
    padding,
    borderWidth,
    validColumnsCount,
  ]);

  return (
    <div
      style={{
        width:
          width * columns +
          (columns - 1) * gap +
          columns * 2 * (padding + borderWidth) +
          'px',
        margin: '0 auto',
        overflow: 'hidden',
        maxWidth: '100%',
      }}
    >
      <div
        ref={elementRef as any}
        style={{
          overflow: 'hidden',
          maxWidth: '100%',
          backgroundColor,
        }}
      >
        <ImageList
          cols={validColumnsCount}
          gap={gap}
          style={{margin: '0 auto'}}
        >
          {images.map((image, index) => (
            <ImageListItem key={image.uri}>
              <img
                src={`${image.uri}?w=164&h=$164&fit=crop&auto=format`}
                srcSet={`${image.uri}?w=164&h=$164&fit=crop&auto=format`}
                alt={image.title}
                loading="lazy"
                onClick={() => setSelectedIndex(index)}
                style={{
                  width: getWidth + 'px',
                  height: height + 'px',
                  padding: padding + 'px',
                  background: paddingColor,
                  border: borderWidth + 'px solid' + borderColor,
                  borderRadius: borderRadius + 'px',
                }}
              />
              {titlePosition !== 'hidden' && (
                <ImageListItemBar
                  title={
                    <span
                      style={{
                        color: titleColor,
                        fontSize: titleFontSize + 'px',
                      }}
                    >
                      {image.title}
                    </span>
                  }
                  position={titlePosition as TitlePosition}
                  style={{
                    borderBottomLeftRadius:
                      titlePosition === TitlePosition.BOTTOM
                        ? borderRadius + 'px'
                        : undefined,
                    borderBottomRightRadius:
                      titlePosition === TitlePosition.BOTTOM
                        ? borderRadius + 'px'
                        : undefined,
                    borderTopLeftRadius:
                      titlePosition === TitlePosition.TOP
                        ? borderRadius + 'px'
                        : undefined,
                    borderTopRightRadius:
                      titlePosition === TitlePosition.TOP
                        ? borderRadius + 'px'
                        : undefined,
                  }}
                />
              )}
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
};

export {ThumbnailGallery};
