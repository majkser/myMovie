import { useContext, useEffect } from "react";
import { Context } from "../Context.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import loadingGif from "../assets/loading.gif";
import Error from "./Error.jsx";
import { Link } from "react-router-dom";

import { Navigation, Autoplay, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
    debounceSearch.length < 2 && movies.length === 0 && !loading;
  const initialView = debounceSearch.length < 2;

  return (
    <>
      <div className="bg-[#1E1E1E]">
        {loading && (
          <img className="mx-auto my-12" src={loadingGif} alt="loading" />
        )}
        {shouldRenderMovies && (
          <Swiper
            className="w-[90%] mx-auto my-12 bg-inherit"
            modules={[Navigation, Autoplay, A11y]}
            navigation
            autoplay={{ delay: 3000 }}
            spaceBetween={20}
            slidesPerView="auto"
            loop={true}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 30 },
              1024: { slidesPerView: 5, spaceBetween: 40 },
            }}
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.imdbID}>
                <div className="h-96 rounded-xl overflow-hidden">
                  <div className="group relative overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                    <Link to={`/movie/${movie.imdbID}`}>
                      <div>
                        <img
                          className="w-full h-96 object-cover"
                          src={movie.Poster}
                          alt="movie poster"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <h2 className="text-lg font-semibold group-hover:text-indigo-400 transition">
                            {movie.Title}
                          </h2>
                          <p className="text-gray-300 text-sm">{movie.Year}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
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
