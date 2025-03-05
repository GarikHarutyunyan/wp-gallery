import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {MenuItem, TextField} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import {Aligner} from 'core-components';
import React, {CSSProperties, forwardRef, ReactNode} from 'react';
import './select-control.css';

interface ISelectOption {
  title: string;
  value: string;
  render?: (value?: string) => ReactNode;
  isDisabled?: boolean;
}

export enum ReSize {
  SMALL = 'small',
  MEDIUM = 'medium',
}

interface ISelectControlProps {
  id?: string;
  name?: string;
  info?: ReactNode;
  value: string | number;
  options: ISelectOption[];
  onChange: any;
  isDisabled?: boolean;
  hideLabel?: boolean;
  size?: ReSize;
  style?: CSSProperties;
}

const SelectControl: React.FC<ISelectControlProps> = forwardRef(
  (
    {
      id,
      name,
      info,
      value,
      options,
      onChange,
      isDisabled,
      hideLabel,
      size,
      style,
    },
    ref
  ) => {
    const onValueChange = (event: any) => {
      onChange(event.target.value, id);
    };

    const renderValue = (selectedValue: any) => {
      const selectedOption: ISelectOption | undefined = options.find(
        (option) => option.value === selectedValue
      );

      return <>{selectedOption?.title || ''}</>;
    };

    const renderLabel = (): ReactNode => {
      const label: string | undefined = !hideLabel ? name : undefined;
      if (!info) {
        return label;
      } else {
        return (
          <Aligner gap={4}>
            {label}
            {renderInfo()}
          </Aligner>
        );
      }
    };

    const renderInfo = () => {
      return (
        <Tooltip title={info}>
          <InfoOutlinedIcon fontSize={'small'} style={{cursor: 'pointer'}} />
        </Tooltip>
      );
    };

    return (
      <TextField
        ref={ref as any}
        select
        fullWidth
        label={renderLabel()}
        variant={'standard'}
        margin={'none'}
        value={value}
        onChange={onValueChange}
        disabled={isDisabled}
        style={style}
        size={size}
        hiddenLabel={hideLabel}
        inputProps={{renderValue}}
      >
        {options.map(({value, title, render, isDisabled}) => {
          return (
            <MenuItem key={value} value={value} disabled={isDisabled}>
              {render?.(value) || title}
            </MenuItem>
          );
        })}
      </TextField>
    );
  }
);

export {SelectControl, type ISelectOption};
