import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import {HomeLayout,Landing,Login,Register,DashboardLayout,Stats,AllJobs,AddJob,Profile,Admin,Error, EditJob} from "./pages";
import{ action as RegisterAction} from './pages/Register'
import { action as LoginAction} from './pages/Login'
import { ToastContainer } from "react-toastify";
import { loader as DashboardLayoutLoader } from './pages/DashboardLayout'
import { action as AddJobAction }   from './pages/AddJob'
import { loader as AllJobsLoader } from './pages/AllJobs'
import { loader as EditJobLoader } from './pages/EditJob'
import { action as EditJobAction } from './pages/EditJob'
import { loader as AdminLoader } from './pages/Admin'
import { action as ProfileAction } from './pages/Profile'
import { loader as StatsLoader } from './pages/Stats'
function App() {
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action:RegisterAction
      },
      {
        path: "login",
        element: <Login />,
        action:LoginAction
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader:DashboardLayoutLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action:AddJobAction
          },
          { path: 'stats', element: <Stats />, loader:StatsLoader },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader:AllJobsLoader
          },

          {
            path: 'profile',
            element: <Profile />,
            action:ProfileAction
          },
          {
            path: 'admin',
            element: <Admin />,
            loader:AdminLoader
          },
          {
            path: 'edit-job/:id',
            element: <EditJob/>,
            loader:EditJobLoader,
            action:EditJobAction
          },
        ]
      },
    ],
  },
])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
