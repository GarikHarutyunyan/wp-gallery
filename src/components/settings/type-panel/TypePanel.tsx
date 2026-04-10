import {Section} from 'core-components/section';
import {clsx} from 'yet-another-react-lightbox';
import {TypePanelBody} from './TypePanelBody';

interface ITypePanelProps {
  isMedium: boolean;
  isSmall: boolean;
  isExtraSmall: boolean;
  onTypeChange: any;
}

const TypePanel = ({
  isMedium,
  isSmall,
  isExtraSmall,
  onTypeChange,
}: ITypePanelProps) => {
  return (
    <Section
      body={
        <TypePanelBody
          isMedium={isMedium}
          isSmall={isSmall}
          isExtraSmall={isExtraSmall}
          onChange={onTypeChange}
        />
      }
      outlined={false}
      className={clsx(
        'reacg-settings',
        isMedium ? 'reacg-settings--m' : '',
        isSmall ? 'reacg-settings--s' : '',
        isExtraSmall ? 'reacg-settings--xs' : ''
      )}
    />
  );
};

export {TypePanel};
