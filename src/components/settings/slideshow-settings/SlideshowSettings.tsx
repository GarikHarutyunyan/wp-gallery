import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
import {useTemplates} from 'contexts';
import {usePro} from 'contexts/ProContext';
import {Section} from 'core-components/section';
import {
  ISlideshowSettings,
  LightboxThumbnailsPosition,
  LightboxThumbnailsPositionOptions,
} from 'data-structures';
import {
  ColorControl,
  NumberControl,
  SelectControl,
  SliderControl,
  SwitchControl,
} from '../../controls';
import {Filter} from '../Filter';

interface ISlideshowSettingsProps {
  settings: ISlideshowSettings;
  onSettingsChange: (settings: ISlideshowSettings) => void;
  isLoading: boolean;
}

const SlideshowSettings = ({
  settings,
  onSettingsChange,
  isLoading,
}: ISlideshowSettingsProps) => {
  const {resetTemplate} = useTemplates();
  const {
    width,
    height,
    showCounter,
    canShare,
    canDownload,
    canZoom,
    canFullscreen,
    thumbnailsPosition,
    thumbnailWidth,
    thumbnailHeight,
    thumbnailBorder,
    thumbnailBorderColor,
    thumbnailBorderRadius,
    thumbnailPadding,
    thumbnailGap,
    isFullCoverImage,
  } = settings;

  const onInputValueChange = (inputValue: unknown, key?: string) => {
    resetTemplate?.();
    key && onSettingsChange({...settings, [key]: inputValue});
  };

  const {isPro} = usePro();

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      <Section
        header={'Layout Settings'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <NumberControl
                id={'width'}
                name={'Width'}
                value={width}
                onChange={onInputValueChange}
                min={0}
                unit={'px'}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <NumberControl
                id={'height'}
                name={'Height'}
                value={height}
                onChange={onInputValueChange}
                min={0}
                unit={'px'}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'isFullCoverImage'}
                name={'Full cover image'}
                value={isFullCoverImage ?? false}
                pro={true}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'slider_full_cover',
                        })
                }
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'canFullscreen'}
                name={'Fullscreen button'}
                value={canFullscreen}
                pro={true}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'lightbox_download',
                        })
                }
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'canShare'}
                name={'Share button'}
                value={canShare}
                pro={true}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'lightbox_download',
                        })
                }
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'canDownload'}
                name={'Download button'}
                value={canDownload}
                pro={true}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'lightbox_download',
                        })
                }
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'canZoom'}
                name={'Zoom button'}
                value={canZoom}
                pro={true}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'lightbox_download',
                        })
                }
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'showCounter'}
                name={'Counter'}
                pro={true}
                value={showCounter}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'lightbox_counter',
                        })
                }
              />
            </Filter>
            <ClickActionSettings isLoading={isLoading} />
          </Grid>
        }
      />
      <Section
        header={'Thumbnails'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'thumbnailsPosition'}
                name={'Position'}
                value={thumbnailsPosition}
                options={LightboxThumbnailsPositionOptions}
                pro={true}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'enable_filmstrip',
                        })
                }
              />
            </Filter>
            {thumbnailsPosition !== LightboxThumbnailsPosition.NONE && (
              <>
                <Filter isLoading={isLoading}>
                  <SliderControl
                    id={'thumbnailBorder'}
                    name="Border (px)"
                    min={0}
                    max={20}
                    value={thumbnailBorder}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <ColorControl
                    id={'thumbnailBorderColor'}
                    name="Border color"
                    value={thumbnailBorderColor}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SliderControl
                    id={'thumbnailBorderRadius'}
                    name="Border radius (%)"
                    min={0}
                    value={thumbnailBorderRadius}
                    max={50}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'thumbnailWidth'}
                    name={'Width'}
                    value={thumbnailWidth}
                    onChange={onInputValueChange}
                    min={0}
                    unit={'px'}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'thumbnailHeight'}
                    name={'Height'}
                    value={thumbnailHeight}
                    onChange={onInputValueChange}
                    min={0}
                    unit={'px'}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SliderControl
                    id={'thumbnailGap'}
                    name="Gap (px)"
                    min={0}
                    max={100}
                    value={thumbnailGap}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SliderControl
                    id={'thumbnailPadding'}
                    name="Distance (px)"
                    min={0}
                    max={100}
                    value={thumbnailPadding}
                    onChange={onInputValueChange}
                  />
                </Filter>
              </>
            )}
          </Grid>
        }
      />
    </Paper>
  );
};

export {SlideshowSettings};
