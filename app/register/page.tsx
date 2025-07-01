'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const RegisterPage = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [loading, setloading] = useState(false)

    const router = useRouter()
    
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!email || !password){
            alert("Email and Password are required")
            return
        }
        if(password !== confirmPassword ){
            alert("Passwords do not match")
            return;
        }

        try {
            setloading(true)
            const res = await fetch('/api/auth/register',
            {method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    email,
                    password
                })
            }
            )
            const data = await res.json()
            if(!res.ok){
                throw new Error(data.error || "Registration Failed")
            }
            console.log(data)
            router.push("/login")
        } catch (error) {
            console.log(error)
            throw error
        }finally{
            setloading(false)
        }

    }

  return (
    <div>
      <h1>Registration</h1>
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
         <input 
        onChange={(e) => setconfirmPassword(e.target.value)}
        value={confirmPassword}        
        placeholder='Confirm Password'
        type="password" 
        />
        <button disabled={loading} type='submit'>Register</button>
      </form>
    </div>
  )
}

export default RegisterPage
