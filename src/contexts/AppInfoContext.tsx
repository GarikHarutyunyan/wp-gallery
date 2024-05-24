import React from 'react';

const AppInfoContext = React.createContext<{
  galleryId?: string;
  baseUrl?: string;
  nonce?: string;
  pluginUrl?: string;
}>({});

interface IAppInfoProviderProps extends React.PropsWithChildren {
  galleryId?: string;
  baseUrl?: string;
  nonce?: string;
  pluginUrl?: string;
}

const AppInfoProvider: React.FC<IAppInfoProviderProps> = ({
  galleryId,
  baseUrl,
  nonce,
  pluginUrl,
  children,
}) => {
  return (
    <AppInfoContext.Provider value={{galleryId, baseUrl, nonce, pluginUrl}}>
      {children}
    </AppInfoContext.Provider>
  );
};

export {AppInfoContext, AppInfoProvider};
