import {Section} from 'core-components/section';
import React from 'react';
import {OptionsPanelBody} from './OptionsPanelBody';
import {OptionsPanelHeader} from './OptionsPanelHeader';
import {TypePanelBody} from './TypePanelBody';
import {TypePanelHeader} from './TypePanelHeader';

interface ISettingsSectionsProps {
  isLoading: boolean;
  onTypeChange: any;
  onSave: any;
  onReset: any;
}

const SettingsSections: React.FC<ISettingsSectionsProps> = ({
  isLoading,
  onTypeChange,
  onSave,
  onReset,
}) => {
  return (
    <>
      <Section
        header={<TypePanelHeader />}
        body={<TypePanelBody onChange={onTypeChange} />}
        outlined={false}
        className={'reacg-settings'}
      />
      <Section
        header={<OptionsPanelHeader />}
        body={
          <OptionsPanelBody
            isLoading={isLoading}
            onSave={onSave}
            onReset={onReset}
          />
        }
        outlined={false}
        className={'reacg-settings'}
      />
    </>
  );
};

export default SettingsSections;
