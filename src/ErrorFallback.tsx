import {ReactElement, useEffect} from 'react';

const ErrorFallback = ({error}: any): ReactElement | null => {
  useEffect(() => {
    console.error('ErrorBoundary caught an error:', error);
    (window as any).reacg_open_error_dialog?.({
      errorMessage: error.message,
    });
  }, [error.message]);

  return (
    <div role={'alert'}>
      <h2>
        {'Something went wrong?\n No worries , we’re here 24/7 to help. '}
        <a
          href="https://wordpress.org/support/plugin/regallery/#new-topic-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          {'WordPress support forum'}
        </a>
      </h2>
      <h2 style={{color: 'red'}}>{`Error: ${error.message}`}</h2>
    </div>
  );
};

export default ErrorFallback;
