import { useState } from "react";
import "./App.css";

function App() {
  const [dark, setDarkMode] = useState(false);

  function handleClick() {
    setDarkMode(!dark);
  }

  return (
    <div className={dark ? "bg-black" : "bg-white"}>
      <h1 className={dark ? "text-white" : "text-black"}>
        {dark ? "Dark Mode" : "Light Mode"}
      </h1>

      <p className={dark ? "text-white" : "text-black"}>
        now : {dark ? "Dark" : "Light"}
      </p>

      <button className={dark ? "btn-dark" : "btn-light"} onClick={handleClick}>
        {dark ? "change to light mode" : "change to dark mode"}
      </button>
    </div>
  );
}

export default App;
