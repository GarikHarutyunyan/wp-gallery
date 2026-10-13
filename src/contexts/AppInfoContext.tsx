import React, {useContext} from 'react';

/**
 * 'gallery': renders a gallery instance (optionally with its controls
 *            portaled into `optionsContainerSelector`, as on the dashboard).
 * 'settings': renders only the settings UI for a gallery. Used by page
 *            builders, where the preview gallery lives in a canvas iframe and
 *            receives option changes over postMessage.
 */
export type AppMode = 'gallery' | 'settings';

interface IAppInfo {
  galleryId?: string;
  showControls?: boolean;
  mode?: AppMode;
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
  mode = 'gallery',
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
        mode,
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
