import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useSettings} from 'components/settings';
import {TranslationsContext, useTemplates} from 'contexts';
import {usePro} from 'contexts/ProContext';
import {Section} from 'core-components/section';
import {
  GalleryType,
  IGeneralSettings,
  OrderByOptions,
  OrderDirectionOptions,
  PaginationType,
  PaginationTypeOptions,
  PositionOptions,
} from 'data-structures';
import React, {ReactNode, useContext, useMemo} from 'react';
import {Utils} from 'utils';
import {ProIcon} from '../alert-dialog/icons/ProIcon';
import {
  ColorControl,
  ISelectOption,
  NumberControl,
  PositionControl,
  SelectControl,
  SliderControl,
  SwitchControl,
  TextControl,
} from '../controls';
import {Filter} from '../settings/Filter';

const getPaginationTypeOptions = (type: GalleryType) => {
  let options = PaginationTypeOptions;

  switch (type) {
    case GalleryType.MOSAIC:
      options = PaginationTypeOptions.filter(
        (option: ISelectOption) =>
          ![PaginationType.SCROLL, PaginationType.LOAD_MORE].includes(
            option.value as PaginationType
          )
      );
      break;
    case GalleryType.JUSTIFIED:
      options = PaginationTypeOptions.filter(
        (option: ISelectOption) =>
          ![PaginationType.SCROLL, PaginationType.LOAD_MORE].includes(
            option.value as PaginationType
          )
      );
      break;
    case GalleryType.MASONRY:
      options = PaginationTypeOptions.filter(
        (option: ISelectOption) =>
          ![PaginationType.SIMPLE].includes(option.value as PaginationType)
      );
      break;
  }

  return options;
};

interface IGeneralSettingsProps {
  isLoading?: boolean;
}

