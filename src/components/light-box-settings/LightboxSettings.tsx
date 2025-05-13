import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useSettings } from 'components/settings';
import { useTemplates } from 'contexts';
import { Section } from 'core-components/section';
import {
  ILightboxSettings,
  LightboxImageAnimationOptions,
  LightboxTextsPosition,
  LightboxTextsPositionOptions,
  LightboxThumbnailsPosition,
  LightboxThumbnailsPositionOptions,
  TitleAlignmentOptions,
} from 'data-structures';
import React, { ReactNode } from 'react';
import {
  ColorControl,
  FontControl,
  NumberControl,
  SelectControl,
  SliderControl,
  SwitchControl,
} from '../controls';
import { Filter } from '../settings/Filter';

interface ILightboxSettingsProps {
  isLoading?: boolean;
}

const LightboxSettings: React.FC<ILightboxSettingsProps> = ({isLoading}) => {
  const {resetTemplate} = useTemplates();

  const {lightboxSettings: value, changeLightboxSettings: onChange} =
    useSettings();
  const {
    isFullscreen,
    width,
    height,
    areControlButtonsShown,
    isInfinite,
    padding,
    canDownload,
    canZoom,
    isSlideshowAllowed,
    autoplay,
    slideDuration,
    imageAnimation,
    isFullscreenAllowed,
    thumbnailsPosition,
    thumbnailWidth,
    thumbnailHeight,
    thumbnailBorder,
    thumbnailBorderColor,
    thumbnailBorderRadius,
    thumbnailPadding,
    thumbnailGap,
    backgroundColor,
    textPosition,
    textFontFamily,
    textColor,
    showTitle,
    titleFontSize,
    titleAlignment,
    showDescription,
    descriptionFontSize,
    descriptionMaxRowsCount,
  } = value as ILightboxSettings;

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
              <SwitchControl
                id={'isFullscreen'}
                name={'Full width'}
                value={isFullscreen}
                onChange={onInputValueChange}
              />
            </Filter>
            {!isFullscreen && (
              <>
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
              </>
            )}
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'autoplay'}
                name={'Autoplay'}
                value={autoplay}
                onChange={onInputValueChange}
              />
            </Filter>
            {(autoplay || (isSlideshowAllowed && areControlButtonsShown)) && (
              <Filter isLoading={isLoading}>
                <NumberControl
                  id={'slideDuration'}
                  name={'Time interval'}
                  value={slideDuration}
                  onChange={onInputValueChange}
                  min={700}
                  unit={'ms'}
                />
              </Filter>
            )}
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'imageAnimation'}
                name={'Animation'}
                value={imageAnimation}
                options={LightboxImageAnimationOptions}
                onChange={onInputValueChange}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'areControlButtonsShown'}
                name={'Show control buttons'}
                value={areControlButtonsShown}
                onChange={onInputValueChange}
              />
            </Filter>

            {areControlButtonsShown && (
              <>
                <Filter isLoading={isLoading}>
                  <SwitchControl
                    id={'isSlideshowAllowed'}
                    name={'Play / Pause'}
                    value={isSlideshowAllowed}
                    onChange={onInputValueChange}
                  />
                </Filter>

                <Filter isLoading={isLoading}>
                  <SwitchControl
                    id={'isFullscreenAllowed'}
                    name={'Fullscreen'}
                    value={isFullscreenAllowed}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SwitchControl
                    id={'canDownload'}
                    name={'Download'}
                    value={canDownload}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SwitchControl
                    id={'canZoom'}
                    name={'Zoom'}
                    value={canZoom}
                    onChange={onInputValueChange}
                  />
                </Filter>
              </>
            )}
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
            <Grid
              sx={{marginLeft: 0, paddingTop: 2}}
              container
              columns={24}
              rowSpacing={2}
              columnSpacing={4}
            >
              <Filter isLoading={isLoading}>
                <SelectControl
                  id={'textPosition'}
                  name={'Text position'}
                  value={textPosition}
                  options={LightboxTextsPositionOptions}
                  onChange={onInputValueChange}
                />
              </Filter>
              {textPosition !== LightboxTextsPosition.NONE && (
                <>
                  <Filter isLoading={isLoading}>
                    <FontControl
                      id={'textFontFamily'}
                      name={'Text font family'}
                      value={textFontFamily}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <ColorControl
                      id={'textColor'}
                      name="Text color"
                      value={textColor}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                </>
              )}
            </Grid>

            {textPosition !== LightboxTextsPosition.NONE && (
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
                    onChange={onInputValueChange}
                  />
                </Filter>
                {showTitle && (
                  <>
                    <Filter isLoading={isLoading}>
                      <NumberControl
                        id={'titleFontSize'}
                        name={'Title font size'}
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
                        name={'Title alignement'}
                        value={titleAlignment}
                        options={TitleAlignmentOptions}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                  </>
                )}
              </Grid>
            )}
            {textPosition !== LightboxTextsPosition.NONE && (
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
                    onChange={onInputValueChange}
                  />
                </Filter>
                {showDescription && (
                  <>
                    <Filter isLoading={isLoading}>
                      <NumberControl
                        id={'descriptionFontSize'}
                        name={'Description font size'}
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
                        name={'Description max rows count'}
                        value={descriptionMaxRowsCount}
                        onChange={onInputValueChange}
                        min={1}
                      />
                    </Filter>
                  </>
                )}
              </Grid>
            )}
          </Grid>
        }
      />
    );
  };

  const renderFilmstripSettings = (): ReactNode => {
    return (
      <Section
        header={'Filmstrip'}
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'thumbnailsPosition'}
                name={'Position'}
                value={thumbnailsPosition}
                options={LightboxThumbnailsPositionOptions}
                onChange={onInputValueChange}
              />
            </Filter>
            {thumbnailsPosition !== LightboxThumbnailsPosition.NONE && (
              <>
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
                  <SliderControl
                    id={'thumbnailGap'}
                    name="Gap (px)"
                    min={0}
                    max={100}
                    value={thumbnailGap}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SliderControl
                    id={'thumbnailPadding'}
                    name="Distance (px)"
                    min={0}
                    max={100}
                    value={thumbnailPadding}
                    onChange={onInputValueChange}
                  />
                </Filter>
              </>
            )}
          </Grid>
        }
      />
    );
  };

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      {renderMainSettings()}
      {renderFilmstripSettings()}
    </Paper>
  );
};

export { LightboxSettings };

