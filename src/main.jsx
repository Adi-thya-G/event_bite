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
import Forget from './Forget.jsx'
import Search from './Order/Search.jsx'
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
const router=createBrowserRouter([{
  path:"/",
  element:<App/>,
  children:[
    {
      path:"/",
      element:<Home />,
    },
    {
      path:"/order",
      element:<Custom/>,
    },
    {
      path:"/login",
      element:<Login />, 
    },
    {
      path:"/signup",
      element:<Create />
    },{
      path:"/login/recovery",
      element:<Forget />
    },
    {
      path:"/dashboard",
      element:<Dashboard/>,
     children:[
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
      }
     ]
    },{
      path:"/admin",
      element:<Protectedroute>
        <Admin_Dashboar/>
      </Protectedroute>,
      children:[
        {
          path:'vendor',
          element:<FormVendor/>
        },
       {
        path:"custom",
        element:<CustomCombo/>
       },
       {
        path:"data",
        element:<Details/>
       }
      ]
    },{
      path:"*",
      element:<PageNotFound/>
    }
    
  ],
}]
  
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}>
   <RouterProvider router={router}/>
   </Provider >
  </StrictMode>,
)
export default router