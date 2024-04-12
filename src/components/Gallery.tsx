import React from 'react';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';
import {SettingsProvider} from './settings/SettingsContext';
import {ThumbnailGalleryWithSettings} from './thumbnail-gallery/ThumbnailGalleryWithSettings';

const Gallery: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        margin: '0 auto',
      }}
    >
      <SettingsProvider>
        <ThumbnailGalleryWithSettings />
      </SettingsProvider>
    </div>
  );
};

export default Gallery;
