import { Context } from "../Context";
import { useContext, useEffect } from "react";

export default function BaseFilms() {
  const { fetchNewlyAddedFilms, newlyAddedFilms } = useContext(Context);

  useEffect(() => {
    fetchNewlyAddedFilms();
  }, []);

  return (
    <>
      <div>
        {newlyAddedFilms.map((film) => (
          <div key={film.imdbID} className="">
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
    </>
  );
}
