import {InputLabel} from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ProIcon} from 'components/alert-dialog/icons/ProIcon';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
import {useSettings} from 'components/settings';
import {useTemplates} from 'contexts';
import {usePro} from 'contexts/ProContext';
import {Section} from 'core-components/section';
import {
  CaptionSourceOptions,
  DescriptionSourceOptions,
  ISliderSettings,
  LightboxThumbnailsPosition,
  LightboxThumbnailsPositionOptions,
  SizeTypeHeightOptions,
  SizeTypeWidthOptions,
  SliderAnimationOptions,
  SliderDirectionOptions,
  SliderNavigationPositionOptions,
  SliderNavigationTypeOptions,
  SliderShadowTypeOptions,
  SliderSlidesDesign,
  SliderSlidesDesignOptions,
  SliderTextPositionOptions,
  TitleAlignmentOptions,
  TitleSourceOptions,
} from 'data-structures';
import {SliderPaginationPositionOptions} from 'data-structures/enum/SliderPaginationPosition';
import React, {ReactNode, useEffect} from 'react';
import {
  ColorControl,
  FontControl,
  NumberControl,
  SelectControl,
  SliderControl,
  SwitchControl,
} from '../controls';
import {LabelWithTooltip} from '../controls/LabelWithTooltip';
import {Filter} from '../settings/Filter';

interface ISliderSettingsProps {
  isLoading?: boolean;
}

