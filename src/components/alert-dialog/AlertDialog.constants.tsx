import {GalleryType} from 'data-structures';
import {AlertConfig} from './AlertDialog.types';
import {CopyableCode} from './CopyableCode';
import {CustomerService} from './icons/CustomerServiceIcon';
import {LigthBulbIcon} from './icons/LigthBulbIcon';
import {TroubleshoutingIcon} from './icons/TroubleshoutingIcon';
import cardsLayoutScreenshot from './layout-screenshots/cards.webp';
import coverflowLayoutScreenshot from './layout-screenshots/coverflow.webp';
import justifiedLayoutScreenshot from './layout-screenshots/justified.webp';
import scrollerLayoutScreenshot from './layout-screenshots/scroller.webp';

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

export const getTrialDays = () => {
  const days = Number((window as any).reacg_global?.trial_days);

  if (Number.isFinite(days) && days > 0) {
    return days;
  }

  return 7;
};

const openUpgradeUrl = (utm_medium?: string) => {
  const url =
    (window as any).reacg_global?.upgrade?.url ||
    'https://regallery.team/pricing';

  window.open(appendUtmMedium(url, utm_medium), '_blank');
};

const upgradeSecondaryButtonConfig = {
  label: (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{flexShrink: 0}}
      >
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
      </svg>
      UPGRADE
    </>
  ),
  color: '#6c58ff',
  backgroundColor: '#ffffff',
  width: '100%',
  onClick: (utm_medium?: string) => {
    openUpgradeUrl(utm_medium);
  },
};

export const premiumConfig: AlertConfig = {
  description: (
    <>
      <div
        style={{
          fontSize: '0.9rem',
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
          fontSize: '1.5rem',
          fontWeight: 600,
        }}
      >
        Unlock PRO features
      </div>
      <div
        style={{
          color: '#5f6368',
          fontSize: '1rem',
          margin: '0 0 1rem 0',
        }}
      >
        Get all PRO features for{' '}
        <span style={{color: '#8769ff', fontWeight: 600}}>
          less than $2.50/month
        </span>
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
    </>
  ),
  additionalText: (utm_medium?: string) => (
    <center style={{color: '#8769ff', fontSize: '0.9rem'}}>
      <a
        style={{color: '#8769ff'}}
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
        style={{color: '#8769ff'}}
        href={appendUtmMedium(
          (window as any).reacg_global?.compare_plans_url || '',
          utm_medium
        )}
        target="_blank"
      >
        <strong>Compare PRO Features</strong>
      </a>
    </center>
  ),
  buttonConfig: {
    label: (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{flexShrink: 0}}
        >
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
        </svg>
        <span>Upgrade</span>
      </span>
    ),
    backgroundColor: '#6c58ff',
    width: '100%',
    onClick: (utm_medium?: string) => {
      openUpgradeUrl(utm_medium);
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
        'https://regallery.team/pricing';
      window.open(appendUtmMedium(url, utm_medium), '_blank');
    },
  },
};

const layoutPreviewByType: Partial<Record<GalleryType, string>> = {
  [GalleryType.COVERFLOW]: coverflowLayoutScreenshot,
  [GalleryType.JUSTIFIED]: justifiedLayoutScreenshot,
  [GalleryType.CARDS]: cardsLayoutScreenshot,
  [GalleryType.SCROLLER]: scrollerLayoutScreenshot,
};

