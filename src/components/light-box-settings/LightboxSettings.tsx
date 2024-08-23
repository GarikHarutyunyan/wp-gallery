import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useSettings} from 'components/settings';
import {useTemplates} from 'contexts/TemplatesContext';
import {Section} from 'core-components';
import {
  ILightboxSettings,
  LightboxCaptionsPosition,
  LightboxCaptionsPositionOptions,
  LightboxImageAnimationOptions,
  LightboxThumbnailsPosition,
  LightboxThumbnailsPositionOptions,
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
import {Filter} from '../settings/Filter';

interface ILightboxSettingsProps {
  isLoading?: boolean;
}

const LightboxSettings: React.FC<ILightboxSettingsProps> = ({isLoading}) => {
  const {resetTemplate} = useTemplates();

  const {lightboxSettings: value, changeLightboxSettings: onChange} =
    useSettings();
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
    captionsPosition,
    captionFontFamily,
    captionColor,
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
                    id={'autoplay'}
                    name={'Autoplay'}
                    value={autoplay}
                    onChange={onInputValueChange}
                  />
                </Filter>
                {(autoplay ||
                  (isSlideshowAllowed && areControlButtonsShown)) && (
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
                <Filter isLoading={isLoading}>
                  <SelectControl
                    id={'captionsPosition'}
                    name={'Caption position'}
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
      {showLightbox && renderFilmstripSettings()}
    </Paper>
  );
};

export {LightboxSettings};
