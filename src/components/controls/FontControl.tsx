import {MenuItem, TextField} from '@mui/material';
import {AppInfoContext} from 'AppInfoContext';
import axios from 'axios';
import React, {useContext, useLayoutEffect, useState} from 'react';

interface IFontControlProps {
  name: string;
  value: string;
  onChange: any;
  isDisabled?: boolean;
}

const FontControl: React.FC<IFontControlProps> = ({
  name,
  value,
  onChange,
  isDisabled,
}) => {
  const {baseUrl, nonce} = useContext(AppInfoContext);
  const [options, setOptions] = useState<any[]>([]);

  const getData = async () => {
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'google-fonts'
      : undefined;

    if (fetchUrl) {
      try {
        const response = await axios.get(fetchUrl, {
          headers: {'X-WP-Nonce': nonce},
        });
        const fontData: object = response.data;
        const newOptions: any[] = Object.values(fontData).map((data: any) => ({
          value: data,
          title: data,
        }));

        setOptions(newOptions);
      } catch (error) {
        console.error(error);
        setOptions([]);
      }
    }
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  const onValueChange = (event: any) => {
    onChange(event.target.value);
  };

  return (
    <TextField
      select
      fullWidth
      label={name}
      variant="standard"
      margin="none"
      value={value}
      onChange={onValueChange}
      disabled={isDisabled}
    >
      {options.map(({value, title}) => (
        <MenuItem key={value} value={value}>
          <span style={{fontFamily: value}}>{title}</span>
        </MenuItem>
      ))}
    </TextField>
  );
};

export {FontControl};
