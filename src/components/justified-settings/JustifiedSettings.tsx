import {InputLabel} from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
import {useSettings} from 'components/settings';
import {useTemplates} from 'contexts';
import {usePro} from 'contexts/ProContext';
import {Section} from 'core-components/section';
import {
  CaptionSourceOptions,
  HoverEffectOptions,
  IJustifiedSettings,
  TitleAlignmentOptions,
  TitlePositionOptions,
  TitleSourceOptions,
  TitleVisibilityOptions,
} from 'data-structures';
import React, {ReactNode} from 'react';
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

interface IJustifiedSettingsProps {
  isLoading?: boolean;
}

const JustifiedSettings: React.FC<IJustifiedSettingsProps> = ({isLoading}) => {
  const {resetTemplate} = useTemplates();
  const {justifiedSettings: value, changeJustifiedSettings: onChange} =
    useSettings();
  const {
    width,
    gap,
    backgroundColor,
    containerPadding,
    padding,
    paddingColor,
    rowHeight,
    borderRadius,
    titleSource,
    titlePosition,
    titleAlignment,
    titleVisibility,
    titleFontFamily,
    titleColor,
    titleFontSize,
    overlayTextBackground,
    invertTextColor,
    hoverEffect,
    showCaption,
    captionSource,
    captionFontSize,
    captionFontColor,
    showTitle,
    captionPosition,
    captionVisibility,
    showVideoCover,
  } = value as IJustifiedSettings;

  const onInputValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();
    key && onChange({...value, [key]: inputValue});
  };

  const renderBasicSettings = (): ReactNode => {
    return (
      <Section
        header={'Basic'}
        body={
          <>
            <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
              <Filter isLoading={isLoading}>
                <SliderControl
                  id={'width'}
                  name="Width (%)"
                  min={10}
                  max={100}
                  value={width}
                  onChange={onInputValueChange}
                />
              </Filter>

              <Filter isLoading={isLoading}>
                <NumberControl
                  id={'rowHeight'}
                  name={'Row height'}
                  value={rowHeight}
                  onChange={onInputValueChange}
                  min={0}
                  unit={'px'}
                />
              </Filter>
            </Grid>
            <ClickActionSettings isLoading={isLoading} />
          </>
        }
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
                </Filter>
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
                  <SliderControl
                    id={'gap'}
                    name={'Spacing (px)'}
                    value={gap}
                    min={0}
                    max={100}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SliderControl
                    id={'padding'}
                    name="Border (px)"
                    min={0}
                    max={100}
                    value={padding}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id={'paddingColor'}
                    name="Border color"
                    value={paddingColor}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SliderControl
                    id={'borderRadius'}
                    name="Border radius (px)"
                    min={0}
                    value={borderRadius}
                    max={50}
                    onChange={onInputValueChange}
                  />
                </Filter>
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
                <Filter isLoading={isLoading}>
                  <SwitchControl
                    id={'showVideoCover'}
                    name={'Show video cover'}
                    value={showVideoCover}
                    tooltip={
                      <p>
                        Enable this to display the cover image for video items,
                        otherwise the video will be shown.
                      </p>
                    }
                    onChange={onInputValueChange}
                  />
                </Filter>
              </Grid>
            </Grid>
          </Grid>
        }
        defaultExpanded={false}
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
                options={TitlePositionOptions}
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

  const {isPro} = usePro();

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
                options={TitlePositionOptions}
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

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      {renderBasicSettings()}
      {renderTitleSection()}
      {renderAdvancedSettings()}
    </Paper>
  );
};

export {JustifiedSettings};
