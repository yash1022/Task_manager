import React from "react";
import '../CSS/content.css';

function Content() {
    return (
        <div>
            <div className="contentcontainer">
                <div className="upper-tab">

                      <div className="name">
                        Welcome,John
                      </div>

                      <div className="time">
                        Wednesday,26 jan 2024
                      </div>

                </div>

                <div className="lower-tab1">

                    <div className=" b b1">

                    </div>

                    <div className=" b b2">
                        
                    </div>

                    <div className=" b b3">

                        <div className="calender">
                         <iframe
                           src="https://calendar.google.com/calendar/embed?src=sudeepti2006%40gmail.com&ctz=Asia%2FKolkata"
                           style={{ border: "0" }}
                           width="350"
                           height="300"
                           frameBorder="0"
                           scrolling="no"
                           title="Google Calendar"
                           
                         ></iframe>
                       </div>
                        
                    </div>
                    
                </div>


               
         </div>
    </div>
        
    );
}

export default Content;
