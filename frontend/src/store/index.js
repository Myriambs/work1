import { configureStore } from "@reduxjs/toolkit";

import agenceSlice from './agenceSlice'
import authSlice from './authSlice'
export default configureStore({
    reducer:{
        authagence:agenceSlice,
        authuser : authSlice
    }
})