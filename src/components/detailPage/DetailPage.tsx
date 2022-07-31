import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getPerson, fetchPerson } from '../../slices/peopleSlice';

type IDetailPage = {
  id: string;
};

export const DetailPage = () => {
  const { id } = useParams<IDetailPage>();
  const dispatch = useAppDispatch();
  const person = useAppSelector(getPerson(Number(id)));

  useEffect(() => {
    if (!person) {
      dispatch(fetchPerson(Number(id)));
    }
  }, []);

  if (!person) {
    return null;
  }
  return (
    <div>
      <Link to="/">back</Link>
      {person.name}
    </div>
  );
}