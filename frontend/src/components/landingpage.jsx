import React from 'react';
import '../CSS/landingpage.css';

function LandingPage() {
  return (
    <div>
      <div className="main">
        <h1>
            Mind <span id="map">Mapper</span>
          <div className="roller">
            <span id="rolltext">
              Map it<br />
              Do it<br />
              Conquer it <br />
            </span>
          </div>
        </h1>
      </div>
      <div className="intro">
     <p>Schedule tasks, Make notes, Be more Productive</p>
     <p> All in one place</p>
     <button class="button type1">
  <span class="btn-txt">Get Started</span>
</button>
    
     </div>
     {/* <div className="components">
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
     </div> */}

  <div className="components">
     <div class="card">
        <img src="./todo.avif" alt="" />
        <p className='words'>Get Things Done,</p>
        <p className='words'> One Check at a Time!</p>
    </div>
     <div class="card">

     <img src="./notemaking.webp" alt="" />
            <p className='words'>Your Thoughts, </p> 
            <p className='words'> Organized Effortlessly.</p>


     </div>
     <div class="card">

     <img src="./event.png" alt="" />
            <p className='words'>Master Your Schedule,  </p> 
            <p className='words'> Own Your Day.</p>



     </div>
     <div class="card">
        
     <img src="./whiteboard.png" alt="" />
     <p className='words'>Imagine It. Draw It. Own It.  </p> 


     </div>
  </div>

  <div class="f-1">

    



  </div>


    </div>
  );
}

export default LandingPage;