import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
  ColorControl,
  NumberControl,
  SelectControl,
  SwitchControl,
} from 'components/controls';
import {useTemplates} from 'contexts';
import {usePro} from 'contexts/ProContext';
import {Section} from 'core-components/section';
import {
  ISliderSettings,
  PaddingTypetOptions,
  SliderAnimationOptions,
  SliderAutoPlayProgressTypeOptions,
  SliderShadowType,
  SliderShadowTypeOptions,
} from 'data-structures';
import {Filter} from '../Filter';

interface ISliderAppearanceSettingsProps {
  settings: ISliderSettings;
  onSettingsChange: (settings: ISliderSettings) => void;
  isLoading: boolean;
  onProFeatureClick: (feature: string) => void;
}

const SliderAppearanceSettings = ({
  settings,
  onSettingsChange,
  isLoading,
  onProFeatureClick,
}: ISliderAppearanceSettingsProps) => {
  const {resetTemplate} = useTemplates();
  const {
    imageAnimation,
    padding,
    paddingType,
    backgroundColor,
    slideDuration,
    shadow,
    shadowType,
    shadowColor,
    autoplayProgress,
    autoplayProgressType,
    autoplayProgressColor,
  } = settings;

  const onInputValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();
    key && onSettingsChange({...settings, [key]: inputValue});
  };

  const {isPro} = usePro();

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      <Section
        header={'Container'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'imageAnimation'}
                name={'Animation'}
                pro={true}
                value={imageAnimation}
                options={SliderAnimationOptions}
                onChange={
                  isPro
                    ? onInputValueChange
                    : () => onProFeatureClick('animation')
                }
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <NumberControl
                id={'slideDuration'}
                name={'Animation speed'}
                value={slideDuration}
                onChange={onInputValueChange}
                min={300}
                unit={'ms'}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <div className="mixed-fields">
                <div style={{flexBasis: '80%'}}>
                  <NumberControl
                    id={'padding'}
                    name={'Padding'}
                    value={padding}
                    onChange={onInputValueChange}
                    min={0}
                  />
                </div>
                <div style={{flexBasis: '20%'}}>
                  <SelectControl
                    id="paddingType"
                    value={paddingType}
                    options={PaddingTypetOptions}
                    onChange={onInputValueChange}
                  />
                </div>
              </div>
            </Filter>

            <Filter isLoading={isLoading}>
              <ColorControl
                id={'backgroundColor'}
                name="Background color"
                value={backgroundColor}
                onChange={onInputValueChange}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id="shadow"
                name="Shadow"
                value={shadow}
                onChange={onInputValueChange}
              />
            </Filter>
            {shadow && (
              <>
                <Filter isLoading={isLoading}>
                  <SelectControl
                    id={'shadowType'}
                    name={'Shadow type'}
                    value={shadowType}
                    options={SliderShadowTypeOptions}
                    onChange={
                      isPro
                        ? onInputValueChange
                        : () => onProFeatureClick('enable_filmstrip')
                    }
                  />
                </Filter>
                {shadowType !== SliderShadowType.SINEMA && (
                  <Filter isLoading={isLoading}>
                    <ColorControl
                      id={'shadowColor'}
                      name="Shadow color"
                      value={shadowColor}
                      onChange={onInputValueChange}
                    />
                  </Filter>
                )}
              </>
            )}
          </Grid>
        }
      />
      <Section
        header={'Media'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id="autoplayProgress"
                name="Progress"
                value={autoplayProgress}
                onChange={onInputValueChange}
              />
            </Filter>

            {autoplayProgress && (
              <>
                <Filter isLoading={isLoading}>
                  <SelectControl
                    id={'autoplayProgressType'}
                    name={'Progress type'}
                    // pro={true}
                    value={autoplayProgressType}
                    options={SliderAutoPlayProgressTypeOptions}
                    onChange={onInputValueChange}
                  />
                </Filter>

                <Filter isLoading={isLoading}>
                  <ColorControl
                    id={'autoplayProgressColor'}
                    name="Progress color"
                    value={autoplayProgressColor}
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

export {SliderAppearanceSettings};
