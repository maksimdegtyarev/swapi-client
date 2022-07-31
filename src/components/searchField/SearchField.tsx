import { ChangeEvent } from 'react';

interface ISearchField {
  onChange: (q: string) => void;
  value: string;
};

export const SearchField = ({ onChange, value }: ISearchField) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input type="text" onChange={handleChange} value={value} />
  );
};