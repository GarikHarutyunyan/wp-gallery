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
        {
          'Oops! Something went wrong. Just ping us, our support team is available 24/7 and happy to help. '
        }
        <a
          href={(window as any).reacg_global?.support_url || ''}
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>{'Contact Us'}</strong>
        </a>
      </h2>
      <h2 style={{color: 'red'}}>{`Error: ${error.message}`}</h2>
    </div>
  );
};

export default ErrorFallback;
