import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Nav from './pages/Nav.jsx';
import Maincontainer from './pages/maincontainer.jsx';
// import './Css/style.css';
// import Todo from './pages/Todo.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Maincontainer/>
    {/* <Todo/> */}
     </StrictMode>,
)