import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useSettings} from 'components/settings';
import {Section} from 'core-components';
import {
  GalleryType,
  PaginationButtonShape,
  PaginationButtonShapeOptions,
  PaginationType,
  PaginationTypeOptions,
} from 'data-structures';
import React, {ReactNode, useEffect, useMemo} from 'react';
import {
  ColorControl,
  ISelectOption,
  NumberControl,
  SelectControl,
} from '../controls';
import {Filter} from '../settings/Filter';

interface IGeneralSettings {
  itemsPerPage: number | undefined;
  activeButtonColor: string;
  inactiveButtonColor: string;
  paginationButtonShape: PaginationButtonShape;
  loadMoreButtonColor: string;
  paginationTextColor: string;
}

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
  } = useSettings();
  const {} = useSettings();
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

    return PaginationType.NONE;
  }, [type, mosaicSettings, thumbnailSettings]);

  useEffect(() => {
    if (type === GalleryType.MOSAIC) {
      onInputValueChange(PaginationType.SIMPLE, 'paginationType');
    }
  }, [type]);

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
  };

  const filteredPaginationTypeOptions =
    type === GalleryType.MOSAIC
      ? PaginationTypeOptions.filter(
          (option: ISelectOption) =>
            ![PaginationType.SCROLL, PaginationType.LOAD_MORE].includes(
              option.value as PaginationType
            )
        )
      : PaginationTypeOptions;

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

export {GeneralSettings, type IGeneralSettings};
