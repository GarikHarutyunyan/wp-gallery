import axios from 'axios';
import {IGeneralSettings} from 'components/general-settings';
import {ILightboxSettings} from 'components/light-box-settings';
import {AppInfoContext} from 'contexts/AppInfoContext';
import {Section} from 'core-components';
import {useSnackbar} from 'notistack';
import React, {useContext, useLayoutEffect, useState} from 'react';
import {IThumbnailSettings} from '../thumbnail-settings';
import {
  generalMockSettings,
  lightboxMockSettings,
  thumbnailMockSettings,
} from './MockSettings';
import {SettingsPanelBody} from './SettingsPanelBody';
import {SettingsPanelHeader} from './SettingsPanelHeader';
import {
  extractGeneralSettings,
  extractThumbnailSettings,
} from './TemporaryHelpers';
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
  const [thumbnailSettings, setThumbnailSettings] =
    useState<IThumbnailSettings>();
  const [generalSettings, setGeneralSettings] = useState<IGeneralSettings>();
  const [lightboxSettings, setLightboxSettings] = useState<ILightboxSettings>();
  const [showControls, setShowControls] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

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

  useLayoutEffect(() => {
    getData();
  }, []);

  const onSave = async (): Promise<void> => {
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'options/' + galleryId
      : undefined;

    if (fetchUrl) {
      setIsLoading(true);
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
    } else {
      enqueueSnackbar('Cannot reset options!', {
        variant: 'error',
        anchorOrigin: {horizontal: 'right', vertical: 'top'},
      });
    }
  };

  return (
    <SettingsContext.Provider
      value={{thumbnailSettings, generalSettings, lightboxSettings}}
    >
      {showControls && (
        <Section
          header={<SettingsPanelHeader />}
          body={
            <SettingsPanelBody
              isLoading={isLoading}
              onSave={onSave}
              onReset={onReset}
              changeThumbnailSettings={setThumbnailSettings}
              changeGeneralSettings={setGeneralSettings}
              changeLightboxSettings={setLightboxSettings}
            />
          }
          outlined={false}
          className={'reacg-settings'}
        />
      )}
      {children}
    </SettingsContext.Provider>
  );
};

export {SettingsContext, SettingsProvider};
