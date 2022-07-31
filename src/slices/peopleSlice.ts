import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { IPerson } from '../constants/person';
import { IPeopleResponse } from '../constants/peopleResponse';
import { getIdByUrl } from '../utils/getIdByUrl';

const BASE_URL = 'https://swapi.dev/api/people/';
const PAGE_LENGTH = 10;


interface IUpdateField {
  key: keyof IPerson;
  value: string;
  id: number;
};

interface IState {
  loading: boolean;
  people: IPerson[];
  page: number;
  q: string;
  loadMore: boolean
};

const initialState: IState = {
  loading: false,
  people: [],
  page: 1,
  q: '',
  loadMore: true,
};

export const fetchPeople = createAsyncThunk<IPeopleResponse, { page: number, q?: string }>('people/fetch', async ({ page, q }) => {
  const response = await fetch(`${BASE_URL}?page=${page}${q ? `&search=${q}` : ''}`);
  return await response.json();
});

export const fetchPerson = createAsyncThunk<Omit<IPerson, 'id'>, number>('person/fetch', async id => {
  const response = await fetch(`${BASE_URL}${id}`);
  return await response.json();
});

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchPeople.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchPeople.fulfilled, (state, action) => {
      if (action.meta.arg.page === 1) {
        state.people = [];
      }
      state.people = [
        ...state.people,
        ...(action.payload.results || []).map((item => ({
          ...item,
          id: getIdByUrl(item.url),
        }))),
      ];
      state.loading = false;
      
      if (action.payload.next) {
        state.loadMore = true;
        state.page = action.meta.arg.page + 1;
      } else {
        state.loadMore = false;
        state.page = action.meta.arg.page;
      }
    });
    builder.addCase(fetchPerson.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchPerson.fulfilled, (state, action) => {
      state.loading = false;
      state.people = [{
        ...action.payload,
        id: action.meta.arg,
      }];
    });
  },
  reducers: {
    changeSearchQuery: (state, action: PayloadAction<string>) => {
      state.q = action.payload;
    },
    updateField: (state, action: PayloadAction<IUpdateField>) => {
      state.people = state.people.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            [action.payload.key]: action.payload.value,
          };
        }
        return item;
      });
    },
  }
});

export const getPeople = (page: number) => (state: RootState) => {
  return state.people.people.filter((item, index) => {
    if (index >= (page - 1) * PAGE_LENGTH && index < page * PAGE_LENGTH) {
      return true;
    }
    return false;
  });
};
export const getPerson = (id: number) => (state: RootState) => state.people.people.find(item => item.id === id);
export const getPage = (state: RootState) => state.people.page;
export const getIsLoading = (state: RootState) => state.people.loading;
export const getSearchQuery = (state: RootState) => state.people.q;
export const getIsLoadMore = (state: RootState) => state.people.loadMore;


export const peopleActions = peopleSlice.actions;
