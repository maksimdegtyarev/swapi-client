import { ChangeEvent, useMemo } from 'react';
import { TextField } from '@mui/material';
import { debounce } from 'lodash-es';

interface ISearchField {
  onChange: (q: string) => void;
};

export const SearchField = ({ onChange }: ISearchField) => {
  const handleChange = useMemo(
    () =>
      debounce((e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      }, 500),
    []
  );

  return (
    <TextField id="searchCharacter" label="Search character" type="search" onChange={handleChange} sx={{ marginBottom: '45px' }} />
  );
};