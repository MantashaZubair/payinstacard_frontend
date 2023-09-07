import React, { useEffect, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { useAuth } from '../context/auth';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const EditUserDetails = ({modelopened, setModelOpened}) => {
          //context
  const [ auth,setAuth]= useAuth()
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // const [partTime,setPart]
  //get user data
  useEffect(()=>{
    const {name,email,phone} = auth?.user
    setName(name)
    setEmail(email)
    setPhone(phone)
   },[auth?.user])
   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(
        `http://localhost:8000/api/v1/auth/update-profile`,
        { name, email, phone},
        
        {  headers: {
            "Authorization": auth?.token
        }}
      );
      console.log(data)
      if (data?.error) {
        toast.error(data?.error);

      } else {
        setAuth({...auth, user:data?.updatedUser })
        let ls = localStorage.getItem("auth")
        ls = JSON.parse(ls)
        ls.user= data.updatedUser
        localStorage.setItem("auth",JSON.stringify(ls))
        toast.success("Profile updated successfully")
        {modelopened && setModelOpened(false);}

      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went wrong");
    }
  };
  return (
    <>
   { modelopened &&
      <Modal
        show={modelopened}
        onHide={() => {
          setModelOpened(false);
        }}
        size="md"
      >
         <Modal.Header closeButton>
          <Modal.Title>
            <h3>Edit User Details</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit}>
            <div>
            <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  value={name}
                  className="form-control"
                  placeholder="enter your location"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
           
              <div className="mb-3">
                <input
                  type="text"
                  name="email"
                  value={email}
                  className="form-control"
                  placeholder="enter your location"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="phone"
                  value={phone}
                  className="form-control"
                  placeholder="enter your location"
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div>
              </div>
           
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
   }

   </>
  )
}

export default EditUserDetails