const GeneralSettings: React.FC<IGeneralSettingsProps> = ({isLoading}) => {
  const {resetTemplate} = useTemplates();
  const {
    generalSettings: value,
    changeGeneralSettings: onChange,
    type,
    thumbnailSettings,
    changeThumbnailSettings,
    mosaicSettings,
    changeMosaicSettings,
    justifiedSettings,
    changeJustifiedSettings,
    masonrySettings,
    blogSettings,
    changeBlogSettings,
    changeMasonrySettings,
  } = useSettings();
  const {
    orderBy,
    orderDirection,
    itemsPerPage,
    activeButtonColor,
    inactiveButtonColor,
    loadMoreButtonColor,
    paginationTextColor,
    paginationButtonTextSize,
    paginationButtonBorderRadius,
    paginationButtonBorderSize,
    paginationButtonBorderColor,
    loadMoreButtonText,
    paginationButtonClass,
    enableWatermark,
    watermarkImageURL,
    watermarkTransparency,
    watermarkSize,
    watermarkPosition,
    enableSearch,
    searchPlaceholderText,
  } = value as IGeneralSettings;

  const showOnlyGalleryOptions: boolean =
    type === GalleryType.SLIDESHOW ||
    type === GalleryType.CUBE ||
    type === GalleryType.CAROUSEL ||
    type === GalleryType.CARDS;

  const paginationType: PaginationType = useMemo(() => {
    if (type === GalleryType.MOSAIC) {
      return mosaicSettings!.paginationType;
    }
    if (type === GalleryType.JUSTIFIED) {
      return justifiedSettings!.paginationType;
    }
    if (type === GalleryType.THUMBNAILS) {
      return thumbnailSettings!.paginationType;
    }
    if (type === GalleryType.MASONRY) {
      return masonrySettings!.paginationType;
    }
    if (type === GalleryType.BLOG) {
      return blogSettings!.paginationType;
    }
    return PaginationType.NONE;
  }, [
    type,
    mosaicSettings,
    justifiedSettings,
    thumbnailSettings,
    masonrySettings,
    blogSettings,
  ]);

  const onInputValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();
    key && onChange({...value, [key]: inputValue});
  };

  const onPaginationTypeChange = (inputValue: any, key?: string) => {
    if (type === GalleryType.MOSAIC) {
      key && changeMosaicSettings({...mosaicSettings, [key]: inputValue});
    }
    if (type === GalleryType.JUSTIFIED) {
      key && changeJustifiedSettings({...justifiedSettings, [key]: inputValue});
    }
    if (type === GalleryType.THUMBNAILS) {
      key && changeThumbnailSettings({...thumbnailSettings, [key]: inputValue});
    }
    if (type === GalleryType.MASONRY) {
      key && changeMasonrySettings({...masonrySettings, [key]: inputValue});
    }
    if (type === GalleryType.BLOG) {
      key && changeBlogSettings({...blogSettings, [key]: inputValue});
    }

    resetTemplate?.();
  };

  const filteredPaginationTypeOptions = getPaginationTypeOptions(
    type as GalleryType
  );

  const {loadMoreText, searchPlaceholder} = useContext(TranslationsContext);

  const renderMainSettings = (): ReactNode => {
    return (
      <Section
        header={'Pagination'}
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'paginationType'}
                name={'Pagination type'}
                value={paginationType}
                options={filteredPaginationTypeOptions}
                onChange={onPaginationTypeChange}
              />
            </Filter>
            {paginationType !== PaginationType.NONE ? (
              <>
                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'itemsPerPage'}
                    name={'Items per page'}
                    defaultValue={itemsPerPage}
                    onChange={Utils.debounce(onInputValueChange)}
                    min={1}
                  />
                </Filter>
                {[PaginationType.LOAD_MORE, PaginationType.SIMPLE].includes(
                  paginationType
                ) ? (
                  <Grid
                    sx={{marginLeft: 0, paddingTop: 2}}
                    container
                    columns={24}
                    rowSpacing={2}
                    columnSpacing={4}
                  >
                    {paginationType === PaginationType.LOAD_MORE ? (
                      <>
                        <Filter isLoading={isLoading}>
                          <ColorControl
                            id={'loadMoreButtonColor'}
                            name="Button color"
                            value={loadMoreButtonColor}
                            onChange={onInputValueChange}
                          />
                        </Filter>
                      </>
                    ) : null}
                    {paginationType === PaginationType.SIMPLE ? (
                      <>
                        <Filter isLoading={isLoading}>
                          <ColorControl
                            id={'activeButtonColor'}
                            name="Active button color"
                            value={activeButtonColor}
                            onChange={onInputValueChange}
                          />
                        </Filter>
                      </>
                    ) : null}
                    <Filter isLoading={isLoading}>
                      <NumberControl
                        id={'paginationButtonBorderRadius'}
                        name={'Button border radius'}
                        value={paginationButtonBorderRadius}
                        onChange={onInputValueChange}
                        unit={'px'}
                        max={50}
                        step={1}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <NumberControl
                        id={'paginationButtonBorderSize'}
                        name={'Button border size'}
                        value={paginationButtonBorderSize}
                        onChange={onInputValueChange}
                        unit={'px'}
                        max={20}
                        step={1}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <ColorControl
                        id={'paginationButtonBorderColor'}
                        name={'Button border color'}
                        value={paginationButtonBorderColor}
                        onChange={onInputValueChange}
                      />
                    </Filter>

                    {paginationType === PaginationType.SIMPLE ? (
                      <>
                        <Filter isLoading={isLoading}>
                          <ColorControl
                            id={'inactiveButtonColor'}
                            name="Inactive button color"
                            value={inactiveButtonColor}
                            onChange={onInputValueChange}
                          />
                        </Filter>
                      </>
                    ) : null}
                    <Filter isLoading={isLoading}>
                      <ColorControl
                        id={'paginationTextColor'}
                        name="Button text color"
                        value={paginationTextColor}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <NumberControl
                        id={'paginationButtonTextSize'}
                        name={'Button text size'}
                        value={paginationButtonTextSize}
                        onChange={onInputValueChange}
                        unit={'rem'}
                        max={3}
                        step={0.025}
                      />
                    </Filter>
                    {paginationType === PaginationType.LOAD_MORE ? (
                      <>
                        <Filter isLoading={isLoading}>
                          <TextControl
                            id={'loadMoreButtonText'}
                            name="Button text"
                            placeholder={loadMoreText?.toUpperCase()}
                            value={loadMoreButtonText}
                            onChange={onInputValueChange}
                          />
                        </Filter>
                      </>
                    ) : null}
                    <Filter isLoading={isLoading}>
                      <TextControl
                        id={'paginationButtonClass'}
                        name="Button CSS class"
                        tooltip={
                          <p>
                            Multiple CSS class names should be separated with
                            spaces.
                          </p>
                        }
                        value={paginationButtonClass}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                  </Grid>
                ) : null}
              </>
            ) : null}
          </Grid>
        }
      />
    );
  };

  const renderSortingSettings = (): ReactNode => {
    return (
      <Section
        header={'Sorting'}
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'orderBy'}
                name={'Order by'}
                value={orderBy}
                options={OrderByOptions}
                onChange={onInputValueChange}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'orderDirection'}
                name={'Order direction'}
                value={orderDirection}
                options={OrderDirectionOptions}
                onChange={onInputValueChange}
              />
            </Filter>
          </Grid>
        }
      />
    );
  };

  const {isPro} = usePro();

  const renderWatermarkSettings = (): ReactNode => {
    return (
      <Section
        header={
          <>
            Watermark
            <ProIcon />
          </>
        }
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'enableWatermark'}
                name={'Enable'}
                tooltip={
                  <p>
                    Applies a non-destructive watermark overlay. The original
                    image remains unchanged.
                  </p>
                }
                value={enableWatermark}
                onChange={
                  isPro
                    ? onInputValueChange
                    : (window as any).reacg_open_premium_offer_dialog
                }
              />
            </Filter>
            {enableWatermark && (
              <>
                <Filter isLoading={isLoading}>
                  <TextControl
                    id={'watermarkImageURL'}
                    name="Image URL"
                    tooltip={
                      <p>
                        Provide the absolute URL of the image you would like to
                        use as watermark.
                      </p>
                    }
                    value={watermarkImageURL}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SliderControl
                    id={'watermarkTransparency'}
                    name="Transparency (%)"
                    min={0}
                    max={100}
                    value={watermarkTransparency}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SliderControl
                    id={'watermarkSize'}
                    name="Size (%)"
                    min={0}
                    max={100}
                    value={watermarkSize}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <PositionControl
                    id={'watermarkPosition'}
                    name="Position"
                    tooltip={<p>Choose where the watermark will be placed.</p>}
                    value={watermarkPosition}
                    options={PositionOptions}
                    onChange={onInputValueChange}
                  />
                </Filter>
              </>
            )}
          </Grid>
        }
        defaultExpanded={false}
      />
    );
  };

  const renderSearchSettings = (): ReactNode => {
    return (
      <Section
        header={'Filter'}
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Grid
              sx={{marginLeft: 0, paddingTop: 2}}
              container
              columns={24}
              rowSpacing={2}
              columnSpacing={4}
            >
              <Filter isLoading={isLoading}>
                <SwitchControl
                  id={'enableSearch'}
                  name={'Enable Search'}
                  value={enableSearch}
                  onChange={onInputValueChange}
                  tooltip={
                    <p>
                      Activate a search field that allows users to find gallery
                      items by matching keywords in the title, description, alt
                      text, or caption.
                    </p>
                  }
                />
              </Filter>
              {enableSearch && (
                <Filter isLoading={isLoading}>
                  <TextControl
                    id={'searchPlaceholderText'}
                    name="Placeholder text"
                    value={searchPlaceholderText}
                    placeholder={searchPlaceholder}
                    onChange={onInputValueChange}
                  />
                </Filter>
              )}
            </Grid>
          </Grid>
        }
        defaultExpanded={false}
      />
    );
  };

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      {renderSortingSettings()}
      {!showOnlyGalleryOptions ? renderMainSettings() : null}
      {renderSearchSettings()}
      {renderWatermarkSettings()}
    </Paper>
  );
};

export {GeneralSettings};
