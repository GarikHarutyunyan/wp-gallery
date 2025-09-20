import {MenuItem, TextField} from '@mui/material';
import React, {CSSProperties, forwardRef, ReactNode} from 'react';
import {LabelWithTooltip} from './LabelWithTooltip';

interface ISelectOption {
  title: string;
  value: string;
  render?: (value?: string) => ReactNode;
  isDisabled?: boolean;
  className?: string;
}

export enum ReSize {
  SMALL = 'small',
  MEDIUM = 'medium',
}

interface ISelectControlProps {
  id?: string;
  name?: string;
  tooltip?: ReactNode;
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
      tooltip,
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

    return (
      <TextField
        ref={ref as any}
        select
        fullWidth
        label={<LabelWithTooltip label={name} tooltip={tooltip} />}
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
        {options.map(({value, title, render, isDisabled, className}) => {
          return (
            <MenuItem
              className={className}
              key={value}
              value={value}
              disabled={isDisabled}
            >
              {render?.(value) || title}
            </MenuItem>
          );
        })}
      </TextField>
    );
  }
);

export {SelectControl, type ISelectOption};
