import {AlertConfig} from './AlertDialog.types';
import {CustomerService} from './icons/CustomerServiceIcon';
import {LigthBulbIcon} from './icons/LigthBulbIcon';
import {ProIcon} from './icons/ProIcon';
import {TroubleshoutingIcon} from './icons/TroubleshoutingIcon';

export const premiumConfig: AlertConfig = {
  image: (
    <ProIcon
      width={100}
      height={100}
      style={{background: '#d1dae8', borderRadius: '50%', padding: '12px'}}
    />
  ),
  description: 'This feature is available in the Pro plan',
  buttonConfig: {
    label: 'GET STARTED',
    backgroundColor: '#a7c957',
    onClick: () => {
      window.open('https://regallery.team/#pricing', '_blank');
    },
  },
};

export const needHelpConfig: AlertConfig = {
  image: (
    <CustomerService
      width={100}
      height={100}
      style={{background: '#d1dae8', borderRadius: '50%', padding: '12px'}}
    />
  ),
  description: 'Need help?\n We’re here 24/7! Reach out on the Support Forum.',
  buttonConfig: {
    label: 'CONTACT US',
    backgroundColor: '#2540cc',
    onClick: () => {
      window.open(
        'https://wordpress.org/support/plugin/regallery/#new-topic-0',
        '_blank'
      );
    },
  },
};

export const newHereConfig: AlertConfig = {
  image: (
    <LigthBulbIcon
      width={100}
      height={100}
      style={{background: '#d1dae8', borderRadius: '50%', padding: '12px'}}
    />
  ),
  description: 'New here?\n Contact us for step-by-step help.',
  buttonConfig: {
    label: 'CONTACT US',
    backgroundColor: '#2540cc',
    onClick: () => {
      window.open(
        'https://wordpress.org/support/plugin/regallery/#new-topic-0',
        '_blank'
      );
    },
  },
};

export const errorConfig: AlertConfig = {
  image: (
    <TroubleshoutingIcon
      width={100}
      height={100}
      style={{background: '#d1dae8', borderRadius: '50%', padding: '12px'}}
    />
  ),
  description: 'Something went wrong?\n No worries , we’re here 24/7 to help.',
  buttonConfig: {
    label: 'CONTACT US',
    backgroundColor: '#2540cc',
    onClick: () => {
      window.open(
        'https://wordpress.org/support/plugin/regallery/#new-topic-0',
        '_blank'
      );
    },
  },
};
