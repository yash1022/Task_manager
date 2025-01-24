const express = require('express');
const app= express();
const cors= require('cors');
const bodyParser = require('body-parser');
const {insert_user, createTask, getTasks, saveNotes, getNotes, deleteNote} = require("./scripts")


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

app.post('/api/tasks',async (req, res) => {

   const {tasks,userEmail}= req.body;
  

   const response =await createTask(tasks,userEmail);
   res.json(response);
})

app.post('/api/getTasks', async(req,res)=>{
    const {email} = req.body;

    const tasks = await getTasks(email);
   

    res.json(tasks);

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



app.listen(PORT,()=>{console.log("SUCCESSFULLY CONNECETD TO PORT 5000")});