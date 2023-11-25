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
import {
  AdvancedSettings,
  IAdvancedSettings,
} from 'components/advanced-settings';
import {AppInfoContext} from 'AppInfoContext';

const SettingsContext = React.createContext<{
  thumbnailSettings?: IThumbnailSettings;
  advancedSettings?: IAdvancedSettings;
}>({});

const SettingsProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const {enqueueSnackbar} = useSnackbar();

  const {galleryId, baseUrl} = useContext(AppInfoContext);
  const [thumbnailSettings, setThumbnailSettings] = useState<
    IThumbnailSettings | undefined
  >();
  const [advancedSettings, setAdvancedSettings] = useState<
    IAdvancedSettings | undefined
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
      const newThumbnailSettings: IThumbnailSettings = (
        await axios.get(fetchUrl)
      ).data;

      setThumbnailSettings(newThumbnailSettings);
      // TODO: remove as any after having grouped options
      setAdvancedSettings(newThumbnailSettings as any);
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
        titleFontFamilySize: 20,
      });
      setAdvancedSettings({
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

  useLayoutEffect(() => {
    getData();
  }, []);

  const onSave = async () => {
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'options/' + galleryId
      : undefined;

    if (fetchUrl) {
      setIsLoading(true);
      try {
        const newThumbnailSettings: IThumbnailSettings = (
          await axios.put(fetchUrl, thumbnailSettings)
        ).data;

        enqueueSnackbar('Settings are up to date!', {
          variant: 'success',
          anchorOrigin: {horizontal: 'right', vertical: 'top'},
        });
        // setThumbnailSettings(newThumbnailSettings);
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
      <Aligner>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{margin: '15px 20px'}}
        >
          {'Options'}
        </Typography>
        <span style={{margin: '10px'}}>
          <ExpandMore
            expand={isExpanded}
            onClick={() => setIsExpanded((prevValue) => !prevValue)}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </span>
      </Aligner>
    );
  };

  const renderBody = (): ReactNode => {
    return (
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Divider variant="middle" />
        <TabContext value={activeTab}>
          <Aligner>
            <Tabs
              value={activeTab}
              onChange={onActiveTabChange}
              style={{margin: '5px 20px'}}
            >
              <Tab label="Gallery" value="gallery" />
              <Tab label="Advanced" value="advanced" />
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
              style={{margin: '5px 20px'}}
            >
              {'Save'}
            </LoadingButton>
          </Aligner>
          <TabPanel value="gallery">
            {thumbnailSettings && (
              <ThumbnailSettings
                value={thumbnailSettings as IThumbnailSettings}
                onChange={setThumbnailSettings}
                isLoading={isLoading}
              />
            )}
          </TabPanel>
          <TabPanel value="advanced">
            {advancedSettings && (
              <AdvancedSettings
                value={advancedSettings as IAdvancedSettings}
                onChange={setAdvancedSettings}
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
    <SettingsContext.Provider value={{thumbnailSettings, advancedSettings}}>
      {showControls && (
        <Paper
          variant={'outlined'}
          style={{marginBottom: '20px'}}
          className={'settings'}
        >
          {renderTitle()}
          {renderBody()}
        </Paper>
      )}
      {children}
    </SettingsContext.Provider>
  );
};

export {SettingsContext, SettingsProvider};
