import {Box, Skeleton} from '@mui/material';
import {ISelectOption, SelectControl} from 'components/controls';
import {useTemplates} from 'contexts/TemplatesContext';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useSettings} from './useSettings';

const TemplatesSelect: React.FC = () => {
  const {templates, template, changeTemplate, isLoading} = useTemplates();
  const [value, setValue] = useState<string>('0');
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

  useLayoutEffect(() => {
    if (template) {
      const {
        type,
        general,
        lightbox,
        masonry,
        mosaic,
        slideshow,
        thumbnails,
        template_id,
      } = template;

      activeType !== type && type && changeType!(type);
      general && changeGeneralSettings(general);
      lightbox && changeLightboxSettings(lightbox);
      masonry && changeMasonrySettings(masonry);
      mosaic && changeMosaicSettings(mosaic);
      slideshow && changeSlideshowSettings(slideshow);
      thumbnails && changeThumbnailSettings(thumbnails);
      setValue(template_id || 'none');
    }
  }, [template?.title]);

  const templateOptions: ISelectOption[] =
    templates?.map((template) => {
      return {
        title: template.title,
        value: template.id,
      };
    }) || [];

  const onChange = async (newValue: string) => {
    changeTemplate?.(newValue);
  };

  return value ? (
    <Box style={{width: '200px', margin: 'auto 10px'}}>
      {isLoading ? (
        <Skeleton height={48} />
      ) : (
        <SelectControl
          onChange={onChange}
          options={templateOptions}
          value={value}
          hideLabel={true}
        />
      )}
    </Box>
  ) : null;
};

export {TemplatesSelect};
