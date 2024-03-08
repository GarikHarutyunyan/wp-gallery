import React, {ReactNode} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Filter} from '../settings/Filter';
import {
  PaginationButtonShape,
  PaginationButtonShapeOptions,
  PaginationType,
  PaginationTypeOptions,
} from 'data-structures';
import {ColorControl, NumberControl, SelectControl} from '../controls';
import {Section} from 'core-components';

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

  const onInputValueChange = (inputValue: any, key?: string) => {
    key && onChange({...value, [key]: inputValue});
  };

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
                options={PaginationTypeOptions}
                onChange={onInputValueChange}
              />
            </Filter>
            {paginationType !== PaginationType.NONE && (
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
                {paginationType === PaginationType.SIMPLE && (
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
                        name="Inctive button color"
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
                )}
                {paginationType === PaginationType.LOAD_MORE && (
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
                )}
                {[PaginationType.LOAD_MORE, PaginationType.SIMPLE].includes(
                  paginationType
                ) && (
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
                )}
              </>
            )}
          </Grid>
        }
        canExpand={true}
      ></Section>
    );
  };

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      {renderMainSettings()}
    </Paper>
  );
};

export {GeneralSettings, type IGeneralSettings};
