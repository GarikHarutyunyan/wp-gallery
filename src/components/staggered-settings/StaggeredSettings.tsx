import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
import {useSettings} from 'components/settings';
import {useTemplates} from 'contexts';
import {Section} from 'core-components/section';
import {
  HoverEffectOptions,
  IStaggeredSettings,
  SizeTypeHeightOptions,
  SizeTypeWidthOptions,
  TextsAlignmentOptions,
  TitleAlignmentOptions,
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

interface ITStaggeredSettingsProps {
  isLoading?: boolean;
}

const StaggeredSettings: React.FC<ITStaggeredSettingsProps> = ({isLoading}) => {
  const {resetTemplate} = useTemplates();
  const {staggeredSettings: value, changeStaggeredSettings: onChange} =
    useSettings();
  const {
    width,
    height,
    gap,
    backgroundColor,
    containerPadding,
    borderRadius,
    hoverEffect,
    textsAlignment,
    titleFontFamily,
    titleColor,
    descriptionColor,
    titleFontSize,
    descriptionFontSize,
    sizeTypeHeight,
    sizeTypeWidth,
    buttonAlignment,
    buttonColor,
    buttonTextColor,
    showTitle,
    titleAlignment,
    showDescription,
    showButton,
    openButtonUrlInNewTab,
    paddingLeftRight,
    paddingTopBottom,
  } = value as IStaggeredSettings;

  const isThumbnailTitlePositionEditable: boolean = borderRadius <= 50;

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
                      id={'width'}
                      name={'Width'}
                      value={width}
                      onChange={onInputValueChange}
                      min={0}
                    />
                  </div>
                  <div style={{flexBasis: '20%'}}>
                    <SelectControl
                      id="sizeTypeWidth"
                      value={sizeTypeWidth}
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
                      id="sizeTypeHeight"
                      value={sizeTypeHeight}
                      options={SizeTypeHeightOptions}
                      onChange={onInputValueChange}
                    />
                  </div>
                </div>
              </Filter>
              <Filter isLoading={isLoading}>
                <SwitchControl
                  id={'showTitle'}
                  name={'Show Title'}
                  value={showTitle}
                  onChange={onInputValueChange}
                />
              </Filter>
              <Filter isLoading={isLoading}>
                <SwitchControl
                  id={'showDescription'}
                  name={'Show Description'}
                  value={showDescription}
                  onChange={onInputValueChange}
                />
              </Filter>
              <Filter isLoading={isLoading}>
                <SwitchControl
                  id={'showButton'}
                  name={'Show Button'}
                  value={showButton}
                  onChange={onInputValueChange}
                />
              </Filter>
              {showButton ? (
                <Filter isLoading={isLoading}>
                  <SwitchControl
                    id={'openButtonUrlInNewTab'}
                    name={'Open Button Url In New Tab'}
                    value={openButtonUrlInNewTab}
                    onChange={onInputValueChange}
                  />
                </Filter>
              ) : null}
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
                id={'borderRadius'}
                name="Image Radius (%)"
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
                onChange={onInputValueChange}
              />
            </Filter>

            {renderTextsSettings()}
          </Grid>
        }
        defaultExpanded={false}
      />
    );
  };

  const renderTextsSettings = (): ReactNode => {
    return (
      <>
        <Filter isLoading={isLoading}>
          <SelectControl
            id={'textsAlignment'}
            name={'Texts alignement'}
            value={textsAlignment}
            options={TextsAlignmentOptions}
            onChange={onInputValueChange}
            isDisabled={!isThumbnailTitlePositionEditable}
          />
        </Filter>
        <Filter isLoading={isLoading}>
          <NumberControl
            id={'paddingLeftRight'}
            name={'Padding(Left/Right)'}
            value={paddingLeftRight}
            onChange={onInputValueChange}
            min={0}
            unit={'px'}
          />
        </Filter>
        <Filter isLoading={isLoading}>
          <NumberControl
            id={'paddingTopBottom'}
            name={'Padding(Top/Bottom)'}
            value={paddingTopBottom}
            onChange={onInputValueChange}
            min={0}
            unit={'px'}
          />
        </Filter>

        <Filter isLoading={isLoading}>
          <SelectControl
            id={'titleAlignment'}
            name={'Title alignement'}
            value={titleAlignment}
            options={TitleAlignmentOptions}
            onChange={onInputValueChange}
            isDisabled={!isThumbnailTitlePositionEditable}
          />
        </Filter>
        <Filter isLoading={isLoading}>
          <FontControl
            id={'titleFontFamily'}
            name={'Title font family'}
            value={titleFontFamily}
            onChange={onInputValueChange}
            isDisabled={!isThumbnailTitlePositionEditable}
          />
        </Filter>
        <Filter isLoading={isLoading}>
          <NumberControl
            id={'titleFontSize'}
            name={'Title font size'}
            value={titleFontSize}
            onChange={onInputValueChange}
            unit={'px'}
          />
        </Filter>
        <Filter isLoading={isLoading}>
          <ColorControl
            id={'titleColor'}
            name="Title color"
            value={titleColor}
            onChange={onInputValueChange}
          />
        </Filter>
        <Filter isLoading={isLoading}>
          <ColorControl
            id={'descriptionColor'}
            name="Description color"
            value={descriptionColor}
            onChange={onInputValueChange}
          />
        </Filter>

        <Filter isLoading={isLoading}>
          <NumberControl
            id={'descriptionFontSize'}
            name={'Description font size'}
            value={descriptionFontSize}
            onChange={onInputValueChange}
            unit={'px'}
          />
        </Filter>
        <Filter isLoading={isLoading}>
          <SelectControl
            id={'buttonAlignment'}
            name={'Button Alignment'}
            value={buttonAlignment}
            options={TitleAlignmentOptions}
            onChange={onInputValueChange}
            isDisabled={!isThumbnailTitlePositionEditable}
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
            name="Button text color"
            value={buttonTextColor}
            onChange={onInputValueChange}
          />
        </Filter>
      </>
    );
  };

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      {renderBasicSettings()}
      {renderAdvancedSettings()}
    </Paper>
  );
};

export {StaggeredSettings};
