import { useDispatch } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import  generators from "./slices/generatorSlice"

export const store = configureStore({
  reducer: {
    filter,
    cart,
    generators
  },
});


export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()