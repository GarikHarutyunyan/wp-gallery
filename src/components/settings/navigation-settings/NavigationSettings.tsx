import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {SelectControl, SwitchControl, TextControl} from 'components/controls';
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
  isLoading: boolean;
}

const NavigationSettings = ({
  settings,
  onSettingsChange,
  isLoading,
}: INavigationSettingsProps) => {
  const {resetTemplate} = useTemplates();
  const {type} = useSettings();
  const {orderBy, orderDirection, enableSearch, searchPlaceholderText} =
    settings;

  const showOnlyGalleryOptions: boolean =
    type === GalleryType.SLIDESHOW ||
    type === GalleryType.CUBE ||
    type === GalleryType.CAROUSEL ||
    type === GalleryType.COVERFLOW ||
    type === GalleryType.CARDS;

  const hasSliderNavigationSettings: boolean =
    type === GalleryType.SLIDESHOW ||
    type === GalleryType.CUBE ||
    type === GalleryType.CAROUSEL ||
    type === GalleryType.COVERFLOW ||
    type === GalleryType.CARDS;

  const onInputValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();
    key && onSettingsChange?.({...settings, [key]: inputValue} as any);
  };

  const {isPro} = usePro();

  const {searchPlaceholder} = useContext(TranslationsContext);

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      {!showOnlyGalleryOptions && (
        <PaginationSection
          settings={settings}
          onSettingsChange={onSettingsChange}
          isLoading={isLoading}
        />
      )}
      {hasSliderNavigationSettings && (
        <ControlsSection isLoading={isLoading} isPro={isPro} />
      )}
      <Section
        header={'Sorting'}
        className="reacg-tab-section"
        body={
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
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'order_by',
                        })
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
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'order_direction',
                        })
                }
              />
            </Filter>
          </Grid>
        }
      />
      <Section
        header={'Filtering'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'enableSearch'}
                name={'Enable Search'}
                value={enableSearch}
                pro={true}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'enable_search',
                        })
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
                  name="Placeholder text"
                  value={searchPlaceholderText}
                  placeholder={searchPlaceholder}
                  onChange={onInputValueChange}
                />
              </Filter>
            )}
          </Grid>
        }
      />
    </Paper>
  );
};

export {NavigationSettings};
