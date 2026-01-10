import axios from 'axios';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {useAppInfo} from './AppInfoContext';

interface ProContextValue {
  isPro: boolean;
}

const ProContext = createContext<ProContextValue>({
  isPro: false,
});

export const ProProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const {showControls} = useAppInfo();
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (showControls) {
        try {
          const response = await axios.get(
            'https://regallery.team/core/wp-json/reacgcore/v2/user'
          );
          if (!cancelled) setIsPro(!!response.data);
        } catch (error) {
          if (!cancelled) setIsPro(false);
          console.error(error);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [showControls]);

  return <ProContext.Provider value={{isPro}}>{children}</ProContext.Provider>;
};

export const usePro = () => useContext(ProContext);
