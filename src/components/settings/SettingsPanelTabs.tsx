import Fullscreen from '@mui/icons-material/Fullscreen';
import PhotoLibrary from '@mui/icons-material/PhotoLibrary';
import Settings from '@mui/icons-material/Settings';
import LoadingButton from '@mui/lab/LoadingButton';
import {Box, Tab, Tabs, Tooltip} from '@mui/material';
import clsx from 'clsx';
import {Align, Aligner} from 'core-components/aligner';
import React, {useEffect, useState} from 'react';
import {TemplatesSelect} from './TemplatesSelect';

interface ISettingsPanelTabsProps {
  activeTab: string;
  onActiveTabChange: (_: any, newActiveTab: string) => void;
  onSave: () => void;
  onReset: () => void;
  hideLightboxOptions: boolean;
}

const SettingsPanelTabs: React.FC<ISettingsPanelTabsProps> = ({
  activeTab,
  onActiveTabChange,
  onSave,
  onReset,
  hideLightboxOptions,
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

  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const updateIsMobile = () => {
      const parentElement = document.querySelector('.reacg-preview');
      if (parentElement) {
        setIsTablet(
          parentElement && parentElement.getBoundingClientRect().width < 720
        );
        setIsMobile(
          parentElement && parentElement.getBoundingClientRect().width < 480
        );
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
    <Aligner style={{flexDirection: isTablet ? 'column-reverse' : 'row'}}>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs
          value={activeTab}
          onChange={onActiveTabChange}
          style={{width: '100%'}}
        >
          <Tab
            icon={<PhotoLibrary />}
            label={'Gallery'}
            value={'gallery'}
            iconPosition="start"
            sx={{
              'minHeight': 40,
              'padding': '12px 10px 8px',
              '& .MuiTab-iconWrapper': {
                fontSize: 18,
              },
            }}
          />
          <Tab
            icon={<Settings />}
            label={'General'}
            value={'general'}
            iconPosition="start"
            sx={{
              'minHeight': 40,
              'padding': '12px 10px 8px',
              '& .MuiTab-iconWrapper': {
                fontSize: 18,
              },
            }}
          />
          <Tab
            icon={<Fullscreen />}
            label={
              <Tooltip
                title={
                  hideLightboxOptions
                    ? 'To enable Lightbox, change the Image Click Action from Gallery settings.'
                    : ''
                }
              >
                <span>Lightbox</span>
              </Tooltip>
            }
            value={'lightbox'}
            iconPosition="start"
            sx={{
              'minHeight': 40,
              'padding': '12px 10px 8px',
              '& .MuiTab-iconWrapper': {
                fontSize: 18,
              },
              'color': hideLightboxOptions ? 'rgba(0, 0, 0, 0.38)' : 'initial',
              'cursor': hideLightboxOptions ? 'default' : 'pointer',
            }}
            onClick={() => {
              debugger;
              if (hideLightboxOptions) {
                return false;
              }
            }}
          />
        </Tabs>
      </Box>
      <Aligner
        style={{flexDirection: isMobile ? 'column' : 'row'}}
        align={Align.END}
      >
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
