import React, {ReactNode, useEffect, useLayoutEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {SliderControl} from './SliderControl';
import {Filter} from './Filter';
import {NumberControl} from './NumberControl';
import {ColorControl} from './ColorControl';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  TitleAlignment,
  TitleAlignmentOptions,
  TitlePosition,
  TitlePositionOptions,
  TitleVisibility,
  TitleVisibilityOptions,
} from 'data-structures';
import {ISelectOption, SelectControl} from './SelectControl';
import {FontControl} from './FontControl';
import {Divider, Typography} from '@mui/material';
import {Aligner, ExpandMore} from 'core-components';
import {SwitchControl} from './SwitchControl';

interface IThumbnailSettings {
  width: number;
  height: number;
  columns: number;
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
  titleFontFamilySize: number;
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
  const [width, setWidth] = useState<number>(value.width);
  const [height, setHeight] = useState<number>(value.height);
  const [columns, setColumns] = useState<number>(value.columns);
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
  const [titleFontFamilySize, settitleFontFamilySize] = useState<number>(
    value.titleFontFamilySize
  );

  const [isMainExpanded, setIsMainExpanded] = useState(true);
  const [isAdvancedExpanded, setIsAdvancedExpanded] = useState(false);

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
        titleFontFamilySize,
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
      titleFontFamilySize,
    ]
  );

  useLayoutEffect(() => {
    const onHoverOption: ISelectOption | undefined =
      TitleVisibilityOptions.find(
        (option) => option.value === TitleVisibility.ON_HOVER
      );

    if (titlePosition === TitlePosition.BELOW) {
      if (onHoverOption) {
        onHoverOption.isDisabled = true;
      }

      if (titleVisibility === TitleVisibility.ON_HOVER) {
        setTitleVisibility(TitleVisibility.ALWAYS_SHOWN);
      }
    }

    return () => {
      if (onHoverOption) {
        onHoverOption.isDisabled = false;
      }
    };
  }, [titlePosition]);

  const onToggleMainExpand = () => setIsMainExpanded((prevValue) => !prevValue);

  const onToggleAdvancedExpand = () =>
    setIsAdvancedExpanded((prevValue) => !prevValue);

  const renderMainSettings = (): ReactNode => {
    return (
      <>
        <Aligner onClick={onToggleMainExpand}>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            style={{margin: '0 5px', cursor: 'default'}}
          >
            {'General'}
          </Typography>
          <span>
            <ExpandMore expand={isMainExpanded}>
              <ExpandMoreIcon />
            </ExpandMore>
          </span>
        </Aligner>
        <Collapse in={isMainExpanded} timeout="auto" unmountOnExit>
          <Divider variant="middle" style={{margin: '15px 0'}} />
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
        </Collapse>
      </>
    );
  };

  const renderAdvancedSettings = (): ReactNode => {
    return (
      <>
        <Aligner onClick={onToggleAdvancedExpand}>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            style={{margin: '5px', cursor: 'default'}}
          >
            {'Advanced'}
          </Typography>
          <span>
            <ExpandMore expand={isAdvancedExpanded}>
              <ExpandMoreIcon />
            </ExpandMore>
          </span>
        </Aligner>
        <Collapse in={isAdvancedExpanded} timeout="auto" unmountOnExit>
          <Divider variant="middle" style={{margin: '15px 0'}} />
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
            {titleVisibility !== TitleVisibility.NONE && renderTitleOptions()}
          </Grid>
        </Collapse>
      </>
    );
  };

  const renderTitleOptions = (): ReactNode => {
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
            value={titleFontFamilySize}
            onChange={settitleFontFamilySize}
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
