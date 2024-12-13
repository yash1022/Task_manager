const express = require('express');
const app= express();
const cors= require('cors');
const bodyParser = require('body-parser');
const {insert_user} = require("./scripts")


app.use(bodyParser.json());
app.use(cors());


const PORT=process.env.PORT||5000;

app.post('/api/auth',async (req, res) => {
    userdata=req.body;


    console.log(userdata);

    try
    {
        await insert_user(userdata);
        console.log("DATABSE UPDATED");
       
    }catch(e)
    {
        console.log(e);
       
    }

})



app.listen(PORT,()=>{console.log("SUCCESSFULLY CONNECETD TO PORT 5000")});