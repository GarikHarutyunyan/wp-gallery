import React, {ReactNode, useContext, useLayoutEffect, useState} from 'react';
import {
  IThumbnailSettings,
  ThumbnailSettings,
} from '../thumbnail-settings/ThumbnailSettings';
import Tabs from '@mui/material/Tabs';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import {
  PaginationButtonShape,
  PaginationType,
  TitleAlignment,
  TitlePosition,
  TitleVisibility,
} from 'data-structures';
import {Paper, Typography} from '@mui/material';
import Divider from '@mui/material/Divider';
import {Aligner, ExpandMore, Tab} from 'core-components';
import LoadingButton from '@mui/lab/LoadingButton';
import {useSnackbar} from 'notistack';
import {GeneralSettings, IGeneralSettings} from 'components/general-settings';
import {AppInfoContext} from 'AppInfoContext';
import './settings-context.css';

const SettingsContext = React.createContext<{
  thumbnailSettings?: IThumbnailSettings;
  generalSettings?: IGeneralSettings;
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
  const [activeTab, setActiveTab] = useState<string>('gallery');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  // const isLightBoxTabDisabled: boolean = !thumbnailSettings?.showLightbox;

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
      const newSettings: IThumbnailSettings & IGeneralSettings = (
        await axios.get(fetchUrl, {
          headers: {'X-WP-Nonce': nonce},
        })
      ).data;

      setThumbnailSettings(extractThumbnailSettings(newSettings));
      setGeneralSettings(extractGeneralSettings(newSettings));
      setIsLoading(false);
    } else {
      setThumbnailSettings({
        width: 150,
        height: 150,
        columns: 5,
        showLightbox: true,
        gap: 10,
        backgroundColor: 'White',
        padding: 10,
        paddingColor: 'Skyblue',
        borderRadius: 5,
        titlePosition: TitlePosition.BELOW,
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
      showLightbox,
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
      showLightbox,
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
      const settings: IThumbnailSettings & IGeneralSettings = {
        ...thumbnailSettings,
        ...generalSettings,
      } as IThumbnailSettings & IGeneralSettings;

      const validSettings: IThumbnailSettings & IGeneralSettings =
        Object.entries(settings).reduce(
          (accumulator, [key, value]) => ({...accumulator, [key]: value || ''}),
          {}
        ) as IThumbnailSettings & IGeneralSettings;

      try {
        const response = await axios.put(fetchUrl, validSettings, {
          headers: {'X-WP-Nonce': nonce},
        });
        const newSettings: IThumbnailSettings & IGeneralSettings =
          response.data;

        setThumbnailSettings(extractThumbnailSettings(newSettings));
        setGeneralSettings(extractGeneralSettings(newSettings));
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
      <Collapse in={isExpanded} timeout="auto" style={{margin: '5px'}}>
        <TabContext value={activeTab}>
          <Aligner>
            <Tabs value={activeTab} onChange={onActiveTabChange}>
              <Tab label="Gallery" value="gallery" />
              <Tab label="General" value="general" />
              {/* <Tab
                label="Light Box"
                value="lightBox"
                disabled={isLightBoxTabDisabled}
              /> */}
            </Tabs>
            <LoadingButton
              loading={isLoading}
              loadingPosition="center"
              variant="outlined"
              onClick={onSave}
              style={{margin: '5px 20px', textTransform: 'none'}}
              className={'button button-primary button-large'}
            >
              {'Save options'}
            </LoadingButton>
          </Aligner>
          <TabPanel value="gallery" className={'reacg-tab-panel'}>
            {thumbnailSettings && (
              <ThumbnailSettings
                value={thumbnailSettings as IThumbnailSettings}
                onChange={setThumbnailSettings}
                isLoading={isLoading}
              />
            )}
          </TabPanel>
          <TabPanel value="general" className={'reacg-tab-panel'}>
            {generalSettings && (
              <GeneralSettings
                value={generalSettings as IGeneralSettings}
                onChange={setGeneralSettings}
                isLoading={isLoading}
              />
            )}
          </TabPanel>
          {/* <TabPanel value="lightBox">Item Two</TabPanel> */}
        </TabContext>
      </Collapse>
    );
  };

  return (
    <SettingsContext.Provider value={{thumbnailSettings, generalSettings}}>
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
