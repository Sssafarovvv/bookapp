import { FilterProps } from "../types/types";

const Filter: React.FC<FilterProps> = ({
  selectedOption,
  handleSortChange,
  selectedSortOption,
  handleSetCategory,
}) => {
  return (
    <div className="main">
      <label htmlFor="books">Выберите жанр: </label>
      <select
        id="books"
        value={selectedOption}
        onChange={(e) => handleSetCategory(e.target.value)}
      >
        <option value="">All</option>
        <option value="art">Art</option>
        <option value="biography">Biography</option>
        <option value="computers">Computers</option>
        <option value="history">History</option>
        <option value="medical">Medical</option>
        <option value="poetry">Poetry</option>
        <option value="Cultural property">Cultural property</option>
        <option value="capitalism">Capitalism</option>
        <option value="Psychology">Psychology</option>
        <option value="Fiction">Fiction</option>
        <option value="Education">Education</option>
      </select>
      <label htmlFor="sort"> Сортировка по: </label>
      <select id="sort" value={selectedSortOption} onChange={handleSortChange}>
        <option value="relevance">Релевантности</option>
        <option value="newest">Новизне</option>
      </select>
    </div>
  );
};

export default Filter;
