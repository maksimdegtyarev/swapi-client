import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Button, List, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getPerson, fetchPerson, peopleActions } from '../../slices/peopleSlice';
import { IMapPersonKeys, mapPersonAttributes } from '../../constants/mapPersonAttributes';
import { EditField } from '../editField/EditField';
import { IPerson } from '../../constants/person';

type IDetailPage = {
  id: string;
};

export const DetailPage = () => {
  const { id } = useParams<IDetailPage>();
  const dispatch = useAppDispatch();
  const person = useAppSelector(getPerson(Number(id)));

  const handleChange = (key: keyof IPerson, value: string) => {
    dispatch(peopleActions.updateField({ key, value, id: Number(id) }));
  };

  useEffect(() => {
    if (!person) {
      dispatch(fetchPerson(Number(id)));
    }
  }, []);

  if (!person) {
    return null;
  }
  return (
    <Container>
      <Button component={Link} to="/">back</Button>
      <Typography variant="h2" component="h2" sx={{ marginLeft: '10px' }}>
        {person.name}
      </Typography>
      <Grid container spacing={2}>

        <Grid item xs={3} md={3}>
          <List dense={false}>
            {
              (Object.keys(mapPersonAttributes) as IMapPersonKeys[]).map(item => (
                <EditField key={item} attribute={item} person={person} onChange={handleChange} />
              ))
            }
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}