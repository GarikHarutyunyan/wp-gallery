import React, {useLayoutEffect, useState} from 'react';
import {IThumbnailSettings, ThumbnailSettings} from './ThumbnailSettings';
import {styled} from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Collapse from '@mui/material/Collapse';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import Button from '@mui/material/Button';
import {TitlePosition, TitleVisibility} from 'data-structures';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const {expand, ...other} = props;
  return <IconButton {...other} />;
})(({theme, expand}) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  margin: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Aligner = styled((props: React.PropsWithChildren) => {
  return <div {...props}></div>;
})(() => ({
  width: 'auto',
  display: 'flex',
  justifyContent: 'space-between',
  margin: '0 20px',
}));

const SettingsContext = React.createContext<IThumbnailSettings | null>(null);

const SettingsProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const [thumbnailSettings, setThumbnailSettings] = useState<
    IThumbnailSettings | undefined
  >();
  const [activeTab, setActiveTab] = useState<string>('gallery');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const getData = async () => {
    const dataElement = document.getElementsByClassName('aig-preview')?.[0];
    const fetchUrl = dataElement?.getAttribute('data-options-url');
    if (fetchUrl) {
      const newThumbnailSettings: IThumbnailSettings = (
        await axios.get(fetchUrl as string)
      ).data;

      setThumbnailSettings(newThumbnailSettings);
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
        titlePosition: TitlePosition.BELOW,
        titleVisibility: TitleVisibility.NONE,
        titleColor: 'Black',
        titleFontSize: 20,
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
      const newThumbnailSettings: IThumbnailSettings = (
        await axios.put(fetchUrl as string, thumbnailSettings)
      ).data;

      // setThumbnailSettings(newThumbnailSettings);
    }
  };

  const onActiveTabChange = (_: any, newActiveTab: string) => {
    setActiveTab(newActiveTab);
  };

  return (
    <SettingsContext.Provider value={thumbnailSettings || null}>
      <TabContext value={activeTab}>
        <Aligner>
          <Tabs value={activeTab} onChange={onActiveTabChange}>
            <Tab label="Gallery" value="gallery" />
            <Tab label="Light Box" value="lightBox" />
          </Tabs>
          <span>
            <Button variant="contained" onClick={onSave}>
              {'Save'}
            </Button>
            <ExpandMore
              expand={isExpanded}
              onClick={() => setIsExpanded((prevValue) => !prevValue)}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </span>
        </Aligner>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <TabPanel value="gallery">
            {thumbnailSettings && (
              <ThumbnailSettings
                value={thumbnailSettings as IThumbnailSettings}
                onChange={setThumbnailSettings}
              />
            )}
          </TabPanel>
          <TabPanel value="lightBox">Item Two</TabPanel>
        </Collapse>
      </TabContext>
      {children}
    </SettingsContext.Provider>
  );
};

export {SettingsContext, SettingsProvider};
