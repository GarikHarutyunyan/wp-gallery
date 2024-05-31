import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useSettings} from 'components/settings';
import {Section} from 'core-components';
import {
  GalleryType,
  IGeneralSettings,
  PaginationButtonShapeOptions,
  PaginationType,
  PaginationTypeOptions,
} from 'data-structures';
import React, {ReactNode, useMemo} from 'react';
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
  const {
    generalSettings: value,
    changeGeneralSettings: onChange,
    type,
    thumbnailSettings,
    changeThumbnailSettings,
    mosaicSettings,
    changeMosaicSettings,
    masonrySettings,
    changeMasonrySettings,
  } = useSettings();
  const {
    itemsPerPage,
    activeButtonColor,
    inactiveButtonColor,
    paginationButtonShape,
    loadMoreButtonColor,
    paginationTextColor,
  } = value as IGeneralSettings;

  const paginationType: PaginationType = useMemo(() => {
    if (type === GalleryType.MOSAIC) {
      return mosaicSettings!.paginationType;
    }
    if (type === GalleryType.THUMBNAILS) {
      return thumbnailSettings!.paginationType;
    }
    if (type === GalleryType.MASONRY) {
      return masonrySettings!.paginationType;
    }

    return PaginationType.NONE;
  }, [type, mosaicSettings, thumbnailSettings, masonrySettings]);

  const onInputValueChange = (inputValue: any, key?: string) => {
    key && onChange({...value, [key]: inputValue});
  };

  const onPaginationTypeChange = (inputValue: any, key?: string) => {
    if (type === GalleryType.MOSAIC) {
      key && changeMosaicSettings({...mosaicSettings, [key]: inputValue});
    }
    if (type === GalleryType.THUMBNAILS) {
      key && changeThumbnailSettings({...thumbnailSettings, [key]: inputValue});
    }
    if (type === GalleryType.MASONRY) {
      key && changeMasonrySettings({...masonrySettings, [key]: inputValue});
    }
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
                name={'Pagination Type'}
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
                    name={'Items Per Page'}
                    value={itemsPerPage}
                    onChange={onInputValueChange}
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

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      {renderMainSettings()}
    </Paper>
  );
};

export {GeneralSettings};
