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

export const createEvent= async(tasks:any,userEmail:any)=>{
    try
    {
        const findExis= await prisma.events.findUnique({
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


            await prisma.events.create({

                data:{

                title:tasks.content,
                priority:tasks.priority,
                start_date:tasks.startDate,
                end_date:tasks.endDate,
                status:tasks.completed,
                description:tasks.description,
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


export const getEvents = async (email:any, includeNotes:any)=>{
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

         const events = await prisma.events.findMany({
            where:{
                userId:userData.id,
            },
            include: includeNotes ? { notes: true } : undefined
           
         })

         return events;
    }
    catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

export const saveNotes = async(title:any, notes:any, emailId:any, eventid:number)=>{

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
            userId:userData.id,
            eventId:eventid !== 0?eventid :null,
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


export const addSubject= async(email:any, subjectName:any)=>{

    try{
        const userdata= await prisma.user.findUnique({
            where:{
                email:email
            }
        })

        if(!userdata)
        {
            return{success:false}
        }


        const existingSubject =await prisma.subjects.findFirst({
            where:{
                name:subjectName,
                userid:userdata.id
            }
        })

        if(existingSubject)
        {
            return{success:false, message:"Subject already exists"};
        }

        const subject = await prisma.subjects.create({
             data:{
                name:subjectName,
                userid:userdata.id
             }
        })


        return{success:true,subject:subject}

}
catch (error) {
    console.error('Error inserting user:', error);
    throw error;
} finally {
    await prisma.$disconnect();
}
}


export const getSubjects= async(email:any)=>{
    try{

        const userdata =await prisma.user.findUnique({
            where:{
                email:email
            }
        })

        if(!userdata)
        {
            return{success:false, message:'User not found'};
        }


        const subjects = await prisma.subjects.findMany({
            where:{
                userid:userdata.id
            }
        })

        return{success:true, subject:subjects}






    }
    catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}


export const addCard = async(email:any,question:any,answer:any,id:any)=>
{
    try{

        const userdata = await prisma.user.findUnique({

            where:{
                email:email
            }
        
        })

        if(!userdata)
        {
            return{success:false, message:'User not found'};
        }


        const card = await prisma.flashcards.create({
            data:{
                question:question,
                answer:answer,
                subjectId:Number(id),
                userid:userdata.id
            }
        })

        if(!card)
        {
            return{success:false, message:'Error creating card'}
        }

        return{success:true, card:card}


        }
    catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

export const getFlashcards= async(email:any)=>{

    try {


        const userdata = await prisma.user.findUnique({
            where: {
                email: email
            }
        })


        if (!userdata) {
            return { success: false, message: 'User not found' };


        }


        const flashcards = await prisma.flashcards.findMany({
            where: {
                userid: userdata.id
            }
        })


        return { success: true, flashcards: flashcards }


    }
    catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }

    




}

export const deleteEvent = async(emailId:any, eventId:any)=>{

    try{

        const userdata = await prisma.user.findUnique({
            where: {
                email: emailId
            }
        })
    
        if(!userdata)
        {
            return{success:false, message:'User not found'}
        }
    
        await prisma.events.delete({
            where: {
                id: Number(eventId),
                userId: userdata.id
            }
        })
    
        return{success:true, message:'Event deleted successfully'}
    }
    catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }


    
}


export const addCategory = async(name:any, emailId:any)=>{

    try{

        const userdata= await prisma.user.findUnique({
            where:{
                email:emailId
            }
        })
    
        if(!userdata)
        {
            return{success:false, message:'User not found'}
        }
    
    
          await prisma.category.create({
            data:{
                name:name,
                userId:userdata.id
            }
        })
    
        return{success:true, message:'Category added successfully'}
    

    }
    catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }


    


}


 export const getCategory = async(emailId:any)=>{

      const userdata= await prisma.user.findUnique({

          where:{
              email:emailId
          }
        
        })

        if(!userdata)
            {
              return{success:false, message:'User not found'}
            }


        const categories = await prisma.category.findMany({
        
            where:{
                userId:userdata.id
            }
        })


        if(!categories)
        {
            return{success:false, message:'No categories found'}
        }


        return categories



}

export const addTask = async(name:any,startDate:any, endDate:any,category:any, emailId:any)=>{


    try
    {
        const userdata= await prisma.user.findUnique({
            where:{
                email:emailId
            }
        })

        const categoryId= await prisma.category.findUnique({

            where:{
                name:category
            }
        })

        if(!userdata)
        {
            return{success:false, message:'User not found'}
        }

        if(!categoryId)
        {
            return{success:false, message:'Category not found'}
        }

        

        await prisma.tasks.create({
            data:{
                title:name,
                start_date:startDate,
                end_date:endDate,
                categoryId:categoryId.id,
                userID:userdata.id
            }
        })

        return{success:true, message:'Task added successfully'}
    }
    catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}


export const getTasks = async(emailId:any)=>{

    try{
    
    const userdata= await prisma.user.findUnique({
        where:{
            email:emailId
        }

    })

    if(!userdata)
    {
        return{success:false, message:'User not found'}
    }


    const tasks = await prisma.tasks.findMany({
        where:{
            userID:userdata.id
        }
    })


    if(!tasks)
    {
        return{success:false, message:'No tasks found'}
    }

    return tasks

}
catch (error) {
    console.error('Error inserting user:', error);
    throw error;
} finally {
    await prisma.$disconnect();
}



}


export const updateStatus = async(id:any,status:any)=>{


    try{


    const task = await prisma.tasks.findUnique({
        where:{
            id:Number(id)
        }
    })

    if(!task)
    {
        return{success:false, message:'Task not found'}
    }

    const updated= await prisma.tasks.update({
        where:{
            id:Number(id)
        },

        data:{
            status:!status
        }
    })

    return{success:true, message:'Task status updated successfully',updated}


}
catch (error) {
    console.error('Error inserting user:', error);
    throw error;
} finally {
    await prisma.$disconnect();
}

}



export const deleteTask = async(id:any)=>{

  try
  {


       await prisma.tasks.delete({
        where:{
            id:Number(id)
        }
    })

   return {success:true, message:'Taskk deleted successfully'}

  }

  catch (error) {
    console.error('Error inserting user:', error);
    throw error;
} finally {
    await prisma.$disconnect();
}

    





}

export const updateEventStatus = async(id:any, status:any)=>{

    try
    {


        await prisma.events.update({

            where:{
                id:Number(id)
            },
            data:{
                status:!status
            }
    
    
            
        })


        
    }


    catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }






}









