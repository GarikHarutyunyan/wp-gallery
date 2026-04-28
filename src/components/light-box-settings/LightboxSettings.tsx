import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useSettings} from 'components/settings';
import {useTemplates} from 'contexts';
import {usePro} from 'contexts/ProContext';
import {Section} from 'core-components/section';
import {
  ActionURLSourceOptions,
  CaptionSourceOptions,
  DescriptionSourceOptions,
  ILightboxSettings,
  LightboxImageAnimationOptions,
  LightboxTextPositionOptions,
  LightboxThumbnailsPosition,
  LightboxThumbnailsPositionOptions,
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
  TextControl,
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
    isFullscreen,
    width,
    height,
    areControlButtonsShown,
    isInfinite,
    padding,
    showCounter,
    canShare,
    canDownload,
    canZoom,
    isSlideshowAllowed,
    autoplay,
    slideDuration,
    imageAnimation,
    canFullscreen,
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
    showButton,
    buttonText,
    buttonAlignment,
    buttonColor,
    buttonTextColor,
    buttonFontSize,
    buttonBorderSize,
    buttonBorderColor,
    buttonBorderRadius,
    buttonUrlSource,
    openInNewTab,
  } = value as ILightboxSettings;

  const onInputValueChange = (inputValue: unknown, key?: string) => {
    resetTemplate?.();
    key && onChange?.({...value, [key]: inputValue} as any);
  };

  const renderMainSettings = (): ReactNode => {
    return (
      <Section
        header={'Layout Settings'}
        className="reacg-tab-section"
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
              <SelectControl
                id={'imageAnimation'}
                name={'Animation'}
                pro={true}
                value={imageAnimation}
                options={LightboxImageAnimationOptions}
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
              <SwitchControl
                id={'isSlideshowAllowed'}
                name={'Play / Pause button'}
                value={isSlideshowAllowed}
                onChange={onInputValueChange}
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
            {(autoplay || (isSlideshowAllowed && areControlButtonsShown)) && (
              <Filter isLoading={isLoading}>
                <NumberControl
                  id={'slideDuration'}
                  name={'Autoplay speed'}
                  value={slideDuration}
                  onChange={onInputValueChange}
                  min={700}
                  unit={'ms'}
                />
              </Filter>
            )}
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
                    id={'canFullscreen'}
                    name={'Fullscreen button'}
                    value={canFullscreen}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SwitchControl
                    id={'canShare'}
                    name={'Share button'}
                    pro={true}
                    value={canShare}
                    onChange={
                      isPro
                        ? onInputValueChange
                        : () =>
                            (window as any).reacg_open_premium_offer_dialog({
                              utm_medium: 'lightbox_share',
                            })
                    }
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SwitchControl
                    id={'canDownload'}
                    name={'Download button'}
                    pro={true}
                    value={canDownload}
                    onChange={
                      isPro
                        ? onInputValueChange
                        : () =>
                            (window as any).reacg_open_premium_offer_dialog({
                              utm_medium: 'lightbox_download',
                            })
                    }
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SwitchControl
                    id={'canZoom'}
                    name={'Zoom button'}
                    value={canZoom}
                    pro={true}
                    onChange={
                      isPro
                        ? onInputValueChange
                        : () =>
                            (window as any).reacg_open_premium_offer_dialog({
                              utm_medium: 'lightbox_zoom',
                            })
                    }
                  />
                </Filter>
              </>
            )}
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'isInfinite'}
                name={'Loop'}
                value={isInfinite}
                pro={true}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'lightbox_loop',
                        })
                }
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'showCounter'}
                name={'Counter'}
                pro={true}
                value={showCounter}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'lightbox_counter',
                        })
                }
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
        }
      />
    );
  };

  const renderFilmstripSettings = (): ReactNode => {
    return (
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
                pro={true}
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
        defaultExpanded={true}
      />
    );
  };

  const {isPro} = usePro();

  const renderTitleSection = (): ReactNode => {
    return (
      <Section
        header={'Title'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'showTitle'}
                name={'Show title'}
                value={showTitle}
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
            {showTitle && (
              <Grid
                sx={{marginLeft: 0, paddingTop: 2}}
                container
                columns={24}
                rowSpacing={2}
                columnSpacing={4}
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
        }
        defaultExpanded={true}
      />
    );
  };

  const renderCaptionSection = (): ReactNode => {
    return (
      <Section
        header={'Caption'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
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
                          utm_medium: 'lightbox_caption',
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
            {showCaption && (
              <Grid
                sx={{marginLeft: 0, paddingTop: 2}}
                container
                columns={24}
                rowSpacing={2}
                columnSpacing={4}
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
        }
        defaultExpanded={true}
      />
    );
  };

  const renderDescriptionSection = (): ReactNode => {
    return (
      <Section
        header={'Description'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'showDescription'}
                name={'Show description'}
                value={showDescription}
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
                pro={true}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'lightbox_description',
                        })
                }
              />
            </Filter>
            {showDescription && (
              <Filter isLoading={isLoading}>
                <SelectControl
                  id={'descriptionSource'}
                  name={'Source'}
                  value={descriptionSource}
                  options={DescriptionSourceOptions}
                  onChange={(inputValue: any) => {
                    if (
                      !isPro &&
                      DescriptionSourceOptions.find(
                        (option) => option.value === inputValue
                      )?.isPro
                    ) {
                      (window as any).reacg_open_premium_offer_dialog({
                        utm_medium: 'descriptionSource',
                      });
                    } else {
                      onInputValueChange(inputValue, 'descriptionSource');
                    }
                  }}
                />
              </Filter>
            )}
            {showDescription && (
              <Grid
                sx={{marginLeft: 0, paddingTop: 2}}
                container
                columns={24}
                rowSpacing={2}
                columnSpacing={4}
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
        }
        defaultExpanded={true}
      />
    );
  };

  const renderButtonSection = (): ReactNode => {
    return (
      <Section
        header={'Button'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'showButton'}
                name={'Show button'}
                pro={true}
                value={showButton}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'show_button',
                        })
                }
              />
            </Filter>
            {showButton && (
              <>
                <Filter isLoading={isLoading}>
                  <SelectControl
                    id={'buttonUrlSource'}
                    name={'URL source'}
                    value={buttonUrlSource}
                    options={ActionURLSourceOptions}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SwitchControl
                    id={'openInNewTab'}
                    name={'Open in new tab'}
                    value={openInNewTab}
                    onChange={onInputValueChange}
                  />
                </Filter>
              </>
            )}
            {showButton && (
              <Grid
                sx={{marginLeft: 0, paddingTop: 2}}
                container
                columns={24}
                rowSpacing={2}
                columnSpacing={4}
              >
                <Filter isLoading={isLoading}>
                  <SelectControl
                    id={'buttonAlignment'}
                    name={'Alignment'}
                    value={buttonAlignment}
                    options={TitleAlignmentOptions}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id={'buttonColor'}
                    name="Button color"
                    value={buttonColor}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'buttonFontSize'}
                    name={'Font size'}
                    value={buttonFontSize}
                    onChange={onInputValueChange}
                    unit={'vw'}
                    max={5}
                    step={0.1}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id={'buttonTextColor'}
                    name="Text color"
                    value={buttonTextColor}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <TextControl
                    id={'buttonText'}
                    name="Button text"
                    value={buttonText}
                    placeholder={(window as any).reacg_global?.text?.view_more}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'buttonBorderSize'}
                    name={'Border'}
                    value={buttonBorderSize}
                    onChange={onInputValueChange}
                    min={0}
                    unit={'px'}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id={'buttonBorderColor'}
                    name={'Border color'}
                    value={buttonBorderColor}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'buttonBorderRadius'}
                    name={'Border radius'}
                    value={buttonBorderRadius}
                    onChange={onInputValueChange}
                    min={0}
                    unit={'px'}
                  />
                </Filter>
              </Grid>
            )}
          </Grid>
        }
        defaultExpanded={true}
      />
    );
  };

  const renderTextSection = (): ReactNode => {
    return (
      <Section
        header={'Typography'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'textPosition'}
                name={'Position'}
                value={textPosition}
                options={LightboxTextPositionOptions}
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
                  <p>Set a background color for text displayed on the image.</p>
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
                    Enable this to invert the text color dynamically, ensuring
                    it stays visible against any background.
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
        }
        defaultExpanded={true}
      />
    );
  };

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      {renderMainSettings()}
      {renderTitleSection()}
      {renderCaptionSection()}
      {renderDescriptionSection()}
      {renderButtonSection()}
      {(showTitle || showCaption || showDescription || showButton) &&
        renderTextSection()}
      {renderFilmstripSettings()}
    </Paper>
  );
};

export {LightboxSettings};
