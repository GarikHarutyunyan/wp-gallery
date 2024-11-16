import {TemplatesProvider} from 'contexts';
import React from 'react';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';
import {GalleryWithSettings} from './GalleryWithSettings';
import {SettingsProvider} from './settings/SettingsContext';

const GalleryWrapper: React.FC = () => {
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
