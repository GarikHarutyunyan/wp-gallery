import React, {ReactNode} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Filter} from '../settings/Filter';
import {
  LightboxThumbnailsPosition,
  LightboxThumbnailsPositionOptions,
} from 'data-structures';
import {
  ColorControl,
  NumberControl,
  SelectControl,
  SliderControl,
  SwitchControl,
} from '../controls';
import {Section} from 'core-components';

interface ILightboxSettings {
  areControlButtonsShown: boolean;
  isInfinite: boolean;
  padding: number;
  canDownload: boolean;
  canZoom: boolean;
  isSlideshowAllowed: boolean;
  isFullscreenAllowed: boolean;
  thumbnailsPosition: LightboxThumbnailsPosition;
  thumbnailWidth: number;
  thumbnailHeight: number;
  thumbnailBorder: number;
  thumbnailBorderColor: string;
  thumbnailBorderRadius: number;
  thumbnailPadding: number;
  thumbnailGap: number;
  isThumbnailsToggleShown: boolean; // need?
}

interface ILightboxSettingsProps {
  value: ILightboxSettings;
  onChange: (newSettings: ILightboxSettings) => void;
  isLoading?: boolean;
}

const LightboxSettings: React.FC<ILightboxSettingsProps> = ({
  value,
  onChange,
  isLoading,
}) => {
  const {
    areControlButtonsShown,
    isInfinite,
    padding,
    canDownload,
    canZoom,
    isSlideshowAllowed,
    isFullscreenAllowed,
    thumbnailsPosition,
    thumbnailWidth,
    thumbnailHeight,
    thumbnailBorder,
    thumbnailBorderColor,
    thumbnailBorderRadius,
    thumbnailPadding,
    thumbnailGap,
    isThumbnailsToggleShown,
  } = value;

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
              <SwitchControl
                id={'areControlButtonsShown'}
                name={'Show control buttons'}
                value={areControlButtonsShown}
                onChange={onInputValueChange}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'isInfinite'}
                name={'Infinite'}
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
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'isSlideshowAllowed'}
                name={'Slideshow'}
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
          </Grid>
        }
        canExpand={true}
      ></Section>
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
                name={'position'}
                value={thumbnailsPosition}
                options={LightboxThumbnailsPositionOptions}
                onChange={onInputValueChange}
              />
            </Filter>
            {thumbnailsPosition !== LightboxThumbnailsPosition.NONE && (
              <>
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
                    id={'thumbnailBorder'}
                    name="Border (px)"
                    min={0}
                    max={100}
                    value={thumbnailBorder}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SliderControl
                    id={'thumbnailBorderRadius'}
                    name="Radius (%)"
                    min={0}
                    value={thumbnailBorderRadius}
                    max={50}
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
                    id={'thumbnailGap'}
                    name="Gap (px)"
                    min={0}
                    max={100}
                    value={thumbnailGap}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SwitchControl
                    id={'isThumbnailsToggleShown'}
                    name={'Show toggle'}
                    value={isThumbnailsToggleShown}
                    onChange={onInputValueChange}
                  />
                </Filter>
              </>
            )}
          </Grid>
        }
        canExpand={true}
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

export {LightboxSettings, type ILightboxSettings};
