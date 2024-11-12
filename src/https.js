const api_key = import.meta.env.VITE_API_KEY;

export async function fetchFilmData(search) {
  const res = await fetch(
    `http://www.omdbapi.com/?apikey=${api_key}&s=${search}`
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error("An error occurred while fetching data");
  }

  return data;
}
