import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Section} from 'core-components';
import {Direction, DirectionOptions} from 'data-structures';
import React, {ReactNode} from 'react';
import {
  ColorControl,
  NumberControl,
  SelectControl,
  SliderControl,
} from '../controls';
import {Filter} from '../settings/Filter';

interface IMosaicSettings {
  width: number;
  direction: Direction;
  gap: number;
  backgroundColor: string;
  padding: number;
  paddingColor: string;
  rowHeight: number;
  columns?: number | undefined;
}

interface IMosaicSettingsProps {
  value: IMosaicSettings;
  onChange: (newSettings: IMosaicSettings) => void;
  isLoading?: boolean;
}

const MosaicSettings: React.FC<IMosaicSettingsProps> = ({
  value,
  onChange,
  isLoading,
}) => {
  const {
    width,
    direction,
    gap,
    backgroundColor,
    padding,
    paddingColor,
    rowHeight,
    columns,
  } = value;

  const onInputValueChange = (inputValue: any, key?: string) => {
    key && onChange({...value, [key]: inputValue});
  };

  const renderBasicSettings = (): ReactNode => {
    return (
      <Section
        header={'Basic'}
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SliderControl
                id={'width'}
                name="Width (%)"
                min={0}
                max={100}
                value={width}
                onChange={onInputValueChange}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'direction'}
                name={'Direction'}
                value={direction}
                options={DirectionOptions}
                onChange={onInputValueChange}
              />
            </Filter>
            {direction === Direction.HORIZONTAL ? (
              <Filter isLoading={isLoading}>
                <NumberControl
                  id={'rowHeight'}
                  name={'Row height'}
                  value={rowHeight}
                  onChange={onInputValueChange}
                  min={0}
                  unit={'px'}
                />
              </Filter>
            ) : (
              <Filter isLoading={isLoading}>
                <NumberControl
                  id={'columns'}
                  name={'Columns'}
                  value={columns}
                  onChange={onInputValueChange}
                  min={1}
                />
              </Filter>
            )}
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
          </Grid>
        }
        defaultExpanded={false}
      />
    );
  };

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      {renderBasicSettings()}
      {renderAdvancedSettings()}
    </Paper>
  );
};

export {MosaicSettings, type IMosaicSettings};
