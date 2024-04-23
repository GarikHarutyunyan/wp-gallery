import React, {ReactElement} from 'react';
import ReactDOM from 'react-dom';

interface IDataFetcherProps {
  onClick: () => void;
}

const DataFetcher: React.FC<IDataFetcherProps> = ({onClick}) => {
  const button: ReactElement = (
    <input
      type={'button'}
      id={'reacg-reloadData'}
      onClick={onClick}
      style={{display: 'none'}}
    />
  );

  if (document.querySelector('body')) {
    return ReactDOM.createPortal(
      button,
      document.querySelector('body') as Element
    );
  }

  return null;
};

export {DataFetcher};
