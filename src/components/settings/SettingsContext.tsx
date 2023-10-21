import React, {ReactNode, useLayoutEffect, useState} from 'react';
import {IThumbnailSettings, ThumbnailSettings} from './ThumbnailSettings';
import Tabs from '@mui/material/Tabs';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import Button from '@mui/material/Button';
import {TitleAlignment, TitlePosition, TitleVisibility} from 'data-structures';
import {Paper, Typography} from '@mui/material';
import Divider from '@mui/material/Divider';
import {Aligner, ExpandMore, Tab} from 'core-components';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

const SettingsContext = React.createContext<IThumbnailSettings | null>(null);

const SettingsProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const [thumbnailSettings, setThumbnailSettings] = useState<
    IThumbnailSettings | undefined
  >();
  const [activeTab, setActiveTab] = useState<string>('gallery');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const isLightBoxTabDisabled: boolean = !thumbnailSettings?.showLightbox;

  const getData = async () => {
    const dataElement = document.getElementsByClassName('aig-preview')?.[0];
    const fetchOptionsUrl = dataElement?.getAttribute('data-options-url');
    const showControlsData: number = +(
      dataElement?.getAttribute('data-options-section') || 1
    );
    setShowControls(!!showControlsData);
    if (fetchOptionsUrl) {
      setIsLoading(true);
      const newThumbnailSettings: IThumbnailSettings = (
        await axios.get(fetchOptionsUrl as string)
      ).data;

      setThumbnailSettings(newThumbnailSettings);
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
    }
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  const onSave = async () => {
    const dataElement = document.getElementsByClassName('aig-preview')?.[0];
    const fetchUrl = dataElement?.getAttribute('data-options-url');

    if (fetchUrl) {
      setIsLoading(true);
      const newThumbnailSettings: IThumbnailSettings = (
        await axios.put(fetchUrl as string, thumbnailSettings)
      ).data;

      setIsLoading(false);
      // setThumbnailSettings(newThumbnailSettings);
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
              <Tab
                label="Light Box"
                value="lightBox"
                disabled={isLightBoxTabDisabled}
              />
            </Tabs>
            <LoadingButton
              loading={isLoading}
              loadingPosition="start"
              startIcon={isLoading && <SaveIcon />}
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
          <TabPanel value="lightBox">Item Two</TabPanel>
        </TabContext>
      </Collapse>
    );
  };

  return (
    <SettingsContext.Provider value={thumbnailSettings || null}>
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
