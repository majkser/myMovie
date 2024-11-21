import { useContext, useEffect, useState } from "react";
import { Context } from "../Context.jsx";
import { useParams } from "react-router-dom";
import loadingGif from "../assets/loading.gif";

export default function MovieDetails() {
  const { fetchMovieDetails, movieDetails, loading } = useContext(Context);
  const [movieTrailerId, setMovieTrailerId] = useState("");
  const { id } = useParams();
  const yt_api_key = import.meta.env.VITE_YT_API_KEY;

  useEffect(() => {
    fetchMovieDetails(id);
  }, [id]);

  useEffect(() => {
    if (movieDetails) {
      fetchTrailer(movieDetails.Title);
    }
  }, [movieDetails]);

  async function fetchTrailer(title) {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${title}+trailer&key=${yt_api_key}`
      );

      const data = await res.json();
      setMovieTrailerId(data.items[0].id.videoId);
      console.log(data.items[0].id.videoId);
    } catch (error) {
      console.error(error);
    }
  }

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
        <div className="max-w-[75%] bg-[#2C2C2C] rounded-lg p-8">
          {movieDetails ? (
            <>
              {" "}
              <h1 className="text-2xl font-bold text-white">
                {movieDetails.Title}
              </h1>
              <div className="flex justify-between">
                <div>
                  <img
                    className=""
                    src={movieDetails.Poster}
                    alt="movie poster"
                  />{" "}
                </div>

                <iframe
                  className="my-auto rounded-xl aspect-[16/9]"
                  src={`https://www.youtube.com/embed/${movieTrailerId}`}
                  frameborder="0"
                  height={350}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-gray-300 text-center mt-8">
                {movieDetails.Plot}
              </p>
            </>
          ) : (
            <p className="text-white text-center">Movie details not found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
