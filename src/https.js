const api_key = import.meta.env.VITE_API_KEY;

export async function fetchFilmData(query) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${api_key}${query}`);
  const data = await res.json();

  if (!res.ok || data.Response === "False") {
    throw new Error(data.Error || "An error occurred while fetching data");
  }

  return data;
}
