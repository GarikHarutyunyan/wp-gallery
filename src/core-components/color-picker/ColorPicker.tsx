import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {DEFAULT_CONVERTER, converters} from './transformers';
import PickerDialog from './PickerDialog';
import {TextField} from '@mui/material';

interface IColorPickerProps {
  value: string;
  onChange: any;
  convert: any;
  name: string;
  id: string;
  hintText: string;
  placeholder: string;
  label: string;
  floatingLabelText: string;
  TextFieldProps: any;
  showPicker: boolean;
  setShowPicker: any;
  internalValue: string;
  setValue: any;
}

const ColorPicker: React.FC<IColorPickerProps & any> = ({
  onChange,
  convert = DEFAULT_CONVERTER,
  name,
  id,
  hintText,
  placeholder,
  floatingLabelText,
  label,
  TextFieldProps,
  value,
  ...custom
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [internalValue, setValue] = useState<any>();

  return (
    <>
      <TextField
        name={name}
        id={id}
        label={floatingLabelText || label}
        placeholder={hintText || placeholder}
        onClick={() => setShowPicker(true)}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        InputProps={{
          style: {color: value === undefined ? internalValue : value},
        }}
        {...TextFieldProps}
        {...custom}
        value={value === undefined ? internalValue : value}
      />
      {showPicker && (
        <PickerDialog
          value={value === undefined ? internalValue : value}
          onClick={() => {
            setShowPicker(false);
            onChange(value);
          }}
          onChange={(c) => {
            const newValue: any = (converters as any)[convert](c);
            setValue(newValue);
            onChange(newValue);
          }}
        />
      )}
    </>
  );
};

const MakedColorPicker = ColorPicker;

// const ColorPickerField = ({
//   input: {value, onChange, ...restInput},
//   meta: {touched, error},
//   ...restProps
// }) => (
//   <MakedColorPicker
//     value={value}
//     onChange={onChange}
//     errorText={touched && error}
//     {...restInput}
//     {...restProps}
//   />
// );

export {MakedColorPicker};

// export {ColorPickerField};
