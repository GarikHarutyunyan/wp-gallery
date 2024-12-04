import axios from 'axios';
import {useSnackbar} from 'notistack';
import React, {useLayoutEffect, useState} from 'react';
import {TypeUtils} from 'utils';
import {useAppInfo} from '../AppInfoContext';
import {ITemplate, ITemplateReference} from './TemplatesContext.types';

const TemplatesContext = React.createContext<{
  templates?: ITemplateReference[];
  template?: ITemplate;
  changeTemplate?: (id: string) => void;
  resetTemplate?: () => void;
  initTemplate?: (id: string, title: string) => void;
  isLoading?: boolean;
}>({});

const noneOption: ITemplateReference = {
  id: 'none',
  title: 'None',
  paid: false,
};

const emptyTemplate: ITemplate = {
  title: 'None',
  template_id: 'none',
  template: true,
  css: '',
};

const TemplatesProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const {enqueueSnackbar} = useSnackbar();
  const [templates, setTemplates] = useState<ITemplateReference[]>([]);
  const [template, setTemplate] = useState<ITemplate>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {showControls} = useAppInfo();

  const getTemplates = async () => {
    if (!showControls) {
      return;
    }
    const fetchUrl: string | undefined =
      'https://regallery.team/core/wp-json/reacgcore/v2/templates'; //baseUrl      ? baseUrl + 'templates'      : undefined;

    if (fetchUrl) {
      try {
        const response = await axios.get(fetchUrl);
        const templatesData: ITemplateReference[] = response.data;
        const withNoneOption: ITemplateReference[] = [
          ...templatesData,
          noneOption,
        ];

        setTemplates(withNoneOption);
      } catch (error) {
        console.log(error);
        setTemplates([noneOption]);
      }
    } else {
      setTemplates([noneOption]);
    }
  };

  const getTemplate = async (id: string): Promise<void> => {
    const fetchUrl:
      | string
      | undefined = `https://regallery.team/core/wp-json/reacgcore/v2/template/${id}`;

    if (fetchUrl && id !== '') {
      setIsLoading(true);
      try {
        const response = await axios.get(fetchUrl);
        const templateData: ITemplate = response.data;

        setTemplate(templateData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
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

  const changeTemplate = (id: string) => {
    if (id === 'none') {
      resetTemplate();
    } else {
      getTemplate(id);
    }
  };

  const initTemplate = (id: string, title: string) => {
    setTemplate({template_id: id, title: title, template: true});
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
