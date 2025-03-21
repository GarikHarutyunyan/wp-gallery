import React from 'react';

import {Box} from '@mui/material';
import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {Button} from 'core-components/button';
import {IStaggeredSettings} from 'data-structures';
import './StaggeredGallery.css';
interface IStaggeredGalleryProps {
  onClick?: (index: number) => void;
}
const StaggeredGallery: React.FC<IStaggeredGalleryProps> = ({onClick}) => {
  const {staggeredSettings: settings} = useSettings();
  const {images} = useData();
  const {
    titleColor,
    descriptionColor,
    titleFontFamily,
    titleFontSize,
    descriptionFontSize,
    buttonColor,
    buttonTextColor,
    backgroundColor,
    sizeType,
    width,
    height,
  } = settings as IStaggeredSettings;

  return (
    <Box>
      <div
        style={{fontFamily: titleFontFamily, backgroundColor: backgroundColor}}
        className="staggered-gallery"
      >
        {images!.map((image) => {
          return (
            <div className="staggered-gallery-row">
              <div
                className="straggered-img-conteiner"
                style={{width: `${width}%`, height: `${height}${sizeType}`}}
              >
                <img src={image.thumbnail.url} alt={image.title} />
              </div>
              <div className="staggered-text-conteiner">
                <div className="staggered-text-conteiner-content">
                  <h1 style={{fontSize: titleFontSize, color: titleColor}}>
                    Helloo Woorkd
                  </h1>
                  <p
                    style={{
                      fontSize: descriptionFontSize,
                      color: descriptionColor,
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Explicabo quis inventore, perferendis repellat sint
                    excepturi tenetur doloribus, eligendi magnam expedita quam.
                    Minus ex, unde impedit minima reprehenderit rem fugiat
                    beatae.
                  </p>
                  <Button
                    className={'pagination-provider__load-more-button'}
                    style={{
                      backgroundColor: buttonColor,
                      color: buttonTextColor,
                    }}
                  >
                    {`see more`}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Box>
  );
};
export {StaggeredGallery};
export default StaggeredGallery;
