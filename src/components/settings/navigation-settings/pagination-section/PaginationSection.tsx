import {Grid} from '@mui/material';
import {
  ColorControl,
  ISelectOption,
  NumberControl,
  SelectControl,
  SwitchControl,
  TextControl,
} from 'components/controls';
import {TranslationsContext, useTemplates} from 'contexts';
import {usePro} from 'contexts/ProContext';
import {Section} from 'core-components';
import {
  GalleryType,
  IGeneralSettings,
  PaginationType,
  PaginationTypeOptions,
} from 'data-structures';
import {useContext, useMemo} from 'react';
import {Utils} from 'utils';
import {useSettings} from '../..';
import {Filter} from '../../Filter';

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

interface IPaginationSectionProps {
  settings: IGeneralSettings;
  onSettingsChange: (settings: IGeneralSettings) => void;
  onProFeatureClick: (utmMedium: string) => void;
  isLoading: boolean;
}

const PaginationSection = ({
  settings,
  onSettingsChange,
  onProFeatureClick,
  isLoading,
}: IPaginationSectionProps) => {
  const {resetTemplate} = useTemplates();
  const {
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
  } = settings;

  const onInputValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();
    key && onSettingsChange?.({...settings, [key]: inputValue} as any);
  };

  const filteredPaginationTypeOptions = getPaginationTypeOptions(type!);

  const showAllItems: boolean = useMemo(() => {
    if (type === GalleryType.MOSAIC) {
      return mosaicSettings!.showAllItems;
    }
    if (type === GalleryType.JUSTIFIED) {
      return justifiedSettings!.showAllItems;
    }
    if (type === GalleryType.THUMBNAILS) {
      console.log(thumbnailSettings!.showAllItems);
      return thumbnailSettings!.showAllItems;
    }
    if (type === GalleryType.MASONRY) {
      return masonrySettings!.showAllItems;
    }
    if (type === GalleryType.BLOG) {
      return blogSettings!.showAllItems;
    }
    return true;
  }, [
    type,
    mosaicSettings,
    justifiedSettings,
    thumbnailSettings,
    masonrySettings,
    blogSettings,
  ]);

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

  const {isPro} = usePro();
  const {loadMoreText} = useContext(TranslationsContext);

  const onPaginationTypeChange = (inputValue: any, key?: string) => {
    if (type === GalleryType.MOSAIC) {
      key &&
        changeMosaicSettings?.({...mosaicSettings, [key]: inputValue} as any);
    }
    if (type === GalleryType.JUSTIFIED) {
      key &&
        changeJustifiedSettings?.({
          ...justifiedSettings,
          [key]: inputValue,
        } as any);
    }
    if (type === GalleryType.THUMBNAILS) {
      key &&
        changeThumbnailSettings?.({
          ...thumbnailSettings,
          [key]: inputValue,
        } as any);
    }
    if (type === GalleryType.MASONRY) {
      key &&
        changeMasonrySettings?.({...masonrySettings, [key]: inputValue} as any);
    }
    if (type === GalleryType.BLOG) {
      key && changeBlogSettings?.({...blogSettings, [key]: inputValue} as any);
    }

    resetTemplate?.();
  };

  return (
    <Section
      header={'Pagination'}
      className="reacg-tab-section"
      body={
        <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
          <Filter isLoading={isLoading}>
            <SelectControl
              id={'paginationType'}
              name={'Type'}
              value={paginationType}
              options={filteredPaginationTypeOptions}
              onChange={(inputValue: any) => {
                if (
                  !isPro &&
                  filteredPaginationTypeOptions.find(
                    (option) => option.value === inputValue
                  )?.isPro
                ) {
                  onProFeatureClick('paginationType');
                } else {
                  onPaginationTypeChange(inputValue, 'paginationType');
                }
              }}
            />
          </Filter>
          {paginationType === PaginationType.NONE && (
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'showAllItems'}
                name={'Show all items'}
                value={showAllItems}
                onChange={(inputValue: any) => {
                  onPaginationTypeChange(inputValue, 'showAllItems');
                }}
                tooltip={
                  <p>
                    When enabled, all items will be displayed at once. Disable
                    this option to specify how many items should be shown.
                  </p>
                }
              />
            </Filter>
          )}
          {(paginationType !== PaginationType.NONE || !showAllItems) && (
            <Filter isLoading={isLoading}>
              <NumberControl
                id={'itemsPerPage'}
                name={'Items per page'}
                defaultValue={itemsPerPage}
                onChange={Utils.debounce(onInputValueChange)}
                min={1}
              />
            </Filter>
          )}
          {paginationType !== PaginationType.NONE ? (
            <>
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
                          pro={true}
                          onChange={
                            isPro
                              ? onInputValueChange
                              : () =>
                                  onProFeatureClick(
                                    'pagination_load_more_button_color'
                                  )
                          }
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
                          pro={true}
                          onChange={
                            isPro
                              ? onInputValueChange
                              : () =>
                                  onProFeatureClick(
                                    'pagination_active_button_color'
                                  )
                          }
                        />
                      </Filter>
                    </>
                  ) : null}
                  <Filter isLoading={isLoading}>
                    <NumberControl
                      id={'paginationButtonBorderRadius'}
                      name={'Button border radius'}
                      value={paginationButtonBorderRadius}
                      unit={'px'}
                      max={50}
                      step={1}
                      pro={true}
                      onChange={
                        isPro
                          ? onInputValueChange
                          : () =>
                              onProFeatureClick(
                                'pagination_button_border_radius'
                              )
                      }
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <NumberControl
                      id={'paginationButtonBorderSize'}
                      name={'Button border size'}
                      value={paginationButtonBorderSize}
                      pro={true}
                      onChange={
                        isPro
                          ? onInputValueChange
                          : () =>
                              onProFeatureClick('pagination_button_border_size')
                      }
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
                      pro={true}
                      onChange={
                        isPro
                          ? onInputValueChange
                          : () =>
                              onProFeatureClick(
                                'pagination_button_border_color'
                              )
                      }
                    />
                  </Filter>

                  {paginationType === PaginationType.SIMPLE ? (
                    <>
                      <Filter isLoading={isLoading}>
                        <ColorControl
                          id={'inactiveButtonColor'}
                          name="Inactive button color"
                          value={inactiveButtonColor}
                          pro={true}
                          onChange={
                            isPro
                              ? onInputValueChange
                              : () =>
                                  onProFeatureClick(
                                    'pagination_inactive_button_color'
                                  )
                          }
                        />
                      </Filter>
                    </>
                  ) : null}
                  <Filter isLoading={isLoading}>
                    <ColorControl
                      id={'paginationTextColor'}
                      name="Button text color"
                      value={paginationTextColor}
                      pro={true}
                      onChange={
                        isPro
                          ? onInputValueChange
                          : () =>
                              onProFeatureClick('pagination_button_text_color')
                      }
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <NumberControl
                      id={'paginationButtonTextSize'}
                      name={'Button text size'}
                      value={paginationButtonTextSize}
                      unit={'rem'}
                      max={3}
                      step={0.025}
                      pro={true}
                      onChange={
                        isPro
                          ? onInputValueChange
                          : () =>
                              onProFeatureClick('pagination_button_text_size')
                      }
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
                      pro={true}
                      onChange={
                        isPro
                          ? onInputValueChange
                          : () => onProFeatureClick('pagination_button_class')
                      }
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

export {PaginationSection};
