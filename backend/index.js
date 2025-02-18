const express = require('express');
const app= express();
const cors= require('cors');
const bodyParser = require('body-parser');
const {insert_user, createEvent, getEvents, saveNotes, getNotes, deleteNote, addSubject,getSubjects,addCard, getFlashcards, deleteEvent} = require("./scripts")


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

app.post('/api/getEvents', async(req,res)=>{
    const {email} = req.body;

    const events = await getEvents(email);
   

    res.json(events);

})

app.post('/api/saveNotes', async(req,res)=>{
    const {title,content,email}= req.body;

console.log({title,content,email});
  const resposne= await saveNotes(title,content,email);

  res.json(resposne);
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

       console.log(subjects);
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

  console.log(response);

  res.json(response);
 })

 app.delete('/api/deleteEvent/:emailId/:taskId', async(req,res)=>{
       const {emailId,taskId}= req.params;
       const response = await deleteEvent(emailId,parseInt(taskId));

       
 }
)





app.listen(PORT,()=>{console.log("SUCCESSFULLY CONNECETD TO PORT 5000")});