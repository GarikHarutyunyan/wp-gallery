import {Align, Aligner} from 'core-components/aligner';
import {GalleryType} from 'data-structures';
import React from 'react';
import {TemplatesSelect} from '../TemplatesSelect';
import {useSettings} from '../useSettings';
import {TypeOption} from './TypeOption';
import {GalleryTypeOptions} from './TypePanel.utils';
import {TypePanelSelect} from './TypePanelSelect';
import {TemplateImage} from './images/TemplateImage';

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

  return (
    <>
      <div className={'reacg-templates-library-row'}>
        <div className={'reacg-templates-library-row__left'}>
          <div className={'reacg-templates-library-row__icon'}>
            <div className={'reacg-templates-library-row__icon-grid'}>
              <TemplateImage />
            </div>
          </div>
          <div className={'reacg-templates-library-row__description'}>
            <div className={'reacg-templates-library-row__title'}>
              Template Library
            </div>
            <div className={'reacg-templates-library-row__subtitle'}>
              Choose from 50+ ready-made gallery designs.
            </div>
          </div>
        </div>
        <TemplatesSelect />
      </div>
      {isSmall || isExtraSmall ? (
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
      )}
    </>
  );
};

export {TypePanelBody};
