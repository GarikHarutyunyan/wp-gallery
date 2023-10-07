import React, {useEffect, useRef, useState} from 'react';
import PhotoAlbum from 'react-photo-album';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';
import {SettingsProvider} from './settings/SettingsContext';
import {ThumbnailGalleryWithSettings} from './ThumbnailGallery.tsx/ThumbnailGalleryWithSettings';

const Gallery = () => {
  return (
    <div
      style={{
        width: '75%',
        margin: '0 auto',
      }}
    >
      <SettingsProvider>
        <ThumbnailGalleryWithSettings />
      </SettingsProvider>
      {/* <Lightbox
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        open={selectedIndex > 0}
        index={selectedIndex}
        close={() => setSelectedIndex(-1)}
        slides={itemData.map((data) => ({src: data.img}))}
      /> */}
    </div>
  );
};

export default Gallery;
