import { Link } from 'react-router-dom';
import { Paper, Typography, CardContent, Button, CardActions, Grid } from '@mui/material';
import { IPerson } from '../../constants/person';

interface IPersonCard {
  person: IPerson;
};

export const PersonCard = ({ person }: IPersonCard) => {
  return (
    <Grid item xs={5}>
      <Paper sx={{ backgroundColor: '#efefef' }}>
        <CardContent>
          <Typography color="text.primary" gutterBottom>
            name: <b>{person.name}</b>
          </Typography>
          <Typography color="text.primary">sex: <b>{person.gender}</b></Typography>
        </CardContent>
        <CardActions>
          <Button component={Link} to={`/${person.id}`}>show details</Button>
        </CardActions>
      </Paper>
    </Grid>
  )
};