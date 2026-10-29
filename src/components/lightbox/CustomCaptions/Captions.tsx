import React from 'react';
import {
  addToolbarButton,
  createModule,
  useLightboxProps,
} from 'yet-another-react-lightbox';
import {CaptionsButton} from './CaptionsButton';
import {CaptionsContextProvider} from './CaptionsContext';
import {Title} from './Title';

declare module 'yet-another-react-lightbox' {
  interface LightboxProps {
    captions?: {
      ref?: React.ForwardedRef<any>;
      showToggle?: boolean;
      descriptionTextAlign?: 'start' | 'end' | 'center';
      descriptionMaxLines?: number;
      hideOnSlideChange?: boolean;
    };
  }
}

export function Captions({augment, addModule}: any) {
  augment(
    ({
      captions: captionsProps,
      render: {slideFooter: renderFooter, ...restRender},
      toolbar,
      ...restProps
    }: any) => {
      const captions = resolveCaptionsProps(captionsProps);

      return {
        render: {
          slideFooter: ({slide}: any) => (
            <>
              {renderFooter?.({slide})}

              {slide.title && <Title title={slide.title} />}

              {/* {slide.description && (
                <Description description={slide.description} />
              )} */}
            </>
          ),
          ...restRender,
        },
        toolbar: addToolbarButton(
          toolbar,
          'CUSTOM_CAPTIONS',
          captions.showToggle ? <CaptionsButton /> : null
        ),
        captions,
        ...restProps,
      };
    }
  );

  addModule(createModule('CUSTOM_CAPTIONS', CaptionsContextProvider));
}

export const defaultCaptionsProps = {
  descriptionTextAlign: 'start' as const,
  descriptionMaxLines: 3,
  showToggle: false,
  hideOnSlideChange: false,
};

export const resolveCaptionsProps = (captions: any) => ({
  ...defaultCaptionsProps,
  ...captions,
});

export function useCaptionsProps() {
  const {captions} = useLightboxProps() as any;
  return resolveCaptionsProps(captions);
}
