import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
import {NumberControl, SliderControl, SwitchControl} from 'components/controls';
import {useSettings} from 'components/settings';
import {useTemplates} from 'contexts';
import {usePro} from 'contexts/ProContext';
import {Section} from 'core-components/section';
import {ICarouselSettings} from 'data-structures';
import {useEffect} from 'react';
import {Filter} from '../Filter';

interface ICarouselSettingsProps {
  settings: ICarouselSettings;
  onSettingsChange: (settings: ICarouselSettings) => void;
  isLoading: boolean;
}

const CarouselSettings = ({
  settings,
  onSettingsChange,
  isLoading,
}: ICarouselSettingsProps) => {
  const {resetTemplate} = useTemplates();
  const {imagesCount: allImagesCount} = useSettings();
  const {
    width,
    height,
    scale,
    imagesCount,
    enableScrollByImagesCount,
    spaceBetween,
    animationSpeed,
  } = settings;

  const onInputValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();
    key && onSettingsChange({...settings, [key]: inputValue});
  };

  useEffect(() => {
    const totalAvailableImages = allImagesCount ?? 0;
    if (totalAvailableImages !== 0) {
      const count = Math.min(imagesCount, totalAvailableImages);
      if (count !== imagesCount) {
        onSettingsChange({...settings, imagesCount: count});
      }
    }
  }, [allImagesCount, imagesCount]);

  const {isPro} = usePro();

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
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
              <NumberControl
                id={'imagesCount'}
                name={'Images count'}
                value={imagesCount}
                onChange={onInputValueChange}
                min={1}
                max={allImagesCount}
                step={1}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'enableScrollByImagesCount'}
                name={'Scroll by images count'}
                value={enableScrollByImagesCount}
                tooltip={
                  <p>
                    Scrolls by visible images when enabled, otherwise by one.
                  </p>
                }
                pro={true}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'carousel_scroll_by_images_count',
                        })
                }
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
    </Paper>
  );
};

export {CarouselSettings};
