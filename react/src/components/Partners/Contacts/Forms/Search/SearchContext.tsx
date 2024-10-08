import { createContext, useContext, useReducer } from "react";
import searchReducer, { initialState } from "./searchReducer";

const SearchContext = createContext(initialState)

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState)

  const addToSearch = (field) => {
    dispatch({
      type: "ADD_TO_SEARCH",
      payload: {
        fields: field
      }
    })
  }

  const value = {
    fields: state,
    addToSearch
  }

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

const useSearch = () => {
  const context = useContext(SearchContext)

  if (context === undefined) {
    throw new Error("useSearch must be used within SearchContext")
  }

  return context
}

export default useSearch