
function LogoutButton({ setIsLoggedIn }) {
  return (
    <button onClick={() => setIsLoggedIn(false)}> {}
      Log Out
    </button>
  );
}

export default LogoutButton;
