import {Grid} from '@mui/material';
import {
  ColorControl,
  NumberControl,
  SelectControl,
  SliderControl,
  SwitchControl,
} from 'components/controls';
import {useTemplates} from 'contexts';
import {Section} from 'core-components';
import {
  GalleryType,
  SliderNavigation,
  SliderNavigationOptions,
  SliderNavigationPositionOptions,
} from 'data-structures';
import {ReactElement, useMemo} from 'react';
import {useSettings} from '../..';
import {Filter} from '../../Filter';

interface IControlsSectionProps {
  onProFeatureClick: (utmMedium: string) => void;
  isLoading: boolean;
  isPro: boolean;
}

const ControlsSection = ({
  onProFeatureClick,
  isLoading,
  isPro,
}: IControlsSectionProps): ReactElement | null => {
  const {resetTemplate} = useTemplates();
  const {
    type,
    slideshowSettings,
    changeSlideshowSettings,
    cubeSettings,
    changeCubeSettings,
    carouselSettings,
    changeCarouselSettings,
    cardsSettings,
    changeCardsSettings,
    coverflowSettings,
    changeCoverflowSettings,
  } = useSettings();

  const sliderNavigationSettings = useMemo(() => {
    switch (type) {
      case GalleryType.SLIDESHOW:
        return {
          settings: slideshowSettings,
          onChange: changeSlideshowSettings,
        };
      case GalleryType.CUBE:
        return {
          settings: cubeSettings,
          onChange: changeCubeSettings,
        };
      case GalleryType.CAROUSEL:
        return {
          settings: carouselSettings,
          onChange: changeCarouselSettings,
        };
      case GalleryType.CARDS:
        return {
          settings: cardsSettings,
          onChange: changeCardsSettings,
        };
      case GalleryType.COVERFLOW:
        return {
          settings: coverflowSettings,
          onChange: changeCoverflowSettings,
        };
      default:
        return null;
    }
  }, [
    cardsSettings,
    carouselSettings,
    changeCardsSettings,
    changeCarouselSettings,
    changeCoverflowSettings,
    changeCubeSettings,
    changeSlideshowSettings,
    coverflowSettings,
    cubeSettings,
    slideshowSettings,
    type,
  ]);

  if (!sliderNavigationSettings?.settings) {
    return null;
  }

  const onSliderNavigationChange = (inputValue: any, key?: string) => {
    if (
      !sliderNavigationSettings?.settings ||
      !sliderNavigationSettings.onChange
    ) {
      return;
    }

    resetTemplate?.();
    key &&
      sliderNavigationSettings.onChange({
        ...sliderNavigationSettings.settings,
        [key]: inputValue,
      } as any);
  };

  if (type === GalleryType.SLIDESHOW) {
    const {isSlideshowAllowed, autoplay, slideDuration, isInfinite} =
      sliderNavigationSettings.settings as any;

    return (
      <Section
        header={'Controls'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'isSlideshowAllowed'}
                name={'Play / Pause button'}
                value={isSlideshowAllowed}
                onChange={onSliderNavigationChange}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'autoplay'}
                name={'Autoplay'}
                value={autoplay}
                onChange={onSliderNavigationChange}
              />
            </Filter>
            {autoplay || isSlideshowAllowed ? (
              <Filter isLoading={isLoading}>
                <NumberControl
                  id={'slideDuration'}
                  name={'Autoplay speed'}
                  value={slideDuration}
                  onChange={onSliderNavigationChange}
                  min={700}
                  unit={'ms'}
                />
              </Filter>
            ) : null}
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'isInfinite'}
                name={'Loop'}
                value={isInfinite}
                pro={true}
                onChange={
                  isPro
                    ? onSliderNavigationChange
                    : () => onProFeatureClick('slideshow_loop')
                }
              />
            </Filter>
          </Grid>
        }
      />
    );
  }

  if (
    type === GalleryType.CUBE ||
    type === GalleryType.CAROUSEL ||
    type === GalleryType.CARDS ||
    type === GalleryType.COVERFLOW
  ) {
    const {
      navigation: sliderNavigation,
      arrowsSize,
      arrowsColor,
      dotsPosition,
      dotsSize,
      dotsGap,
      activeDotColor,
      inactiveDotsColor,
      autoplay,
      slideDuration,
      playAndPauseAllowed,
      showVideoCover,
      showVideoControls,
      isInfinite,
    } = sliderNavigationSettings.settings as any;

    const playPauseUtmMedium =
      type === GalleryType.COVERFLOW
        ? 'coverflow_play_pause_button'
        : 'carousel_play_pause_button';
    const videoControlsUtmMedium =
      type === GalleryType.CARDS
        ? 'cards_video_controls'
        : type === GalleryType.COVERFLOW
        ? 'coverflow_video_controls'
        : 'carousel_video_controls';

    return (
      <Section
        header={'Controls'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'autoplay'}
                name={'Autoplay'}
                value={autoplay}
                onChange={onSliderNavigationChange}
              />
            </Filter>
            {autoplay ? (
              <Filter isLoading={isLoading}>
                <NumberControl
                  id={'slideDuration'}
                  name={'Autoplay speed'}
                  value={slideDuration}
                  onChange={onSliderNavigationChange}
                  min={2000}
                  unit={'ms'}
                />
              </Filter>
            ) : null}
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'playAndPauseAllowed'}
                name={'Show Play / Pause button'}
                value={playAndPauseAllowed}
                pro={true}
                onChange={
                  isPro
                    ? onSliderNavigationChange
                    : () => onProFeatureClick(playPauseUtmMedium)
                }
              />
            </Filter>
            {!showVideoCover ? (
              <Filter isLoading={isLoading}>
                <SwitchControl
                  id={'showVideoControls'}
                  name={'Show video controls'}
                  value={showVideoControls}
                  pro={true}
                  onChange={
                    isPro
                      ? onSliderNavigationChange
                      : () => onProFeatureClick(videoControlsUtmMedium)
                  }
                />
              </Filter>
            ) : null}
            {type === GalleryType.CUBE ? (
              <Filter isLoading={isLoading}>
                <SwitchControl
                  id={'isInfinite'}
                  name={'Loop'}
                  value={isInfinite}
                  pro={true}
                  onChange={
                    isPro
                      ? onSliderNavigationChange
                      : () => onProFeatureClick('cube_loop')
                  }
                />
              </Filter>
            ) : null}
            <Grid
              sx={{marginLeft: 0, paddingTop: 2}}
              container
              columns={24}
              rowSpacing={2}
              columnSpacing={4}
            >
              <Filter isLoading={isLoading}>
                <SelectControl
                  id={'navigation'}
                  name={'Navigation type'}
                  value={sliderNavigation}
                  options={SliderNavigationOptions}
                  onChange={onSliderNavigationChange}
                />
              </Filter>
            </Grid>
            {(sliderNavigation === SliderNavigation.ARROWS ||
              sliderNavigation === SliderNavigation.ARROWS_AND_DOTS) && (
              <Grid
                sx={{marginLeft: 0, paddingTop: 2}}
                container
                columns={24}
                rowSpacing={2}
                columnSpacing={4}
              >
                <Filter isLoading={isLoading}>
                  <SliderControl
                    id={'arrowsSize'}
                    name="Arrows size (px)"
                    min={0}
                    max={100}
                    value={arrowsSize}
                    pro={true}
                    onChange={
                      isPro
                        ? onSliderNavigationChange
                        : () => onProFeatureClick('dots_color')
                    }
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id={'arrowsColor'}
                    name={'Arrows color'}
                    value={arrowsColor}
                    pro={true}
                    onChange={
                      isPro
                        ? onSliderNavigationChange
                        : () => onProFeatureClick('arrows_color')
                    }
                  />
                </Filter>
              </Grid>
            )}
            {(sliderNavigation === SliderNavigation.DOTS ||
              sliderNavigation === SliderNavigation.ARROWS_AND_DOTS) && (
              <Grid
                sx={{marginLeft: 0, paddingTop: 2}}
                container
                columns={24}
                rowSpacing={2}
                columnSpacing={4}
              >
                <Filter isLoading={isLoading}>
                  <SelectControl
                    id={'dotsPosition'}
                    name={'Dots position'}
                    value={dotsPosition}
                    options={SliderNavigationPositionOptions}
                    onChange={onSliderNavigationChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SliderControl
                    id={'dotsSize'}
                    name="Dots size (px)"
                    min={0}
                    max={100}
                    value={dotsSize}
                    pro={true}
                    onChange={
                      isPro
                        ? onSliderNavigationChange
                        : () => onProFeatureClick('dots_size')
                    }
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SliderControl
                    id={'dotsGap'}
                    name="Dots gap (px)"
                    min={0}
                    max={50}
                    value={dotsGap}
                    pro={true}
                    onChange={
                      isPro
                        ? onSliderNavigationChange
                        : () => onProFeatureClick('dots_gap')
                    }
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id={'activeDotColor'}
                    name={'Active dot color'}
                    value={activeDotColor}
                    pro={true}
                    onChange={
                      isPro
                        ? onSliderNavigationChange
                        : () => onProFeatureClick('active_dot_color')
                    }
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id={'inactiveDotsColor'}
                    name={'Inactive dots color'}
                    value={inactiveDotsColor}
                    pro={true}
                    onChange={
                      isPro
                        ? onSliderNavigationChange
                        : () => onProFeatureClick('inactive_dots_color')
                    }
                  />
                </Filter>
              </Grid>
            )}
          </Grid>
        }
      />
    );
  }

  return null;
};

export {ControlsSection};
