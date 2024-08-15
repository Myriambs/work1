import React , { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import { fetchAccount } from "../../api/authAgence";
import {useDispatch,useSelector} from 'react-redux'
import { setContacts } from "../../store/authSlice";
import Login from '../authclient/Login'
import Admin from "../admin/Admin";

const PrivateRoute = () => {

const Auth = useSelector(state=>state.authuser)
console.log('auth redux', Auth)
  const token = localStorage.getItem('token')
  console.log('token',token)
const navigate = useNavigate()
const distapch = useDispatch()
const getAccout=async()=>{
  const data = await fetchAccount()
  console.log("data",data)
distapch(setContacts(data))
}
useEffect(()=>{
getAccout()
},[])

const logout=()=>{
  localStorage.removeItem('token')
  navigate('/login')
}
  return (
    <div>
{
  token ? ( <> <button  onClick={()=>logout()}   > lougout</button>   
  
   {
    Auth.role ==="admin" ? (<Admin/> )  : (<MovieList/>)
   }
    </>) :(<Login/>)
}

    </div>
  )
}

export default PrivateRoute