import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
import {NumberControl} from 'components/controls';
import {useTemplates} from 'contexts';
import {usePro} from 'contexts/ProContext';
import {Section} from 'core-components/section';
import {ICubeSettings} from 'data-structures';
import {Filter} from '../Filter';

interface ICubeSettingsProps {
  settings: ICubeSettings;
  onSettingsChange: (settings: ICubeSettings) => void;
  isLoading: boolean;
}

const CubeSettings = ({
  settings,
  onSettingsChange,
  isLoading,
}: ICubeSettingsProps) => {
  const {resetTemplate} = useTemplates();
  const {width, height, animationSpeed} = settings;

  const onInputValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();
    key && onSettingsChange({...settings, [key]: inputValue});
  };

  const {isPro} = usePro();

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      <Section
        header={'Layout Settings'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <NumberControl
                id={'width'}
                name={'Width'}
                value={width}
                onChange={onInputValueChange}
                min={0}
                unit={'px'}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <NumberControl
                id={'height'}
                name={'Height'}
                value={height}
                onChange={onInputValueChange}
                min={0}
                unit={'px'}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <NumberControl
                id={'animationSpeed'}
                name={'Animation speed'}
                value={animationSpeed}
                pro={true}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'animation_speed',
                        })
                }
                min={100}
                step={100}
                max={1000}
                unit={'ms'}
              />
            </Filter>
            <ClickActionSettings isLoading={isLoading} />
          </Grid>
        }
      />
    </Paper>
  );
};

export {CubeSettings};
