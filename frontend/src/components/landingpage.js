import React from 'react';
import '../style/landingpage.css';

function LandingPage() {
  return (
    <div>
      <div className="main">
        <h1>
            Mind Mapper
          <div className="roller">
            <span id="rolltext">
              Map it<br />
              Do it<br />
              Conquer it <br />
              <span id="spare-time">Try today !</span><br />
            </span>
          </div>
        </h1>
      </div>
      <div className="intro">
     <p><i> Schedule tasks, Make notes, Be more Productive  </i></p>
     <p><i> All in one place </i></p>
      <button className="btn-grad">TRy now</button>
    
     </div>
     <div className="components">
        <div className="element">
            <img src="./todo.avif" alt="" />
            <p>Get Things Done,</p> 
            <p> One Check at a Time!</p>
        </div>
        <div className="element">
            <img src="./notemaking.webp" alt="" />
            <p>Your Thoughts, </p> 
            <p> Organized Effortlessly.</p>
        </div>
        <div className="element">
            <img src="./event.png" alt="" />
            <p>Master Your Schedule,  </p> 
            <p> Own Your Day.</p>
        </div>
        <div className="element">
            <img src="./whiteboard.png" alt="" />
            <p>Imagine It. Draw It. Own It.  </p> 
            
        </div>
     </div>
    </div>
  );
}

export default LandingPage;