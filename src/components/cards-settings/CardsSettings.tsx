import {InputLabel} from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
import {
  ColorControl,
  FontControl,
  NumberControl,
  SelectControl,
  SliderControl,
  SwitchControl,
} from 'components/controls';
import {useSettings} from 'components/settings';
import {useTemplates} from 'contexts';
import {usePro} from 'contexts/ProContext';
import {Section} from 'core-components/section';
import {
  CaptionSourceOptions,
  HoverEffectOptions,
  ICardsSettings,
  SliderNavigation,
  SliderNavigationOptions,
  SliderNavigationPositionOptions,
  ThumbnailTitlePosition,
  ThumbnailTitlePositionOptions,
  TitleAlignmentOptions,
  TitleSourceOptions,
  TitleVisibility,
  TitleVisibilityOptions,
} from 'data-structures';
import React, {ReactNode, useMemo} from 'react';
import {ISelectOption} from '../controls';
import {LabelWithTooltip} from '../controls/LabelWithTooltip';
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
    hoverEffect,
    showTitle,
    titleSource,
    titleVisibility,
    titlePosition,
    titleFontSize,
    titleColor,
    titleAlignment,
    titleFontFamily,
    overlayTextBackground,
    invertTextColor,
    showCaption,
    captionSource,
    captionVisibility,
    captionPosition,
    captionFontSize,
    captionFontColor,
    navigation,
    arrowsSize,
    arrowsColor,
    dotsPosition,
    dotsSize,
    dotsGap,
    activeDotColor,
    inactiveDotsColor,
    showVideoControls,
  } = value as ICardsSettings;

  const onInputValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();
    key && onChange({...value, [key]: inputValue});
  };

  const titlePositionOptions: ISelectOption[] = useMemo(() => {
    let options = [...ThumbnailTitlePositionOptions]; // Copy, never mutate original.

    if (titleVisibility === TitleVisibility.ON_HOVER) {
      // Remove BELOW and ABOVE completely.
      options = options.filter(
        (option) =>
          option.value !== ThumbnailTitlePosition.BELOW &&
          option.value !== ThumbnailTitlePosition.ABOVE
      );

      // If current value is BELOW or ABOVE, replace with fallback.
      if (titlePosition === ThumbnailTitlePosition.BELOW) {
        onChange({
          ...value,
          titlePosition: ThumbnailTitlePosition.BOTTOM,
        });
      }
      if (titlePosition === ThumbnailTitlePosition.ABOVE) {
        onChange({
          ...value,
          titlePosition: ThumbnailTitlePosition.TOP,
        });
      }
    }

    return options;
  }, [titlePosition, titleVisibility, onChange, value]);

  const {isPro} = usePro();

  const renderBasicSettings = (): ReactNode => {
    return (
      <Section
        header={'Basic'}
        body={
          <>
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
            </Grid>
            <ClickActionSettings isLoading={isLoading} />
          </>
        }
      />
    );
  };

  const renderTitleSettings = (): ReactNode => {
    return (
      <Grid
        sx={{marginLeft: 0, paddingTop: 2}}
        container
        columns={24}
        rowSpacing={2}
        columnSpacing={4}
      >
        <Grid
          sx={{marginLeft: 0, paddingTop: 2}}
          container
          columns={24}
          rowSpacing={2}
          columnSpacing={4}
        >
          <Filter isLoading={isLoading}>
            <SwitchControl
              id={'showTitle'}
              name={'Show title'}
              value={showTitle}
              tooltip={
                <p>
                  The Title must be set by editing each image from "Images"
                  section.{' '}
                  <a
                    className="seetings__see-more-link"
                    href="https://youtu.be/ziAG16MADbY"
                    target="_blank"
                  >
                    See more
                  </a>
                </p>
              }
              onChange={onInputValueChange}
            />
          </Filter>
          {showTitle && (
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'titleSource'}
                name={'Source'}
                value={titleSource}
                options={TitleSourceOptions}
                onChange={(inputValue: any) => {
                  if (
                    !isPro &&
                    TitleSourceOptions.find(
                      (option) => option.value === inputValue
                    )?.isPro
                  ) {
                    (window as any).reacg_open_premium_offer_dialog({
                      utm_medium: 'titleSource',
                    });
                  } else {
                    onInputValueChange(inputValue, 'titleSource');
                  }
                }}
              />
            </Filter>
          )}
        </Grid>
        {showTitle && (
          <Grid
            container
            columns={24}
            rowSpacing={2}
            columnSpacing={4}
            className="reacg-section__container-inherit"
          >
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'titleVisibility'}
                name={'Visibility'}
                value={titleVisibility}
                options={TitleVisibilityOptions}
                onChange={onInputValueChange}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'titlePosition'}
                name={'Position'}
                value={titlePosition}
                options={titlePositionOptions}
                onChange={onInputValueChange}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <NumberControl
                id={'titleFontSize'}
                name={'Font size'}
                value={titleFontSize}
                onChange={onInputValueChange}
                unit={'px'}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <ColorControl
                id={'titleColor'}
                name="Color"
                value={titleColor}
                onChange={onInputValueChange}
              />
            </Filter>
          </Grid>
        )}
      </Grid>
    );
  };

  const renderCaptionSettings = (): ReactNode => {
    return (
      <>
        <Grid
          sx={{marginLeft: 0, paddingTop: 2}}
          container
          columns={24}
          rowSpacing={2}
          columnSpacing={4}
        >
          <Filter isLoading={isLoading}>
            <SwitchControl
              id={'showCaption'}
              name={'Show caption'}
              value={showCaption}
              pro={true}
              tooltip={
                <p>
                  The Caption must be set by editing each image from "Images"
                  section.{' '}
                  <a
                    className="seetings__see-more-link"
                    href="https://youtu.be/ziAG16MADbY"
                    target="_blank"
                  >
                    See more
                  </a>
                </p>
              }
              onChange={
                isPro
                  ? onInputValueChange
                  : () =>
                      (window as any).reacg_open_premium_offer_dialog({
                        utm_medium: 'show_caption',
                      })
              }
            />
          </Filter>
          {showCaption && (
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'captionSource'}
                name={'Source'}
                value={captionSource}
                options={CaptionSourceOptions}
                onChange={(inputValue: any) => {
                  if (
                    !isPro &&
                    CaptionSourceOptions.find(
                      (option) => option.value === inputValue
                    )?.isPro
                  ) {
                    (window as any).reacg_open_premium_offer_dialog({
                      utm_medium: 'captionSource',
                    });
                  } else {
                    onInputValueChange(inputValue, 'captionSource');
                  }
                }}
              />
            </Filter>
          )}
        </Grid>
        {showCaption && (
          <Grid
            container
            columns={24}
            rowSpacing={2}
            columnSpacing={4}
            className="reacg-section__container-inherit"
          >
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'captionVisibility'}
                name={'Visibility'}
                value={captionVisibility}
                options={TitleVisibilityOptions}
                onChange={onInputValueChange}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'captionPosition'}
                name={'Position'}
                value={captionPosition}
                options={titlePositionOptions}
                onChange={onInputValueChange}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <NumberControl
                id={'captionFontSize'}
                name={'Font size'}
                value={captionFontSize}
                onChange={onInputValueChange}
                unit={'px'}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <ColorControl
                id={'captionFontColor'}
                name="Color"
                value={captionFontColor}
                onChange={onInputValueChange}
              />
            </Filter>
          </Grid>
        )}
      </>
    );
  };

  const renderTitleSection = (): ReactNode => {
    return (
      <Section
        header={'Text & Metadata'}
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            {renderTitleSettings()}
            {renderCaptionSettings()}
            {(showTitle || showCaption) && (
              <>
                <Grid
                  sx={{marginLeft: 0, paddingTop: 2}}
                  container
                  columns={24}
                  rowSpacing={2}
                  columnSpacing={4}
                >
                  <Filter isLoading={isLoading}>
                    <InputLabel shrink variant="filled">
                      <LabelWithTooltip label={'Text'} tooltip={''} />
                    </InputLabel>
                  </Filter>
                </Grid>
                <Grid
                  container
                  columns={24}
                  rowSpacing={2}
                  columnSpacing={4}
                  className="reacg-section__container-inherit"
                >
                  <Filter isLoading={isLoading}>
                    <SelectControl
                      id={'titleAlignment'}
                      name={'Alignment'}
                      value={titleAlignment}
                      options={TitleAlignmentOptions}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <FontControl
                      id={'titleFontFamily'}
                      name={'Font family'}
                      value={titleFontFamily}
                      onChange={onInputValueChange}
                    />
                  </Filter>

                  <Filter isLoading={isLoading}>
                    <ColorControl
                      id={'overlayTextBackground'}
                      name={'Overlay text background'}
                      value={overlayTextBackground}
                      onChange={onInputValueChange}
                      tooltip={
                        <p>
                          Set a background color for text displayed directly on
                          the image (top, center, or bottom positions). Not
                          applied when the text is above or below the image.
                        </p>
                      }
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <SwitchControl
                      id={'invertTextColor'}
                      name={'Invert color'}
                      pro={true}
                      tooltip={
                        <p>
                          Enable this to invert the text color dynamically,
                          ensuring it stays visible against any background. Not
                          applied when the text is above or below the image.
                        </p>
                      }
                      value={invertTextColor}
                      onChange={
                        isPro
                          ? onInputValueChange
                          : () =>
                              (window as any).reacg_open_premium_offer_dialog({
                                utm_medium: 'invert_color',
                              })
                      }
                    />
                  </Filter>
                </Grid>
              </>
            )}
          </Grid>
        }
        defaultExpanded={false}
      />
    );
  };

  const renderAdvancedSettings = (): ReactNode => {
    return (
      <Section
        header={'Advanced'}
        body={
          <>
            <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
              <Filter isLoading={isLoading}>
                <SelectControl
                  id={'navigation'}
                  name={'Navigation'}
                  value={navigation}
                  options={SliderNavigationOptions}
                  onChange={onInputValueChange}
                />
              </Filter>
            </Grid>
            {(navigation === SliderNavigation.ARROWS ||
              navigation === SliderNavigation.ARROWS_AND_DOTS) && (
              <Grid container columns={24} columnSpacing={4} marginTop={2}>
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
                        ? onInputValueChange
                        : () =>
                            (window as any).reacg_open_premium_offer_dialog({
                              utm_medium: 'dots_color',
                            })
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
                        ? onInputValueChange
                        : () =>
                            (window as any).reacg_open_premium_offer_dialog({
                              utm_medium: 'arrows_color',
                            })
                    }
                  />
                </Filter>
              </Grid>
            )}

            {(navigation === SliderNavigation.DOTS ||
              navigation === SliderNavigation.ARROWS_AND_DOTS) && (
              <Grid container columns={24} columnSpacing={4} marginTop={2}>
                <Filter isLoading={isLoading}>
                  <SelectControl
                    id={'dotsPosition'}
                    name={'Dots position'}
                    value={dotsPosition}
                    options={SliderNavigationPositionOptions}
                    onChange={onInputValueChange}
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
                        ? onInputValueChange
                        : () =>
                            (window as any).reacg_open_premium_offer_dialog({
                              utm_medium: 'dots_color',
                            })
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
                        ? onInputValueChange
                        : () =>
                            (window as any).reacg_open_premium_offer_dialog({
                              utm_medium: 'dots_color',
                            })
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
                        ? onInputValueChange
                        : () =>
                            (window as any).reacg_open_premium_offer_dialog({
                              utm_medium: 'active_dots_color',
                            })
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
                        ? onInputValueChange
                        : () =>
                            (window as any).reacg_open_premium_offer_dialog({
                              utm_medium: 'inactive_dots_color',
                            })
                    }
                  />
                </Filter>
              </Grid>
            )}
            <Grid container columns={24} columnSpacing={4} marginTop={2}>
              <Filter isLoading={isLoading}>
                <SwitchControl
                  id={'playAndPauseAllowed'}
                  name={'Show Play / Pause button'}
                  value={playAndPauseAllowed}
                  onChange={onInputValueChange}
                />
              </Filter>
              <Filter isLoading={isLoading}>
                <SwitchControl
                  id={'showVideoControls'}
                  name={'Show video controls'}
                  value={showVideoControls}
                  onChange={onInputValueChange}
                />
              </Filter>
            </Grid>
          </>
        }
        defaultExpanded={false}
      />
    );
  };

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      {renderBasicSettings()}
      {renderTitleSection()}
      {renderAdvancedSettings()}
    </Paper>
  );
};

export {CardsSettings};
