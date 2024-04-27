import {useData} from 'components/data-context/useData';
import {IImageDTO} from 'data-structures';
import PhotoAlbum from 'react-photo-album';

interface IMosaicGalleryProps {
  onClick?: (index: number) => void;
}

const MosaicGallery: React.FC<IMosaicGalleryProps> = ({onClick}) => {
  const {images} = useData();
  console.log('🚀 ~ images:', images);

  return (
    <PhotoAlbum
      layout={'rows'}
      photos={images!.map((image: IImageDTO) => {
        console.log('🚀 ~ photos={images!.map ~ image:', image);
        return {
          width: image.original.width,
          height: image.original.height,
          src: image.original.url,
          srcSet: [
            {
              src: image.original.url,
              width: image.original.width,
              height: image.original.height,
            },
            {
              src: image.medium_large.url,
              width: image.medium_large.width,
              height: image.medium_large.height,
            },
            {
              src: image.thumbnail.url,
              width: image.thumbnail.width,
              height: image.thumbnail.height,
            },
          ],
        };
      })}
      onClick={(index) => (onClick as Function)(index)}
    />
  );
};

export {MosaicGallery};
