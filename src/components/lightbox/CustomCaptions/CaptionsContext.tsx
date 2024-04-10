import * as React from 'react';
import {resolveCaptionsProps} from './Captions';
import {
  getSlide,
  makeUseContext,
  useLightboxState,
} from 'yet-another-react-lightbox';
import {Description} from './Description';

export const CaptionsContext = React.createContext<any | null>(null);

export const useCaptions = makeUseContext(
  'useCaptions',
  'CaptionsContext',
  CaptionsContext
);

export function CaptionsContextProvider({captions, children}: any) {
  const {ref} = resolveCaptionsProps(captions);
  const {slides, globalIndex} = useLightboxState();

  const [visible, setVisible] = React.useState(true);

  const context = React.useMemo(
    () => ({
      visible,
      show: () => setVisible(true),
      hide: () => setVisible(false),
    }),
    [visible]
  );

  React.useImperativeHandle(ref, () => context, [context]);

  return (
    <CaptionsContext.Provider value={context}>
      {children}
      <Description
        description={
          (getSlide(slides as any, globalIndex) as any)?.description as any
        }
        style={{position: 'relative'}}
      />
    </CaptionsContext.Provider>
  );
}
