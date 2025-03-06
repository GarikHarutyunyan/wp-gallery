import {Section} from 'core-components/section';
import {TypePanelBody} from './TypePanelBody';
import {TypePanelHeader} from './TypePanelHeader';

interface ITypePanelProps {
  onTypeChange: any;
}

const TypePanel = ({onTypeChange}: ITypePanelProps) => {
  return (
    <Section
      header={<TypePanelHeader />}
      body={<TypePanelBody onChange={onTypeChange} />}
      outlined={false}
      className={'reacg-settings'}
    />
  );
};

export {TypePanel};
