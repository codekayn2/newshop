import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchGenerators } from "./asyncActions";
import { Generator, GeneratorSliceState, Status } from "./types";

const initialState: GeneratorSliceState = {
    items: [],
    status: Status.LOADING, // loading | success | error
  };



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
  

  export const { setItems } = generatorSlice.actions;
  
  export default generatorSlice.reducer;
  