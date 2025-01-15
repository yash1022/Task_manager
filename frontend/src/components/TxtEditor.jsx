import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../CSS/txtEditor.css'

export default function TxtEditor() {
	const editorRef = useRef(null); // Create a reference for the editor container
	const [Title,SetTitle]=useState('');
	const [Content,Setcontent]= useState('');
	const quillRef =useRef(null);
	const recentNotes = [
		{ title: 'First Note', dateCreated: '2025-01-15' },
		{ title: 'Second Note', dateCreated: '2025-01-14' },
	  ];

	const handleSave=()=>{
          const content= quillRef.current.getContents();
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
		  placeholder: 'Write some notes',
		  theme: 'bubble',
		});
		quillRef.current =quill;
	  }
	}, []);
  
	return (
		<>
		<Navbar></Navbar>
		<div className='main-box'>
			<div className='side-bar'>
			<Sidebar></Sidebar>
			</div>
             
			 <div style={{ height:'82vh',width:'860px',marginLeft:'280px',backgroundColor:"#f8f9fa",paddingLeft:'10px', paddingTop:'10px', paddingRight:'10px',borderRadius:'15px',boxShadow:'0 4px 6px rgba(0, 0, 0, 0.1)'}}>
			 
			       <input type="text" autocomplete="off" name="text" class="input" placeholder="Title" value={Title} onChange={(e)=>SetTitle(e.target.value)}/>

		           <div id="editor" ref={editorRef} style={{height:'500px'}}></div>

				   <button className='save-btn' onClick={handleSave}>Save</button>
				   <button className='save-btn' onClick={handleDelete}>Clear</button>
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
      {/* Example cards */}
      {recentNotes.map((note, index) => (
        // <div key={index} style={{
        //   border: '1px solid #ccc',
        //   borderRadius: '8px',
        //   padding: '10px',
        //   marginBottom: '10px',
        //   backgroundColor: '#fff',
        //   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
		//   marginTop: '10px'
        // }}>
        //   <h4 style={{ margin: '0 0 5px', fontSize: '16px' }}>{note.title}</h4>
        //   <p style={{ margin: 0, fontSize: '12px', color: '#6c757d' }}>
        //     {note.dateCreated}
        //   </p>
        // </div>


		<div class="card">
    <h3 class="card__title">Title
    </h3>
    <p class="card__content">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
    <div class="card__date">
        April 15, 2022
    </div>
    <div class="card__arrow">
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










  




