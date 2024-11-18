import { useContext, useEffect } from "react";
import { Context } from "../Context";

export default function Input() {
  const { search, setDebounceSearch, handleSearch } = useContext(Context);

  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      setDebounceSearch(search);
    }, 500);

    return () => clearTimeout(timeoutHandler);
  }, [search]);

  return (
    <>
      <div className="bg-[#1E1E1E] flex justify-center pt-20 pb-5">
        <input
          className="w-3/4 max-w-xl px-4 py-4 rounded-full shadow-sm border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-300 placeholder-gray-500"
          value={search}
          onChange={handleSearch}
          type="text"
          placeholder="Search for a movie"
        />
      </div>
    </>
  );
}
