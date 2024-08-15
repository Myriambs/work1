import axios from 'axios'

// routet jiben el compte b3ed le sar el login .

export const fetchAccount =async()=>{
    const token=localStorage.getItem('token');
    const {data} = await axios.get('http://localhost:4000/agence/protected',{headers:{Authorization:token}} );
    return data 
}

export const signupAccount =async(value)=>{
    const addingUser = await axios.post('http://localhost:4000/agence/signup',{...value})
}