export const getProLayoutDialogConfig = (
  layoutType: GalleryType
): AlertConfig => {
  return {
    utm_medium: `layout_${layoutType}`,
    description: (
      <>
        <div
          style={{
            fontSize: '0.9rem',
            color: '#8769ff',
            textTransform: 'uppercase',
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          Upgrade Now
        </div>
        <div
          style={{
            color: '#1d2327',
            fontSize: '1.5rem',
            margin: '0.4rem 0',
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          Unlock this PRO layout
        </div>
        <div
          style={{
            color: '#5f6368',
            fontSize: '1rem',
            textAlign: 'center',
            marginBottom: '25px',
          }}
        >
          Get this layout and all PRO features for{' '}
          <div style={{color: '#8769ff', fontWeight: 600}}>
            less than $2.50/month
          </div>
        </div>
        {layoutPreviewByType[layoutType] && (
          <img
            src={layoutPreviewByType[layoutType]}
            alt={`${layoutType} layout preview`}
            style={
              {
                width: '100%',
                display: 'block',
                marginBottom: '15px',
              } as any
            }
          />
        )}
      </>
    ),
    additionalText: (utm_medium?: string) => (
      <center style={{color: '#8769ff', fontSize: '0.9rem'}}>
        <a
          style={{color: '#8769ff'}}
          href={appendUtmMedium(
            (window as any).reacg_global?.layout_urls?.[`${layoutType}`] || '',
            utm_medium
          )}
          target="_blank"
        >
          <strong>View a Demo</strong>
        </a>{' '}
        |{' '}
        <a
          style={{color: '#8769ff'}}
          href={appendUtmMedium(
            (window as any).reacg_global?.compare_plans_url || '',
            utm_medium
          )}
          target="_blank"
        >
          <strong>Compare PRO Features</strong>
        </a>
      </center>
    ),
    buttonConfig: {
      label: (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{flexShrink: 0}}
          >
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
          <span>Upgrade</span>
        </span>
      ),
      backgroundColor: '#6c58ff',
      width: '100%',
      onClick: (utm_medium?: string) => {
        openUpgradeUrl(utm_medium);
      },
    },
  };
};

const startTrialFlow = () => undefined;

type RenderPreButtonContentArgs = {
  preButtonContent?: AlertConfig['preButtonContent'];
  utm_medium?: string;
  trialEmail: string;
  trialSubmitError: string;
  trialSubmitSuccess: string;
  onEmailChange: (value: string) => void;
  onEnterPress: (utm_medium?: string) => void;
};

export const freeTrialFormIntro = ({
  trialEmail,
  trialSubmitError,
  trialSubmitSuccess,
  onEmailChange,
  onEnterPress,
  utm_medium,
}: Omit<RenderPreButtonContentArgs, 'preButtonContent'>) => (
  <>
    <div className="free-trial-intro-banner">
      <span className="free-trial-intro-banner-icon-wrap">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="8" width="18" height="4"></rect>
          <path d="M12 8v11"></path>
          <path d="M19 12v7H5v-7"></path>
          <path d="M12 8H8.5a2.5 2.5 0 1 1 0-5c2 0 3.5 2 3.5 5Z"></path>
          <path d="M12 8h3.5a2.5 2.5 0 1 0 0-5c-2 0-3.5 2-3.5 5Z"></path>
        </svg>
      </span>
      <div>
        <div className="free-trial-intro-banner-title">
          No credit card required
        </div>
        <div className="free-trial-intro-banner-subtitle">
          Try all PRO features risk-free for {getTrialDays()} days.
        </div>
      </div>
    </div>
    <div className="free-trial-email-label">
      Enter your email to get started
    </div>
    <div className="trial-email-input-wrap">
      <svg
        className="trial-email-input-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
      <input
        className="trial-email-input"
        type="email"
        value={trialEmail}
        onChange={(event) => {
          onEmailChange(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            onEnterPress(utm_medium);
          }
        }}
        placeholder="youremail@domain.com"
      />
    </div>
    {trialSubmitError && (
      <div className="free-trial-submit-error">{trialSubmitError}</div>
    )}
    {trialSubmitSuccess && (
      <div className="free-trial-submit-success">{trialSubmitSuccess}</div>
    )}
  </>
);

export const freeTrialConfig: AlertConfig = {
  showFreeTrialForm: true,
  description: (
    <>
      <div className="free-trial-heading-kicker">Start Free Trial</div>
      <div className="free-trial-heading-title">Unlock PRO features</div>
      <div className="free-trial-heading-subtitle">
        with a {`${getTrialDays()}-day`} free trial
      </div>
      <div className="free-trial-heading-description">
        Get full access to all PRO features.
      </div>
      <div>
        <div className="free-trial-feature-item">
          <span className="dashicons dashicons-yes free-trial-feature-icon"></span>
          <span>Pre-Built Templates &amp; Template Library</span>
        </div>
        <div className="free-trial-feature-item">
          <span className="dashicons dashicons-yes free-trial-feature-icon"></span>
          <span>AI Automation for Text &amp; Metadata</span>
        </div>
        <div className="free-trial-feature-item">
          <span className="dashicons dashicons-yes free-trial-feature-icon"></span>
          <span>Branding, Watermarks &amp; White Labeling</span>
        </div>
      </div>
    </>
  ),
  additionalText: (utm_medium?: string) => (
    <center className="free-trial-additional-text">
      <a
        className="free-trial-additional-link"
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
        className="free-trial-additional-link"
        href={appendUtmMedium(
          (window as any).reacg_global?.compare_plans_url || '',
          utm_medium
        )}
        target="_blank"
      >
        <strong>Compare PRO Features</strong>
      </a>
    </center>
  ),
  buttonConfig: {
    label: (
      <span className="free-trial-button-label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="8" width="18" height="4"></rect>
          <path d="M12 8v11"></path>
          <path d="M19 12v7H5v-7"></path>
          <path d="M12 8H8.5a2.5 2.5 0 1 1 0-5c2 0 3.5 2 3.5 5Z"></path>
          <path d="M12 8h3.5a2.5 2.5 0 1 0 0-5c-2 0-3.5 2-3.5 5Z"></path>
        </svg>
        <span>START FREE TRIAL</span>
      </span>
    ),
    backgroundColor: '#8769ff',
    width: '100%',
    onClick: startTrialFlow,
  },
  secondaryButtonConfig: upgradeSecondaryButtonConfig,
  utm_medium: 'free_trial_dialog',
};

export const getFreeTrialLayoutConfig = (
  layoutType: GalleryType
): AlertConfig => {
  return {
    showFreeTrialForm: true,
    utm_medium: `free_trial_layout_${layoutType}`,
    description: (
      <>
        <div
          style={{
            fontSize: '0.9rem',
            color: '#8769ff',
            textTransform: 'uppercase',
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          Start Free Trial
        </div>
        <div
          style={{
            color: '#1d2327',
            fontSize: '1.5rem',
            margin: '0.4rem 0',
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          Unlock this PRO layout
        </div>
        <div
          style={{
            color: '#8769ff',
            fontSize: '1.2rem',
            textAlign: 'center',
            marginBottom: '0.4rem',
            fontWeight: 600,
          }}
        >
          with a {`${getTrialDays()}-day`} free trial
        </div>
        <div
          style={{
            color: '#5f6368',
            fontSize: '0.9rem',
            textAlign: 'center',
            marginBottom: '25px',
          }}
        >
          Get this layout and all PRO features.
        </div>
        {layoutPreviewByType[layoutType] && (
          <img
            src={layoutPreviewByType[layoutType]}
            alt={`${layoutType} layout preview`}
            style={
              {
                width: '80%',
                display: 'block',
                margin: '0 auto',
              } as any
            }
          />
        )}
      </>
    ),
    additionalText: (utm_medium?: string) => (
      <center style={{color: '#8769ff', fontSize: '0.9rem'}}>
        <a
          style={{color: '#8769ff'}}
          href={appendUtmMedium(
            (window as any).reacg_global?.layout_urls?.[`${layoutType}`] || '',
            utm_medium
          )}
          target="_blank"
        >
          <strong>View a Demo</strong>
        </a>{' '}
        |{' '}
        <a
          style={{color: '#8769ff'}}
          href={appendUtmMedium(
            (window as any).reacg_global?.compare_plans_url || '',
            utm_medium
          )}
          target="_blank"
        >
          <strong>Compare PRO Features</strong>
        </a>
      </center>
    ),
    buttonConfig: {
      label: (
        <span className="free-trial-button-label">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="8" width="18" height="4"></rect>
            <path d="M12 8v11"></path>
            <path d="M19 12v7H5v-7"></path>
            <path d="M12 8H8.5a2.5 2.5 0 1 1 0-5c2 0 3.5 2 3.5 5Z"></path>
            <path d="M12 8h3.5a2.5 2.5 0 1 0 0-5c-2 0-3.5 2-3.5 5Z"></path>
          </svg>
          <span>START FREE TRIAL</span>
        </span>
      ),
      backgroundColor: '#8769ff',
      width: '100%',
      onClick: startTrialFlow,
    },
    secondaryButtonConfig: upgradeSecondaryButtonConfig,
  };
};
