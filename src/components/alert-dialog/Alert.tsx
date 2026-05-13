import {Box, Typography} from '@mui/material';
import {Button} from 'core-components/button';
import {useState} from 'react';
import {freeTrialFormIntro, getTrialDays} from './AlertDialog.constants';
import {AlertConfig} from './AlertDialog.types';

interface IAlertProps {
  config: AlertConfig;
}

export const getTrialEndpoint = () => {
  const endpoint = (window as any).reacg_global?.activate_trial_url;

  if (typeof endpoint === 'string' && endpoint.trim()) {
    return endpoint;
  }

  return 'https://regallery.team/core/wp-json/reacgcore/v2/trial/activate';
};

const Alert = ({config}: IAlertProps) => {
  const {
    image,
    title,
    description,
    preButtonContent,
    additionalText,
    errorMessage,
    buttonConfig,
    utm_medium,
  } = config;
  const {label, backgroundColor, width, onClick} = buttonConfig;

  const [trialEmail, setTrialEmail] = useState('');
  const [trialSubmitError, setTrialSubmitError] = useState('');
  const [trialSubmitSuccess, setTrialSubmitSuccess] = useState('');
  const [isSubmittingTrial, setIsSubmittingTrial] = useState(false);

  const isTrialFlowEnabled = Boolean(getTrialEndpoint());

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const submitTrial = async () => {
    const email = trialEmail.trim();

    if (!email) {
      setTrialSubmitSuccess('');
      setTrialSubmitError('Please enter your email address.');
      return false;
    }

    if (!isValidEmail(email)) {
      setTrialSubmitSuccess('');
      setTrialSubmitError('Please enter a valid email address.');
      return false;
    }

    try {
      setIsSubmittingTrial(true);
      setTrialSubmitError('');
      setTrialSubmitSuccess('');

      const response = await fetch(getTrialEndpoint(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      });

      let body: any = null;
      try {
        body = await response.json();
      } catch (_error) {
        body = null;
      }

      if (!response.ok) {
        const errorsMessage = body?.errors?.message;
        const errorFromResponse =
          body?.message ||
          body?.error ||
          (Array.isArray(errorsMessage) ? errorsMessage[0] : errorsMessage) ||
          body?.errors?.[0]?.message;

        setTrialSubmitError(
          errorFromResponse || 'Unable to enable trial. Please try again.'
        );
        return false;
      }

      setTrialSubmitSuccess(
        body?.message ||
          `Trial successfully enabled. You have ${getTrialDays()} days to explore all features.`
      );

      return true;
    } catch (_error) {
      setTrialSubmitError('Network error. Please try again.');
      return false;
    } finally {
      setIsSubmittingTrial(false);
    }
  };

  const handleClick = async (utm_medium?: string) => {
    if (isTrialFlowEnabled) {
      const isSuccess = await submitTrial();
      if (!isSuccess) {
        return;
      }
    }

    onClick(utm_medium);
  };

  const renderAdditionalText = () => {
    if (typeof additionalText === 'function') {
      return additionalText(utm_medium);
    }

    return additionalText;
  };

  const renderPreButtonContent = () => {
    if (isTrialFlowEnabled) {
      return freeTrialFormIntro({
        trialEmail,
        trialSubmitError,
        trialSubmitSuccess,
        onEmailChange: (value: string) => {
          setTrialEmail(value);

          if (trialSubmitError) {
            setTrialSubmitError('');
          }

          if (trialSubmitSuccess) {
            setTrialSubmitSuccess('');
          }
        },
        onEnterPress: (nextUtmMedium?: string) => {
          void handleClick(nextUtmMedium);
        },
        utm_medium,
      });
    }

    if (typeof preButtonContent === 'function') {
      return preButtonContent(utm_medium);
    }

    return preButtonContent;
  };

  const renderErrorMessage = () => {
    if (errorMessage) {
      return (
        <Box
          sx={{
            backgroundColor: '#f9f2f4',
            padding: '8px 12px',
            borderRadius: '6px',
            display: 'inline-block',
            marginTop: '16px',
            width: '93%',
          }}
        >
          <Typography
            variant={'body2'}
            color={'#c7254e'}
            sx={{
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              display: '-webkit-box',
              WebkitLineClamp: 5,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontWeight: 600,
            }}
          >
            {`Error: ${errorMessage}`}
          </Typography>
        </Box>
      );
    }

    return null;
  };

  return (
    <Box className={'alert'}>
      <Box sx={{display: 'flex', justifyContent: 'center'}}>{image}</Box>
      {renderErrorMessage()}
      {title && (
        <Typography
          variant={'h6'}
          component={'div'}
          sx={{
            color: 'black',
            fontWeight: 600,
            fontSize: '1.2rem',
            lineHeight: 1.4,
            textAlign: 'center',
            padding: '20px 8px 0',
            fontFamily: 'inherit',
          }}
        >
          {title}
        </Typography>
      )}
      <Typography
        variant={'h6'}
        component={'div'}
        sx={{
          color: 'black',
          fontWeight: 400,
          fontSize: '1rem',
          lineHeight: 1.4,
          gap: 1,
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'left',
          padding: title ? '12px 8px 25px' : '25px 8px',
          fontFamily: 'inherit',
          whiteSpace: 'pre-line',
        }}
      >
        {description}
      </Typography>
      {renderPreButtonContent()}
      <Box
        sx={{display: 'flex', justifyContent: 'center', marginBottom: '10px'}}
      >
        <Button
          onClick={() => {
            void handleClick(utm_medium);
          }}
          disabled={isSubmittingTrial}
          style={{
            background: backgroundColor,
            width: width,
            color: 'white',
            padding: '6px 40px',
            fontSize: 'large',
            boxShadow: 'unset',
            fontWeight: 600,
            fontFamily: 'inherit',
          }}
        >
          {isSubmittingTrial ? (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>SUBMITTING...</span>
            </span>
          ) : (
            label
          )}
        </Button>
      </Box>
      <div>{renderAdditionalText()}</div>
    </Box>
  );
};

export {Alert};
