import {useCaptions} from './CaptionsContext';
import {
  Slide,
  cssClass,
  cssVar,
  useLightboxProps,
} from 'yet-another-react-lightbox';
import {defaultCaptionsProps, useCaptionsProps} from './Captions';
import clsx from 'clsx';

const cssPrefix = (className: string) => cssClass(`slide_${className}`);

export type DescriptionProps = Pick<any, 'description'>;

export function Description({description, style}: DescriptionProps | any) {
  const {descriptionTextAlign, descriptionMaxLines} = useCaptionsProps();
  const {styles} = useLightboxProps() as any;
  const {visible} = useCaptions();

  if (!visible) return null;

  // noinspection SuspiciousTypeOfGuard
  return (
    <div
      style={{...styles.captionsDescriptionContainer, style}}
      className={clsx(
        cssPrefix('captions_container'),
        cssPrefix('description_container')
      )}
    >
      <div
        className={cssPrefix('description')}
        style={{
          ...(descriptionTextAlign !==
            defaultCaptionsProps.descriptionTextAlign ||
          descriptionMaxLines !== defaultCaptionsProps.descriptionMaxLines
            ? {
                [cssVar('slide_description_text_align')]: descriptionTextAlign,
                [cssVar('slide_description_max_lines')]: descriptionMaxLines,
              }
            : null),
          ...styles.captionsDescription,
        }}
      >
        {typeof description === 'string'
          ? description
              .split('\n')
              // eslint-disable-next-line react/no-array-index-key
              .flatMap((line, index) => [
                ...(index > 0 ? [<br key={index} />] : []),
                line,
              ])
          : description}
      </div>
    </div>
  );
}
