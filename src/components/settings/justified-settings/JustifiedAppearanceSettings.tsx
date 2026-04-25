import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useTemplates} from 'contexts';
import {usePro} from 'contexts/ProContext';
import {Section} from 'core-components/section';
import {HoverEffectOptions, IJustifiedSettings} from 'data-structures';
import {
  ColorControl,
  SelectControl,
  SliderControl,
  SwitchControl,
} from '../../controls';
import {Filter} from '../Filter';

interface IJustifiedAppearanceSettingsProps {
  settings: IJustifiedSettings;
  onSettingsChange: (settings: IJustifiedSettings) => void;
  isLoading: boolean;
}

const JustifiedAppearanceSettings = ({
  settings,
  onSettingsChange,
  isLoading,
}: IJustifiedAppearanceSettingsProps) => {
  const {resetTemplate} = useTemplates();
  const {
    gap,
    backgroundColor,
    containerPadding,
    padding,
    paddingColor,
    borderRadius,
    hoverEffect,
    showVideoCover,
  } = settings;

  const onInputValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();
    key && onSettingsChange?.({...settings, [key]: inputValue});
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
              <ColorControl
                id={'backgroundColor'}
                name={'Background color'}
                value={backgroundColor}
                onChange={onInputValueChange}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SliderControl
                id={'containerPadding'}
                name="Padding (px)"
                min={0}
                max={100}
                value={containerPadding}
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
              <SliderControl
                id={'gap'}
                name={'Spacing (px)'}
                value={gap}
                min={0}
                max={100}
                onChange={onInputValueChange}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SliderControl
                id={'padding'}
                name="Border (px)"
                min={0}
                max={100}
                value={padding}
                pro={true}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'image_border',
                        })
                }
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <ColorControl
                id={'paddingColor'}
                name="Border color"
                value={paddingColor}
                pro={true}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'image_border_color',
                        })
                }
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SliderControl
                id={'borderRadius'}
                name="Border radius (px)"
                min={0}
                value={borderRadius}
                max={50}
                onChange={onInputValueChange}
              />
            </Filter>
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

export {JustifiedAppearanceSettings};
