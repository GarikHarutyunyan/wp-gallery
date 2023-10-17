import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {SliderControl} from './SliderControl';
import {Filter} from './Filter';
import {NumberControl} from './NumberControl';
import {ColorControl} from './ColorControl';
import {
  TitlePosition,
  TitlePositionOptions,
  TitleVisibility,
  TitleVisibilityOptions,
} from 'data-structures';
import {SelectControl} from './SelectControl';

const useLayoutEffect =
  typeof document !== 'undefined' ? React.useLayoutEffect : React.useEffect;

interface IThumbnailSettings {
  width: number;
  height: number;
  columns: number;
  gap: number;
  backgroundColor: string;
  padding: number;
  paddingColor: string;
  borderRadius: number;
  titlePosition: TitlePosition;
  titleVisibility: TitleVisibility;
  titleColor: string;
  titleFontSize: number;
}

interface IThumbnailSettingsProps {
  value: IThumbnailSettings;
  onChange: (newSettings: IThumbnailSettings) => void;
}

const ThumbnailSettings: React.FC<IThumbnailSettingsProps> = ({
  value,
  onChange,
}) => {
  const [width, setWidth] = useState<number>(value.width);
  const [height, setHeight] = useState<number>(value.height);
  const [columns, setColumns] = useState<number>(value.columns);
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
  const [titleVisibility, setTitleVisibility] = useState<TitleVisibility>(
    value.titleVisibility
  );
  const isTitlePositionEditable: boolean = borderRadius <= 50;
  const [titleColor, setTitleColor] = useState<string>(value.titleColor);
  const [titleFontSize, setTitleFontSize] = useState<number>(
    value.titleFontSize
  );

  useEffect(
    () =>
      onChange({
        width,
        height,
        columns,
        gap,
        backgroundColor,
        padding,
        paddingColor,
        borderRadius,
        titlePosition,
        titleVisibility,
        titleColor,
        titleFontSize,
      }),
    [
      width,
      height,
      columns,
      gap,
      backgroundColor,
      padding,
      paddingColor,
      borderRadius,
      titlePosition,
      titleVisibility,
      titleColor,
      titleFontSize,
    ]
  );

  return (
    <Paper variant="outlined" sx={{mb: 4, p: 2, textAlign: 'left'}}>
      <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
        <Filter>
          <NumberControl
            name={'Width'}
            value={width}
            onChange={setWidth}
            min={0}
          />
        </Filter>
        <Filter>
          <NumberControl
            name={'Height'}
            value={height}
            onChange={setHeight}
            min={0}
          />
        </Filter>
        <Filter>
          <SliderControl
            name={'Spacing'}
            value={gap}
            min={0}
            max={100}
            onChange={(_, value) => setGap(value)}
          />
        </Filter>
        <Filter>
          <ColorControl
            name="Spacing color"
            value={backgroundColor}
            onChange={setBackgroundColor}
          />
        </Filter>
        <Filter>
          <NumberControl
            name={'Columns'}
            value={columns}
            onChange={setColumns}
            min={1}
          />
        </Filter>
        <Filter>
          <SliderControl
            name="Padding"
            min={0}
            max={100}
            value={padding}
            onChange={(_, value) => setPadding(value)}
          />
        </Filter>
        <Filter>
          <ColorControl
            name="Padding color"
            value={paddingColor}
            onChange={setPaddingColor}
          />
        </Filter>
        <Filter>
          <SliderControl
            name="Radius (%)"
            min={0}
            value={borderRadius}
            max={50}
            onChange={(_, value) => setBorderRadius(value)}
          />
        </Filter>

        <Filter>
          <SelectControl
            name={'Title position'}
            value={titlePosition}
            options={TitlePositionOptions}
            onChange={setTitlePosition}
            isDisabled={!isTitlePositionEditable}
          />
        </Filter>
        <Filter>
          <SelectControl
            name={'Title visibility'}
            value={titleVisibility}
            options={TitleVisibilityOptions}
            onChange={setTitleVisibility}
            isDisabled={!isTitlePositionEditable}
          />
        </Filter>
        <Filter>
          <ColorControl
            name="Title color"
            value={titleColor}
            onChange={setTitleColor}
          />
        </Filter>
        <Filter>
          <NumberControl
            name={'Title font size'}
            value={titleFontSize}
            onChange={setTitleFontSize}
          />
        </Filter>
      </Grid>
    </Paper>
  );
};

export {ThumbnailSettings, type IThumbnailSettings};
