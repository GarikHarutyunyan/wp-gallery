import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
import {useTemplates} from 'contexts';
import {Section} from 'core-components/section/Section';
import {AspectRatioOptions, IThumbnailSettings} from 'data-structures';
import {NumberControl, SelectControl, SwitchControl} from '../../controls';
import {Filter} from '../Filter';

interface IThumbnailSettingsProps {
  settings: IThumbnailSettings;
  onSettingsChange: (settings: IThumbnailSettings) => void;
  isLoading?: boolean;
}

const ThumbnailSettings = ({
  settings,
  onSettingsChange,
  isLoading,
}: IThumbnailSettingsProps) => {
  const {resetTemplate} = useTemplates();
  const {fillContainer, aspectRatio, width, height, columns} = settings;

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
            {fillContainer ? (
              <Filter isLoading={isLoading}>
                <SelectControl
                  id={'aspectRatio'}
                  name={'Image aspect ratio'}
                  value={aspectRatio}
                  options={AspectRatioOptions}
                  onChange={onInputValueChange}
                />
              </Filter>
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

export {ThumbnailSettings};
