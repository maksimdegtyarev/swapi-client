import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getPerson, fetchPerson } from '../../slices/peopleSlice';

interface IDetailPage {
  id: number;
};

export const DetailPage = ({ id }: IDetailPage) => {
  const dispatch = useAppDispatch();
  const person = useAppSelector(getPerson(id));

  useEffect(() => {
    if (!person) {
      dispatch(fetchPerson(id));
    }
  }, []);

  if (!person) {
    return null;
  }
  return person.name;
}