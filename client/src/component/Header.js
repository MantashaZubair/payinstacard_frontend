import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/auth'
import { toast } from 'react-hot-toast'

const Header = () => {
  const [auth,setAuth] = useAuth()

  const handleLogout = ()=>{
    setAuth({
     ...auth,user:null, token:''
    })
    localStorage.removeItem('auth')
    toast.success("Successfully Logout")
   }
  return (
    <>
<nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Payinstacard</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
      <div className="navbar-nav ms-auto">
      {!auth.user ? 
      <>
      <Link className="nav-link active " to="/register">Register</Link>
        <Link className="nav-link active " to="/login">Login</Link>
        </> 
        
      :
      
      <>
      <Link className="nav-link active " to="">{auth.user.name}</Link>
      <li className="nav-item">
                 <NavLink onClick={handleLogout} to='/login'  className="dropdown-item">LOGOUT</NavLink>
       </li>
        </> 
        
        }
       
      </div>
    </div>
  </div>
</nav>
    </>
  )
}

export default Header