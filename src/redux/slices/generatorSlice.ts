import { Sort } from './filterSlice';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type Generator = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface GeneratorSliceState {
  items: Generator[];
  status: "loading" | "success" | "error";
}

const initialState: GeneratorSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

export type SearchGeneratorParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

export const fetchGenerators = createAsyncThunk<
  Generator[],
  SearchGeneratorParams>("generators/fetchGeneratorsStatus", async (params) => {
  const { sortBy, order, category, search, currentPage } = params;
  const { data } = await axios.get(
    `https://6395b78390ac47c68071b12a.mockapi.io/generators?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
  );
  return data;
});

const generatorSlice = createSlice({
  name: "generators",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Generator[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGenerators.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchGenerators.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchGenerators.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectGeneratorData = (state: RootState) => state.generators;
export const selectFilter = (state: RootState) => state.filter;

export const { setItems } = generatorSlice.actions;

export default generatorSlice.reducer;
