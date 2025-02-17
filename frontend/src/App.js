import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Flashcard from "./components/Flashcard";
import React, { useState, createContext } from "react";
import LandingPage from "./components/landingpage";
import Dashboard from "./components/Dashboard";
import TxtEditor from "./components/TxtEditor";
import ReadNotes from "./components/ReadNotes";

const authContext = createContext();
function App() {

    
    const [token, setToken] = useState(null);
    const [value, setValue] = useState(false);
    const [User, setUser] = useState(null);

  return (
    <Router> 
        <authContext.Provider value={{ token, setToken, value, setValue, User, setUser }}>
             
             <Routes>
               <Route path='/' element={<LandingPage></LandingPage>}></Route>
               <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
               <Route path='/notes' element={<TxtEditor></TxtEditor>}></Route>
               <Route path='/flashcard'element={<Flashcard></Flashcard>}></Route>
               <Route path='/read'element={<ReadNotes/>}></Route>
               




             </Routes>






        </authContext.Provider>





    </Router>
    
  );
}

export default App;
export { authContext };
