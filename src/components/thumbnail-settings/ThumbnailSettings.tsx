import React, {ReactNode, useEffect, useLayoutEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Filter} from '../settings/Filter';
import Collapse from '@mui/material/Collapse';
import {
  TitleAlignment,
  TitleAlignmentOptions,
  TitlePosition,
  TitlePositionOptions,
  TitleVisibility,
  TitleVisibilityOptions,
} from 'data-structures';
import {
  FontControl,
  NumberControl,
  ISelectOption,
  SliderControl,
  SelectControl,
  ColorControl,
  SwitchControl,
} from '../controls';
import {Divider, Typography} from '@mui/material';
import {Aligner, ExpandMore, Section} from 'core-components';

interface IThumbnailSettings {
  width: number | undefined;
  height: number | undefined;
  columns: number | undefined;
  showLightbox: boolean;
  gap: number;
  backgroundColor: string;
  padding: number;
  paddingColor: string;
  borderRadius: number;
  titlePosition: TitlePosition;
  titleAlignment: TitleAlignment;
  titleVisibility: TitleVisibility;
  titleFontFamily: string;
  titleColor: string;
  titleFontSize: number | undefined;
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
  const [width, setWidth] = useState<number | undefined>(value.width);
  const [height, setHeight] = useState<number | undefined>(value.height);
  const [columns, setColumns] = useState<number | undefined>(value.columns);
  const [showLightbox, setShowLightbox] = useState<boolean>(true);
  const [gap, setGap] = useState<number>(value.gap);
  const [backgroundColor, setBackgroundColor] = useState<string>(
    value.backgroundColor
  );
  const [padding, setPadding] = useState<number>(value.padding);
  const [paddingColor, setPaddingColor] = useState<string>(value.paddingColor);
  const [borderRadius, setBorderRadius] = useState<number>(value.borderRadius);
  const [titlePosition, setTitlePosition] = useState<TitlePosition>(
    value.titlePosition
  );
  const [titleAlignment, setTitleAlignment] = useState<TitleAlignment>(
    value.titleAlignment
  );
  const [titleVisibility, setTitleVisibility] = useState<TitleVisibility>(
    value.titleVisibility
  );
  const isTitlePositionEditable: boolean = borderRadius <= 50;
  const [titleFontFamily, settitleFontFamily] = useState<string>(
    value.titleFontFamily
  );
  const [titleColor, setTitleColor] = useState<string>(value.titleColor);
  const [titleFontSize, setTitleFontSize] = useState<number | undefined>(
    value.titleFontSize
  );

  useEffect(
    () =>
      onChange({
        width,
        height,
        columns,
        showLightbox,
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
      }),
    [
      width,
      height,
      columns,
      showLightbox,
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
    ]
  );

  useLayoutEffect(() => {
    const belowOption: ISelectOption | undefined = TitlePositionOptions.find(
      (option) => option.value === TitlePosition.BELOW
    );

    if (titleVisibility === TitleVisibility.ON_HOVER) {
      if (belowOption) {
        belowOption.isDisabled = true;
      }

      if (titlePosition === TitlePosition.BELOW) {
        setTitlePosition(TitlePosition.BOTTOM);
      }
    }

    return () => {
      if (belowOption) {
        belowOption.isDisabled = false;
      }
    };
  }, [titleVisibility]);

  const renderMainSettings = (): ReactNode => {
    return (
      <Section
        header={'General'}
        body={
          <Grid
            container
            columns={24}
            rowSpacing={2}
            columnSpacing={4}
            marginBottom={4}
          >
            <Filter isLoading={isLoading}>
              <NumberControl
                name={'Width'}
                value={width}
                onChange={setWidth}
                min={0}
                unit={'px'}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <NumberControl
                name={'Height'}
                value={height}
                onChange={setHeight}
                min={0}
                unit={'px'}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <NumberControl
                name={'Columns'}
                value={columns}
                onChange={setColumns}
                min={1}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SwitchControl
                name={'Use lightbox'}
                value={showLightbox}
                onChange={setShowLightbox}
              />
            </Filter>
          </Grid>
        }
        canExpand={true}
      ></Section>
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
                name={'Spacing (px)'}
                value={gap}
                min={0}
                max={100}
                onChange={(_, value) => setGap(value)}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <ColorControl
                name="Spacing color"
                value={backgroundColor}
                onChange={setBackgroundColor}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SliderControl
                name="Padding (px)"
                min={0}
                max={100}
                value={padding}
                onChange={(_, value) => setPadding(value)}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <ColorControl
                name="Padding color"
                value={paddingColor}
                onChange={setPaddingColor}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SliderControl
                name="Radius (%)"
                min={0}
                value={borderRadius}
                max={50}
                onChange={(_, value) => setBorderRadius(value)}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SelectControl
                name={'Title visibility'}
                value={titleVisibility}
                options={TitleVisibilityOptions}
                onChange={setTitleVisibility}
                isDisabled={!isTitlePositionEditable}
              />
            </Filter>
            {titleVisibility !== TitleVisibility.NONE && renderTitleSettings()}
          </Grid>
        }
        canExpand={true}
        defaultExpanded={false}
      />
    );
  };

  const renderTitleSettings = (): ReactNode => {
    return (
      <>
        <Filter isLoading={isLoading}>
          <SelectControl
            name={'Title position'}
            value={titlePosition}
            options={TitlePositionOptions}
            onChange={setTitlePosition}
            isDisabled={!isTitlePositionEditable}
          />
        </Filter>
        <Filter isLoading={isLoading}>
          <SelectControl
            name={'Title alignement'}
            value={titleAlignment}
            options={TitleAlignmentOptions}
            onChange={setTitleAlignment}
            isDisabled={!isTitlePositionEditable}
          />
        </Filter>
        <Filter isLoading={isLoading}>
          <FontControl
            name={'Title font family'}
            value={titleFontFamily}
            onChange={settitleFontFamily}
            isDisabled={!isTitlePositionEditable}
          />
        </Filter>
        <Filter isLoading={isLoading}>
          <ColorControl
            name="Title color"
            value={titleColor}
            onChange={setTitleColor}
          />
        </Filter>
        <Filter isLoading={isLoading}>
          <NumberControl
            name={'Title font size'}
            value={titleFontSize}
            onChange={setTitleFontSize}
            unit={'px'}
          />
        </Filter>
      </>
    );
  };

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      {renderMainSettings()}
      <Divider variant="middle" style={{margin: '15px 0'}} />
      {renderAdvancedSettings()}
    </Paper>
  );
};

export {ThumbnailSettings, type IThumbnailSettings};
