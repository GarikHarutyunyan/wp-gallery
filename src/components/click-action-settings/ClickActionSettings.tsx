import Grid from '@mui/material/Grid';
import {SelectControl, SwitchControl} from 'components/controls';
import {useSettings} from 'components/settings';
import {Filter} from 'components/settings/Filter';
import {useTemplates} from 'contexts';
import {
  IGeneralSettings,
  ImageClickAction,
  ImageClickActionOptions,
} from 'data-structures';
import {ReactElement} from 'react';

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

  const renderClickActionInfo = (): ReactElement => {
    return (
      <>
        <p>
          <b>{'Open Lightbox:'}</b>
          {
            ' Clicking an image opens a lightbox. You can adjust settings in the "Lightbox" tab.'
          }
        </p>
        <p>
          <b>{'Action URL:'}</b>
          {
            ' Clicking an image redirects to a specified URL. The URL must be set by editing each image from "Images" section. '
          }
          <a
            className="seetings__see-more-link"
            href="https://www.youtube.com/watch?v=u_AAWKQuaTA"
            target="_blank"
            rel="noopener noreferrer"
          >
            See more
          </a>
        </p>
      </>
    );
  };

  return (
    <Grid container columns={24} columnSpacing={4} marginTop={2}>
      <Filter isLoading={isLoading}>
        <SelectControl
          id={'clickAction'}
          name={'Image click'}
          info={renderClickActionInfo()}
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
    </Grid>
  );
};

export {ClickActionSettings};
