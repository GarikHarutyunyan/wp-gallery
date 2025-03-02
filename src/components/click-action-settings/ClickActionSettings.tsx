import {SelectControl, SwitchControl} from 'components/controls';
import {useSettings} from 'components/settings';
import {Filter} from 'components/settings/Filter';
import {useTemplates} from 'contexts';
import {
  IGeneralSettings,
  ImageClickAction,
  ImageClickActionOptions,
} from 'data-structures';

interface IClickActionSettingsProps {
  isLoading?: boolean;
}

const ClickActionSettings = ({isLoading}: IClickActionSettingsProps) => {
  const {resetTemplate} = useTemplates();
  const {generalSettings, changeGeneralSettings: onActionChange} =
    useSettings();
  const {clickAction, openUrlInNewTab} = generalSettings as IGeneralSettings;

  const isClickActionUrl: boolean = clickAction === ImageClickAction.URL;

  const onActionValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();
    key && onActionChange({...generalSettings, [key]: inputValue});
  };

  return (
    <>
      <Filter isLoading={isLoading}>
        <SelectControl
          id={'clickAction'}
          name={'Image click'}
          value={clickAction}
          options={ImageClickActionOptions}
          onChange={onActionValueChange}
        />
      </Filter>
      {isClickActionUrl ? (
        <Filter isLoading={isLoading}>
          <SwitchControl
            id={'openUrlInNewTab'}
            name={'Open URL in new tab'}
            value={openUrlInNewTab}
            onChange={onActionValueChange}
          />
        </Filter>
      ) : null}
    </>
  );
};

export {ClickActionSettings};
