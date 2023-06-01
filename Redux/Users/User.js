import { createSlice } from "@reduxjs/toolkit";



const User = createSlice({
    name:"User",
    initialState :[] ,
    reducers :{
            
            AddUser :(State,action) =>{
                State.push(action.payload)
                console.log("Data pushed:", action.payload);
            }
        
    }
})

export const {AddUser} = User.actions
export default User.reducer;



