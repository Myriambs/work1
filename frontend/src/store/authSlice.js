import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name:"authuser",
    initialState:[{
        id:1,     
        name:"alaa",
        email:"ala.maamer@gmail.com",
        password:"aloulou",
        role:"client"
    }],
    reducers:{
        setContacts:(state,action)=>{
            return action.payload
        }
    }
})

export const {setContacts} = authSlice.actions
export default authSlice.reducer