import React, {ReactNode} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Filter} from '../settings/Filter';
import {
  LightboxCaptionsPosition,
  LightboxCaptionsPositionOptions,
  LightboxThumbnailsPosition,
  LightboxThumbnailsPositionOptions,
} from 'data-structures';
import {
  ColorControl,
  FontControl,
  NumberControl,
  SelectControl,
  SliderControl,
  SwitchControl,
} from '../controls';
import {Section} from 'core-components';

interface ILightboxSettings {
  showLightbox: boolean;
  isFullscreen: boolean;
  width: number;
  height: number;
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
  captionsPosition: LightboxCaptionsPosition;
  captionFontFamily: string;
  captionColor: string;
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
    showLightbox,
    isFullscreen,
    width,
    height,
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
    captionsPosition,
    captionFontFamily,
    captionColor,
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
                id={'showLightbox'}
                name={'Use lightbox'}
                value={showLightbox}
                onChange={onInputValueChange}
              />
            </Filter>
            {showLightbox && (
              <>
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
                {areControlButtonsShown && (
                  <>
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
                  </>
                )}
                <Filter isLoading={isLoading}>
                  <SelectControl
                    id={'captionsPosition'}
                    name={'Captions position'}
                    value={captionsPosition}
                    options={LightboxCaptionsPositionOptions}
                    onChange={onInputValueChange}
                  />
                </Filter>
                {captionsPosition !== LightboxCaptionsPosition.NONE && (
                  <>
                    <Filter isLoading={isLoading}>
                      <FontControl
                        id={'captionFontFamily'}
                        name={'Caption font family'}
                        value={captionFontFamily}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <ColorControl
                        id={'captionColor'}
                        name="Caption color"
                        value={captionColor}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                  </>
                )}
              </>
            )}
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
      {showLightbox && renderFilmstripSettings()}
    </Paper>
  );
};

export {LightboxSettings, type ILightboxSettings};
