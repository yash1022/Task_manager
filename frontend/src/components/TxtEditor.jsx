import React, { useContext, useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../CSS/txtEditor.css'
import { authContext } from '../App';
import { MdCheck, MdOutlineDeleteForever } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


export default function TxtEditor() {
	const editorRef = useRef(null); // Create a reference for the editor container
	const [Title,SetTitle]=useState('');
  const [Notes, setNotes]=useState([]);
  const[trigger,setTrigger]=useState(false);
	const quillRef =useRef(null);
  const Auth= useContext(authContext)
  const nav= useNavigate();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options); // 'en-GB' is used for the format "day month year"
  };
	

	const handleSave= async(id)=>{
    try{
          const content= quillRef.current.getText();

          const data =
          { title:Title,
            content: JSON.stringify(content),
            email: id
          }

          const response= fetch('http://localhost:5000/api/saveNotes',{
             method: 'POST',
             headers:{
               'Content-Type':'application/json'
             },
             body:JSON.stringify(data)
          })
          const result=await response.json();

          if(response.ok && result.success){
            setNotes((prevNotes)=>[{
              id:result.note.id,
              title:Title,
              content:content,
  
            },
          ...prevNotes,
        ])
            SetTitle('');
            handleDelete();
          }
          else{
            alert('Failed to save note');
          }
        }
        catch(error){
          console.error("error saving note:",error);
          
        }
        
        
         

          // setTrigger(!trigger);


          // if(response)
          // {
           
          //   SetTitle('');
          //   handleDelete();
          // }


          // setTrigger(!trigger);
          

	}
  

	const handleDelete=()=>{
		quillRef.current.setText('');
	}

useEffect(() => {
	  if (editorRef.current) {
		const quill = new Quill(editorRef.current, {
		  debug: 'info',
		  modules: {
			toolbar: false,
		  },
		  placeholder: 'Write your notes',
		  theme: 'bubble',
		});
		quillRef.current =quill;
	  }



    getNotes();
    


	}, [trigger]);

 const getNotes= async()=>{
    const response= await fetch(`http://localhost:5000/api/getNotes/${Auth.User.email}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json'
      }

      

    })

    const data= await response.json();

    if(data.success)
    {
     
      setNotes(data.notes);
    }

    else
    {
      alert(data.message);
    }

  }

  const deleteNotes= async(id)=>{
              const response = await fetch(`http://localhost:5000/api/deleteNote/${Auth.User.email}/${id}`,{
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json',
                        },

                       
                    })

                    const data= await response.json();

                    if(data.success)
                      {
                         
                          getNotes();
  
                      }


                      else
                      {
                        alert('Failed to delete note');
                      }
  }
  
	return (
		<>
		<Navbar></Navbar>
		<div className='main-box'>
			<div>
			<Sidebar></Sidebar>
			</div>
             
			 <div style={{ height:'82vh',width:'860px',marginLeft:'280px',backgroundColor:"#f8f9fa",paddingLeft:'10px', paddingTop:'10px', paddingRight:'10px',borderRadius:'15px',boxShadow:'0 4px 6px rgba(0, 0, 0, 0.1)'}}>
			 
			       <input type="text" autocomplete="off" name="text" class="input" placeholder="Title" value={Title} onChange={(e)=>SetTitle(e.target.value)}/>

		           <div id="editor" ref={editorRef} style={{height:'500px'}}></div>

				   <button className='save' onClick={()=>handleSave(Auth.User.email)}>Save</button>
				   <button className='save' onClick={handleDelete}>Clear</button>
	         </div>


	<div className = 'recent' style={{
    height: '80vh',
    width: '350px',
    backgroundColor: "#f8f9fa",
    padding: '10px',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
	
  }}>
    <h3 style={{
      fontSize: '25px',
      fontWeight: '600',
      marginBottom: '3px',
      textAlign: 'center',
	  fontFamily:"Montserrat,serif"
    }}>
      Recents
    </h3>
	<hr/>
    <div style={{
      flex: '1',
      overflowY: 'auto',
    }}>
      
      { Notes.map((note) => (
      


		<div class="card" key={note.id}>
      <div style={{marginLeft:'280px',display:'flex', justifyContent:'center',width:'30px'}} >
      <button className="deletebtn" onClick={()=>deleteNotes(note.id)}>
            <MdOutlineDeleteForever />
       </button>
      </div>
       
    <h3 class="card__title" style={{marginTop:'-30px'}}>{note.title}
    </h3>
    
    <p class="card__content">{note.content.substring(0,35)}...</p>
    <div class="card__date">
        {formatDate(note.created_at)}
    </div>
    
          
    <div class="card__arrow" onClick={()=>nav('/read',{state:{id:note.id,title:note.title,content:note.content,date:formatDate(note.created_at)}})}>
           
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15" width="15">
            <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"></path>
        </svg>

       
    </div>
    
</div>
      ))}
    </div>
  </div>

</div>


	

		
		
	
	
	
	  

	  </>
	);
  }










  




