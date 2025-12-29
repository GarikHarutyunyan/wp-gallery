import React, {ReactElement, useContext, useEffect} from 'react';

interface IAppInfo {
  galleryInstanceId?: string;
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

const AppInfoProvider = ({
  galleryInstanceId,
  galleryId,
  showControls: defaultShowControls,
  baseUrl,
  nonce,
  pluginUrl,
  pluginAssetsUrl,
  pluginVersion,
  children,
  getGalleryTimestamp,
  getOptionsTimestamp,
  optionsContainerSelector,
}: AppInfoProviderProps): ReactElement => {
  const [showControls, setShowControls] = React.useState<boolean | undefined>(
    defaultShowControls
  );

  useEffect(() => {
    const changeControlsVisibility = (e: Event) => {
      (e as CustomEvent).detail?.show !== undefined &&
        setShowControls((e as CustomEvent).detail.show);
    };

    window.addEventListener(
      `${galleryInstanceId}-show-controls`,
      changeControlsVisibility,
      false
    );

    return () =>
      window.removeEventListener(
        `${galleryInstanceId}-show-controls`,
        changeControlsVisibility
      );
  }, []);

  return (
    <AppInfoContext.Provider
      value={{
        galleryInstanceId,
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
