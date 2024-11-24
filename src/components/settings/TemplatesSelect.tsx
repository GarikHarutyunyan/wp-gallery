import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {Box, IconButton, Skeleton} from '@mui/material';
import {ISelectOption, SelectControl} from 'components/controls';
import {useTemplates, useValidation} from 'contexts';
import {ITemplateReference} from 'contexts/templates/TemplatesContext.types';
import {Align, Aligner, ReDialog} from 'core-components';
import React, {
  ReactNode,
  SyntheticEvent,
  useLayoutEffect,
  useState,
} from 'react';
import {TypeUtils} from 'utils';
import {useSettings} from './useSettings';

const PRO_MESSAGE: string =
  'The selected template is part of our premium offering. Upgrade to the Pro version to unlock this and other exclusive templates, along with advanced features that take your site to the next level!';

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
    changeCss,
  } = useSettings();
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
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
        css,
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
      css && changeCss(css);
    }
  }, [template?.template_id]);

  const getPropOptionRender =
    (templateReference: ITemplateReference) => (): ReactNode => {
      const {title, paid, preview_url} = templateReference;
      const proBadge: string = 'PRO';

      return (
        <Aligner style={{gap: '12px'}}>
          <div>{title}</div>
          <Aligner align={Align.END} style={{alignItems: 'center', gap: '4px'}}>
            {paid ? <div style={{color: 'gold'}}>{proBadge}</div> : null}
            {preview_url ? (
              <IconButton
                size={'small'}
                aria-label={'Example'}
                onClick={getOpenDemo(templateReference)}
              >
                <OpenInNewIcon fontSize={'small'} />
              </IconButton>
            ) : null}
          </Aligner>
        </Aligner>
      );
    };

  const getOpenDemo =
    (template: ITemplateReference) =>
    (e: SyntheticEvent): void => {
      const {preview_url} = template;

      e.stopPropagation();
      window.open(preview_url, '_blank');
    };

  const openDialog = () => {
    setIsDialogVisible(true);
  };

  const closeDialog = () => {
    setIsDialogVisible(false);
  };

  const options: ISelectOption[] =
    templates?.map((template) => {
      const {title, id} = template;
      const isDisabled: boolean = id === 'none';

      return {
        title: title,
        value: id,
        render: getPropOptionRender(template),
        isDisabled,
      };
    }) || [];

  const onChange = (newValue: string) => {
    const templateReference: ITemplateReference | undefined = templates?.find(
      (t) => t.id === newValue
    );
    const isPaid: boolean = !!templateReference?.paid;

    if (isPaid && !isProUser) {
      openDialog();
    } else {
      changeTemplate?.(newValue);
    }
  };

  return TypeUtils.isNumber(value) || value ? (
    <>
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
      <ReDialog
        open={isDialogVisible}
        onClose={closeDialog}
        content={PRO_MESSAGE}
        actions={[{label: 'Close', onClick: closeDialog}]}
      />
    </>
  ) : null;
};

export {TemplatesSelect};
