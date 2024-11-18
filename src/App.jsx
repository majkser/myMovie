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
        <Input />
        <NewMain />
      </ContextProvider>
    </>
  );
}

export default App;
