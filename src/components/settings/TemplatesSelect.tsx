import {Box, Skeleton} from '@mui/material';
import {ISelectOption, SelectControl} from 'components/controls';
import {useTemplates, useValidation} from 'contexts';
import {ITemplateReference} from 'contexts/templates/TemplatesContext.types';
import {Aligner} from 'core-components';
import React, {ReactNode, useLayoutEffect} from 'react';
import {TypeUtils} from 'utils';
import {useSettings} from './useSettings';

const TemplatesSelect: React.FC = () => {
  const {isProUser} = useValidation();
  const {templates, template, changeTemplate, isLoading} = useTemplates();
  const {
    changeGeneralSettings,
    changeMasonrySettings,
    changeLightboxSettings,
    changeMosaicSettings,
    changeSlideshowSettings,
    changeThumbnailSettings,
    changeCubeSettings,
    changeCarouselSettings,
    type: activeType,
    changeType,
  } = useSettings();
  const value = TypeUtils.isNumber(template?.template_id)
    ? template!.template_id
    : 'none';

  useLayoutEffect(() => {
    if (template && template.template_id) {
      const {
        type,
        general,
        lightbox,
        masonry,
        mosaic,
        slideshow,
        thumbnails,
        cube,
        carousel,
      } = template;
      activeType !== type && type && changeType!(type);
      general && changeGeneralSettings(general);
      lightbox && changeLightboxSettings(lightbox);
      masonry && changeMasonrySettings(masonry);
      mosaic && changeMosaicSettings(mosaic);
      slideshow && changeSlideshowSettings(slideshow);
      thumbnails && changeThumbnailSettings(thumbnails);
      cube && changeCubeSettings(cube);
      carousel && changeCarouselSettings(carousel);
    }
  }, [template?.template_id]);

  const getPropOptionRender =
    (templateReference: ITemplateReference) => (): ReactNode => {
      const title: string = templateReference?.title || '';
      const proBadge: string = 'PRO';

      return (
        <Aligner>
          <div>{title}</div>
          <div style={{color: 'gold'}}>{proBadge}</div>
        </Aligner>
      );
    };

  const options: ISelectOption[] =
    templates?.map((template) => {
      const {title, id, isPro} = template;
      const hasPermission: boolean = !isPro || !!isProUser;
      const isDisabled: boolean = id === 'none' || !hasPermission;

      return {
        title: title,
        value: id,
        render: isPro ? getPropOptionRender(template) : undefined,
        isDisabled,
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
          options={options}
          value={value}
          hideLabel={true}
        />
      )}
    </Box>
  ) : null;
};

export {TemplatesSelect};
