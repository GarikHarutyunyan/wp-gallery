import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
  ColorControl,
  NumberControl,
  SelectControl,
  SliderControl,
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
    playActivSlideSizes,
    activeSlideHeight,
    activeSlideWidth,
    backgroundColor,
    loop,
    effects,
    autoplay,
    delay,
    playAndPouseAllowed,
    scale,
    imagesCount,
    spaceBetween,
    rotateCard,
    perSlideOffset,
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
                id={'playActivSlideSizes'}
                name={'On ActivSlide Sizes / Off ActivSlide Sizes '}
                value={playActivSlideSizes}
                onChange={onInputValueChange}
              />
            </Filter>

            {playActivSlideSizes && (
              <>
                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'activeSlideHeight'}
                    name={'Height active slide'}
                    value={activeSlideHeight}
                    onChange={onInputValueChange}
                    min={0}
                    unit={'px'}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'activeSlideWidth'}
                    name={'Width active slide'}
                    value={activeSlideWidth}
                    onChange={onInputValueChange}
                    min={0}
                    unit={'px'}
                  />
                </Filter>
              </>
            )}

            <Filter isLoading={isLoading}>
              <ColorControl
                id={'backgroundColor'}
                name={'Background color'}
                value={backgroundColor}
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

            {autoplay && (
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
            )}

            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'playAndPouseAllowed'}
                name={'Play / Pause'}
                value={playAndPouseAllowed}
                onChange={onInputValueChange}
              />
            </Filter>

            {effects === 'coverflow' ? (
              <>
                <Filter isLoading={isLoading}>
                  <SliderControl
                    id={'scale'}
                    name={'Slides scale %'}
                    value={scale}
                    onChange={onInputValueChange}
                    min={0.1}
                    max={2}
                    step={0.1}
                  />
                </Filter>

                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'imagesCount'}
                    name={'Images count'}
                    value={imagesCount}
                    onChange={onInputValueChange}
                    min={1}
                    max={11}
                    unit={'things'}
                  />
                </Filter>

                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'spaceBetween'}
                    name={'Space Between'}
                    value={spaceBetween}
                    onChange={onInputValueChange}
                    min={-Infinity}
                    max={Infinity}
                    unit={'px'}
                  />
                </Filter>
              </>
            ) : effects === 'cards' ? (
              <>
                <Filter isLoading={isLoading}>
                  <SwitchControl
                    id={'rotateCard'}
                    name={'Rotate cards'}
                    value={rotateCard}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SliderControl
                    id={'perSlideOffset'}
                    name={'Per slide off set'}
                    value={perSlideOffset}
                    onChange={onInputValueChange}
                    min={1}
                    max={20}
                  />
                </Filter>
              </>
            ) : (
              <div></div>
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

export {CarouselSettings};
