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
import { registerSchema, RegisterSchemaType } from '@/lib/schema/auth.schema'
import { handleRegister } from '@/lib/action/auth.action'
import { toast } from '@/components/ui/toast'
import { useRouter } from 'next/navigation'


const items = [
 
  { label: "female", value: "female" },
  { label: "male", value: "male" },
]

export default function RegisterForm() {
    const form = useForm<RegisterSchemaType>({
        defaultValues:{
            name:"",
            username:"",
            email:"",
            password:"",
            rePassword:"",
            dateOfBirth:"",
            gender:"male",
        },
        resolver:zodResolver(registerSchema),
    })
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [rePasswordVisible, setRePasswordVisible] = useState(false)
    const router =useRouter()

  
   async function onSubmit(data: RegisterSchemaType) {
      const result = await handleRegister(data)
      if(result.success == true){
         toast.add({
            type:'success',
            description:result.message
            
         })
         router.push('/login')
      }
      else{
         toast.add({
            type:'error',
            description:result.message
            
         })
      }
    }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='my-7 space-y-6'>
        <Controller
  name="name"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <InputGroup>
  <InputGroupInput placeholder="name" {...field} />
  <InputGroupAddon>
    <User />
  </InputGroupAddon>
</InputGroup>
      
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
        <Controller
  name="username"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <InputGroup>
  <InputGroupInput placeholder="username" {...field} />
  <InputGroupAddon>
    <AtSign />
  </InputGroupAddon>
</InputGroup>
      
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
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
  name="gender"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <Select items={items}  onValueChange={field.onChange} name={field.name} value={field.value}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="gender" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      {items.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>
      
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
  <Controller
  name="dateOfBirth"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <InputGroup>
  <InputGroupInput placeholder="dd/mm/yyyy" {...field}  type='date'/>
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
<Controller
  name="rePassword"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
             <InputGroup>
        <InputGroupInput {...field}
          id="inline-end-input"
          type={rePasswordVisible ? "text" : "password"}
          placeholder="Enter password"
        />
        <InputGroupAddon align="inline-end">
         <Button onClick={() => setRePasswordVisible(!rePasswordVisible)}>
            
          {rePasswordVisible ? <Eye /> : <EyeOffIcon />}
         </Button>
        </InputGroupAddon>
      </InputGroup>

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
<Button className={'w-full'} type='submit' disabled={form.formState.isSubmitting}>
    {form.formState.isSubmitting ? 'Registering...' : 'Register'}
</Button>

    </form>
   
  )
}
