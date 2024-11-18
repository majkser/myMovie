import { createContext, useState } from "react";
import { fetchFilmData } from "./https.js";
import { bestFilms } from "./utils/100Films.js";

export const Context = createContext({
  movies: [],
  search: "",
  loading: false,
  error: null,
  debounceSearch: "",
  newlyAddedFilms: [],
  fetchData: () => {},
  handleSearch: () => {},
  fetchNewlyAddedFilms: () => {},
});

export default function ContextProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debounceSearch, setDebounceSearch] = useState(search);
  const [newlyAddedFilms, setNewlyAddedFilms] = useState([]);

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

  async function fetchNewlyAddedFilms() {
    let films = [];
    const randomFilms = bestFilms.sort(() => 0.5 - Math.random()).slice(0, 36);

    try {
      setLoading(true);

      for (const film of randomFilms) {
        const data = await fetchFilmData(`&i=${film}`);

        if (data && data.Response === "True") {
          films.push(data);
        }
      }

      setNewlyAddedFilms(films.slice(0, 36));
    } catch (error) {
      setError({
        message: error.message || "An error occurred, please come back later",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Context.Provider
      value={{
        movies,
        search,
        loading,
        error,
        debounceSearch,
        newlyAddedFilms,
        handleSearch,
        setMovies,
        setSearch,
        setLoading,
        setError,
        setDebounceSearch,
        fetchData,
        fetchNewlyAddedFilms,
      }}
    >
      {children}
    </Context.Provider>
  );
}
