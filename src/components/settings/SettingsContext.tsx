import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LoadingButton from '@mui/lab/LoadingButton';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import {Paper, Typography} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import axios from 'axios';
import {GeneralSettings, IGeneralSettings} from 'components/general-settings';
import {
  ILightboxSettings,
  LightboxSettings,
} from 'components/light-box-settings';
import {AppInfoContext} from 'contexts/AppInfoContext';
import {Align, Aligner, ExpandMore, Tab} from 'core-components';
import {
  LightboxCaptionsPosition,
  LightboxThumbnailsPosition,
  PaginationButtonShape,
  PaginationType,
  TitleAlignment,
  TitlePosition,
  TitleVisibility,
} from 'data-structures';
import {useSnackbar} from 'notistack';
import React, {ReactNode, useContext, useLayoutEffect, useState} from 'react';
import {IThumbnailSettings, ThumbnailSettings} from '../thumbnail-settings';
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
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
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
      setThumbnailSettings({
        width: 150,
        height: 150,
        columns: 5,
        gap: 10,
        backgroundColor: 'White',
        padding: 10,
        paddingColor: 'Skyblue',
        borderRadius: 5,
        titlePosition: TitlePosition.BOTTOM,
        titleAlignment: TitleAlignment.LEFT,
        titleVisibility: TitleVisibility.NONE,
        titleFontFamily: 'Roboto',
        titleColor: 'Black',
        titleFontSize: 20,
      });
      setGeneralSettings({
        itemsPerPage: 8,
        paginationType: PaginationType.SCROLL,
        activeButtonColor: 'blue',
        inactiveButtonColor: 'inherit',
        paginationButtonShape: PaginationButtonShape.CIRCULAR,
        loadMoreButtonColor: 'blue',
        paginationTextColor: 'green',
      });
      setLightboxSettings({
        showLightbox: true,
        isFullscreen: false,
        width: 800,
        height: 800,
        areControlButtonsShown: false,
        isInfinite: false,
        padding: 15,
        canDownload: true,
        canZoom: true,
        isFullscreenAllowed: false,
        isSlideshowAllowed: false,
        autoplay: false,
        slideDuration: 3000,
        thumbnailsPosition: LightboxThumbnailsPosition.BOTTOM,
        thumbnailWidth: 80,
        thumbnailHeight: 80,
        thumbnailBorder: 2,
        thumbnailBorderRadius: 20,
        thumbnailBorderColor: 'white',
        thumbnailPadding: 0,
        thumbnailGap: 10,
        captionsPosition: LightboxCaptionsPosition.BOTTOM,
        captionFontFamily: 'Roboto',
        captionColor: 'White',
      });
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
        setIsLoading(false);
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
      const settings: ISettingsDTO = {
        ...thumbnailSettings,
        ...generalSettings,
        lightbox: lightboxSettings as ILightboxSettings,
      } as ISettingsDTO;

      try {
        await axios.delete(fetchUrl, {
          headers: {'X-WP-Nonce': nonce},
        });
        const response = await axios.get(fetchUrl, {
          headers: {'X-WP-Nonce': nonce},
        });
        const newSettings: ISettingsDTO = response.data;

        setThumbnailSettings(extractThumbnailSettings(newSettings));
        setGeneralSettings(extractGeneralSettings(newSettings));
        setLightboxSettings(newSettings.lightbox);
        enqueueSnackbar('Settings are reset!', {
          variant: 'success',
          anchorOrigin: {horizontal: 'right', vertical: 'top'},
        });
        setIsLoading(false);
      } catch (error) {
        enqueueSnackbar('Cannot reset options!', {
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

  const onActiveTabChange = (_: any, newActiveTab: string) => {
    setActiveTab(newActiveTab);
  };

  const renderTitle = (): ReactNode => {
    return (
      <Aligner
        onClick={() => setIsExpanded((prevValue) => !prevValue)}
        className={'settings-provider__title'}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{margin: '15px 20px'}}
        >
          {'Options'}
        </Typography>
        <span style={{margin: '10px'}}>
          <ExpandMore expand={isExpanded}>
            <ExpandMoreIcon />
          </ExpandMore>
        </span>
      </Aligner>
    );
  };

  const renderBody = (): ReactNode => {
    return (
      <Collapse in={isExpanded} timeout={'auto'} style={{margin: '5px'}}>
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
                loading={isLoading}
                loadingPosition={'center'}
                variant={'outlined'}
                onClick={onSave}
                style={{margin: '5px 5px', textTransform: 'none'}}
                className={
                  'button button-primary button-large save-settings-button'
                }
              >
                {'Save options'}
              </LoadingButton>
              <LoadingButton
                loading={isLoading}
                loadingPosition={'center'}
                variant={'outlined'}
                onClick={onReset}
                style={{margin: '5px 5px', textTransform: 'none'}}
                className={'button button-large'}
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
      </Collapse>
    );
  };

  return (
    <SettingsContext.Provider
      value={{thumbnailSettings, generalSettings, lightboxSettings}}
    >
      {showControls && (
        <Paper className={'reacg-settings'}>
          {renderTitle()}
          <Divider variant="middle" />
          {renderBody()}
        </Paper>
      )}
      {children}
    </SettingsContext.Provider>
  );
};

export {SettingsContext, SettingsProvider};
