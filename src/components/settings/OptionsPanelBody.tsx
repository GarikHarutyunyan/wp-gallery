import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import {GeneralSettings} from 'components/general-settings';
import {LightboxSettings} from 'components/light-box-settings';
import {ImageClickAction} from 'data-structures';
import {useState} from 'react';
import {OptionsPanelAppearanceTab} from './OptionsPanelAppearanceTab';
import {OptionsPanelGalleryTab} from './OptionsPanelGalleryTab';
import {SettingsPanelTabs} from './SettingsPanelTabs';
import {TextAndMetadataSettings} from './TextAndMetadataSettings';
import {useSettings} from './useSettings';

interface IOptionsPanelBodyProps {
  isLoading: boolean;
  isSmall: boolean;
  onSave: () => Promise<void>;
  onReset: () => Promise<void>;
}

const OptionsPanelBody = ({
  isLoading,
  isSmall,
  onSave,
  onReset,
}: IOptionsPanelBodyProps) => {
  const {type, generalSettings} = useSettings();
  const clickAction = generalSettings?.clickAction;
  const [activeTab, setActiveTab] = useState<string>('gallery');
  const showLightbox: boolean = clickAction === ImageClickAction.LIGHTBOX;
  const hideLightboxOptions: boolean = !showLightbox;

  const onActiveTabChange = (_: any, newActiveTab: string) => {
    if (hideLightboxOptions && newActiveTab === 'lightbox') {
      return;
    }
    setActiveTab(newActiveTab);
  };

  return (
    <TabContext value={activeTab}>
      <SettingsPanelTabs
        activeTab={activeTab}
        onActiveTabChange={onActiveTabChange}
        onSave={onSave}
        onReset={onReset}
        hideLightboxOptions={hideLightboxOptions}
        isSmall={isSmall}
      />
      <TabPanel value={'gallery'} className={'reacg-tab-panel'}>
        <OptionsPanelGalleryTab isLoading={isLoading} />
      </TabPanel>
      <TabPanel value={'appearance'} className={'reacg-tab-panel'}>
        <OptionsPanelAppearanceTab isLoading={isLoading} />
      </TabPanel>
      <TabPanel value={'general'} className={'reacg-tab-panel'}>
        <GeneralSettings isLoading={isLoading} sections={'main'} />
      </TabPanel>
      <TabPanel value={'protection'} className={'reacg-tab-panel'}>
        <GeneralSettings isLoading={isLoading} sections={'protection'} />
      </TabPanel>
      <TabPanel value={'text-metadata'} className={'reacg-tab-panel'}>
        {type ? (
          <TextAndMetadataSettings isLoading={isLoading} galleryType={type} />
        ) : null}
      </TabPanel>
      {!hideLightboxOptions ? (
        <TabPanel value={'lightbox'} className={'reacg-tab-panel'}>
          <LightboxSettings isLoading={isLoading} />
        </TabPanel>
      ) : null}
    </TabContext>
  );
};

export {OptionsPanelBody};
