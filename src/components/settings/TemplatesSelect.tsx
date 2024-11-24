import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {Box, Dialog, IconButton, Skeleton} from '@mui/material';
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
  const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>(false);
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

      return (
        <Aligner style={{alignItems: 'center', gap: '12px'}}>
          <div>{title}</div>
          <Aligner align={Align.END} style={{alignItems: 'center', gap: '2px'}}>
            {paid ? (
              <StarIcon fontSize={'small'} style={{color: 'gold'}} />
            ) : null}
            {preview_url ? (
              <IconButton
                size={'small'}
                aria-label={'Example'}
                onClick={
                  title === 'Photo Album'
                    ? (e) => {
                        e.stopPropagation();
                        setIsPreviewVisible(true);
                      }
                    : getOpenDemo(templateReference)
                }
              >
                {title === 'Photo Album' ? (
                  <VisibilityIcon fontSize={'small'} />
                ) : (
                  <OpenInNewIcon fontSize={'small'} />
                )}
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
      <Dialog
        open={isPreviewVisible}
        onClose={() => setIsPreviewVisible(false)}
      >
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/mmLZTbL-DtE?si=Mbt1_LR91SizO3QT"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </Dialog>
    </>
  ) : null;
};

export {TemplatesSelect};
