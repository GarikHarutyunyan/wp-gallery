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
import React, {ReactNode, useEffect} from 'react';
import {
  ColorControl,
  ISelectOption,
  NumberControl,
  SelectControl,
} from '../controls';
import {Filter} from '../settings/Filter';

interface IGeneralSettings {
  paginationType: PaginationType;
  itemsPerPage: number | undefined;
  activeButtonColor: string;
  inactiveButtonColor: string;
  paginationButtonShape: PaginationButtonShape;
  loadMoreButtonColor: string;
  paginationTextColor: string;
}

interface IGeneralSettingsProps {
  value: IGeneralSettings;
  onChange: (newSettings: IGeneralSettings) => void;
  isLoading?: boolean;
}

const GeneralSettings: React.FC<IGeneralSettingsProps> = ({
  value,
  onChange,
  isLoading,
}) => {
  const {
    paginationType,
    itemsPerPage,
    activeButtonColor,
    inactiveButtonColor,
    paginationButtonShape,
    loadMoreButtonColor,
    paginationTextColor,
  } = value;
  const {type} = useSettings();

  useEffect(() => {
    if (type === GalleryType.MOSAIC) {
      onInputValueChange(PaginationType.SIMPLE, 'paginationType');
    }
  }, [type]);

  const onInputValueChange = (inputValue: any, key?: string) => {
    key && onChange({...value, [key]: inputValue});
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
                onChange={onInputValueChange}
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
