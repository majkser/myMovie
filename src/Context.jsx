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
  movieDetails: null,
  fetchData: () => {},
  handleSearch: () => {},
  fetchNewlyAddedFilms: () => {},
  fetchMovieDetails: () => {},
});

export default function ContextProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debounceSearch, setDebounceSearch] = useState(search);
  const [newlyAddedFilms, setNewlyAddedFilms] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  async function fetchData(debounceSearch) {
    if (debounceSearch.length <= 2) return;

    try {
      setLoading(true);

      const data = await fetchFilmData(`&s=${debounceSearch}`);

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

      const promises = randomFilms.map((film) => {
        return fetchFilmData(`&i=${film}`);
      });

      const data = await Promise.all(promises);

      films = data.filter((data) => data && data.Response === "True");

      setNewlyAddedFilms(films.slice(0, 36));
    } catch (error) {
      setError({
        message: error.message || "An error occurred, please come back later",
      });
    } finally {
      setLoading(false);
    }
  }

  async function fetchMovieDetails(id) {
    try {
      setLoading(true);

      const data = await fetchFilmData(`&i=${id}`);

      if (data && data.Response === "True") {
        setMovieDetails(data);
      } else {
        setMovieDetails(null);
      }
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
        movieDetails,
        handleSearch,
        setMovies,
        setSearch,
        setLoading,
        setError,
        setDebounceSearch,
        fetchData,
        fetchNewlyAddedFilms,
        fetchMovieDetails,
      }}
    >
      {children}
    </Context.Provider>
  );
}
