import axios from 'axios';
import {IGeneralSettings} from 'components/general-settings';
import {ILightboxSettings} from 'components/light-box-settings';
import {IMosaicSettings} from 'components/mosaic-settings';
import {AppInfoContext} from 'contexts/AppInfoContext';
import {Section} from 'core-components';
import {GalleryType} from 'data-structures';
import {useSnackbar} from 'notistack';
import React, {useContext, useLayoutEffect, useState} from 'react';
import {IThumbnailSettings} from '../thumbnail-settings';
import {
  generalMockSettings,
  lightboxMockSettings,
  mosaicMockSettings,
  thumbnailMockSettings,
} from './MockSettings';
import {OptionsPanelBody} from './OptionsPanelBody';
import {OptionsPanelHeader} from './OptionsPanelHeader';
import {TypePanelBody} from './TypePanelBody ';
import {TypePanelHeader} from './TypePanelHeader';
import './settings-context.css';

interface ISettingsDTO {
  type: GalleryType;
  general: IGeneralSettings;
  thumbnails: IThumbnailSettings;
  mosaic: IMosaicSettings;
  lightbox: ILightboxSettings;
}

const SettingsContext = React.createContext<{
  type?: GalleryType;
  generalSettings?: IGeneralSettings;
  thumbnailSettings?: IThumbnailSettings;
  mosaicSettings?: IMosaicSettings;
  lightboxSettings?: ILightboxSettings;
}>({});

const SettingsProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const {enqueueSnackbar} = useSnackbar();

  const {galleryId, baseUrl, nonce} = useContext(AppInfoContext);
  const [thumbnailSettings, setThumbnailSettings] =
    useState<IThumbnailSettings>();
  const [mosaicSettings, setMosaicSettings] = useState<IMosaicSettings>();
  const [generalSettings, setGeneralSettings] = useState<IGeneralSettings>();
  const [lightboxSettings, setLightboxSettings] = useState<ILightboxSettings>();
  const [showControls, setShowControls] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<GalleryType>();

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

      setType(newSettings.type);
      setGeneralSettings(newSettings.general || generalMockSettings);
      setThumbnailSettings(newSettings.thumbnails || thumbnailMockSettings);
      setMosaicSettings(newSettings.mosaic || mosaicMockSettings);
      setLightboxSettings(newSettings.lightbox);

      setIsLoading(false);
    } else {
      setType(GalleryType.THUMBNAILS);
      setGeneralSettings(generalMockSettings);
      setThumbnailSettings(thumbnailMockSettings);
      setMosaicSettings(mosaicMockSettings);
      setLightboxSettings(lightboxMockSettings);
    }
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  const onTypeChange = async (newType: GalleryType): Promise<void> => {
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'options/' + galleryId
      : undefined;

    if (fetchUrl) {
      setIsLoading(true);
      const settings: ISettingsDTO = {
        type: newType,
      } as ISettingsDTO;

      try {
        const response = await axios.post(fetchUrl, settings, {
          headers: {'X-WP-Nonce': nonce},
        });
        const newType: GalleryType = response.data.type;

        setType(newType);
        enqueueSnackbar('Type is up to date!', {
          variant: 'success',
          anchorOrigin: {horizontal: 'right', vertical: 'top'},
        });
      } catch (error) {
        enqueueSnackbar('Cannot update type!', {
          variant: 'error',
          anchorOrigin: {horizontal: 'right', vertical: 'top'},
        });
        console.error(error);
      }

      setIsLoading(false);
    } else {
      enqueueSnackbar('Cannot update type!', {
        variant: 'error',
        anchorOrigin: {horizontal: 'right', vertical: 'top'},
      });
    }
  };

  const onSave = async (): Promise<void> => {
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'options/' + galleryId
      : undefined;

    if (fetchUrl) {
      setIsLoading(true);
      const settings: ISettingsDTO = {
        general: generalSettings,
        thumbnails: thumbnailSettings,
        lightbox: lightboxSettings,
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

        setGeneralSettings(newSettings.general);
        setThumbnailSettings(newSettings.thumbnails);
        setMosaicSettings(newSettings.mosaic);
        setLightboxSettings(newSettings.lightbox);
        enqueueSnackbar('Options are up to date!', {
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

        setGeneralSettings(newSettings.general);
        setThumbnailSettings(newSettings.thumbnails);
        setMosaicSettings(newSettings.mosaic);
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
      value={{
        type,
        thumbnailSettings,
        mosaicSettings,
        generalSettings,
        lightboxSettings,
      }}
    >
      {showControls && (
        <>
          <Section
            header={<TypePanelHeader />}
            body={
              <TypePanelBody isLoading={isLoading} onChange={onTypeChange} />
            }
            outlined={false}
            className={'reacg-settings'}
          />
          <Section
            header={<OptionsPanelHeader />}
            body={
              <OptionsPanelBody
                isLoading={isLoading}
                onSave={onSave}
                onReset={onReset}
                changeGeneralSettings={setGeneralSettings}
                changeThumbnailSettings={setThumbnailSettings}
                changeMosaicSettings={setMosaicSettings}
                changeLightboxSettings={setLightboxSettings}
              />
            }
            outlined={false}
            className={'reacg-settings'}
          />
        </>
      )}
      {children}
    </SettingsContext.Provider>
  );
};

export {SettingsContext, SettingsProvider};
