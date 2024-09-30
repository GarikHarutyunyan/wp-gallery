import LoadingButton from '@mui/lab/LoadingButton';
import {Tab, Tabs, useMediaQuery, useTheme} from '@mui/material';
import clsx from 'clsx';
import {Align, Aligner} from 'core-components';
import {GalleryType} from 'data-structures';
import React, {useEffect, useState} from 'react';
import {TemplatesSelect} from './TemplatesSelect';
import {useSettings} from './useSettings';

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
  const {type} = useSettings();
  const showOnlyGalleryOptions: boolean =
    type === GalleryType.SLIDESHOW || type === GalleryType.CUBE || type === GalleryType.CAROUSEL;

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

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const updateIsMobile = () => {
      const parentElement = document.querySelector('.reacg-preview');
      if (parentElement) {
        setIsMobile(parentElement && parentElement.getBoundingClientRect().width < 720);
      }
    };

    // Initial check.
    updateIsMobile();

    // Add event listener to handle window resize.
    window.addEventListener('resize', updateIsMobile);

    // Cleanup event listener on component unmount.
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  return (
    <Aligner style={{flexDirection: isMobile ? 'column-reverse' : 'row'}}>
      <Tabs
        value={activeTab}
        onChange={onActiveTabChange}
        style={{width: '100%'}}
      >
        <Tab label={'Gallery'} value={'gallery'} />
          <Tab label={'General'} value={'general'} />
        {!showOnlyGalleryOptions ? (
          <Tab label={'Lightbox'} value={'lightbox'} />
        ) : null}
      </Tabs>
      <Aligner align={Align.END}>
        <TemplatesSelect />
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
