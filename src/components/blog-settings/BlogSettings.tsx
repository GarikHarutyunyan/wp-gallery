import {InputLabel} from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
import {useSettings} from 'components/settings';
import {useTemplates} from 'contexts';
import {Section} from 'core-components/section';
import {
  ActionURLSourceOptions,
  BlogViewImagePositionOptions,
  CaptionSourceOptions,
  DescriptionSourceOptions,
  HoverEffectOptions,
  IBlogSettings,
  SizeTypeHeightOptions,
  SizeTypeWidthOptions,
  TextsAlignmentOptions,
  TitleAlignmentOptions,
  TitleSourceOptions,
} from 'data-structures';
import {LabelWithTooltip} from '../controls/LabelWithTooltip';

import {usePro} from 'contexts/ProContext';
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

interface IBlogSettingsProps {
  isLoading?: boolean;
}

const BlogSettings: React.FC<IBlogSettingsProps> = ({isLoading}) => {
  const {resetTemplate} = useTemplates();
  const {blogSettings: value, changeBlogSettings: onChange} = useSettings();
  const {
    imageWidth,
    imageHeight,
    spacing,
    backgroundColor,
    containerPadding,
    imageRadius,
    hoverEffect,
    textVerticalAlignment,
    textFontFamily,
    titleColor,
    descriptionColor,
    titleSource,
    descriptionSource,
    titleFontSize,
    descriptionFontSize,
    imageHeightType,
    imageWidthType,
    buttonText,
    buttonAlignment,
    buttonColor,
    buttonTextColor,
    buttonFontSize,
    showTitle,
    titleAlignment,
    showDescription,
    showButton,
    openInNewTab,
    buttonUrlSource,
    textHorizontalSpacing,
    textVerticalSpacing,
    descriptionMaxRowsCount,
    imagePosition,
    showCaption,
    captionSource,
    captionFontSize,
    captionFontColor,
    showVideoCover,
  } = value as IBlogSettings;

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
                <div className="mixed-fields">
                  <div style={{flexBasis: '80%'}}>
                    <NumberControl
                      id={'imageWidth'}
                      name={'Image width'}
                      value={imageWidth}
                      onChange={onInputValueChange}
                      min={0}
                    />
                  </div>
                  <div style={{flexBasis: '20%'}}>
                    <SelectControl
                      id="imageWidthType"
                      value={imageWidthType}
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
                      id="imageHeight"
                      name="Image height"
                      value={imageHeight}
                      onChange={onInputValueChange}
                      min={0}
                    />
                  </div>
                  <div style={{flexBasis: '20%'}}>
                    <SelectControl
                      id="imageHeightType"
                      value={imageHeightType}
                      options={SizeTypeHeightOptions}
                      onChange={onInputValueChange}
                    />
                  </div>
                </div>
              </Filter>
              <Filter isLoading={isLoading}>
                <SelectControl
                  id={'imagePosition'}
                  name={'Image position'}
                  value={imagePosition}
                  options={BlogViewImagePositionOptions}
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

  const {isPro} = usePro();

  const renderAdvancedSettings = (): ReactNode => {
    return (
      <Section
        header={'Advanced'}
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
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
                name="Container padding (px)"
                min={0}
                max={100}
                value={containerPadding}
                onChange={onInputValueChange}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SliderControl
                id={'spacing'}
                name={'Spacing (px)'}
                value={spacing}
                min={0}
                max={100}
                onChange={onInputValueChange}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SliderControl
                id={'imageRadius'}
                name="Image radius (%)"
                min={0}
                value={imageRadius}
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
        }
        defaultExpanded={false}
      />
    );
  };

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
                        The Title must be set by editing each image from
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
                  <Filter isLoading={isLoading}>
                    <SelectControl
                      id={'titleAlignment'}
                      name={'Alignment'}
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
                        The Description must be set by editing each image from
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
                      unit={'px'}
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <ColorControl
                      id={'descriptionColor'}
                      name="Color"
                      value={descriptionColor}
                      onChange={onInputValueChange}
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
                    id={'showButton'}
                    name={'Show button'}
                    value={showButton}
                    onChange={onInputValueChange}
                  />
                </Filter>
                {showButton && (
                  <Filter isLoading={isLoading}>
                    <SelectControl
                      id={'buttonUrlSource'}
                      name={'URL source'}
                      value={buttonUrlSource}
                      options={ActionURLSourceOptions}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                )}
              </Grid>
              {showButton && (
                <Grid
                  container
                  columns={24}
                  rowSpacing={2}
                  columnSpacing={4}
                  className="reacg-section__container-inherit"
                >
                  <Filter isLoading={isLoading}>
                    <SwitchControl
                      id={'openInNewTab'}
                      name={'Open in new tab'}
                      value={openInNewTab}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <TextControl
                      id={'buttonText'}
                      name="Button text"
                      value={buttonText}
                      onChange={onInputValueChange}
                    />
                  </Filter>
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
                    <NumberControl
                      id={'buttonFontSize'}
                      name={'Font size'}
                      value={buttonFontSize}
                      onChange={onInputValueChange}
                      unit={'px'}
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
                    <ColorControl
                      id={'buttonTextColor'}
                      name="Text color"
                      value={buttonTextColor}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                </Grid>
              )}
            </Grid>
            {(showTitle || showCaption || showDescription || showButton) && (
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
                    <FontControl
                      id={'textFontFamily'}
                      name={'Font family'}
                      value={textFontFamily}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <SelectControl
                      id={'textVerticalAlignment'}
                      name={'Vertical alignment'}
                      value={textVerticalAlignment}
                      options={TextsAlignmentOptions}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <NumberControl
                      id={'textHorizontalSpacing'}
                      name={'Horizontal spacing'}
                      value={textHorizontalSpacing}
                      onChange={onInputValueChange}
                      min={0}
                      unit={'px'}
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <NumberControl
                      id={'textVerticalSpacing'}
                      name={'Vertical spacing'}
                      value={textVerticalSpacing}
                      onChange={onInputValueChange}
                      min={0}
                      unit={'px'}
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

export {BlogSettings};
