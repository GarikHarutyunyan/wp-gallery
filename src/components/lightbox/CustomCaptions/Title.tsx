import * as React from 'react';

import clsx from 'clsx';
import {useCaptions} from './CaptionsContext';
import {
  Slide,
  cssClass,
  cssVar,
  useController,
  useLightboxProps,
} from 'yet-another-react-lightbox';

const cssPrefix = (className: string) => cssClass(`slide_${className}`);

export type TitleProps = Pick<any, 'title'>;

export function Title({title}: any) {
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
}
