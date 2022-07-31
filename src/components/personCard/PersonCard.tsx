import { Link } from 'react-router-dom';
import { IPerson } from '../../constants/person';
import styles from './personCard.module.css';

interface IPersonCard {
  person: IPerson;
};

export const PersonCard = ({ person }: IPersonCard) => {
  return (
    <div className={styles.container}>
      <Link to={`/${person.id}`}>{person.name}</Link>
      <div>{person.gender}</div>
    </div>
  )
};