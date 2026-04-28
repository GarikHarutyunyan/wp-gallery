import {Box, MenuItem, Select, Typography} from '@mui/material';
import {ProIcon} from 'components/alert-dialog/icons/ProIcon';
import {usePro} from 'contexts/ProContext';
import {GalleryType} from 'data-structures';
import React from 'react';
import {GalleryTypeOptions} from './TypePanel.utils';

interface ITypePanelSelectProps {
  onChange: (type: GalleryType) => void;
  value: GalleryType;
}

const TypePanelSelect: React.FC<ITypePanelSelectProps> = ({
  value: activeValue,
  onChange,
}) => {
  const {isPro, isLoaded} = usePro();

  const handleChange = (event: any) => {
    const nextValue = event.target.value as GalleryType;
    const selectedOption = GalleryTypeOptions.find(
      ({value}) => value === nextValue
    );

    if (selectedOption?.isPro && !isLoaded) {
      return;
    }

    if (selectedOption?.isPro && !isPro) {
      (window as any).reacg_open_premium_offer_dialog?.({
        utm_medium: `layout_${nextValue}`,
      });
      return;
    }

    onChange(nextValue);
  };

  return (
    <Box>
      <Select
        onChange={handleChange}
        value={activeValue}
        sx={{width: '100%', borderRadius: '6px'}}
      >
        {GalleryTypeOptions.map(({value, title, image, isPro: requiresPro}) => {
          return (
            <MenuItem key={value} value={value}>
              <div className={'type-panel-select__body'}>
                {image}
                <Typography className={'type-panel-select__title'}>
                  {title}
                </Typography>
                {requiresPro && isLoaded && !isPro && (
                  <span className={'type-panel-select__pro-badge'}>
                    <ProIcon />
                  </span>
                )}
              </div>
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
};

export {TypePanelSelect};
