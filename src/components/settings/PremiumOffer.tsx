import {Box, Link, Typography} from '@mui/material';
import {useAppInfo} from 'contexts';
import './premium-offer.css';

const contentTextStyle = {
  fontWeight: '900',
  fontSize: '1.1rem',
};

const PremiumOffer = () => {
  const {pluginUrl} = useAppInfo();

  const birdImageSource = `${pluginUrl}/assets/images/premium-offer-early-bird.png`;
  const starImageSource = `${pluginUrl}/assets/images/premium-offer-star.png`;

  return (
    <Box className={'premium-offer'}>
      <Typography
        variant={'h3'}
        component={'div'}
        sx={{
          color: '#a5dce9',
          fontWeight: '500',
          fontFamily: 'Lilita One',
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1,
        }}
      >
        <Box
          component={'img'}
          src={starImageSource}
          alt={'Star Illustration'}
          sx={{
            width: 'auto',
            height: '36px',
            flexShrink: 0,
            objectFit: 'contain',
          }}
        />
        <span>{'Early Bird Offer!'}</span>
      </Typography>
      <Typography
        variant={'h6'}
        sx={contentTextStyle}
        mb={1}
        color={'#737373'}
        style={{textShadow: '1px 0 #737373'}}
        fontFamily={'Montserrat'}
      >
        Unlock our{' '}
        <span
          style={{
            ...contentTextStyle,
            textShadow: '1px 0 #f9b7ab',
            color: '#f9b7ab',
          }}
        >
          {'premium templates'}
        </span>{' '}
        for just $15/year!
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{flex: 1}}>
          <Typography
            variant={'h6'}
            sx={contentTextStyle}
            mb={1}
            color={'#737373'}
            style={{textShadow: '1px 0 #737373'}}
            fontFamily={'Montserrat'}
          >
            Access ALL current templates and enjoy free updates with new
            designs.
            <br />
            Hurry up! The offer ends soon!
          </Typography>
          <Typography
            variant={'h6'}
            sx={contentTextStyle}
            color={'#737373'}
            style={{textShadow: '1px 0 #737373'}}
            fontFamily={'Montserrat'}
          >
            Email us at{' '}
            <Link
              href={'mailto:regalleryteam@gmail.com'}
              sx={contentTextStyle}
              className={'premium-offer__link'}
            >
              {'regalleryteam@gmail.com'}
            </Link>{' '}
            with the subject{' '}
            <span
              style={{
                color: '#f9b7ab',
                textShadow: '1px 0 #f9b7ab',
                ...contentTextStyle,
              }}
            >
              {'Early Bird ReGallery'}
            </span>{' '}
            to get started.
          </Typography>
        </Box>
        <Box
          component={'img'}
          src={birdImageSource}
          alt={'Bird Illustration'}
          className={'premium-offer__image'}
        />
      </Box>
    </Box>
  );
};

export {PremiumOffer};
