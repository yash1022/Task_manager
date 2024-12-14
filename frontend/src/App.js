import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import React, { useState, createContext } from "react";
import LandingPage from "./components/landingpage";

const authContext = createContext();
function App() {

    
    const [token, setToken] = useState(null);
    const [value, setValue] = useState(false);
    const [User, setUser] = useState(null);

  return (
    <Router> 
        <authContext.Provider value={{ token, setToken, value, setValue, User, setUser }}>
           <Navbar></Navbar>
             <Routes>
               <Route path='/' element={<LandingPage></LandingPage>}> </Route>




             </Routes>






        </authContext.Provider>





    </Router>
    
  );
}

export default App;
export { authContext };
