import axios from 'axios';
import React, {useLayoutEffect, useState} from 'react';

const ValidationContext = React.createContext<{
  isProUser?: boolean;
}>({});

const ValidationProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const [isProUser, setIsProUser] = useState(false);

  const validate = async () => {
    const fetchUrl: string | undefined =
      'https://regallery.team/core/wp-json/reacgcore/v1/paidUser/'; //baseUrl      ? baseUrl + 'templates'      : undefined;

    if (fetchUrl) {
      try {
        const response = await axios.get(fetchUrl);
        const newIsProUser: boolean = response.data.paid_user;

        setIsProUser(newIsProUser);
      } catch (error) {
        console.log(error);
        setIsProUser(false);
      }
    } else {
      setIsProUser(false);
    }
  };
  useLayoutEffect(() => {
    validate();
  }, []);

  return (
    <ValidationContext.Provider
      value={{
        isProUser,
      }}
    >
      {children}
    </ValidationContext.Provider>
  );
};

export {ValidationContext, ValidationProvider};
