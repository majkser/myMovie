import { useContext, useEffect } from "react";
import { Context } from "./Context";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Input from "./Input";
import loadingGif from "../assets/loading.gif";
import sliderSetting from "../utils/sliderSettings.js";
import { fetchFilmData } from "../https.js";
import Error from "./Error.jsx";

export default function Main() {
  const {
    movies,
    setMovies,
    search,
    loading,
    setLoading,
    error,
    setError,
    debounceSearch,
    setDebounceSearch,
  } = useContext(Context);

  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      setDebounceSearch(search);
    }, 500);

    return () => clearTimeout(timeoutHandler);
  });

  useEffect(() => {
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

    fetchData();
  }, [debounceSearch]);

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <>
      <main className="bg-[#1A1A2E]">
        <Input />
        {loading ? (
          <img className="mx-auto my-12" src={loadingGif} alt="loading" />
        ) : debounceSearch.length > 2 ? (
          movies.length > 0 ? (
            <Slider className="w-[85%] mx-auto my-12" {...sliderSetting}>
              {movies.length > 0 &&
                movies.map((movie) => (
                  <div key={movie.imdbID} className="">
                    <img
                      className="w-64 h-96 mx-auto"
                      src={movie.Poster}
                      alt="movie poster"
                    />
                    <h2 className="font-bold text-center">{movie.Title}</h2>
                    <p className="text-center">{movie.Year}</p>
                  </div>
                ))}
            </Slider>
          ) : (
            <p className="text-white text-center text-2xl">No movies found</p>
          )
        ) : (
          <p className="text-white text-center text-2xl">Search for a movie</p>
        )}
      </main>
    </>
  );
}
