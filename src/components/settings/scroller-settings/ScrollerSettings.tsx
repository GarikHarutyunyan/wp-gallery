import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
import {NumberControl, SwitchControl} from 'components/controls';
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
  const {height, equalHeight, width, equalWidth, rowCount} = settings;

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
            <Grid
              sx={{marginLeft: 0, paddingTop: 2}}
              container
              columns={24}
              rowSpacing={2}
              columnSpacing={4}
            >
              <Filter isLoading={isLoading}>
                <NumberControl
                  id={'width'}
                  name={'Width (px)'}
                  value={width}
                  onChange={onInputValueChange}
                  tooltip={
                    <p>
                      Sets the maximum media width used by the scroller layout.
                    </p>
                  }
                />
              </Filter>
              <Filter isLoading={isLoading}>
                <NumberControl
                  id={'height'}
                  name={'Height (px)'}
                  value={height}
                  onChange={onInputValueChange}
                  tooltip={
                    <p>Sets the maximum row height for scroller items.</p>
                  }
                />
              </Filter>
              <Filter isLoading={isLoading}>
                <NumberControl
                  id={'rowCount'}
                  name={'Rows'}
                  value={rowCount}
                  onChange={onInputValueChange}
                  min={1}
                  max={6}
                  step={1}
                  tooltip={
                    <p>
                      Available images are automatically divided between rows,
                      and adjacent rows scroll in opposite directions.
                    </p>
                  }
                />
              </Filter>
            </Grid>
            <Grid
              sx={{marginLeft: 0, paddingTop: 2}}
              container
              columns={24}
              rowSpacing={2}
              columnSpacing={4}
            >
              <Filter isLoading={isLoading}>
                <SwitchControl
                  id={'equalWidth'}
                  name={'Equal width'}
                  value={equalWidth}
                  onChange={onInputValueChange}
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
            </Grid>
            <ClickActionSettings isLoading={isLoading} />
          </Grid>
        }
      />
    </Paper>
  );
};

export {ScrollerSettings};
