import "./App.css";
import ContextProvider from "./components/Context.jsx";
import Header from "./components/Header";
import Main from "./components/Main";

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
