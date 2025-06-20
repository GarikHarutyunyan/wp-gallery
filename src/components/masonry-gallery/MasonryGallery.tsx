import {useData} from 'components/data-context/useData';
import {ReacgPhotoAlbum} from 'components/photo-album/PhotoAlbum';
import {useSettings} from 'components/settings';
import {IMasonrySettings} from 'data-structures';
import React from 'react';

interface IMasonryGalleryProps {
  onClick?: (index: number) => void;
}

const MasonryGallery: React.FC<IMasonryGalleryProps> = ({onClick}) => {
  const {masonrySettings: settings} = useSettings();
  const {images} = useData();
  const {gap, padding, width, columns} = settings as IMasonrySettings;

  return (
    <ReacgPhotoAlbum
      images={images || []}
      layout={'masonry'}
      width={width}
      columns={columns}
      gap={gap}
      padding={padding}
      settings={settings as IMasonrySettings}
      onClick={onClick}
    />
  );
};

export {MasonryGallery};
export default MasonryGallery;
