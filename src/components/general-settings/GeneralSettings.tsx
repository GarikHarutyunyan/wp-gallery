import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useSettings} from 'components/settings';
import {TranslationsContext, useTemplates} from 'contexts';
import {usePro} from 'contexts/ProContext';
import {Section} from 'core-components/section/Section';
import {
  GalleryType,
  IGeneralSettings,
  OrderByOptions,
  OrderDirectionOptions,
  PaginationType,
  PaginationTypeOptions,
  PositionOptions,
  SliderNavigation,
  SliderNavigationOptions,
  SliderNavigationPositionOptions,
} from 'data-structures';
import React, {ReactNode, useContext, useMemo} from 'react';
import {Utils} from 'utils';
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
  sections?: 'all' | 'main' | 'protection';
}

const GeneralSettings: React.FC<IGeneralSettingsProps> = ({
  isLoading,
  sections = 'all',
}) => {
  const {resetTemplate} = useTemplates();
  const {
    generalSettings: value,
    changeGeneralSettings: onChange,
    type,
    slideshowSettings,
    changeSlideshowSettings,
    cubeSettings,
    changeCubeSettings,
    carouselSettings,
    changeCarouselSettings,
    cardsSettings,
    changeCardsSettings,
    coverflowSettings,
    changeCoverflowSettings,
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
    enableRightClickProtection,
  } = value as IGeneralSettings;

  const showOnlyGalleryOptions: boolean =
    type === GalleryType.SLIDESHOW ||
    type === GalleryType.CUBE ||
    type === GalleryType.CAROUSEL ||
    type === GalleryType.COVERFLOW ||
    type === GalleryType.CARDS;

  const hasSliderNavigationSettings: boolean =
    type === GalleryType.SLIDESHOW ||
    type === GalleryType.CUBE ||
    type === GalleryType.CAROUSEL ||
    type === GalleryType.COVERFLOW ||
    type === GalleryType.CARDS;

  const showMainSections = sections === 'all' || sections === 'main';
  const showProtectionSections =
    sections === 'all' || sections === 'protection';

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

  const onInputValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();
    key && onChange({...value, [key]: inputValue});
  };

  const {isPro} = usePro();

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

  const sliderNavigationSettings = useMemo(() => {
    switch (type) {
      case GalleryType.SLIDESHOW:
        return {
          settings: slideshowSettings,
          onChange: changeSlideshowSettings,
        };
      case GalleryType.CUBE:
        return {
          settings: cubeSettings,
          onChange: changeCubeSettings,
        };
      case GalleryType.CAROUSEL:
        return {
          settings: carouselSettings,
          onChange: changeCarouselSettings,
        };
      case GalleryType.CARDS:
        return {
          settings: cardsSettings,
          onChange: changeCardsSettings,
        };
      case GalleryType.COVERFLOW:
        return {
          settings: coverflowSettings,
          onChange: changeCoverflowSettings,
        };
      default:
        return null;
    }
  }, [
    cardsSettings,
    carouselSettings,
    changeCardsSettings,
    changeCarouselSettings,
    changeCoverflowSettings,
    changeCubeSettings,
    changeSlideshowSettings,
    coverflowSettings,
    cubeSettings,
    slideshowSettings,
    type,
  ]);

  const {loadMoreText, searchPlaceholder} = useContext(TranslationsContext);

  const renderMainSettings = (): ReactNode => {
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
                    (window as any).reacg_open_premium_offer_dialog({
                      utm_medium: 'paginationType',
                    });
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
                                    (
                                      window as any
                                    ).reacg_open_premium_offer_dialog({
                                      utm_medium:
                                        'pagination_load_more_button_color',
                                    })
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
                                    (
                                      window as any
                                    ).reacg_open_premium_offer_dialog({
                                      utm_medium:
                                        'pagination_active_button_color',
                                    })
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
                                (window as any).reacg_open_premium_offer_dialog(
                                  {
                                    utm_medium:
                                      'pagination_button_border_radius',
                                  }
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
                                (window as any).reacg_open_premium_offer_dialog(
                                  {
                                    utm_medium: 'pagination_button_border_size',
                                  }
                                )
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
                                (window as any).reacg_open_premium_offer_dialog(
                                  {
                                    utm_medium:
                                      'pagination_button_border_color',
                                  }
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
                                    (
                                      window as any
                                    ).reacg_open_premium_offer_dialog({
                                      utm_medium:
                                        'pagination_inactive_button_color',
                                    })
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
                                (window as any).reacg_open_premium_offer_dialog(
                                  {
                                    utm_medium: 'pagination_button_text_color',
                                  }
                                )
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
                                (window as any).reacg_open_premium_offer_dialog(
                                  {
                                    utm_medium: 'pagination_button_text_size',
                                  }
                                )
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
                            : () =>
                                (window as any).reacg_open_premium_offer_dialog(
                                  {
                                    utm_medium: 'lightbox_download',
                                  }
                                )
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

  const renderSortingSettings = (): ReactNode => {
    return (
      <Section
        header={'Sorting'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'orderBy'}
                name={'Order by'}
                value={orderBy}
                options={OrderByOptions}
                pro={true}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'order_by',
                        })
                }
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'orderDirection'}
                name={'Order direction'}
                value={orderDirection}
                options={OrderDirectionOptions}
                pro={true}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'order_direction',
                        })
                }
              />
            </Filter>
          </Grid>
        }
      />
    );
  };

  const onSliderNavigationChange = (inputValue: any, key?: string) => {
    if (
      !sliderNavigationSettings?.settings ||
      !sliderNavigationSettings.onChange
    ) {
      return;
    }

    resetTemplate?.();
    key &&
      sliderNavigationSettings.onChange({
        ...sliderNavigationSettings.settings,
        [key]: inputValue,
      });
  };

  const renderSliderNavigationSettings = (): ReactNode => {
    if (!sliderNavigationSettings?.settings) {
      return null;
    }

    if (type === GalleryType.SLIDESHOW) {
      const {isSlideshowAllowed, autoplay, slideDuration, isInfinite} =
        sliderNavigationSettings.settings as any;

      return (
        <Section
          header={'Controls'}
          className="reacg-tab-section"
          body={
            <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
              <Filter isLoading={isLoading}>
                <SwitchControl
                  id={'isSlideshowAllowed'}
                  name={'Play / Pause button'}
                  value={isSlideshowAllowed}
                  onChange={onSliderNavigationChange}
                />
              </Filter>
              <Filter isLoading={isLoading}>
                <SwitchControl
                  id={'autoplay'}
                  name={'Autoplay'}
                  value={autoplay}
                  onChange={onSliderNavigationChange}
                />
              </Filter>
              {autoplay || isSlideshowAllowed ? (
                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'slideDuration'}
                    name={'Autoplay speed'}
                    value={slideDuration}
                    onChange={onSliderNavigationChange}
                    min={700}
                    unit={'ms'}
                  />
                </Filter>
              ) : null}
              <Filter isLoading={isLoading}>
                <SwitchControl
                  id={'isInfinite'}
                  name={'Loop'}
                  value={isInfinite}
                  pro={true}
                  onChange={
                    isPro
                      ? onSliderNavigationChange
                      : () =>
                          (window as any).reacg_open_premium_offer_dialog({
                            utm_medium: 'slideshow_loop',
                          })
                  }
                />
              </Filter>
            </Grid>
          }
        />
      );
    }

    if (
      type === GalleryType.CUBE ||
      type === GalleryType.CAROUSEL ||
      type === GalleryType.CARDS ||
      type === GalleryType.COVERFLOW
    ) {
      const {
        navigation: sliderNavigation,
        arrowsSize,
        arrowsColor,
        dotsPosition,
        dotsSize,
        dotsGap,
        activeDotColor,
        inactiveDotsColor,
        autoplay,
        slideDuration,
        playAndPauseAllowed,
        showVideoCover,
        showVideoControls,
        isInfinite,
      } = sliderNavigationSettings.settings as any;

      const playPauseUtmMedium =
        type === GalleryType.COVERFLOW
          ? 'coverflow_play_pause_button'
          : 'carousel_play_pause_button';
      const videoControlsUtmMedium =
        type === GalleryType.CARDS
          ? 'cards_video_controls'
          : type === GalleryType.COVERFLOW
          ? 'coverflow_video_controls'
          : 'carousel_video_controls';

      return (
        <Section
          header={'Controls'}
          className="reacg-tab-section"
          body={
            <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
              <Filter isLoading={isLoading}>
                <SwitchControl
                  id={'autoplay'}
                  name={'Autoplay'}
                  value={autoplay}
                  onChange={onSliderNavigationChange}
                />
              </Filter>
              {autoplay ? (
                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'slideDuration'}
                    name={'Autoplay speed'}
                    value={slideDuration}
                    onChange={onSliderNavigationChange}
                    min={2000}
                    unit={'ms'}
                  />
                </Filter>
              ) : null}
              <Filter isLoading={isLoading}>
                <SwitchControl
                  id={'playAndPauseAllowed'}
                  name={'Show Play / Pause button'}
                  value={playAndPauseAllowed}
                  pro={true}
                  onChange={
                    isPro
                      ? onSliderNavigationChange
                      : () =>
                          (window as any).reacg_open_premium_offer_dialog({
                            utm_medium: playPauseUtmMedium,
                          })
                  }
                />
              </Filter>
              {!showVideoCover ? (
                <Filter isLoading={isLoading}>
                  <SwitchControl
                    id={'showVideoControls'}
                    name={'Show video controls'}
                    value={showVideoControls}
                    pro={true}
                    onChange={
                      isPro
                        ? onSliderNavigationChange
                        : () =>
                            (window as any).reacg_open_premium_offer_dialog({
                              utm_medium: videoControlsUtmMedium,
                            })
                    }
                  />
                </Filter>
              ) : null}
              {type === GalleryType.CUBE ? (
                <Filter isLoading={isLoading}>
                  <SwitchControl
                    id={'isInfinite'}
                    name={'Loop'}
                    value={isInfinite}
                    pro={true}
                    onChange={
                      isPro
                        ? onSliderNavigationChange
                        : () =>
                            (window as any).reacg_open_premium_offer_dialog({
                              utm_medium: 'cube_loop',
                            })
                    }
                  />
                </Filter>
              ) : null}
              <Grid
                sx={{marginLeft: 0, paddingTop: 2}}
                container
                columns={24}
                rowSpacing={2}
                columnSpacing={4}
              >
                <Filter isLoading={isLoading}>
                  <SelectControl
                    id={'navigation'}
                    name={'Navigation type'}
                    value={sliderNavigation}
                    options={SliderNavigationOptions}
                    onChange={onSliderNavigationChange}
                  />
                </Filter>
              </Grid>
              {(sliderNavigation === SliderNavigation.ARROWS ||
                sliderNavigation === SliderNavigation.ARROWS_AND_DOTS) && (
                <Grid
                  sx={{marginLeft: 0, paddingTop: 2}}
                  container
                  columns={24}
                  rowSpacing={2}
                  columnSpacing={4}
                >
                  <Filter isLoading={isLoading}>
                    <SliderControl
                      id={'arrowsSize'}
                      name="Arrows size (px)"
                      min={0}
                      max={100}
                      value={arrowsSize}
                      pro={true}
                      onChange={
                        isPro
                          ? onSliderNavigationChange
                          : () =>
                              (window as any).reacg_open_premium_offer_dialog({
                                utm_medium: 'dots_color',
                              })
                      }
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <ColorControl
                      id={'arrowsColor'}
                      name={'Arrows color'}
                      value={arrowsColor}
                      pro={true}
                      onChange={
                        isPro
                          ? onSliderNavigationChange
                          : () =>
                              (window as any).reacg_open_premium_offer_dialog({
                                utm_medium: 'arrows_color',
                              })
                      }
                    />
                  </Filter>
                </Grid>
              )}
              {(sliderNavigation === SliderNavigation.DOTS ||
                sliderNavigation === SliderNavigation.ARROWS_AND_DOTS) && (
                <Grid
                  sx={{marginLeft: 0, paddingTop: 2}}
                  container
                  columns={24}
                  rowSpacing={2}
                  columnSpacing={4}
                >
                  <Filter isLoading={isLoading}>
                    <SelectControl
                      id={'dotsPosition'}
                      name={'Dots position'}
                      value={dotsPosition}
                      options={SliderNavigationPositionOptions}
                      onChange={onSliderNavigationChange}
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <SliderControl
                      id={'dotsSize'}
                      name="Dots size (px)"
                      min={0}
                      max={100}
                      value={dotsSize}
                      pro={true}
                      onChange={
                        isPro
                          ? onSliderNavigationChange
                          : () =>
                              (window as any).reacg_open_premium_offer_dialog({
                                utm_medium: 'dots_color',
                              })
                      }
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <SliderControl
                      id={'dotsGap'}
                      name="Dots gap (px)"
                      min={0}
                      max={50}
                      value={dotsGap}
                      pro={true}
                      onChange={
                        isPro
                          ? onSliderNavigationChange
                          : () =>
                              (window as any).reacg_open_premium_offer_dialog({
                                utm_medium: 'dots_color',
                              })
                      }
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <ColorControl
                      id={'activeDotColor'}
                      name={'Active dot color'}
                      value={activeDotColor}
                      pro={true}
                      onChange={
                        isPro
                          ? onSliderNavigationChange
                          : () =>
                              (window as any).reacg_open_premium_offer_dialog({
                                utm_medium: 'active_dots_color',
                              })
                      }
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <ColorControl
                      id={'inactiveDotsColor'}
                      name={'Inactive dots color'}
                      value={inactiveDotsColor}
                      pro={true}
                      onChange={
                        isPro
                          ? onSliderNavigationChange
                          : () =>
                              (window as any).reacg_open_premium_offer_dialog({
                                utm_medium: 'inactive_dots_color',
                              })
                      }
                    />
                  </Filter>
                </Grid>
              )}
            </Grid>
          }
        />
      );
    }
  };

  const renderWatermarkSettings = (): ReactNode => {
    return (
      <Section
        header={'Watermark'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'enableWatermark'}
                name={'Enable'}
                pro={true}
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
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'enable_watermark',
                        })
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
      />
    );
  };

  const renderSearchSettings = (): ReactNode => {
    return (
      <Section
        header={'Filtering'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'enableSearch'}
                name={'Enable Search'}
                value={enableSearch}
                pro={true}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'enable_search',
                        })
                }
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
        }
      />
    );
  };

  const renderProtectionSettings = (): ReactNode => {
    return (
      <Section
        header={'Access Control'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'enableRightClickProtection'}
                name={'Right-Click Protection'}
                pro={true}
                value={enableRightClickProtection}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'enable_right_click_protection',
                        })
                }
                tooltip={
                  <p>
                    Disable right-click context menu on the gallery to prevent
                    users from downloading or copying images.
                  </p>
                }
              />
            </Filter>
          </Grid>
        }
      />
    );
  };

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      {showMainSections && !showOnlyGalleryOptions
        ? renderMainSettings()
        : null}
      {showMainSections && hasSliderNavigationSettings
        ? renderSliderNavigationSettings()
        : null}
      {showMainSections ? renderSortingSettings() : null}
      {showMainSections ? renderSearchSettings() : null}

      {showProtectionSections ? renderProtectionSettings() : null}
      {showProtectionSections ? renderWatermarkSettings() : null}
    </Paper>
  );
};

export {GeneralSettings};