const SliderSettings: React.FC<ISliderSettingsProps> = ({isLoading}) => {
  const {resetTemplate} = useTemplates();
  const {sliderSettings: value, changeSliderSettings: onChange} = useSettings();
  const {
    // isFullscreen,
    width,
    height,
    // areControlButtonsShown,
    widthType,
    heightType,
    isInfinite,
    padding,
    isSliderAllowed,
    autoplay,
    slideDuration,
    slideDelay,
    imageAnimation,
    shadow,
    shadowType,
    shadowColor,
    thumbnailsPosition,
    thumbnailShowsOnHover,
    thumbnailWidth,
    thumbnailHeight,
    thumbnailPadding,
    thumbnailOpacity,
    thumbnailBorder,
    thumbnailBorderColor,
    thumbnailBorderRadius,
    thumbnailBackgroundColor,
    thumbnailGap,
    activeThumbnailWidth,
    activeThumbnailHeight,
    activeThumbnailPadding,
    activeThumbnailOpacity,
    activeThumbnailBorder,
    activeThumbnailBackgroundColor,
    activeThumbnailBorderColor,
    activeThumbnailBorderRadius,
    activeThumbnailGap,
    thumbnailBarBackgroundColor,
    thumbnailBarOpacity,
    thumbnailBarPadding,
    thumbnailBarBorder,
    thumbnailBarBorderColor,
    thumbnailBarBorderRadius,
    thumbnailBarGap,
    backgroundColor,
    textPosition,
    textFontFamily,
    textColor,
    textBackground,
    invertTextColor,
    showTitle,
    titleSource,
    titleFontSize,
    titleAlignment,
    showDescription,
    descriptionSource,
    descriptionFontSize,
    descriptionMaxRowsCount,
    showCaption,
    captionSource,
    captionFontSize,
    captionFontColor,
    navigationButton,
    navigationshowsOnHover,
    navigationType,
    navigationColor,
    navigationBackgroundColor,
    navigationSize,
    navigationPosition,
    navigationPadding,
    navigationOpacity,
    navigationBorder,
    navigationBorderColor,
    navigationBorderRadius,
    navigationHover,
    navigationColorHover,
    navigationBackgroundColorHover,
    pagination,
    paginationPosition,
    paginationBulletsImage,
    paginationDynamicBullets,
    paginationshowsOnHover,
    paginationBulletsBackgroundColor,
    paginationBulletsSize,
    paginationBulletsBorder,
    paginationBulletsBorderColor,
    paginationBulletsBorderRadius,
    paginationActiveBulletBackgroundColor,
    paginationActiveBulletSize,
    paginationActiveBulletBorder,
    paginationActiveBulletBorderColor,
    paginationActiveBulletBorderRadius,
    direction,
    keyboard,
    mousewheel,
    slidesDesign,
    backgroundBlur,
  } = value as ISliderSettings;

  const onInputValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();
    key && onChange({...value, [key]: inputValue});
  };
  useEffect(() => {
    onChange({...value, paginationActiveBulletSize: 0});
  }, [paginationDynamicBullets]);
  const renderMainSettings = (): ReactNode => {
    return (
      <Section
        header={'Basic'}
        body={
          <>
            <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
              {/* <Filter isLoading={isLoading}>
                  <SwitchControl
                    id={'isFullscreen'}
                    name={'Full width'}
                    value={isFullscreen}
                    onChange={onInputValueChange}
                  />
                </Filter> */}

              <Filter isLoading={isLoading}>
                <div className="mixed-fields">
                  <div style={{flexBasis: '80%'}}>
                    <NumberControl
                      id={'width'}
                      name={'Width'}
                      value={width}
                      onChange={onInputValueChange}
                      min={0}
                    />
                  </div>
                  <div style={{flexBasis: '20%'}}>
                    <SelectControl
                      id="widthType"
                      value={widthType}
                      options={SizeTypeWidthOptions}
                      onChange={onInputValueChange}
                    />
                  </div>
                </div>
              </Filter>
              <Filter isLoading={isLoading}>
                <div className="mixed-fields">
                  <div style={{flexBasis: '80%'}}>
                    <NumberControl
                      id="height"
                      name="Height"
                      value={height}
                      onChange={onInputValueChange}
                      min={0}
                    />
                  </div>
                  <div style={{flexBasis: '20%'}}>
                    <SelectControl
                      id="heightType"
                      value={heightType}
                      options={SizeTypeHeightOptions}
                      onChange={onInputValueChange}
                    />
                  </div>
                </div>
              </Filter>

              <Filter isLoading={isLoading}>
                <SwitchControl
                  id={'autoplay'}
                  name={'Autoplay'}
                  value={autoplay}
                  onChange={onInputValueChange}
                />
              </Filter>
              {autoplay || isSliderAllowed ? (
                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'slideDelay'}
                    name={'Time interval'}
                    value={slideDelay}
                    onChange={onInputValueChange}
                    min={700}
                    unit={'ms'}
                  />
                </Filter>
              ) : null}

              <Filter isLoading={isLoading}>
                <SwitchControl
                  id={'isSliderAllowed'}
                  name={'Play / Pause'}
                  value={isSliderAllowed}
                  onChange={onInputValueChange}
                />
              </Filter>
              <Filter isLoading={isLoading}>
                <SwitchControl
                  id={'isInfinite'}
                  name={'Loop'}
                  value={isInfinite}
                  onChange={onInputValueChange}
                />
              </Filter>
              <Filter isLoading={isLoading}>
                <SliderControl
                  id={'padding'}
                  name="Padding (px)"
                  min={0}
                  max={300}
                  value={padding}
                  onChange={onInputValueChange}
                />
              </Filter>
              <Filter isLoading={isLoading}>
                <ColorControl
                  id={'backgroundColor'}
                  name="Background color"
                  value={backgroundColor}
                  onChange={onInputValueChange}
                />
              </Filter>
            </Grid>
            <ClickActionSettings isLoading={isLoading} />
          </>
        }
      />
    );
  };

  const renderFilmstripSettings = (): ReactNode => {
    return (
      <Section
        header={
          <>
            Filmstrip
            <ProIcon />
          </>
        }
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'thumbnailsPosition'}
                name={'Position'}
                value={thumbnailsPosition}
                options={LightboxThumbnailsPositionOptions}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'enable_filmstrip',
                        })
                }
              />
            </Filter>

            {/* ───────────────── THUMBNAILS ───────────────── */}
            {thumbnailsPosition !== LightboxThumbnailsPosition.NONE && (
              <>
                <Filter isLoading={isLoading}>
                  <SwitchControl
                    id="thumbnailShowsOnHover"
                    name="Shows on hover"
                    value={thumbnailShowsOnHover}
                    onChange={onInputValueChange}
                  />
                </Filter>

                <>
                  {/* LABEL */}
                  <Grid
                    sx={{marginLeft: 0, paddingTop: 2}}
                    container
                    columns={24}
                    rowSpacing={2}
                    columnSpacing={4}
                  >
                    <Filter isLoading={isLoading}>
                      <InputLabel shrink variant="filled">
                        <LabelWithTooltip label="Thumbnail" tooltip="" />
                      </InputLabel>
                    </Filter>
                  </Grid>

                  {/* CONTROLS */}
                  <Grid
                    container
                    columns={24}
                    rowSpacing={2}
                    columnSpacing={4}
                    className="reacg-section__container-inherit"
                  >
                    <Filter isLoading={isLoading}>
                      <NumberControl
                        id={'thumbnailWidth'}
                        name={'Width'}
                        value={thumbnailWidth}
                        onChange={onInputValueChange}
                        min={0}
                        unit={'px'}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <NumberControl
                        id={'thumbnailHeight'}
                        name={'Height'}
                        value={thumbnailHeight}
                        onChange={onInputValueChange}
                        min={0}
                        unit={'px'}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <ColorControl
                        id={'thumbnailBackgroundColor'}
                        name="Background color"
                        value={thumbnailBackgroundColor}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <SliderControl
                        id={'thumbnailPadding'}
                        name="Padding (px)"
                        min={0}
                        max={100}
                        value={thumbnailPadding}
                        onChange={onInputValueChange}
                      />
                    </Filter>

                    <Filter isLoading={isLoading}>
                      <SliderControl
                        id={'thumbnailOpacity'}
                        name="Opacity"
                        min={0}
                        max={1}
                        step={0.05}
                        value={thumbnailOpacity}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <SliderControl
                        id={'thumbnailBorder'}
                        name="Border (px)"
                        min={0}
                        max={20}
                        value={thumbnailBorder}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <ColorControl
                        id={'thumbnailBorderColor'}
                        name="Border color"
                        value={thumbnailBorderColor}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <SliderControl
                        id={'thumbnailBorderRadius'}
                        name="Border radius (%)"
                        min={0}
                        value={thumbnailBorderRadius}
                        max={50}
                        onChange={onInputValueChange}
                      />
                    </Filter>

                    <Filter isLoading={isLoading}>
                      <SliderControl
                        id={'thumbnailGap'}
                        name="Gap (px)"
                        min={0}
                        max={100}
                        value={thumbnailGap}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                  </Grid>
                </>
                {/* ─────────────────ACTIVE THUMBNAIL ───────────────── */}

                <>
                  {/* LABEL */}
                  <Grid
                    sx={{marginLeft: 0, paddingTop: 2}}
                    container
                    columns={24}
                    rowSpacing={2}
                    columnSpacing={4}
                  >
                    <Filter isLoading={isLoading}>
                      <InputLabel shrink variant="filled">
                        <LabelWithTooltip label="Active Thumbnail" tooltip="" />
                      </InputLabel>
                    </Filter>
                  </Grid>

                  {/* CONTROLS */}
                  <Grid
                    container
                    columns={24}
                    rowSpacing={2}
                    columnSpacing={4}
                    className="reacg-section__container-inherit"
                  >
                    <Filter isLoading={isLoading}>
                      <NumberControl
                        id={'activeThumbnailWidth'}
                        name={'Width'}
                        value={activeThumbnailWidth}
                        onChange={onInputValueChange}
                        min={0}
                        unit={'px'}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <NumberControl
                        id={'activeThumbnailHeight'}
                        name={'Height'}
                        value={activeThumbnailHeight}
                        onChange={onInputValueChange}
                        min={0}
                        unit={'px'}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <ColorControl
                        id={'activeThumbnailBackgroundColor'}
                        name="Background color"
                        value={activeThumbnailBackgroundColor}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <SliderControl
                        id={'activeThumbnailPadding'}
                        name="Padding (px)"
                        min={0}
                        max={100}
                        value={activeThumbnailPadding}
                        onChange={onInputValueChange}
                      />
                    </Filter>

                    <Filter isLoading={isLoading}>
                      <SliderControl
                        id={'activeThumbnailOpacity'}
                        name="Opacity"
                        min={0}
                        max={1}
                        step={0.05}
                        value={activeThumbnailOpacity}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <SliderControl
                        id={'activeThumbnailBorder'}
                        name="Border (px)"
                        min={0}
                        max={20}
                        value={activeThumbnailBorder}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <ColorControl
                        id={'activeThumbnailBorderColor'}
                        name="Border color"
                        value={activeThumbnailBorderColor}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <SliderControl
                        id={'activeThumbnailBorderRadius'}
                        name="Border radius (%)"
                        min={0}
                        value={activeThumbnailBorderRadius}
                        max={50}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <SliderControl
                        id={'activeThumbnailGap'}
                        name="Gap (px)"
                        min={0}
                        max={100}
                        value={activeThumbnailGap}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                  </Grid>
                </>
                {/* ───────────────── THUMBNAIL BAR ───────────────── */}
                <>
                  {/* LABEL */}
                  <Grid
                    sx={{marginLeft: 0, paddingTop: 2}}
                    container
                    columns={24}
                    rowSpacing={2}
                    columnSpacing={4}
                  >
                    <Filter isLoading={isLoading}>
                      <InputLabel shrink variant="filled">
                        <LabelWithTooltip label="Thumbnail Bar" tooltip="" />
                      </InputLabel>
                    </Filter>
                  </Grid>

                  {/* CONTROLS */}
                  <Grid
                    container
                    columns={24}
                    rowSpacing={2}
                    columnSpacing={4}
                    className="reacg-section__container-inherit"
                  >
                    <Filter isLoading={isLoading}>
                      <SliderControl
                        id={'thumbnailBarGap'}
                        name="Gap (px)"
                        min={0}
                        max={100}
                        value={thumbnailBarGap}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <ColorControl
                        id={'thumbnailBarBackgroundColor'}
                        name="Background color"
                        value={thumbnailBarBackgroundColor}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <SliderControl
                        id={'thumbnailBarPadding'}
                        name="Padding (px)"
                        min={0}
                        max={100}
                        value={thumbnailBarPadding}
                        onChange={onInputValueChange}
                      />
                    </Filter>

                    <Filter isLoading={isLoading}>
                      <SliderControl
                        id={'thumbnailBarOpacity'}
                        name="Opacity"
                        min={0}
                        max={1}
                        step={0.05}
                        value={thumbnailBarOpacity}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <SliderControl
                        id={'thumbnailBarBorder'}
                        name="Border (px)"
                        min={0}
                        max={20}
                        value={thumbnailBarBorder}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <ColorControl
                        id={'thumbnailBarBorderColor'}
                        name="Border color"
                        value={thumbnailBarBorderColor}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <SliderControl
                        id={'thumbnailBarBorderRadius'}
                        name="Border radius (%)"
                        min={0}
                        value={thumbnailBarBorderRadius}
                        max={50}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                  </Grid>
                </>
              </>
            )}
          </Grid>
        }
        defaultExpanded={false}
      />
    );
  };

  const {isPro} = usePro();

  const renderTitleSection = (): ReactNode => {
    return (
      <Section
        header={'Text & Metadata'}
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
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
                        The Caption must be set by editing each image from
                        "Images" section.{' '}
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
                      onChange={onInputValueChange}
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
                    <NumberControl
                      id={'titleFontSize'}
                      name={'Font size'}
                      value={titleFontSize}
                      onChange={onInputValueChange}
                      unit={'vw'}
                      max={5}
                      step={0.1}
                    />
                  </Filter>

                  <Filter isLoading={isLoading}>
                    <SelectControl
                      id={'titleAlignment'}
                      name={'Alignement'}
                      value={titleAlignment}
                      options={TitleAlignmentOptions}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                </Grid>
              )}
            </Grid>
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
                    id={'showCaption'}
                    name={'Show caption'}
                    value={showCaption}
                    pro={true}
                    tooltip={
                      <p>
                        The Caption must be set by editing each image from
                        "Images" section.{' '}
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
                      onChange={onInputValueChange}
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
                    <NumberControl
                      id={'captionFontSize'}
                      name={'Font size'}
                      value={captionFontSize}
                      onChange={onInputValueChange}
                      unit={'vw'}
                      max={5}
                      step={0.1}
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
            </Grid>
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
                    id={'showDescription'}
                    name={'Show description'}
                    value={showDescription}
                    tooltip={
                      <p>
                        The Caption must be set by editing each image from
                        "Images" section.{' '}
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
                {showDescription && (
                  <Filter isLoading={isLoading}>
                    <SelectControl
                      id={'descriptionSource'}
                      name={'Source'}
                      value={descriptionSource}
                      options={DescriptionSourceOptions}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                )}
              </Grid>
              {showDescription && (
                <Grid
                  container
                  columns={24}
                  rowSpacing={2}
                  columnSpacing={4}
                  className="reacg-section__container-inherit"
                >
                  <Filter isLoading={isLoading}>
                    <NumberControl
                      id={'descriptionFontSize'}
                      name={'Font size'}
                      value={descriptionFontSize}
                      onChange={onInputValueChange}
                      unit={'vw'}
                      max={5}
                      step={0.1}
                    />
                  </Filter>

                  <Filter isLoading={isLoading}>
                    <NumberControl
                      id={'descriptionMaxRowsCount'}
                      name={'Max rows count'}
                      value={descriptionMaxRowsCount}
                      onChange={onInputValueChange}
                      min={1}
                    />
                  </Filter>
                </Grid>
              )}
            </Grid>
            {(showTitle || showCaption || showDescription) && (
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
                      id={'textPosition'}
                      name={'Position'}
                      value={textPosition}
                      options={SliderTextPositionOptions}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <FontControl
                      id={'textFontFamily'}
                      name={'Font family'}
                      value={textFontFamily}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <ColorControl
                      id={'textColor'}
                      name="Color"
                      value={textColor}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <ColorControl
                      id={'textBackground'}
                      name={'Text background'}
                      value={textBackground}
                      onChange={onInputValueChange}
                      tooltip={
                        <p>
                          Set a background color for text displayed on the
                          image.
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
                          ensuring it stays visible against any background.
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
  const renderNavigationSettings = (): ReactNode => {
    return (
      <Section
        header={
          <>
            Navigation
            <ProIcon />
          </>
        }
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'navigationButton'}
                name={'Navigation'}
                value={navigationButton}
                onChange={onInputValueChange}
              />
            </Filter>
            {navigationButton && (
              <>
                <Filter isLoading={isLoading}>
                  <SwitchControl
                    id="navigationshowsOnHover"
                    name="Shows on hover"
                    value={navigationshowsOnHover}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SelectControl
                    id={'navigationType'}
                    name={'Type'}
                    value={navigationType}
                    options={SliderNavigationTypeOptions}
                    onChange={
                      isPro
                        ? onInputValueChange
                        : () =>
                            (window as any).reacg_open_premium_offer_dialog({
                              utm_medium: 'enable_filmstrip',
                            })
                    }
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SelectControl
                    id="navigationPosition"
                    name="Position"
                    value={navigationPosition}
                    options={SliderNavigationPositionOptions}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SliderControl
                    id="navigationSize"
                    name="Size (px)"
                    min={0}
                    max={300}
                    value={navigationSize}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SliderControl
                    id={'navigationPadding'}
                    name="Padding (px)"
                    min={0}
                    max={100}
                    value={navigationPadding}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SliderControl
                    id={'navigationOpacity'}
                    name="Opacity"
                    min={0}
                    max={1}
                    step={0.05}
                    value={navigationOpacity}
                    onChange={onInputValueChange}
                  />
                </Filter>

                <Grid
                  sx={{marginLeft: 0, paddingTop: 2}}
                  container
                  columns={24}
                  rowSpacing={2}
                  columnSpacing={4}
                >
                  <Filter isLoading={isLoading}>
                    <SliderControl
                      id="navigationBorder"
                      name="Border (px)"
                      min={0}
                      max={5}
                      value={navigationBorder}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <SliderControl
                      id="navigationBorderRadius"
                      name="Border radius (%)"
                      min={0}
                      max={99}
                      value={navigationBorderRadius}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <ColorControl
                      id="navigationBorderColor"
                      name="Border color"
                      value={navigationBorderColor}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                </Grid>
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id="navigationColor"
                    name="color"
                    value={navigationColor}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id="navigationBackgroundColor"
                    name="Background color"
                    value={navigationBackgroundColor}
                    onChange={onInputValueChange}
                  />
                </Filter>

                <Grid
                  sx={{marginLeft: 0, paddingTop: 2}}
                  container
                  columns={24}
                  rowSpacing={2}
                  columnSpacing={4}
                >
                  <Filter isLoading={isLoading}>
                    <SwitchControl
                      id="navigationHover"
                      name="Hover"
                      value={navigationHover}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                  {navigationHover && (
                    <>
                      <Filter isLoading={isLoading}>
                        <ColorControl
                          id="navigationColorHover"
                          name="Color hover"
                          value={navigationColorHover}
                          onChange={onInputValueChange}
                        />
                      </Filter>
                      <Filter isLoading={isLoading}>
                        <ColorControl
                          id="navigationBackgroundColorHover"
                          name="Background color hover"
                          value={navigationBackgroundColorHover}
                          onChange={onInputValueChange}
                        />
                      </Filter>
                    </>
                  )}{' '}
                </Grid>
              </>
            )}
          </Grid>
        }
        defaultExpanded={false}
      />
    );
  };

  const renderPaginationSettings = (): ReactNode => {
    return (
      <Section
        header={
          <>
            Pagination
            <ProIcon />
          </>
        }
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            {/* ENABLE PAGINATION */}
            <Filter isLoading={isLoading}>
              <SwitchControl
                id="pagination"
                name="Pagination"
                value={pagination}
                onChange={onInputValueChange}
              />
            </Filter>

            {pagination && (
              <>
                <Filter isLoading={isLoading}>
                  <SwitchControl
                    id="paginationDynamicBullets"
                    name="Dynamic bullets"
                    value={paginationDynamicBullets}
                    onChange={onInputValueChange}
                  />
                </Filter>

                {/* BASIC OPTIONS */}

                <Filter isLoading={isLoading}>
                  <SwitchControl
                    id="paginationshowsOnHover"
                    name="Shows on hover"
                    value={paginationshowsOnHover}
                    onChange={onInputValueChange}
                  />
                </Filter>

                <Filter isLoading={isLoading}>
                  <SwitchControl
                    id="paginationBulletsImage"
                    name="Image bullets"
                    value={paginationBulletsImage}
                    onChange={onInputValueChange}
                  />
                </Filter>
                {!paginationDynamicBullets && (
                  <Filter isLoading={isLoading}>
                    <SelectControl
                      id={'paginationPosition'}
                      name={'Position'}
                      value={paginationPosition}
                      options={SliderPaginationPositionOptions}
                      onChange={
                        isPro
                          ? onInputValueChange
                          : () =>
                              (window as any).reacg_open_premium_offer_dialog({
                                utm_medium: 'enable_filmstrip',
                              })
                      }
                    />
                  </Filter>
                )}
                {/* ───────────────── BULLETS ───────────────── */}
                <>
                  {/* LABEL */}
                  <Grid
                    sx={{marginLeft: 0, paddingTop: 2}}
                    container
                    columns={24}
                    rowSpacing={2}
                    columnSpacing={4}
                  >
                    <Filter isLoading={isLoading}>
                      <InputLabel shrink variant="filled">
                        <LabelWithTooltip label="Bullets" tooltip="" />
                      </InputLabel>
                    </Filter>
                  </Grid>

                  {/* CONTROLS */}
                  <Grid
                    container
                    columns={24}
                    rowSpacing={2}
                    columnSpacing={4}
                    className="reacg-section__container-inherit"
                  >
                    {!paginationBulletsImage && (
                      <Filter isLoading={isLoading}>
                        <ColorControl
                          id="paginationBulletsBackgroundColor"
                          name="Background color"
                          value={paginationBulletsBackgroundColor}
                          onChange={onInputValueChange}
                        />
                      </Filter>
                    )}

                    <Filter isLoading={isLoading}>
                      <SliderControl
                        id="paginationBulletsSize"
                        name="Size (px)"
                        min={0}
                        max={300}
                        value={paginationBulletsSize}
                        onChange={onInputValueChange}
                      />
                    </Filter>

                    <Filter isLoading={isLoading}>
                      <SliderControl
                        id="paginationBulletsBorder"
                        name="Border (px)"
                        min={0}
                        max={5}
                        value={paginationBulletsBorder}
                        onChange={onInputValueChange}
                      />
                    </Filter>

                    <Filter isLoading={isLoading}>
                      <SliderControl
                        id="paginationBulletsBorderRadius"
                        name="Border radius (%)"
                        min={0}
                        max={99}
                        value={paginationBulletsBorderRadius}
                        onChange={onInputValueChange}
                      />
                    </Filter>

                    <Filter isLoading={isLoading}>
                      <ColorControl
                        id="paginationBulletsBorderColor"
                        name="Border color"
                        value={paginationBulletsBorderColor}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                  </Grid>
                </>

                {/* ─────────────── ACTIVE BULLET ─────────────── */}
                <>
                  {/* LABEL */}
                  <Grid
                    sx={{marginLeft: 0, paddingTop: 2}}
                    container
                    columns={24}
                    rowSpacing={2}
                    columnSpacing={4}
                  >
                    <Filter isLoading={isLoading}>
                      <InputLabel shrink variant="filled">
                        <LabelWithTooltip label="Active bullet" tooltip="" />
                      </InputLabel>
                    </Filter>
                  </Grid>

                  {/* CONTROLS */}
                  <Grid
                    container
                    columns={24}
                    rowSpacing={2}
                    columnSpacing={4}
                    className="reacg-section__container-inherit"
                  >
                    <Filter isLoading={isLoading}>
                      <ColorControl
                        id="paginationActiveBulletBackgroundColor"
                        name="Background color"
                        value={paginationActiveBulletBackgroundColor}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <ColorControl
                        id="paginationActiveBulletBorderColor"
                        name="Border color"
                        value={paginationActiveBulletBorderColor}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                    {!paginationDynamicBullets && (
                      <Filter isLoading={isLoading}>
                        <SliderControl
                          id="paginationActiveBulletSize"
                          name="Size (px)"
                          min={0}
                          max={300}
                          value={paginationActiveBulletSize}
                          onChange={onInputValueChange}
                        />
                      </Filter>
                    )}

                    <Filter isLoading={isLoading}>
                      <SliderControl
                        id="paginationActiveBulletBorder"
                        name="Border (px)"
                        min={0}
                        max={5}
                        value={paginationActiveBulletBorder}
                        onChange={onInputValueChange}
                      />
                    </Filter>

                    <Filter isLoading={isLoading}>
                      <SliderControl
                        id="paginationActiveBulletBorderRadius"
                        name="Border radius (%)"
                        min={0}
                        max={99}
                        value={paginationActiveBulletBorderRadius}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                  </Grid>
                </>
              </>
            )}
          </Grid>
        }
        defaultExpanded={false}
      />
    );
  };

  const renderShadowSettings = (): ReactNode => {
    return (
      <Section
        header={'Shadow'}
        body={
          <>
            <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
              <Filter isLoading={isLoading}>
                <SwitchControl
                  id="shadow"
                  name="Shadow"
                  value={shadow}
                  onChange={onInputValueChange}
                />
              </Filter>

              {shadow && (
                <>
                  <Filter isLoading={isLoading}>
                    <SelectControl
                      id={'shadowType'}
                      name={'Type'}
                      value={shadowType}
                      options={SliderShadowTypeOptions}
                      onChange={
                        isPro
                          ? onInputValueChange
                          : () =>
                              (window as any).reacg_open_premium_offer_dialog({
                                utm_medium: 'enable_filmstrip',
                              })
                      }
                    />
                  </Filter>

                  <Filter isLoading={isLoading}>
                    <ColorControl
                      id={'shadowColor'}
                      name="Color"
                      value={shadowColor}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                </>
              )}
            </Grid>
          </>
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
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
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
                  <InputLabel shrink variant="filled">
                    <LabelWithTooltip label={'Container'} tooltip={''} />
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
                    id={'direction'}
                    name={'Sldier direction'}
                    // pro={true}
                    value={direction}
                    options={SliderDirectionOptions}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SwitchControl
                    id={'keyboard'}
                    name={'Keyboard'}
                    value={keyboard}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SwitchControl
                    id={'mousewheel'}
                    name={'Mousewheel'}
                    value={mousewheel}
                    onChange={onInputValueChange}
                  />
                </Filter>

                {/* <Filter isLoading={isLoading}>
                  <ColorControl
                    id={'backgroundColor'}
                    name={'Background color'}
                    value={backgroundColor}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SliderControl
                    id={'containerPadding'}
                    name="Padding (px)"
                    min={0}
                    max={100}
                    value={containerPadding}
                    onChange={onInputValueChange}
                  />
                </Filter> */}
              </Grid>
            </Grid>
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
                  <InputLabel shrink variant="filled">
                    <LabelWithTooltip label={'Images'} tooltip={''} />
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
                    id={'imageAnimation'}
                    name={'Animation'}
                    pro={true}
                    value={imageAnimation}
                    options={SliderAnimationOptions}
                    onChange={
                      isPro
                        ? onInputValueChange
                        : () =>
                            (window as any).reacg_open_premium_offer_dialog({
                              utm_medium: 'animation',
                            })
                    }
                  />
                </Filter>

                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'slideDuration'}
                    name={'Slide duration'}
                    value={slideDuration}
                    onChange={onInputValueChange}
                    min={300}
                    unit={'ms'}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SelectControl
                    id={'slidesDesign'}
                    name={'Slides Design'}
                    value={slidesDesign}
                    options={SliderSlidesDesignOptions}
                    onChange={onInputValueChange}
                  />
                </Filter>
                {slidesDesign === SliderSlidesDesign.BLURFIT && (
                  <Filter isLoading={isLoading}>
                    <SliderControl
                      id={'backgroundBlur'}
                      name="background Blur(px)"
                      min={7}
                      max={45}
                      value={backgroundBlur}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                )}
              </Grid>
            </Grid>
          </Grid>
        }
        defaultExpanded={false}
      />
    );
  };

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      {renderMainSettings()}
      {renderTitleSection()}
      {renderFilmstripSettings()}
      {renderNavigationSettings()}
      {renderPaginationSettings()}
      {renderAdvancedSettings()}
      {renderShadowSettings()}
    </Paper>
  );
};

export {SliderSettings};
