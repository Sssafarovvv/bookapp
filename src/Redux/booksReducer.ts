import {
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  SET_CURRENT_PAGE,
  SET_FILTER,
  SET_BOOK,
  BooksTypes,
  Book,
  FetchOneBook,
} from "../types/types";

export interface BooksState {
  books: Book[];
  currentPage: number;
  totalItems: number;
  loading: boolean;
  error: string | null;
  filter: string;
  id: string;
  oneBook: Book | null, 
}

const initialState: BooksState = {
  books: [],
  currentPage: 1,
  totalItems: 0,
  loading: false,
  error: null,
  filter: "",
  id: '',
  oneBook: null,
};

export const booksReducer = (
  state = initialState,
  action: BooksTypes | FetchOneBook
): BooksState => {
  switch (action.type) {
    case FETCH_BOOKS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.payload.books,
        totalItems: action.payload.totalItems,
        loading: false,
        error: null,
      };
    case FETCH_BOOKS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    case SET_BOOK: 
      return {...state, oneBook: action.payload.book}
    default:
      return state;
  }
};
