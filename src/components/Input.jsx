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
      <input
        className="w-3/4 mx-auto block p-4 my-8 rounded-xl placeholder-gray-400"
        value={search}
        onChange={handleSearch}
        type="text"
        placeholder="Search for a movie"
      />
    </>
  );
}
