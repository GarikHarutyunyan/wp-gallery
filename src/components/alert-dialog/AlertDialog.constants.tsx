import {AlertConfig} from './AlertDialog.types';
import {CopyableCode} from './CopyableCode';
import {CustomerService} from './icons/CustomerServiceIcon';
import {LigthBulbIcon} from './icons/LigthBulbIcon';
import {ProIcon} from './icons/ProIcon';
import {TroubleshoutingIcon} from './icons/TroubleshoutingIcon';

const appendUtmMedium = (url: string, utm_medium?: string) => {
  if (!url || !utm_medium) {
    return url;
  }

  const urlQueryStringSeperator: string = url.includes('?') ? '&' : '?';
  const utmQuery = `${urlQueryStringSeperator}utm_medium=${utm_medium}`;

  if (url.includes('#')) {
    const [base, hash] = url.split('#');
    return `${base}${utmQuery}#${hash}`;
  }

  return `${url}${utmQuery}`;
};

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
      const url =
        (window as any).reacg_global?.upgrade?.url ||
        'https://regallery.team/#pricing';
      window.open(appendUtmMedium(url, utm_medium), '_blank');
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
  title: 'Need Help?',
  utm_medium: 'need_help_dialog',
  description:
    'We’re here 24/7. Reach out to us and we’ll get back to you promptly.',
  additionalText: (utm_medium?: string) => (
    <center>
      <a
        style={{color: 'black'}}
        href={appendUtmMedium(
          (window as any).reacg_global?.demo_url || '',
          utm_medium
        )}
        target="_blank"
      >
        <strong>View a Demo</strong>
      </a>{' '}
      |{' '}
      <a
        style={{color: 'black'}}
        href={appendUtmMedium(
          (window as any).reacg_global?.compare_plans_url || '',
          utm_medium
        )}
        target="_blank"
      >
        <strong>See all Features</strong>
      </a>
    </center>
  ),
  buttonConfig: {
    label: 'CONTACT US',
    backgroundColor: '#2540cc',
    width: '70%',
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
  title: 'Need a little help?',
  description:
    'If things feel unclear, no worries, our team is here to guide you step by step.',
  utm_medium: 'new_here_dialog',
  additionalText: (utm_medium?: string) => (
    <center>
      <a
        style={{color: 'black'}}
        href={appendUtmMedium(
          (window as any).reacg_global?.demo_url || '',
          utm_medium
        )}
        target="_blank"
      >
        <strong>View a Demo</strong>
      </a>{' '}
      |{' '}
      <a
        style={{color: 'black'}}
        href={appendUtmMedium(
          (window as any).reacg_global?.compare_plans_url || '',
          utm_medium
        )}
        target="_blank"
      >
        <strong>See all Features</strong>
      </a>
    </center>
  ),
  buttonConfig: {
    label: 'CONTACT US',
    backgroundColor: '#2540cc',
    width: '70%',
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
    </>
  ),
  utm_medium: 'error_dialog',
  additionalText: (utm_medium?: string) => (
    <center>
      <a
        style={{color: 'black'}}
        href={appendUtmMedium(
          (window as any).reacg_global?.demo_url || '',
          utm_medium
        )}
        target="_blank"
      >
        <strong>View a Demo</strong>
      </a>{' '}
      |{' '}
      <a
        style={{color: 'black'}}
        href={appendUtmMedium(
          (window as any).reacg_global?.compare_plans_url || '',
          utm_medium
        )}
        target="_blank"
      >
        <strong>See all Features</strong>
      </a>
    </center>
  ),
  buttonConfig: {
    label: 'CONTACT US',
    backgroundColor: '#2540cc',
    width: '70%',
    onClick: () => {
      const url = (window as any).reacg_global?.support_url || null;
      if (url) {
        window.open(url, '_blank');
      }
    },
  },
};
export const specialOfferConfig: AlertConfig = {
  description: (
    <>
      <div
        style={{
          fontSize: '0.8em',
          color: '#8769ff',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
      >
        Upgrade Now
      </div>
      <div
        style={{
          color: '#1d2327',
          fontSize: '1.5em',
          margin: '0 0 1em 0',
          fontWeight: 600,
        }}
      >
        Unlock PRO features
      </div>
      <div>
        <div style={{margin: '5px 0'}}>
          <span
            className="dashicons dashicons-yes"
            style={{color: '#8769ff', margin: '3px 3px 3px 0'}}
          ></span>
          <span>Pre-Built Templates &amp; Template Library</span>
        </div>
        <div style={{margin: '5px 0'}}>
          <span
            className="dashicons dashicons-yes"
            style={{color: '#8769ff', margin: '3px 3px 3px 0'}}
          ></span>
          <span>AI Automation for Text &amp; Metadata</span>
        </div>
        <div style={{margin: '5px 0'}}>
          <span
            className="dashicons dashicons-yes"
            style={{color: '#8769ff', margin: '3px 3px 3px 0'}}
          ></span>
          <span>Advanced Lightbox Options</span>
        </div>
        <div style={{margin: '5px 0'}}>
          <span
            className="dashicons dashicons-yes"
            style={{color: '#8769ff', margin: '3px 3px 3px 0'}}
          ></span>
          <span>eCommerce &amp; Mixed Galleries</span>
        </div>
        <div style={{margin: '5px 0'}}>
          <span
            className="dashicons dashicons-yes"
            style={{color: '#8769ff', margin: '3px 3px 3px 0'}}
          ></span>
          <span>Branding, Watermarks &amp; White Labeling</span>
        </div>
        <div style={{margin: '5px 0'}}>
          <span
            className="dashicons dashicons-yes"
            style={{color: '#8769ff', margin: '3px 3px 3px 0'}}
          ></span>
          <span>Advanced Customization &amp; Premium Support</span>
        </div>
      </div>
      <div style={{paddingTop: '18px', fontSize: '0.8rem'}}>
        Use code <CopyableCode text="DISCOUNT60" /> to{' '}
        <span
          style={{
            color: '#8769ff',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          get 60% off
        </span>{' '}
        Re Gallery Pro - for a limited time only!
      </div>
    </>
  ),
  additionalText: (utm_medium?: string) => (
    <center>
      <a
        style={{color: 'black'}}
        href={appendUtmMedium(
          (window as any).reacg_global?.demo_url || '',
          utm_medium
        )}
        target="_blank"
      >
        <strong>View a Demo</strong>
      </a>{' '}
      |{' '}
      <a
        style={{color: 'black'}}
        href={appendUtmMedium(
          (window as any).reacg_global?.compare_plans_url || '',
          utm_medium
        )}
        target="_blank"
      >
        <strong>See all Features</strong>
      </a>
    </center>
  ),
  buttonConfig: {
    label: 'Upgrade',
    backgroundColor: '#8769ff',
    width: '100%',
    onClick: (utm_medium?: string) => {
      const url =
        (window as any).reacg_global?.upgrade?.discount_url ||
        'https://regallery.team/#pricing';
      window.open(appendUtmMedium(url, utm_medium), '_blank');
    },
  },
};
