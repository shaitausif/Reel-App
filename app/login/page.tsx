'use client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


const LoginPage = () => {

const router = useRouter()
    

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [loading, setloading] = useState(false)
    

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
                alert("Invalid username or password")
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
    <div className='flex justify-center  items-center h-screen w-screen'>
    <div className='bg-gray-600 md:py-7 py-4 md:px-6 px-4 rounded-lg md:w-[20vw] w-full md:mx-0 mx-2'>
      <h1 className='md:text-2xl text-lg text-center mb-5'>Login</h1>
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
        <span className='text-sm mt-2'>Don't have an Account?{" "} <span onClick={() => router.push("/register")} className='text-blue-400 hover:underline duration-200 cursor-pointer hover:text-blue-500'>register</span> </span>
        <button className={`bg-blue-500 rounded-lg px-6 py-1.5 hover:bg-blue-600 duration-300 ${loading ? 'bg-blue-400' : ''}`} disabled={loading} type='submit'>Login</button>
      </form>
    </div>
    </div>
  )
}

export default LoginPage
