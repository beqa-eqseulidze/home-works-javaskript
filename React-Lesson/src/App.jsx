import { useState } from "react";
import "./App.css";
import LogoutButton from "./components/buttons/LogoutButton.jsx";
import Users from "./components/list/Users.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userName = "Kaxa";

  return (
    <>
      {isLoggedIn ? (
        <div className="flex">
          <h1>გამარჯობა {userName}</h1>
          <LogoutButton setIsLoggedIn={setIsLoggedIn} />
        </div>
      ) : (
        <button onClick={() => setIsLoggedIn(true)}>Log In</button>
      )}
      <Users/>
    </>
  );
}

export default App;
