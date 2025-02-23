import React, { useEffect,useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Chart from './Chart'
import Chart2 from './Chart2'
import { useContext } from 'react'
import { authContext } from '../App'

export default function Info() {

  const Auth= useContext(authContext);
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [countCompleted, setCountCompleted] = useState(0);
  const [countPending, setCountPending] = useState(0);
  const [pendingData, setPendingData] = useState([]);
 
  useEffect(()=>{

    fetchTask();
    fetchCategories();
},[])

useEffect(()=>{

  if(tasks.length>0 && categories.length>0)
  {
    handleData(tasks,categories)
  }



},[tasks,categories])

 

  const fetchTask = async () => {

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

    

    

    setTasks(data);
    countStatus(data);
    // handleData(data)
    
    

    

    
    




    }
    catch(e)
    {
      console.log('Error:', e);
    }






  }

  const fetchCategories= async()=>{

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

   const countStatus=(data)=>{

    let Completed=0;
    let Pending=0;

    data.forEach((x)=>x.status?(Completed++):(Pending++))

   setCountCompleted(Completed);
   setCountPending(Pending);
   





  }

  const handleData=(data,categories)=>{

    const pendingTasks= data.filter((t)=>t.status===false).map((t)=>({categoryid:t.categoryId, status:t.status}))
  
    

    const countOccurence= pendingTasks.reduce((acc,task)=>{

      if(acc[task.categoryid])
      {
        acc[task.categoryid]++;
      }

      else
      {
        acc[task.categoryid]=1;
      }
      
      return acc;

    },{})

    const result = categories.map((x)=>({

      name:x.name,
      count:countOccurence[x.id] || 0
    }))

    console.log(result)

    setPendingData(result);



  }



  return (
   
    <div>

        <Navbar></Navbar>
        <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100vw', height: '660px ', gap: '30px', marginTop: '65px' }}>
        <div style={{height:'90%', width:'290px',marginTop:'20px',marginLeft:'20px'}}>
          <Sidebar />
        </div>

        <div style={{width:'300px', height:'300px', marginTop:'25px',backgroundColor:'#f8f9fa', paddingTop:'10px',boxShadow:'0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius:'15px'}}>
        <h3 style={{fontFamily:"Montserrat,serif",textAlign:'center', marginBottom:'10px'}}>Tasks Status</h3>
            <Chart   compleated={countCompleted} pending={countPending}></Chart>

        </div>

        <div style={{width:'420px', height:'300px', marginTop:'25px',backgroundColor:'#f8f9fa', paddingTop:'10px',boxShadow:'0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius:'15px'}}>
        <h3 style={{fontFamily:"Montserrat,serif",textAlign:'center', marginBottom:'10px'}}>Pending</h3>
        <Chart2 data={pendingData}></Chart2>
        </div>


  </div>
      
    </div>
  )
}
