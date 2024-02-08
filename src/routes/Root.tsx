import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import FreePlay from '../components/FreePlay'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/freeplay',
    element: <FreePlay />,
  },
])

const Root = () => {
  return <RouterProvider router={router} />
}

export default Root
