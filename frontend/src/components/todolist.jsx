import React,{use, useState} from "react";
import '../CSS/todolist.css';
import { MdCheck, MdOutlineDeleteForever } from "react-icons/md";


function Todolist(){
    const [inputValue,setInputValue]=useState({id:"",content:"",checked:false});

    const [task,setTask]=useState([]);

    const handleInputChange=(value)=>{
        setInputValue({id:Date.now(),content:value,checked:false});


    };


    const handleFormSubmit=(event)=>{
        event.preventDefault();
        const{id,content,checked}=inputValue;

        if(!content) return;

        const ifTaskMatched=task.find((curTask)=>curTask.content===content);
        if(ifTaskMatched)return;

        setTask((prevTask)=>[...prevTask,{id,content,checked}]);
        setInputValue({id:"",content:"",checked:false});


    };
    const handleDelete = (id) => {
        const updatedTask = task.filter((curTask) => curTask.id !== id);
        setTask(updatedTask);
    };

    const deleteAll = () => {
        setTask([]);
    };

    const handleCheck = (id) => {
        const updatedTask = task.map((curTask) => {
            if (curTask.id === id) {
                return { ...curTask, checked: !curTask.checked };
            }
            return curTask;
        });
        setTask(updatedTask);
    };

    return (
        <div className="todocontainer" style={{width: "500px"}}>
            <header>
                <h5>To-do List</h5>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <input
                            type="text"
                            className="todo-input"
                            autoComplete="off"
                            value={inputValue.content}
                            onChange={(event) => handleInputChange(event.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit" className="todo-btn">Add Task</button>
                    </div>
                </form>
            </header>
            <br />
            <div className="mylist">
                <ul>
                    {task.map((curTask) => (
                        <li key={curTask.id} className="todoitem">
                            <span className={curTask.checked ? "checklist" : "notchecklist"}>
                                {curTask.content}
                            </span>
                            <button className="checkbtn" onClick={() => handleCheck(curTask.id)}>
                                <MdCheck />
                            </button>
                            <button
                                className="deletebtn"
                                onClick={() => handleDelete(curTask.id)}
                            >
                                <MdOutlineDeleteForever />
                            </button>
                        </li>
                    ))}
                </ul>
                <button className="clearbtn" onClick={deleteAll}>
                    Clear All
                </button>
            </div>
        </div>
    );
}

export default Todolist;
