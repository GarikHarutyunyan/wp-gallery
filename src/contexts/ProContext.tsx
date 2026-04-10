import axios from 'axios';
import React, {createContext, useContext, useEffect, useState} from 'react';

interface ProContextValue {
  isPro: boolean;
}

const ProContext = createContext<ProContextValue>({
  isPro: false,
});

export const ProProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await axios.get(
          'https://regallery.team/core/wp-json/reacgcore/v2/user'
        );
        if (!cancelled) setIsPro(!!response.data);
      } catch (error) {
        if (!cancelled) setIsPro(false);
        console.error(error);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return <ProContext.Provider value={{isPro}}>{children}</ProContext.Provider>;
};

export const usePro = () => useContext(ProContext);
