import { useContext, useEffect } from "react";
import { Context } from "../Context.jsx";
import { useParams } from "react-router-dom";
import loadingGif from "../assets/loading.gif";

export default function MovieDetails() {
  const { fetchMovieDetails, movieDetails, loading } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    fetchMovieDetails(id);
  }, [id]);

  if (loading) {
    return (
      <img
        className="mx-auto my-12 bg-[#1E1E1E]"
        src={loadingGif}
        alt="loading"
      />
    );
  }

  //TODO update styles for movie details and add iframe for trailer

  return (
    <div className="bg-[#1E1E1E] h-screen">
      <div className="container mx-auto flex justify-center items-center h-full">
        <div className="w-3/4 max-w-2xl bg-[#2C2C2C] rounded-lg p-8">
          {movieDetails ? (
            <>
              <h1 className="text-2xl font-bold text-white">
                {movieDetails.Title}
              </h1>
              <img
                className=" mt-4"
                src={movieDetails.Poster}
                alt="movie poster"
              />
              <p className="text-gray-300 mt-2">{movieDetails.Plot}</p>
            </>
          ) : (
            <p className="text-white">Movie details not found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
