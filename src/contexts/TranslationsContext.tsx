import React, {Dispatch, SetStateAction, useState} from 'react';

const TranslationsContext = React.createContext<{
  loadMoreText?: string;
  setLoadMoreText?: Dispatch<SetStateAction<string | undefined>>;
  noDataText?: string;
  setNoDataText?: Dispatch<SetStateAction<string | undefined>>;
}>({});

const TranslationsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [loadMoreText, setLoadMoreText] = useState<string | undefined>();
  const [noDataText, setNoDataText] = useState<string | undefined>();

  return (
    <TranslationsContext.Provider
      value={{loadMoreText, setLoadMoreText, noDataText, setNoDataText}}
    >
      {children}
    </TranslationsContext.Provider>
  );
};

export {TranslationsContext, TranslationsProvider};
