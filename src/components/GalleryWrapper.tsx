import {TemplatesProvider} from 'contexts';
import {ReactElement} from 'react';
import {GalleryWithSettings} from './GalleryWithSettings';
import {SettingsProvider} from './settings/SettingsContext';

const GalleryWrapper = (): ReactElement => {
  return (
    <div
      style={{
        width: '100%',
        margin: '0 auto',
      }}
    >
      <TemplatesProvider>
        <SettingsProvider>
          <GalleryWithSettings />
        </SettingsProvider>
      </TemplatesProvider>
    </div>
  );
};

export {GalleryWrapper};
