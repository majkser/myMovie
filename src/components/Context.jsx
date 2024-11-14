import { createContext, useState } from "react";

export const Context = createContext({
  movies: [],
  search: "",
  loading: false,
  error: null,
  debounceSearch: "",
});

export default function ContextProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debounceSearch, setDebounceSearch] = useState(search);

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  return (
    <Context.Provider
      value={{
        movies,
        search,
        loading,
        error,
        debounceSearch,
        handleSearch,
        setMovies,
        setSearch,
        setLoading,
        setError,
        setDebounceSearch,
      }}
    >
      {children}
    </Context.Provider>
  );
}
