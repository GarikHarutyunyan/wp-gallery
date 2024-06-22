import axios from 'axios';
import React, {useLayoutEffect, useState} from 'react';
import {useAppInfo} from './AppInfoContext';

const GoogleFontsContext = React.createContext<{
  googleFonts?: any[];
}>({});

const GoogleFontsProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const {baseUrl, nonce} = useAppInfo();
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

  return (
    <GoogleFontsContext.Provider value={{googleFonts: options}}>
      {children}
    </GoogleFontsContext.Provider>
  );
};

export {GoogleFontsContext, GoogleFontsProvider};
