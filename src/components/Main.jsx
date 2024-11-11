import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Input from "./Input";
import loadingGif from "../assets/loading.gif";
import sliderSetting from "../utils/sliderSettings.js";

export default function Main() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const api_key = import.meta.env.VITE_API_KEY;

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  useEffect(() => {
    async function fetchData() {
      if (search.length <= 2) return;
      setLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${api_key}&s=${search}`
      );
      const data = await res.json();

      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
      setLoading(false);
    }

    fetchData();
  }, [search]);

  return (
    <>
      <main className="bg-[#1A1A2E]">
        <Input search={search} handleSearch={handleSearch} />
        {loading ? (
          <img className="mx-auto my-12" src={loadingGif} alt="loading" />
        ) : search.length > 2 ? (
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
