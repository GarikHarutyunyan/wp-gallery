import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
import {useTemplates} from 'contexts';
import {Section} from 'core-components/section';
import {IJustifiedSettings} from 'data-structures';
import {NumberControl, SliderControl} from '../../controls';
import {Filter} from '../Filter';

interface IJustifiedSettingsProps {
  settings: IJustifiedSettings;
  onSettingsChange: (settings: IJustifiedSettings) => void;
  isLoading: boolean;
}

const JustifiedSettings = ({
  settings,
  onSettingsChange,
  isLoading,
}: IJustifiedSettingsProps) => {
  const {resetTemplate} = useTemplates();
  const {width, rowHeight} = settings;

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
                id={'width'}
                name="Width (%)"
                min={10}
                max={100}
                value={width}
                onChange={onInputValueChange}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <NumberControl
                id={'rowHeight'}
                name={'Row height'}
                value={rowHeight}
                onChange={onInputValueChange}
                min={0}
                unit={'px'}
              />
            </Filter>
            <ClickActionSettings isLoading={isLoading} />
          </Grid>
        }
      />
    </Paper>
  );
};

export {JustifiedSettings};
