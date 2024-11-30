import OpenInNewIcon from '@mui/icons-material/OpenInNew';
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
import {PremiumOffer} from './PremiumOffer';
import {ProIcon} from './ProIcon';
import './template-select.css';
import {useSettings} from './useSettings';

const PRO_TITLE: string = '✨ Early Bird Offer! ✨';

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
  const initialPreviewDialogInfo = {
    isVisible: false,
    url: '',
  };
  const [previewDialogInfo, setPreviewDialogInfo] = useState(
    initialPreviewDialogInfo
  );
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
      const {title, paid, preview_url, youtube_link} = templateReference;

      return (
        <Aligner style={{alignItems: 'center', gap: '12px'}}>
          <div>{title}</div>
          <Aligner align={Align.END} style={{alignItems: 'center', gap: '2px'}}>
            {paid ? <ProIcon /> : null}
            {youtube_link ? (
              <IconButton
                size={'small'}
                onClick={getOpenYoutubePreview(youtube_link)}
              >
                <VisibilityIcon fontSize={'small'} />
              </IconButton>
            ) : null}
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

  const getOpenYoutubePreview = (url: string) => (e: any) => {
    e.stopPropagation();
    setPreviewDialogInfo({isVisible: true, url});
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

  const resewPreviewDialogInfo = () =>
    setPreviewDialogInfo(initialPreviewDialogInfo);

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
        title={PRO_TITLE}
        content={<PremiumOffer />}
      />
      <Dialog
        open={previewDialogInfo.isVisible}
        onClose={resewPreviewDialogInfo}
        className={'template-select__youtube-dialog'}
      >
        <iframe
          width={'560'}
          height={'315'}
          src={previewDialogInfo.url}
          title={'YouTube video player'}
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
