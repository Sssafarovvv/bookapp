import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import {
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  BooksTypes,
  Book,
  SET_BOOK,
} from "../../types/types";
import { Dispatch } from "redux";
import { setCurrentPage } from "../../types/types";
import { googleBooksApi } from "./api";

export type getStateType = () => RootState;

export type DispatchType = Dispatch<BooksTypes>;

export const loadMoreBooks = (
  page: number,
  filter: string,
  selectedSortOption: string
  // id: string,
): ThunkAction<Promise<void>, RootState, unknown, BooksTypes> => {
  return async (dispatch: DispatchType, getState: getStateType) => {
    dispatch({ type: FETCH_BOOKS_REQUEST });
    try {
      const startIndex = (page - 1) * 30;
      const response = await googleBooksApi.get("/volumes", {
        params: {
          q: filter,
          startIndex,
          maxResults: 30,
          orderBy: selectedSortOption,
        },
      });
      const books = response.data.items.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.join(", ") || "",
        genre: item.volumeInfo.categories?.join(", ") || "",
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
        publishedDate: item.volumeInfo.publishedDate || "",
      }));
      const totalItems = response.data.totalItems;
      const currentState = getState().booksReducer.books;
      const updatedBooks = currentState.concat(books);
      dispatch({
        type: FETCH_BOOKS_SUCCESS,
        payload: { books: updatedBooks, totalItems },
      });
      dispatch(setCurrentPage(page));
      console.log(response);
    } catch (error) {
      dispatch({ type: FETCH_BOOKS_FAILURE, payload: alert("Ошибка или пустой запрос") });
    }
  };
};

export const fetchBooks = (
  page: number,
  filter: string,
  selectedSortOption: string
  // id: string,
): ThunkAction<Promise<void>, RootState, unknown, BooksTypes> => {
  return async (dispatch: DispatchType) => {
    dispatch({ type: FETCH_BOOKS_REQUEST });
    try {
      const response = await googleBooksApi.get("/volumes", {
        params: {
          q: filter,
          startIndex: (page - 1) * 10,
          maxResults: 30,
          orderBy: selectedSortOption,
        },
      });
      const books: Book[] = response.data.items.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.join(", ") || "",
        genre: item.volumeInfo.categories?.join(", ") || "",
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
        publishedDate: item.volumeInfo.publishedDate || "",
      }));
      const totalItems = response.data.totalItems;
      dispatch({ type: FETCH_BOOKS_SUCCESS, payload: { books, totalItems } });
      console.log(response);
    } catch (error) {
      dispatch({ type: FETCH_BOOKS_FAILURE, payload: alert("Ошибка или пустой запрос") });
    }
  };
};

export const fetchCard = (
  id: string
): ThunkAction<Promise<void>, RootState, unknown, BooksTypes> => {
  return async (dispatch: DispatchType) => {
    dispatch({ type: FETCH_BOOKS_REQUEST });
    try {
      const response = await googleBooksApi.get(`/volumes/${id}`);
      const book: Book = {
        id: response.data.id,
        title: response.data.volumeInfo.title,
        description: response.data.volumeInfo.description,
        publisher: response.data.volumeInfo.publisher,
        pageCount: response.data.volumeInfo?.pageCount,
        averageRating: response.data.volumeInfo?.averageRating,
        buyLink: response.data.volumeInfo?.buyLink,
        large: response.data.volumeInfo.imageLinks?.large || "",
        author: response.data.volumeInfo.authors?.join(", ") || "",
        genre: response.data.volumeInfo.categories?.join(", ") || "",
        thumbnail: response.data.volumeInfo.imageLinks?.thumbnail || "",
        publishedDate: response.data.volumeInfo.publishedDate || "",
    };
      dispatch({type: SET_BOOK, payload: {book}})
      console.log(response, book +'asdsad');
    } catch (error) {
      dispatch({ type: FETCH_BOOKS_FAILURE, payload: alert("Ошибка или пустой запрос") });
    }
  };
};




