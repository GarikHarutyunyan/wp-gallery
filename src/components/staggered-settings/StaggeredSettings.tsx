import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
import {useSettings} from 'components/settings';
import {useTemplates} from 'contexts';
import {Section} from 'core-components/section';
import {
  IStaggeredSettings,
  SizeTypeOptions,
  ThumbnailTitlePosition,
  ThumbnailTitlePositionOptions,
  TitleAlignmentOptions,
  TitleVisibility,
  TitleVisibilityOptions,
} from 'data-structures';

import React, {ReactNode, useMemo} from 'react';
import {
  ColorControl,
  FontControl,
  ISelectOption,
  NumberControl,
  SelectControl,
  SliderControl,
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
    columns,
    gap,
    backgroundColor,
    containerPadding,
    padding,
    paddingColor,
    borderRadius,
    titlePosition,
    titleAlignment,
    titleVisibility,
    titleFontFamily,
    titleColor,
    descriptionColor,
    titleFontSize,
    descriptionFontSize,
    sizeType,
    buttonColor,
    buttonTextColor,
  } = value as IStaggeredSettings;

  const isThumbnailTitlePositionEditable: boolean = borderRadius <= 50;

  const onInputValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();
    key && onChange({...value, [key]: inputValue});
  };

  const titlePositionOptions: ISelectOption[] = useMemo(() => {
    const belowOption: ISelectOption = ThumbnailTitlePositionOptions.find(
      (option) => option.value === ThumbnailTitlePosition.BELOW
    ) as ISelectOption;

    if (titleVisibility === TitleVisibility.ON_HOVER) {
      if (belowOption) {
        belowOption.isDisabled = true;
      }

      if (titlePosition === ThumbnailTitlePosition.BELOW) {
        onChange({
          ...value,
          titlePosition: ThumbnailTitlePosition.BOTTOM,
        });
      }
    } else {
      belowOption.isDisabled = false;
    }

    return ThumbnailTitlePositionOptions;
  }, [titleVisibility]);

  const renderBasicSettings = (): ReactNode => {
    return (
      <Section
        header={'Basic'}
        body={
          <>
            <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
              <Filter isLoading={isLoading}>
                <NumberControl
                  id={'width'}
                  name={'Width'}
                  value={width}
                  onChange={onInputValueChange}
                  min={0}
                  max={100}
                  unit={'%'}
                />
              </Filter>
              <Filter isLoading={isLoading}>
                <NumberControl
                  id={'height'}
                  name={'Height'}
                  value={height}
                  onChange={onInputValueChange}
                  min={0}
                  unit={sizeType}
                />
              </Filter>
              <Filter isLoading={isLoading}>
                <SelectControl
                  id={'sizeType'}
                  name={'Size Type'}
                  value={sizeType}
                  options={SizeTypeOptions}
                  onChange={onInputValueChange}
                />
              </Filter>
              <Filter isLoading={isLoading}>
                <NumberControl
                  id={'columns'}
                  name={'Columns'}
                  value={columns}
                  onChange={onInputValueChange}
                  min={1}
                />
              </Filter>
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
                id={'padding'}
                name="Padding (px)"
                min={0}
                max={100}
                value={padding}
                onChange={onInputValueChange}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <ColorControl
                id={'paddingColor'}
                name="Padding color"
                value={paddingColor}
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
                name="Radius (%)"
                min={0}
                value={borderRadius}
                max={50}
                onChange={onInputValueChange}
              />
            </Filter>

            <Filter isLoading={isLoading}>
              <SelectControl
                id={'titleVisibility'}
                name={'Title visibility'}
                value={titleVisibility}
                options={TitleVisibilityOptions}
                onChange={onInputValueChange}
                isDisabled={!isThumbnailTitlePositionEditable}
              />
            </Filter>
            {titleVisibility !== TitleVisibility.NONE && renderTitleSettings()}
          </Grid>
        }
        defaultExpanded={false}
      />
    );
  };

  const renderTitleSettings = (): ReactNode => {
    return (
      <>
        <Filter isLoading={isLoading}>
          <SelectControl
            id={'titlePosition'}
            name={'Title position'}
            value={titlePosition}
            options={titlePositionOptions}
            onChange={onInputValueChange}
            isDisabled={!isThumbnailTitlePositionEditable}
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
            id={'titleFontSize'}
            name={'Title font size'}
            value={titleFontSize}
            onChange={onInputValueChange}
            unit={'px'}
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
