import {
  Grid,
  Pagination,
  PaginationItem,
  PaginationRenderItemParams,
} from '@mui/material';
import {useData} from 'components/data-context/useData';
import {TranslationsContext} from 'contexts/TranslationsContext';
import {Button} from 'core-components/button';
import {IGeneralSettings, PaginationType} from 'data-structures';
import React, {ReactNode, useContext, useEffect, useState} from 'react';
import {useInView} from 'react-intersection-observer';
import './pagination-provider.css';

interface IPaginationProviderProps {
  type: PaginationType;
  onLoad: (_event?: any, page?: number) => Promise<void>;
  pagesCount: number;
  settings: IGeneralSettings;
  page: number;
}

const PaginationProvider: React.FC<IPaginationProviderProps> = ({
  type,
  onLoad,
  pagesCount,
  settings,
  page,
}) => {
  const {ref, inView} = useInView();
  const {
    activeButtonColor,
    inactiveButtonColor,
    paginationButtonShape,
    loadMoreButtonColor,
    paginationTextColor,
  } = settings;
  const {isFullyLoaded, isLoading: isDataLoading} = useData();
  const {loadMoreText} = useContext(TranslationsContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (inView && !isFullyLoaded && !isLoading && !isDataLoading) {
      onLoadData();
    }
  }, [inView]);

  const renderContent = (): ReactNode => {
    let content: ReactNode = null;

    switch (type) {
      case PaginationType.SIMPLE:
        content = renderPagination();
        break;
      case PaginationType.LOAD_MORE:
        content = renderLoadMoreButton();
        break;
      default:
      case PaginationType.SCROLL:
        content = renderScrollLoadElement();
        break;
    }

    return content;
  };

  const renderPagination = (): ReactNode => {
    return pagesCount > 1 ? (
      <Pagination
        count={pagesCount}
        color={'primary'}
        shape={paginationButtonShape}
        style={{display: 'flex', margin: '10px 0'}}
        onChange={onLoadData}
        boundaryCount={2}
        page={page}
        renderItem={renderPaginationItem}
      />
    ) : null;
  };

  const renderPaginationItem = (
    item: PaginationRenderItemParams
  ): ReactNode => {
    const isDisabled: boolean = isLoading || item.disabled;
    const backgroundColor: string = item.selected
      ? activeButtonColor
      : inactiveButtonColor;
    const color: string = paginationTextColor;

    return (
      <PaginationItem
        {...item}
        style={{
          backgroundColor,
          color,
        }}
        disabled={isDisabled}
      />
    );
  };

  const renderLoadMoreButton = (): ReactNode => {
    return !isFullyLoaded && !isLoading ? (
      <Button
        onClick={onLoadData}
        className={'pagination-provider__load-more-button'}
        style={{
          backgroundColor: loadMoreButtonColor,
          color: paginationTextColor,
        }}
      >
        {loadMoreText + '...'}
      </Button>
    ) : null;
  };

  const renderScrollLoadElement = (): ReactNode => {
    return <div ref={ref} style={{visibility: 'hidden', height: 0}} />;
  };

  const onLoadData = async (...args: any) => {
    setIsLoading(true);
    await onLoad(...args);
    setIsLoading(false);
  };

  return type !== PaginationType.NONE ? (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{margin: '15px 0'}}
    >
      <Grid item xs={3}>
        {renderContent()}
      </Grid>
    </Grid>
  ) : null;
};

export {PaginationProvider};
export default PaginationProvider;
