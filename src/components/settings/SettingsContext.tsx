import React, {useMemo, useState} from 'react';
import {LayoutType, Photo} from 'react-photo-album';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {SliderControl} from './SliderControl';
import {Filter} from './Filter';
import {TextControl} from './TextControl';
import {NumberControl} from './NumberControl';
import ColorPicker from 'material-ui-color-picker';
import {ColorControl} from './ColorControl';
import {TitlePosition, TitlePositionOptions} from 'data-structures';
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
  borderWidth: number;
  borderRadius: number;
  borderColor: string;

  titlePosition: TitlePosition | 'hidden';
  titleColor: string;
  titleFontSize: number;
}

const SettingsContext = React.createContext<IThumbnailSettings | null>(null);

const SettingsProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const [width, setWidth] = useState<number>(150);
  const [height, setHeight] = useState<number>(150);
  const [columns, setColumns] = useState<number>(3);
  const [gap, setGap] = useState<number>(10);
  const [backgroundColor, setBackgroundColor] = useState<string>('White');
  const [padding, setPadding] = useState<number>(10);
  const [paddingColor, setPaddingColor] = useState<string>('Skyblue');
  const [borderRadius, setBorderRadius] = useState<number>(10);
  const [borderColor, setBorderColor] = useState<string>('Blue');
  const [borderWidth, setBorderWidth] = useState<number>(0);

  const [titlePosition, setTitlePosition] = useState<TitlePosition | 'hidden'>(
    'hidden'
  );
  const [titleColor, setTitleColor] = useState<string>('Black');
  const [titleFontSize, setTitleFontSize] = useState<number>(20);
  // useLayoutEffect(() => {
  //   const viewportSize = window.innerWidth;

  //   setColumns(viewportSize < 480 ? 2 : viewportSize < 900 ? 3 : 5);
  //   // setSpacing(viewportSize < 480 ? 10 : viewportSize < 900 ? 20 : 30);
  //   setPadding(viewportSize < 480 ? 10 : viewportSize < 900 ? 20 : 30);
  //   setTargetRowHeight(
  //     viewportSize < 480 ? 100 : viewportSize < 900 ? 150 : 200
  //   );
  // }, []);

  const settings: IThumbnailSettings = useMemo(
    () => ({
      width,
      height,
      columns,
      gap,
      backgroundColor,
      padding,
      paddingColor,
      borderWidth,
      borderRadius,
      borderColor,

      titlePosition,
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
      borderWidth,
      borderRadius,
      borderColor,

      titlePosition,
      titleColor,
      titleFontSize,
    ]
  );

  return (
    <SettingsContext.Provider value={settings}>
      <Paper variant="outlined" sx={{mb: 4, p: 2, textAlign: 'left'}}>
        <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
          <Filter>
            <NumberControl name={'Width'} value={width} onChange={setWidth} />
          </Filter>
          <Filter>
            <NumberControl
              name={'Height'}
              value={height}
              onChange={setHeight}
            />
          </Filter>
          <Filter>
            <NumberControl name={'Spacing'} value={gap} onChange={setGap} />
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
            />
          </Filter>
          <Filter>
            <SliderControl
              name="Padding"
              min={0}
              max={50}
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
            <NumberControl
              name={'Border width'}
              value={borderWidth}
              onChange={setBorderWidth}
            />
          </Filter>
          <Filter>
            <SliderControl
              name="Radius"
              min={0}
              max={100}
              value={borderRadius}
              onChange={(_, value) => setBorderRadius(value)}
            />
          </Filter>
          <Filter>
            <ColorControl
              name="Border color"
              value={borderColor}
              onChange={setBorderColor}
            />
          </Filter>

          <Filter>
            <SelectControl
              name={'Title position'}
              value={titlePosition}
              options={TitlePositionOptions}
              onChange={setTitlePosition}
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
      {children}
    </SettingsContext.Provider>
  );
};

export {SettingsContext, SettingsProvider, type IThumbnailSettings};
