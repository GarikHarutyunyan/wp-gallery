import React, {ReactNode, useEffect, useState} from 'react';
import {
  CircularProgress,
  Grid,
  Pagination,
  PaginationItem,
} from '@mui/material';
import {PaginationType} from 'data-structures';
import {Button} from 'core-components';
import {useInView} from 'react-intersection-observer';
import {IAdvancedSettings} from 'components/advanced-settings';
import './pagination-provider.css';

interface IPaginationProviderProps {
  type: PaginationType;
  onLoad: (_event?: any, page?: number) => void;
  pagesCount?: number;
  isFullyLoaded?: boolean;
  settings: IAdvancedSettings;
}

const PaginationProvider: React.FC<IPaginationProviderProps> = ({
  type,
  onLoad,
  pagesCount,
  isFullyLoaded,
  settings,
}) => {
  const {ref, inView, entry} = useInView();
  const {
    activeButtonColor,
    inactiveButtonColor,
    paginationButtonShape,
    loadMoreButtonColor,
    paginationTextColor,
  } = settings;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (inView && !isFullyLoaded) {
      onLoadData();
    }
  }, [inView]);

  const renderLoader = (): ReactNode => {
    if (isLoading) {
      return (
        <div className={'pagination-privider__loader-container'}>
          <CircularProgress color="primary" size={60} />
        </div>
      );
    }

    return null;
  };

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
    return (
      <Pagination
        count={pagesCount}
        color={'primary'}
        shape={paginationButtonShape}
        style={{display: 'flex', margin: '10px 0'}}
        onChange={onLoadData}
        boundaryCount={2}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            style={{
              backgroundColor: item.selected
                ? activeButtonColor
                : inactiveButtonColor,
              color: paginationTextColor,
            }}
          />
        )}
      />
    );
  };

  const renderLoadMoreButton = (): ReactNode => {
    return !isFullyLoaded ? (
      <Button
        onClick={onLoadData}
        className={'pagination-provider__load-more-button'}
        style={{
          backgroundColor: loadMoreButtonColor,
          color: paginationTextColor,
        }}
      >
        {'Load more...'}
      </Button>
    ) : null;
  };

  const renderScrollLoadElement = (): ReactNode => {
    return <div ref={ref} style={{visibility: 'hidden', height: 0}} />;
  };

  const onLoadData = async () => {
    setIsLoading(true);
    await onLoad();
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
        {renderLoader()}
        {renderContent()}
      </Grid>
    </Grid>
  ) : null;
};

export {PaginationProvider};
