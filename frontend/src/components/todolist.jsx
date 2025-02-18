import React,{use, useState} from "react";
import '../CSS/todolist.css';
import { MdCheck, MdOutlineDeleteForever } from "react-icons/md";

import { IoMdAddCircleOutline } from "react-icons/io";


function Todolist(){
    const [inputValue,setInputValue]=useState({id:"",content:"",checked:false});

    const [task,setTask]=useState([]);
    const [categories, setCategories] = useState(["All","Work", "Personal", "School"]);
    const [activeCategory, setActiveCategory] = useState("");

    const addCategory = () => {
        const newCategory = prompt("Enter new category name:");
        if (newCategory && !categories.includes(newCategory.trim())) {
          setCategories([...categories, newCategory.trim()]);
        } else if (categories.includes(newCategory.trim())) {
          alert("Category already exists!");
        }
      };
    
      // Handle category click
      const handleCategoryClick = (category) => {
        setActiveCategory(category);
        console.log(`Selected category: ${category}`);
        // You can add more functionality here, like filtering tasks by category
      };

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
           
              <h5>TO-DO LIST </h5>

              <div className="categories" style={{width:'100%',display: "flex", alignItems: "center", gap: "10px", marginTop: "10px", overflowX:'scroll' }}>
        {/* Add Category Button */}

        <IoMdAddCircleOutline onClick={addCategory} size={30} color="gray" />
       


        {/* Categories */}
        <div style={{ display: "flex", gap: "15px" }}>
          {categories.map((category, index) => (
            <span
              key={index}
              onClick={() => handleCategoryClick(category)}
              style={{
                padding: "5px 10px",
                border: "1px solid #ccc",
                borderRadius: "15px",
                cursor: "pointer",
                backgroundColor: activeCategory === category ? "#007bff" : "transparent",
                color: activeCategory === category ? "#fff" : "#000",
              }}
            >
              {category}
            </span>
          ))}
        </div>
      </div>

              





        </div>
    );
}

export default Todolist;



 {/* <header>
                <h5>To-do List</h5>
                
                    <div>
                        <button type="submit" className="todo-btn">Add Task</button>
                    </div>
                
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
            </div> */}
