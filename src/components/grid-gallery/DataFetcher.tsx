import React, {ReactElement} from 'react';
import ReactDOM from 'react-dom';

interface IDataFetcherProps {
  onClick: (fromWindow: boolean) => void;
}

// TODO: move to other folder
const DataFetcher: React.FC<IDataFetcherProps> = ({onClick}) => {
  const button: ReactElement = (
    <input
      type={'button'}
      id={'reacg-reloadData'}
      onClick={(event) => {
        const fromWindow = event.currentTarget.hasAttribute(
          'data-reacg-from-window'
        );
        if (fromWindow) {
          event.currentTarget.removeAttribute('data-reacg-from-window');
        }
        onClick(fromWindow);
      }}
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
