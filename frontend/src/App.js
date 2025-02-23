import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Flashcard from "./components/Flashcard";
import React, { useState, createContext, useEffect } from "react";
import LandingPage from "./components/landingpage";
import Dashboard from "./components/Dashboard";
import TxtEditor from "./components/TxtEditor";
import ReadNotes from "./components/ReadNotes";
import Schedule from   "./components/Schedules";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./config/firebaseconfig"
import Info from "./components/Info";
import Chart from "./components/Chart";

const authContext = createContext();
function App() {

    
    const [token, setToken] = useState(null);
    const [value, setValue] = useState(false);
    const [User, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setValue(true);
          setToken(user.accessToken);
          setUser(user);
        
        } else {
          setValue(false);
          setToken(null);
          setUser(null);
        }
        setIsLoading(false);
      });
  
      // Cleanup the subscription
      return () => unsubscribe();
    }, []);
      

    if (isLoading) {
      return <div style={{ fontFamily:"Montserrat,serif"}}>Loading...</div>; // Show loading indicator
    }

   

  return (

   

    
    <Router> 
        <authContext.Provider value={{ token, setToken, value, setValue, User, setUser }}>
             
             <Routes>
               <Route path='/' element={<LandingPage></LandingPage>}></Route>
               <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
               <Route path='/notes' element={<TxtEditor></TxtEditor>}></Route>
               <Route path='/flashcard'element={<Flashcard></Flashcard>}></Route>
               <Route path='/read'element={<ReadNotes/>}></Route>
               <Route path='/schedule'element={<Schedule/>}></Route>
               <Route path='/info'element={<Info></Info>}></Route>
               







             </Routes>






        </authContext.Provider>





    </Router>
    
  );
}

export default App;
export { authContext };
