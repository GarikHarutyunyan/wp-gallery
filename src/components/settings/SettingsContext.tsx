import LoadingButton from '@mui/lab/LoadingButton';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Tabs from '@mui/material/Tabs';
import axios from 'axios';
import clsx from 'clsx';
import {GeneralSettings, IGeneralSettings} from 'components/general-settings';
import {
  ILightboxSettings,
  LightboxSettings,
} from 'components/light-box-settings';
import {AppInfoContext} from 'contexts/AppInfoContext';
import {Align, Aligner, Section, Tab} from 'core-components';
import {useSnackbar} from 'notistack';
import React, {ReactNode, useContext, useLayoutEffect, useState} from 'react';
import {IThumbnailSettings, ThumbnailSettings} from '../thumbnail-settings';
import {
  generalMockSettings,
  lightboxMockSettings,
  thumbnailMockSettings,
} from './MockSettings';
import {SettingsPanelHeader} from './SettingsPanelHeader';
import './settings-context.css';

type ThumbnailAndGeneralSettings = IThumbnailSettings & IGeneralSettings;

interface ISettingsDTO extends ThumbnailAndGeneralSettings {
  lightbox: ILightboxSettings;
}

const SettingsContext = React.createContext<{
  thumbnailSettings?: IThumbnailSettings;
  generalSettings?: IGeneralSettings;
  lightboxSettings?: ILightboxSettings;
}>({});

const SettingsProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const {enqueueSnackbar} = useSnackbar();

  const {galleryId, baseUrl, nonce} = useContext(AppInfoContext);
  const [thumbnailSettings, setThumbnailSettings] = useState<
    IThumbnailSettings | undefined
  >();
  const [generalSettings, setGeneralSettings] = useState<
    IGeneralSettings | undefined
  >();
  const [lightboxSettings, setLightboxSettings] = useState<
    ILightboxSettings | undefined
  >();
  const [activeTab, setActiveTab] = useState<string>('gallery');
  const [showControls, setShowControls] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isReseting, setIsReseting] = useState(false);

  const getData = async () => {
    const dataElement = document.getElementById('reacg-root' + galleryId);
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'options/' + galleryId
      : undefined;
    const showControlsData: number = +(
      dataElement?.getAttribute('data-options-section') || 1
    );

    setShowControls(!!showControlsData);

    if (fetchUrl) {
      setIsLoading(true);
      const newSettings: ISettingsDTO = (
        await axios.get(fetchUrl, {
          headers: {'X-WP-Nonce': nonce},
        })
      ).data;

      setThumbnailSettings(extractThumbnailSettings(newSettings));
      setGeneralSettings(extractGeneralSettings(newSettings));
      setLightboxSettings(newSettings.lightbox);

      setIsLoading(false);
    } else {
      setThumbnailSettings(thumbnailMockSettings);
      setGeneralSettings(generalMockSettings);
      setLightboxSettings(lightboxMockSettings);
    }
  };

  const extractThumbnailSettings = (
    settings: IThumbnailSettings & IGeneralSettings
  ): IThumbnailSettings => {
    const {
      backgroundColor,
      borderRadius,
      columns = 1,
      gap,
      height = 1,
      padding,
      paddingColor,
      titleAlignment,
      titleColor,
      titleFontFamily,
      titleFontSize = 1,
      titlePosition,
      titleVisibility,
      width = 1,
    }: IThumbnailSettings = settings;

    return {
      backgroundColor,
      borderRadius,
      columns,
      gap,
      height,
      padding,
      paddingColor,
      titleAlignment,
      titleColor,
      titleFontFamily,
      titleFontSize,
      titlePosition,
      titleVisibility,
      width,
    };
  };

  const extractGeneralSettings = (
    settings: IThumbnailSettings & IGeneralSettings
  ): IGeneralSettings => {
    const {
      activeButtonColor,
      inactiveButtonColor,
      itemsPerPage = 1,
      loadMoreButtonColor,
      paginationButtonShape,
      paginationTextColor,
      paginationType,
    }: IGeneralSettings = settings;

    return {
      activeButtonColor,
      inactiveButtonColor,
      itemsPerPage,
      loadMoreButtonColor,
      paginationButtonShape,
      paginationTextColor,
      paginationType,
    };
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  const onSave = async () => {
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'options/' + galleryId
      : undefined;

    if (fetchUrl) {
      setIsLoading(true);
      setIsSaving(true);
      const settings: ISettingsDTO = {
        ...thumbnailSettings,
        ...generalSettings,
        lightbox: lightboxSettings as ILightboxSettings,
      } as ISettingsDTO;

      const validSettings: ISettingsDTO = Object.entries(settings).reduce(
        (accumulator, [key, value]) => ({...accumulator, [key]: value || ''}),
        {}
      ) as ISettingsDTO;

      try {
        const response = await axios.post(fetchUrl, validSettings, {
          headers: {'X-WP-Nonce': nonce},
        });
        const newSettings: ISettingsDTO = response.data;

        setThumbnailSettings(extractThumbnailSettings(newSettings));
        setGeneralSettings(extractGeneralSettings(newSettings));
        setLightboxSettings(newSettings.lightbox);
        enqueueSnackbar('Settings are up to date!', {
          variant: 'success',
          anchorOrigin: {horizontal: 'right', vertical: 'top'},
        });
      } catch (error) {
        enqueueSnackbar('Cannot update options!', {
          variant: 'error',
          anchorOrigin: {horizontal: 'right', vertical: 'top'},
        });
        console.error(error);
      }

      setIsLoading(false);
      setIsSaving(false);
    } else {
      enqueueSnackbar('Cannot update options!', {
        variant: 'error',
        anchorOrigin: {horizontal: 'right', vertical: 'top'},
      });
    }
  };

  const onReset = async (): Promise<void> => {
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'options/' + galleryId
      : undefined;

    if (fetchUrl) {
      setIsLoading(true);
      setIsReseting(true);

      try {
        const successMessage: string = (
          await axios.delete(fetchUrl, {
            headers: {'X-WP-Nonce': nonce},
          })
        ).data as string;
        const response = await axios.get(fetchUrl, {
          headers: {'X-WP-Nonce': nonce},
        });
        const newSettings: ISettingsDTO = response.data;

        setThumbnailSettings(extractThumbnailSettings(newSettings));
        setGeneralSettings(extractGeneralSettings(newSettings));
        setLightboxSettings(newSettings.lightbox);
        enqueueSnackbar(successMessage, {
          variant: 'success',
          anchorOrigin: {horizontal: 'right', vertical: 'top'},
        });
      } catch (error: any) {
        enqueueSnackbar('Cannot reset options', {
          variant: 'error',
          anchorOrigin: {horizontal: 'right', vertical: 'top'},
        });
        console.error(error);
      }

      setIsLoading(false);
      setIsReseting(false);
    } else {
      enqueueSnackbar('Cannot reset options!', {
        variant: 'error',
        anchorOrigin: {horizontal: 'right', vertical: 'top'},
      });
    }
  };

  const onActiveTabChange = (_: any, newActiveTab: string) => {
    setActiveTab(newActiveTab);
  };

  const renderBody = (): ReactNode => {
    return (
      <TabContext value={activeTab}>
        <Aligner>
          <Tabs
            value={activeTab}
            onChange={onActiveTabChange}
            style={{width: '100%'}}
          >
            <Tab label={'Gallery'} value={'gallery'} />
            <Tab label={'General'} value={'general'} />
            <Tab label={'Lightbox'} value={'Lightbox'} />
          </Tabs>
          <Aligner align={Align.END}>
            <LoadingButton
              loading={isSaving}
              loadingPosition={'center'}
              variant={'outlined'}
              onClick={onSave}
              className={clsx(
                'button button-large',
                'button-primary',
                'settings-panel_body-button'
              )}
            >
              {'Save options'}
            </LoadingButton>
            <LoadingButton
              loading={isReseting}
              loadingPosition={'center'}
              variant={'outlined'}
              onClick={onReset}
              className={clsx(
                'button',
                'button-large',
                'settings-panel_body-button'
              )}
            >
              {'Reset'}
            </LoadingButton>
          </Aligner>
        </Aligner>
        <TabPanel value={'gallery'} className={'reacg-tab-panel'}>
          {thumbnailSettings && (
            <ThumbnailSettings
              value={thumbnailSettings as IThumbnailSettings}
              onChange={setThumbnailSettings}
              isLoading={isLoading}
            />
          )}
        </TabPanel>
        <TabPanel value={'general'} className={'reacg-tab-panel'}>
          {generalSettings && (
            <GeneralSettings
              value={generalSettings as IGeneralSettings}
              onChange={setGeneralSettings}
              isLoading={isLoading}
            />
          )}
        </TabPanel>
        <TabPanel value={'Lightbox'} className={'reacg-tab-panel'}>
          {lightboxSettings && (
            <LightboxSettings
              value={lightboxSettings as ILightboxSettings}
              onChange={setLightboxSettings}
              isLoading={isLoading}
            />
          )}
        </TabPanel>
      </TabContext>
    );
  };

  return (
    <SettingsContext.Provider
      value={{thumbnailSettings, generalSettings, lightboxSettings}}
    >
      {showControls && (
        <Section
          header={<SettingsPanelHeader />}
          body={renderBody()}
          outlined={false}
          className={'reacg-settings'}
        />
      )}
      {children}
    </SettingsContext.Provider>
  );
};

export {SettingsContext, SettingsProvider};
