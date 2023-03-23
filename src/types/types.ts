import { Dispatch } from "redux";
import { ChangeEvent } from "react";

export const FETCH_BOOKS_REQUEST = "FETCH_BOOKS_REQUEST";
export const FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS";
export const FETCH_BOOKS_FAILURE = "FETCH_BOOKS_FAILURE";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_FILTER = "SET_FILTER";
export const SET_BOOK = "SET_BOOK"

export interface FilterProps {
  selectedOption: string | undefined;
  handleSortChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  selectedSortOption: string;
  handleSetCategory: (selectedGenre: string) => void;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  thumbnail: string;
  publishedDate: string;
  description?: string
  publisher?: string
  pageCount?: number
  averageRating?: number
  buyLink?: string
  large?: string
}

export interface FetchOneBook {
  type: typeof SET_BOOK;
  payload: {
    book: Book;
  }
}


export interface FetchBooksRequestAction {
  type: typeof FETCH_BOOKS_REQUEST;
}

export interface FetchBooksSuccessAction {
  type: typeof FETCH_BOOKS_SUCCESS;
  payload: {
    books: Book[];
    totalItems: number;
  };
}


export interface FetchBooksFailureAction {
  type: typeof FETCH_BOOKS_FAILURE;
  payload: any;
}

export interface SetCurrentPageAction {
  type: typeof SET_CURRENT_PAGE;
  payload: number;
}

export interface SetFilterAction {
  type: typeof SET_FILTER;
  payload: string;
}

export type BooksTypes =
  | FetchBooksRequestAction
  | FetchBooksSuccessAction
  | FetchBooksFailureAction
  | SetCurrentPageAction
  | SetFilterAction
  | FetchOneBook

export type DispatchType = Dispatch<BooksTypes>;

export const setCurrentPage = (page: number): SetCurrentPageAction => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});

export const setFilter = (filter: string): SetFilterAction => ({
  type: SET_FILTER,
  payload: filter,
});


export type HandleFetchMoreBooks = (event: React.MouseEvent<HTMLButtonElement>) => void;
export type HandleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type HandleSetCategory = (selectedGenre: string) => void;
export type HandleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => void;