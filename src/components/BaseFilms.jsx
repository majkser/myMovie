import { Context } from "../Context";
import { useContext, useEffect } from "react";
import loadingGif from "../assets/loading.gif";

export default function BaseFilms() {
  const { fetchNewlyAddedFilms, newlyAddedFilms, loading } =
    useContext(Context);

  useEffect(() => {
    fetchNewlyAddedFilms();
  }, []); // Ensure this effect runs only once

  return (
    <>
      {loading ? (
        <img className="mx-auto my-12" src={loadingGif} alt="loading" />
      ) : (
        <div className="grid grid-cols-4 gap-x-4 gap-y-20 my-20">
          {newlyAddedFilms.map((film) => (
            <div key={film.imdbID}>
              <img
                className="w-64 h-96 mx-auto"
                src={film.Poster}
                alt="film poster"
              />
              <h2 className="font-bold text-center">{film.Title}</h2>
              <p className="text-center">{film.Year}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
