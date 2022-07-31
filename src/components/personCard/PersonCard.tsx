import { IPerson } from '../../constants/person';
import styles from './personCard.module.css';

interface IPersonCard {
  person: IPerson;
  onClick: (id: number) => void;
};

export const PersonCard = ({ person, onClick }: IPersonCard) => {
  return (
    <div className={styles.container} onClick={() => onClick(person.id)}>
      <div>{person.name}</div>
      <div>{person.gender}</div>
    </div>
  )
};