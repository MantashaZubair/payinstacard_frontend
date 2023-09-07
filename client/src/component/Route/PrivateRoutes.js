import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function PrivateRoute(){
    const [ok,setOk] = useState(false)
    const[auth,setAuth]=useAuth()
    const navigate = useNavigate()
    useEffect(()=>{
        const autocheck = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/v1/auth/user`, {
                    headers: {
                        "Authorization": auth?.token
                    }
                });

                if (data.ok) {
                    setOk(true);
                } else {
                    // Handle token expiration
                    handleTokenExpiration();
                    toast.error("token expire")
                }
            } catch (error) {
                // Handle network errors
                handleTokenExpiration();
                toast.error("invalid token")
            }
        };
        if(auth?.token)autocheck()
    },[auth?.token])

    const handleTokenExpiration = () => {
        setAuth({
            ...auth,user:null, token:''
           })
        // Clear local storage
        localStorage.removeItem("auth");
        // Clear auth context
        // Redirect to login/register page
        navigate("/login"); // Use navigate to redirect
    };

    return ok ? <Outlet/> :<Spinner/>
}