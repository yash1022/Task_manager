import React, { useContext, useEffect } from 'react'
import "../CSS/eventpopup.css"
import { PopContext } from './Content'
import { authContext } from '../App';

export  function Taskpopup({onclose}) {
  const taskData = useContext(PopContext);
  const Auth= useContext(authContext)
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    taskData.setInputValue((prevData) => ({
      ...prevData,
      [name]: value,
      // id:prevData.id || Date.now(), 
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    
    

    // taskData.setTask((prevTasks) => [...prevTasks, taskData.inputValue]);

    try
    {
      const response=await fetch('http://localhost:5000/api/events',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },

        body: JSON.stringify({
          tasks:taskData.inputValue,
          userEmail:Auth.User.email
        })
       })

      if(response.ok)
      {
        
      }

       

    }
    catch(err)
    {
      console.log(err);
    }
    
      taskData.setInputValue({
        // id: "",
        content: "",
        checked: false,
        startDate: "",
        endDate: "",
        description:"",
        priority: "Low",
      });
      taskData.update?(taskData.setUpdate(false)):(taskData.setUpdate(true));
    onclose();
    
  };




 

  return (
    <div className='popupbox' style={{height:"265px", width:"370px"}}>
        <div className='heading'>
            Add Task
        </div>
        <div className="formcontainer">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="taskName">Task Name:</label>
            <input
              type="text"
              id="taskName"
              name="content"
              value={taskData.inputValue.content}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={taskData.inputValue.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={taskData.inputValue.endDate}
              onChange={handleChange}
              required
            />
          </div>


          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={taskData.inputValue.description}
              onChange={handleChange}
              
            />
          </div>


          

          <div className="form-group">
            <label htmlFor="priority">Priority:</label>
            <select
              id="priority"
              name="priority"
              value={taskData.inputValue.priority}
              onChange={handleChange}
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className='btn'>Save Task</button>
            <button type="button" onClick={onclose} className='btn'>
              Cancel
            </button>
          </div>
        </form>
        </div>
    </div>
  )
}
