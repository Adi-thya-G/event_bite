import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Home from './Home/Home.jsx'
import Login from './Login/Login.jsx'
import './index.css'
import { BrowserRouter,createBrowserRouter, RouterProvider} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Create from './Createac/Create.jsx'
import Forget from './Forget_password_folder/Forget.jsx'

import Custom from './Order/Custom.jsx'
import Dashboard from './User/Dashboard.jsx'
import Profile from './User/Profile.jsx'
import Wishlist from './User/Wishlist.jsx'
import Cart from './User/Cart.jsx'
import FormVendor from './Admin/FormVendor.jsx'
import { useSelector } from 'react-redux'
import Protectedroute from './Protectedroutes.jsx'
import PageNotFound from './Pagenot/PageNotFound.jsx'
import CustomCombo from './Admin/CustomCombo.jsx'
import Admin_Dashboar from './Admin/Admin_Dashboar.jsx'
import Details from './Admin/Details.jsx'
import Faq from './FAQ/Faq.jsx'
import FAQFORM from './Admin/FAQFORM.jsx'
import { ToastContainer } from 'react-toastify'
import Star from './User_feedback/Star.jsx'
import ComboCreator from './Admin/Custom_Combo/ComboCreator.jsx'
import Delivery_Information from './Order_Place_Information/Delivery_Information.jsx'
import FAQ_table from './Admin/FAQ_DATA/FAQ_table.jsx'
import Forget_form from './Forget_password_folder/Forget_form.jsx'

// admin import
import User_Tabel from './Admin/User/User_Tabel.jsx'
import Admin_Home from './Admin/Home_admin/Admin_Home.jsx'
import PayPal_Payment from './Payment/PayPal_Payment.jsx'
import PayPal from './Payment/PayPal.jsx'
import ProtectedLogin from './Login/ProtectedLogin.jsx'
import FeedbackTable from './Admin/FeedBack/FeedbackTable.jsx'
import Order_table from './Admin/Order_Data/Order_table.jsx'
import PendingOderList from './User/PendingOrdersList.jsx'
import CompletedOrdersList from './User/CompletedOrdersList.jsx'
import UserHome from './User/UserHome.jsx'
import MultipleVendorInfo from './Order_Place_Information/MultipleVendorInfo.jsx'
//
import PaymentSuccess from './Payment/PaymentSuccess.jsx'
const router=createBrowserRouter([{
  path:"/",
  element:<App/>,
  children:[
    {
      path:"/",
      element:<Home />,
    },
    {
      path:"/Menu",
      element:<Custom/>,
    },
    {
      path:"/login",
      element:
      <ProtectedLogin>
      <Login />
      </ProtectedLogin>
      
       
    },
    // reset password 

    {
      path:"/reset-password",
      element:<Forget/>
    },
    // reset form
    {
      path:"reset-password-form",
      element:<Forget_form/>
    },
    {
      path:"/signup",
      element:
      <ProtectedLogin>
       <Create />
      </ProtectedLogin>
     
    },
    {
      path:"/dashboard",
      element:<Protectedroute>
        <Dashboard/>
      </Protectedroute>,
     children:[
      {
        path:"",
        element:< UserHome/>
      },
      {
        path:"profile",
        element:<Profile/>
      }
      ,{
        path:"favorites",
        element:<Wishlist/>
      },{
        path:"cart",
        element:<Cart/>
      },
      {
        path:"PendingOderList",
        element:<PendingOderList/>
      }
      ,{
        path:"CompletedOrderList",
        element:<CompletedOrdersList/>
      }
     ]
    },{
      path:"/admin",
      element:
        
          <Admin_Dashboar/>
      
      ,
      children:[
        {
          path:"",
          element:<Admin_Home/>
        },
        {
          path:'vendor',
          element:<FormVendor/>
        },
       {
        path:"combo-create",
        element:<ComboCreator/>
       },
       {
        path:"custom-combo",
        element:<Details/>,

       },{
        path:"Faq-Management",
        element:<FAQ_table/>
       },{
        path:"User-Management",
        element:<User_Tabel/> 
      }
      ,{
        path:"FeedBack-management",
        element:<FeedbackTable/>
      }
      ,
      {
        path:"Vendor-data",
        element:<Order_table/>
      }
      ]
    },{
      path:"/FAQ",
      element:<Faq/>
    },{
      path:"/Feedback",
      element:<Star/>
    },
    {
      path:"/order-information/:order",
      element:<Delivery_Information/>,
      
      
    },
    {
   
      path:"/MultipleVendorInfo",
      element:<MultipleVendorInfo/>
    },
    {
      path:'pay-pal',
      element:<PayPal/>
     },
  
     {
      path:"payment-success",
      element:<PaymentSuccess/>
     }

    ,{
      path:"*",
      element:< PageNotFound/>
    }
    
  ],
}]
  
)

createRoot(document.getElementById('root')).render(

   <Provider store={store}>
    <ToastContainer/>
   <RouterProvider router={router}/>
   </Provider >
  
)
export default router