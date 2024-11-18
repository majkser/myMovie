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
    const currentYear = new Date().getFullYear();
    let films = [];
    let page = 1;
    const randomKeywords = ["Action", "Drama", "Sci-Fi", "Comedy", "Thriller"];
    const randomFilm =
      randomKeywords[Math.floor(Math.random() * randomKeywords.length)];

    //TODO: change to fetch random films from the bestFilms array

    try {
      setLoading(true);

      while (films.length < 30) {
        const data = await fetchFilmData(
          `${randomFilm}&y=${currentYear}&page=${page}`
        );

        if (data.Search) {
          films = [...films, ...data.Search];
        } else {
          break;
        }
        page++;
      }

      setNewlyAddedFilms(films.slice(0, 30));
    } catch (error) {
      setError({
        message: error.message || "An error occurred, please come back later",
      });
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
