import clsx from 'clsx';
import * as React from 'react';
import {
  cssClass,
  cssVar,
  useController,
  useLightboxProps,
} from 'yet-another-react-lightbox';
import {useCaptions} from './CaptionsContext';

const cssPrefix = (className: string) => cssClass(`slide_${className}`);

export type TitleProps = Pick<any, 'title'>;

export const Title: React.FC<any> = ({title}: any) => {
  const {toolbarWidth} = useController();
  const {styles} = useLightboxProps() as any;
  const {visible} = useCaptions();

  if (!visible) return null;

  return (
    <div
      style={styles.captionsTitleContainer}
      className={clsx(
        cssPrefix('captions_container'),
        cssPrefix('title_container')
      )}
    >
      <div
        className={cssPrefix('title')}
        style={{
          ...(toolbarWidth
            ? {[cssVar('toolbar_width')]: `${toolbarWidth}px`}
            : null),
          ...styles.captionsTitle,
        }}
      >
        {title}
      </div>
    </div>
  );
};
