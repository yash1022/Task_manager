const admin =require('../config/firebaseconfig')

async function validatetoken(req,res,next){
    const token= req.headers.authorization.split(' ')[1];

    


    try{

        const decode= await admin.auth().verifyIdToken(token);

        if(decode)
        {
            
            next()
        }

        

        
    }
    catch(e)
    {
        res.status(403).json({ message: 'Invalid token', error: e.message });
    }
    


}

module.exports= {validatetoken};