import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
  ColorControl,
  NumberControl,
  SelectControl,
  SwitchControl,
  TextControl,
} from 'components/controls';
import {useSettings} from 'components/settings';
import {TranslationsContext, useTemplates} from 'contexts';
import {usePro} from 'contexts/ProContext';
import {Section} from 'core-components/section/Section';
import {
  GalleryType,
  IGeneralSettings,
  OrderByOptions,
  OrderDirectionOptions,
} from 'data-structures';
import {useContext} from 'react';
import {Filter} from '../Filter';
import {ControlsSection} from './controls-section/ControlsSection';
import {PaginationSection} from './pagination-section/PaginationSection';

interface INavigationSettingsProps {
  settings: IGeneralSettings;
  onSettingsChange: (settings: IGeneralSettings) => void;
  onProFeatureClick: (feature: string) => void;
  isLoading: boolean;
}

const NavigationSettings = ({
  settings,
  onSettingsChange,
  onProFeatureClick,
  isLoading,
}: INavigationSettingsProps) => {
  const {resetTemplate} = useTemplates();
  const {type} = useSettings();
  const {
    orderBy,
    orderDirection,
    showFrontendSorting,
    enableSearch,
    searchPlaceholderText,
    enableFiltering,
    filterType = 'auto',
    filterShowAll = true,
    filterAllText = '',
    filterShowCount = true,
    filterAlignment = 'left',
    filterActiveColor = '#FFFFFF',
    filterActiveTextColor = '#000000de',
    filterInactiveColor = '#D7D7D7',
    filterInactiveTextColor = '#000000de',
    filterBorderRadius = 4,
    filterFontSize = 14,
    noDataText = '',
  } = settings;
  const {isPro} = usePro();
  const {
    searchPlaceholder,
    allText,
    noDataText: defaultNoDataText,
  } = useContext(TranslationsContext);

  const isSliderLikeGallery: boolean =
    type === GalleryType.SLIDESHOW ||
    type === GalleryType.CUBE ||
    type === GalleryType.CAROUSEL ||
    type === GalleryType.COVERFLOW ||
    type === GalleryType.CARDS ||
    type === GalleryType.SCROLLER;

  const onInputValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();
    key && onSettingsChange?.({...settings, [key]: inputValue} as any);
  };

  const hasFrontendControls = Boolean(
    showFrontendSorting || enableSearch || enableFiltering
  );

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      {!isSliderLikeGallery && (
        <PaginationSection
          settings={settings}
          onSettingsChange={onSettingsChange}
          onProFeatureClick={onProFeatureClick}
          isLoading={isLoading}
        />
      )}
      {isSliderLikeGallery && (
        <ControlsSection
          onProFeatureClick={onProFeatureClick}
          isLoading={isLoading}
          isPro={isPro}
        />
      )}
      <Section
        header={'Sorting and filtering'}
        className="reacg-tab-section"
        body={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
              width: '100%',
            }}
          >
            {/* Row 1: Sorting */}
            <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
              <Filter isLoading={isLoading}>
                <SelectControl
                  id={'orderBy'}
                  name={'Order by'}
                  value={orderBy}
                  options={OrderByOptions}
                  pro={true}
                  onChange={
                    isPro
                      ? onInputValueChange
                      : () => onProFeatureClick('order_by')
                  }
                />
              </Filter>
              <Filter isLoading={isLoading}>
                <SelectControl
                  id={'orderDirection'}
                  name={'Order direction'}
                  value={orderDirection}
                  options={OrderDirectionOptions}
                  pro={true}
                  onChange={
                    isPro
                      ? onInputValueChange
                      : () => onProFeatureClick('order_direction')
                  }
                />
              </Filter>
              <Filter isLoading={isLoading}>
                <SwitchControl
                  id={'showFrontendSorting'}
                  name={'Enable sorting'}
                  value={showFrontendSorting || false}
                  onChange={onInputValueChange}
                  tooltip={
                    <p>
                      Display a sorting dropdown control with the gallery so
                      visitors can dynamically sort images.
                    </p>
                  }
                />
              </Filter>
            </Grid>

            {/* Row 2: Search */}
            <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
              <Filter isLoading={isLoading}>
                <SwitchControl
                  id={'enableSearch'}
                  name={'Enable search'}
                  value={enableSearch}
                  pro={true}
                  onChange={
                    isPro
                      ? onInputValueChange
                      : () => onProFeatureClick('enable_search')
                  }
                  tooltip={
                    <p>
                      Activate a search field that allows users to find gallery
                      items by matching keywords in the title, description, alt
                      text, or caption.
                    </p>
                  }
                />
              </Filter>
              {enableSearch && (
                <Filter isLoading={isLoading}>
                  <TextControl
                    id={'searchPlaceholderText'}
                    name={'Placeholder text'}
                    value={searchPlaceholderText}
                    placeholder={searchPlaceholder}
                    onChange={onInputValueChange}
                  />
                </Filter>
              )}
            </Grid>

            {/* Row 3: Category Filtering */}
            <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
              <Filter isLoading={isLoading}>
                <SwitchControl
                  id={'enableFiltering'}
                  name={'Enable category'}
                  value={enableFiltering || false}
                  onChange={onInputValueChange}
                  tooltip={
                    <p>
                      Display category filter buttons or a dropdown with the
                      gallery so visitors can filter images by category.
                    </p>
                  }
                />
              </Filter>
              {enableFiltering && (
                <>
                  <Filter isLoading={isLoading}>
                    <SelectControl
                      id={'filterType'}
                      name={'Filter type'}
                      value={filterType}
                      tooltip={
                        <p>
                          Auto: Buttons on desktop and dropdown on mobile.
                          <br />
                          Buttons: Pill buttons always visible.
                          <br />
                          Dropdown: Dropdown menu list.
                        </p>
                      }
                      options={[
                        {value: 'auto', title: 'Auto'},
                        {value: 'buttons', title: 'Buttons'},
                        {value: 'dropdown', title: 'Dropdown'},
                      ]}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                  <Filter isLoading={isLoading}>
                    <SwitchControl
                      id={'filterShowAll'}
                      name={'Show "All" button'}
                      value={filterShowAll !== false}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                  {filterShowAll !== false && (
                    <Filter isLoading={isLoading}>
                      <TextControl
                        id={'filterAllText'}
                        name={'All button text'}
                        value={filterAllText}
                        placeholder={allText || 'All'}
                        onChange={onInputValueChange}
                      />
                    </Filter>
                  )}
                  <Filter isLoading={isLoading}>
                    <SwitchControl
                      id={'filterShowCount'}
                      name={'Show item count'}
                      value={filterShowCount !== false}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                </>
              )}
            </Grid>

            {/* Row 4: Shared Styling Options */}
            {hasFrontendControls && (
              <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
                <Filter isLoading={isLoading}>
                  <SelectControl
                    id={'filterAlignment'}
                    name={'Alignment'}
                    value={filterAlignment}
                    options={[
                      {value: 'left', title: 'Left'},
                      {value: 'center', title: 'Center'},
                      {value: 'right', title: 'Right'},
                      {value: 'space-between', title: 'Space between'},
                    ]}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id={'filterActiveColor'}
                    name={'Active background color'}
                    value={filterActiveColor}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id={'filterActiveTextColor'}
                    name={'Active text color'}
                    value={filterActiveTextColor}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id={'filterInactiveColor'}
                    name={'Inactive background color'}
                    value={filterInactiveColor}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id={'filterInactiveTextColor'}
                    name={'Inactive text color'}
                    value={filterInactiveTextColor}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'filterBorderRadius'}
                    name={'Corner radius (px)'}
                    value={filterBorderRadius}
                    onChange={onInputValueChange}
                    min={0}
                    max={50}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'filterFontSize'}
                    name={'Font size (px)'}
                    value={filterFontSize}
                    onChange={onInputValueChange}
                    min={10}
                    max={30}
                  />
                </Filter>
              </Grid>
            )}

            {/* Row 5: Empty Gallery Text */}
            <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
              <Filter isLoading={isLoading}>
                <TextControl
                  id={'noDataText'}
                  name={'Empty gallery text'}
                  value={noDataText}
                  placeholder={defaultNoDataText}
                  onChange={onInputValueChange}
                />
              </Filter>
            </Grid>
          </Box>
        }
      />
    </Paper>
  );
};

export {NavigationSettings};
