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
    <div className="para">Got a mountain of tasks to conquer?
      <p> Say goodbye to chaos and hello to productivity  with your personalized  <span className="map2">to-do list!</span></p>
       Organize your day, prioritize what matters, and tackle your goals with ease.</div>
<div className="img1"><img src="./todo3.jpg" alt="" /></div>
    



  </div>

  <div class="f-2">
    <div className="img2"><img src="./note.jpg" alt="" /></div>

    <div className="para2">Too many ideas slipping away?
      <p>Stay organized and capture every thought with smart <br />  <span className="map2">note-making!</span></p>
      Jot down ideas, keep track of details, and organize your notes effortlessly</div>
    



  </div>
  <div class="f-1">
    <div className="para">Struggling to manage your time? 
      <p> With our smart  <span className="map2">Schedules</span></p>
      planning your day has never been easier! Organize tasks, set priorities, and stay on track effortlessly. 
      </div>
<div className="img1"><img src="./schedule.jpg" alt="" /></div>
    



  </div>
    </div>
  );
}

export default LandingPage;