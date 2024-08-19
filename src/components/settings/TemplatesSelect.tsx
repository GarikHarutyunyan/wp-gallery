import {Box, Skeleton} from '@mui/material';
import {ISelectOption, SelectControl} from 'components/controls';
import {useTemplates} from 'contexts/TemplatesContext';
import React, {useLayoutEffect} from 'react';
import {TypeUtils} from 'utils';
import {useSettings} from './useSettings';

const TemplatesSelect: React.FC = () => {
  const {templates, template, changeTemplate, isLoading} = useTemplates();
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
  const value = TypeUtils.isNumber(template?.template_id)
    ? template!.template_id
    : 'none';

  useLayoutEffect(() => {
    if (template && template.template_id) {
      const {type, general, lightbox, masonry, mosaic, slideshow, thumbnails} =
        template;
      activeType !== type && type && changeType!(type);
      general && changeGeneralSettings(general);
      lightbox && changeLightboxSettings(lightbox);
      masonry && changeMasonrySettings(masonry);
      mosaic && changeMosaicSettings(mosaic);
      slideshow && changeSlideshowSettings(slideshow);
      thumbnails && changeThumbnailSettings(thumbnails);
    }
  }, [template?.template_id]);

  const templateOptions: ISelectOption[] =
    templates?.map((template) => {
      return {
        title: template.title,
        value: template.id,
        isDisabled: template.id === 'none',
      };
    }) || [];

  const onChange = (newValue: string) => {
    changeTemplate?.(newValue);
  };

  return TypeUtils.isNumber(value) || value ? (
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
