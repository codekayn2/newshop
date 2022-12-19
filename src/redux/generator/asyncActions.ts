import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Generator, SearchGeneratorParams } from "./types";

export const fetchGenerators = createAsyncThunk<Generator[],
  SearchGeneratorParams>("generators/fetchGeneratorsStatus", async (params) => {
  const { sortBy, order, category, search, currentPage } = params;
  const { data } = await axios.get(
    `https://6395b78390ac47c68071b12a.mockapi.io/generators?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
  );
  return data;
});
