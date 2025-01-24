import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export const insert_user= async(data:any)=>{

    if(!data)
    {
        console.log("DATA IS NOT PROVIDED");
        return;  // return if data is not provided. This helps in preventing unnecessary database operations.
 
    }


    try{
             const existinguser = await prisma.user.findUnique({
                where:{
                    email: String(data.email)
                },
             });


             if(existinguser)
             { 
                return;
             }

             


             await prisma.user.create({
                data:{

                    name:data.displayName,
                    email:data.email,
                    profile_pic:data.photoURL

                
                }
             })
                
 }catch (error) {
    console.error('Error inserting user:', error);
    throw error;
} finally {
    await prisma.$disconnect();
}



}

export const createTask= async(tasks:any,userEmail:any)=>{
    try
    {
        const findExis= await prisma.tasks.findUnique({
            where:{ 
                
                title:tasks.content

                 }

        
        })

        if(findExis)
            {
                return{success:false,message:'Task already exists'};
            }

            const userData= await prisma.user.findUnique({
                where:{
                    email: userEmail
                }

            })

        if(!userData) return{success:false,message:'USER NOT FOUND'};


            await prisma.tasks.create({

                data:{

                title:tasks.content,
                priority:tasks.priority,
                start_date:tasks.startDate,
                end_date:tasks.endDate,
                status:tasks.completed,
                userId:userData.id

                }

                
            })

            
            return {success:true,message:'Task created successfully'};

}
catch (error) {
    console.error('Error inserting user:', error);
    throw error;
} finally {
    await prisma.$disconnect();
}


}


export const getTasks = async (email:any)=>{
    try
    {
         const userData = await prisma.user.findUnique({
            where:{
                email:email
            }
         })

         if(!userData)
         {
            return{success:false, message:'User not found'};
         }

         const tasks = await prisma.tasks.findMany({
            where:{
                userId:userData.id
            }
         })

         return tasks;
    }
    catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

export const saveNotes = async(title:any, notes:any, emailId:any)=>{

    try{
    const userData=await prisma.user.findUnique({
        where:{
            email: emailId
        }
    })

    if(!userData)
    {
        return{success:false, message:'USER NOT FOUND'};
    }

    await prisma.notes.create({
        data:{
            title:title,
            content:notes,
            userId:userData.id
        } 
    })


    return{success:true, message:"NOTE SAVED SUCCESSFULLY"};




}
catch (error) {
    console.error('Error inserting user:', error);
    throw error;
} finally {
    await prisma.$disconnect();
}
}

 export const getNotes = async(email:any)=>{
    try{

        const user= await prisma.user.findUnique({
            where:{
                email:email
            }
        })

        if(!user)
        {
            return{success:false, message:'USER NOT FOUND'};
        }


        const notes = await prisma.notes.findMany({
                where:
                {
                    userId:user.id
                }
        })


        if(!notes)
        {
            return{success:false, message:'NO NOTES FOUND'};
        }


        return {success:true,notes};








    }
    catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }

}


 export const deleteNote= async (email:any, noteId:any)=>{

      try
      {
        const userdata= await prisma.user.findUnique({
            where:{
                email:email
            }
        })


        if(!userdata)
        {
            return{success:false}
        }

         await prisma.notes.delete({
            where:{

                id:noteId,
                userId:userdata.id

            }
         })

         return{success:true}
      }
      catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }






}









