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
        <main className="mt-20 bg-[#1E1E1E] text-white">
          <Input />
          <NewMain />
        </main>
      </ContextProvider>
    </>
  );
}

export default App;
