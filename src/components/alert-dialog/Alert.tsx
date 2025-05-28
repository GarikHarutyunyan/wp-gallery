import {Box, Typography} from '@mui/material';
import {Button} from 'core-components/button';
import {AlertConfig} from './AlertDialog.types';

interface IAlertProps {
  config: AlertConfig;
}

const Alert = ({config}: IAlertProps) => {
  const {image, description, errorMessage, buttonConfig} = config;
  const {label, backgroundColor, onClick} = buttonConfig;

  const handleClick = () => {
    onClick();
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
      <Typography
        variant={'h5'}
        component={'div'}
        sx={{
          color: 'black',
          fontWeight: 600,
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '30px',
          fontFamily: 'lexend',
          whiteSpace: 'pre-line',
        }}
      >
        {description}
      </Typography>
      <Box
        sx={{display: 'flex', justifyContent: 'center', marginBottom: '10px'}}
      >
        <Button
          onClick={handleClick}
          style={{
            background: backgroundColor,
            color: 'white',
            padding: '6px 40px',
            fontSize: 'large',
            boxShadow: 'unset',
            fontWeight: 400,
            fontFamily: 'lexend',
          }}
        >
          {label}
        </Button>
      </Box>
    </Box>
  );
};

export {Alert};
