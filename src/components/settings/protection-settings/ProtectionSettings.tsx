import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
  PositionControl,
  SliderControl,
  SwitchControl,
  TextControl,
} from 'components/controls';
import {useTemplates} from 'contexts';
import {usePro} from 'contexts/ProContext';
import {Section} from 'core-components/section/Section';
import {IGeneralSettings, PositionOptions} from 'data-structures';
import {Filter} from '../Filter';

interface IProtectionSettingsProps {
  settings: IGeneralSettings;
  onSettingsChange: (settings: IGeneralSettings) => void;
  isLoading: boolean;
}

const ProtectionSettings = ({
  settings,
  onSettingsChange,
  isLoading,
}: IProtectionSettingsProps) => {
  const {resetTemplate} = useTemplates();
  const {
    enableWatermark,
    watermarkImageURL,
    watermarkTransparency,
    watermarkSize,
    watermarkPosition,
    enableRightClickProtection,
  } = settings;

  const onInputValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();
    key && onSettingsChange?.({...settings, [key]: inputValue} as any);
  };

  const {isPro} = usePro();

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      <Section
        header={'Access Control'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'enableRightClickProtection'}
                name={'Right-Click Protection'}
                pro={true}
                value={enableRightClickProtection}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'enable_right_click_protection',
                        })
                }
                tooltip={
                  <p>
                    Disable right-click context menu on the gallery to prevent
                    users from downloading or copying images.
                  </p>
                }
              />
            </Filter>
          </Grid>
        }
      />
      <Section
        header={'Watermark'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'enableWatermark'}
                name={'Enable'}
                pro={true}
                tooltip={
                  <p>
                    Applies a non-destructive watermark overlay. The original
                    image remains unchanged.
                  </p>
                }
                value={enableWatermark}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () =>
                        (window as any).reacg_open_premium_offer_dialog({
                          utm_medium: 'enable_watermark',
                        })
                }
              />
            </Filter>
            {enableWatermark && (
              <>
                <Filter isLoading={isLoading}>
                  <TextControl
                    id={'watermarkImageURL'}
                    name="Image URL"
                    tooltip={
                      <p>
                        Provide the absolute URL of the image you would like to
                        use as watermark.
                      </p>
                    }
                    value={watermarkImageURL}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SliderControl
                    id={'watermarkTransparency'}
                    name="Transparency (%)"
                    min={0}
                    max={100}
                    value={watermarkTransparency}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <SliderControl
                    id={'watermarkSize'}
                    name="Size (%)"
                    min={0}
                    max={100}
                    value={watermarkSize}
                    onChange={onInputValueChange}
                  />
                </Filter>
                <Filter isLoading={isLoading}>
                  <PositionControl
                    id={'watermarkPosition'}
                    name="Position"
                    tooltip={<p>Choose where the watermark will be placed.</p>}
                    value={watermarkPosition}
                    options={PositionOptions}
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

export {ProtectionSettings};
