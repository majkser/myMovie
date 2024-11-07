import { useState, useEffect } from "react";

export default function Main() {
  const [movies, setMovies] = useState([]);

  const api_key = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=${api_key}&s=${"hellboy"}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.Search);
      });
  }, []);

  return (
    <>
      <main>
        <div className="">
          {movies.length > 0 &&
            movies.map((movie) => (
              <div key={movie.imdbID} className="flex">
                <img src={movie.Poster} alt="movie poster" />
                <div>
                  <h2>{movie.Title}</h2>
                  <p>{movie.Year}</p>
                </div>
              </div>
            ))}
        </div>
      </main>
    </>
  );
}
