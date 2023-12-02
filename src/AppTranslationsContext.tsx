import React, {Dispatch, SetStateAction, useState} from 'react';

const AppTranslationsContext = React.createContext<{
  loadMoreText?: string;
  setLoadMoreText?: Dispatch<SetStateAction<string | undefined>>;
  noDataText?: string;
  setNoDataText?: Dispatch<SetStateAction<string | undefined>>;
}>({});

const AppTranslationsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [loadMoreText, setLoadMoreText] = useState<string | undefined>();
  const [noDataText, setNoDataText] = useState<string | undefined>();

  return (
    <AppTranslationsContext.Provider
      value={{loadMoreText, setLoadMoreText, noDataText, setNoDataText}}
    >
      {children}
    </AppTranslationsContext.Provider>
  );
};

export {AppTranslationsContext, AppTranslationsProvider};
