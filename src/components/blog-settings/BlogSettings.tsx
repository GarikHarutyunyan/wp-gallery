import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
import {useSettings} from 'components/settings';
import {useTemplates} from 'contexts';
import {Section} from 'core-components/section';
import {
  BlogViewImagePositionOptions,
  HoverEffectOptions,
  IBlogSettings,
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
    textHorizontalSpacing,
    textVerticalSpacing,
    descriptionMaxRowsCount,
    imagePosition,
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
                    info={
                      <p>
                        The Title must be set by editing each image from
                        "Images" section.{' '}
                        <a
                          className="seetings__see-more-link"
                          href="https://www.youtube.com/watch?v=u_AAWKQuaTA"
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
                  <>
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
                    info={
                      <p>
                        The Description must be set by editing each image from
                        "Images" section.{' '}
                        <a
                          className="seetings__see-more-link"
                          href="https://www.youtube.com/watch?v=u_AAWKQuaTA"
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
                  <>
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
                      <ColorControl
                        id={'descriptionColor'}
                        name="Description color"
                        value={descriptionColor}
                        onChange={onInputValueChange}
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
                  <>
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
                        name={'Button alignment'}
                        value={buttonAlignment}
                        options={TitleAlignmentOptions}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <NumberControl
                        id={'buttonFontSize'}
                        name={'Button font size'}
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
                        name="Button text color"
                        value={buttonTextColor}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                  </>
                )}
              </Grid>
              {(showTitle || showButton || showDescription) && (
                <>
                  <Filter isLoading={isLoading}>
                    <FontControl
                      id={'textFontFamily'}
                      name={'Text font family'}
                      value={textFontFamily}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                  {renderTextsSettings()}
                </>
              )}
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
                onChange={onInputValueChange}
              />
            </Filter>
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
            id={'textVerticalAlignment'}
            name={'Text vertical alignment'}
            value={textVerticalAlignment}
            options={TextsAlignmentOptions}
            onChange={onInputValueChange}
          />
        </Filter>
        <Filter isLoading={isLoading}>
          <NumberControl
            id={'textHorizontalSpacing'}
            name={'Text horizontal spacing'}
            value={textHorizontalSpacing}
            onChange={onInputValueChange}
            min={0}
            unit={'px'}
          />
        </Filter>
        <Filter isLoading={isLoading}>
          <NumberControl
            id={'textVerticalSpacing'}
            name={'Text vertical spacing'}
            value={textVerticalSpacing}
            onChange={onInputValueChange}
            min={0}
            unit={'px'}
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

export {BlogSettings};
