import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
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
  SliderDirectionOptions,
  SliderSlidesDesign,
  SliderSlidesDesignOptions,
  SliderTextPositionOptions,
  TextsAlignmentOptions,
  TitleAlignmentOptions,
  TitleSourceOptions,
} from 'data-structures';
import React, {ReactNode} from 'react';
import {
  ColorControl,
  FontControl,
  NumberControl,
  SelectControl,
  SliderControl,
  SwitchControl,
} from '../../controls';
import {Filter} from '../Filter';

interface ISliderSettingsProps {
  settings: ISliderSettings;
  onSettingsChange: (settings: ISliderSettings) => void;
  onProFeatureClick: (feature: string) => void;
  isLoading?: boolean;
}

const SliderSettings: React.FC<ISliderSettingsProps> = ({
  settings,
  onSettingsChange,
  onProFeatureClick,
  isLoading,
}) => {
  const {resetTemplate} = useTemplates();
  const {
    width,
    height,
    widthType,
    heightType,
    spaceBetween,
    thumbnailsPosition,
    thumbnailsAlignment,
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
    thumbnailTextPosition,
    thumbnailTextFontFamily,
    thumbnailTextColor,
    thumbnailTextBackground,
    thumbnailShowTitle,
    thumbnailTitleFontSize,
    thumbnailTitleAlignment,
    thumbnailShowDescription,
    thumbnailDescriptionFontSize,
    thumbnailDescriptionMaxRowsCount,
    thumbnailInvertTextColor,
    thumbnailTitleSource,
    thumbnailDescriptionSource,
    thumbnailShowCaption,
    thumbnailCaptionSource,
    thumbnailCaptionFontSize,
    thumbnailCaptionFontColor,
    thumbnailDescriptionFontColor,
    direction,
    slidesDesign,
    backgroundBlur,
  } = settings;

  const onInputValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();
    key && onSettingsChange({...settings, [key]: inputValue});
  };
  const {isPro} = usePro();

  const renderMainSettings = (): ReactNode => {
    return (
      <Paper elevation={0} sx={{textAlign: 'left'}}>
        <Section
          header={'Layout Settings'}
          className="reacg-tab-section"
          body={
            <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
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
              <Filter isLoading={isLoading}>
                <NumberControl
                  id={'spaceBetween'}
                  name={'Space between'}
                  value={spaceBetween}
                  onChange={onInputValueChange}
                  min={0}
                />
              </Filter>

              <ClickActionSettings isLoading={isLoading} />
            </Grid>
          }
        />
        <Section
          header={'Thumbnails'}
          className="reacg-tab-section"
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
                      : () => onProFeatureClick('enable_filmstrip')
                  }
                />
              </Filter>

              {/* ───────────────── THUMBNAILS ───────────────── */}
              {thumbnailsPosition !== LightboxThumbnailsPosition.NONE && (
                <>
                  <Filter isLoading={isLoading}>
                    <SelectControl
                      id={'thumbnailsAlignment'}
                      name={'Alignement'}
                      value={thumbnailsAlignment}
                      options={TextsAlignmentOptions}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <SwitchControl
                      id="thumbnailShowsOnHover"
                      name="Shows on hover"
                      value={thumbnailShowsOnHover}
                      onChange={onInputValueChange}
                    />
                  </Filter>

                  <Grid
                    container
                    columns={24}
                    rowSpacing={2}
                    columnSpacing={4}
                    sx={{marginLeft: 0, paddingTop: 2}}
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

                  {/* ─────────────────ACTIVE THUMBNAIL ───────────────── */}

                  <>
                    {/* CONTROLS */}
                    <Grid
                      container
                      columns={24}
                      rowSpacing={2}
                      columnSpacing={4}
                      sx={{marginLeft: 0, paddingTop: 2}}
                    >
                      <Filter isLoading={isLoading}>
                        <NumberControl
                          id={'activeThumbnailWidth'}
                          name={'Active thumbnail width'}
                          value={activeThumbnailWidth}
                          onChange={onInputValueChange}
                          min={0}
                          unit={'px'}
                        />
                      </Filter>
                      <Filter isLoading={isLoading}>
                        <NumberControl
                          id={'activeThumbnailHeight'}
                          name={'Active thumbnail height'}
                          value={activeThumbnailHeight}
                          onChange={onInputValueChange}
                          min={0}
                          unit={'px'}
                        />
                      </Filter>
                      <Filter isLoading={isLoading}>
                        <ColorControl
                          id={'activeThumbnailBackgroundColor'}
                          name="Active thumbnail background color"
                          value={activeThumbnailBackgroundColor}
                          onChange={onInputValueChange}
                        />
                      </Filter>
                      <Filter isLoading={isLoading}>
                        <SliderControl
                          id={'activeThumbnailPadding'}
                          name="Active thumbnail padding (px)"
                          min={0}
                          max={100}
                          value={activeThumbnailPadding}
                          onChange={onInputValueChange}
                        />
                      </Filter>

                      <Filter isLoading={isLoading}>
                        <SliderControl
                          id={'activeThumbnailOpacity'}
                          name="Active thumbnail opacity"
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
                          name="Active thumbnail border (px)"
                          min={0}
                          max={20}
                          value={activeThumbnailBorder}
                          onChange={onInputValueChange}
                        />
                      </Filter>
                      <Filter isLoading={isLoading}>
                        <ColorControl
                          id={'activeThumbnailBorderColor'}
                          name="Active thumbnail border color"
                          value={activeThumbnailBorderColor}
                          onChange={onInputValueChange}
                        />
                      </Filter>
                      <Filter isLoading={isLoading}>
                        <SliderControl
                          id={'activeThumbnailBorderRadius'}
                          name="Active thumbnail border radius (%)"
                          min={0}
                          value={activeThumbnailBorderRadius}
                          max={50}
                          onChange={onInputValueChange}
                        />
                      </Filter>
                      <Filter isLoading={isLoading}>
                        <SliderControl
                          id={'activeThumbnailGap'}
                          name="Active thumbnail gap (px)"
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
                    <Grid
                      container
                      columns={24}
                      rowSpacing={2}
                      columnSpacing={4}
                      sx={{marginLeft: 0, paddingTop: 2}}
                    >
                      <Filter isLoading={isLoading}>
                        <SliderControl
                          id={'thumbnailBarGap'}
                          name="Thumbnail bar gap (px)"
                          min={0}
                          max={100}
                          value={thumbnailBarGap}
                          onChange={onInputValueChange}
                        />
                      </Filter>
                      <Filter isLoading={isLoading}>
                        <ColorControl
                          id={'thumbnailBarBackgroundColor'}
                          name="Thumbnail bar background color"
                          value={thumbnailBarBackgroundColor}
                          onChange={onInputValueChange}
                        />
                      </Filter>
                      <Filter isLoading={isLoading}>
                        <SliderControl
                          id={'thumbnailBarPadding'}
                          name="Thumbnail bar padding (px)"
                          min={0}
                          max={100}
                          value={thumbnailBarPadding}
                          onChange={onInputValueChange}
                        />
                      </Filter>

                      <Filter isLoading={isLoading}>
                        <SliderControl
                          id={'thumbnailBarOpacity'}
                          name="Thumbnail bar opacity"
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
                          name="Thumbnail bar border (px)"
                          min={0}
                          max={20}
                          value={thumbnailBarBorder}
                          onChange={onInputValueChange}
                        />
                      </Filter>
                      <Filter isLoading={isLoading}>
                        <ColorControl
                          id={'thumbnailBarBorderColor'}
                          name="Thumbnail bar border color"
                          value={thumbnailBarBorderColor}
                          onChange={onInputValueChange}
                        />
                      </Filter>
                      <Filter isLoading={isLoading}>
                        <SliderControl
                          id={'thumbnailBarBorderRadius'}
                          name="Thumbnail bar border radius (%)"
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
        />
        <Section
          header={'Thumbnails Content'}
          className="reacg-tab-section"
          body={
            <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
              <Filter isLoading={isLoading}>
                <SwitchControl
                  id={'thumbnailShowTitle'}
                  name={'Thumbnails show title'}
                  value={thumbnailShowTitle}
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
              {thumbnailShowTitle && (
                <Filter isLoading={isLoading}>
                  <SelectControl
                    id={'thumbnailTitleSource'}
                    name={'Thumbnails source'}
                    value={thumbnailTitleSource}
                    options={TitleSourceOptions}
                    onChange={onInputValueChange}
                  />
                </Filter>
              )}
              {thumbnailShowTitle && (
                <Grid
                  container
                  columns={24}
                  rowSpacing={2}
                  columnSpacing={4}
                  sx={{marginLeft: 0, paddingTop: 2}}
                >
                  <Filter isLoading={isLoading}>
                    <NumberControl
                      id={'thumbnailTitleFontSize'}
                      name={'Thumbnails font size'}
                      value={thumbnailTitleFontSize}
                      onChange={onInputValueChange}
                      unit={'vw'}
                      max={5}
                      step={0.1}
                    />
                  </Filter>
                </Grid>
              )}
              <Grid
                sx={{marginLeft: 0, paddingTop: 2}}
                container
                columns={24}
                rowSpacing={2}
                columnSpacing={4}
              >
                <Filter isLoading={isLoading}>
                  <SwitchControl
                    id={'thumbnailShowCaption'}
                    name={'Thumbnails show caption'}
                    value={thumbnailShowCaption}
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
                        : () => onProFeatureClick('show_caption')
                    }
                  />
                </Filter>
                {thumbnailShowCaption && (
                  <Filter isLoading={isLoading}>
                    <SelectControl
                      id={'thumbnailCaptionSource'}
                      name={'Thumbnails caption source'}
                      value={thumbnailCaptionSource}
                      options={CaptionSourceOptions}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                )}
              </Grid>
              {thumbnailShowCaption && (
                <Grid
                  container
                  columns={24}
                  rowSpacing={2}
                  columnSpacing={4}
                  sx={{marginLeft: 0, paddingTop: 2}}
                >
                  <Filter isLoading={isLoading}>
                    <NumberControl
                      id={'thumbnailCaptionFontSize'}
                      name={'Thumbnails caption font size'}
                      value={thumbnailCaptionFontSize}
                      onChange={onInputValueChange}
                      unit={'vw'}
                      max={5}
                      step={0.1}
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <ColorControl
                      id={'thumbnailCaptionFontColor'}
                      name="Thumbnails caption color"
                      value={thumbnailCaptionFontColor}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                </Grid>
              )}
              <Grid
                sx={{marginLeft: 0, paddingTop: 2}}
                container
                columns={24}
                rowSpacing={2}
                columnSpacing={4}
              >
                <Filter isLoading={isLoading}>
                  <SwitchControl
                    id={'thumbnailShowDescription'}
                    name={'Thumbnails show description'}
                    value={thumbnailShowDescription}
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
                {thumbnailShowDescription && (
                  <Filter isLoading={isLoading}>
                    <SelectControl
                      id={'thumbnailDescriptionSource'}
                      name={'Thumbnails description Source'}
                      value={thumbnailDescriptionSource}
                      options={DescriptionSourceOptions}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                )}
              </Grid>
              {thumbnailShowDescription && (
                <Grid
                  container
                  columns={24}
                  rowSpacing={2}
                  columnSpacing={4}
                  sx={{marginLeft: 0, paddingTop: 2}}
                >
                  <Filter isLoading={isLoading}>
                    <NumberControl
                      id={'thumbnailDescriptionFontSize'}
                      name={'Thumbnails description font size'}
                      value={thumbnailDescriptionFontSize}
                      onChange={onInputValueChange}
                      unit={'vw'}
                      max={5}
                      step={0.1}
                    />
                  </Filter>

                  <Filter isLoading={isLoading}>
                    <NumberControl
                      id={'thumbnailDescriptionMaxRowsCount'}
                      name={'Thumbnails description max rows count'}
                      value={thumbnailDescriptionMaxRowsCount}
                      onChange={onInputValueChange}
                      min={1}
                    />
                  </Filter>

                  <Filter isLoading={isLoading}>
                    <ColorControl
                      id={'thumbnailDescriptionFontColor'}
                      name="Thumbnails description color"
                      value={thumbnailDescriptionFontColor}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                </Grid>
              )}

              {(thumbnailShowCaption ||
                thumbnailShowTitle ||
                thumbnailShowDescription) && (
                <Grid
                  container
                  columns={24}
                  rowSpacing={2}
                  columnSpacing={4}
                  sx={{marginLeft: 0, paddingTop: 2}}
                >
                  <Filter isLoading={isLoading}>
                    <SelectControl
                      id={'thumbnailTitleAlignment'}
                      name={'Thumbnails alignement'}
                      value={thumbnailTitleAlignment}
                      options={TitleAlignmentOptions}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <SelectControl
                      id={'thumbnailTextPosition'}
                      name={'Thumbnails typography position'}
                      value={thumbnailTextPosition}
                      options={SliderTextPositionOptions}
                      onChange={onInputValueChange}
                    />
                  </Filter>

                  <Filter isLoading={isLoading}>
                    <FontControl
                      id={'thumbnailTextFontFamily'}
                      name={'Thumbnails typography font family'}
                      value={thumbnailTextFontFamily}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <ColorControl
                      id={'thumbnailTextColor'}
                      name="Thumbnails typography color"
                      value={thumbnailTextColor}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <ColorControl
                      id={'thumbnailTextBackground'}
                      name={'Thumbnails typography text background color'}
                      value={thumbnailTextBackground}
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
                      id={'thumbnailInvertTextColor'}
                      name={'Thumbnails typography invert color'}
                      pro={true}
                      tooltip={
                        <p>
                          Enable this to invert the text color dynamically,
                          ensuring it stays visible against any background.
                        </p>
                      }
                      value={thumbnailInvertTextColor}
                      onChange={
                        isPro
                          ? onInputValueChange
                          : () => onProFeatureClick('invert_color')
                      }
                    />
                  </Filter>
                </Grid>
              )}
            </Grid>
          }
        />
      </Paper>
    );
  };

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      {renderMainSettings()}
    </Paper>
  );
};

export {SliderSettings};
