"use client"
import { Field, FieldError } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { AtSign, Eye, EyeOffIcon, User } from 'lucide-react'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginSchemaType, registerSchema, RegisterSchemaType } from '@/lib/schema/auth.schema'
import { handleRegister } from '@/lib/action/auth.action'
import { toast } from '@/components/ui/toast'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'



export default function LoginForm() {
    const form = useForm<LoginSchemaType>({
        defaultValues:{
          
            email:"",
            password:"",
           
        },
        resolver:zodResolver(loginSchema),
    })
    const [passwordVisible, setPasswordVisible] = useState(false)
    const router =useRouter()

  
   async function onSubmit(data: LoginSchemaType) {
    const response = await signIn('credentials',{
      ...data,
      redirect:false,
      callbackUrl:"/"  
    })
    console.log(response)
    if(response?.ok){
       toast.add({
        type:'success',
        description:"Login successful"
       })

       router.push("/")
    }
    else{
      toast.add({
        type:'error',
        description:response?.error
       })
    }

    }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='my-7 space-y-6'>
      
        <Controller
  name="email"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <InputGroup>
  <InputGroupInput placeholder="email" {...field} />
  <InputGroupAddon>
    <AtSign />
  </InputGroupAddon>
</InputGroup>
      
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
   


<Controller
  name="password"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
             <InputGroup>
        <InputGroupInput {...field}
          id="inline-end-input"
          type={passwordVisible ? "text" : "password"}
          placeholder="Enter password"
        />
        <InputGroupAddon align="inline-end">
         <Button onClick={() => setPasswordVisible(!passwordVisible)}>
            
          {passwordVisible ? <Eye /> : <EyeOffIcon />}
         </Button>
        </InputGroupAddon>
      </InputGroup>

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>

<Button className={'w-full'} type='submit' disabled={form.formState.isSubmitting}>
    {form.formState.isSubmitting ? 'login...' : 'login'}
</Button>

    </form>
   
  )
}
