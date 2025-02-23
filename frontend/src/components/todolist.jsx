import React,{ useContext, useState, useEffect, useRef} from "react";
import '../CSS/todolist.css';
import { MdCheck, MdOutlineDeleteForever } from "react-icons/md";

import { IoMdAddCircleOutline } from "react-icons/io";
import { authContext } from "../App";
import { MdOutlinePlaylistAddCircle } from "react-icons/md";

import { TaskContext } from "./Content";
import { useNavigate } from "react-router-dom";


function Todolist(){
    const Popup= useContext(TaskContext)
   
    const [categories, setCategories] = useState([]);
    const [task,setTask]=useState([]);
    const [Auxiliary, setAuxiliary] = useState([]);
    const [Done,setDone]=useState([]);
    const Auth= useContext(authContext);
    const nav= useNavigate()
    const timeouts = useRef({})
 



    

    useEffect(()=>{
        getCategory();
        fetchTasks();
    },[])

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
      };
    
    const addCategory = async () => {
        const newCategory = prompt("Enter new category name:");
        

        if(newCategory)
        {
           

            try{
               const response= await fetch(`http://localhost:5000/api/saveCategory/${Auth.User.email}`,{

                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({category:newCategory}),

                })

                const data = await response.json();

               

                if(response.ok)
                {
                    getCategory()
                }
               
            }
            catch(err){
                console.error(err);
            }
        }
      };

    const getCategory= async()=>{

             try{
                const response= await fetch(`http://localhost:5000/api/getCategory/${Auth.User.email}`,{

                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },



                })

                const data = await response.json();

                setCategories(data);
               
            }
            catch(err)
            {
                console.error(err);
            }
            



    }
   
    const fetchTasks = async()=>{

       

        try{

            const response= await fetch(`http://localhost:5000/api/getTasks/${Auth.User.email}`,{


                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                })


                const data = await response.json();

                if(data.message)
                {
                    alert(data.message);
                    return;
                }

                
                setTask(data);
                setAuxiliary(data);
                
}
catch(e)
{
    console.error(e);
}


    };

   const handleCategoryClick = (category) => {
        Popup.setActiveCategory(category.name);
        

        const newData= task.filter((x)=>x.categoryId===category.id)

        setAuxiliary(newData);


       
       
    };

    const handleCheck = async (id) => {

        

        const updatedAux = Auxiliary.map(task=> task.id===id ? {... task, status: !task.status}:task)
        setAuxiliary(updatedAux);


        const updateTask = task.map(x=> x.id===id?{...x,status:!x.status}:x)
        setTask(updateTask);

        if(timeouts.current[id])
        {
            clearTimeout(timeouts.current[id]);
        }

        



      timeouts.current[id]=setTimeout(async () => {

            try{

                const response = await fetch(`http://localhost:5000/api/updateStatus/${id}`,{
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({status:task.find(data=>data.id===id).status}),

                })

                if(response.ok)
                {
                    alert("DATABASE UPDATED");
                }

                const data= await response.json();

              
                }
            catch(e)
            {
                console.error(e);
            }finally
            {
                delete timeouts.current[id];
            }
            


            
        }, 10*1000);


        



       


       

    
    };

    const handleDelete = async(id)=>{

       

        try
        {

            const response= await fetch(`http://localhost:5000/api/deleteTask/${id}`,{

                method:'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },

                

        })

        if(response.ok)
        {
            alert("Task deleted successfully");
            const updatedAux = Auxiliary.filter(x=>x.id!==id)
             setAuxiliary(updatedAux);

           const updatedTask = task.filter(x=>x.id!==id)
           setTask(updatedTask);
        }






        }
        catch(e)
        {
            console.log(e);
        }







    }

    return (
        <div className="todocontainer" style={{width: "500px"}}>
           
              <h5>Tasks</h5>

              <div className="categories" style={{width:'100%',display: "flex", alignItems: "center", gap: "10px", marginTop: "10px", overflowX:'scroll', justifyContent:'flex-start' }}>
        {/* Add Category Button */}

        <IoMdAddCircleOutline onClick={addCategory} size={30} color="gray"
         style={{ flexShrink: 0 }}/>

         <button
            style={{
                padding: "5px 10px",
                border: "1px solid #ccc",
                borderRadius: "15px",
                cursor: "pointer",
                fontFamily:"Montserrat,serif"
               
              }}

              onClick={()=>setAuxiliary(task)}



         
         
         
         
         >All</button>
       


        {/* Categories */}
        <div style={{ display: "flex", gap: "15px" }}>
          {categories?.map((category) => (
            <span
            //   key={}
              onClick={() => handleCategoryClick(category)}
              style={{
                padding: "5px 10px",
                border: "1px solid #ccc",
                borderRadius: "15px",
                cursor: "pointer",
                backgroundColor: Popup.activeCategory === category.name ? "#007bff" : "transparent",
                color: Popup.activeCategory ===category.name ? "#fff" : "#000",
                fontFamily:"Montserrat,serif",
                fontSize:'13px'
                
              }}
            >
              {category.name}

            </span>
          ))}
        </div>

           
      </div>

      <div style={{marginLeft:'-456px', marginTop:'10px'}}>

      <MdOutlinePlaylistAddCircle  size={30} color="gray" onClick={()=>{Popup.SetTaskPopup(true)}}/>


      </div>

      <p style={{marginLeft:'-430px', marginTop:'10px', color:'gray',fontFamily:"Montserrat,serif"  }}>Active</p>

      <hr style={{width:'480px', marginLeft:'-1px'}}/>


      <div  className="taskbox" style={{height:'150px',width:'500px', marginTop:'10px', paddingLeft:'20px', overflowY:'scroll'}}>

      {Auxiliary.map((task, index) => (
        <div  style={{
          height: '40px',
          width: '450px',
          backgroundColor: '#f5f5f5',
          borderLeft: '4px solid blue',
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px',
          marginBottom: '10px',
          borderRadius: '5px'
        }} onClick={()=>Popup.SetReadPopup(true)}>
          <input type="checkbox" checked={task.status} style={{ marginRight: '10px' }} onClick={()=>handleCheck(task.id)} />
          <span className={task.status?"check":"notcheck"}  style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis',fontFamily:"Montserrat,serif"  }}>{task.title}</span>
          <span style={{marginLeft:'auto',marginRight:'10px',fontFamily:"Montserrat,serif"}}>Due: {formatDate(task.end_date)}</span>
          <MdOutlineDeleteForever onClick={()=>handleDelete(task.id)} />

        </div>

        
      ))}




      </div>

      <p style={{marginLeft:'-430px', marginTop:'10px', color:'gray',fontFamily:"Montserrat,serif"  }}>Done</p>

      <hr style={{width:'480px', marginLeft:'-1px'}}/>
     

              





        </div>
    );
}

export default Todolist;



 