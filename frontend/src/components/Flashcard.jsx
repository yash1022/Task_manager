import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import "../CSS/flashcard.css"
import { useState } from 'react'

export default function Flashcard() {
    const [flashcards, setFlashcards] = useState([
        { id: 1, title: 'What are the usecases of react?', content: 'React is a JavaScript library for building user interfaces.', subject: 'Web Development' },
        { id: 2, title: 'Node.js', content: 'Node.js is a runtime environment for executing JavaScript on the server.', subject: 'Backend Development' },
        { id: 3, title: 'MySQL', content: 'MySQL is a relational database management system.', subject: 'Database' },
        { id: 4, title: 'CSS Grid', content: 'CSS Grid is used to create complex layouts easily.', subject: 'Web Design' },
        { id: 5, title: 'JavaScript', content: 'JavaScript is a programming language for the web.', subject: 'Programming' },
        { id: 6, title: 'Python', content: 'Python is a versatile programming language popular in data science.', subject: 'Programming' },
        { id: 7, title: 'Bootstrap', content: 'Bootstrap is a CSS framework for responsive web design.', subject: 'Web Design' },
        { id: 8, title: 'Express.js', content: 'Express.js is a web application framework for Node.js.', subject: 'Backend Development' },
        { id: 9, title: 'MongoDB', content: 'MongoDB is a NoSQL database used for scalable applications.', subject: 'Database' },
        { id: 10, title: 'REST APIs', content: 'REST APIs enable communication between systems using HTTP methods.', subject: 'Backend Development' },
        { id: 11, title: 'Git', content: 'Git is a version control system for tracking changes in code.', subject: 'Version Control' },
        { id: 12, title: 'Agile', content: 'Agile is a project management methodology for iterative development.', subject: 'Project Management' },
        { id: 13, title: 'Machine Learning', content: 'Machine learning is a subset of AI that enables systems to learn from data.', subject: 'AI' },
        { id: 14, title: 'Docker', content: 'Docker is a platform to develop, ship, and run applications in containers.', subject: 'DevOps' },
        { id: 15, title: 'TypeScript', content: 'TypeScript is a superset of JavaScript that adds static typing.', subject: 'Programming' },
    ]);

    const subjects = [
        { name: 'Web Development', count: 3 },
        { name: 'Backend Development', count: 2 },
        { name: 'Database', count: 2 },
        { name: 'AI', count: 1 },
        { name: 'DevOps', count: 1 },
      ];
  return (
    <>

    <Navbar></Navbar>

      <div style={{display:"flex",justifyContent:'flex-start', alignItems:'center', width:'200vh',height:'95vh', paddingTop:"35px"}}>
        <Sidebar></Sidebar>

          <div className='flash-box' style={{backgroundColor:"#f8f9fa",width:"800px", height:"83vh", borderRadius:"15px", marginLeft:'300px',boxShadow:"0 4px 6px rgba(0, 0, 0, 0.1)", overflowY:'scroll'}}>
          <div className='flashcard-grid'>

          { flashcards.map((flashcards)=>(
            
            <div class="flip-card" key={flashcards.id}>
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <p class="title">{flashcards.title}</p>
                        <p style={{marginTop:'5px'}}>{flashcards.subject}</p>
                       
                    </div>
                    <div class="flip-card-back">
                        <p class="title">{flashcards.content}</p>
                        
                    </div>
                </div>
            </div>
          

            



        ))
        
    }






          </div>
           

        </div>


          <div  style={{ width:"400px", height:"83vh", paddingLeft:"15px"}}>
                 <div className='create-card' style={{borderRadius:'15px', width:'400px', height:'270px', backgroundColor:"#f8f9fa",boxShadow:"0 4px 6px rgba(0, 0, 0, 0.1)",paddingTop:'10px', textAlign:'center', paddingLeft:'5px', paddingRight:'5px'}}>
                    <h3 style={{fontSize:'25px', fontWeight:'600', marginBottom:'10px', marginLeft:'10px',fontFamily:"Montserrat,serif"}}>Create Card</h3>
                    

                      <div class="inputGroup">
                          <input autocomplete="off" required="" type="text" placeholder='Question'/>
                             
                      </div>

                      <div class="inputGroup">
                          <input autocomplete="off" required="" type="text" placeholder='Answer'/>
                             
                      </div>


                      
                      <div class="inputGroup">
                          <input autocomplete="off" required="" type="text" placeholder='Subject'/>
                             
                      </div>

                      <button className='create-btn'>
                          <span>
                              <svg
                                  height="24"
                                  width="24"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                              >
                                  <path d="M0 0h24v24H0z" fill="none"></path>
                                  <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
                              </svg>
                              Create
                          </span>
                      </button>




                 </div>


                 <div className='subjects' style={{borderRadius:'15px', width:'400px', height:'313px',backgroundColor:"#f8f9fa", boxShadow:"0 4px 6px rgba(0, 0, 0, 0.1)", marginTop:'14px', paddingTop:'10px', textAlign:'center', overflowY:'scroll'}}>
                 <h3 style={{fontSize:'25px', fontWeight:'600', marginBottom:'10px', marginLeft:'10px',fontFamily:"Montserrat,serif"}}>Subjects</h3>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                          {subjects.map((subject, index) => (
                              <div
                                  key={index}
                                  style={{
                                      display: 'flex',
                                      
                                      alignItems: 'center',
                                      justifyContent:'flex-start',
                                      width: '90%', // Long width
                                      height: '40px', // Less height
                                      margin: '0 auto', // Center the cards
                                      backgroundColor: '#ffffff',
                                      borderRadius: '15px',
                                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                      padding: '10px',
                                      
                                  }}
                              >
                                  <p style={{ fontSize: '18px', fontWeight: '500', margin: '0', fontFamily:"Montserrat,serif" }}>{subject.name}</p>
                                  <p style={{ fontSize: '14px', color: '#6c757d', marginLeft:'4px',fontFamily:"Montserrat,serif" }}>
                                    &bull;Cards {subject.count}
                                  </p>
                                 
                              </div>
                          ))}
                      </div>
                  </div>




          </div>





      
      </div>
    
    
    
    
    
    </>
   
  )
}
