import axios from 'axios';
import React, {useLayoutEffect, useState} from 'react';
import {useAppInfo} from '../AppInfoContext';
import {
  FetchTemplateResult,
  ImportTemplateImagesResult,
  ITemplate,
  ITemplateReference,
  TemplateId,
} from './TemplatesContext.types';

const TemplatesContext = React.createContext<{
  galleryId?: string;
  preBuiltTemplates?: ITemplateReference[];
  myTemplates?: ITemplateReference[];
  template?: ITemplate;
  changeTemplate?: (id: TemplateId, type: string) => Promise<boolean>;
  fetchPreBuiltTemplate?: (id: TemplateId) => Promise<FetchTemplateResult>;
  hasGalleryImages?: () => Promise<boolean>;
  importTemplateImages?: (
    templateData: ITemplate
  ) => Promise<ImportTemplateImagesResult>;
  resetTemplate?: () => void;
  initTemplate?: (id: TemplateId, title: string, type: string) => void;
  isLoading?: boolean;
}>({});

const TemplatesProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const {
    galleryId,
    pluginVersion,
    showControls,
    baseUrl,
    nonce,
    getOptionsTimestamp,
  } = useAppInfo();
  const [preBuiltTemplates, setPreBuiltTemplates] = useState<
    ITemplateReference[]
  >([]);
  const [myTemplates, setMyTemplates] = useState<ITemplateReference[]>([]);
  const [template, setTemplate] = useState<ITemplate>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getTemplates = async () => {
    if (!showControls) {
      return;
    }
    let restUrl = (window as any).reacg_global?.core_rest_url_v3 + 'templates';
    if (!restUrl) {
      restUrl = 'https://regallery.team/core/wp-json/reacgcore/v3/templates';
    }

    try {
      const queryStringSeperator: string = restUrl.includes('?') ? '&' : '?';
      let queryString = queryStringSeperator;
      queryString += `version=${pluginVersion}`;
      const response = await axios.get(`${restUrl}${queryString}`);
      const preBuiltTemplatesData: ITemplateReference[] = response.data;

      setPreBuiltTemplates(preBuiltTemplatesData);
    } catch (error) {
      console.error(error);
    }

    const myTemplatesResponse = await axios.get(
      baseUrl +
        'templates' +
        (baseUrl?.includes('?') ? '&' : '?') +
        'version=' +
        pluginVersion
    );
    const myTemplatesData: ITemplateReference[] = myTemplatesResponse.data;
    setMyTemplates(myTemplatesData);
  };

  const buildCoreTemplateUrl = (id: TemplateId): string => {
    const coreBaseUrl = (window as any).reacg_global?.core_rest_url_v2;
    const restUrl = coreBaseUrl
      ? `${coreBaseUrl}template/${id}`
      : `https://regallery.team/core/wp-json/reacgcore/v2/template/${id}`;
    const restUrlQueryStringSeperator: string = restUrl.includes('?')
      ? '&'
      : '?';

    return `${restUrl}${restUrlQueryStringSeperator}version=${pluginVersion}`;
  };

  const getTemplate = async (
    id: TemplateId,
    type: string
  ): Promise<boolean> => {
    const coreFetchUrl = buildCoreTemplateUrl(id);
    // baseUrl/options/0 endpoint returns default options
    const optionsUrl: string = baseUrl ? baseUrl + 'options/' + id : '';
    const optionsUrlQueryStringSeperator: string = optionsUrl.includes('?')
      ? '&'
      : '?';
    let optionsUrlQueryString = optionsUrlQueryStringSeperator;
    optionsUrlQueryString += `timestamp=${getOptionsTimestamp?.()}`;

    const fetchUrl: string =
      id === 0 || type === 'my'
        ? `${optionsUrl}${optionsUrlQueryString}`
        : coreFetchUrl;

    if (fetchUrl) {
      setIsLoading(true);
      try {
        const response = await axios.get(fetchUrl);
        if (response.status === 204) {
          (window as any).reacg_open_free_trial_offer_dialog?.({
            utm_medium: 'select_template',
          });
          setIsLoading(false);
          return false;
        } else {
          const templateData: ITemplate = response.data;
          templateData.templateType = type;
          templateData.template_id = id;

          setTemplate({...templateData});
        }
        setIsLoading(false);
        return true;
      } catch (error: any) {
        console.error(error);
        setIsLoading(false);
        return false;
      }
    } else {
      resetTemplate();
      return false;
    }
  };

  const fetchPreBuiltTemplate = async (
    id: TemplateId
  ): Promise<FetchTemplateResult> => {
    const fetchUrl = buildCoreTemplateUrl(id);
    try {
      const response = await axios.get(fetchUrl);
      if (response.status === 204) {
        (window as any).reacg_open_free_trial_offer_dialog?.({
          utm_medium: 'select_template',
        });
        return {status: 'no_permission'};
      }

      const templateData: ITemplate = response.data;
      templateData.templateType = 'pre-built';
      templateData.template_id = id;

      return {status: 'ok', data: templateData};
    } catch (error) {
      console.error(error);
      return {status: 'error'};
    }
  };

  const hasGalleryImages = async (): Promise<boolean> => {
    if (!baseUrl || !galleryId || Number(galleryId) <= 0) {
      return false;
    }

    try {
      const imagesUrl = `${baseUrl}gallery/${galleryId}/images`;
      const separator = imagesUrl.includes('?') ? '&' : '?';
      const response = await axios.get(
        `${imagesUrl}${separator}per_page=1&page=1&timestamp=${Date.now()}`
      );
      const headerCount = Number(response.headers?.['x-images-count']);

      return (
        (Array.isArray(response.data) && response.data.length > 0) ||
        (!Number.isNaN(headerCount) && headerCount > 0)
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const importTemplateImages = async (
    templateData: ITemplate
  ): Promise<ImportTemplateImagesResult> => {
    if (!baseUrl || !galleryId || Number(galleryId) <= 0) {
      return {status: 'error'};
    }

    setIsLoading(true);
    try {
      const importUrl = `${baseUrl}gallery/${galleryId}/import-images`;
      const response = await axios.post(
        importUrl,
        {template_id: templateData.template_id},
        {
          headers: nonce ? {'X-WP-Nonce': nonce} : undefined,
        }
      );

      const importedIds: number[] = Array.isArray(response.data?.images_ids)
        ? response.data.images_ids
        : [];
      const count: number =
        typeof response.data?.count === 'number'
          ? response.data.count
          : importedIds.length;

      setTemplate({...templateData});

      if (importedIds.length > 0) {
        setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent('reacg:images-updated', {
              detail: {galleryId, imagesIds: importedIds},
            })
          );
        }, 0);
      }

      setIsLoading(false);
      return {status: 'ok', count};
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      return {status: 'error'};
    }
  };

  const isCurrentGalleryTemplate = (
    templateId: TemplateId | undefined
  ): boolean => {
    if (!galleryId || templateId === undefined || templateId === null) {
      return false;
    }

    return String(templateId) === String(galleryId);
  };

  const resetTemplate = (): void => {
    // If the template is not current.
    if (galleryId && !isCurrentGalleryTemplate(template?.template_id)) {
      const templateData: ITemplate = {
        title: myTemplates.find((item) => item.id === galleryId)?.title || '',
        template_id: galleryId,
        templateType: 'my',
      };
      setTemplate(templateData);
    }
  };

  const changeTemplate = async (id: TemplateId, type: string) => {
    return getTemplate(id, type);
  };

  const initTemplate = (id: TemplateId, title: string, type: string) => {
    setTemplate({
      template_id: id,
      title: title,
      templateType: type,
    });
  };

  useLayoutEffect(() => {
    getTemplates();
  }, []);

  return (
    <TemplatesContext.Provider
      value={{
        galleryId,
        preBuiltTemplates,
        myTemplates,
        template,
        changeTemplate,
        fetchPreBuiltTemplate,
        hasGalleryImages,
        importTemplateImages,
        resetTemplate,
        initTemplate,
        isLoading,
      }}
    >
      {children}
    </TemplatesContext.Provider>
  );
};

export {TemplatesContext, TemplatesProvider};
