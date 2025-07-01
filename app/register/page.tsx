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
            if(data?.error){
                alert("User already exists")
            }
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
    <div className='flex justify-center items-center h-screen w-screen'>

    
    <div className='bg-gray-600 md:py-7 py-4 md:px-6 px-4 rounded-lg md:w-[20vw] w-full md:mx-0 mx-2'>
      <h1 className='md:text-2xl text-lg text-center mb-5'>Registration</h1>
      <form className='flex flex-col gap-3 justify-center items-center' onSubmit={handleSubmit}>
        <input 
        onChange={(e) => setemail(e.target.value)}
        value={email}        
        className='px-2 py-1 outline-none border duration-200 border-gray-600 rounded-lg focus:border-gray-300'
        placeholder='Enter your Email'
        type="text" 
        />

         <input 
        onChange={(e) => setpassword(e.target.value)}
        value={password}        
        className='px-2 py-1 outline-none border duration-200 border-gray-600 rounded-lg focus:border-gray-300'
        placeholder='Enter Password'
        type="password" 
        />
         <input 
        onChange={(e) => setconfirmPassword(e.target.value)}
        value={confirmPassword}        
        className='px-2 py-1 outline-none border duration-200 border-gray-600 rounded-lg focus:border-gray-300'
        placeholder='Confirm Password'
        type="password" 
        />
         <span className='text-sm mt-2'>Already have an Account?{" "} <span onClick={() => router.push('/login')} className='text-blue-400 hover:underline duration-200 cursor-pointer hover:text-blue-500'>login</span> </span>
        <button className={`bg-blue-500 rounded-lg px-6 py-1.5  hover:bg-blue-600 duration-300 ${loading ? 'bg-blue-400' : ''}`} disabled={loading}  type='submit'>Register</button>
      </form>   
    </div>
    </div>
  )
}

export default RegisterPage
