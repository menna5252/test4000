import * as z from 'zod'

export const registerSchema = z.object({
    name:z.string().nonempty('Name is required').min(3,'Name must be at least 3 characters')
    .max(20,'Name must be less than 20 characters'),
 username: z
      .string()
      .nonempty("user name is required")
      .min(3, "name must be at least 3 characters long")
      .max(20, "name must be at most 20 characters long"),
    email:z.email('Invalid email').nonempty('Email is required'),
    password:z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'),
    rePassword:z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'),
    dateOfBirth:z.string().nonempty('Date of birth is required'),
    gender:z.enum(['male','female'],'Gender is required'),
  
}).refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });

export const loginSchema = z.object({
    email:z.email('Invalid email').nonempty('Email is required'),
    password:z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'),
})

export type RegisterSchemaType = z.infer<typeof registerSchema>

export type LoginSchemaType = z.infer<typeof loginSchema>