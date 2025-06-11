import {useData} from 'components/data-context/useData';
import {ReacgPhotoAlbum} from 'components/photo-album/PhotoAlbum';
import {useSettings} from 'components/settings';
import {IJustifiedSettings} from 'data-structures';
import React from 'react';

interface IJustifiedGalleryProps {
  onClick?: (index: number) => void;
}

const JustifiedGallery: React.FC<IJustifiedGalleryProps> = ({onClick}) => {
  const {justifiedSettings: settings} = useSettings();
  const {images} = useData();
  const {gap, backgroundColor, containerPadding, padding, rowHeight, width} =
    settings as IJustifiedSettings;
  return (
    <ReacgPhotoAlbum
      images={images || []}
      layout={'rows'}
      width={width}
      rowHeight={rowHeight}
      gap={gap}
      padding={padding}
      backgroundColor={backgroundColor}
      containerPadding={containerPadding}
      settings={settings as IJustifiedSettings}
      onClick={onClick}
    />
  );
};

export {JustifiedGallery};
export default JustifiedGallery;
