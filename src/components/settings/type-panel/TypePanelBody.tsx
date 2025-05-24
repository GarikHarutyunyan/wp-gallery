import clsx from 'clsx';
import {Align, Aligner} from 'core-components/aligner';
import {GalleryType} from 'data-structures';
import useIsMobile from 'hooks/useIsMobile';
import React from 'react';
import {useSettings} from '../useSettings';
import {TypeOption} from './TypeOption';
import {GalleryTypeOptions} from './TypePanel.utils';

interface ITypePanelBodyProps {
  onChange: (type: GalleryType) => void;
}

const TypePanelBody: React.FC<ITypePanelBodyProps> = ({onChange}) => {
  const {type} = useSettings();
  const isMobile = useIsMobile(720);
  if (!type) return null;

  return (
    <Aligner
      className={clsx('type-option__wrapper', {
        'type-option__wrapper-mobile': isMobile,
      })}
      align={Align.SPACE_AROUND}
    >
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
