import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Section} from 'core-components';
import {
  HoverEffect,
  HoverEffectOptions,
  ThumbnailTitlePosition,
  ThumbnailTitlePositionOptions,
  TitleAlignment,
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

interface IThumbnailSettings {
  width?: number | undefined;
  height?: number | undefined;
  columns?: number | undefined;
  gap: number;
  backgroundColor: string;
  padding: number;
  paddingColor: string;
  borderRadius: number;
  titlePosition: ThumbnailTitlePosition;
  titleAlignment: TitleAlignment;
  titleVisibility: TitleVisibility;
  titleFontFamily: string;
  titleColor: string;
  titleFontSize?: number | undefined;
  hoverEffect: HoverEffect;
}

interface IThumbnailSettingsProps {
  value: IThumbnailSettings;
  onChange: (newSettings: IThumbnailSettings) => void;
  isLoading?: boolean;
}

const ThumbnailSettings: React.FC<IThumbnailSettingsProps> = ({
  value,
  onChange,
  isLoading,
}) => {
  const {
    width,
    height,
    columns,
    gap,
    backgroundColor,
    padding,
    paddingColor,
    borderRadius,
    titlePosition,
    titleAlignment,
    titleVisibility,
    titleFontFamily,
    titleColor,
    titleFontSize,
    hoverEffect,
  } = value;
  const isThumbnailTitlePositionEditable: boolean = borderRadius <= 50;

  const onInputValueChange = (inputValue: any, key?: string) => {
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
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
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
              <ColorControl
                id={'backgroundColor'}
                name={'Background color'}
                value={backgroundColor}
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
                id={'hoverEffect'}
                name={'Hover effect'}
                value={hoverEffect}
                options={HoverEffectOptions}
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
          <NumberControl
            id={'titleFontSize'}
            name={'Title font size'}
            value={titleFontSize}
            onChange={onInputValueChange}
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

export {ThumbnailSettings, type IThumbnailSettings};
