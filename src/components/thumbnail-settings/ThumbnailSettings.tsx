import {InputLabel} from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
import {useSettings} from 'components/settings';
import {useTemplates} from 'contexts';
import {Section} from 'core-components/section';
import {
  AspectRatioOptions,
  CaptionSourceOptions,
  DescriptionPositionOptions,
  DescriptionSourceOptions,
  HoverEffectOptions,
  IThumbnailSettings,
  ThumbnailTitlePosition,
  ThumbnailTitlePositionOptions,
  TitleAlignmentOptions,
  TitleSourceOptions,
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
  SwitchControl,
} from '../controls';
import {LabelWithTooltip} from '../controls/LabelWithTooltip';
import {Filter} from '../settings/Filter';

interface IThumbnailSettingsProps {
  isLoading?: boolean;
}

const ThumbnailSettings: React.FC<IThumbnailSettingsProps> = ({isLoading}) => {
  const {resetTemplate} = useTemplates();
  const {thumbnailSettings: value, changeThumbnailSettings: onChange} =
    useSettings();
  const {
    fillContainer,
    aspectRatio,
    width,
    height,
    columns,
    gap,
    itemBorder,
    itemBackgroundColor,
    itemBorderRadius,
    backgroundColor,
    containerPadding,
    padding,
    paddingColor,
    borderRadius,
    showTitle,
    titleSource,
    titlePosition,
    captionPosition,
    titleAlignment,
    captionVisibility,
    titleVisibility,
    titleFontFamily,
    titleColor,
    titleFontSize,
    overlayTextBackground,
    invertTextColor,
    hoverEffect,
    showCaption,
    captionSource,
    captionFontSize,
    captionFontColor,
    showDescription,
    descriptionSource,
    descriptionPosition,
    descriptionFontSize,
    descriptionFontColor,
    descriptionMaxRowsCount,
  } = value as IThumbnailSettings;

  const isThumbnailTitlePositionEditable: boolean = borderRadius <= 50;

  const onInputValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();

    key && onChange({...value, [key]: inputValue});
  };

  const titlePositionOptions: ISelectOption[] = useMemo(() => {
    let options = [...ThumbnailTitlePositionOptions]; // Copy, never mutate original.

    if (titleVisibility === TitleVisibility.ON_HOVER) {
      // Remove BELOW and ABOVE completely.
      options = options.filter(
        (option) =>
          option.value !== ThumbnailTitlePosition.BELOW &&
          option.value !== ThumbnailTitlePosition.ABOVE
      );

      // If current value is BELOW or ABOVE, replace with fallback.
      if (titlePosition === ThumbnailTitlePosition.BELOW) {
        onChange({
          ...value,
          titlePosition: ThumbnailTitlePosition.BOTTOM,
        });
      }
      if (titlePosition === ThumbnailTitlePosition.ABOVE) {
        onChange({
          ...value,
          titlePosition: ThumbnailTitlePosition.TOP,
        });
      }
    }

    return options;
  }, [titlePosition, titleVisibility, onChange, value]);

  const renderBasicSettings = (): ReactNode => {
    return (
      <Section
        header={'Basic'}
        body={
          <>
            <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
              <Filter isLoading={isLoading}>
                <SwitchControl
                  id={'fillContainer'}
                  name={'Fill container'}
                  tooltip={
                    <p>
                      Choose how thumbnails are sized. Enable “Fill Container”
                      to let thumbnails scale automatically to fill the
                      available space using Image aspect ratio and Columns.
                      Disable to set fixed Image width and height manually
                      (container may not always be filled).
                    </p>
                  }
                  value={fillContainer}
                  onChange={onInputValueChange}
                />
              </Filter>
              {fillContainer ? (
                <Filter isLoading={isLoading}>
                  <SelectControl
                    id={'aspectRatio'}
                    name={'Image aspect ratio'}
                    value={aspectRatio}
                    options={AspectRatioOptions}
                    onChange={onInputValueChange}
                  />
                </Filter>
              ) : (
                <>
                  <Filter isLoading={isLoading}>
                    <NumberControl
                      id={'width'}
                      name={'Image width'}
                      value={width}
                      onChange={onInputValueChange}
                      min={0}
                      unit={'px'}
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <NumberControl
                      id={'height'}
                      name={'Image height'}
                      value={height}
                      onChange={onInputValueChange}
                      min={0}
                      unit={'px'}
                    />
                  </Filter>
                </>
              )}
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

  const renderTitleSection = (): ReactNode => {
    return (
      <Section
        header={'Text & Metadata'}
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            {renderTitleSettings()}
            {renderCaptionSettings()}
            {renderDescriptionSettings()}
            {(showTitle || showCaption || showDescription) && (
              <>
                <Grid
                  sx={{marginLeft: 0, paddingTop: 2}}
                  container
                  columns={24}
                  rowSpacing={2}
                  columnSpacing={4}
                >
                  <Filter isLoading={isLoading}>
                    <InputLabel shrink variant="filled">
                      <LabelWithTooltip label={'Text'} tooltip={''} />
                    </InputLabel>
                  </Filter>
                </Grid>
                <Grid
                  container
                  columns={24}
                  rowSpacing={2}
                  columnSpacing={4}
                  className="reacg-section__container-inherit"
                >
                  <Filter isLoading={isLoading}>
                    <SelectControl
                      id={'titleAlignment'}
                      name={'Alignment'}
                      value={titleAlignment}
                      options={TitleAlignmentOptions}
                      onChange={onInputValueChange}
                      isDisabled={!isThumbnailTitlePositionEditable}
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <FontControl
                      id={'titleFontFamily'}
                      name={'Font family'}
                      value={titleFontFamily}
                      onChange={onInputValueChange}
                      isDisabled={!isThumbnailTitlePositionEditable}
                    />
                  </Filter>
                  {((showTitle &&
                    titlePosition !== ThumbnailTitlePosition.BELOW &&
                    titlePosition !== ThumbnailTitlePosition.ABOVE) ||
                    (showCaption &&
                      captionPosition !== ThumbnailTitlePosition.BELOW &&
                      captionPosition !== ThumbnailTitlePosition.ABOVE)) && (
                    <>
                      <Filter isLoading={isLoading}>
                        <ColorControl
                          id={'overlayTextBackground'}
                          name={'Overlay text background'}
                          value={overlayTextBackground}
                          onChange={onInputValueChange}
                          tooltip={
                            <p>
                              Set a background color for text displayed directly
                              on the image (top, center, or bottom positions).
                              Not applied when the text is above or below the
                              image.
                            </p>
                          }
                        />
                      </Filter>
                      <Filter isLoading={isLoading}>
                        <SwitchControl
                          id={'invertTextColor'}
                          name={'Invert color'}
                          tooltip={
                            <p>
                              Enable this to invert the text color dynamically,
                              ensuring it stays visible against any background.
                              Not applied when the text is above or below the
                              image.
                            </p>
                          }
                          value={invertTextColor}
                          onChange={onInputValueChange}
                        />
                      </Filter>
                    </>
                  )}
                </Grid>
              </>
            )}
          </Grid>
        }
        defaultExpanded={false}
      />
    );
  };

  const renderAdvancedSettings = (): ReactNode => {
    return (
      <Section
        header={'Advanced'}
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Grid
              sx={{marginLeft: 0, paddingTop: 2}}
              container
              columns={24}
              rowSpacing={2}
              columnSpacing={4}
            >
              <Grid
                sx={{marginLeft: 0, paddingTop: 2}}
                container
                columns={24}
                rowSpacing={2}
                columnSpacing={4}
              >
                <Filter isLoading={isLoading}>
                  <InputLabel shrink variant="filled">
                    <LabelWithTooltip label={'Container'} tooltip={''} />
                  </InputLabel>
                </Filter>
              </Grid>
              <Grid
                container
                columns={24}
                rowSpacing={2}
                columnSpacing={4}
                className="reacg-section__container-inherit"
              >
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
                    name="Padding (px)"
                    min={0}
                    max={100}
                    value={containerPadding}
                    onChange={onInputValueChange}
                  />
                </Filter>
              </Grid>
            </Grid>
            <Grid
              sx={{marginLeft: 0, paddingTop: 2}}
              container
              columns={24}
              rowSpacing={2}
              columnSpacing={4}
            >
              <Grid
                sx={{marginLeft: 0, paddingTop: 2}}
                container
                columns={24}
                rowSpacing={2}
                columnSpacing={4}
              >
                <Filter isLoading={isLoading}>
                  <InputLabel shrink variant="filled">
                    <LabelWithTooltip label={'Items'} tooltip={''} />
                  </InputLabel>
                </Filter>
              </Grid>
              <Grid
                container
                columns={24}
                rowSpacing={2}
                columnSpacing={4}
                className="reacg-section__container-inherit"
              >
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
                    id={'itemBorder'}
                    name="Border (px)"
                    min={0}
                    max={100}
                    value={itemBorder}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id={'itemBackgroundColor'}
                    name="Background color"
                    value={itemBackgroundColor}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SliderControl
                    id={'itemBorderRadius'}
                    name="Border radius (%)"
                    min={0}
                    value={itemBorderRadius}
                    max={50}
                    onChange={onInputValueChange}
                  />
                </Filter>
              </Grid>
            </Grid>
            <Grid
              sx={{marginLeft: 0, paddingTop: 2}}
              container
              columns={24}
              rowSpacing={2}
              columnSpacing={4}
            >
              <Grid
                sx={{marginLeft: 0, paddingTop: 2}}
                container
                columns={24}
                rowSpacing={2}
                columnSpacing={4}
              >
                <Filter isLoading={isLoading}>
                  <InputLabel shrink variant="filled">
                    <LabelWithTooltip label={'Images'} tooltip={''} />
                  </InputLabel>
                </Filter>
              </Grid>
              <Grid
                container
                columns={24}
                rowSpacing={2}
                columnSpacing={4}
                className="reacg-section__container-inherit"
              >
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
                  <SliderControl
                    id={'padding'}
                    name="Border (px)"
                    min={0}
                    max={100}
                    value={padding}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id={'paddingColor'}
                    name="Border color"
                    value={paddingColor}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SliderControl
                    id={'borderRadius'}
                    name="Border radius (%)"
                    min={0}
                    value={borderRadius}
                    max={50}
                    onChange={onInputValueChange}
                  />
                </Filter>
              </Grid>
            </Grid>
          </Grid>
        }
        defaultExpanded={false}
      />
    );
  };

  const renderTitleSettings = (): ReactNode => {
    return (
      <Grid
        sx={{marginLeft: 0, paddingTop: 2}}
        container
        columns={24}
        rowSpacing={2}
        columnSpacing={4}
      >
        <Grid
          sx={{marginLeft: 0, paddingTop: 2}}
          container
          columns={24}
          rowSpacing={2}
          columnSpacing={4}
        >
          <Filter isLoading={isLoading}>
            <SwitchControl
              id={'showTitle'}
              name={'Show title'}
              value={showTitle}
              tooltip={
                <p>
                  The Title must be set by editing each image from "Images"
                  section.{' '}
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
          {showTitle && (
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'titleSource'}
                name={'Source'}
                value={titleSource}
                options={TitleSourceOptions}
                onChange={onInputValueChange}
              />
            </Filter>
          )}
        </Grid>
        {showTitle && (
          <Grid
            container
            columns={24}
            rowSpacing={2}
            columnSpacing={4}
            className="reacg-section__container-inherit"
          >
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'titleVisibility'}
                name={'Visibility'}
                value={titleVisibility}
                options={TitleVisibilityOptions}
                onChange={onInputValueChange}
                isDisabled={!isThumbnailTitlePositionEditable}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'titlePosition'}
                name={'Position'}
                value={titlePosition}
                options={titlePositionOptions}
                onChange={onInputValueChange}
                isDisabled={!isThumbnailTitlePositionEditable}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <NumberControl
                id={'titleFontSize'}
                name={'Font size'}
                value={titleFontSize}
                onChange={onInputValueChange}
                unit={'px'}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <ColorControl
                id={'titleColor'}
                name="Color"
                value={titleColor}
                onChange={onInputValueChange}
              />
            </Filter>
          </Grid>
        )}
      </Grid>
    );
  };

  const renderCaptionSettings = (): ReactNode => {
    return (
      <>
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
                  The Caption must be set by editing each image from "Images"
                  section.{' '}
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
          {showCaption && (
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'captionSource'}
                name={'Source'}
                value={captionSource}
                options={CaptionSourceOptions}
                onChange={onInputValueChange}
              />
            </Filter>
          )}
        </Grid>
        {showCaption && (
          <Grid
            container
            columns={24}
            rowSpacing={2}
            columnSpacing={4}
            className="reacg-section__container-inherit"
          >
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'captionVisibility'}
                name={'Visibility'}
                value={captionVisibility}
                options={TitleVisibilityOptions}
                onChange={onInputValueChange}
                isDisabled={!isThumbnailTitlePositionEditable}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'captionPosition'}
                name={'Position'}
                value={captionPosition}
                options={titlePositionOptions}
                onChange={onInputValueChange}
                isDisabled={!isThumbnailTitlePositionEditable}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <NumberControl
                id={'captionFontSize'}
                name={'Font size'}
                value={captionFontSize}
                onChange={onInputValueChange}
                unit={'px'}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <ColorControl
                id={'captionFontColor'}
                name="Color"
                value={captionFontColor}
                onChange={onInputValueChange}
              />
            </Filter>
          </Grid>
        )}
      </>
    );
  };

  const renderDescriptionSettings = (): ReactNode => {
    return (
      <>
        <Grid
          sx={{marginLeft: 0, paddingTop: 2}}
          container
          columns={24}
          rowSpacing={2}
          columnSpacing={4}
        >
          <Filter isLoading={isLoading}>
            <SwitchControl
              id={'showDescription'}
              name={'Show Description'}
              value={showDescription}
              tooltip={
                <p>
                  The Description must be set by editing each image from
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
          {showDescription && (
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'descriptionSource'}
                name={'Source'}
                value={descriptionSource}
                options={DescriptionSourceOptions}
                onChange={onInputValueChange}
              />
            </Filter>
          )}
        </Grid>
        {showDescription && (
          <Grid
            container
            columns={24}
            rowSpacing={2}
            columnSpacing={4}
            className="reacg-section__container-inherit"
          >
            <Filter isLoading={isLoading}>
              <NumberControl
                id={'descriptionMaxRowsCount'}
                name={'Max rows count'}
                value={descriptionMaxRowsCount}
                onChange={onInputValueChange}
                min={1}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'descriptionPosition'}
                name={'Position'}
                value={descriptionPosition}
                options={DescriptionPositionOptions}
                onChange={onInputValueChange}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <NumberControl
                id={'descriptionFontSize'}
                name={'Font size'}
                value={descriptionFontSize}
                onChange={onInputValueChange}
                unit={'px'}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <ColorControl
                id={'descriptionFontColor'}
                name="Color"
                value={descriptionFontColor}
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
      {renderTitleSection()}
      {renderAdvancedSettings()}
    </Paper>
  );
};

export {ThumbnailSettings};
