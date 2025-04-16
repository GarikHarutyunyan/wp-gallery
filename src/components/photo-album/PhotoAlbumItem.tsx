import {ImageListItemBar} from '@mui/material';
import clsx from 'clsx';
import {
  IImageDTO,
  IMasonrySettings,
  ImageType,
  TitlePosition,
  TitleVisibility,
} from 'data-structures';
import React, {CSSProperties, ReactNode, useRef} from 'react';
import {CSSTransition} from 'react-transition-group';
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
  width: number;
  height: number;
  onClick?: () => void;
  settings: IMasonrySettings;
  style: CSSProperties;
  index: number;
}

const PhotoAlbumItem: React.FC<IPhotoAlbumItemProps> = ({
  image,
  width,
  height,
  onClick,
  settings,
  style,
  children,
  index,
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
  const nodeRef = useRef(null);

  type TransitionEffectProps = {
    name: string;
    children: React.ReactElement;
    in: boolean;
    timeout: number | {enter: number; exit: number};
    mountOnEnter?: boolean;
    unmountOnExit?: boolean;
  };
  type TransitionProps = {
    children: React.ReactElement;
    in: boolean;
    timeout: number | {enter: number; exit: number};
    mountOnEnter?: boolean;
    unmountOnExit?: boolean;
  };

  const TransitionEffect: React.FC<TransitionEffectProps> = ({
    name,
    children,
    ...other
  }) => {
    // Combine the class names without using classnames library
    const combinedClassNames = `${children.props.className || ''} ${name}`;

    return (
      <CSSTransition classNames={name} appear {...other}>
        {React.cloneElement(children, {
          className: combinedClassNames.trim(), // Trim to avoid extra spaces
        })}
      </CSSTransition>
    );
  };

  const Grow: React.FC<TransitionProps> = ({children, ...other}) => (
    <TransitionEffect name="grow" {...other}>
      {children}
    </TransitionEffect>
  );
  const Loader: React.FC = () => (
    <div className="loader">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  );
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
          style={{
            textAlign: titleAlignment,
            color: titleColor,
          }}
          className={clsx({
            'photo-album-item__title-content_center':
              titlePosition === TitlePosition.CENTER,
          })}
          title={
            <span
              style={{
                color: titleColor,
                fontFamily: titleFontFamily,
                fontSize: `${titleFontSize}px`,
              }}
            >
              {image.title || <br />}
            </span>
          }
          position={
            titlePosition !== TitlePosition.CENTER ? titlePosition : 'bottom'
          }
        />
      </div>
    ) : null;
  };

  return (
    <div
      style={{
        background: paddingColor,
        borderRadius: `${borderRadius}px`,

        ...style,
      }}
      onClick={onClick}
    >
      <Grow in timeout={300}>
        <div
          className={clsx(
            'photo-album-item__image-wrapper',
            'photo-album-item__image-wrapper_overflow',
            'photo-album-item__image-wrapper_' + hoverEffect,
            {'photo-album-item__image-wrapper_clickable': !!onClick}
          )}
          style={{
            borderRadius: `${imageBorderRadius}px`,
            transitionDuration: `${600 + index * 80}ms`,
            transitionDelay: `${index * 60}ms`,
          }}
        >
          {children}
          {image.type === ImageType.VIDEO && (
            <VideoThumbnailIcon
              style={{
                height: getThumbnailIconSize(width, height),
                width: getThumbnailIconSize(width, height),
              }}
              className={clsx('yarl__thumbnails_thumbnail_icon', {
                'photo-album-item__video-icon': !!onClick,
              })}
            />
          )}

          {renderTitle()}
        </div>
      </Grow>
    </div>
  );
};

export {PhotoAlbumItem};
