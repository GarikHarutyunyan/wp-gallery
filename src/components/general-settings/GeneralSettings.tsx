import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useSettings} from 'components/settings';
import {useTemplates} from 'contexts';
import {Section} from 'core-components/section';
import {
  GalleryType,
  IGeneralSettings,
  OrderByOptions,
  OrderDirectionOptions,
  PaginationButtonShapeOptions,
  PaginationType,
  PaginationTypeOptions,
} from 'data-structures';
import React, {ReactNode, useMemo} from 'react';
import {Utils} from 'utils';
import {
  ColorControl,
  ISelectOption,
  NumberControl,
  SelectControl,
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
    paginationButtonShape,
    loadMoreButtonColor,
    paginationTextColor,
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
                    <Filter isLoading={isLoading}>
                      <ColorControl
                        id={'inactiveButtonColor'}
                        name="Inactive button color"
                        value={inactiveButtonColor}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <SelectControl
                        id={'paginationButtonShape'}
                        name={'Button shape'}
                        value={paginationButtonShape}
                        options={PaginationButtonShapeOptions}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                  </>
                ) : null}
                {paginationType === PaginationType.LOAD_MORE ? (
                  <>
                    <Filter isLoading={isLoading}>
                      <ColorControl
                        id={'loadMoreButtonColor'}
                        name="Load more button color"
                        value={loadMoreButtonColor}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                  </>
                ) : null}
                {[PaginationType.LOAD_MORE, PaginationType.SIMPLE].includes(
                  paginationType
                ) ? (
                  <>
                    <Filter isLoading={isLoading}>
                      <ColorControl
                        id={'paginationTextColor'}
                        name="Button text color"
                        value={paginationTextColor}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                  </>
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

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      {renderSortingSettings()}
      {!showOnlyGalleryOptions ? renderMainSettings() : null}
    </Paper>
  );
};

export {GeneralSettings};
