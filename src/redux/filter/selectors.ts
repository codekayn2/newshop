import { RootState } from '../store';

export const selectFilter = (state: RootState) => state.filter

export const sortSelector = (state: RootState) => state.filter.sort

