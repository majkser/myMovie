import { createContext, useState } from "react";
import { fetchFilmData } from "../https.js";

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

  async function fetchData() {
    if (debounceSearch.length <= 2) return;

    try {
      setLoading(true);

      const data = await fetchFilmData(debounceSearch);

      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      setError({
        message: error.message || "An error occurred, please come back later",
      });
    }

    setLoading(false);
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
        fetchData,
      }}
    >
      {children}
    </Context.Provider>
  );
}
