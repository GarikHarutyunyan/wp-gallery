import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {SelectControl, SwitchControl} from 'components/controls';
import {useTemplates} from 'contexts';
import {usePro} from 'contexts/ProContext';
import {Section} from 'core-components/section';
import {HoverEffectOptions, ICardsSettings} from 'data-structures';
import {Filter} from '../Filter';

interface ICardsAppearanceSettingsProps {
  settings: ICardsSettings;
  onSettingsChange: (settings: ICardsSettings) => void;
  isLoading: boolean;
  onProFeatureClick: (feature: string) => void;
}

const CardsAppearanceSettings = ({
  settings,
  onSettingsChange,
  isLoading,
  onProFeatureClick,
}: ICardsAppearanceSettingsProps) => {
  const {resetTemplate} = useTemplates();
  const {hoverEffect, showVideoCover} = settings;

  const onInputValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();
    key && onSettingsChange({...settings, [key]: inputValue});
  };

  const {isPro} = usePro();

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      <Section
        header={'Media'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'hoverEffect'}
                name={'Hover effect'}
                value={hoverEffect}
                options={HoverEffectOptions}
                onChange={(inputValue: any) => {
                  if (
                    !isPro &&
                    HoverEffectOptions.find(
                      (option) => option.value === inputValue
                    )?.isPro
                  ) {
                    onProFeatureClick('hoverEffect');
                  } else {
                    onInputValueChange(inputValue, 'hoverEffect');
                  }
                }}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'showVideoCover'}
                name={'Show video cover'}
                value={showVideoCover}
                tooltip={
                  <p>
                    Enable this to display the cover image for video items,
                    otherwise the video will be shown.
                  </p>
                }
                onChange={onInputValueChange}
              />
            </Filter>
          </Grid>
        }
      />
    </Paper>
  );
};

export {CardsAppearanceSettings};
