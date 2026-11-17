
"use server"

import { RegisterSchemaType } from "../schema/auth.schema"

export async  function handleRegister(data:RegisterSchemaType){
        try{
            const response = await fetch('https://route-posts.routemisr.com/users/signup',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(data)
            })
            const finalResponse = await response.json()
            if(!response.ok){
                return{
                    success:false,
                    message:finalResponse.message || "Registration failed"
                }
            }
            return{
                success:true,
                message:finalResponse.message || "Registration successful"
            }
        }
        catch(error){
            console.log(error)
            return{
                success:false,
                message:"something went wrong"
            }
        }
    }