import {Box, ImageListItemBar} from '@mui/material';
import clsx from 'clsx';
import {DuotoneFilter} from 'components/image-editor-popover/DuotoneFilter';
import ImageEditorPopover from 'components/image-editor-popover/ImageEditorPopover';
import ReImage from 'core-components/re-image/ReImage';
import {
  IImageDTO,
  IMasonrySettings,
  ImageType,
  TitlePosition,
  TitleVisibility,
} from 'data-structures';
import React, {CSSProperties, ReactNode, useRef, useState} from 'react';
import Cropper from 'react-easy-crop';
import {createIcon} from 'yet-another-react-lightbox';
import './photo-album.css';

const VideoThumbnailIcon = createIcon(
  'VideoThumbnail',
  <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
);

const getThumbnailIconSize = (width: number, height: number) => {
  const size: number = Math.min(width, height, 55) - 10;

  return size > 0 ? `${size}px` : '0px';
};

interface IPhotoAlbumItemProps extends React.PropsWithChildren {
  image: IImageDTO;
  imageProps: any;
  width: number;
  height: number;
  onClick?: () => void;
  settings: IMasonrySettings;
  style: CSSProperties;
  editableImage: IImageDTO | null;
  setEditableImage: (image: IImageDTO | null) => void;
}

const PhotoAlbumItem: React.FC<IPhotoAlbumItemProps> = ({
  image,
  imageProps,
  width,
  height,
  onClick,
  settings,
  style,
  setEditableImage,
  editableImage,
  children,
}) => {
  const {
    padding,
    paddingColor,
    borderRadius,
    titleVisibility,
    titleAlignment,
    titlePosition,
    titleColor,
    titleFontFamily,
    titleFontSize,
    hoverEffect,
  } = settings;
  const imageBorderRadius =
    padding < borderRadius / 2 ? borderRadius - padding : borderRadius / 2;

  const [crop, setCrop] = useState<{x: number; y: number}>({
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = useState<number>(0);
  const [duotoneShadowColor, setDuotoneShadowColor] =
    useState<string>('#000000');
  const [duotoneHighlightColor, setDuotoneHighlightColor] =
    useState<string>('#ffffff');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isCropping, setIsCropping] = useState<boolean>(false);
  const [cropedArea, setCropedArea] = useState<any>(null);
  const [cropTransform, setCropTransform] = useState<string>('');
  const [aspect, setAspect] = useState<number>(4 / 3);
  const [rotation, setRotation] = useState<number>(0);
  // ✅  edit click handler
  const handleEditClick = (
    image: any,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget as HTMLElement);
    setEditableImage(image);
  };

  const onCropChange = (newCrop: any) => {
    if (!image) return;

    setCrop(newCrop);
  };

  const onZoomChange = (newZoom: any) => {
    if (!image) return;
    setZoom(newZoom);
  };
  const renderTitle = (): ReactNode => {
    return image ? (
      <div
        className={clsx('photo-album-item__title', {
          'photo-album-item__title_on-hover':
            titleVisibility === TitleVisibility.ON_HOVER,
          'photo-album-item__title_hidden':
            titleVisibility === TitleVisibility.NONE,
        })}
        key={image.id}
      >
        <ImageListItemBar
          sx={{
            '& .MuiImageListItemBar-title,.MuiImageListItemBar-subtitle': {
              fontSize: `${titleFontSize}px`,
              fontFamily: titleFontFamily,
              lineHeight: 'normal',
            },
          }}
          style={{
            textAlign: titleAlignment,
            color: titleColor,
          }}
          className={clsx({
            'photo-album-item__title-content_center':
              titlePosition === TitlePosition.CENTER,
          })}
          title={<span>{image.title || <br />}</span>}
          subtitle={
            image.caption && (
              <span className="photo-album-item__caption">{image.caption}</span>
            )
          }
          position={
            titlePosition !== TitlePosition.CENTER ? titlePosition : 'bottom'
          }
        />
      </div>
    ) : null;
  };

  const wrapperRef = useRef(null);
  const onCropComplete = (croppedArea: any) => {
    setCropedArea(croppedArea);
  };

  return (
    <>
      <div
        style={{
          background: paddingColor,
          borderRadius: `${borderRadius}px`,
          ...style,
        }}
        onClick={onClick}
      >
        <div
          onClick={(e) => {
            e.stopPropagation(); // Prevent gallery click
            handleEditClick?.(image, e);
          }}
          ref={wrapperRef}
          className={clsx(
            'photo-album-item__image-wrapper',
            'photo-album-item__image-wrapper_overflow',
            'photo-album-item__image-wrapper_' + hoverEffect,
            {'photo-album-item__image-wrapper_clickable': !!onClick}
          )}
          style={{
            borderRadius: `${imageBorderRadius}px`,
          }}
        >
          {' '}
          <DuotoneFilter
            key={image!.id}
            id={`duotone-${image!.id}`}
            shadowColor={duotoneShadowColor}
            highlightColor={duotoneHighlightColor}
          />
          <ReImage
            wrapperRef={wrapperRef}
            {...imageProps}
            style={{
              width: '100%',
              height: '100%',
              transform: cropTransform,
              transformOrigin: 'center center',
              filter: `url(#duotone-${image.id})`,
              display: 'block',
            }}
          />
          {isCropping && editableImage!.id === image.id ? (
            <Box
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              zIndex={10}
              bgcolor="rgba(0, 0, 0, 0.5)"
              style={{filter: `url(#duotone-${image.id})`}}
            >
              <Cropper
                image={image.original.url}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                rotation={rotation}
                onCropChange={onCropChange}
                onZoomChange={onZoomChange}
                onCropComplete={onCropComplete}
                cropShape="rect"
                showGrid={true}
                objectFit="contain"
              />
            </Box>
          ) : null}
          {image.type === ImageType.VIDEO && (
            <VideoThumbnailIcon
              style={{
                height: getThumbnailIconSize(width, height),
                width: getThumbnailIconSize(width, height),
              }}
              className={clsx('photo-album-item__video-icon', {
                'photo-album-item__image-wrapper_clickable': !!onClick,
              })}
            />
          )}
          {renderTitle()}
        </div>
      </div>

      {editableImage?.id === image.id ? (
        <ImageEditorPopover
          anchorEl={anchorEl}
          open={!!anchorEl}
          image={image}
          setIsCropping={setIsCropping}
          isCropping={isCropping}
          onClose={() => {
            setAnchorEl(null);
            setIsCropping(false);
          }}
          cropedArea={cropedArea}
          setCropTransform={setCropTransform}
          onZoomChange={onZoomChange}
          zoom={zoom}
          setAspect={setAspect}
          aspect={aspect}
          setRotation={setRotation}
          rotation={rotation}
          setDuotoneShadowColor={setDuotoneShadowColor}
          duotoneShadowColor={duotoneShadowColor}
          setDuotoneHighlightColor={setDuotoneHighlightColor}
          duotoneHighlightColor={duotoneHighlightColor}
        />
      ) : null}
    </>
  );
};

export {PhotoAlbumItem};
