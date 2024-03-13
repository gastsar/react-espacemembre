import React from 'react'
import ReactDOM from 'react-dom/client'
/* import App from './App.jsx' */
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home/index.jsx';
import LogIn from './pages/LogIn/index.jsx';
import SignUp from './pages/SignUp/index.jsx';
import Profil from './pages/Profil/index.jsx';
import  {Toaster} from "react-hot-toast"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const  queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/profil",
    element: <Profil/>
  },
  {
    path: "/connexion",
    element: <LogIn/>,
  },
  {
    path: "/inscription",
    element: <SignUp/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
     <React.StrictMode> <Toaster/>
    <RouterProvider router={router} />
   
  </React.StrictMode>
  </QueryClientProvider>
 
)
