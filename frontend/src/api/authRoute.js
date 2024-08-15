import axios from 'axios'

export const fetchAccount =async()=>{
    const token=localStorage.getItem('token');
    const {data} = await axios.get('http://localhost:4000/users/protected',{headers:{Authorization:token}} );
    return data 
}

export const signupAccount =async(value)=>{
    const addingUser = await axios.post('http://localhost:4000/users/signup',{...value})
}