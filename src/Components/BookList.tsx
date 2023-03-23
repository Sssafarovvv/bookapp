import {
  HandleFetchMoreBooks,
  HandleFilterChange,
  HandleSetCategory,
  HandleSortChange,
  setFilter,
} from "../types/types";
import { fetchBooks, loadMoreBooks } from "../Redux/api/thunkCalls";
import { useAppDispatch, useAppSelector } from "../Redux/store";
import { useState } from "react";
import { Book } from "../types/types";
import Filter from "./Filter";
import { Link } from "react-router-dom";
import "../Styles/list.css";
import { FETCH_BOOKS_REQUEST, FETCH_BOOKS_SUCCESS } from "../types/types";

const BooksList: React.FC = () => {
  const dispatch = useAppDispatch();

  const { books, currentPage, totalItems, filter, loading } = useAppSelector(
    (state) => state.booksReducer
  );

  const [selectedOption, setCategory] = useState<string | undefined>();
  const [category, setFilteredCategory] = useState<Book[]>([]);

  const handleFetchBooks = (event: any) => {
    event.preventDefault();
    dispatch(fetchBooks(currentPage, filter, selectedSortOption));
  };

  const handleFetchMoreBooks: HandleFetchMoreBooks = (event) => {
    dispatch({ type: FETCH_BOOKS_REQUEST });
    dispatch(loadMoreBooks(currentPage, filter, selectedSortOption));
    dispatch({ type: FETCH_BOOKS_SUCCESS });
  };

  const handleFilterChange: HandleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setFilter(event.target.value));
  };

  const handleSetCategory: HandleSetCategory = (selectedGenre) => {
    setCategory(selectedGenre);
    if (selectedGenre === "all") {
      setFilteredCategory(books);
    } else {
      const filteredBooks = books.filter(
        (book) => book.genre === selectedGenre
      );
      setFilteredCategory(filteredBooks);
    }
  };

  const [selectedSortOption, setSelectedSortOption] =
    useState<string>("relevance");

  const handleSortChange: HandleSortChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSortOption(event.target.value);
  };

  return (
    <form onSubmit={handleFetchBooks}>
      <div className="main">
        <label htmlFor="filter"></label>
        <input
          className="input"
          placeholder="Введите название книги"
          type="text"
          id="filter"
          value={filter}
          onChange={handleFilterChange}
        />
        <button className="btn" type="submit" onClick={handleFetchBooks}>
          Найти
        </button>
      </div>
      <div className="main amount">Кол-во найденных книг: {totalItems}</div>

      <Filter
        selectedOption={selectedOption}
        handleSortChange={handleSortChange}
        selectedSortOption={selectedSortOption}
        handleSetCategory={handleSetCategory}
      />
      {category.length > 1 ? (
        <div className="main">
          <div className="books2">
            {category.map((book) => (
              <div className="book" key={book.id}>
                <Link to={`/books/${book.id}`}>
                  <h1>{book.title}</h1>
                </Link>
                <p>Автор: {book.author}</p>
                <p>Жанр: {book.genre}</p>
                <img src={book.thumbnail} alt={book.title} />
                <p>Год/дата выпуска: {book.publishedDate} </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="main">
          Жанр либо не выбран, либо по определённому жанру книг не найдено
        </p>
      )}

      {loading ? (
        <div className="main">Загрузка...</div>
      ) : (
        totalItems > 1 && (
          <div className="books-container">
            {books.map((book) => (
              <div className="book" key={book.id}>
                <Link to={`/books/${book.id}`}>
                  <h1>{book.title}</h1>
                </Link>
                <p>Автор: {book.author}</p>
                <p>Жанр: {book.genre}</p>
                <img src={book.thumbnail} alt={book.title} />
                <p>Год/дата выпуска: {book.publishedDate}</p>
              </div>
            ))}
          </div>
        )
      )}

      {totalItems > 1 && (
        <div className="container">
          <button className="btn" onClick={handleFetchMoreBooks}>
            Показать ещё...
          </button>
        </div>
      )}
    </form>
  );
};

export default BooksList;
