import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
  ColorControl,
  NumberControl,
  SliderControl,
  SwitchControl,
} from 'components/controls';
import {useSettings} from 'components/settings';
import {useTemplates} from 'contexts';
import {Section} from 'core-components/section';
import {ICarouselSettings} from 'data-structures';
import React, {ReactNode} from 'react';
import {Filter} from '../settings/Filter';
interface ICarouselSettingsProps {
  isLoading?: boolean;
}

const CarouselSettings: React.FC<ICarouselSettingsProps> = ({isLoading}) => {
  const {resetTemplate} = useTemplates();
  const {
    carouselSettings: value,
    changeCarouselSettings: onChange,
    imagesCount: allImagesCount,
  } = useSettings();
  const {
    width,
    height,
    backgroundColor,
    padding,
    autoplay,
    slideDuration,
    playAndPauseAllowed,
    scale,
    imagesCount,
    spaceBetween,
  } = value as ICarouselSettings;

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
              <NumberControl
                id={'imagesCount'}
                name={'Images count'}
                value={imagesCount}
                onChange={onInputValueChange}
                min={1}
                max={(allImagesCount || 1) - 1}
                step={2}
              />
            </Filter>

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
                id={'spaceBetween'}
                name={'Space between'}
                value={spaceBetween}
                onChange={onInputValueChange}
                min={-Infinity}
                max={Infinity}
                unit={'px'}
              />
            </Filter>

            <>
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
                    min={100}
                    unit={'ms'}
                  />
                </Filter>
              )}
            </>
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
export default CarouselSettings;
