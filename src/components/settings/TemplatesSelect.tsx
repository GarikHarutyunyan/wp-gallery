import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import {useTemplates} from 'contexts';
import {usePro} from 'contexts/ProContext';
import {
  ITemplate,
  ITemplateReference,
} from 'contexts/templates/TemplatesContext.types';
import {useSnackbar} from 'notistack';
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
const FREE_CATEGORY = 'Free';
const ALL_TYPES = 'Filter by layouts';

const TemplatesSelect: React.FC = () => {
  const {
    galleryId,
    preBuiltTemplates,
    myTemplates,
    template,
    changeTemplate,
    fetchPreBuiltTemplate,
    hasGalleryImages,
    importTemplateImages,
    isLoading,
  } = useTemplates();
  const {isPro} = usePro();
  const {enqueueSnackbar} = useSnackbar();
  const {
    changeGeneralSettings,
    changeMasonrySettings,
    changeLightboxSettings,
    changeMosaicSettings,
    changeJustifiedSettings,
    changeSlideshowSettings,
    changeGridSettings,
    changeCubeSettings,
    changeCarouselSettings,
    changeCoverflowSettings,
    changeCardsSettings,
    changeBlogSettings,
    changeScrollerSettings,
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
  const [importingState, setImportingState] = useState<{
    id: string;
    withImages: boolean;
  } | null>(null);
  const [pendingImportTemplate, setPendingImportTemplate] =
    useState<ITemplate | null>(null);
  const isBusy = !!importingState;
  const value = template?.template_id ?? galleryId ?? '';
  useLayoutEffect(() => {
    if (template?.template_id || template?.template_id === 0) {
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
        coverflow,
        cards,
        blog,
        scroller,
        css,
      } = template;
      // !!template.template_id, as default demplate id is 0 we avoid changing gallery type on reseting options
      if (activeType !== type && String(template.template_id) !== '0') {
        type && changeType!(type);
      }
      general && changeGeneralSettings?.(general);
      lightbox && changeLightboxSettings?.(lightbox);
      masonry && changeMasonrySettings?.(masonry);
      mosaic && changeMosaicSettings?.(mosaic);
      justified && changeJustifiedSettings?.(justified);
      slideshow && changeSlideshowSettings?.(slideshow);
      thumbnails && changeGridSettings?.(thumbnails);
      cube && changeCubeSettings?.(cube);
      carousel && changeCarouselSettings?.(carousel);
      coverflow && changeCoverflowSettings?.(coverflow);
      cards && changeCardsSettings?.(cards);
      blog && changeBlogSettings?.(blog);
      scroller && changeScrollerSettings?.(scroller);
      TypeUtils.isString(css) && changeCss?.(css as any);
    }
  }, [template]);

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

    const freeCategory = allTemplateCategories.find(
      (category) => category.toLowerCase() === FREE_CATEGORY.toLowerCase()
    );
    const categoriesWithoutFree = allTemplateCategories.filter(
      (category) => category.toLowerCase() !== FREE_CATEGORY.toLowerCase()
    );

    return [
      ALL_CATEGORY,
      ...(!isPro && freeCategory ? [freeCategory] : []),
      ...categoriesWithoutFree,
      MY_TEMPLATES_CATEGORY,
    ];
  }, [isPro, preBuiltTemplates]);

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

    if (activeCategory === FREE_CATEGORY) {
      return (preBuiltTemplates || []).filter(
        (templateReference) =>
          !templateReference.paid && matchesTemplateFilters(templateReference)
      );
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

    if (activeCategory === FREE_CATEGORY) {
      return [];
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
    if (isBusy) {
      return;
    }

    const templateId = type === 'my' ? id : parseInt(id, 10);

    if (TypeUtils.isNumber(templateId) && Number.isNaN(templateId)) {
      return;
    }

    setImportingState({id: String(id), withImages: false});
    const isTemplateApplied = await changeTemplate?.(templateId, type);
    setImportingState(null);

    if (isTemplateApplied) {
      setIsTemplatesDialogOpen(false);
    }
  };

  const executeImportWithImages = async (templateData: ITemplate) => {
    setImportingState({
      id: String(templateData.template_id),
      withImages: true,
    });
    const result = await importTemplateImages?.(templateData);
    setImportingState(null);
    setPendingImportTemplate(null);

    if (result?.status === 'ok') {
      setIsTemplatesDialogOpen(false);
      enqueueSnackbar(
        result.count > 0
          ? 'Template and images imported.'
          : 'Template imported (no demo images found).',
        {
          variant: result.count > 0 ? 'success' : 'info',
          anchorOrigin: {vertical: 'bottom', horizontal: 'right'},
          autoHideDuration: 2500,
        }
      );
    } else {
      enqueueSnackbar('Failed to import template images. Please try again.', {
        variant: 'error',
        anchorOrigin: {vertical: 'bottom', horizontal: 'right'},
      });
    }
  };

  const onTemplateImportWithImages = async (
    templateReference: ITemplateReference
  ) => {
    if (isBusy) {
      return;
    }

    const templateId = parseInt(templateReference.id, 10);
    if (Number.isNaN(templateId)) {
      return;
    }

    setImportingState({id: String(templateReference.id), withImages: true});
    const [templateResult, hasExistingMedia] = await Promise.all([
      fetchPreBuiltTemplate?.(templateId),
      hasGalleryImages?.(),
    ]);

    if (!templateResult || templateResult.status === 'no_permission') {
      setImportingState(null);
      return;
    }

    if (templateResult.status === 'error') {
      setImportingState(null);
      enqueueSnackbar('Failed to load template. Please try again.', {
        variant: 'error',
        anchorOrigin: {vertical: 'bottom', horizontal: 'right'},
      });
      return;
    }

    const templateData = templateResult.data;
    if (hasExistingMedia) {
      setImportingState(null);
      setPendingImportTemplate(templateData);
      return;
    }

    await executeImportWithImages(templateData);
  };

  const resetPreviewDialogInfo = () =>
    setPreviewDialogInfo(initialPreviewDialogInfo);

  const renderTemplateActions = (
    templateReference: ITemplateReference,
    type: 'pre-built' | 'my'
  ): ReactNode => {
    const {preview_url, youtube_link} = templateReference;
    const canImportWithImages = type === 'pre-built' && Number(galleryId) > 0;
    const isImportingLayout =
      type === 'pre-built'
        ? importingState?.id === String(templateReference.id) &&
          !importingState.withImages
        : importingState?.id === String(templateReference.id);
    const isImportingWithImages =
      canImportWithImages &&
      importingState?.id === String(templateReference.id) &&
      importingState.withImages;

    return (
      <div className={'reacg-template-card__overlay'}>
        <div className={'reacg-template-card__actions'}>
          <div className={'reacg-template-card__primary-actions'}>
            <Tooltip
              title="Importing this template adds the layout only. Demo images won’t be imported. Add your own images to see the gallery."
              placement="top"
              arrow
              enterDelay={500}
            >
              <span>
                <Button
                  variant={'contained'}
                  size={'small'}
                  disabled={isBusy}
                  startIcon={
                    isImportingLayout ? (
                      <CircularProgress size={12} color="inherit" />
                    ) : undefined
                  }
                  onClick={() => onTemplateSelect(templateReference.id, type)}
                  className={
                    'reacg-template-card__overlay-button reacg-template-card__import-button'
                  }
                >
                  {isImportingLayout ? 'Importing...' : 'Import'}
                </Button>
              </span>
            </Tooltip>
            {canImportWithImages ? (
              <Tooltip
                title="Import this template along with its demo images into your gallery."
                placement="top"
                arrow
                enterDelay={500}
              >
                <span>
                  <Button
                    variant={'contained'}
                    size={'small'}
                    disabled={isBusy}
                    startIcon={
                      isImportingWithImages ? (
                        <CircularProgress size={12} color="inherit" />
                      ) : undefined
                    }
                    onClick={() =>
                      onTemplateImportWithImages(templateReference)
                    }
                    className={
                      'reacg-template-card__overlay-button reacg-template-card__import-images-button'
                    }
                  >
                    {isImportingWithImages
                      ? 'Importing...'
                      : 'Import with Images'}
                  </Button>
                </span>
              </Tooltip>
            ) : null}
          </div>
          {youtube_link || preview_url ? (
            <div className={'reacg-template-card__secondary-actions'}>
              {youtube_link ? (
                <Tooltip
                  title="View Video"
                  placement="top"
                  arrow
                  enterDelay={500}
                >
                  <IconButton
                    size={'small'}
                    disabled={isBusy}
                    onClick={getOpenYoutubePreview(youtube_link)}
                    className={'reacg-template-card__action-button'}
                  >
                    <VisibilityIcon fontSize={'small'} />
                  </IconButton>
                </Tooltip>
              ) : null}
              {preview_url ? (
                <Tooltip
                  title="View Demo"
                  placement="top"
                  arrow
                  enterDelay={500}
                >
                  <IconButton
                    size={'small'}
                    disabled={isBusy}
                    onClick={getOpenDemo(templateReference)}
                    className={'reacg-template-card__action-button'}
                  >
                    <OpenInNewIcon fontSize={'small'} />
                  </IconButton>
                </Tooltip>
              ) : null}
            </div>
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
            const isSelected =
              String(templateReference.id) === String(value);
            const isCardImporting =
              importingState?.id === String(templateReference.id);
            const thumbnail = templateReference.thumbnail;
            const {paid} = templateReference;
            const cardClasses = [
              'reacg-template-card',
              isSelected ? 'reacg-template-card--selected' : '',
              isCardImporting ? 'reacg-template-card--importing' : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <div
                key={`${type}-${templateReference.id}`}
                className={cardClasses}
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
        onClose={() => {
          if (!isBusy) {
            setIsTemplatesDialogOpen(false);
          }
        }}
        fullWidth
        maxWidth={'lg'}
        className={'reacg-templates-dialog'}
      >
        <Box className={'reacg-templates-dialog__header'}>
          <div className={'reacg-templates-dialog__title'}>
            Template Library
          </div>
          <IconButton
            disabled={isBusy}
            onClick={() => setIsTemplatesDialogOpen(false)}
          >
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
        open={!!pendingImportTemplate}
        onClose={() => {
          if (!isBusy) {
            setPendingImportTemplate(null);
          }
        }}
        maxWidth={'xs'}
        fullWidth
        className={'reacg-templates-confirm-dialog'}
      >
        <DialogTitle>Replace existing media?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Importing &ldquo;{pendingImportTemplate?.title}&rdquo; with images
            will replace the current media items in this gallery. Your existing
            files will remain in the Media Library.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{padding: '8px 24px 16px'}}>
          <Button
            variant={'outlined'}
            disabled={isBusy}
            onClick={() => setPendingImportTemplate(null)}
          >
            Cancel
          </Button>
          <Button
            variant={'contained'}
            disabled={isBusy}
            startIcon={
              isBusy ? (
                <CircularProgress size={14} color="inherit" />
              ) : undefined
            }
            onClick={() =>
              pendingImportTemplate &&
              executeImportWithImages(pendingImportTemplate)
            }
          >
            {isBusy ? 'Importing...' : 'Replace & Import'}
          </Button>
        </DialogActions>
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
