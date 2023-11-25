import React from 'react';

const AppInfoContext = React.createContext<{
  galleryId?: string;
  baseUrl?: string;
}>({});

interface IAppInfoProviderProps extends React.PropsWithChildren {
  galleryId?: string;
  baseUrl?: string;
}

const AppInfoProvider: React.FC<IAppInfoProviderProps> = ({
  galleryId,
  baseUrl,
  children,
}) => {
  return (
    <AppInfoContext.Provider value={{galleryId, baseUrl}}>
      {children}
    </AppInfoContext.Provider>
  );
};

export {AppInfoContext, AppInfoProvider};
