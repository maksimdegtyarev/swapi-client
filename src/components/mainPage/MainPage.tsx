import { useEffect, useState } from 'react';
import { ButtonGroup, Button, Container, Grid, CircularProgress, Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPeople, getPage, getPeople, getIsLoading, getSearchQuery, peopleActions, getIsLoadMore } from '../../slices/peopleSlice';
import { PersonCard } from '../personCard/PersonCard';
import { SearchField } from '../searchField/SearchField';
import styles from './mainPage.module.css';

export const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const people = useAppSelector(getPeople(currentPage));
  const page = useAppSelector(getPage);
  const loading = useAppSelector(getIsLoading);
  const searchQuery = useAppSelector(getSearchQuery);
  const loadMore = useAppSelector(getIsLoadMore);
  
  const fetchPeopleList = (currentPage: number, q: string) => {
    dispatch(fetchPeople({ page: currentPage, q }));
  };

  const handleSearchQueryChanged = (q: string) => {
    dispatch(peopleActions.changeSearchQuery(q));
    setCurrentPage(1);
    fetchPeopleList(1, q);
  };

  const handlePrevPageClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPageClick = () => {
    setCurrentPage(currentPage + 1);
  }

  useEffect(() => {
    if (!people.length) {
      fetchPeopleList(currentPage, searchQuery);
    }
  }, [currentPage]);

  return (
    <Container>
      <Typography variant="h2" component="h2" sx={{ marginBottom: '25px' }}>
        Characters list
      </Typography>
      <SearchField onChange={handleSearchQueryChanged} value={searchQuery} />
      <Grid item xs={12}>
        <Grid container justifyContent="start" spacing={5}>
          {
            people.map(item => (
              <PersonCard key={item.name} person={item} />
            ))
          }
        </Grid>
      </Grid>
      {
        loading ? (
          <Box sx={{ marginTop: '25px' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {
              <ButtonGroup sx={{ marginTop: '40px' }} disableElevation variant="contained">
                {
                  currentPage > 1 &&
                  <Button sx={{ marginRight: '15px' }} onClick={handlePrevPageClick}>prev page</Button>
                }
                {
                  (loadMore || (currentPage < page)) && 
                  <Button onClick={handleNextPageClick}>next page</Button>
                }
              </ButtonGroup>
            }
          </>
        )
      }
    </Container>
  );
};
