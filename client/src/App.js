
import './App.css';
import {Routes,Route, Navigate} from "react-router-dom"
import Header from "../src/component/Header"
import Login from "../src/pages/Login"
import {Toaster} from "react-hot-toast"
import Register from './pages/Register';
import { useAuth } from './context/auth';
import PrivateRoute from './component/Route/PrivateRoutes';

import Home from './pages/Home';


function App() {
  const [auth,setAuth] = useAuth()
  return (
    <>
     <Header/>
     <Toaster/>
     {/* <ToastContainer/> */}
    
     <Routes>
     <Route path ="/" element={auth?.user ? <Navigate to="home" /> : <Navigate to="login" />}/>
     <Route path="/" element={<PrivateRoute />}>
          {/* Protected routes */}
          <Route path="/home" element={auth?.user ? <Home user={auth.user} /> : <Navigate to="../login" />} />
        </Route>
     <Route path ="/home" element={auth?.user ? <Home/>:<Navigate to="../login" />}/>
      <Route path ="/login" element={auth?.user ? <Navigate to="../home"/> :<Login/>}/>
      <Route path ="/register" element={<Register/>}/>
     </Routes>
    </>
  );
}

export default App;
