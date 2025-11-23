import {Align, Aligner} from 'core-components/aligner';
import {GalleryType} from 'data-structures';
import React from 'react';
import {useSettings} from '../useSettings';
import {TypeOption} from './TypeOption';
import {GalleryTypeOptions} from './TypePanel.utils';
import {TypePanelSelect} from './TypePanelSelect';

interface ITypePanelBodyProps {
  isMedium: boolean;
  isSmall: boolean;
  isExtraSmall: boolean;
  onChange: (type: GalleryType) => void;
}

const TypePanelBody: React.FC<ITypePanelBodyProps> = ({
  isMedium,
  isSmall,
  isExtraSmall,
  onChange,
}) => {
  const {type} = useSettings();

  if (!type) return null;

  return isSmall || isExtraSmall ? (
    <TypePanelSelect value={type} onChange={onChange} />
  ) : (
    <Aligner className={'type-option__wrapper'} align={Align.SPACE_AROUND}>
      {GalleryTypeOptions.map(({value, title, image}) => {
        return (
          <TypeOption
            key={title}
            image={image}
            title={title}
            value={value as GalleryType}
            isSelected={type === value}
            onClick={type !== value ? onChange : undefined}
          />
        );
      })}
    </Aligner>
  );
};

export {TypePanelBody};
