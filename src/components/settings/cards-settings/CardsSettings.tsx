import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
import {NumberControl, SliderControl} from 'components/controls';
import {useTemplates} from 'contexts';
import {usePro} from 'contexts/ProContext';
import {Section} from 'core-components/section';
import {ICardsSettings} from 'data-structures';
import {Filter} from '../Filter';

interface ICardsSettingsProps {
  settings: ICardsSettings;
  onSettingsChange: (settings: ICardsSettings) => void;
  isLoading: boolean;
  onProFeatureClick: (feature: string) => void;
}

const CardsSettings = ({
  settings,
  onSettingsChange,
  isLoading,
  onProFeatureClick,
}: ICardsSettingsProps) => {
  const {resetTemplate} = useTemplates();
  const {width, height, perSlideOffset, animationSpeed} = settings;

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
              <SliderControl
                id={'perSlideOffset'}
                name={'Per slide offset %'}
                value={perSlideOffset}
                min={2}
                max={40}
                pro={true}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () => onProFeatureClick('cards_per_slide_offset')
                }
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
                    : () => onProFeatureClick('animation_speed')
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

export {CardsSettings};
