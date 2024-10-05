import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {NumberControl, SliderControl, SwitchControl} from 'components/controls';
import {useSettings} from 'components/settings';
import {useTemplates} from 'contexts/TemplatesContext';
import {Section} from 'core-components';
import {ICardsSettings} from 'data-structures';
import React, {ReactNode} from 'react';
import {Filter} from '../settings/Filter';

interface ICardsSettingProps {
  isLoading?: boolean;
}

const CardsSettings: React.FC<ICardsSettingProps> = ({isLoading}) => {
  const {resetTemplate} = useTemplates();
  const {cardsSettings: value, changeCardsSettings: onChange} = useSettings();
  const {
    width,
    height,
    autoplay,
    slideDuration,
    playAndPauseAllowed,
    perSlideOffset,
    navigationButton,
  } = value as ICardsSettings;

  const onInputValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();
    key && onChange({...value, [key]: inputValue});
  };

  const renderMainSettings = (): ReactNode => {
    return (
      <Section
        header={'Basic'}
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
                onChange={onInputValueChange}
                min={2}
                max={40}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'navigationButton'}
                name={'Navigation'}
                value={navigationButton}
                onChange={onInputValueChange}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'playAndPauseAllowed'}
                name={'Play / Pause'}
                value={playAndPauseAllowed}
                onChange={onInputValueChange}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'autoplay'}
                name={'Autoplay'}
                value={autoplay}
                onChange={onInputValueChange}
              />
            </Filter>
            {autoplay && (
              <Filter isLoading={isLoading}>
                <NumberControl
                  id={'slideDuration'}
                  name={'Time interval'}
                  value={slideDuration}
                  onChange={onInputValueChange}
                  min={2000}
                  unit={'ms'}
                />
              </Filter>
            )}
          </Grid>
        }
      />
    );
  };

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      {renderMainSettings()}
    </Paper>
  );
};

export {CardsSettings};
