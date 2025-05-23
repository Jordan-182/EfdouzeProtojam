import { Outlet } from "react-router";
import { ProgressBar } from "./components/ProgressBar";
import "./styles/App.css";

function App() {
  return (
    <>
      <main>
        <Outlet />
        <ProgressBar />
      </main>
    </>
  );
}

export default App;
