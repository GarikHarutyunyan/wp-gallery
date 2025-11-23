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
import {ProIcon} from '../alert-dialog/icons/ProIcon';
import {FeatureHighlighter} from './feature-highlighter/FeatureHighlighter';
import './template-select.css';
import {useSettings} from './useSettings';

const storageValue: string | null = localStorage.getItem(
  'reacg-highlight-templates-select'
);
const showHighlighter: boolean = !!storageValue
  ? JSON.parse(storageValue as string)
  : true;

const TemplatesSelect: React.FC = () => {
  const {
    galleryId,
    preBuiltTemplates,
    myTemplates,
    template,
    changeTemplate,
    isLoading,
  } = useTemplates();
  const {
    changeGeneralSettings,
    changeMasonrySettings,
    changeLightboxSettings,
    changeMosaicSettings,
    changeJustifiedSettings,
    changeSlideshowSettings,
    changeThumbnailSettings,
    changeCubeSettings,
    changeCarouselSettings,
    changeCardsSettings,
    changeBlogSettings,
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
  const value =
    template && TypeUtils.isNumber(template.template_id)
      ? template.template_id
      : parseInt(galleryId || '');
  useLayoutEffect(() => {
    if (template && TypeUtils.isNumber(template.template_id)) {
      const {
        type,
        general,
        lightbox,
        masonry,
        mosaic,
        justified,
        slideshow,
        thumbnails,
        cube,
        carousel,
        cards,
        blog,
        css,
      } = template;
      // !!template.template_id, as default demplate id is 0 we avoid changing gallery type on reseting options
      if (activeType !== type && !!template.template_id) {
        type && changeType!(type);
      }
      general && changeGeneralSettings(general);
      lightbox && changeLightboxSettings(lightbox);
      masonry && changeMasonrySettings(masonry);
      mosaic && changeMosaicSettings(mosaic);
      justified && changeJustifiedSettings(justified);
      slideshow && changeSlideshowSettings(slideshow);
      thumbnails && changeThumbnailSettings(thumbnails);
      cube && changeCubeSettings(cube);
      carousel && changeCarouselSettings(carousel);
      cards && changeCardsSettings(cards);
      blog && changeBlogSettings(blog);
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
  const options: ISelectOption[] = [
    {
      title: 'Pre-built Templates',
      value: 'separator-pre-built-templates',
      isDisabled: true,
      className: 'reacg-templates-list-option-group',
    },
    ...(preBuiltTemplates?.map((template) => {
      const {title, id} = template;

      return {
        title: title,
        value: id as string,
        render: getPropOptionRender(template),
        isDisabled: false,
        type: 'pre-built',
        className: 'reacg-templates-list-option',
      };
    }) || []),
    {
      title: 'My Templates',
      value: 'separator-my-templates',
      isDisabled: true,
      className: 'reacg-templates-list-option-group',
    },
    ...(myTemplates?.map((template) => {
      const {title, id} = template;
      return {
        title: title,
        value: id as string,
        isDisabled: false,
        type: 'my',
        className: 'reacg-templates-list-option',
      };
    }) || []),
  ];

  const onChange = (newValue: number) => {
    const selected = options.find((opt) => parseInt(opt.value) === newValue);
    if (selected) {
      changeTemplate?.(newValue, (selected as any).type);
    }
  };

  const resetPreviewDialogInfo = () =>
    setPreviewDialogInfo(initialPreviewDialogInfo);

  const renderSelect = (): ReactElement => {
    return (
      <Box className="reacg-templates-select__container">
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
