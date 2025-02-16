import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import {ISelectOption, SelectControl} from 'components/controls';
import {useTemplates} from 'contexts';
import {ITemplateReference} from 'contexts/templates/TemplatesContext.types';
import {Align, Aligner} from 'core-components/aligner';
import React, {
  ReactElement,
  ReactNode,
  SyntheticEvent,
  useLayoutEffect,
  useState,
} from 'react';
import {TypeUtils} from 'utils';
import {FeatureHighlighter} from './feature-highlighter/FeatureHighlighter';
import {ProIcon} from './ProIcon';
import './template-select.css';
import {useSettings} from './useSettings';

const storageValue: string | null = localStorage.getItem(
  'reacg-highlight-templates-select'
);
const showHighlighter: boolean = !!storageValue
  ? JSON.parse(storageValue as string)
  : true;

const TemplatesSelect: React.FC = () => {
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
    if (
      template &&
      TypeUtils.isNumber(template.template_id) &&
      !!template.template_id
    ) {
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
      TypeUtils.isString(css) && changeCss(css);
    }
  }, [template?.template_id]);

  const getPropOptionRender =
    (templateReference: ITemplateReference) => (): ReactNode => {
      const {title, paid, preview_url, youtube_link} = templateReference;

      return (
        <Aligner style={{alignItems: 'center', gap: '16px'}}>
          <div>{title}</div>
          <Aligner align={Align.END} style={{alignItems: 'center', gap: '2px'}}>
            {paid ? (
              <Tooltip
                title={'Pro Template'}
                placement={'top'}
                arrow
                enterDelay={500}
              >
                <div>
                  <ProIcon />
                </div>
              </Tooltip>
            ) : null}
            {youtube_link ? (
              <Tooltip
                title="Preview Video"
                placement="top"
                arrow
                enterDelay={500}
              >
                <IconButton
                  size={'small'}
                  onClick={getOpenYoutubePreview(youtube_link)}
                >
                  <VisibilityIcon fontSize={'small'} />
                </IconButton>
              </Tooltip>
            ) : null}
            {preview_url ? (
              <Tooltip
                title="Preview Demo"
                placement="top"
                arrow
                enterDelay={500}
              >
                <IconButton
                  size={'small'}
                  onClick={getOpenDemo(templateReference)}
                >
                  <OpenInNewIcon fontSize={'small'} />
                </IconButton>
              </Tooltip>
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
    changeTemplate?.(newValue);
  };

  const resetPreviewDialogInfo = () =>
    setPreviewDialogInfo(initialPreviewDialogInfo);

  const renderSelect = (): ReactElement => {
    return (
      <Box style={{width: '200px', margin: 'auto 10px', scrollMargin: '50px'}}>
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
    );
  };

  return TypeUtils.isNumber(value) || value ? (
    <>
      {showHighlighter ? (
        <FeatureHighlighter
          text={
            'Look for a quick way to transform your gallery in seconds with our pre-built templates!'
          }
        >
          {renderSelect()}
        </FeatureHighlighter>
      ) : (
        renderSelect()
      )}
      <Dialog
        open={previewDialogInfo.isVisible}
        onClose={resetPreviewDialogInfo}
        className={'template-select__youtube-dialog'}
      >
        <IconButton onClick={resetPreviewDialogInfo} className={'modal-close'}>
          <CloseIcon />
        </IconButton>
        <iframe
          width={'560'}
          height={'315'}
          src={previewDialogInfo.url}
          title={'YouTube video player'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </Dialog>
    </>
  ) : null;
};

export {TemplatesSelect};
