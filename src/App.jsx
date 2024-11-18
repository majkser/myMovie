import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContextProvider from "./Context.jsx";
import Header from "./components/header.jsx";
import Input from "./components/Input.jsx";
import NewMain from "./components/NewMain.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";

function App() {
  return (
    <>
      <Router>
        <ContextProvider>
          <Header />
          <main className="mt-20 bg-[#1E1E1E] text-white">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Input />
                    <NewMain />
                  </>
                }
              />
              <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
          </main>
        </ContextProvider>
      </Router>
    </>
  );
}

export default App;
