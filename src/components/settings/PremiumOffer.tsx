import {Box, Typography} from '@mui/material';

const PremiumOffer = () => {
  return (
    <Box
      sx={{
        p: 2,
        // textAlign: 'center',
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" component="div" sx={{fontWeight: 'bold'}}>
        Unlock our premium templates for just{' '}
        <span style={{fontWeight: 'bold'}}>$15/year!</span>
      </Typography>
      <Typography variant="body1" sx={{mt: 1, whiteSpace: 'pre-line'}}>
        Access ALL current templates and enjoy free updates with new designs.
        {'\n'}Hurry up! The offer ends soon! Email us at{' '}
        <a
          href="mailto:regalleryteam@gmail.com"
          style={{textDecoration: 'none', color: '#007BFF', fontWeight: 'bold'}}
        >
          regalleryteam@gmail.com
        </a>{' '}
        with the subject{' '}
        <span style={{fontWeight: 'bold'}}>"Early Bird ReGallery"</span> to get
        started.
      </Typography>
    </Box>
  );
};

export {PremiumOffer};
