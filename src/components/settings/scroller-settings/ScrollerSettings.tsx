import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
import {NumberControl, SliderControl, SwitchControl} from 'components/controls';
import {useTemplates} from 'contexts';
import {Section} from 'core-components/section';
import {IScrollerSettings} from 'data-structures';
import {Filter} from '../Filter';

interface IScrollerSettingsProps {
  settings: IScrollerSettings;
  onSettingsChange: (settings: IScrollerSettings) => void;
  isLoading: boolean;
  onProFeatureClick: (feature: string) => void;
}

const ScrollerSettings = ({
  settings,
  onSettingsChange,
  isLoading,
}: IScrollerSettingsProps) => {
  const {resetTemplate} = useTemplates();
  const {height, equalHeight, imagesCount} = settings;

  const onInputValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();
    key && onSettingsChange({...settings, [key]: inputValue});
  };

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      <Section
        header={'Layout Settings'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SliderControl
                id={'height'}
                name={'Height (px)'}
                value={height}
                onChange={onInputValueChange}
                min={50}
                max={800}
                step={10}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'equalHeight'}
                name={'Equal height'}
                value={equalHeight}
                onChange={onInputValueChange}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <NumberControl
                id={'imagesCount'}
                name={'Images count'}
                value={imagesCount || 1}
                onChange={onInputValueChange}
                min={1}
                step={1}
              />
            </Filter>
            <ClickActionSettings isLoading={isLoading} />
          </Grid>
        }
      />
    </Paper>
  );
};

export {ScrollerSettings};
