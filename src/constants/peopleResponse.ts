import { IPerson } from './person';

export interface IPeopleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Omit<IPerson, 'id'>[];
};