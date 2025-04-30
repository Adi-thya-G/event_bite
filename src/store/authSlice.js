import { createSlice } from "@reduxjs/toolkit";
import service from "../Appwrite/config";
 const initialState={
    status:false,
    userData:null,
    // admin
    adminStatus:false,
    personalData:null,
    //
    wishData:[],
    cartData:[],
    // password recovery
    Recoveryid:null,
    //
    vendorStatus:false,
    vendorId:null,
    // cache data item name
    cache:null ,
    Order_table_id:null,
    Vendor_Discount:null,
    PaymentSuccessful:null

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
            state.adminStatus=false
            state.wishData=[]
            state.cartData=[]
        },
        // password recovery update
        Recovery:(state,action)=>
        {
           state.Recoveryid=action.payload
        },
        wishstore:(state,action)=>{
          state.wishData=action.payload
        },
        addwish:(state,action)=>{
            if (!state.wishData.includes(action.payload)) {
                state.wishData = [action.payload, ...state.wishData];
                service.updateWishlist(state.personalData["$id"],state.wishData)
        }
    },
        removewish:(state,action)=>{
            state.wishData = state.wishData.filter(
                (id) => id != action.payload)
                service.updateWishlist(state.personalData["$id"],state.wishData)
                
        }
        ,updateAdmin:(state)=>{
            state.adminStatus=true
        },
        cartstore:(state,action)=>{
            state.cartData=action.payload
        },
        UpdateVendorStatus:(state,action)=>{
            state.vendorStatus=!state.vendorStatus
            state.vendorId=action.payload
        },
        cartAdd:(state,action)=>{
            if(!state.cartData.includes(action.payload))
               { state.cartData=[action.payload,...state.cartData]
                  service.updatecart(state.personalData["$id"],state.cartData)
               }
               
        },
        cartRemove:(state,action)=>{
           state.cartData= state.cartData.filter(
                (id)=>id!=action.payload
            )
            service.updatecart(state.personalData["$id"],state.cartData)

        },
        UpdateCache:(state,action)=>{
        state.cache=action.payload
        },
        Update_Order_Table_id:(state,action)=>{
         state.Order_table_id=action.payload
        },
        Update_Discount:(state,action)=>{
            state.Vendor_Discount=action.payload
        },
        Payment_Successful:(state,action)=>{
            state.PaymentSuccessful=action.payload
        },
    }
    

})
export const {login,logout,wishstore,addwish,removewish,updateAdmin,UpdateVendorStatus,cartAdd,cartRemove,cartstore,UpdateCache,
    Update_Order_Table_id, Update_Discount,Payment_Successful}=authSlice.actions
export default authSlice.reducer;