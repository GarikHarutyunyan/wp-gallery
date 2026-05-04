import {Grid} from '@mui/material';
import {
  ColorControl,
  SelectControl,
  SliderControl,
  SwitchControl,
} from 'components/controls';
import {
  SliderNavigationPositionV2Options,
  SliderNavigationTypeOptions,
} from 'data-structures';
import {ReactElement} from 'react';
import {Filter} from '../../Filter';

interface SliderArrowsControlsProps {
  isLoading: boolean;
  isPro: boolean;
  values: any;
  onChange: (value: any, key?: string) => void;
  onProFeatureClick: (utmMedium: string) => void;
}

const SliderArrowsControls = ({
  isLoading,
  values,
  onChange,
  isPro,
  onProFeatureClick,
}: SliderArrowsControlsProps): ReactElement => {
  const {
    navigationButton,
    navigationshowsOnHover,
    navigationType,
    navigationColor,
    navigationBackgroundColor,
    navigationSize,
    navigationPosition,
    navigationPadding,
    navigationOpacity,
    navigationBorder,
    navigationBorderColor,
    navigationBorderRadius,
    navigationHover,
    navigationColorHover,
    navigationBackgroundColorHover,
  } = values;

  return (
    <Grid
      container
      columns={24}
      rowSpacing={2}
      columnSpacing={4}
      sx={{marginLeft: 0, paddingTop: 2}}
    >
      <Filter isLoading={isLoading}>
        <SwitchControl
          id={'navigationButton'}
          name={'Arrows'}
          value={navigationButton}
          onChange={onChange}
        />
      </Filter>
      {navigationButton && (
        <>
          <Filter isLoading={isLoading}>
            <SwitchControl
              id="navigationshowsOnHover"
              name="Arrows shows on hover"
              value={navigationshowsOnHover}
              onChange={onChange}
            />
          </Filter>
          <Filter isLoading={isLoading}>
            <SelectControl
              id={'navigationType'}
              name={'Arrows type'}
              value={navigationType}
              options={SliderNavigationTypeOptions}
              onChange={
                isPro ? onChange : () => onProFeatureClick('enable_filmstrip')
              }
            />
          </Filter>
          <Filter isLoading={isLoading}>
            <SelectControl
              id="navigationPosition"
              name="Arrows position"
              value={navigationPosition}
              options={SliderNavigationPositionV2Options}
              onChange={onChange}
            />
          </Filter>
          <Filter isLoading={isLoading}>
            <SliderControl
              id="navigationSize"
              name="Arrows size (px)"
              min={0}
              max={300}
              value={navigationSize}
              onChange={onChange}
            />
          </Filter>
          <Filter isLoading={isLoading}>
            <SliderControl
              id={'navigationPadding'}
              name="Arrows padding (px)"
              min={0}
              max={100}
              value={navigationPadding}
              onChange={onChange}
            />
          </Filter>
          <Filter isLoading={isLoading}>
            <SliderControl
              id={'navigationOpacity'}
              name="Arrows opacity"
              min={0}
              max={1}
              step={0.05}
              value={navigationOpacity}
              onChange={onChange}
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
              <SliderControl
                id="navigationBorder"
                name="Arrows border (px)"
                min={0}
                max={5}
                value={navigationBorder}
                onChange={onChange}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SliderControl
                id="navigationBorderRadius"
                name="Arrows border radius (%)"
                min={0}
                max={99}
                value={navigationBorderRadius}
                onChange={onChange}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <ColorControl
                id="navigationBorderColor"
                name="Arrows border color"
                value={navigationBorderColor}
                onChange={onChange}
              />
            </Filter>
          </Grid>
          <Filter isLoading={isLoading}>
            <ColorControl
              id="navigationColor"
              name="Arrows color"
              value={navigationColor}
              onChange={onChange}
            />
          </Filter>
          <Filter isLoading={isLoading}>
            <ColorControl
              id="navigationBackgroundColor"
              name="Arrows background color"
              value={navigationBackgroundColor}
              onChange={onChange}
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
                id="navigationHover"
                name="Arrows hover"
                value={navigationHover}
                onChange={onChange}
              />
            </Filter>
            {navigationHover && (
              <>
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id="navigationColorHover"
                    name="Arrows color hover"
                    value={navigationColorHover}
                    onChange={onChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id="navigationBackgroundColorHover"
                    name="Arrows background color hover"
                    value={navigationBackgroundColorHover}
                    onChange={onChange}
                  />
                </Filter>
              </>
            )}{' '}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default SliderArrowsControls;
