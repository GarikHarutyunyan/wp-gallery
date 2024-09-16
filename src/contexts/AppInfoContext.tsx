import React, {useContext} from 'react';

const AppInfoContext = React.createContext<{
  galleryId?: string;
  showControls?: boolean;
  baseUrl?: string;
  nonce?: string;
  pluginUrl?: string;
}>({});

interface IAppInfoProviderProps extends React.PropsWithChildren {
  galleryId?: string;
  showControls?: boolean;
  baseUrl?: string;
  nonce?: string;
  pluginUrl?: string;
}

const AppInfoProvider: React.FC<IAppInfoProviderProps> = ({
  galleryId,
  showControls,
  baseUrl,
  nonce,
  pluginUrl,
  children,
}) => {
  return (
    <AppInfoContext.Provider value={{galleryId, showControls, baseUrl, nonce, pluginUrl}}>
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
