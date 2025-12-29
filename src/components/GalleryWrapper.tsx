import {TemplatesProvider, useAppInfo} from 'contexts';
import React from 'react';
import {GalleryWithSettings} from './GalleryWithSettings';
import {SettingsProvider} from './settings/SettingsContext';

const GalleryWrapper: React.FC = () => {
  const {galleryInstanceId} = useAppInfo();

  return (
    <div
      style={{
        width: '100%',
        margin: '0 auto',
      }}
      data-id={galleryInstanceId}
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
