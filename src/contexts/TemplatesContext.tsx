import axios from 'axios';
import {
  GalleryType,
  IGeneralSettings,
  ILightboxSettings,
  IMasonrySettings,
  IMosaicSettings,
  ISlideshowSettings,
  IThumbnailSettings,
} from 'data-structures';
import React, {useContext, useLayoutEffect, useState} from 'react';
import {useAppInfo} from './AppInfoContext';
import {
  template1,
  template2,
  template3,
  template4,
  template5,
} from './MockTemplates';

export interface ITemplate {
  id: string;
  name: string;
  type?: GalleryType;
  thumbnails?: IThumbnailSettings;
  mosaic?: IMosaicSettings;
  masnory?: IMasonrySettings;
  lightbox?: ILightboxSettings;
  general?: IGeneralSettings;
  slideshow?: ISlideshowSettings;
}
const TemplatesContext = React.createContext<{
  templates?: ITemplate[];
}>({});

const TemplatesProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const {baseUrl, nonce} = useAppInfo();
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  console.log('🚀 ~ templates:', templates);

  const getData = async () => {
    const fetchUrl: string | undefined = undefined; //baseUrl      ? baseUrl + 'templates'      : undefined;

    if (fetchUrl) {
      try {
        const response = await axios.get(fetchUrl, {
          headers: {'X-WP-Nonce': nonce},
        });
        const templatesData: object = response.data;
        const newTemplates: any[] = Object.values(templatesData).map(
          (data: any) => ({
            value: data,
            title: data,
          })
        );

        setTemplates(newTemplates);
      } catch (error) {
        console.error(error);
        setTemplates([]);
      }
    } else {
      setTemplates([template1, template2, template3, template4, template5]);
    }
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  return (
    <TemplatesContext.Provider value={{templates}}>
      {children}
    </TemplatesContext.Provider>
  );
};

const useTemplates = () => {
  const context = useContext(TemplatesContext);
  if (!context)
    throw new Error('useTemplates must be used within a TemplatesContext');

  return context;
};

export {TemplatesContext, TemplatesProvider, useTemplates};
