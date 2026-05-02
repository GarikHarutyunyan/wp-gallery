import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useTemplates} from 'contexts';
import {usePro} from 'contexts/ProContext';
import {Section} from 'core-components/section';
import {
  ISlideshowSettings,
  LightboxImageAnimation,
  LightboxImageAnimationOptions,
} from 'data-structures';
import {ColorControl, SelectControl, SliderControl} from '../../controls';
import {Filter} from '../Filter';

interface ISlideshowAppearanceSettingsProps {
  settings: ISlideshowSettings;
  onSettingsChange: (settings: ISlideshowSettings) => void;
  isLoading: boolean;
  onProFeatureClick: (feature: string) => void;
}

const SlideshowAppearanceSettings = ({
  settings,
  onSettingsChange,
  isLoading,
  onProFeatureClick,
}: ISlideshowAppearanceSettingsProps) => {
  const {resetTemplate} = useTemplates();
  const {imageAnimation, padding, backgroundColor} = settings;

  const onInputValueChange = (inputValue: unknown, key?: string) => {
    resetTemplate?.();
    key && onSettingsChange({...settings, [key]: inputValue});
  };

  const {isPro} = usePro();

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      <Section
        header={'Container'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'imageAnimation'}
                name={'Animation'}
                pro={true}
                value={imageAnimation}
                options={LightboxImageAnimationOptions.filter(
                  (option) => option.value !== LightboxImageAnimation.SLIDEV
                )}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () => onProFeatureClick('animation')
                }
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SliderControl
                id={'padding'}
                name="Padding (px)"
                min={0}
                max={300}
                value={padding}
                onChange={onInputValueChange}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <ColorControl
                id={'backgroundColor'}
                name="Background color"
                value={backgroundColor}
                onChange={onInputValueChange}
              />
            </Filter>
          </Grid>
        }
      />
    </Paper>
  );
};

export {SlideshowAppearanceSettings};
