import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import "../CSS/flashcard.css"
import { useState } from 'react'
import { authContext } from '../App'
import Alert from '@mui/material/Alert';

export default function Flashcard() {
    const [flashcards, setFlashcards] = useState([]);
    const [auxFlashcards, setAuxFlashcards] = useState([]);
    const [newSubject,setnewSubject] = useState('');
    const [question, setQuestion]= useState('');
    const [answer, setAnswer]= useState('');
    const [subjectId,setSubjectId]= useState('');
    const [subjectArray,setSubjectArray]= useState([]);
    const [alert, setalert]=useState(false);
    const Auth =useContext(authContext);

    
    useEffect(()=>{

        getSubjects();
        getflashcards();
    },[])


    const getSubjects=async()=>{
        const response = await fetch(`http://localhost:5000/api/getSubjects/${Auth.User.email}`,{
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }

            

})

        const data = await response.json();

       
        
            setSubjectArray(data.subject);

            
        

      

    }

    const addSubject = async(name)=>{

        

        const response =await fetch(`http://localhost:5000/api/addSubject/${Auth.User.email}`,{

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name})
        })

        const data = await response.json();
           

          
          if(data.subject)
          {
            setSubjectArray(prev=>[...prev, data.subject]);
          }
           
        setnewSubject('');
    

    }
    
    
       const handleInputs=(event)=>{

        if(event.target.name ==='newSubject')
        {
            setnewSubject(event.target.value)
        }

        else if(event.target.name ==='question')
        {
            setQuestion(event.target.value)
        }

        else if(event.target.name ==='answer')
        {
            setAnswer(event.target.value)
        }

        else{
            setSubjectId(event.target.value)
        }

    }


    const createCard = async()=>{
         if(!question ||!answer ||!subjectId)
         { 
             setalert(true);
             setTimeout(() => {
                 setalert(false);
                
             }, 3000);

             return;
         } 

        const response = await fetch(`http://localhost:5000/api/addCard/${Auth.User.email}`,{

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({question, answer, subjectId})
          })

          const data = await response.json();

          if(data.card)
          {
            setFlashcards(prev=>[...prev, data.card]);
            setAuxFlashcards(prev=>[...prev, data.card])
            setQuestion('');
            setAnswer('');
            setSubjectId('');
            
          }
    }


    const getflashcards = async()=>{

        const response = await fetch(`http://localhost:5000/api/getflashcards/${Auth.User.email}`,{
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }

        })

        const data = await response.json();

        setFlashcards(data.flashcards)
        setAuxFlashcards(data.flashcards)




    }

    const findsubject= (id)=>{
        const foundsubject = subjectArray.find(data => data.id === id);
        return foundsubject?.name || "Not found";
    }

    const countcards =(id)=>
    {
        const count = flashcards.filter(data => data.subjectId===id).length;
        return count;
    }

    const filtercards =(id)=>{
        


            const filtered = flashcards.filter(data=> data.subjectId===id)

            if(filtered)
            {
                setAuxFlashcards(filtered);
            }
            
          
        

    }


  return (
    <>

          
         

         

    <Navbar></Navbar>

   

      <div style={{display:"flex",justifyContent:'flex-start', alignItems:'center', width:'200vh',height:'95vh', paddingTop:"35px"}}>
        <Sidebar></Sidebar>

             

          <div className='flash-box' style={{backgroundColor:"#f8f9fa",width:"800px", height:"83vh", borderRadius:"15px", marginLeft:'300px',boxShadow:"0 4px 6px rgba(0, 0, 0, 0.1)", overflowY:'scroll'}}>
          {alert && (
                  <Alert variant="filled" severity="error">
                      All fields are required
                  </Alert>
              )}   
          <div className='flashcard-grid'>

          { auxFlashcards.map((data)=>(
            
            <div class="flip-card" key={data.id}>
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <p class="title">{data.question}</p>
                        <p style={{marginTop:'5px', fontFamily:"Montserrat,serif"}}>{findsubject(data.subjectId)}</p>
                       
                    </div>
                    <div class="flip-card-back">
                        <p class="title">{data.answer}</p>
                        
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
                    

                      <div className="inputGroup">
                          <input className='in' autocomplete="off" required="" name='question'value={question} type="text" placeholder='Question' onChange={(e)=>handleInputs(e)}/>
                             
                      </div>

                      <div className="inputGroup">
                          <input className='in' autocomplete="off" required="" name='answer' value={answer} type="text" placeholder='Answer' onChange={(e)=>handleInputs(e)}/>
                             
                      </div>


                      
                      <div className="inputGroup">
                          <select className='in' autocomplete="off" required="" name='subject' value={subjectId} type="text" placeholder='Subject' onChange={(e)=>handleInputs(e)}>
                            
                            <option value="">Select Subject</option>
                            {subjectArray.map((data) => (
                              <option  value={data.id}>
                                {data.name}
                              </option>
                            ))}

                            </select>

                            
                            
                            
                            
                             
                      </div>

                      <button className='create-btn' onClick={()=>createCard()}>
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


                 <div className='subjects' style={{borderRadius:'15px', width:'400px', height:'313px',backgroundColor:"#f8f9fa", boxShadow:"0 4px 6px rgba(0, 0, 0, 0.1)", marginTop:'14px', paddingTop:'10px', textAlign:'center',overflowY:'scroll' }}>
                 <h3 style={{fontSize:'25px', fontWeight:'600', marginBottom:'10px', marginLeft:'10px',fontFamily:"Montserrat,serif"}}>Subjects</h3>
                 
                 <div className='addsub' style={{display:'flex',justifyContent:'flex-start', gap:'40px'}}>

                 <div class="inputGroup" style={{marginLeft:'10px'}}>
                          <input className='in'  required="" type="text" name='newSubject' value={newSubject}  placeholder='Subject' onChange={(e)=>handleInputs(e)}/>
                             
                </div>
                <button className='create-btn' onClick={()=>addSubject(newSubject)}>
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
                              ADD
                          </span>
                      </button>

                 </div>
                

                      <div  style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop:'15px'}}>
                          {subjectArray?.map((data, index) => (
                              <div onClick={()=>filtercards(data.id)}
                                  key={data.id}
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
                                  <p style={{ fontSize: '18px', fontWeight: '500', margin: '0', fontFamily:"Montserrat,serif" }}>{data?.name}</p>
                                  <p style={{ fontSize: '14px', color: '#6c757d', marginLeft:'4px',fontFamily:"Montserrat,serif" }}>
                                    &bull;Cards {countcards(data.id)}
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
