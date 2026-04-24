import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {usePro} from 'contexts/ProContext';
import {useTemplates} from 'contexts/templates/useTemplates';
import {Section} from 'core-components/section';
import {
  ActionURLSourceOptions,
  CaptionSourceOptions,
  DescriptionPositionOptions,
  DescriptionSourceOptions,
  GalleryType,
  LightboxTextPositionOptions,
  TextsAlignmentOptions,
  ThumbnailTitlePosition,
  ThumbnailTitlePositionOptions,
  TitleAlignmentOptions,
  TitlePositionOptions,
  TitleSourceOptions,
  TitleVisibility,
  TitleVisibilityOptions,
} from 'data-structures';
import React, {useMemo} from 'react';
import {
  ColorControl,
  FontControl,
  ISelectOption,
  NumberControl,
  SelectControl,
  SwitchControl,
  TextControl,
} from '../controls';
import {Filter} from './Filter';
import {useSettings} from './useSettings';

interface TextAndMetadataSettingsProps {
  isLoading: boolean;
  galleryType: GalleryType;
}

export const TextAndMetadataSettings: React.FC<
  TextAndMetadataSettingsProps
> = ({isLoading, galleryType}) => {
  const settingsContext = useSettings();
  const {isPro} = usePro();
  const {resetTemplate} = useTemplates();

  // Map gallery type to correct settings and change function
  const settingsMap: Record<string, {value: any; onChange: any}> = {
    [GalleryType.THUMBNAILS]: {
      value: settingsContext.thumbnailSettings,
      onChange: settingsContext.changeThumbnailSettings,
    },
    [GalleryType.MOSAIC]: {
      value: settingsContext.mosaicSettings,
      onChange: settingsContext.changeMosaicSettings,
    },
    [GalleryType.JUSTIFIED]: {
      value: settingsContext.justifiedSettings,
      onChange: settingsContext.changeJustifiedSettings,
    },
    [GalleryType.MASONRY]: {
      value: settingsContext.masonrySettings,
      onChange: settingsContext.changeMasonrySettings,
    },
    [GalleryType.SLIDESHOW]: {
      value: settingsContext.slideshowSettings,
      onChange: settingsContext.changeSlideshowSettings,
    },
    [GalleryType.CUBE]: {
      value: settingsContext.cubeSettings,
      onChange: settingsContext.changeCubeSettings,
    },
    [GalleryType.CAROUSEL]: {
      value: settingsContext.carouselSettings,
      onChange: settingsContext.changeCarouselSettings,
    },
    [GalleryType.CARDS]: {
      value: settingsContext.cardsSettings,
      onChange: settingsContext.changeCardsSettings,
    },
    [GalleryType.BLOG]: {
      value: settingsContext.blogSettings,
      onChange: settingsContext.changeBlogSettings,
    },
    [GalleryType.COVERFLOW]: {
      value: settingsContext.coverflowSettings,
      onChange: settingsContext.changeCoverflowSettings,
    },
  };

  const selectedSettings = settingsMap[galleryType];
  const value = selectedSettings?.value;
  const onChange = selectedSettings?.onChange;

  // Helper for disabling controls
  const isThumbnailTitlePositionEditable =
    value.borderRadius === undefined || value.borderRadius <= 50;

  const hasDescriptionControls =
    'showDescription' in value &&
    'descriptionSource' in value &&
    'descriptionFontSize' in value;

  const hasButtonControls = 'showButton' in value;
  const hasVisibilityControls = 'titleVisibility' in value;
  const hasTextStyleControls =
    'titleAlignment' in value ||
    'titleFontFamily' in value ||
    'overlayTextBackground' in value ||
    'invertTextColor' in value ||
    'textFontFamily' in value ||
    'textPosition' in value ||
    'textColor' in value ||
    'textBackground' in value ||
    'textVerticalAlignment' in value;

  const usesLightboxTextLayout = galleryType === GalleryType.SLIDESHOW;
  const usesThumbnailPositionLayout = [
    GalleryType.THUMBNAILS,
    GalleryType.CUBE,
    GalleryType.CAROUSEL,
    GalleryType.CARDS,
    GalleryType.COVERFLOW,
  ].includes(galleryType);

  const titlePositionOptions = usesLightboxTextLayout
    ? LightboxTextPositionOptions
    : usesThumbnailPositionLayout
    ? ThumbnailTitlePositionOptions
    : TitlePositionOptions;

  const thumbnailTitlePositionOptions: ISelectOption[] = useMemo(() => {
    if (
      !value ||
      !onChange ||
      galleryType !== GalleryType.THUMBNAILS ||
      !('titleVisibility' in value) ||
      !('titlePosition' in value)
    ) {
      return titlePositionOptions;
    }

    let options = [...ThumbnailTitlePositionOptions];

    if (value.titleVisibility === TitleVisibility.ON_HOVER) {
      options = options.filter(
        (option) =>
          option.value !== ThumbnailTitlePosition.BELOW &&
          option.value !== ThumbnailTitlePosition.ABOVE
      );

      if (value.titlePosition === ThumbnailTitlePosition.BELOW) {
        onChange({...value, titlePosition: ThumbnailTitlePosition.BOTTOM});
      }

      if (value.titlePosition === ThumbnailTitlePosition.ABOVE) {
        onChange({...value, titlePosition: ThumbnailTitlePosition.TOP});
      }
    }

    return options;
  }, [galleryType, onChange, titlePositionOptions, value]);

  const thumbnailButtonPositionOptions: ISelectOption[] = useMemo(() => {
    if (
      !value ||
      !onChange ||
      galleryType !== GalleryType.THUMBNAILS ||
      !('buttonVisibility' in value) ||
      !('buttonPosition' in value)
    ) {
      return titlePositionOptions;
    }

    let options = [...ThumbnailTitlePositionOptions];

    if (value.buttonVisibility === TitleVisibility.ON_HOVER) {
      options = options.filter(
        (option) =>
          option.value !== ThumbnailTitlePosition.BELOW &&
          option.value !== ThumbnailTitlePosition.ABOVE
      );

      if (value.buttonPosition === ThumbnailTitlePosition.BELOW) {
        onChange({...value, buttonPosition: ThumbnailTitlePosition.BOTTOM});
      }

      if (value.buttonPosition === ThumbnailTitlePosition.ABOVE) {
        onChange({...value, buttonPosition: ThumbnailTitlePosition.TOP});
      }
    }

    return options;
  }, [galleryType, onChange, titlePositionOptions, value]);

  if (!value || !onChange) return null;

  const fontUnit = usesLightboxTextLayout ? 'vw' : 'px';

  const onInputValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();
    key && onChange({...value, [key]: inputValue});
  };

  const renderTitleControls = () => (
    <Section
      header={'Title'}
      className="reacg-tab-section"
      body={
        <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
          <Filter isLoading={isLoading}>
            <SwitchControl
              id={'showTitle'}
              name={'Show title'}
              value={value.showTitle}
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
          {value.showTitle && (
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'titleSource'}
                name={'Source'}
                value={value.titleSource}
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
          {value.showTitle && (
            <Grid
              sx={{marginLeft: 0, paddingTop: 2}}
              container
              columns={24}
              rowSpacing={2}
              columnSpacing={4}
            >
              {'titleVisibility' in value ? (
                <Filter isLoading={isLoading}>
                  <SelectControl
                    id={'titleVisibility'}
                    name={'Visibility'}
                    value={value.titleVisibility}
                    options={TitleVisibilityOptions}
                    onChange={onInputValueChange}
                    isDisabled={!isThumbnailTitlePositionEditable}
                  />
                </Filter>
              ) : null}
              {'titlePosition' in value ? (
                <Filter isLoading={isLoading}>
                  <SelectControl
                    id={'titlePosition'}
                    name={'Position'}
                    value={value.titlePosition}
                    options={thumbnailTitlePositionOptions}
                    onChange={onInputValueChange}
                    isDisabled={
                      hasVisibilityControls
                        ? !isThumbnailTitlePositionEditable
                        : false
                    }
                  />
                </Filter>
              ) : null}
              <Filter isLoading={isLoading}>
                <NumberControl
                  id={'titleFontSize'}
                  name={'Font size'}
                  value={value.titleFontSize}
                  onChange={onInputValueChange}
                  unit={fontUnit}
                  max={usesLightboxTextLayout ? 5 : undefined}
                  step={usesLightboxTextLayout ? 0.1 : undefined}
                />
              </Filter>
              {'titleColor' in value ? (
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id={'titleColor'}
                    name={'Color'}
                    value={value.titleColor}
                    onChange={onInputValueChange}
                  />
                </Filter>
              ) : null}
            </Grid>
          )}
        </Grid>
      }
    />
  );

  const renderCaptionControls = () => (
    <Section
      header={'Caption'}
      className="reacg-tab-section"
      body={
        <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
          <Filter isLoading={isLoading}>
            <SwitchControl
              id={'showCaption'}
              name={'Show caption'}
              value={value.showCaption}
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
          {value.showCaption && (
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'captionSource'}
                name={'Source'}
                value={value.captionSource}
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
          {value.showCaption && (
            <Grid
              sx={{marginLeft: 0, paddingTop: 2}}
              container
              columns={24}
              rowSpacing={2}
              columnSpacing={4}
            >
              {'captionVisibility' in value ? (
                <Filter isLoading={isLoading}>
                  <SelectControl
                    id={'captionVisibility'}
                    name={'Visibility'}
                    value={value.captionVisibility}
                    options={TitleVisibilityOptions}
                    onChange={onInputValueChange}
                    isDisabled={!isThumbnailTitlePositionEditable}
                  />
                </Filter>
              ) : null}
              {'captionPosition' in value ? (
                <Filter isLoading={isLoading}>
                  <SelectControl
                    id={'captionPosition'}
                    name={'Position'}
                    value={value.captionPosition}
                    options={titlePositionOptions}
                    onChange={onInputValueChange}
                    isDisabled={
                      hasVisibilityControls
                        ? !isThumbnailTitlePositionEditable
                        : false
                    }
                  />
                </Filter>
              ) : null}
              <Filter isLoading={isLoading}>
                <NumberControl
                  id={'captionFontSize'}
                  name={'Font size'}
                  value={value.captionFontSize}
                  onChange={onInputValueChange}
                  unit={fontUnit}
                  max={usesLightboxTextLayout ? 5 : undefined}
                  step={usesLightboxTextLayout ? 0.1 : undefined}
                />
              </Filter>
              {'captionFontColor' in value ? (
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id={'captionFontColor'}
                    name={'Color'}
                    value={value.captionFontColor}
                    onChange={onInputValueChange}
                  />
                </Filter>
              ) : 'captionColor' in value ? (
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id={'captionColor'}
                    name={'Color'}
                    value={value.captionColor}
                    onChange={onInputValueChange}
                  />
                </Filter>
              ) : null}
            </Grid>
          )}
        </Grid>
      }
    />
  );

  const renderDescriptionControls = () => (
    <Section
      header={'Description'}
      className="reacg-tab-section"
      body={
        <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
          <Filter isLoading={isLoading}>
            <SwitchControl
              id={'showDescription'}
              name={'Show description'}
              value={value.showDescription}
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
                        utm_medium: 'show_description',
                      })
              }
            />
          </Filter>
          {value.showDescription && (
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'descriptionSource'}
                name={'Source'}
                value={value.descriptionSource}
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
          {value.showDescription && (
            <Grid
              sx={{marginLeft: 0, paddingTop: 2}}
              container
              columns={24}
              rowSpacing={2}
              columnSpacing={4}
            >
              {'descriptionPosition' in value ? (
                <Filter isLoading={isLoading}>
                  <SelectControl
                    id={'descriptionPosition'}
                    name={'Position'}
                    value={value.descriptionPosition}
                    options={
                      usesLightboxTextLayout
                        ? LightboxTextPositionOptions
                        : DescriptionPositionOptions
                    }
                    onChange={onInputValueChange}
                  />
                </Filter>
              ) : null}
              <Filter isLoading={isLoading}>
                <NumberControl
                  id={'descriptionFontSize'}
                  name={'Font size'}
                  value={value.descriptionFontSize}
                  onChange={onInputValueChange}
                  unit={fontUnit}
                  max={usesLightboxTextLayout ? 5 : undefined}
                  step={usesLightboxTextLayout ? 0.1 : undefined}
                />
              </Filter>
              {'descriptionFontColor' in value ? (
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id={'descriptionFontColor'}
                    name={'Color'}
                    value={value.descriptionFontColor}
                    onChange={onInputValueChange}
                  />
                </Filter>
              ) : 'descriptionColor' in value ? (
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id={'descriptionColor'}
                    name={'Color'}
                    value={value.descriptionColor}
                    onChange={onInputValueChange}
                  />
                </Filter>
              ) : null}
              {'descriptionMaxRowsCount' in value ? (
                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'descriptionMaxRowsCount'}
                    name={'Max rows count'}
                    value={value.descriptionMaxRowsCount}
                    onChange={onInputValueChange}
                    min={1}
                  />
                </Filter>
              ) : null}
            </Grid>
          )}
        </Grid>
      }
    />
  );

  const renderButtonControls = () => (
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
              value={value.showButton}
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
          {value.showButton && (
            <>
              <Filter isLoading={isLoading}>
                <SelectControl
                  id={'buttonUrlSource'}
                  name={'URL source'}
                  value={value.buttonUrlSource}
                  options={ActionURLSourceOptions}
                  onChange={onInputValueChange}
                />
              </Filter>
              <Filter isLoading={isLoading}>
                <SwitchControl
                  id={'openInNewTab'}
                  name={'Open in new tab'}
                  value={value.openInNewTab}
                  onChange={onInputValueChange}
                />
              </Filter>
            </>
          )}
          {value.showButton && (
            <Grid
              sx={{marginLeft: 0, paddingTop: 2}}
              container
              columns={24}
              rowSpacing={2}
              columnSpacing={4}
            >
              {'buttonVisibility' in value ? (
                <Filter isLoading={isLoading}>
                  <SelectControl
                    id={'buttonVisibility'}
                    name={'Visibility'}
                    value={value.buttonVisibility}
                    options={TitleVisibilityOptions}
                    onChange={onInputValueChange}
                    isDisabled={!isThumbnailTitlePositionEditable}
                  />
                </Filter>
              ) : null}
              {'buttonPosition' in value ? (
                <Filter isLoading={isLoading}>
                  <SelectControl
                    id={'buttonPosition'}
                    name={'Position'}
                    value={value.buttonPosition}
                    options={thumbnailButtonPositionOptions}
                    onChange={onInputValueChange}
                    isDisabled={
                      hasVisibilityControls
                        ? !isThumbnailTitlePositionEditable
                        : false
                    }
                  />
                </Filter>
              ) : null}
              <Filter isLoading={isLoading}>
                <NumberControl
                  id={'buttonFontSize'}
                  name={'Font size'}
                  value={value.buttonFontSize}
                  onChange={onInputValueChange}
                  unit={fontUnit}
                  max={usesLightboxTextLayout ? 5 : undefined}
                  step={usesLightboxTextLayout ? 0.1 : undefined}
                />
              </Filter>
              {'buttonTextColor' in value ? (
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id={'buttonTextColor'}
                    name={'Text color'}
                    value={value.buttonTextColor}
                    onChange={onInputValueChange}
                  />
                </Filter>
              ) : null}
              {'buttonAlignment' in value ? (
                <Filter isLoading={isLoading}>
                  <SelectControl
                    id={'buttonAlignment'}
                    name={'Alignment'}
                    value={value.buttonAlignment}
                    options={TitleAlignmentOptions}
                    onChange={onInputValueChange}
                  />
                </Filter>
              ) : null}
              {'buttonColor' in value ? (
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id={'buttonColor'}
                    name={'Button color'}
                    value={value.buttonColor}
                    onChange={onInputValueChange}
                  />
                </Filter>
              ) : null}
              {'buttonText' in value ? (
                <Filter isLoading={isLoading}>
                  <TextControl
                    id={'buttonText'}
                    name={'Button text'}
                    value={value.buttonText}
                    placeholder={(window as any).reacg_global?.text?.view_more}
                    onChange={onInputValueChange}
                  />
                </Filter>
              ) : null}
              {'buttonBorderSize' in value ? (
                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'buttonBorderSize'}
                    name={'Border'}
                    value={value.buttonBorderSize}
                    onChange={onInputValueChange}
                    min={0}
                    unit={'px'}
                  />
                </Filter>
              ) : null}
              {'buttonBorderColor' in value ? (
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id={'buttonBorderColor'}
                    name={'Border color'}
                    value={value.buttonBorderColor}
                    onChange={onInputValueChange}
                  />
                </Filter>
              ) : null}
              {'buttonBorderRadius' in value ? (
                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'buttonBorderRadius'}
                    name={'Border radius'}
                    value={value.buttonBorderRadius}
                    onChange={onInputValueChange}
                    min={0}
                    unit={'px'}
                  />
                </Filter>
              ) : null}
            </Grid>
          )}
        </Grid>
      }
    />
  );

  const renderSharedTextStyleControls = () => {
    const isAnyVisible =
      value.showTitle ||
      value.showCaption ||
      (hasDescriptionControls && value.showDescription) ||
      (hasButtonControls && value.showButton);

    if (!hasTextStyleControls || !isAnyVisible) {
      return null;
    }

    return (
      <Section
        header={'Text styles'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            {'titleAlignment' in value ? (
              <Filter isLoading={isLoading}>
                <SelectControl
                  id={'titleAlignment'}
                  name={'Alignment'}
                  value={value.titleAlignment}
                  options={TitleAlignmentOptions}
                  onChange={onInputValueChange}
                />
              </Filter>
            ) : null}
            {'titleFontFamily' in value ? (
              <Filter isLoading={isLoading}>
                <FontControl
                  id={'titleFontFamily'}
                  name={'Font family'}
                  value={value.titleFontFamily}
                  onChange={onInputValueChange}
                />
              </Filter>
            ) : null}
            {'textPosition' in value ? (
              <Filter isLoading={isLoading}>
                <SelectControl
                  id={'textPosition'}
                  name={'Position'}
                  value={value.textPosition}
                  options={LightboxTextPositionOptions}
                  onChange={onInputValueChange}
                />
              </Filter>
            ) : null}
            {'textFontFamily' in value ? (
              <Filter isLoading={isLoading}>
                <FontControl
                  id={'textFontFamily'}
                  name={'Font family'}
                  value={value.textFontFamily}
                  onChange={onInputValueChange}
                />
              </Filter>
            ) : null}
            {'textVerticalAlignment' in value ? (
              <Filter isLoading={isLoading}>
                <SelectControl
                  id={'textVerticalAlignment'}
                  name={'Vertical alignment'}
                  value={value.textVerticalAlignment}
                  options={TextsAlignmentOptions}
                  onChange={onInputValueChange}
                />
              </Filter>
            ) : null}
            {'textHorizontalSpacing' in value ? (
              <Filter isLoading={isLoading}>
                <NumberControl
                  id={'textHorizontalSpacing'}
                  name={'Horizontal spacing'}
                  value={value.textHorizontalSpacing}
                  onChange={onInputValueChange}
                  min={0}
                  unit={'px'}
                />
              </Filter>
            ) : null}
            {'textVerticalSpacing' in value ? (
              <Filter isLoading={isLoading}>
                <NumberControl
                  id={'textVerticalSpacing'}
                  name={'Vertical spacing'}
                  value={value.textVerticalSpacing}
                  onChange={onInputValueChange}
                  min={0}
                  unit={'px'}
                />
              </Filter>
            ) : null}
            {'textColor' in value ? (
              <Filter isLoading={isLoading}>
                <ColorControl
                  id={'textColor'}
                  name={'Color'}
                  value={value.textColor}
                  onChange={onInputValueChange}
                />
              </Filter>
            ) : null}
            {'textBackground' in value ? (
              <Filter isLoading={isLoading}>
                <ColorControl
                  id={'textBackground'}
                  name={'Text background'}
                  value={value.textBackground}
                  onChange={onInputValueChange}
                  tooltip={
                    <p>
                      Set a background color for text displayed on the image.
                    </p>
                  }
                />
              </Filter>
            ) : null}
            {'overlayTextBackground' in value ? (
              <Filter isLoading={isLoading}>
                <ColorControl
                  id={'overlayTextBackground'}
                  name={'Overlay text background'}
                  value={value.overlayTextBackground}
                  onChange={onInputValueChange}
                  tooltip={
                    <p>
                      Set a background color for text displayed on the image.
                    </p>
                  }
                />
              </Filter>
            ) : null}
            {'invertTextColor' in value ? (
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
                  value={value.invertTextColor}
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
            ) : null}
          </Grid>
        }
      />
    );
  };

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      {renderTitleControls()}
      {renderCaptionControls()}
      {hasDescriptionControls ? renderDescriptionControls() : null}
      {hasButtonControls ? renderButtonControls() : null}
      {renderSharedTextStyleControls()}
    </Paper>
  );
};
