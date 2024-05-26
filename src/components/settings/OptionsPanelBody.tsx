import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import {GeneralSettings} from 'components/general-settings';
import {LightboxSettings} from 'components/light-box-settings';
import {MosaicSettings} from 'components/mosaic-settings';
import {ThumbnailSettings} from 'components/thumbnail-settings';
import {GalleryType} from 'data-structures';
import React, {ReactNode, useState} from 'react';
import {SettingsPanelTabs} from './SettingsPanelTabs';
import {useSettings} from './useSettings';

interface IOptionsPanelBodyProps {
  isLoading: boolean;
  onSave: () => Promise<void>;
  onReset: () => Promise<void>;
}

const OptionsPanelBody: React.FC<IOptionsPanelBodyProps> = ({
  isLoading,
  onSave,
  onReset,
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
    return thumbnailSettings && <ThumbnailSettings isLoading={isLoading} />;
  };

  const renderMosaicSetting = (): ReactNode => {
    return mosaicSettings && <MosaicSettings isLoading={isLoading} />;
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
        {generalSettings && <GeneralSettings isLoading={isLoading} />}
      </TabPanel>
      <TabPanel value={'lightbox'} className={'reacg-tab-panel'}>
        {lightboxSettings && <LightboxSettings isLoading={isLoading} />}
      </TabPanel>
    </TabContext>
  );
};

export {OptionsPanelBody};
