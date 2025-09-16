import axios from 'axios';
import {useSnackbar} from 'notistack';
import React, {useLayoutEffect, useState} from 'react';
import {TypeUtils} from 'utils';
import {useAppInfo} from '../AppInfoContext';
import {ITemplate, ITemplateReference} from './TemplatesContext.types';

const TemplatesContext = React.createContext<{
  templates?: ITemplateReference[];
  template?: ITemplate;
  changeTemplate?: (id: string, type: string) => void;
  resetTemplate?: () => void;
  initTemplate?: (id: string, title: string, type: string) => void;
  isLoading?: boolean;
}>({});

const noneOption: ITemplateReference = {
  id: 'none',
  title: 'None',
  paid: false,
  type: '',
};

const emptyTemplate: ITemplate = {
  title: 'None',
  template_id: 'none',
  template: true,
  templateType: '',
};

const TemplatesProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const {pluginVersion, showControls, baseUrl, getOptionsTimestamp} =
    useAppInfo();
  const {enqueueSnackbar} = useSnackbar();
  const [templates, setTemplates] = useState<ITemplateReference[]>([]);
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
      const templatesData: ITemplateReference[] = response.data;

      const customTemplatesResponse = await axios.get(
        baseUrl +
          'templates' +
          (baseUrl?.includes('?') ? '&' : '?') +
          'version=' +
          pluginVersion
      );
      const customTemplatesData: ITemplateReference[] =
        customTemplatesResponse.data;

      const withNoneOption: ITemplateReference[] = [
        ...templatesData,
        ...customTemplatesData,
        noneOption,
      ];

      setTemplates(withNoneOption);
    } catch (error) {
      console.error(error);
      setTemplates([noneOption]);
    }
  };

  const getTemplate = async (
    id: string | number,
    type: string
  ): Promise<void> => {
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
      id === 0 || type === 'custom'
        ? `${optionsUrl}${optionsUrlQueryString}`
        : `${coreUrl}${coreUrlQueryString}`;

    if (fetchUrl && id !== '') {
      setIsLoading(true);
      try {
        const response = await axios.get(fetchUrl);
        if (response.status === 204) {
          (window as any).reacg_open_premium_offer_dialog?.();
        } else {
          const templateData: ITemplate = response.data;
          templateData.templateType = type;
          templateData.template_id = id;
          console.log(templateData);

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
    // The same as !== 'none', BE keeps '' instead of 'none'
    if (TypeUtils.isNumber(template?.template_id)) {
      // The Default Template's id is fixed 0, to not show warning message in case of changing default template
      if (template?.template_id !== 0) {
        const warningMessage: string =
          'Please note that when adjusting any parameter, the template will automatically changed to "None".';

        enqueueSnackbar(warningMessage, {
          variant: 'warning',
          anchorOrigin: {horizontal: 'right', vertical: 'top'},
          style: {maxWidth: '288px'},
        });
      }

      setTemplate(emptyTemplate);
    }
  };

  const changeTemplate = (id: string, type: string) => {
    if (id === 'none') {
      resetTemplate();
    } else {
      getTemplate(id, type);
    }
  };

  const initTemplate = (id: string, title: string, type: string) => {
    setTemplate({
      template_id: id,
      title: title,
      template: true,
      templateType: type,
    });
  };

  useLayoutEffect(() => {
    getTemplates();
  }, []);

  return (
    <TemplatesContext.Provider
      value={{
        templates,
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
