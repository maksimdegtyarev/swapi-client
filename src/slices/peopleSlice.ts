import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { IPerson } from '../constants/person';
import { IPeopleResponse } from '../constants/peopleResponse';
import { getIdByUrl } from '../utils/getIdByUrl';

const BASE_URL = 'https://swapi.dev/api/people/';
const PAGE_LENGTH = 10;


interface IState {
  loading: boolean;
  people: IPerson[];
  page: number;
};

const initialState: IState = {
  loading: false,
  people: [],
  page: 1,
};

export const fetchPeople = createAsyncThunk<IPeopleResponse, number>('people/fetch', async page => {
  const response = await fetch(`${BASE_URL}?page=${page}`);
  return await response.json();
});

export const fetchPerson = createAsyncThunk<Omit<IPerson, 'id'>, number>('person/fetch', async id => {
  const response = await fetch(`${BASE_URL}${id}`);
  return await response.json();
})

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchPeople.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchPeople.fulfilled, (state, action) => {
      state.people = [
        ...state.people,
        ...action.payload.results.map((item => ({
          ...item,
          id: getIdByUrl(item.url),
        }))),
      ];
      state.loading = false;
      
      if (action.payload.next) {
        state.page = state.page + 1;
      }
    });
    builder.addCase(fetchPerson.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchPerson.fulfilled, (state, action) => {
      state.loading = false;
      state.people = [{
        ...action.payload,
        id: getIdByUrl(action.payload.url)
      }];
    });
  },
  reducers: {}
});

export const getPeople = (page: number) => (state: RootState) => {
  return state.people.people.filter((item, index) => {
    if (index >= (page - 1) * PAGE_LENGTH && index < page * PAGE_LENGTH) {
      return true;
    }
    return false;
  });
  //return state.people.people.slice((page - 1) * PAGE_LENGTH, Math.min(page * PAGE_LENGTH, state.people.people.length - 1));
};
export const getPerson = (id: number) => (state: RootState) => state.people.people.find(item => item.id === id);
export const getPage = (state: RootState) => state.people.page;
export const getIsLoading = (state: RootState) => state.people.loading;

