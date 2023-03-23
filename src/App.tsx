import { Routes, Route } from "react-router-dom";
import BookCard from "./Components/BookCard";
import BooksList from "./Components/BookList";

function App() {
  return (
    <div className="App">
      <Routes>
         <Route path="/" element={<BooksList/>} /> 
         <Route path="/books/:id" element={<BookCard/>} /> 
        {/* <Route path="/books/:id" element={<BookCard/>} /> */}
      </Routes>
    </div>
  );
}

export default App;
