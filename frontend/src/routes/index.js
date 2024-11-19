import {createBrowserRouter} from 'react-router-dom'
import Home from '../pages/Home';
import App from '../App';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import Register from '../pages/Register';
import Admin from '../pages/Admin';
import Allusers from '../pages/Allusers';
import Products from '../pages/Products';
import CategoryProduct from '../pages/CategoryProduct';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import SearchProduct from '../pages/SearchProduct';


const router = createBrowserRouter([
 {
    path:'/',
    element:<App/>,
    children:[
      {
         path:"",
         element:<Home/>
      },
      {
         path:"login",
         element:<Login/>
      },
      {
         path:"reset-password",
         element:<ForgotPassword/>
      },
      {
         path:"register",
         element:<Register/>
      },
      {
         path:"category-product",
         element:<CategoryProduct/>
      },
      {
         path:"cart",
         element:<Cart/>
      },
      {
         path:"search",
         element:<SearchProduct/>
      },
      {
         path:"product/:id",
         element:<ProductDetails/>
      },
      {
         path:"admin-panel",
         element:<Admin/>,
         children:[
            {
               path:"all-users",
               element:<Allusers/> 
            },
            {
               path:"products",
               element:<Products/>
            }
         ]
     } 
    
    ]
 }
])

export default router;