import {Box, Link, Typography} from '@mui/material';
import birdImage from './early-bird.png';

const PremiumOffer = () => {
  return (
    <Box
      sx={{
        maxWidth: 700,
        p: 3,
        backgroundColor: '#fef7f3',
        borderRadius: 3,
        border: '1px solid #ffdca1',
        boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
        margin: '0 auto',
      }}
    >
      <Typography
        variant="h4"
        component="div"
        sx={{
          color: '#00b8d4',
          fontWeight: 'bold',
          mb: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <span style={{fontSize: '2rem'}}>✨</span> Early Bird Offer!
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          mb: 1,
        }}
      >
        Unlock our{' '}
        <span style={{color: '#ff7e79', fontWeight: 'bold'}}>
          premium templates
        </span>{' '}
        for just <span style={{fontWeight: 'bold'}}>$15/year!</span>
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{flex: 1, pr: 3, mb: 2}}>
          <Typography
            variant="body1"
            sx={{color: '#666', lineHeight: 1.8, mb: 2}}
          >
            Access ALL current templates and enjoy free updates with new
            designs.
            <br />
            Hurry up! The offer ends soon!
          </Typography>
          <Typography variant="body1" sx={{color: '#666'}}>
            Email us at{' '}
            <Link
              href="mailto:regalleryteam@gmail.com"
              sx={{
                textDecoration: 'none',
                fontWeight: 'bold',
                color: '#00b8d4',
              }}
            >
              regalleryteam@gmail.com
            </Link>{' '}
            with the subject{' '}
            <span style={{fontWeight: 'bold', color: '#ff7e79'}}>
              Early Bird ReGallery
            </span>{' '}
            to get started.
          </Typography>
        </Box>
        <Box
          component="img"
          src={birdImage}
          alt="Bird Illustration"
          sx={{
            width: '35%',
            height: 'auto',
            flexShrink: 0,
            objectFit: 'contain',
            maxHeight: '200px',
            marginTop: {xs: 1, sm: 0},
          }}
        />
      </Box>
    </Box>
  );
};

export {PremiumOffer};
