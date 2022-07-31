import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPeople, getPage, getPeople, getIsLoading } from '../../slices/peopleSlice';
import { PersonCard } from '../personCard/PersonCard';
import styles from './mainPage.module.css';

export const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const dispatch = useAppDispatch();
  const people = useAppSelector(getPeople(currentPage));
  const page = useAppSelector(getPage);
  const loading = useAppSelector(getIsLoading);

  const handleClick = (id: number) => {

  };

  const handlePrevPageClick = () => {
    setCurrentPage(currentPage - 1);
    setLoadMore(true);
  };

  const handleNextPageClick = () => {
    setCurrentPage(currentPage + 1);
    setLoadMore(currentPage < page - 1);
  }

  useEffect(() => {
    if (!people.length) {
      dispatch(fetchPeople(currentPage)).unwrap().then(data => {
        setLoadMore(!!data.next);
      })
    }
  }, [currentPage]);

  return (
    <div className={styles.container}>
      {
        people.map(item => (
          <PersonCard key={item.name} person={item} onClick={handleClick} />
        ))
      }
      {
        loading ? 'loading' : (
          <>
            {
              currentPage > 1 &&
              <button onClick={handlePrevPageClick}>prev page</button>
            }
            {
              loadMore && 
              <button onClick={handleNextPageClick}>next page</button>
            }
          </>
        )
      }
    </div> 
  )
};