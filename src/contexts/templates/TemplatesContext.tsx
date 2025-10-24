import axios from 'axios';
import {useSnackbar} from 'notistack';
import React, {useLayoutEffect, useState} from 'react';
import {useAppInfo} from '../AppInfoContext';
import {ITemplate, ITemplateReference} from './TemplatesContext.types';

const TemplatesContext = React.createContext<{
  galleryId?: string;
  preBuiltTemplates?: ITemplateReference[];
  myTemplates?: ITemplateReference[];
  template?: ITemplate;
  changeTemplate?: (id: number, type: string) => void;
  resetTemplate?: () => void;
  initTemplate?: (id: number, title: string, type: string) => void;
  isLoading?: boolean;
}>({});

const TemplatesProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const {galleryId, pluginVersion, showControls, baseUrl, getOptionsTimestamp} =
    useAppInfo();
  const {enqueueSnackbar} = useSnackbar();
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
    const fetchUrl: string =
      'https://regallery.team/core/wp-json/reacgcore/v2/templates';

    try {
      const queryStringSeperator: string = fetchUrl.includes('?') ? '&' : '?';
      let queryString = queryStringSeperator;
      queryString += `version=${pluginVersion}`;
      const response = await axios.get(`${fetchUrl}${queryString}`);
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

  const getTemplate = async (id: number, type: string): Promise<void> => {
    const coreUrl: string = `https://regallery.team/core/wp-json/reacgcore/v2/template/${id}`;
    const coreUrlQueryStringSeperator: string = coreUrl.includes('?')
      ? '&'
      : '?';
    let coreUrlQueryString = coreUrlQueryStringSeperator;
    coreUrlQueryString += `version=${pluginVersion}`;
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
        : `${coreUrl}${coreUrlQueryString}`;

    if (fetchUrl) {
      setIsLoading(true);
      try {
        const response = await axios.get(fetchUrl);
        if (response.status === 204) {
          (window as any).reacg_open_premium_offer_dialog?.();
        } else {
          const templateData: ITemplate = response.data;
          templateData.templateType = type;
          templateData.template_id = id;

          setTemplate(templateData);
        }
        setIsLoading(false);
      } catch (error: any) {
        console.error(error);
        setIsLoading(false);
      }
    } else {
      resetTemplate();
    }
  };

  const resetTemplate = (): void => {
    // If the template is not current.
    if (galleryId && template?.template_id !== parseInt(galleryId)) {
      // The Default template's id is fixed 0, to not show warning message in case of changing default template.
      if (template?.template_id !== 0) {
        const warningMessage: string =
          'Please note that when adjusting any parameter, the template will automatically changed to the current gallery template.';

        enqueueSnackbar(warningMessage, {
          variant: 'warning',
          anchorOrigin: {horizontal: 'right', vertical: 'top'},
          style: {maxWidth: '288px'},
        });
      }
      const templateData: ITemplate = {
        title: myTemplates.find((item) => item.id === galleryId)?.title || '',
        template_id: parseInt(galleryId),
        templateType: 'my',
      };
      setTemplate(templateData);
    }
  };

  const changeTemplate = (id: number, type: string) => {
    getTemplate(id, type);
  };

  const initTemplate = (id: number, title: string, type: string) => {
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
