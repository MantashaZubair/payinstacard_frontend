import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-hot-toast'

const Register = () => {
  const [name , setName] = useState("")
  const [email, setEmail]= useState("")
  const [password, setPassword] = useState("")
  const [phone,setPhone] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()
  try {
    const {data} = await axios.post(`http://localhost:8000/api/v1/auth/register`, {name,email,password,phone})
    console.log(data)
    if(data.success){
      toast.success(data.message);
      navigate("/login");
      
    }else{
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error)
    toast.error("something went wrong");
  }
  }
  return (
    <>  
    <div className='form-container '>
    <div className='form-card'>
    <h2>Register</h2>
    <form onSubmit={handleSubmit}>
       <input type='text' placeholder='Enter your name' value={name} onChange={(e)=>setName(e.target.value)} />
        <input type='email' placeholder='Enter your email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type='password' placeholder='Enter your password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <input type='text' placeholder='Enter your contact' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
        <button className='form-button'>Register</button>
        <p>Do you have Already  an account ?<span><Link to="/login">login</Link></span></p>
        </form>
      </div>
    </div>
  
  </>
  )
}

export default Register