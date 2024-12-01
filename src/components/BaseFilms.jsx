import { Context } from "../Context";
import { useContext, useEffect } from "react";
import loadingGif from "../assets/loading.gif";
import { Link } from "react-router-dom";

export default function BaseFilms() {
  const { fetchNewlyAddedFilms, newlyAddedFilms, loading } =
    useContext(Context);

  useEffect(() => {
    fetchNewlyAddedFilms();
  }, []);

  return (
    <>
      <div className="bg-[#1E1E1E] ">
        {loading && (
          <img className="mx-auto my-12" src={loadingGif} alt="loading" />
        )}
        {!loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-16 gap-x-4 px-4 py-8">
            {newlyAddedFilms.map((film) => (
              <div className="h-96 rounded-xl overflow-hidden">
                <div
                  key={film.imdbID}
                  className="group relative overflow-hidden rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105"
                >
                  <Link to={`/movie/${film.imdbID}`}>
                    <div className="relative w-full h-96">
                      <img
                        className="w-full h-96 object-cover"
                        src={film.Poster}
                        alt="film poster"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h2 className="text-lg font-semibold group-hover:text-indigo-400 transition">
                          {film.Title}
                        </h2>
                        <p className="text-gray-300 text-sm">{film.Year}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
