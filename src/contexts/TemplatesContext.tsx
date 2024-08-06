import axios from 'axios';
import {ISettingsDTO} from 'data-structures';
import {useSnackbar} from 'notistack';
import React, {useContext, useLayoutEffect, useState} from 'react';

export interface ITemplate extends Partial<ISettingsDTO> {
  template_id: string;
  title: string;
  template: boolean;
}

export interface ITemplateReference {
  id: string;
  title: string;
}

const TemplatesContext = React.createContext<{
  templates?: ITemplateReference[];
  template?: ITemplate;
  changeTemplate?: (id: string) => void;
  resetTemplate?: () => void;
  initTemplate?: (id: string, title: string) => void;
  isLoading?: boolean;
}>({});

const noneOption: ITemplateReference = {id: 'none', title: 'None'};
const emptyTemplate: ITemplate = {
  title: 'None',
  template_id: 'none',
  template: true,
};

const TemplatesProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const {enqueueSnackbar} = useSnackbar();
  const [templates, setTemplates] = useState<ITemplateReference[]>([]);
  const [template, setTemplate] = useState<ITemplate>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getTemplates = async () => {
    const fetchUrl: string | undefined =
      'https://regallery.team/core/wp-json/reacgcore/v1/templates'; //baseUrl      ? baseUrl + 'templates'      : undefined;

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
        console.error(error);
        setTemplates([]);
      }
    } else {
      setTemplates([]);
    }
  };

  const getTemplate = async (id: string): Promise<void> => {
    const fetchUrl:
      | string
      | undefined = `https://regallery.team/core/wp-json/reacgcore/v1/template/${id}`;

    if (fetchUrl) {
      setIsLoading(true);
      try {
        const response = await axios.get(fetchUrl);
        const templateData: ITemplate = response.data;

        setTemplate(templateData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    } else {
      resetTemplate();
    }
  };

  const resetTemplate = (): void => {
    if (template?.template_id !== 'none') {
      const warningMessage: string =
        'Please note that when adjusting any parameter, the template will automatically changed to "None".';

      setTemplate(emptyTemplate);
      enqueueSnackbar(warningMessage, {
        variant: 'warning',
        anchorOrigin: {horizontal: 'right', vertical: 'top'},
        style: {maxWidth: '288px'},
      });
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

const useTemplates = () => {
  const context = useContext(TemplatesContext);
  if (!context)
    throw new Error('useTemplates must be used within a TemplatesContext');

  return context;
};

export {TemplatesContext, TemplatesProvider, useTemplates};
