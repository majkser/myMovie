import "./App.css";
import ContextProvider from "./Context.jsx";
import Header from "./components/header.jsx";
import Input from "./components/Input.jsx";
import NewMain from "./components/NewMain.jsx";

function App() {
  return (
    <>
      <ContextProvider>
        <Header />
        <main className="mt-20 bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white">
          <Input />
          <NewMain />
        </main>
      </ContextProvider>
    </>
  );
}

export default App;
