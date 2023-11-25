import React from 'react';

const AppInfoContext = React.createContext<{
  galleryId?: string;
  baseUrl?: string;
  nonce?: string;
}>({});

interface IAppInfoProviderProps extends React.PropsWithChildren {
  galleryId?: string;
  baseUrl?: string;
  nonce?: string;
}

const AppInfoProvider: React.FC<IAppInfoProviderProps> = ({
  galleryId,
  baseUrl,
  nonce,
  children,
}) => {
  return (
    <AppInfoContext.Provider value={{galleryId, baseUrl, nonce}}>
      {children}
    </AppInfoContext.Provider>
  );
};

export {AppInfoContext, AppInfoProvider};
