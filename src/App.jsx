
import Footer from "./Footer/Footer.jsx";

import { Routes,Route, Outlet } from "react-router-dom";



import Header from "./Header/Header.jsx";

function App() {

      
    
  

  return (
<>
<Header></Header>
<Outlet/>
<Footer></Footer>
</>
  );
}

export default App;
