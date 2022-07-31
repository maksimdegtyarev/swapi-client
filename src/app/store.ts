import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { peopleSlice } from '../slices/peopleSlice';

export const store = configureStore({
  reducer: {
    people: peopleSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
