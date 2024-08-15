import { createSlice } from "@reduxjs/toolkit";


const agenceSlice = createSlice({
    name:"authagence",
    initialState:[{
        id:1,
        name:"alaa",
        email:"ala.maamer@gmail.com",
        password:"aloulou",
        numero: 28544365,
        adress:"38 avenue de bellevue",
        cin:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSEhI…",
        matricule:"AZZER2334",
        status:"pending"
        
    }],
    reducers:{
        setContacts:(state,action)=>{
            return action.payload
        }
    }
})

export const {setContacts} = agenceSlice.actions
export default agenceSlice.reducer