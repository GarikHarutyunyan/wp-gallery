import {Grid} from '@mui/material';
import TextField from '@mui/material/TextField';
import React, {ChangeEvent, useRef} from 'react';

interface IFilterProviderProps {
  onSearch: (newSearchTerm?: string) => void;
  placeholder: string;
}

const FilterProvider: React.FC<IFilterProviderProps> = ({
  onSearch,
  placeholder,
}) => {
  const searchDebounceTimeoutRef = useRef<number | null>(null);
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    if (searchDebounceTimeoutRef.current) {
      clearTimeout(searchDebounceTimeoutRef.current);
    }

    searchDebounceTimeoutRef.current = setTimeout(() => {
      if (onSearch) {
        onSearch(searchTerm);
      }
    }, 500) as any;
  };

  const renderFilter = () => {
    return (
      <TextField
        id="outlined-basic"
        placeholder={placeholder}
        variant="outlined"
        onChange={handleSearchInputChange}
        fullWidth
        InputProps={{
          sx: {
            '& input': {
              'padding': '11px 20px',
              'minHeight': 0,
              'margin': '0',
              '&:focus': {
                boxShadow: 'none',
                outline: 'none',
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
