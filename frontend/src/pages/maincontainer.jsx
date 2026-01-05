import { useState } from "react";
import Reglog from './reglog';
import '../Css/style.css';
import Nav from "./Nav";
import Home from "./Home";

const Maincontainer = () => {

  const [showForm, setShowForm] = useState("login");
  const [showhome, setshowhome] = useState("");

  return (
    <>
      <Nav
        setShowForm={setShowForm}
        setshowhome={setshowhome}
      />

      <div id="maincontainer">
       <Reglog
       showForm={showForm}
       showhome={showhome}
       setShowForm={setShowForm}
       setshowhome={setshowhome}
      />

        <Home showhome={showhome} />
      </div>
    </>
  );
};

export default Maincontainer;
