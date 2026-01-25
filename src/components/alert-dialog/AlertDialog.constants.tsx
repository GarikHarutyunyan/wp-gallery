import {AlertConfig} from './AlertDialog.types';
import {CustomerService} from './icons/CustomerServiceIcon';
import {LigthBulbIcon} from './icons/LigthBulbIcon';
import {ProIcon} from './icons/ProIcon';
import {SpecialOfferIcon} from './icons/SpecialOfferIcon';
import {TroubleshoutingIcon} from './icons/TroubleshoutingIcon';

export const premiumConfig: AlertConfig = {
  image: (
    <ProIcon
      width={80}
      height={80}
      style={{background: '#d1dae8', borderRadius: '50%', padding: '12px'}}
    />
  ),
  description: (
    <>
      This feature is available with our Pro plans and unlocks advanced options
      designed to help you build more powerful and professional galleries.
      <br />
      <br />
      You can{' '}
      <a href={(window as any).reacg_global?.demo_url || ''} target="_blank">
        <strong>View a Demo</strong>
      </a>{' '}
      to see it in action or{' '}
      <a
        href={(window as any).reacg_global?.compare_plans_url || ''}
        target="_blank"
      >
        <strong>Compare Pro Plans</strong>
      </a>{' '}
      to find the option that works best for you.
    </>
  ),
  buttonConfig: {
    label: (window as any).reacg_global?.upgrade?.text || 'GET STARTED',
    backgroundColor: '#a7c957',
    onClick: (utm_medium?: string) => {
      let url =
        (window as any).reacg_global?.upgrade?.url ||
        'https://regallery.team/#pricing';
      if (utm_medium) {
        const urlQueryStringSeperator: string = url.includes('?') ? '&' : '?';
        utm_medium = urlQueryStringSeperator + 'utm_medium=' + utm_medium;
        if (url.includes('#')) {
          const [base, hash] = url.split('#');
          url = base + utm_medium + '#' + hash;
        } else {
          url = url + utm_medium;
        }
      }
      window.open(url, '_blank');
    },
  },
};

export const needHelpConfig: AlertConfig = {
  image: (
    <CustomerService
      width={80}
      height={80}
      style={{background: '#d1dae8', borderRadius: '50%', padding: '12px'}}
    />
  ),
  description: (
    <>
      Need help? We’re here 24/7. Reach out to us and we’ll get back to you
      promptly.
      <br />
      <br />
      You can also{' '}
      <a href={(window as any).reacg_global?.demo_url || ''} target="_blank">
        <strong>View a Demo</strong>
      </a>{' '}
      to see the features in action, or{' '}
      <a
        href={(window as any).reacg_global?.compare_plans_url || ''}
        target="_blank"
      >
        <strong>Compare Pro Plans</strong>
      </a>{' '}
      to choose the best option for you.
    </>
  ),
  buttonConfig: {
    label: 'CONTACT US',
    backgroundColor: '#2540cc',
    onClick: () => {
      const url = (window as any).reacg_global?.support_url || null;
      if (url) {
        window.open(url, '_blank');
      }
    },
  },
};

export const newHereConfig: AlertConfig = {
  image: (
    <LigthBulbIcon
      width={80}
      height={80}
      style={{background: '#d1dae8', borderRadius: '50%', padding: '12px'}}
    />
  ),
  description: (
    <>
      Need a little help? If things feel unclear, no worries, our team is here
      to guide you step by step.
      <br />
      <br />
      You can also{' '}
      <a href={(window as any).reacg_global?.demo_url || ''} target="_blank">
        <strong>View a Demo</strong>
      </a>{' '}
      to see the features in action, or{' '}
      <a
        href={(window as any).reacg_global?.compare_plans_url || ''}
        target="_blank"
      >
        <strong>Compare Pro Plans</strong>
      </a>{' '}
      to choose the best option for you.
    </>
  ),
  buttonConfig: {
    label: 'CONTACT US',
    backgroundColor: '#2540cc',
    onClick: () => {
      const url = (window as any).reacg_global?.support_url || null;
      if (url) {
        window.open(url, '_blank');
      }
    },
  },
};

export const errorConfig: AlertConfig = {
  image: (
    <TroubleshoutingIcon
      width={80}
      height={80}
      style={{background: '#d1dae8', borderRadius: '50%', padding: '12px'}}
    />
  ),
  description: (
    <>
      Oops! Something went wrong. Just ping us, our support team is available
      24/7 and happy to help.
      <br />
      <br />
      Meanwhile,{' '}
      <a href={(window as any).reacg_global?.demo_url || ''} target="_blank">
        <strong>View a Demo</strong>
      </a>{' '}
      to see the features in action, or{' '}
      <a
        href={(window as any).reacg_global?.compare_plans_url || ''}
        target="_blank"
      >
        <strong>Compare Pro Plans</strong>
      </a>{' '}
      to choose the best option for you.
    </>
  ),
  buttonConfig: {
    label: 'CONTACT US',
    backgroundColor: '#2540cc',
    onClick: () => {
      const url = (window as any).reacg_global?.support_url || null;
      if (url) {
        window.open(url, '_blank');
      }
    },
  },
};
export const specialOfferConfig: AlertConfig = {
  image: <SpecialOfferIcon width={180} height={90} />,
  description: (
    <>
      <i>
        You’re already building great galleries, unlock the Pro tools for less!
      </i>
      <br />
      <br />
      To help you take your galleries further, here’s a special{' '}
      <strong>THANK-YOU OFFER</strong> just for you.
      <br />
      <br />
      <center>
        <strong style={{fontSize: 'x-large'}}>🔥 60% OFF Re Gallery Pro</strong>
      </center>
      <br />
      Use your exclusive{' '}
      <code style={{fontSize: 'large'}}>
        <strong>DISCOUNT60</strong>
      </code>{' '}
      promo code to unlock advanced gallery features and upgrade in seconds.
    </>
  ),
  buttonConfig: {
    label: 'Upgrade to Pro - Save 60%',
    backgroundColor: '#a7c957',
    onClick: (utm_medium?: string) => {
      let url =
        (window as any).reacg_global?.upgrade?.url ||
        'https://regallery.team/#pricing';
      if (utm_medium) {
        const urlQueryStringSeperator: string = url.includes('?') ? '&' : '?';
        utm_medium = urlQueryStringSeperator + 'utm_medium=' + utm_medium;
        if (url.includes('#')) {
          const [base, hash] = url.split('#');
          url = base + utm_medium + '#' + hash;
        } else {
          url = url + utm_medium;
        }
      }
      window.open(url, '_blank');
    },
  },
};
