import { useContext, useEffect, useState } from "react";
import { Context } from "../Context.jsx";
import { useParams } from "react-router-dom";
import loadingGif from "../assets/loading.gif";
import Rating from "@mui/material/Rating";
import starIcon from "../assets/star.svg";
const yt_api_key = import.meta.env.VITE_YT_API_KEY;

export default function MovieDetails() {
  const { fetchMovieDetails, movieDetails, loading, search } =
    useContext(Context);
  const [movieTrailerId, setMovieTrailerId] = useState("");
  const [ratingButtonClick, setRatingButtonClick] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    fetchMovieDetails(id);
  }, [id]);

  useEffect(() => {
    if (movieDetails) {
      fetchTrailer(movieDetails.Title);
      const storedRating = localStorage.getItem(
        `userRating:${movieDetails.imdbID}`
      );
      if (storedRating != null) {
        setUserRating(parseFloat(storedRating));
      }
    }
  }, [movieDetails]);

  useEffect(() => {
    if (movieDetails) {
      localStorage.setItem(
        `userRating:${movieDetails.imdbID}`,
        parseFloat(userRating)
      );
    }
  }, [userRating, movieDetails]);

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

  let rate = null;
  let starsValue = null;
  if (movieDetails) {
    movieDetails.Ratings.map((rating) => {
      {
        if (rating.Source === "Internet Movie Database") {
          rate = rating.Value;
        }
      }
    });

    rate = parseFloat(rate);
    switch (true) {
      case rate < 1.5:
        starsValue = 0.5;
        break;
      case rate < 2:
        starsValue = 1;
        break;
      case rate < 3:
        starsValue = 1.5;
        break;
      case rate < 4:
        starsValue = 2;
        break;
      case rate < 5:
        starsValue = 2.5;
        break;
      case rate < 6:
        starsValue = 3;
        break;
      case rate < 7:
        starsValue = 3.5;
        break;
      case rate < 8.5:
        starsValue = 4;
        break;
      case rate < 9:
        starsValue = 4.5;
        break;
      default:
        starsValue = 5;
        break;
    }
  }

  function handleRatingButtonClick() {
    setRatingButtonClick((prev) => !prev);
  }

  function handleUserRating(event, newValue) {
    setUserRating(newValue);
    handleRatingButtonClick();
  }

  return (
    <>
      {ratingButtonClick && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onMouseUp={handleRatingButtonClick}
        >
          <div
            className="bg-[#2C2C2C] w-[90%] sm:w-[75%] md:w-[50%] lg:w-[40%] h-[30%] p-8 rounded-lg flex flex-col justify-evenly"
            onMouseUp={(e) => e.stopPropagation()}
          >
            <h2 className="text-white text-center text-2xl mt-[-30px]">
              RATE:
            </h2>
            <div className="flex justify-center">
              <Rating
                className="scale-[150%] sm:scale-[200%] md:scale-[250%]"
                name="half-rating"
                value={userRating}
                onChange={handleUserRating}
                precision={0.5}
              />
            </div>
          </div>
        </div>
      )}
      <div
        className={`container mx-auto flex justify-center items-center h-full ${
          ratingButtonClick && "blur-sm"
        }`}
      >
        <div className="w-[90%] sm:w-[85%] md:w-[75%] lg:w-[65%] bg-[#2C2C2C] rounded-lg p-4 sm:p-8">
          {movieDetails ? (
            <>
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="mb-4 sm:mb-0">
                  <h1 className="text-2xl font-bold text-white">
                    {movieDetails.Title}
                  </h1>
                  <p className="text-l text-white mb-6">{movieDetails.Year}</p>
                </div>
                <div className="m-auto">
                  <p className="text-center">{rate}/10</p>
                  <Rating
                    className="m-auto"
                    name="half-rating-read"
                    defaultValue={starsValue}
                    precision={0.5}
                    readOnly
                  />
                </div>
                <button onClick={handleRatingButtonClick}>
                  <div className="block sm:flex h-3/4 m-auto hover:bg-[#1E1E1E] px-4 py-0 rounded-2xl transition duration-300">
                    <h3 className="my-auto text-xl text-white text-center mr-1">
                      RATE
                    </h3>
                    <img src={starIcon} alt="starIcon" className="m-auto" />
                  </div>
                </button>
              </div>
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="mb-4 sm:mb-0">
                  <img
                    className="shadow-xl rounded-xl w-full sm:w-auto"
                    src={movieDetails.Poster}
                    alt="movie poster"
                  />
                </div>
                <iframe
                  className="my-auto rounded-xl aspect-[16/9] w-full sm:w-auto"
                  src={`https://www.youtube.com/embed/${movieTrailerId}`}
                  frameBorder="0"
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
    </>
  );
}
