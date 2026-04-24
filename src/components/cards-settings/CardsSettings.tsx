import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
import {
  NumberControl,
  SelectControl,
  SliderControl,
  SwitchControl,
} from 'components/controls';
import {useSettings} from 'components/settings';
import {useTemplates} from 'contexts';
import {usePro} from 'contexts/ProContext';
import {Section} from 'core-components/section';
import {HoverEffectOptions, ICardsSettings} from 'data-structures';
import React, {ReactNode} from 'react';
import {Filter} from '../settings/Filter';

interface ICardsSettingProps {
  isLoading?: boolean;
  sections?: 'all' | 'basic' | 'advanced';
}

const CardsSettings: React.FC<ICardsSettingProps> = ({
  isLoading,
  sections = 'all',
}) => {
  const {resetTemplate} = useTemplates();
  const {cardsSettings: value, changeCardsSettings: onChange} = useSettings();
  const {
    width,
    height,
    perSlideOffset,
    hoverEffect,
    animationSpeed,
    showVideoCover,
  } = value as ICardsSettings;

  const onInputValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();
    key && onChange({...value, [key]: inputValue});
  };

  const showBasic = sections === 'all' || sections === 'basic';
  const showAdvanced = sections === 'all' || sections === 'advanced';

  const {isPro} = usePro();

  const renderBasicSettings = (): ReactNode => {
    return (
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
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'cards_per_slide_offset',
                        })
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
    return renderImagesSettings();
  };

  const renderImagesSettings = (): ReactNode => {
    return (
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
    );
  };

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      {showBasic ? renderBasicSettings() : null}
      {showAdvanced ? renderAdvancedSettings() : null}
    </Paper>
  );
};

export {CardsSettings};
