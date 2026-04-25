import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
import {NumberControl, SliderControl} from 'components/controls';
import {useTemplates} from 'contexts';
import {usePro} from 'contexts/ProContext';
import {Section} from 'core-components/section';
import {ICoverflowSettings} from 'data-structures';
import {useEffect} from 'react';
import {Filter} from '../Filter';

interface ICoverflowSettingsProps {
  settings: ICoverflowSettings;
  onSettingsChange: (settings: ICoverflowSettings) => void;
  isLoading: boolean;
}

const CoverflowSettings = ({
  settings,
  onSettingsChange,
  isLoading,
}: ICoverflowSettingsProps) => {
  const {resetTemplate} = useTemplates();
  const {width, height, rotate, imagesCount, animationSpeed} = settings;

  const onInputValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();
    key && onSettingsChange({...settings, [key]: inputValue});
  };

  useEffect(() => {
    const normalizedCount = Number(imagesCount) >= 4 ? 4 : 3;
    if (normalizedCount !== imagesCount) {
      onSettingsChange({...settings, imagesCount: normalizedCount});
    }
  }, [imagesCount]);

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
                id={'imagesCount'}
                name={'Images count'}
                tooltip={<p>Coverflow supports only 3 or 4 visible images.</p>}
                value={imagesCount}
                onChange={onInputValueChange}
                min={3}
                max={4}
                step={1}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SliderControl
                id={'rotate'}
                name={'Rotate'}
                value={rotate}
                onChange={onInputValueChange}
                min={0}
                max={50}
                step={1}
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

export {CoverflowSettings};
