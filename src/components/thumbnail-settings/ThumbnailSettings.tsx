import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
import {useSettings} from 'components/settings';
import {useTemplates} from 'contexts';
import {Section} from 'core-components/section';
import {
  HoverEffectOptions,
  IThumbnailSettings,
  TitleSourceOptions,
  ThumbnailTitlePosition,
  ThumbnailTitlePositionOptions,
  TitleAlignmentOptions,
  TitleVisibility,
  TitleVisibilityOptions,
  CaptionSourceOptions,
} from 'data-structures';
import React, {ReactNode, useMemo} from 'react';
import {
  ColorControl,
  FontControl,
  ISelectOption,
  NumberControl,
  SelectControl,
  SliderControl, SwitchControl,
} from '../controls';
import {Filter} from '../settings/Filter';

interface IThumbnailSettingsProps {
  isLoading?: boolean;
}

const ThumbnailSettings: React.FC<IThumbnailSettingsProps> = ({isLoading}) => {
  const {resetTemplate} = useTemplates();
  const {thumbnailSettings: value, changeThumbnailSettings: onChange} =
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
    titleSource,
    titlePosition,
    titleAlignment,
    titleVisibility,
    titleFontFamily,
    titleColor,
    titleFontSize,
    hoverEffect,
    showCaption,
    captionSource,
    captionFontSize,
    captionFontColor,
  } = value as IThumbnailSettings;

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
              <Grid
                  sx={{marginLeft: 0, paddingTop: 2}}
                  container
                  columns={24}
                  rowSpacing={2}
                  columnSpacing={4}
              >
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
                id={'hoverEffect'}
                name={'Hover effect'}
                value={hoverEffect}
                options={HoverEffectOptions}
                onChange={onInputValueChange}
              />
            </Filter>
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
            name={'Title alignment'}
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
        <Grid
            sx={{marginLeft: 0, paddingTop: 2}}
            container
            columns={24}
            rowSpacing={2}
            columnSpacing={4}
        >
          <Filter isLoading={isLoading}>
            <SelectControl
                id={'titleSource'}
                name={'Title source'}
                value={titleSource}
                options={TitleSourceOptions}
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
            <ColorControl
                id={'titleColor'}
                name="Title color"
                value={titleColor}
                onChange={onInputValueChange}
            />
          </Filter>
        </Grid>
        <Grid
            sx={{marginLeft: 0, paddingTop: 2}}
            container
            columns={24}
            rowSpacing={2}
            columnSpacing={4}
        >
          <Filter isLoading={isLoading}>
            <SwitchControl
                id={'showCaption'}
                name={'Show caption'}
                value={showCaption}
                tooltip={
                  <p>
                    The Caption must be set by editing each image from
                    "Images" section.{' '}
                    <a
                        className="seetings__see-more-link"
                        href="https://youtu.be/ziAG16MADbY"
                        target="_blank"
                    >
                      See more
                    </a>
                  </p>
                }
                onChange={onInputValueChange}
            />
          </Filter>
        </Grid>
        {showCaption && (
        <Grid
            sx={{marginLeft: 0, paddingTop: 2}}
            container
            columns={24}
            rowSpacing={2}
            columnSpacing={4}
        >
          <Filter isLoading={isLoading}>
            <SelectControl
                id={'captionSource'}
                name={'Caption source'}
                value={captionSource}
                options={CaptionSourceOptions}
                onChange={onInputValueChange}
            />
          </Filter>
          <Filter isLoading={isLoading}>
            <NumberControl
                id={'captionFontSize'}
                name={'Caption font size'}
                value={captionFontSize}
                onChange={onInputValueChange}
                unit={'px'}
            />
          </Filter>
          <Filter isLoading={isLoading}>
            <ColorControl
                id={'captionFontColor'}
                name="Caption color"
                value={captionFontColor}
                onChange={onInputValueChange}
            />
          </Filter>
        </Grid>
        )}
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

export {ThumbnailSettings};
