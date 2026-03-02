import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import {useTemplates} from 'contexts';
import {ITemplateReference} from 'contexts/templates/TemplatesContext.types';
import React, {
  ReactNode,
  SyntheticEvent,
  useLayoutEffect,
  useMemo,
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
const ALL_CATEGORY = 'All';
const MY_TEMPLATES_CATEGORY = 'My templates';
const ALL_TYPES = 'Filter by layouts';

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
  const [isTemplatesDialogOpen, setIsTemplatesDialogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY);
  const [activeTypeFilter, setActiveTypeFilter] = useState<string>(ALL_TYPES);
  const [searchTerm, setSearchTerm] = useState<string>('');
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

  const getTemplateThumbnail = (templateReference: ITemplateReference) => {
    const typedReference = templateReference as ITemplateReference &
      Record<string, unknown>;
    const candidates = [
      typedReference.thumbnail_url,
      typedReference.thumbnail,
      typedReference.image,
      typedReference.image_url,
      typedReference.preview_image,
      typedReference.screenshot,
      typedReference.thumb,
    ];

    for (const candidate of candidates) {
      if (typeof candidate === 'string' && candidate) {
        return candidate;
      }
    }

    return '';
  };

  const getTemplateCategories = (templateReference: ITemplateReference) => {
    const categories = templateReference.categories || [];

    return categories
      .filter((category): category is string => typeof category === 'string')
      .map((category) => category.trim())
      .filter((category) => !!category);
  };

  const getTemplateType = (templateReference: ITemplateReference) => {
    return templateReference.type?.trim();
  };

  const categories = useMemo(() => {
    const allTemplateCategories = [...(preBuiltTemplates || [])]
      .flatMap((templateReference) => getTemplateCategories(templateReference))
      .filter((category, index, list) => list.indexOf(category) === index);

    return [ALL_CATEGORY, ...allTemplateCategories, MY_TEMPLATES_CATEGORY];
  }, [preBuiltTemplates]);

  const typeFilters = useMemo(() => {
    const allTemplateTypes = [...(preBuiltTemplates || [])]
      .map((templateReference) => getTemplateType(templateReference))
      .filter((type) => !!type)
      .filter((type, index, list) => list.indexOf(type) === index);

    return [ALL_TYPES, ...allTemplateTypes];
  }, [preBuiltTemplates]);

  const matchesTemplateFilters = (templateReference: ITemplateReference) => {
    const matchesType =
      activeTypeFilter === ALL_TYPES ||
      getTemplateType(templateReference)?.toLowerCase() ===
        activeTypeFilter.toLowerCase();
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !normalizedSearchTerm ||
      templateReference.title.toLowerCase().includes(normalizedSearchTerm);

    return matchesType && matchesSearch;
  };

  const filteredPreBuiltTemplates = useMemo(() => {
    if (activeCategory === ALL_CATEGORY) {
      return (preBuiltTemplates || []).filter((templateReference) =>
        matchesTemplateFilters(templateReference)
      );
    }

    if (activeCategory === MY_TEMPLATES_CATEGORY) {
      return [];
    }

    return (preBuiltTemplates || []).filter(
      (templateReference) =>
        getTemplateCategories(templateReference).includes(activeCategory) &&
        matchesTemplateFilters(templateReference)
    );
  }, [activeCategory, preBuiltTemplates, activeTypeFilter, searchTerm]);

  const filteredMyTemplates = useMemo(() => {
    if (
      activeCategory === ALL_CATEGORY ||
      activeCategory === MY_TEMPLATES_CATEGORY
    ) {
      return (myTemplates || []).filter((templateReference) =>
        matchesTemplateFilters(templateReference)
      );
    }

    return (myTemplates || []).filter(
      (templateReference) =>
        getTemplateCategories(templateReference).includes(activeCategory) &&
        matchesTemplateFilters(templateReference)
    );
  }, [activeCategory, myTemplates, activeTypeFilter, searchTerm]);

  const hasVisibleTemplates =
    !!filteredPreBuiltTemplates?.length || !!filteredMyTemplates?.length;

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
  const onTemplateSelect = async (id: string, type: 'pre-built' | 'my') => {
    const parsedTemplateId = parseInt(id);

    if (!TypeUtils.isNumber(parsedTemplateId)) {
      return;
    }

    const isTemplateApplied = await changeTemplate?.(parsedTemplateId, type);

    if (isTemplateApplied) {
      setIsTemplatesDialogOpen(false);
    }
  };

  const resetPreviewDialogInfo = () =>
    setPreviewDialogInfo(initialPreviewDialogInfo);

  const renderTemplateActions = (
    templateReference: ITemplateReference,
    type: 'pre-built' | 'my'
  ): ReactNode => {
    const {preview_url, youtube_link} = templateReference;

    return (
      <div className={'reacg-template-card__overlay'}>
        <div className={'reacg-template-card__actions'}>
          <Button
            variant={'contained'}
            size={'small'}
            onClick={() => onTemplateSelect(templateReference.id, type)}
            className={
              'reacg-template-card__overlay-button reacg-template-card__import-button'
            }
          >
            Import
          </Button>
          {youtube_link ? (
            <Tooltip title="View Video" placement="top" arrow enterDelay={500}>
              <IconButton
                size={'small'}
                onClick={getOpenYoutubePreview(youtube_link)}
                className={'reacg-template-card__action-button'}
              >
                <VisibilityIcon fontSize={'small'} />
              </IconButton>
            </Tooltip>
          ) : null}
          {preview_url ? (
            <Tooltip title="View Demo" placement="top" arrow enterDelay={500}>
              <IconButton
                size={'small'}
                onClick={getOpenDemo(templateReference)}
                className={'reacg-template-card__action-button'}
              >
                <OpenInNewIcon fontSize={'small'} />
              </IconButton>
            </Tooltip>
          ) : null}
        </div>
      </div>
    );
  };

  const renderTemplateSection = (
    templates: ITemplateReference[] | undefined,
    sectionTitle: string,
    type: 'pre-built' | 'my',
    className: string = ''
  ) => {
    if (!templates?.length) {
      return null;
    }

    return (
      <Box className={`reacg-templates-dialog__section ${className}`}>
        <div className={'reacg-templates-dialog__section-title'}>
          {sectionTitle}
        </div>
        <div className={'reacg-templates-dialog__grid'}>
          {templates.map((templateReference) => {
            const templateId = parseInt(templateReference.id);
            const isSelected = templateId === value;
            const thumbnail = templateReference.thumbnail;
            const {paid} = templateReference;

            return (
              <div
                key={`${type}-${templateReference.id}`}
                className={
                  isSelected
                    ? 'reacg-template-card reacg-template-card--selected'
                    : 'reacg-template-card'
                }
              >
                <div className={'reacg-template-card__image-wrapper'}>
                  {thumbnail ? (
                    <img
                      src={thumbnail}
                      alt={templateReference.title}
                      className={'reacg-template-card__image'}
                      loading={'lazy'}
                    />
                  ) : (
                    <div className={'reacg-template-card__image-placeholder'}>
                      {templateReference.title}
                    </div>
                  )}
                  {paid ? (
                    <div className={'reacg-template-card__pro-icon'}>
                      <ProIcon height={20} width={34} style={{marginLeft: 5}} />
                    </div>
                  ) : null}
                </div>
                <div className={'reacg-template-card__title'}>
                  {templateReference.title}
                </div>
                {renderTemplateActions(templateReference, type)}
              </div>
            );
          })}
        </div>
      </Box>
    );
  };

  const renderButton = () => (
    <>
      {isLoading ? (
        <Skeleton height={40} width={130} />
      ) : (
        <Button
          onClick={() => setIsTemplatesDialogOpen(true)}
          variant={'outlined'}
          className={
            'button button-hero options-panel_body-button templates-select-button'
          }
        >
          Browse Templates
        </Button>
      )}
    </>
  );

  return TypeUtils.isNumber(value) || value ? (
    <>
      {showHighlighter ? (
        <FeatureHighlighter
          text={
            'Look for a quick way to transform your gallery in seconds with our Pre-Designed Templates!'
          }
        >
          {renderButton()}
        </FeatureHighlighter>
      ) : (
        renderButton()
      )}
      <Dialog
        open={isTemplatesDialogOpen}
        onClose={() => setIsTemplatesDialogOpen(false)}
        fullWidth
        maxWidth={'lg'}
        className={'reacg-templates-dialog'}
      >
        <Box className={'reacg-templates-dialog__header'}>
          <div className={'reacg-templates-dialog__title'}>
            Templates library
          </div>
          <IconButton onClick={() => setIsTemplatesDialogOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className={'reacg-templates-dialog__content'}>
          <div className={'reacg-templates-dialog__toolbar'}>
            <div className={'reacg-templates-dialog__categories'}>
              {categories.map((category) => (
                <button
                  key={category}
                  type={'button'}
                  className={
                    category === activeCategory
                      ? 'reacg-templates-dialog__category reacg-templates-dialog__category--active'
                      : 'reacg-templates-dialog__category'
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className={'reacg-templates-dialog__filters'}>
              <select
                value={activeTypeFilter}
                onChange={(e) => setActiveTypeFilter(e.target.value)}
                className={'reacg-templates-dialog__types-select'}
              >
                {typeFilters.map((typeValue) => (
                  <option key={typeValue} value={typeValue}>
                    {typeValue}
                  </option>
                ))}
              </select>
              <input
                type={'text'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={'reacg-templates-dialog__search-input'}
                placeholder={'Search by title'}
              />
            </div>
          </div>
          {hasVisibleTemplates ? (
            <>
              {renderTemplateSection(
                filteredPreBuiltTemplates,
                'Pre-Designed Templates',
                'pre-built',
                'reacg-templates-dialog__section-pre-built-templates'
              )}
              {renderTemplateSection(
                filteredMyTemplates,
                'My Templates',
                'my',
                'reacg-templates-dialog__section-my-templates'
              )}
            </>
          ) : (
            <Box className={'reacg-templates-dialog__empty'}>No templates</Box>
          )}
        </Box>
      </Dialog>
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
