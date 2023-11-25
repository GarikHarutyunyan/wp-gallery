import React, {ReactNode, useEffect, useState} from 'react';
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

interface IAdvancedSettings {
  paginationType: PaginationType;
  itemsPerPage: number;
  activeButtonColor: string;
  inactiveButtonColor: string;
  paginationButtonShape: PaginationButtonShape;
  loadMoreButtonColor: string;
  paginationTextColor: string;
}

interface IAdvancedSettingsProps {
  value: IAdvancedSettings;
  onChange: (newSettings: IAdvancedSettings) => void;
  isLoading?: boolean;
}

const AdvancedSettings: React.FC<IAdvancedSettingsProps> = ({
  value,
  onChange,
  isLoading,
}) => {
  const [paginationType, setPaginationType] = useState<PaginationType>(
    value.paginationType
  );
  const [itemsPerPage, setItemsPerPage] = useState<number>(value.itemsPerPage);
  const [activeButtonColor, setActiveButtonColor] = useState<string>(
    value.activeButtonColor
  );
  const [inactiveButtonColor, setInactiveButtonColor] = useState<string>(
    value.inactiveButtonColor
  );
  const [paginationButtonShape, setPaginationButtonShape] =
    useState<PaginationButtonShape>(value.paginationButtonShape);
  const [loadMoreButtonColor, setLoadMoreButtonColor] = useState<string>(
    value.loadMoreButtonColor
  );
  const [paginationTextColor, setPaginationTextColor] = useState<string>(
    value.paginationTextColor
  );

  useEffect(
    () =>
      onChange({
        paginationType,
        itemsPerPage,
        activeButtonColor,
        inactiveButtonColor,
        paginationButtonShape,
        loadMoreButtonColor,
        paginationTextColor,
      }),
    [
      paginationType,
      itemsPerPage,
      activeButtonColor,
      inactiveButtonColor,
      paginationButtonShape,
      loadMoreButtonColor,
      paginationTextColor,
    ]
  );

  const renderMainSettings = (): ReactNode => {
    return (
      <Section
        header={'Pagination'}
        body={
          <Grid
            container
            columns={24}
            rowSpacing={2}
            columnSpacing={4}
            marginBottom={4}
          >
            <Filter isLoading={isLoading}>
              <SelectControl
                name={'Pagination Type'}
                value={paginationType}
                options={PaginationTypeOptions}
                onChange={setPaginationType}
              />
            </Filter>
            {paginationType !== PaginationType.NONE && (
              <>
                <Filter isLoading={isLoading}>
                  <NumberControl
                    name={'Items Per Page'}
                    value={itemsPerPage}
                    onChange={setItemsPerPage}
                    min={1}
                  />
                </Filter>
                {paginationType === PaginationType.SIMPLE && (
                  <>
                    <Filter isLoading={isLoading}>
                      <ColorControl
                        name="Active button color"
                        value={activeButtonColor}
                        onChange={setActiveButtonColor}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <ColorControl
                        name="Inctive button color"
                        value={inactiveButtonColor}
                        onChange={setInactiveButtonColor}
                      />
                    </Filter>
                    <Filter isLoading={isLoading}>
                      <SelectControl
                        name={'Button shape'}
                        value={paginationButtonShape}
                        options={PaginationButtonShapeOptions}
                        onChange={setPaginationButtonShape}
                      />
                    </Filter>
                  </>
                )}
                {paginationType === PaginationType.LOAD_MORE && (
                  <>
                    <Filter isLoading={isLoading}>
                      <ColorControl
                        name="Load more button color"
                        value={loadMoreButtonColor}
                        onChange={setLoadMoreButtonColor}
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
                        name="Button text color"
                        value={paginationTextColor}
                        onChange={setPaginationTextColor}
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

export {AdvancedSettings, type IAdvancedSettings};
