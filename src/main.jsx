import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Mainlayout from './layouts/Mainlayout.jsx';
import Home from './components/Home.jsx';
import AddCoffee from './components/AddCoffee.jsx';
import UpdateCoffee from './components/UpdateCoffee.jsx';
import CoffeeDetails from './components/CoffeeDetails.jsx';
import SignUp from './components/SignUp.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import Users from './components/Users.jsx';
import SignIn from './components/SignIn.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Mainlayout,
    children:[
      {index:true,
        loader:()=> fetch('http://localhost:3000/coffees'),
        Component:Home},
      {path:'addCoffee',Component:AddCoffee},
      {path:'coffeeDetails/:id',Component: CoffeeDetails},
      {path:'updateCoffee/:id',
        loader:({params})=>fetch(`http://localhost:3000/coffees/${params.id}`),
        Component:UpdateCoffee},
        {
          path:'signup',
          Component:SignUp
        },
        {
          path:'signin',
          Component:SignIn
        },
        {
          path:'users',
          loader:()=>fetch('http://localhost:3000/users'),
          Component:Users
        }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
