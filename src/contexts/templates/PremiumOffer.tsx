import {Box, Typography} from '@mui/material';
import {ProIcon} from 'components/settings/ProIcon';
import {Button} from 'core-components';
import './premium-offer.css';

const contentTextStyle = {
  fontWeight: '500',
  fontSize: '1.1rem',
  letterSpacing: '1.5px',
};

// fontFamily: 'Lilita One',
const PremiumOffer = () => {
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
          fontWeight: '700',
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '30px',
          fontFamily: 'Montserrat',
        }}
      >
        {'This pre-built template is part of our Pro plan.'}
      </Typography>
      <Box
        sx={{display: 'flex', justifyContent: 'center', marginBottom: '10px'}}
      >
        <Button
          href={'https://regallery.team/#pricing'}
          target={'_blank'}
          style={{
            background: '#a7c957',
            color: 'white',
            padding: '6px 40px',
            fontSize: 'large',
            boxShadow: 'unset',
          }}
        >
          {'GET STARTED'}
        </Button>
      </Box>
    </Box>
  );
};

export {PremiumOffer};
