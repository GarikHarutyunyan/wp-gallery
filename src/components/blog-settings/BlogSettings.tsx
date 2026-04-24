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
} from 'data-structures';

import {usePro} from 'contexts/ProContext';
import React, {ReactNode} from 'react';
import {
  ColorControl,
  NumberControl,
  SelectControl,
  SliderControl,
  SwitchControl,
} from '../controls';
import {Filter} from '../settings/Filter';

interface IBlogSettingsProps {
  isLoading?: boolean;
  sections?: 'all' | 'basic' | 'advanced';
}

const BlogSettings: React.FC<IBlogSettingsProps> = ({
  isLoading,
  sections = 'all',
}) => {
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
    imageHeightType,
    imageWidthType,
    imagePosition,
    showVideoCover,
  } = value as IBlogSettings;

  const onInputValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();
    key && onChange({...value, [key]: inputValue});
  };

  const showBasic = sections === 'all' || sections === 'basic';
  const showAdvanced = sections === 'all' || sections === 'advanced';

  const {isPro} = usePro();

  const renderBasicSettings = (): ReactNode => {
    return (
      <Section
        header={'Layout Settings'}
        className="reacg-tab-section"
        body={
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
            <ClickActionSettings isLoading={isLoading} />
          </Grid>
        }
      />
    );
  };

  const renderAdvancedSettings = (): ReactNode => {
    return (
      <>
        {renderContainerSettings()}
        {renderImagesSettings()}
      </>
    );
  };

  const renderContainerSettings = (): ReactNode => {
    return (
      <Section
        header={'Container'}
        className="reacg-tab-section"
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
          </Grid>
        }
      />
    );
  };

  const renderImagesSettings = (): ReactNode => {
    return (
      <Section
        header={'Media'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
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
                name="Radius (%)"
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
      />
    );
  };

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      {showBasic ? renderBasicSettings() : null}
      {showAdvanced ? renderAdvancedSettings() : null}
    </Paper>
  );
};

export {BlogSettings};
