import React,{useContext,useEffect} from "react";
import '../CSS/pomodoro.css'
import SetPomodoro from "./SetPomodoro";
import CountdownAnimation from "./CountdownAnimation";
import Button from "./Button";
import { SettingsContext } from "../context/SettingsContext";
function Pomodoro(){
    const {
        pomodoro,
        executing,
        startAnimate,
        children,
        startTimer,
        pauseTimer,
        updateExecute,
        setCurrentTimer,
        SettingsBtn } = useContext(SettingsContext)
    
        useEffect(() => {updateExecute(executing)}, [executing, startAnimate])
    
      return (
        <div className="pomodoro-container">
          <h2>Pomodoro</h2>
          <medium>Be productive the right way.</medium>
          <br />
          <br />
          {pomodoro !== 0 ?
          <>
            <ul className="labels">
              <li>
                <Button 
                  title="Work" 
                  activeClass={executing.active === 'work' ? 'active-label' : undefined} 
                  _callback={() => setCurrentTimer('work')} 
                />
              </li>
              <li>
                <Button 
                  title="Short Break" 
                  activeClass={executing.active === 'short' ? 'active-label' : undefined} 
                  _callback={() => setCurrentTimer('short')} 
                />
              </li>
              <li>
                <Button 
                  title="Long Break" 
                  activeClass={executing.active === 'long' ? 'active-label' : undefined} 
                  _callback={() => setCurrentTimer('long')} 
                />
              </li>
            </ul>
            <Button title="Settings" _callback={SettingsBtn} />
            <br />
            <div className="timer-container">
              <div className="time-wrapper">
                  <CountdownAnimation
                    key={pomodoro} 
                    timer={pomodoro} 
                    animate={startAnimate}
                  >
                    {children}
                  </CountdownAnimation>
              </div>
            </div>
            <div className="button-wrapper">
              <Button title="Start" activeClass={!startAnimate ? 'active' : undefined} _callback={startTimer} />
              <Button title="Pause" activeClass={startAnimate ? 'active' : undefined} _callback={pauseTimer} />
            </div>
          </> : <SetPomodoro />}
        </div>
      )

    
}
export default Pomodoro;