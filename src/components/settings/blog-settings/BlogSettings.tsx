import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ClickActionSettings} from 'components/click-action-settings/ClickActionSettings';
import {useTemplates} from 'contexts';
import {Section} from 'core-components/section';
import {
  BlogViewImagePositionOptions,
  IBlogSettings,
  SizeTypeHeightOptions,
  SizeTypeWidthOptions,
} from 'data-structures';
import {NumberControl, SelectControl} from '../../controls';
import {Filter} from '../Filter';

interface IBlogSettingsProps {
  settings: IBlogSettings;
  onSettingsChange: (settings: IBlogSettings) => void;
  isLoading: boolean;
}

const BlogSettings = ({
  settings,
  onSettingsChange,
  isLoading,
}: IBlogSettingsProps) => {
  const {resetTemplate} = useTemplates();
  const {
    imageWidth,
    imageHeight,
    imageHeightType,
    imageWidthType,
    imagePosition,
  } = settings;

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
              <div className="mixed-fields">
                <div style={{flexBasis: '80%'}}>
                  <NumberControl
                    id={'imageWidth'}
                    name={'Image width'}
                    value={imageWidth}
                    onChange={onInputValueChange}
                    min={0}
                  />
                </div>
                <div style={{flexBasis: '20%'}}>
                  <SelectControl
                    id="imageWidthType"
                    value={imageWidthType}
                    options={SizeTypeWidthOptions}
                    onChange={onInputValueChange}
                  />
                </div>
              </div>
            </Filter>
            <Filter isLoading={isLoading}>
              <div className="mixed-fields">
                <div style={{flexBasis: '80%'}}>
                  <NumberControl
                    id="imageHeight"
                    name="Image height"
                    value={imageHeight}
                    onChange={onInputValueChange}
                    min={0}
                  />
                </div>
                <div style={{flexBasis: '20%'}}>
                  <SelectControl
                    id="imageHeightType"
                    value={imageHeightType}
                    options={SizeTypeHeightOptions}
                    onChange={onInputValueChange}
                  />
                </div>
              </div>
            </Filter>
            <Filter isLoading={isLoading}>
              <SelectControl
                id={'imagePosition'}
                name={'Image position'}
                value={imagePosition}
                options={BlogViewImagePositionOptions}
                onChange={onInputValueChange}
              />
            </Filter>
            <ClickActionSettings isLoading={isLoading} />
          </Grid>
        }
      />
    </Paper>
  );
};

export {BlogSettings};
