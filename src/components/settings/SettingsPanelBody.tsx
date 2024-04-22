import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import {GeneralSettings, IGeneralSettings} from 'components/general-settings';
import {
  ILightboxSettings,
  LightboxSettings,
} from 'components/light-box-settings';
import {
  IThumbnailSettings,
  ThumbnailSettings,
} from 'components/thumbnail-settings';
import React, {useState} from 'react';
import {SettingsPanelTabs} from './SettingsPanelTabs';
import {useSettings} from './useSettings';

interface ISettingsPanelBodyProps {
  isLoading: boolean;
  onSave: () => Promise<void>;
  onReset: () => Promise<void>;
  changeThumbnailSettings: (settings: IThumbnailSettings) => void;
  changeGeneralSettings: (settings: IGeneralSettings) => void;
  changeLightboxSettings: (settings: ILightboxSettings) => void;
}

const SettingsPanelBody: React.FC<ISettingsPanelBodyProps> = ({
  isLoading,
  onSave,
  onReset,
  changeThumbnailSettings,
  changeGeneralSettings,
  changeLightboxSettings,
}) => {
  const {thumbnailSettings, generalSettings, lightboxSettings} = useSettings();
  const [activeTab, setActiveTab] = useState<string>('gallery');

  const onActiveTabChange = (_: any, newActiveTab: string) => {
    setActiveTab(newActiveTab);
  };

  return (
    <TabContext value={activeTab}>
      <SettingsPanelTabs
        activeTab={activeTab}
        onActiveTabChange={onActiveTabChange}
        onSave={onSave}
        onReset={onReset}
      />
      <TabPanel value={'gallery'} className={'reacg-tab-panel'}>
        {thumbnailSettings && (
          <ThumbnailSettings
            value={thumbnailSettings}
            onChange={changeThumbnailSettings}
            isLoading={isLoading}
          />
        )}
      </TabPanel>
      <TabPanel value={'general'} className={'reacg-tab-panel'}>
        {generalSettings && (
          <GeneralSettings
            value={generalSettings}
            onChange={changeGeneralSettings}
            isLoading={isLoading}
          />
        )}
      </TabPanel>
      <TabPanel value={'lightbox'} className={'reacg-tab-panel'}>
        {lightboxSettings && (
          <LightboxSettings
            value={lightboxSettings}
            onChange={changeLightboxSettings}
            isLoading={isLoading}
          />
        )}
      </TabPanel>
    </TabContext>
  );
};

export {SettingsPanelBody};
