import Main from "./Main.jsx";
import BaseFilms from "./BaseFilms.jsx";
import { Context } from "../Context.jsx";
import { useContext } from "react";

export default function NewMain() {
  const { search } = useContext(Context);

  return (
    <>
      <div className="bg-inherit h-screen">
        {search.length > 2 ? <Main /> : <BaseFilms />}
      </div>
    </>
  );
}
