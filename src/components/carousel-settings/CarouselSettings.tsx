import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
  ColorControl,
  NumberControl,
  SelectControl,
  SwitchControl,
} from 'components/controls';
import {useSettings} from 'components/settings';
import {Section} from 'core-components';
import {ICarouselSettings} from 'data-structures';
import {CarouselEffectsOptions} from 'data-structures/enum/CarouselEffectType';
import React, {ReactNode} from 'react';
import {Filter} from '../settings/Filter';
interface ICarouselSettingsProps {
  isLoading?: boolean;
}

const CarouselSettings: React.FC<ICarouselSettingsProps> = ({isLoading}) => {
  const {carouselSettings: value, changeCarouselSettings: onChange} =
    useSettings();
  const {
    width,
    height,
    backgroundColor,
    loop,
    pagination,
    effects,
    autoplay,
    delay,
    playAndPouseAllowed,
  } = value as ICarouselSettings;

  const onInputValueChange = (inputValue: any, key?: string) => {
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
              <SwitchControl
                id={'loop'}
                name={'Loop'}
                value={loop}
                onChange={onInputValueChange}
              />
            </Filter>

            <Filter isLoading={isLoading}>
              <ColorControl
                id={'backgroundColor'}
                name={'Background color'}
                value={backgroundColor}
                onChange={onInputValueChange}
              />
            </Filter>

            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'pagination'}
                name={'Pagination'}
                value={pagination}
                onChange={onInputValueChange}
              />
            </Filter>

            <Filter isLoading={isLoading}>
              <SelectControl
                id={'effects'}
                name={'CarouselEffects'}
                value={effects}
                options={CarouselEffectsOptions}
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

            <Filter isLoading={isLoading}>
              <NumberControl
                id={'delay'}
                name={'Play Delay'}
                value={delay}
                onChange={onInputValueChange}
                min={2000}
                unit={'ms'}
              />
            </Filter>

            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'playAndPouseAllowed'}
                name={'Play / Pause'}
                value={playAndPouseAllowed}
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
      {renderMainSettings()}
    </Paper>
  );
};

export {CarouselSettings};
