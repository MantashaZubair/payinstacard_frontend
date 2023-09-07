import React, { useState } from 'react'
import { useAuth } from '../context/auth'
import EditUserDetails from './EditUserDetails';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const UserDetails = () => {
    const [auth,setAuth] = useAuth()
    const [modelopened, setModelOpened] = useState(false);
    const handleDelete = async(id)=>{
      console.log(id)
      try {
        const data = await axios.delete(`http://localhost:8000/api/v1/auth/delete-profile/${id}`,
        
        {  headers: {
            "Authorization": auth?.token
        }}
      );
      // console.log(data?.data?.success)
      
        if (data?.data?.error) {
          toast.error(data?.data?.error);
  
        }else{
        setAuth({
          ...auth,user:null, token:''
         })
         localStorage.removeItem('auth')
         toast.success(data?.data?.message)
      }
      } catch (error) {
        console.log(error)
      } 
    }
  return (
    <>
         <div className='row'>
       <div className='col-12 col-md-6 offset-2'>
 {/* profile info */}
 <div className=' my-4 p-3'>
 <div className='userProfile'>
              <h6 className='text-secondary'>Your Name</h6>
             
              <span className='userinfo'>{auth?.user?.name}</span>
        
          
        </div>
        <div className='userProfile'>
        <h6 className='text-secondary mt-2'>Email</h6>
             
               {auth?.user?.email}
        
        </div>
        <div className='userProfile'>
        <h6 className='text-secondary mt-2'>Phone Number</h6>
            
               {auth?.user?.phone}
           
        </div>
        </div>
        <button className='editbutton'  onClick={()=>setModelOpened(true)}>Edit</button>
         <EditUserDetails   modelopened={modelopened}
                        setModelOpened={setModelOpened}/>
       <button className='deletebutton'  onClick={()=>handleDelete(auth?.user?._id)}>Delete</button>
       </div>
       </div>
    </>
  )
}

export default UserDetails