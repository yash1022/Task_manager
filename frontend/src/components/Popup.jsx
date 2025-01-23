import React, { useContext } from 'react'
import "../CSS/taskpopup.css"
import { PopContext } from './Content'

export  function Taskpopup({onclose}) {
  const taskData = useContext(PopContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    taskData.setInputValue((prevData) => ({
      ...prevData,
      [name]: value,
      id:prevData.id || Date.now(), 
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    

    taskData.setTask((prevTasks) => [...prevTasks, taskData.inputValue]);

    taskData.setInputValue({
      id: "",
      content: "",
      checked: false,
      startDate: "",
      endDate: "",
      priority: "Low",
    });

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
