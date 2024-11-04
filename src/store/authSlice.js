import { createSlice } from "@reduxjs/toolkit";
 const initialState={
    status:false,
    userData:null,
    personalData:null,
    wishData:[],
    userid:null
}
 const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
         
            state.status=true;
            state.userData=action.payload.userData;
            state.personalData=action.payload.personalData;

        },
        logout:(state)=>{
            state.status=false;
            state.userData=null;
            state.personalData=null
        },
        wishstore:(state,action)=>{
          state.userid=action.payload.userid
          state.wishData=action.payload.wishData
        }
    }

})
export const {login,logout,wishstore}=authSlice.actions
export default authSlice.reducer;