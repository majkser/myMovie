import { useEffect } from "react";

export default function Input({ search, handleSearch }) {
  return (
    <>
      <input
        className="w-3/4 mx-auto block p-4 my-8 rounded-xl"
        value={search}
        onChange={handleSearch}
        type="text"
      />
    </>
  );
}
