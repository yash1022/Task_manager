import { useContext } from 'react'
import {CountdownCircleTimer} from 'react-countdown-circle-timer'
import { SettingsContext } from '../context/SettingsContext'


 function notifyUser (notificationText="Time is up"){
  
  if(!("Notification" in window)){
    alert("Browser does not support notifications");

  }
  else if(Notification.permission==="granted"){
    const notification=new Notification(notificationText);
    
  }
  else if(Notification.permission!=="denied"){
    Notification.requestPermission().then((permission)=>{
      if(permission==="granted"){
        const notification=new Notification(notificationText);

      }
    })
  }
  let originalTitle = document.title;
  let flashInterval = setInterval(() => {
    document.title = document.title === "⏳ Time is up!" ? originalTitle : "⏳ Time is up!";
  }, 1000);

  // Stop flashing when user comes back
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      clearInterval(flashInterval);
      document.title = originalTitle;
    }
  });
  let audio = new Audio("./alarm.wav"); // Use a valid alarm sound URL
  audio.play();
}
 
const CountdownAnimation = ({key, timer, animate, children}) => {

  const { stopAimate } = useContext(SettingsContext)

    return (
      <CountdownCircleTimer
        key={key}
        isPlaying={animate}
        duration={timer * 60}
        colors={[
          ['14b0bf', 0.33],
          ['14b0bf', 0.33],
          ['14b0bf', 0.33],
        ]}
        strokeWidth={6}
        size={200}
        trailColor="powderblue"
        onComplete={ () => {
          stopAimate()
          notifyUser();
        }}

        
        
      >
        
        {children}
      </CountdownCircleTimer>
    )
}

export default CountdownAnimation