import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "./Login.css"
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useAuth } from '../context/auth'
const Login = () => {
  const [email, setEmail]= useState("")
  const [password, setPassword] = useState("")
  const [auth,setAuth]=useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async(e)=>{
    e.preventDefault()
  try {
    const {data} = await axios.post(`http://localhost:8000/api/v1/auth/login`, {email,password})
    console.log(data)
    if(data.success){
      toast.success(data.message);
      setAuth({
        ...auth,
        user:data.user,
        token:data.token
      })
      localStorage.setItem('auth',JSON.stringify(data))
      navigate(location.state || "/");
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
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
      <input type='email' placeholder='Enter your email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type='password' placeholder='Enter your password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <button className='form-button'>Login</button>
          <p>Don't have login account ?<span><Link to="/register">register</Link></span></p>
          </form>
        </div>
      </div>
    
    </>
  )
}

export default Login