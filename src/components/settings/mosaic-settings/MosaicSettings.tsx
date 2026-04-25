import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
import {useTemplates} from 'contexts';
import {Section} from 'core-components/section';
import {IMosaicSettings} from 'data-structures';
import {NumberControl, SliderControl} from '../../controls';
import {Filter} from '../Filter';

interface IMosaicSettingsProps {
  settings: IMosaicSettings;
  onSettingsChange: (settings: IMosaicSettings) => void;
  isLoading: boolean;
}

const MosaicSettings = ({
  settings,
  onSettingsChange,
  isLoading,
}: IMosaicSettingsProps) => {
  const {resetTemplate} = useTemplates();
  const {width, columns} = settings;

  const onInputValueChange = (inputValue: unknown, key?: string) => {
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
                id={'columns'}
                name={'Columns'}
                value={columns}
                onChange={onInputValueChange}
                min={1}
              />
            </Filter>
            <ClickActionSettings isLoading={isLoading} />
          </Grid>
        }
      />
    </Paper>
  );
};

export {MosaicSettings};
