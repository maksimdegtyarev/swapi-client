import { ChangeEvent } from 'react';
import { TextField } from '@mui/material';

interface ISearchField {
  onChange: (q: string) => void;
  value: string;
};

export const SearchField = ({ onChange, value }: ISearchField) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <TextField id="searchCharacter" label="Search character" type="search" onChange={handleChange} sx={{ marginBottom: '45px' }} />
  );
};