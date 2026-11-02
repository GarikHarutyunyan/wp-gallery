import React, {Dispatch, SetStateAction, useState} from 'react';

const TranslationsContext = React.createContext<{
  loadMoreText?: string;
  setLoadMoreText?: Dispatch<SetStateAction<string | undefined>>;
  noDataText?: string;
  setNoDataText?: Dispatch<SetStateAction<string | undefined>>;
  searchPlaceholder?: string;
  setSearchPlaceholder?: Dispatch<SetStateAction<string | undefined>>;
  allText?: string;
  setAllText?: Dispatch<SetStateAction<string | undefined>>;
}>({});

const TranslationsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [loadMoreText, setLoadMoreText] = useState<string | undefined>(
    () =>
      typeof window !== 'undefined'
        ? (window as any).reacg_global?.text?.load_more
        : undefined
  );
  const [noDataText, setNoDataText] = useState<string | undefined>(
    () =>
      typeof window !== 'undefined'
        ? (window as any).reacg_global?.text?.no_data
        : undefined
  );
  const [searchPlaceholder, setSearchPlaceholder] = useState<
    string | undefined
  >(
    () =>
      typeof window !== 'undefined'
        ? (window as any).reacg_global?.text?.search || 'Search'
        : 'Search'
  );
  const [allText, setAllText] = useState<string | undefined>(
    () =>
      typeof window !== 'undefined'
        ? (window as any).reacg_global?.text?.all || 'All'
        : 'All'
  );

  return (
    <TranslationsContext.Provider
      value={{
        loadMoreText,
        setLoadMoreText,
        noDataText,
        setNoDataText,
        searchPlaceholder,
        setSearchPlaceholder,
        allText,
        setAllText,
      }}
    >
      {children}
    </TranslationsContext.Provider>
  );
};

export {TranslationsContext, TranslationsProvider};
