import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
import {useSettings} from 'components/settings';
import {useTemplates} from 'contexts';
import {usePro} from 'contexts/ProContext';
import {Section} from 'core-components/section/Section';
import {
  AspectRatioOptions,
  HoverEffectOptions,
  IThumbnailSettings,
} from 'data-structures';
import React, {ReactNode} from 'react';
import {
  ColorControl,
  NumberControl,
  SelectControl,
  SliderControl,
  SwitchControl,
} from '../controls';
import {Filter} from '../settings/Filter';

interface IThumbnailSettingsProps {
  isLoading?: boolean;
  sections?: 'all' | 'basic' | 'advanced';
}

const ThumbnailSettings: React.FC<IThumbnailSettingsProps> = ({
  isLoading,
  sections = 'all',
}) => {
  const {resetTemplate} = useTemplates();
  const {thumbnailSettings: value, changeThumbnailSettings: onChange} =
    useSettings();
  const {
    fillContainer,
    aspectRatio,
    width,
    height,
    columns,
    gap,
    itemBorder,
    itemBackgroundColor,
    itemBorderRadius,
    backgroundColor,
    containerPadding,
    padding,
    paddingColor,
    borderRadius,
    hoverEffect,
    showVideoCover,
  } = value as IThumbnailSettings;

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
              <SwitchControl
                id={'fillContainer'}
                name={'Fill container'}
                tooltip={
                  <p>
                    Choose how thumbnails are sized. Enable “Fill Container” to
                    let thumbnails scale automatically to fill the available
                    space using Image aspect ratio and Columns. Disable to set
                    fixed Image width and height manually (container may not
                    always be filled).
                  </p>
                }
                value={fillContainer}
                onChange={onInputValueChange}
              />
            </Filter>
            {fillContainer ? (
              <Filter isLoading={isLoading}>
                <SelectControl
                  id={'aspectRatio'}
                  name={'Image aspect ratio'}
                  value={aspectRatio}
                  options={AspectRatioOptions}
                  onChange={onInputValueChange}
                />
              </Filter>
            ) : (
              <>
                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'width'}
                    name={'Image width'}
                    value={width}
                    onChange={onInputValueChange}
                    min={0}
                    unit={'px'}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'height'}
                    name={'Image height'}
                    value={height}
                    onChange={onInputValueChange}
                    min={0}
                    unit={'px'}
                  />
                </Filter>
              </>
            )}
            <Filter isLoading={isLoading}>
              <NumberControl
                id={'columns'}
                name={'Columns'}
                value={columns}
                onChange={onInputValueChange}
                min={1}
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
        {renderItemsSettings()}
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
                name="Padding (px)"
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

  const renderItemsSettings = (): ReactNode => {
    return (
      <Section
        header={'Items'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
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
                id={'itemBorder'}
                name="Border (px)"
                min={0}
                max={100}
                value={itemBorder}
                pro={true}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'item_border',
                        })
                }
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <ColorControl
                id={'itemBackgroundColor'}
                name="Background color"
                value={itemBackgroundColor}
                pro={true}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'item_background_color',
                        })
                }
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SliderControl
                id={'itemBorderRadius'}
                name="Border radius (%)"
                min={0}
                value={itemBorderRadius}
                max={50}
                pro={true}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'item_border_radius',
                        })
                }
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
              <SliderControl
                id={'padding'}
                name="Border (px)"
                min={0}
                max={100}
                value={padding}
                pro={true}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'image_border',
                        })
                }
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <ColorControl
                id={'paddingColor'}
                name="Border color"
                value={paddingColor}
                pro={true}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'image_border_color',
                        })
                }
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SliderControl
                id={'borderRadius'}
                name="Border radius (%)"
                min={0}
                value={borderRadius}
                max={50}
                onChange={onInputValueChange}
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

export {ThumbnailSettings};
