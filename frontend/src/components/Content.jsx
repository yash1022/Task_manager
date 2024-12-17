import React from "react";
import '../CSS/content.css';

function Content() {
    return (
        <div>
            <div className="contentcontainer">
                <div className="calender">
                <iframe
                    src="https://calendar.google.com/calendar/embed?src=sudeepti2006%40gmail.com&ctz=Asia%2FKolkata"
                    style={{ border: "0" }}
                    width="300"
                    height="200"
                    frameBorder="0"
                    scrolling="no"
                    title="Google Calendar"
                    float="right"
                ></iframe>
            </div>
            </div>
        </div>
    );
}

export default Content;
