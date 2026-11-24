import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
import {useAppInfo, useTemplates} from 'contexts';
import {usePro} from 'contexts/ProContext';
import {Section} from 'core-components/section';
import {
  AspectRatioOptions,
  HeightMode,
  HeightModeOptions,
  ISlideshowSettings,
  LayoutMode,
  LayoutModeOptions,
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
  onProFeatureClick: (feature: string) => void;
}

const SlideshowSettings = ({
  settings,
  onSettingsChange,
  isLoading,
  onProFeatureClick,
}: ISlideshowSettingsProps) => {
  const {resetTemplate} = useTemplates();
  const {mode} = useAppInfo();
  const isGalleryEditPage = mode !== 'settings';
  const {
    layoutMode = LayoutMode.BOXED,
    heightMode = layoutMode === LayoutMode.FULLSCREEN
      ? settings.heightMode || HeightMode.FULLSCREEN
      : settings.heightMode || HeightMode.FIXED,
    aspectRatio = '1.77',
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
    if (key === 'layoutMode' && inputValue === LayoutMode.FULLSCREEN && !settings.heightMode) {
      onSettingsChange({
        ...settings,
        layoutMode: LayoutMode.FULLSCREEN,
        heightMode: HeightMode.FULLSCREEN,
      });
      return;
    }
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
              <SelectControl
                id={'layoutMode'}
                name={'Layout mode'}
                value={layoutMode}
                options={LayoutModeOptions}
                tooltip={
                  isGalleryEditPage ? (
                    <p>
                      Full screen mode stretches across the full browser window width (100vw) on published pages. In this edit screen, it is scaled to fit the preview container.
                    </p>
                  ) : undefined
                }
                onChange={onInputValueChange}
              />
            </Filter>
            {layoutMode === LayoutMode.BOXED ? (
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
            ) : null}
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'heightMode'}
                name={'Height mode'}
                value={heightMode}
                options={HeightModeOptions}
                tooltip={
                  <p>
                    Choose how the slider height is determined: Fixed
                    (exact height in px), Auto height (adapts to active
                    image proportions), Aspect ratio (keeps a consistent
                    ratio), or Full screen (fills the browser window height).
                  </p>
                }
                onChange={onInputValueChange}
              />
            </Filter>
            {heightMode === HeightMode.FIXED ? (
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
            ) : null}
            {heightMode === HeightMode.ASPECT_RATIO ? (
              <Filter isLoading={isLoading}>
                <SelectControl
                  id={'aspectRatio'}
                  name={'Aspect ratio'}
                  value={aspectRatio}
                  options={AspectRatioOptions}
                  tooltip={
                    <p>
                      Set the proportional aspect ratio (e.g. 16:9
                      widescreen, 4:3 landscape, or 1:1 square) for the
                      slider container.
                    </p>
                  }
                  onChange={onInputValueChange}
                />
              </Filter>
            ) : null}
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'isFullCoverImage'}
                name={'Full cover image'}
                value={isFullCoverImage ?? false}
                pro={true}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () => onProFeatureClick('slider_full_cover')
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
                    : () => onProFeatureClick('lightbox_download')
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
                    : () => onProFeatureClick('lightbox_download')
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
                    : () => onProFeatureClick('lightbox_download')
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
                    : () => onProFeatureClick('lightbox_download')
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
                    : () => onProFeatureClick('lightbox_counter')
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
                    : () => onProFeatureClick('enable_filmstrip')
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
