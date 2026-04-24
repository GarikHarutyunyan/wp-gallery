import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
import {
  ColorControl,
  NumberControl,
  SelectControl,
  SliderControl,
  SwitchControl,
} from 'components/controls';
import {useSettings} from 'components/settings';
import {useTemplates} from 'contexts';
import {usePro} from 'contexts/ProContext';
import {Section} from 'core-components/section';
import {HoverEffectOptions, ICoverflowSettings} from 'data-structures';
import React, {ReactNode, useEffect} from 'react';
import {Filter} from '../settings/Filter';

interface ICoverflowSettingsProps {
  isLoading?: boolean;
  sections?: 'all' | 'basic' | 'advanced';
}

const CoverflowSettings: React.FC<ICoverflowSettingsProps> = ({
  isLoading,
  sections = 'all',
}) => {
  const {resetTemplate} = useTemplates();
  const {
    coverflowSettings: value,
    changeCoverflowSettings: onChange,
    imagesCount: allImagesCount,
  } = useSettings();

  const hasSettings = !!value && !!onChange;

  const {
    width,
    height,
    backgroundColor,
    padding,
    rotate,
    imagesCount,
    hoverEffect,
    animationSpeed,
    showVideoCover,
  } = value as ICoverflowSettings;

  const onInputValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();
    if (!hasSettings) {
      return;
    }
    key && onChange({...value, [key]: inputValue});
  };

  useEffect(() => {
    if (!hasSettings) {
      return;
    }

    const normalizedCount = Number(imagesCount) >= 4 ? 4 : 3;

    if (normalizedCount !== imagesCount) {
      onChange({...value, imagesCount: normalizedCount});
    }
  }, [allImagesCount, imagesCount, hasSettings, onChange, value]);

  const showBasic = sections === 'all' || sections === 'basic';
  const showAdvanced = sections === 'all' || sections === 'advanced';

  const {isPro} = usePro();

  if (!hasSettings) {
    return null;
  }

  const renderBasicSettings = (): ReactNode => {
    return (
      <Section
        header={'Basic'}
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
    );
  };

  const renderAdvancedSettings = (): ReactNode => {
    return (
      <Section
        header={'Basic'}
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
              <NumberControl
                id={'padding'}
                name={'Padding'}
                value={padding}
                onChange={onInputValueChange}
                min={0}
                unit={'px'}
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
    );
  };

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      {showBasic ? renderBasicSettings() : null}
      {showAdvanced ? renderAdvancedSettings() : null}
    </Paper>
  );
};

export {CoverflowSettings};
export default CoverflowSettings;
