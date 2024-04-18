import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './pages/Layout'
import Error from './pages/Error'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import SubmitEmail from './pages/SubmitEmail'
import SubmitOTP from './pages/SubmitOTP'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <SignIn /> },
        { path: '/signup', element: <SignUp /> },
        { path: '/submitmail', element: <SubmitEmail /> },
        { path: '/submitotp', element: <SubmitOTP /> },
        { path: '/dashboard', element: <Dashboard /> },
      ],
      errorElement: <Error />,
    },
  ])
  return <RouterProvider router={router} />
}

export default App
