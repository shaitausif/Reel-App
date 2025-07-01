'use client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const LoginPage = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [loading, setloading] = useState(false)
    const router = useRouter()

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!password || !email) {
            alert("Email and Password are required")
            return
        }
        try {
            setloading(true)
            const res = await signIn('credentials',{
                email,
                password,
                redirect: false
            })
            if(!res?.ok){
                throw res?.error
            }else{
                router.push("/")
            }


        } catch (error) {
            
        }finally{
            setloading(false)
        }
    } 


  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
         <input 
        onChange={(e) => setemail(e.target.value)}
        value={email}        
        placeholder='Enter your Email'
        type="text" 
        />

         <input 
        onChange={(e) => setpassword(e.target.value)}
        value={password}        
        placeholder='Enter Password'
        type="password" 
        />
        <button disabled={loading} type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginPage
