import {Box, Button, Divider, Typography} from '@mui/material';
import React from 'react';
import {getShareButtons} from './getShareButtons';
import {ShareImageConfig} from './ShareDIalog.types';

const ShareImage: React.FC<ShareImageConfig> = ({url, title}) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Regallery',
          text: title,
          url: url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };
  const shareButtons = getShareButtons(url, title);

  return (
    <Box>
      <Box sx={{padding: '16px 24px'}}>
        <Typography variant="h5" mb={2} fontSize={20}>
          Share
        </Typography>
      </Box>
      <Box
        sx={{
          flex: '1 1 auto',
          overflowY: 'auto',
          px: '24px',
          py: '40px',
          pt: 0,
        }}
      >
        <Box
          sx={{
            m: 0,
            color: 'rgba(0, 0, 0, 0.6)',
            textAlign: 'center',
          }}
        >
          <Button
            variant="contained"
            onClick={handleShare}
            sx={{
              fontSize: '16px',
              fontWeight: 500,
              textTransform: 'none',
              padding: '8px 22px;',
            }}
            endIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77l-7.13-4.13a3.02 3.02 0 0 0 0-1.44l7.13-4.13A2.99 2.99 0 1 0 15 5a3.02 3.02 0 0 0 0 .92l-7.13 4.13a3 3 0 1 0 0 4.17l7.13 4.13c-.01.06-.01.12-.01.18a3 3 0 1 0 3-3z" />
              </svg>
            }
          >
            {'Share'}
          </Button>

          <Divider sx={{margin: '20px 0px'}}>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{fontSize: '16px'}}
            >
              {'OR'}
            </Typography>
          </Divider>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 1,
              overflow: 'visible',
            }}
          >
            {shareButtons.map((item, index) => (
              <Box key={index}>{item.component}</Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ShareImage;
