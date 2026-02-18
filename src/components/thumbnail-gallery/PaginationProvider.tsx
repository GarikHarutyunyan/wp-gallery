import {
  Grid,
  Pagination,
  PaginationItem,
  PaginationRenderItemParams,
} from '@mui/material';
import clsx from 'clsx';
import {useData} from 'components/data-context/useData';
import {TranslationsContext} from 'contexts/TranslationsContext';
import {Button} from 'core-components/button';
import {IGeneralSettings, PaginationType} from 'data-structures';
import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {useInView} from 'react-intersection-observer';

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
    loadMoreButtonColor,
    paginationTextColor,
    paginationButtonBorderRadius,
    paginationButtonBorderSize,
    paginationButtonBorderColor,
    paginationButtonTextSize,
    loadMoreButtonText,
    paginationButtonClass,
  } = settings;
  const {isFullyLoaded, isLoading: isDataLoading} = useData();
  const {loadMoreText} = useContext(TranslationsContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [boundaryCount, setBoundaryCount] = useState<number>(1);
  const [paginationSize, setPaginationSize] = useState<
    typeof paginationButtonTextSize
  >(paginationButtonTextSize);

  const handleResize = useCallback((width: number) => {
    if (width <= 520) {
      setBoundaryCount(0);
      setPaginationSize(Math.min(paginationButtonTextSize, 0.875));
    } else {
      setBoundaryCount(1);
      setPaginationSize(paginationButtonTextSize);
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // initial measurement
    handleResize(el.clientWidth);

    // ResizeObserver for the container (if available)
    let ro: ResizeObserver | null = null;
    if ((window as any).ResizeObserver) {
      ro = new (window as any).ResizeObserver((entries: any) => {
        if (!entries || !entries.length) return;
        handleResize(entries[0].contentRect.width);
      });
      ro?.observe(el);
    }

    // fallback to window resize
    const onWinResize = () => el && handleResize(el.clientWidth);
    window.addEventListener('resize', onWinResize);

    return () => {
      window.removeEventListener('resize', onWinResize);
      if (ro && el) ro.unobserve(el);
    };
  }, [containerRef, handleResize]);

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
    return pagesCount > 1 && !isDataLoading ? (
      <Pagination
        count={pagesCount}
        boundaryCount={boundaryCount}
        siblingCount={1}
        hidePrevButton={page === 1}
        hideNextButton={page === pagesCount}
        color={'primary'}
        style={{display: 'flex', margin: '10px 0', padding: 0}}
        onChange={onLoadData}
        page={page}
        renderItem={renderPaginationItem}
      />
    ) : null;
  };

  const renderPaginationItem = (
    item: PaginationRenderItemParams
  ): ReactNode => {
    const isDisabled: boolean = isLoading || isDataLoading || item.disabled;
    const backgroundColor: string = item.selected
      ? activeButtonColor
      : inactiveButtonColor;
    const color: string = paginationTextColor;

    return (
      <PaginationItem
        className={paginationButtonClass}
        {...item}
        style={{
          borderRadius: `${paginationButtonBorderRadius}px`,
          borderWidth: `${paginationButtonBorderSize}px`,
          borderStyle: 'solid',
          borderColor: paginationButtonBorderColor,
          fontSize: `${paginationSize}rem`,
          backgroundColor: item.selected
            ? activeButtonColor
            : inactiveButtonColor,
          color: paginationTextColor,
          width: `${paginationSize + 1}rem`,
          height: `${paginationSize + 1}rem`,
          minWidth: '32px',
          minHeight: '32px',
        }}
        disabled={isDisabled}
      />
    );
  };

  const renderLoadMoreButton = (): ReactNode => {
    return !isFullyLoaded && !isLoading && !isDataLoading ? (
      <Button
        onClick={onLoadData}
        className={clsx(
          'pagination-provider__load-more-button',
          paginationButtonClass
        )}
        style={{
          borderRadius: `${paginationButtonBorderRadius}px`,
          borderWidth: `${paginationButtonBorderSize}px`,
          borderStyle: 'solid',
          borderColor: paginationButtonBorderColor,
          fontSize: `${paginationButtonTextSize}rem`,
          backgroundColor: loadMoreButtonColor,
          color: paginationTextColor,
          margin: '10px 0',
          padding: '8px 25px',
          textTransform: 'none',
        }}
      >
        {loadMoreButtonText ? loadMoreButtonText : loadMoreText?.toUpperCase()}
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
      ref={containerRef as any}
    >
      <Grid item xs={3}>
        {renderContent()}
      </Grid>
    </Grid>
  ) : null;
};

export {PaginationProvider};
export default PaginationProvider;
