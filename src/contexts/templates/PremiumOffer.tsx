import {Box, Typography} from '@mui/material';
import {ProIcon} from 'components/settings/ProIcon';
import {Button} from 'core-components/button';
import './premium-offer.css';

const PremiumOffer = () => {
  const onClick = () => {
    window.open('https://regallery.team/#pricing', '_blank');
  };

  return (
    <Box className={'premium-offer'}>
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <ProIcon
          width={100}
          height={100}
          style={{background: '#d1dae8', borderRadius: '50%', padding: '12px'}}
        />
      </Box>
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
        }}
      >
        {'This feature is available as part of the Pro plan'}
      </Typography>
      <Box
        sx={{display: 'flex', justifyContent: 'center', marginBottom: '10px'}}
      >
        <Button
          onClick={onClick}
          style={{
            background: '#a7c957',
            color: 'white',
            padding: '6px 40px',
            fontSize: 'large',
            boxShadow: 'unset',
            fontWeight: 400,
            fontFamily: 'lexend',
          }}
        >
          {'GET STARTED'}
        </Button>
      </Box>
    </Box>
  );
};

export {PremiumOffer};
