import LoadingButton from '@mui/lab/LoadingButton';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import {Tab, Tabs} from '@mui/material';
import clsx from 'clsx';
import {GeneralSettings, IGeneralSettings} from 'components/general-settings';
import {
  ILightboxSettings,
  LightboxSettings,
} from 'components/light-box-settings';
import {
  IThumbnailSettings,
  ThumbnailSettings,
} from 'components/thumbnail-settings';
import {Align, Aligner} from 'core-components';
import React, {useState} from 'react';
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
  const [isSaving, setIsSaving] = useState(false);
  const [isReseting, setIsReseting] = useState(false);

  const onActiveTabChange = (_: any, newActiveTab: string) => {
    setActiveTab(newActiveTab);
  };

  const save = async () => {
    setIsSaving(true);
    await onSave();
    setIsSaving(false);
  };

  const reset = async () => {
    setIsReseting(true);
    await onReset();
    setIsReseting(false);
  };

  return (
    <TabContext value={activeTab}>
      <Aligner>
        <Tabs
          value={activeTab}
          onChange={onActiveTabChange}
          style={{width: '100%'}}
        >
          <Tab label={'Gallery'} value={'gallery'} />
          <Tab label={'General'} value={'general'} />
          <Tab label={'Lightbox'} value={'lightbox'} />
        </Tabs>
        <Aligner align={Align.END}>
          <LoadingButton
            loading={isSaving}
            loadingPosition={'center'}
            variant={'outlined'}
            onClick={save}
            className={clsx(
              'button button-large',
              'button-primary',
              'settings-panel_body-button'
            )}
          >
            {'Save options'}
          </LoadingButton>
          <LoadingButton
            loading={isReseting}
            loadingPosition={'center'}
            variant={'outlined'}
            onClick={reset}
            className={clsx(
              'button',
              'button-large',
              'settings-panel_body-button'
            )}
          >
            {'Reset'}
          </LoadingButton>
        </Aligner>
      </Aligner>
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
