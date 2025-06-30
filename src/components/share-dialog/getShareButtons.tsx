import React from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  GabIcon,
  GabShareButton,
  HatenaIcon,
  HatenaShareButton,
  InstapaperIcon,
  InstapaperShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  LivejournalIcon,
  LivejournalShareButton,
  PinterestIcon,
  PinterestShareButton,
  PocketIcon,
  PocketShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TwitterIcon,
  TwitterShareButton,
  VKIcon,
  VKShareButton,
  WeiboIcon,
  WeiboShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  WorkplaceIcon,
  WorkplaceShareButton,
} from 'react-share';

interface ShareButtonItem {
  component: React.ReactNode;
}

export const getShareButtons = (
  url: string,
  title: string
): ShareButtonItem[] => [
  {
    component: (
      <EmailShareButton url={url} title={title}>
        <EmailIcon size={50} />
      </EmailShareButton>
    ),
  },
  {
    component: (
      <FacebookShareButton url={url} title={title}>
        <FacebookIcon size={50} />
      </FacebookShareButton>
    ),
  },
  {
    component: (
      <TelegramShareButton url={url} title={title}>
        <TelegramIcon size={50} />
      </TelegramShareButton>
    ),
  },
  {
    component: (
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={50} />
      </TwitterShareButton>
    ),
  },
  {
    component: (
      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={50} />
      </WhatsappShareButton>
    ),
  },
  {
    component: (
      <LinkedinShareButton url={url} title={title}>
        <LinkedinIcon size={50} />
      </LinkedinShareButton>
    ),
  },
  {
    component: (
      <LineShareButton url={url} title={title}>
        <LineIcon size={50} />
      </LineShareButton>
    ),
  },
  {
    component: (
      <RedditShareButton url={url} title={title}>
        <RedditIcon size={50} />
      </RedditShareButton>
    ),
  },
  {
    component: (
      <TumblrShareButton url={url} title={title}>
        <TumblrIcon size={50} />
      </TumblrShareButton>
    ),
  },
  {
    component: (
      <PinterestShareButton
        url={url}
        media={'https://yourdomain.com/path-to-image.jpg'}
        title={title}
      >
        <PinterestIcon size={50} />
      </PinterestShareButton>
    ),
  },
  {
    component: (
      <GabShareButton url={url} title={title}>
        <GabIcon size={50} />
      </GabShareButton>
    ),
  },
  {
    component: (
      <HatenaShareButton url={url} title={title}>
        <HatenaIcon size={50} />
      </HatenaShareButton>
    ),
  },
  {
    component: (
      <InstapaperShareButton url={url} title={title}>
        <InstapaperIcon size={50} />
      </InstapaperShareButton>
    ),
  },
  {
    component: (
      <LivejournalShareButton url={url} title={title}>
        <LivejournalIcon size={50} />
      </LivejournalShareButton>
    ),
  },
  {
    component: (
      <PocketShareButton url={url} title={title}>
        <PocketIcon size={50} />
      </PocketShareButton>
    ),
  },
  {
    component: (
      <WorkplaceShareButton url={url} title={title}>
        <WorkplaceIcon size={50} />
      </WorkplaceShareButton>
    ),
  },
  {
    component: (
      <VKShareButton url={url} title={title}>
        <VKIcon size={50} />
      </VKShareButton>
    ),
  },
  {
    component: (
      <WeiboShareButton url={url} title={title}>
        <WeiboIcon size={50} />
      </WeiboShareButton>
    ),
  },
];
