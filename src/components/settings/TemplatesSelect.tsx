import {ISelectOption, SelectControl} from 'components/controls';
import {ITemplate, useTemplates} from 'contexts/TemplatesContext';
import React, {useEffect, useState} from 'react';
import {useSettings} from './useSettings';

interface ITemplatesSelectProps {}

const TemplatesSelect: React.FC<ITemplatesSelectProps> = () => {
  const {templates} = useTemplates();
  console.log('🚀 ~ templates:', templates);
  const [value, setValue] = useState<string>();
  const {
    changeGeneralSettings,
    changeMasonrySettings,
    changeLightboxSettings,
    changeMosaicSettings,
    changeSlideshowSettings,
    changeThumbnailSettings,
    type: activeType,
    changeType,
  } = useSettings();

  useEffect(() => {
    if (templates?.length && !value) {
      setValue('none');
    }
  }, [templates?.length]);

  const templateOptions: ISelectOption[] =
    templates?.map((template) => {
      return {
        title: template.name,
        value: template.id,
      };
    }) || [];

  const onChange = (newValue: string) => {
    const selectedTemplate: ITemplate | undefined = templates?.find(
      (t) => t.id === newValue
    );

    if (selectedTemplate) {
      const {type, general, lightbox, masnory, mosaic, slideshow, thumbnails} =
        selectedTemplate;
      activeType !== type && type && changeType!(type);
      general && changeGeneralSettings(general);
      lightbox && changeLightboxSettings(lightbox);
      masnory && changeMasonrySettings(masnory);
      mosaic && changeMosaicSettings(mosaic);
      slideshow && changeSlideshowSettings(slideshow);
      thumbnails && changeThumbnailSettings(thumbnails);
      setValue(newValue);
    }
  };

  return value ? (
    <SelectControl
      name={'Template'}
      onChange={onChange}
      options={templateOptions}
      value={value}
      style={{width: '200px', margin: '0 10px'}}
    />
  ) : null;
};

export {TemplatesSelect};
