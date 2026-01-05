function Navigation({ setShowForm, setshowhome, showhome }) {
  return (
    <header id="navbar">
      <nav id="navi">
        <h1>To Do List</h1>
        <section onClick={() => {
          if(showhome !== "home") alert("Please Login first!");
          else setshowhome("home");
        }}>
          Home
        </section>
        <section onClick={() => { setshowhome(""); setShowForm("signup"); }}>Sign up</section>
        <section onClick={() => { setshowhome(""); setShowForm("login"); }}>Login</section>
      </nav>
    </header>
  );
}
export default Navigation;