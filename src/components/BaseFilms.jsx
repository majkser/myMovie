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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-16 gap-x-4 px-4 py-8">
          {newlyAddedFilms.map((film) => (
            <div
              key={film.imdbID}
              className="group relative overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <div>
                <img
                  className="h-full w-auto mx-auto aspect-[2/3]"
                  src={film.Poster}
                  alt="film poster"
                />
              </div>
              <h2 className="text-lg text-center font-semibold text-white group-hover:text-indigo-400 transition">
                {film.Title}
              </h2>
              <p className="text-center text-gray-400 text-sm">{film.Year}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
