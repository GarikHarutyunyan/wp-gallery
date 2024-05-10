import {ISelectOption} from 'components/controls';
import {Align, Aligner} from 'core-components';
import {GalleryType, GalleryTypeOptions} from 'data-structures';
import React from 'react';
import {TypeOption} from './TypeOption';
import {useSettings} from './useSettings';

interface ITypePanelBodyProps {
  isLoading: boolean;
  onChange: (type: GalleryType) => void;
}

const TypePanelBody: React.FC<ITypePanelBodyProps> = ({
  isLoading,
  onChange,
}) => {
  const {type} = useSettings();

  return (
    <Aligner align={Align.START} style={{margin: '10px 10px 0'}}>
      {GalleryTypeOptions.map((option: ISelectOption) => {
        return (
          <TypeOption
            title={option.title}
            value={option.value as GalleryType}
            isSelected={type === option.value}
            onClick={onChange}
          />
        );
      })}
    </Aligner>
  );
};

export {TypePanelBody};

{
  /* <SelectControl
        id={'titlePosition'}
        name={'Title position'}
        value={type}
        options={GalleryTypeOptions}
        onChange={onChange}
        // isDisabled={!isTitlePositionEditable}
      /> */
}
