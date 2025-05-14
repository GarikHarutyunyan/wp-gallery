import {useAppInfo} from 'contexts';
import {ReactElement} from 'react';
import {useErrorBoundary} from 'react-error-boundary';

const ErrorFallback = ({error}: any): ReactElement | null => {
  const {resetBoundary} = useErrorBoundary();
  const {showControls} = useAppInfo();

  return showControls ? (
    <div role="alert">
      <h2>
        {"We're here to help, 24/7! Reach out to us anytime on the "}
        <a
          href="https://wordpress.org/support/plugin/regallery/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {'WordPress support forum'}
        </a>
        {". Let's make your gallery shine, just the way you need it."}
      </h2>
      <pre
        style={{color: 'red'}}
      >{`Something went wrong: ${error.message}`}</pre>
      <button onClick={resetBoundary}>Try again</button>
    </div>
  ) : null;
};

export default ErrorFallback;
