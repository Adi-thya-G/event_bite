import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Home from './Home/Home.jsx'
import Login from './Login/Login.jsx'
import './index.css'
import { BrowserRouter,createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Create from './Createac/Create.jsx'
import Forget from './Forget.jsx'
const router=createBrowserRouter([{
  path:"/",
  element:<App/>,
  children:[
    {
      path:"/",
      element:<Home />,
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