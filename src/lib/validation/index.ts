import * as z from "zod"



export const SignUpValidation = z.object({
    name: z.string().min(2,{message: 'Too Short'}).max(50),
    username: z.string().min(2,{message:'Too Short'}).max(50),
    email: z.string(),
    password: z.string().min(8,{message:'Password must be atleast 8 chars'}).max(50),

})
