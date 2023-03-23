import { booksReducer } from "./booksReducer";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {useDispatch, useSelector, TypedUseSelectorHook} from "react-redux"

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

let reducers = combineReducers({
    booksReducer
});

let store = configureStore({ reducer: reducers });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;