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
    backgroundColor,
    loop,
    pagination,
    effects,
    autoplay,
    delay,
    playAndPouseAllowed,
    slidesDepth,
    rotate,
    modifier,
    scale,
    imagesCount,
    spaceBetween,
    centeredSlides,
    stretch,
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

            {effects === 'coverflow' ? (
              <>
                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'slidesDepth'}
                    name={'Slides Depth'}
                    value={slidesDepth}
                    onChange={onInputValueChange}
                    min={-1000}
                    unit={'px'}
                  />
                </Filter>

                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'modifier'}
                    name={'Slides modifier'}
                    value={modifier}
                    onChange={onInputValueChange}
                    min={0.1}
                    max={4}
                    unit={'%'}
                  />
                </Filter>

                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'rotate'}
                    name={'Slides rotate'}
                    value={rotate}
                    onChange={onInputValueChange}
                    min={1}
                    unit={'%'}
                  />
                </Filter>

                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'scale'}
                    name={'Slides scale'}
                    value={scale}
                    onChange={onInputValueChange}
                    min={0}
                    max={2}
                    unit={'%'}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'imagesCount'}
                    name={'Images count'}
                    value={imagesCount}
                    onChange={onInputValueChange}
                    min={1}
                    max={10}
                    unit={'things'}
                  />
                </Filter>

                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'spaceBetween'}
                    name={'Space Between'}
                    value={spaceBetween}
                    onChange={onInputValueChange}
                    min={0}
                    unit={'px'}
                  />
                </Filter>

                <Filter isLoading={isLoading}>
                  <SwitchControl
                    id={'centeredSlides'}
                    name={'Slides centered'}
                    value={centeredSlides}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'stretch'}
                    name={'Slides stretch'}
                    value={stretch}
                    onChange={onInputValueChange}
                    min={0}
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
