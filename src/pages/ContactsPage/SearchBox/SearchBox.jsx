import { useDispatch, useSelector } from "react-redux";
import css from "./SearchBox.module.css";
import { changeFilter, selectNameFilter } from "../../../redux/filters/slice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleFilter = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.searchBoxContainer}>
      <label className={css.label} htmlFor="search">
        <span>Find contact by name</span>
        <input
          className={css.input}
          type="text"
          name="search"
          id="search"
          value={filter}
          onChange={handleFilter}
        />
      </label>
    </div>
  );
};

export default SearchBox;
