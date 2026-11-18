import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
import {useTemplates} from 'contexts';
import {Section} from 'core-components/section/Section';
import {AspectRatioOptions, IGridSettings} from 'data-structures';
import {NumberControl, SelectControl, SwitchControl} from '../../controls';
import {Filter} from '../Filter';

interface IGridSettingsProps {
  settings: IGridSettings;
  onSettingsChange: (settings: IGridSettings) => void;
  isLoading?: boolean;
}

const GridSettings = ({
  settings,
  onSettingsChange,
  isLoading,
}: IGridSettingsProps) => {
  const {resetTemplate} = useTemplates();
  const {
    fillContainer,
    imageFit: rawImageFit,
    alignment,
    aspectRatio,
    width,
    height,
    columns,
  } = settings;

  const imageFit =
    rawImageFit ?? ((settings as any).autoHeight ? 'auto-height' : 'cover');
  const isAutoHeight = imageFit === 'auto-height';

  const onInputValueChange = (inputValue: any, key?: string) => {
    resetTemplate?.();

    key && onSettingsChange({...settings, [key]: inputValue});
  };

  return (
    <Paper elevation={0} sx={{textAlign: 'left'}}>
      <Section
        header={'Layout Settings'}
        className="reacg-tab-section"
        body={
          <Grid container columns={24} rowSpacing={2} columnSpacing={4}>
            <Filter isLoading={isLoading}>
              <SwitchControl
                id={'fillContainer'}
                name={'Fill container'}
                tooltip={
                  <p>
                    Choose how thumbnails are sized. Enable “Fill Container” to
                    let thumbnails scale automatically to fill the available
                    space using Image aspect ratio and Columns. Disable to set
                    fixed Image width and height manually (container may not
                    always be filled).
                  </p>
                }
                value={fillContainer}
                onChange={onInputValueChange}
              />
            </Filter>
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'imageFit'}
                name={'Image fit'}
                tooltip={
                  <p>
                    Choose how images fit their thumbnail box: Cover crops to
                    fill the box (crop position can be changed for each image
                    separately or in bulk during image edit), Auto height keeps
                    original proportions by adjusting height, and Contain fits
                    the entire image inside the box without cropping.
                  </p>
                }
                value={imageFit}
                options={[
                  {value: 'cover', title: 'Cover'},
                  {value: 'auto-height', title: 'Auto height'},
                  {value: 'contain', title: 'Contain'},
                ]}
                onChange={onInputValueChange}
              />
            </Filter>
            {isAutoHeight && (
              <Filter isLoading={isLoading}>
                <SelectControl
                  id={'alignment'}
                  name={'Alignment'}
                  value={alignment}
                  options={[
                    {value: 'top', title: 'Top'},
                    {value: 'center', title: 'Center'},
                    {value: 'bottom', title: 'Bottom'},
                  ]}
                  onChange={onInputValueChange}
                />
              </Filter>
            )}
            {fillContainer ? (
              !isAutoHeight && (
                <Filter isLoading={isLoading}>
                  <SelectControl
                    id={'aspectRatio'}
                    name={'Image aspect ratio'}
                    value={aspectRatio}
                    options={AspectRatioOptions}
                    onChange={onInputValueChange}
                  />
                </Filter>
              )
            ) : (
              <>
                <Filter isLoading={isLoading}>
                  <NumberControl
                    id={'width'}
                    name={'Image width'}
                    value={width}
                    onChange={onInputValueChange}
                    min={0}
                    unit={'px'}
                  />
                </Filter>
                {!isAutoHeight && (
                  <Filter isLoading={isLoading}>
                    <NumberControl
                      id={'height'}
                      name={'Image height'}
                      value={height}
                      onChange={onInputValueChange}
                      min={0}
                      unit={'px'}
                    />
                  </Filter>
                )}
              </>
            )}
            <Filter isLoading={isLoading}>
              <NumberControl
                id={'columns'}
                name={'Columns'}
                value={columns}
                onChange={onInputValueChange}
                min={1}
              />
            </Filter>
            <ClickActionSettings isLoading={isLoading} />
          </Grid>
        }
      />
    </Paper>
  );
};

export {GridSettings};
