import { createContext, useContext, useReducer, useState } from "react";
import searchReducer, { initialState } from "./searchReducer";
import { GridFilterItem } from "@mui/x-data-grid";

const SearchContext = createContext(initialState);

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const [flag, setFlag] = useState(true);

  const addToSearch = (filterItem: GridFilterItem) => {
    dispatch({
      type: "ADD_TO_SEARCH",
      payload: {
        gridFilterItem: filterItem,
      },
    });
  };

  const resetSearchState = () => {
    setFlag(false);
    dispatch({
      type: "RESET_SEARCH_STATE",
      payload: {},
    });
  };

  const value = {
    fields: state,
    flag: flag,
    setFlag: setFlag,
    addToSearch,
    resetSearchState,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

const useSearch = () => {
  const context = useContext(SearchContext);

  if (context === undefined) {
    throw new Error("useSearch must be used within SearchContext");
  }

  return context;
};

export default useSearch;
