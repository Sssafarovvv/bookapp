import { fetchCard } from "../Redux/api/thunkCalls";
import { useAppDispatch, useAppSelector } from "../Redux/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Styles/book.css";
import GoBackButton from "./GoBackButton";

const BookCard: React.FC = () => {
    
  let { id } = useParams<{id: string}>();

  const dispatch = useAppDispatch();

  console.log(id)

  const book = useAppSelector((state) => state.booksReducer.oneBook);
  const loading = useAppSelector((state) => state.booksReducer.loading);

  useEffect(() => {
    if (id) {
      dispatch(fetchCard(id));
    } else console.log("net zaprosa");
  }, [id, dispatch]);

  return (
    <>
    {loading ? <div className="main">Загрузка...</div> : null}
    <div className="book-card">
      <h1>{book?.title}</h1> <h2>{book?.author}</h2>
      <p>{book?.genre}</p>
      <p>{book?.publishedDate}</p>
      <div className="cover-name">
        <img src={book?.thumbnail} alt={book?.title}/>
        <h6>{book?.title}</h6>
      </div>
    <div className="info-desc">
        <p>Описание книги: </p>
        <p>{book?.description}</p>
    </div>
    <div className="info-avg">
        <p>Количество страниц: {book?.pageCount}</p>
        <p>Средний рейтинг: {book?.averageRating}</p>
        <a className="link" href={book?.buyLink}>Купить</a>
    </div>
    <GoBackButton/>
    </div>
    </>
  );
};

export default BookCard;
