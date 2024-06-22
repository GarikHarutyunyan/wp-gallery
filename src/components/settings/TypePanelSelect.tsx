import {MenuItem, Select, Typography} from '@mui/material';
import {ISelectOption} from 'components/controls';
import {useAppInfo} from 'contexts/AppInfoContext';
import {GalleryType, GalleryTypeOptions} from 'data-structures';
import React from 'react';

const activeColor: string = '#135C92';
const inactiveColor: string = '#86A3B8';

interface ITypePanelSelectProps {
  onChange: (type: GalleryType) => void;
  value: GalleryType;
}

const TypePanelSelect: React.FC<ITypePanelSelectProps> = ({
  value: activeValue,
  onChange,
}) => {
  const {pluginUrl} = useAppInfo();

  return (
    <Select
      onChange={(event) => onChange(event.target.value as GalleryType)}
      value={activeValue}
      sx={{width: '200px'}}
    >
      {GalleryTypeOptions.map(({value, title}: ISelectOption) => {
        const isSelected: boolean = value === activeValue;

        return (
          <MenuItem value={value}>
            <div className={'type-panel-select__body'}>
              <img
                style={{
                  backgroundColor: isSelected ? activeColor : inactiveColor,
                }}
                src={`${pluginUrl}/assets/images/${value}.png`}
                className={'type-panel-select__image'}
                alt={title}
              />
              <Typography className={'type-panel-select__title'}>
                {title}
              </Typography>
            </div>
          </MenuItem>
        );
      })}
    </Select>
  );
};

export {TypePanelSelect};
