import './App.css'
import Navbar from './components/Navbar'
import Home from'./components/Home'
import Savings from './components/Savings'
import PaymentCategorization from './components/PaymentCategorization'
import Login from './components/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ScannerButton from './components/ScannerButton'; 


function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <><Navbar/><Login/></>
    },
    {
      path:"/Home",
      element: <><Navbar/><Home/></>
    },
    {
      path:"/savings",
      element:<><Navbar/><Savings /></>
    },
    {
      path: "/PaymentCategorization",
      element:<><Navbar/><PaymentCategorization /></>
    },
    {
      path:"/Login",
      element:<><Navbar/><Login/></>
    }
  ])
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
