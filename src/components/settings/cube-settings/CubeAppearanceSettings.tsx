import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
  ColorControl,
  SelectControl,
  SliderControl,
  SwitchControl,
} from 'components/controls';
import {useTemplates} from 'contexts';
import {usePro} from 'contexts/ProContext';
import {Section} from 'core-components/section';
import {HoverEffectOptions, ICubeSettings} from 'data-structures';
import {Filter} from '../Filter';

interface ICubeAppearanceSettingsProps {
  settings: ICubeSettings;
  onSettingsChange: (settings: ICubeSettings) => void;
  isLoading: boolean;
}

const CubeAppearanceSettings = ({
  settings,
  onSettingsChange,
  isLoading,
}: ICubeAppearanceSettingsProps) => {
  const {resetTemplate} = useTemplates();
  const {backgroundColor, padding, shadow, hoverEffect, showVideoCover} =
    settings;

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
              <SwitchControl
                id={'shadow'}
                name={'Shadow'}
                value={shadow}
                pro={true}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'cube_shadow',
                        })
                }
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <ColorControl
                id={'backgroundColor'}
                name={'Background color'}
                value={backgroundColor}
                pro={true}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'cube_background_color',
                        })
                }
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SliderControl
                id={'padding'}
                name="Padding (px)"
                min={0}
                max={50}
                value={padding}
                onChange={onInputValueChange}
              />
            </Filter>
          </Grid>
        }
      />
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
                    (window as any).reacg_open_premium_offer_dialog({
                      utm_medium: 'hoverEffect',
                    });
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

export {CubeAppearanceSettings};
