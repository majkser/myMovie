import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Main() {
  const [movies, setMovies] = useState([]);

  const api_key = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=${api_key}&s=${"Pirates"}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.Search);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    centerMode: true,
    lazyLoad: "ondemand",
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <main>
        <Slider className="w-[85%] mx-auto my-12" {...settings}>
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
      </main>
    </>
  );
}
