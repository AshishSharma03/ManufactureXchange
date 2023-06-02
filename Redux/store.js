import { configureStore } from "@reduxjs/toolkit";
import User from "./Users/User";



export const store = configureStore({
    reducer :{
        User : User,
    }
})