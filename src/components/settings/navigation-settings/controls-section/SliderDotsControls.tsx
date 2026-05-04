import {Grid} from '@mui/material';
import {
  ColorControl,
  FontControl,
  NumberControl,
  SelectControl,
  SliderControl,
  SwitchControl,
} from 'components/controls';
import {
  ISliderSettings,
  SliderPaginationType,
  SliderPaginationTypeOptions,
} from 'data-structures';
import {SliderPaginationPositionOptions} from 'data-structures/enum/SliderPaginationPosition';
import {ReactElement, useEffect} from 'react';
import {Filter} from '../../Filter';
interface SliderDotsControlsProps {
  isLoading: boolean;
  isPro: boolean;
  values: any;
  onChange: (value: any, key?: string) => void;
  onProFeatureClick: (utmMedium: string) => void;
  changeSliderSettings?: (settings: ISliderSettings) => void;
}
const SliderDotsControls = ({
  isLoading,
  values,
  onChange,
  isPro,
  onProFeatureClick,
  changeSliderSettings,
}: SliderDotsControlsProps): ReactElement => {
  const {
    pagination,
    paginationPosition,
    paginationBulletsImage,
    paginationType,
    paginationshowsOnHover,
    paginationBulletsBackgroundColor,
    paginationBulletsSize,
    paginationBulletsBorder,
    paginationBulletsBorderColor,
    paginationBulletsBorderRadius,
    paginationActiveBulletBackgroundColor,
    paginationActiveBulletSize,
    paginationActiveBulletBorder,
    paginationActiveBulletBorderColor,
    paginationActiveBulletBorderRadius,
    paginationFractionColor,
    paginationFractionFontSize,
    paginationFractionTextFontFamily,
  } = values;

  useEffect(() => {
    changeSliderSettings!({...values, paginationActiveBulletSize: 0});
  }, [paginationType]);

  return (
    <Grid
      container
      columns={24}
      rowSpacing={2}
      columnSpacing={4}
      sx={{marginLeft: 0, paddingTop: 2}}
    >
      {/* ENABLE PAGINATION */}
      <Filter isLoading={isLoading}>
        <SwitchControl
          id="pagination"
          name="Dots"
          value={pagination}
          onChange={onChange}
        />
      </Filter>

      {pagination && (
        <>
          <Filter isLoading={isLoading}>
            <SelectControl
              id={'paginationType'}
              name={'Dots type'}
              // pro={true}
              value={paginationType}
              options={SliderPaginationTypeOptions}
              onChange={onChange}
            />
          </Filter>

          {/* BASIC OPTIONS */}

          <Filter isLoading={isLoading}>
            <SwitchControl
              id="paginationshowsOnHover"
              name="Dots shows on hover"
              value={paginationshowsOnHover}
              onChange={onChange}
            />
          </Filter>

          {paginationType !== SliderPaginationType.FRACTION &&
            paginationType !== SliderPaginationType.NUMBERS && (
              <Filter isLoading={isLoading}>
                <SwitchControl
                  id="paginationBulletsImage"
                  name="Dots image bullets"
                  value={paginationBulletsImage}
                  onChange={onChange}
                />
              </Filter>
            )}

          {paginationType !== SliderPaginationType.DYNAMIC && (
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'paginationPosition'}
                name={' Dots position'}
                value={paginationPosition}
                options={SliderPaginationPositionOptions}
                onChange={
                  isPro ? onChange : () => onProFeatureClick('enable_filmstrip')
                }
              />
            </Filter>
          )}
          {/* ───────────────── BULLETS ───────────────── */}

          {paginationType !== SliderPaginationType.FRACTION && (
            <>
              {/* CONTROLS */}
              <Grid
                sx={{marginLeft: 0, paddingTop: 2}}
                container
                columns={24}
                rowSpacing={2}
                columnSpacing={4}
                className="reacg-section__container-inherit"
              >
                {!paginationBulletsImage && (
                  <Filter isLoading={isLoading}>
                    <ColorControl
                      id="paginationBulletsBackgroundColor"
                      name="Dots background color"
                      value={paginationBulletsBackgroundColor}
                      onChange={onChange}
                    />
                  </Filter>
                )}

                <Filter isLoading={isLoading}>
                  <SliderControl
                    id="paginationBulletsSize"
                    name="Dots size (px)"
                    min={0}
                    max={300}
                    value={paginationBulletsSize}
                    onChange={onChange}
                  />
                </Filter>

                <Filter isLoading={isLoading}>
                  <SliderControl
                    id="paginationBulletsBorder"
                    name="Dots border (px)"
                    min={0}
                    max={5}
                    value={paginationBulletsBorder}
                    onChange={onChange}
                  />
                </Filter>

                <Filter isLoading={isLoading}>
                  <SliderControl
                    id="paginationBulletsBorderRadius"
                    name="Dots border radius (%)"
                    min={0}
                    max={99}
                    value={paginationBulletsBorderRadius}
                    onChange={onChange}
                  />
                </Filter>

                <Filter isLoading={isLoading}>
                  <ColorControl
                    id="paginationBulletsBorderColor"
                    name="Dots border color"
                    value={paginationBulletsBorderColor}
                    onChange={onChange}
                  />
                </Filter>
              </Grid>
            </>
          )}
          {/* ─────────────── ACTIVE BULLET ─────────────── */}
          {paginationType !== SliderPaginationType.FRACTION && (
            <>
              {/* CONTROLS */}
              <Grid
                sx={{marginLeft: 0, paddingTop: 2}}
                container
                columns={24}
                rowSpacing={2}
                columnSpacing={4}
                className="reacg-section__container-inherit"
              >
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id="paginationActiveBulletBackgroundColor"
                    name="Active dot background color"
                    value={paginationActiveBulletBackgroundColor}
                    onChange={onChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id="paginationActiveBulletBorderColor"
                    name="Active dot border color"
                    value={paginationActiveBulletBorderColor}
                    onChange={onChange}
                  />
                </Filter>
                {paginationType !== SliderPaginationType.DYNAMIC && (
                  <Filter isLoading={isLoading}>
                    <SliderControl
                      id="paginationActiveBulletSize"
                      name="Active dot size (px)"
                      min={0}
                      max={300}
                      value={paginationActiveBulletSize}
                      onChange={onChange}
                    />
                  </Filter>
                )}

                <Filter isLoading={isLoading}>
                  <SliderControl
                    id="paginationActiveBulletBorder"
                    name="Active dot border (px)"
                    min={0}
                    max={5}
                    value={paginationActiveBulletBorder}
                    onChange={onChange}
                  />
                </Filter>

                <Filter isLoading={isLoading}>
                  <SliderControl
                    id="paginationActiveBulletBorderRadius"
                    name="Active dot border radius (%)"
                    min={0}
                    max={99}
                    value={paginationActiveBulletBorderRadius}
                    onChange={onChange}
                  />
                </Filter>
              </Grid>
            </>
          )}

          {/* ─────────────── FRACTION  NUMBER─────────────── */}
          {(paginationType === SliderPaginationType.FRACTION ||
            paginationType === SliderPaginationType.NUMBERS) && (
            <>
              {/* CONTROLS */}
              <Grid
                sx={{marginLeft: 0, paddingTop: 2}}
                container
                columns={24}
                rowSpacing={2}
                columnSpacing={4}
                className="reacg-section__container-inherit"
              >
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id={'paginationFractionColor'}
                    name="Fraction color"
                    value={paginationFractionColor}
                    onChange={onChange}
                  />
                </Filter>

                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'paginationFractionFontSize'}
                    name={'Fraction font size'}
                    value={paginationFractionFontSize}
                    onChange={onChange}
                    unit={'px'}
                    max={200}
                    step={1}
                  />
                </Filter>

                <Filter isLoading={isLoading}>
                  <FontControl
                    id={'paginationFractionTextFontFamily'}
                    name={'Fraction font family'}
                    value={paginationFractionTextFontFamily}
                    onChange={onChange}
                  />
                </Filter>
              </Grid>
            </>
          )}
        </>
      )}
    </Grid>
  );
};
export default SliderDotsControls;
