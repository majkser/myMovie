import { useContext, useEffect } from "react";
import { Context } from "../Context.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import loadingGif from "../assets/loading.gif";
import sliderSetting from "../utils/sliderSettings.js";
import Error from "./Error.jsx";
import { Link } from "react-router-dom";

export default function Main() {
  const { movies, loading, error, debounceSearch, fetchData } =
    useContext(Context);

  useEffect(() => {
    fetchData(debounceSearch);
  }, [debounceSearch]);

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <>
      <div className="bg-[#1E1E1E]">
        {loading ? (
          <img className="mx-auto my-12" src={loadingGif} alt="loading" />
        ) : debounceSearch.length > 2 ? (
          movies.length > 0 ? (
            <Slider
              className="w-[85%] mx-auto my-12 bg-inherit"
              {...sliderSetting}
            >
              {movies.length > 0 &&
                movies.map((movie) => (
                  <div key={movie.imdbID} className="">
                    <Link to={`/movie/${movie.imdbID}`}>
                      <img
                        className="w-64 h-96 mx-auto"
                        src={movie.Poster}
                        alt="movie poster"
                      />
                      <h2 className="font-bold text-center">{movie.Title}</h2>
                      <p className="text-center">{movie.Year}</p>
                    </Link>
                  </div>
                ))}
            </Slider>
          ) : (
            <p className="text-white text-center text-2xl">No movies found</p>
          )
        ) : (
          <p className="text-white text-center text-2xl">Search for a movie</p>
        )}
      </div>
    </>
  );
}
