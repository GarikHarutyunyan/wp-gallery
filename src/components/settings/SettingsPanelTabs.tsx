import LoadingButton from '@mui/lab/LoadingButton';
import {Tab, Tabs} from '@mui/material';
import clsx from 'clsx';
import {Align, Aligner} from 'core-components';
import React, {useState} from 'react';

interface ISettingsPanelTabsProps {
  activeTab: string;
  onActiveTabChange: (_: any, newActiveTab: string) => void;
  onSave: () => void;
  onReset: () => void;
}

const SettingsPanelTabs: React.FC<ISettingsPanelTabsProps> = ({
  activeTab,
  onActiveTabChange,
  onSave,
  onReset,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isReseting, setIsReseting] = useState(false);

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
            'button',
            'button-large',
            'button-primary',
            'options-panel_body-button',
            'save-settings-button'
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
            'options-panel_body-button'
          )}
        >
          {'Reset'}
        </LoadingButton>
      </Aligner>
    </Aligner>
  );
};

export {SettingsPanelTabs};
