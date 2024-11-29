import { useContext, useEffect } from "react";
import { Context } from "../Context.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import loadingGif from "../assets/loading.gif";
import Error from "./Error.jsx";
import { Link } from "react-router-dom";

import { Navigation, Scrollbar, A11y, EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Main() {
  const { movies, loading, error, debounceSearch, fetchData } =
    useContext(Context);

  useEffect(() => {
    fetchData(debounceSearch);
  }, [debounceSearch]);

  if (error) {
    return <Error message={error.message} />;
  }
  const shouldRenderMovies = movies.length > 0 && !loading;
  const noMoviesFound =
    debounceSearch.length < 2 && movies.length == 0 && !loading;
  const initialView = debounceSearch.length < 2;

  return (
    <>
      <div className="bg-[#1E1E1E]">
        {loading && (
          <img className="mx-auto my-12" src={loadingGif} alt="loading" />
        )}
        {shouldRenderMovies && (
          <Swiper
            className="w-[85%] mx-auto my-12 bg-inherit"
            modules={[Navigation, EffectCards, A11y]}
            navigation
            spaceBetween={10}
            slidesPerView={5}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.imdbID}>
                <div className="group relative overflow-hidden hover:scale-105 transition-transform duration-300 z-10">
                  <Link to={`/movie/${movie.imdbID}`}>
                    <div>
                      <img
                        className="w-64 h-96 mx-auto"
                        src={movie.Poster}
                        alt="movie poster"
                      />
                      <h2 className="text-lg text-center font-semibold text-white group-hover:text-indigo-400 transition">
                        {movie.Title}
                      </h2>
                      <p className="text-center text-gray-400 text-sm">
                        {movie.Year}
                      </p>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {noMoviesFound && (
          <p className="text-white text-center text-2xl">No movies found</p>
        )}

        {initialView && (
          <p className="text-white text-center text-2xl">Search for a movie</p>
        )}
      </div>
    </>
  );
}
