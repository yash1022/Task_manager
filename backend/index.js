const express = require('express');
const app= express();
const cors= require('cors');
const bodyParser = require('body-parser');
const {insert_user, createEvent, getEvents, saveNotes, getNotes, deleteNote, addSubject,getSubjects,addCard, getFlashcards, deleteEvent,
addCategory, getCategory, addTask, getTasks,updateStatus, deleteTask, updateEventStatus} = require("./scripts")


app.use(bodyParser.json());
app.use(cors());


const PORT=process.env.PORT||5000;

app.post('/api/auth',async (req, res) => {
    userdata=req.body;


    

    try
    {
        await insert_user(userdata);
       
       
    }catch(e)
    {
        console.log(e);
       
    }

})

app.post('/api/events',async (req, res) => {

   const {tasks,userEmail}= req.body;
  

   const response =await createEvent(tasks,userEmail);
   res.json(response);
})

app.get('/api/getEvents/:emailId', async(req,res)=>{
   const{emailId}= req.params
   const{includeNotes}= req.query

    const events = await getEvents(emailId,includeNotes);

    console.log(JSON.stringify(events, null, 2));
    res.json(events);

})

app.post('/api/saveNotes/:eventid', async(req,res)=>{
    const {title,content,email}= req.body;
    const {eventid}= req.params;

    const response= await saveNotes(title,content,email, parseInt(eventid));
    res.json(response);
})

app.get('/api/getNotes/:email',async (req,res)=>{
    const {email}= req.params;
    const notes =await getNotes(email);

    

    res.json(notes);
 
})

app.delete('/api/deleteNote/:email/:id', async(req,res)=>{

    const {email,id}= req.params;

    const response =await deleteNote(email,parseInt(id,10));

    res.json(response);

    

})


app.post('/api/addSubject/:emailId', async(req,res)=>{
    const {emailId}= req.params;
    const {name}= req.body;

    const response = await addSubject(emailId,name);
    console.log(response);

    res.json(response);

})

app.get('/api/getSubjects/:emailId', async(req,res)=>{

       const {emailId}= req.params;

       const subjects = await getSubjects(emailId);

      
       res.json(subjects);



})


app.post('/api/addCard/:emailId', async(req,res)=>{
    const {emailId}= req.params;
    const {question,answer,subjectId}= req.body;

    const response = await addCard(emailId,question,answer,parseInt(subjectId));
    console.log(response);

    res.json(response);


})


app.get('/api/getflashcards/:emailId', async(req,res)=>{

  const{emailId}= req.params;

  const response = await getFlashcards(emailId);

 

  res.json(response);
 })

 app.delete('/api/deleteEvent/:emailId/:taskId', async(req,res)=>{
       const {emailId,taskId}= req.params;
       const response = await deleteEvent(emailId,parseInt(taskId));

       
 }
)


app.post('/api/saveCategory/:emailId', async(req,res)=>{
    const {emailId}= req.params;
    const {category}= req.body;

    const response = await addCategory(category,emailId);
    
    res.json(response);
})

app.get('/api/getCategory/:emailId', async(req,res)=>{

    const {emailId}= req.params;

    const response = await getCategory(emailId);
    console.log(response);
    
    res.json(response);

})

app.post('/api/saveTask/:emailId', async(req,res)=>{

    const {emailId}= req.params;
    const {name, startDate,endDate, category}= req.body;
   

    const response = await addTask(name,startDate,endDate, category,emailId);
   
    res.json(response);

})

app.get('/api/getTasks/:emailId', async(req,res)=>{

   


    const {emailId}= req.params;

    const response = await getTasks(emailId);

    console.log(response);
    
    res.json(response);





})


app.patch('/api/updateStatus/:id', async(req,res)=>{

    const {id}= req.params;
    const {status}= req.body;

    const response= await updateStatus(id,status);

    // console.log({ ...response, updated: { status: response.updated.status } });

    res.json(response.updated.status);


    
})


app.delete('/api/deleteTask/:id', async(req,res)=>{
   
    const {id}= req.params;
    const response = await deleteTask(parseInt(id));
    res.json(response);
 })


 app.patch('/api/updateEventStatus/:id',async(req,res)=>{

    const {id}= req.params;
    const {status}= req.body;

    await updateEventStatus(id,status);





 })

 







app.listen(PORT,()=>{console.log("SUCCESSFULLY CONNECETD TO PORT 5000")});