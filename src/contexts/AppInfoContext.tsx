import React, {useContext} from 'react';

interface IAppInfo {
  galleryId?: string;
  showControls?: boolean;
  baseUrl?: string;
  nonce?: string;
  pluginUrl?: string;
  pluginAssetsUrl?: string;
  pluginVersion?: string;
  getGalleryTimestamp?: () => string;
  getOptionsTimestamp?: () => string;
  optionsContainerSelector: string;
}

const AppInfoContext = React.createContext<IAppInfo>({} as IAppInfo);

type AppInfoProviderProps = React.PropsWithChildren & IAppInfo;

const AppInfoProvider: React.FC<AppInfoProviderProps> = ({
  galleryId,
  showControls,
  baseUrl,
  nonce,
  pluginUrl,
  pluginAssetsUrl,
  pluginVersion,
  children,
  getGalleryTimestamp,
  getOptionsTimestamp,
  optionsContainerSelector,
}) => {
  return (
    <AppInfoContext.Provider
      value={{
        galleryId,
        showControls,
        baseUrl,
        nonce,
        pluginUrl,
        pluginAssetsUrl,
        pluginVersion,
        getGalleryTimestamp,
        getOptionsTimestamp,
        optionsContainerSelector,
      }}
    >
      {children}
    </AppInfoContext.Provider>
  );
};

const useAppInfo = () => {
  const context = useContext(AppInfoContext);
  if (!context)
    throw new Error('useAppInfo must be used within a AppInfoContext');

  return context;
};

export {AppInfoContext, AppInfoProvider, useAppInfo};
