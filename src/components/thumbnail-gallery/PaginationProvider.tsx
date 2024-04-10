import React, {ReactNode, useContext, useEffect} from 'react';
import {Grid, Pagination, PaginationItem} from '@mui/material';
import {PaginationType} from 'data-structures';
import {Button} from 'core-components';
import {useInView} from 'react-intersection-observer';
import {IGeneralSettings} from 'components/general-settings';
import './pagination-provider.css';
import {TranslationsContext} from 'contexts/TranslationsContext';

interface IPaginationProviderProps {
  type: PaginationType;
  onLoad: (_event?: any, page?: number) => void;
  pagesCount?: number;
  isFullyLoaded?: boolean;
  settings: IGeneralSettings;
}

const PaginationProvider: React.FC<IPaginationProviderProps> = ({
  type,
  onLoad,
  pagesCount,
  isFullyLoaded,
  settings,
}) => {
  const {ref, inView} = useInView();
  const {
    activeButtonColor,
    inactiveButtonColor,
    paginationButtonShape,
    loadMoreButtonColor,
    paginationTextColor,
  } = settings;
  const {loadMoreText} = useContext(TranslationsContext);

  useEffect(() => {
    if (inView && !isFullyLoaded) {
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
        {loadMoreText + '...'}
      </Button>
    ) : null;
  };

  const renderScrollLoadElement = (): ReactNode => {
    return <div ref={ref} style={{visibility: 'hidden', height: 0}} />;
  };

  const onLoadData = async (...args: any) => {
    onLoad(...args);
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
