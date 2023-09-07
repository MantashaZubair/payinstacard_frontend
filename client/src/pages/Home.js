import React from 'react'
import { useAuth } from '../context/auth'
import "./Home.css"
import UserDetails from './UserDetails'

const Home = () => {
    const[auth]= useAuth()
  return (
<>

<div className='container mt-5'>
             <div className='row'>
                  
                  <div className='col-md-12'>
                    <div className='card card-container-profile'>
                    <div className='profile-header'>
                    <h1>Welcome  <span className='text-capitalize'>{ auth?.user?.name}</span> </h1>
                    </div>
                    <div className='card card-profile '>
                      <UserDetails/>
                    </div>
                    </div>

                </div>

             </div>
        </div>

{/* <pre className=''>{JSON.stringify(auth,null,4)}</pre> */}

   
</>
   
  )
}

export default Home