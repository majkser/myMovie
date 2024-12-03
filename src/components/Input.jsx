import { useContext, useEffect } from "react";
import { Context } from "../Context";
import { useNavigate } from "react-router-dom";

export default function Input() {
  const { search, setSearch, setDebounceSearch, handleSearch } =
    useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      setDebounceSearch(search);
    }, 500);

    return () => clearTimeout(timeoutHandler);
  }, [search]);

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      navigate("/myMovie/");
      setSearch(search);
      console.log("searching for", search);
    }
  }

  return (
    <>
      <input
        className="px-4 py-4 w-3/4 rounded-full shadow-sm border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-300 placeholder-gray-500"
        value={search}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Search for a movie"
      />
    </>
  );
}
