import {ISelectOption} from 'components/controls';
import {Align, Aligner} from 'core-components';
import {GalleryType, GalleryTypeOptions} from 'data-structures';
import React from 'react';
import {TypeOption} from './TypeOption';
import {TypePanelSelect} from './TypePanelSelect';
import {useSettings} from './useSettings';
import useIsMobile from "hooks/useIsMobile";

interface ITypePanelBodyProps {
  isLoading: boolean;
  onChange: (type: GalleryType) => void;
}

const TypePanelBody: React.FC<ITypePanelBodyProps> = ({
  isLoading,
  onChange,
}) => {
  const {type} = useSettings();
  const isMobile = useIsMobile(720);

  if (!type) return null;

  return isMobile ? (
    <TypePanelSelect value={type} onChange={onChange} />
  ) : (
    <Aligner align={Align.START} style={{margin: '10px 10px 0'}}>
      {GalleryTypeOptions.map(({value, title}: ISelectOption) => {
        return (
          <TypeOption
            key={title}
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
