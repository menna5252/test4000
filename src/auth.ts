import { Session } from './../node_modules/next-auth/core/types.d';
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { email } from "zod";
import { ca } from "zod/locales";


export const authOption:NextAuthOptions={
    providers:[
        Credentials({
          name:"credentials",
            credentials:{
              email:{label:"email",type:"email",placeholder:"email"},
              password:{label:"password",type:"password",placeholder:"password"},  
        },
        authorize:async(credentials)=>{
            try{
                const res = await fetch(`${process.env.API_BASE_URL}/users/signin`,{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({
                        email:credentials?.email,
                        password:credentials?.password
                    })
                })
                const finalResponse = await res.json()
                 if(!res.ok){
                    throw new Error(finalResponse.message||"failed to login")
                }
                return {
                    id:finalResponse.data.user._id,
                    accesToken:finalResponse.data.token,
                    name:finalResponse.data.user.name,
                    email:finalResponse.data.user.email,
                    image:finalResponse.data.user.photo

                }
                
            }
            catch(error){
                console.log(error)
                throw error
            }
        }
    
        })
    ],
    callbacks:{
        jwt({token,user}){
               if(user){
                token.accessToken = user.accesToken;
                token.user = {
                    id:user.id,
                    name:user.name,
                    email:user.email,
                    image:user.image
                }
               }
               return token
        },

        session({token,session}){

            if(token){
                session.user = token.user
            }
            return session
        }
        
    },
    pages:{
        signIn:"/login"
    }
}