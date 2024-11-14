import "./App.css";
import ContextProvider from "./components/Context.jsx";
import Header from "./components/header.jsx";
import Main from "./components/Main.jsx";

function App() {
  return (
    <>
      <ContextProvider>
        <Header />
        <Main />
      </ContextProvider>
    </>
  );
}

export default App;
