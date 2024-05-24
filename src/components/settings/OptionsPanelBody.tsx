import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import {GeneralSettings, IGeneralSettings} from 'components/general-settings';
import {
  ILightboxSettings,
  LightboxSettings,
} from 'components/light-box-settings';
import {IMosaicSettings, MosaicSettings} from 'components/mosaic-settings';
import {
  IThumbnailSettings,
  ThumbnailSettings,
} from 'components/thumbnail-settings';
import {GalleryType} from 'data-structures';
import React, {ReactNode, useState} from 'react';
import {SettingsPanelTabs} from './SettingsPanelTabs';
import {useSettings} from './useSettings';

interface IOptionsPanelBodyProps {
  isLoading: boolean;
  onSave: () => Promise<void>;
  onReset: () => Promise<void>;
  changeThumbnailSettings: (settings: IThumbnailSettings) => void;
  changeMosaicSettings: (settings: IMosaicSettings) => void;
  changeGeneralSettings: (settings: IGeneralSettings) => void;
  changeLightboxSettings: (settings: ILightboxSettings) => void;
}

const OptionsPanelBody: React.FC<IOptionsPanelBodyProps> = ({
  isLoading,
  onSave,
  onReset,
  changeThumbnailSettings,
  changeMosaicSettings,
  changeGeneralSettings,
  changeLightboxSettings,
}) => {
  const {
    type,
    thumbnailSettings,
    mosaicSettings,
    generalSettings,
    lightboxSettings,
  } = useSettings();
  const [activeTab, setActiveTab] = useState<string>('gallery');

  const onActiveTabChange = (_: any, newActiveTab: string) => {
    setActiveTab(newActiveTab);
  };

  const renderGalleryOptions = (): ReactNode => {
    return type === GalleryType.THUMBNAILS
      ? renderThumbnailSetting()
      : renderMosaicSetting();
  };

  const renderThumbnailSetting = (): ReactNode => {
    return (
      thumbnailSettings && (
        <ThumbnailSettings
          value={thumbnailSettings}
          onChange={changeThumbnailSettings}
          isLoading={isLoading}
        />
      )
    );
  };

  const renderMosaicSetting = (): ReactNode => {
    return (
      mosaicSettings && (
        <MosaicSettings
          value={mosaicSettings}
          onChange={changeMosaicSettings}
          isLoading={isLoading}
        />
      )
    );
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
        {renderGalleryOptions()}
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

export {OptionsPanelBody};
