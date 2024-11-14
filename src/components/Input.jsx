import { useContext } from "react";
import { Context } from "./Context";

export default function Input() {
  const { search, handleSearch } = useContext(Context);

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
