import {Grid} from '@mui/material';
import TextField from '@mui/material/TextField';
import {TranslationsContext} from 'contexts/TranslationsContext';
import React, {useContext, useRef} from 'react';
import {useDebouncedSearch} from 'utils';
interface IFilterProviderProps {
  onSearch: (newSearchTerm?: string) => void;
}

const FilterProvider: React.FC<IFilterProviderProps> = ({onSearch}) => {
  const {searchPlaceholder} = useContext(TranslationsContext);
  const previousTerm = useRef<string>('');

  const debouncedSearch = useDebouncedSearch((searchTerm: string) => {
    if (onSearch && searchTerm !== previousTerm.current) {
      // If the search term is the same as the previous one, do not call onSearch
      previousTerm.current = searchTerm;
      onSearch(searchTerm);
    }
  }, 700);

  const renderFilter = () => {
    return (
      <TextField
        id="outlined-basic"
        placeholder={searchPlaceholder}
        variant="outlined"
        onChange={(e) => debouncedSearch(e.target.value)}
        fullWidth
        InputProps={{
          sx: {
            '& input': {
              'padding': '11px 20px',
              'minHeight': 0,
              'margin': '0',
              'border': 0,
              'borderRadius': 'inherit',
              'backgroundColor': '#fff',
              'boxShadow': 'unset',
              'color': 'inherit',
              '&:focus': {
                boxShadow: 'none',
                outline: 'none',
                borderColor: 'unset',
              },
            },
          },
        }}
      />
    );
  };

  return (
    <Grid
      container
      spacing={0}
      style={{
        margin: '15px 0',
      }}
    >
      <Grid item style={{height: '100%', width: '270px'}}>
        {renderFilter()}
      </Grid>
    </Grid>
  );
};

export {FilterProvider};
export default FilterProvider;
