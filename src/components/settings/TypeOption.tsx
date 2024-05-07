import {Typography} from '@mui/material';
import {AppInfoContext} from 'contexts/AppInfoContext';
import {GalleryType} from 'data-structures';
import React, {useContext} from 'react';

interface ITypeOptionProps {
  title: string;
  value: GalleryType;
  isSelected: boolean;
  onClick: (value: GalleryType) => void;
}

const fetchImage = async () => {
  const response = await import(`../../assets/mosaic.png`);
  console.log(response.default);
  //   setSrc(response.default);
};

fetchImage();

const TypeOption: React.FC<ITypeOptionProps> = ({
  title,
  value,
  isSelected,
  onClick,
}) => {
  const {pluginUrl} = useContext(AppInfoContext);

  const onOptionClick = () => {
    onClick(value);
  };

  return (
    <div>
      <Typography
        gutterBottom
        variant="subtitle2"
        component="div"
        style={{margin: '5px'}}
      >
        {title}
      </Typography>
      <div onClick={onOptionClick} style={{margin: '5px'}}>
        <img
          style={{
            width: '200px',
            height: '140px',
            backgroundColor: isSelected ? '#135C92' : '#86A3B8',
            borderRadius: '2px',
          }}
          src={`${pluginUrl}/assets/images/${value}.png`}
        />
      </div>
    </div>
  );
};

export {TypeOption};
