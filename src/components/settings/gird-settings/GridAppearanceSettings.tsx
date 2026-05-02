import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useTemplates} from 'contexts';
import {usePro} from 'contexts/ProContext';
import {Section} from 'core-components/section/Section';
import {HoverEffectOptions, IThumbnailSettings} from 'data-structures';
import {
  ColorControl,
  SelectControl,
  SliderControl,
  SwitchControl,
} from '../../controls';
import {Filter} from '../Filter';

interface IGridAppearanceSettingsProps {
  settings: IThumbnailSettings;
  onSettingsChange: (settings: IThumbnailSettings) => void;
  onProFeatureClick: (feature: string) => void;
  isLoading?: boolean;
}

const GridAppearanceSettings = ({
  settings,
  onSettingsChange,
  onProFeatureClick,
  isLoading,
}: IGridAppearanceSettingsProps) => {
  const {resetTemplate} = useTemplates();
  const {
    gap,
    itemBorder,
    itemBackgroundColor,
    itemBorderRadius,
    backgroundColor,
    containerPadding,
    padding,
    paddingColor,
    borderRadius,
    hoverEffect,
    showVideoCover,
  } = settings;

  const onInputValueChange = (inputValue: unknown, key?: string) => {
    resetTemplate?.();

    key && onSettingsChange({...settings, [key]: inputValue});
  };

  // TODO: Consider passing isPro as prop
  const {isPro} = usePro();

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      <>
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
          header={'Items'}
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
                  id={'itemBorder'}
                  name="Border (px)"
                  min={0}
                  max={100}
                  value={itemBorder}
                  pro={true}
                  onChange={
                    isPro
                      ? onInputValueChange
                      : () => onProFeatureClick('image_border')
                  }
                />
              </Filter>
              <Filter isLoading={isLoading}>
                <ColorControl
                  id={'itemBackgroundColor'}
                  name="Background color"
                  value={itemBackgroundColor}
                  pro={true}
                  onChange={
                    isPro
                      ? onInputValueChange
                      : () => onProFeatureClick('item_background_color')
                  }
                />
              </Filter>
              <Filter isLoading={isLoading}>
                <SliderControl
                  id={'itemBorderRadius'}
                  name="Border radius (%)"
                  min={0}
                  value={itemBorderRadius}
                  max={50}
                  pro={true}
                  onChange={
                    isPro
                      ? onInputValueChange
                      : () => onProFeatureClick('image_border_radius')
                  }
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
                      onProFeatureClick('hoverEffect');
                    } else {
                      onInputValueChange(inputValue, 'hoverEffect');
                    }
                  }}
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
                      : () => onProFeatureClick('image_border')
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
                      : () => onProFeatureClick('image_border_color')
                  }
                />
              </Filter>
              <Filter isLoading={isLoading}>
                <SliderControl
                  id={'borderRadius'}
                  name="Border radius (%)"
                  min={0}
                  value={borderRadius}
                  max={50}
                  onChange={onInputValueChange}
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
      </>
    </Paper>
  );
};

export {GridAppearanceSettings};
