import React, {useContext, useState} from 'react'
import '../CSS/taskpopup.css';
import { authContext } from '../App';
import { TaskContext } from './Content';



export default function EventPopup() {
  const [taskName, setTaskName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const Auth = useContext(authContext)
  const {TaskPopup, SetTaskPopup, activeCategory,setActiveCategory} = useContext(TaskContext)

  const handleCreate = async() => {

       if(!taskName || !startDate || !endDate)
       {
         alert("Please fill all fields")
         return;
         
       }

       if(!activeCategory)
       {
         alert("Please select a category")
         return;
       }
    try
    {
      const response = await fetch(`http://localhost:5000/api/saveTask/${Auth.User.email}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: taskName, startDate: startDate, endDate: endDate, category:activeCategory}),
      })

      const data = await response.json();

      alert(data.message)


      if(response.ok)
      {
        setTaskName('')
        setStartDate('');
        setEndDate('');

        handleCancel();
      
      }



    }
    catch(e)
    {
      console.error("Error saving task", e)
    }


   
  };


  const handleCancel = () => {
    SetTaskPopup(false);
    setTaskName('');
    setStartDate('');
    setEndDate('');

   
  };

  return (
    <div>

      <div className='popupbox' style={{height:"265px", width:"370px", padding:'20px'}}>
      <div className='heading'>
            Add Task
        </div>

        <form>
          <div>
            <label>Task Name:</label>
            <input 
              type='text' 
              value={taskName} 
              onChange={(e) => setTaskName(e.target.value)} 
              required 
              style={{ width: '100%', padding: '8px', margin: '5px 0' }}
            />
          </div>

          <div>
            <label>Start Date:</label>
            <input 
              type='date' 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
              required 
              style={{ width: '100%', padding: '8px', margin: '5px 0' }}
            />
          </div>

          <div>
            <label>End Date:</label>
            <input 
              type='date' 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
              required 
              style={{ width: '100%', padding: '8px', margin: '5px 0' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
            <button type='button' onClick={handleCreate} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Create
            </button>
            <button type='button' onClick={handleCancel} style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </form>


      </div>

            
      
    </div>
  )
}
